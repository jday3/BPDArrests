'use strict';

angular.module('myApp.view1', ['ngRoute', 'nvd3'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/offenses', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', 'dataService', function($scope, dataService) {

        //An array of Regular Expressions and offense group names used to aggregate similar charge descriptions
        var commmonOffenses = [{
            exp: /Curfew/,
            name: 'Curfew Violation'
        },{
            exp: /Assault|Asslt/,
            name: 'Assault'
        },{
            exp: /Burglary|Theft|Robbery|larceny|Larceny/,
            name: 'Burglary'
        },{
            exp: /cds|CDS|Cds/,
            name: 'Drug Possession'
        },{
            exp: /gun|Gun|Firearm|Shotgn|Rfl/,
            name: 'Gun Violation'
        },{
            exp: /Probation|Vop|VOP/,
            name: 'Probation Violation'
        },{
            exp: /Murder/,
            name: 'Murder'
        },{
            exp: /Rape|rape|sex|Sex|Lewd/,
            name: 'Rape/Sexual Abuse'
        },{
            exp: /Valdalism|vandalism/,
            name: 'Vandalism'
        },{
            exp: /Trespass/,
            name: 'Trespassing'
        },{
            exp: /Erly|Disorderly|Disordely/,
            name: 'Disorderly Conduct'
        },{
            exp: /Failure To Appear/,
            name: 'Failure To Appear'
        },{
            exp: /Dirt|dirt/,
            name: 'Dirtbike Violation'
        },{
            exp: /Prostitution|Prosititution/,
            name: 'Prostitution'
        },{
            exp: /Arson/,
            name: 'Arson'
        },{
            exp: /Unknown Charge|^$/,
            name: 'Unknown Charge'
        },{
            exp: /Other/,
            name: 'Other'
        }]

        //Configuration for charts using controller scope variable
        angular.extend($scope, {
            description: 'Loading Description...',
            data: {
                categories: [],
                gender: {
                    male: [],
                    female: []
                },
                time: []
            },
            nvd3: {
                chart1: {
                    options: {
                        chart: {
                            type: 'discreteBarChart',
                            height: 450,
                            margin: {
                                top: 20,
                                right: 20,
                                bottom: 60,
                                left: 55
                            },
                            x: function (d) {
                                return d.label;
                            },
                            y: function (d) {
                                return d.value;
                            },
                            clipEdge: true,
                            showValues: true,
                            valueFormat: function (d) {
                                return d3.format('d')(d);
                            },
                            transitionDuration: 500,
                            yAxis: {
                                axisLabel: '',
                                axisLabelDistance: 30,
                                tickFormat: function (d) {
                                    return d3.format('d')(d);
                                }
                            },
                            staggerLabels: true
                        }
                    },
                    data: []
                },
                chart2: {
                    options: {
                        "chart": {
                            "type": "multiBarHorizontalChart",
                            "height": 450,
                            "margin": {
                                "top": 20,
                                "right": 20,
                                "bottom": 60,
                                "left": 130
                            },
                            "clipEdge": true,
                            "staggerLabels": true,
                            "transitionDuration": 500,
                            "stacked": true,
                            "xAxis": {
                                showMaxMin: false
                            },
                            valueFormat: function (d) {
                                return d3.format('d')(d);
                            },
                            x: function (d) {
                                return d.label;
                            },
                            y: function (d) {
                                return d.value;
                            },
                            yAxis: {
                                tickFormat: function (d) {
                                    return d3.format('d')(d);
                                }
                            }
                        }
                    },
                    data: []
                },
                chart3: {
                    options: {
                        chart: {
                            type: 'stackedAreaChart',
                            height: 450,
                            margin: {
                                top: 20,
                                right: 20,
                                bottom: 60,
                                left: 55
                            },
                            x: function (d) {
                                return d.time;
                            },
                            y: function (d) {
                                return d.count;
                            },
                            clipEdge: true,
                            showValues: true,
                            valueFormat: function (d) {
                                return d3.format('d')(d);
                            },
                            transitionDuration: 500,
                            yAxis: {
                                axisLabel: '',
                                axisLabelDistance: 30,
                                tickFormat: function (d) {
                                    return d3.format('d')(d);
                                }
                            },
                            xAxis: {
                                tickFormat: function (d) {
                                    var halfHour = d % 2;
                                    var hour = (d - halfHour) / 2;
                                    return moment().hours(hour).minutes(halfHour * 30).format("h:mm A");
                                }
                            },
                            staggerLabels: true
                        }
                    },
                    data: []
                }
            }
        });

        var searchForCommonOffense = function(offense){
            for(var i = 0; i < commmonOffenses.length; i++){
                var exp = commmonOffenses[i].exp;
                if(exp.exec(offense) != null)
                return commmonOffenses[i].name;
            }
            return "Other";
        };

        var searchForCommonOffenseIndex = function(offense){
            for(var i = 0; i < commmonOffenses.length; i++){
                if(commmonOffenses[i].name == offense)
                    return i;
            }
            return 0;
        };

        var searchForLabel = function(value, arr){
            for (var i=0; i < arr.length; i++) {
                if (arr[i].label === value) {
                    return i;
                }
            }
            return -1;
        };

        //Formats and adds an arrest record to multiple data collections for use by nvD3 charts
        var addToOffenseData = function(record){
            var offense = searchForCommonOffense(record.offense);

            var chart1Data = $scope.data.categories;
            var chart1OffenseIndex = searchForLabel(offense, chart1Data);
            if(chart1OffenseIndex < 0){
                $scope.data.categories.push({
                    label: offense,
                    value: 1
                });
            }else{
                $scope.data.categories[chart1OffenseIndex].value++;
            }

            var maleData = $scope.data.gender.male;
            var maleOffenseIndex = searchForLabel(offense, maleData);
            var femaleData = $scope.data.gender.female;
            var femaleOffenseIndex = searchForLabel(offense, femaleData);
            if(record.gender === 'M'){
                if(maleOffenseIndex < 0){
                    $scope.data.gender.male.push({
                        label: offense,
                        value: 1
                    });
                }else{
                    $scope.data.gender.male[maleOffenseIndex].value++;
                }
                if(femaleOffenseIndex < 0){
                    $scope.data.gender.female.push({
                        label: offense,
                        value: 0
                    });
                }
            }else if(record.gender === 'F'){
                if(femaleOffenseIndex < 0){
                    $scope.data.gender.female.push({
                        label: offense,
                        value: 1
                    });
                }else{
                    $scope.data.gender.female[femaleOffenseIndex].value++;
                }
                if(maleOffenseIndex < 0){
                    $scope.data.gender.male.push({
                        label: offense,
                        value: 0
                    });
                }
            }

            var hours = record.date.getHours();
            var min = record.date.getMinutes();

            var scaledTime = (hours * 2) + parseInt(min/30);

            $scope.data.time[searchForCommonOffenseIndex(offense)].values[scaledTime].count++;

        };

        //Load local JSON file using data service
        dataService.loadData('BPD_Arrests.json').then(function(response){
            var data = response.data,
                description = response.meta.view.description;

            var jsonData = dataService.parseJson(data);

            $scope.description = description;

            for(var j = 0; j < commmonOffenses.length; j++){
                $scope.data.time.push({
                    key: commmonOffenses[j].name,
                    values: []
                });

                for(var k = 0; k < 48; k++){
                    $scope.data.time[j].values.push({
                        time: k,
                        count: 0
                    });
                }
            }

            for(var i = 0; i < jsonData.length; i++){
                addToOffenseData(jsonData[i]);
            }

            $scope.nvd3.chart1.data = [{
                key: '',
                values: $scope.data.categories
            }];

            $scope.nvd3.chart2.data = [{
                key: "Male",
                color: "rgb(214, 39, 40)",
                values: $scope.data.gender.male
            }, {
                key: "Female",
                color: "rgb(31, 119, 180)",
                values: $scope.data.gender.female
            }];

            $scope.nvd3.chart3.data = $scope.data.time;

        });

}]);