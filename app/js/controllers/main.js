/**
  * @class map.MainCtrl
  * @memberOf map    
  * @description control main control and click event to show dialog for editing data.
  */
angular.module('Map.controllers')
.controller('MainCtrl', ['$rootScope', '$scope', '$mdSidenav', '$mdDialog', 'Origins', 'Destinations', 'Toast', 'Config',
function ($rootScope, $scope, $mdSidenav, $mdDialog, Origins, Destinations, Toast, Config) {
  $rootScope.data = {};
  //Fetch all origins, and set the first as selected
  /** */
  Origins.all()
    .then(function (origins) {
      
        $rootScope.origins = origins;
        if(origins.length>0){
          $rootScope.selectedOrigin = origins[0];
          $rootScope.$emit('updateDirections'); //emit event for map to update direction
        } else {
            $rootScope.selectedOrigin = Config.defaultLocation();
        }        
    });

  //set an origin as selected
  $scope.selectOrigin = function (origin) {
    $rootScope.selectedOrigin = origin;
    $rootScope.$emit('updateDirections');
  };

  //toggle the visibility of the Sidenav
  $scope.toggleSidenav = function () {
    $mdSidenav('left').toggle();
  };

  //Dialog to create new origin
  $scope.newOriginDialog = function (ev) {    
    $rootScope.data.mode = "new-origin";
  };

  //Show An origin's info
  $scope.showOriginInfo = function (ev) {
    $mdDialog.show({
      templateUrl: 'views/dialogs/origin-info.html',      
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: false
    });
  };

  //Dialog to create new destination
  $scope.newDestinationDialog = function (ev) {
    $rootScope.data.mode = "new-destination";
  };

  //Delete an existing destination
  $scope.deleteDestination = function (ev, destination) {
    var deleteDestination = $mdDialog.confirm()
      .title('Delete ' + destination.label + '?')
      .textContent(destination.label + ' will be wiped off from the face of the earth.')
      .ariaLabel('Delete destination')
      .ok('Yes')
      .cancel('No');

    $mdDialog.show(deleteDestination)
      .then(function () {
        Destinations.delete(destination.id)
          .then(function () {
            $scope.selectedOrigin.Destinations = $scope.selectedOrigin.Destinations.filter(function (i) {
              return i.id !== destination.id;
            });
            Toast.show(destination.label + ' has been deleted.', 'top right', 3000);
          })
          .catch(function (error) {
            Toast.show('Error deleting ' + destination.label + '. Please try again.', 'top right', 3000);
          });
      });
  };

  //Show dialog to edit an existing destination's details
  $scope.editDestination = function (ev, destination) {
    $rootScope.data.mode = "edit-destination";
    $rootScope.selectedDestination = destination;
  };
}]);
