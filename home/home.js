'use strict';

angular.module('myApp.home', ['ngRoute', 'ui.bootstrap-slider', 'nvd3'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope', 'leafletData', 'dataService', function($scope, leafletData, dataService) {

        var momentFormat = "h:mm A MMMM Do YYYY";

        //Converts from slider range value to time
        var getTimeFromSliderValue = function(value){
            var tick = parseFloat($scope.range.diff)/parseFloat($scope.sliderOptions.max + 1);
            return $scope.range.min + (tick * value);
        };

        var isInTimeRange = function(time){
            var sliderMin = $scope.range.min;
            var sliderMax = getTimeFromSliderValue($scope.sliders.sliderValue);

            return (time <= sliderMax) && (time >= sliderMin);
        };

        //Updates Map Data
        var updateGeoJson = function(){
            if($scope.leaflet.geoJSON != null){
                var temp = $scope.leaflet.geoJSON;
                $scope.leaflet.geoJSON = null;
                leafletData.getMap().then(function(map){
                    $scope.leaflet.geoJSON = temp;
                });
            }
        };

        //Updates the data for the nvD3 charts
        var updateChartData = function(){
            var data = $scope.jsonData,
                chart1Data = [[{
                    label: 'Has Location',
                    count: 0
                }, {
                    label: 'No Location',
                    count: 0
                }], [{
                    label: 'Has Location',
                    count: 0
                }, {
                    label: 'No Location',
                    count: 0
                }]],
                chart2Data = [];

            if(data.length < 1)
                return;

            for(var i=0; i < data.length; i++){
                var record = data[i],
                    inTimeRange = isInTimeRange(record.date.getTime()),
                    hasLocation = (record.coords.length > 0);

                if(inTimeRange) {
                    chart1Data[0][hasLocation ? 0 : 1].count++;
                    chart2Data.push({
                        time: record.date.getTime(),
                        age: record.age
                    });
                }
                chart1Data[1][hasLocation ? 0 : 1].count++;
            }

            $scope.nvd3.chart1.data = [{
                key: $scope.formattedDates.from + ' - ' + $scope.formattedDates.to,
                values: chart1Data[0]
            }, {
                key: "Total",
                values: chart1Data[1]
            }];

            $scope.nvd3.chart2.data = [{
                key: 'Age',
                values: chart2Data
            }];
        };

        angular.extend($scope, {
            description: 'Loading description...',
            leaflet: {
                defaults: {
                    tileLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    minZoom: 10
                },
                center: {
                    lat: 39.28755,
                    lng: -76.60801,
                    zoom: 12
                }
            },
            range: {
                max: 1430366400000, //4-30-2015 12 AM
                min: 1430193600000, //4-28-2015 12 AM
                diff: 172800000 //2 days in milliseconds (2 * 24 * 60 * 60 * 1000)
            },
            sliders: {
                sliderValue: 16
            },
            sliderOptions: {
                min: 0,
                max: 191,
                step: 1,
                range: true,
                formatter: function(value){
                    var tick = parseFloat($scope.range.diff)/parseFloat($scope.sliderOptions.max + 1);
                    var additionalMs = tick*value;

                    var dateString = moment($scope.range.min + additionalMs).format(momentFormat);
                    $scope.formattedDates.to = dateString;

                    return dateString;
                }
            },
            formattedDates: {
                from: moment(1430193600000).format(momentFormat),
                to: moment(1430193600000).format(momentFormat)
            },
            nvd3: {
                chart1: {
                    options: {
                        chart: {
                            "type": "multiBarChart",
                            "height": 300,
                            "showValues": true,
                            "transitionDuration": 500,
                            duration: 0,
                            stacked: false,
                            "xAxis": {
                                duration: 0
                                //"axisLabel": "Total"
                            },
                            showYAxis: false,
                            x: function(d){
                                return d.label;
                            },
                            y: function(d){
                                return d.count;
                            },
                            valueFormat: function (d) {
                                return d3.format('d')(d);
                            },
                            legend: {
                                rightAlign: true
                            }
                        }
                    },
                    data: []
                },
                chart2: {
                    options: {
                        chart: {
                            "type": "scatterChart",
                            "height": 300,
                            "showValues": true,
                            "transitionDuration": 500,
                            duration: 0,
                            yAxis: {
                                axisLabel: 'Age'
                            },
                            xAxis: {
                                duration: 0,
                                tickFormat: function(d) {
                                    return moment(new Date(d)).format("h:mm A");
                                },
                                axisLabel: 'Time of Arrest'
                            },
                            x: function(d){
                                return d.time;
                            },
                            y: function(d){
                                return d.age;
                            },
                            valueFormat: function (d) {
                                return d3.format('d')(d);
                            },
                            color: d3.scale.category10().range(),
                            scatter: {
                                onlyCircles: true
                            },
                            showDistX: true,
                            showDistY: true,
                            forceX: [1430193600000, 1430366400000],
                            tooltip: {
                                headerFormatter: function(d){
                                    return moment(new Date(d)).format("h:mm A MMMM Do");
                                }
                            }
                        }
                    },
                    data: []
                }
            },
            jsonData: []
        });

        //Listen for changes to the slider in order to update map/chart data
        $scope.$watch('sliders.sliderValue', function(){
            updateGeoJson();
            updateChartData();
        });

        //Use data service to load data
        dataService.loadData('BPD_Arrests_4_28-29.json').then(function(response){
            $scope.description = response.meta.view.description;

            $scope.leaflet.geoJSON = {
                data: dataService.parseGeoJSON(response.data),
                onEachFeature: function (feature, layer) {
                    layer.bindPopup(feature.properties.offense);
                },
                filter: function(feature, layer){
                    var time = feature.properties.date.getTime();
                    return isInTimeRange(time);
                }
            };

            $scope.jsonData = dataService.parseJson(response.data);
            updateChartData();

        }, function(err){
            $scope.description = "Error loading data set.";
        });

}]);
