'use strict';

//Angular factory for loading and parsing the local JSON data
app.factory('dataService', ['$http', '$q', function ($http, $q) {

    var dataServiceFactory = {};

    var _loadData = function(jsonFilename){

        var deferred = $q.defer();

        $http.get('data/' + jsonFilename)
            .success(function(response){

                deferred.resolve(response);
            }).error(function(err, status){
                deferred.reject(err);
            });

        return deferred.promise;

    };

    var _parseGeoJSON = function(data){
        var geoJSONObjs = [];
        for(var i = 0; i < data.length; i++) {
            var record = data[i];

            if (record[22] != null && record[22][1] != null) {
                var coordObj = record[22];

                var x = coordObj[1],
                    y = coordObj[2];

                var d = record[12];
                var t = record[13];

                var year = d.substring(0,4);
                var month = parseInt(d.substring(5,7)) - 1;
                var day = d.substring(8,10);
                var hours = t.substring(0,2);
                var minutes = t.substring(3,5);
                var date = new Date(year, month, day, hours, minutes, 0, 0);

                var geoJSON = {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [parseFloat(y), parseFloat(x)]
                    },
                    "properties": {
                        "offense": record[18],
                        "date": date
                    }
                };

                geoJSONObjs.push(geoJSON);
            }
        }
        return {
            "type": "FeatureCollection",
            "features": geoJSONObjs
        };
    };

    var _parseJson = function(data){
        var jsonObjs = [];
        for(var i = 0; i < data.length; i++) {
            var record = data[i];


            var coordObj = [];
            if (record[22] != null && record[22][1] != null) {
                var coordObj = record[22];

                var x = coordObj[1],
                    y = coordObj[2];

                coordObj = [x,y];
            }

            var d = record[12];
            var t = record[13];

            var year = d.substring(0,4);
            var month = parseInt(d.substring(5,7)) - 1;
            var day = d.substring(8,10);
            var hours = t.substring(0,2);
            var minutes = t.substring(3,5);
            var date = new Date(year, month, day, hours, minutes, 0, 0);

            var json = {
                "offense": record[18],
                "date": date,
                "coords": coordObj,
                "gender": record[10],
                "age": record[9],
                "ethnicity": record[11]
            };

            jsonObjs.push(json);
        }
        return jsonObjs
    };

    dataServiceFactory.loadData = _loadData;
    dataServiceFactory.parseGeoJSON = _parseGeoJSON;
    dataServiceFactory.parseJson = _parseJson;

    return dataServiceFactory;

}]);
