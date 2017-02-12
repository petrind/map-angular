angular.module('Map.services')
  .factory('Destinations', ['$http', '$q', function ($http, $q) {

    return {
      new: function (destination) {
        var deferred = $q.defer();
        $http
          .post('/destinations', destination)
          .then(function (response) {
            deferred.resolve(response.data);
          })
          .catch(function (error) {
            deferred.reject(error);
          });
        return deferred.promise;
      },
      delete: function(destinationId) {
        var deffered = $q.defer();
        $http
          .delete('/destinations/' + destinationId)
          .then(function (response) {
            deffered.resolve(response.data);
          })
          .catch(function (error) {
            deffered.reject(error);
          });
        return deffered.promise;
      },
      update: function (destination) {
        var deferred = $q.defer();
        $http
          .put('/destinations/' + destination.id, destination)
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
