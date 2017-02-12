  /**
  * @function Config
  * @memberOf map.service
  * @description configuration of app
  */
  angular.module('Map.services')
  .factory('Config', ['$http', '$q', function ($http, $q) {
  	return{
      defaultLocation : function() {
        return {
          latitude : -6.919269633161684,
          longitude : 107.61739253997803,
          Destinations : []
        };
      }
    };
  }]);