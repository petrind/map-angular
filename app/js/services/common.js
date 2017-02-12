angular.module('Map.services')
  .factory('Common', ['$http', '$q', function ($http, $q) {
  	var common = {};
  	//calculate simple distance using pythagoras
    common.calculateSimpleDistance = function(origin, destination){
    	var a = origin.latitude - destination.latitude;
    	var b = origin.longitude - destination.longitude;
        var distance = Math.sqrt( a*a + b*b );
        return distance;
    };
    return common;
  }]);