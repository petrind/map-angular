/**
  * @function origins
  * @memberOf map.service
  * @description service provider for origins data
  */
  angular.module('Map.services')
  .factory('Origins', ['$http', '$q', function ($http, $q) {
    return {
      all: function() {
        var deferred = $q.defer();
        $http
          .get('/origins')
          .then(function (response) {
            deferred.resolve(response.data);
          })
          .catch(function (error) {
            deferred.reject(error);
          });
          return deferred.promise;
      },

      //add new origin
      new: function (origin) {
        var deferred = $q.defer();
        $http
          .post('/origins', origin)
          .then(function (response) {
            deferred.resolve(response.data);
          })
          .catch(function (error) {
            deferred.reject(error);
          });
        return deferred.promise;
      }
    };
  }]);
