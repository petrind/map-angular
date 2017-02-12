  /**
  * @function Common
  * @memberOf map.service
  * @description Common function service
  */
angular.module('Map.services')
  .factory('Common', ['$http', '$q', function ($http, $q) {
  	return{
      calculateSimpleDistance : function(origin, destination){
      	var a = origin.latitude - destination.latitude;
      	var b = origin.longitude - destination.longitude;
        var distance = Math.sqrt( a*a + b*b );
        return distance;
      },
      pointValidation : function(point){
        if((point.latitude===null || point.latitude===undefined) || 
        (point.longitude===null || point.longitude===undefined)){
          return false;
        } else {
          return true;
        }
      }
    };
  }]);