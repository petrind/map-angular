angular.module('Map.controllers')
	.controller('MapController', ['$rootScope', '$scope', '$mdDialog', 
  'Toast', 'Origins','Destinations' , 'Common',
  function($rootScope, $scope, $mdDialog, Toast, Origins, Destinations, Common) {

    $scope.common = Common;
    $scope.originIcon = {
        "scaledSize": [64, 64],
        "url": "http://icons.iconarchive.com/icons/icons-land/vista-map-markers/256/Map-Marker-Marker-Outside-Azure-icon.png"
    };
    $scope.destinationIcon = {
      "scaledSize":[64,64],
      "url": "http://icons.iconarchive.com/icons/icons-land/vista-map-markers/256/Map-Marker-Marker-Outside-Pink-icon.png"
    }
	  $scope.vm = this;    
    $rootScope.data.mode = "none";
    $rootScope.data.tempPoint = {};
    $scope.newDestination ={};
    $scope.newOrigin ={};

    $scope.initWaypoints = function () {
      $rootScope.wayPoints = [];
      var maxDistance = 0;
      var keyMax = 0;
      angular.forEach($rootScope.selectedOrigin.Destinations, 
        function(destination, key){
            var distance = $scope.common.calculateSimpleDistance($rootScope.selectedOrigin, destination);
            if(maxDistance<distance){
              maxDistance = distance;
              keyMax = key;
            }
            $rootScope.wayPoints.push(
              {location: {lat:destination.latitude, lng: destination.longitude}, stopover: false}
            );
        });
      $rootScope.last = $rootScope.wayPoints[keyMax];
      $rootScope.wayPoints.splice(keyMax,1);
      $rootScope.mode= "DRIVING";
    }

    $scope.init = function () {

    }
    $scope.init();

    $rootScope.$on('updateDirections', function(event, mass) { 
       if($rootScope.selectedOrigin.Destinations != null && 
        $rootScope.selectedOrigin.Destinations != undefined){
        $scope.initWaypoints();
      }
    });

    $scope.vm.addMarker = function(event) {
      var ll = event.latLng;
      $rootScope.data.tempPoint = {latitude: ll.lat(), longitude: ll.lng()};
      if($rootScope.data.mode === "new-origin"){
        $scope.newOrigin.latitude = $rootScope.data.tempPoint.latitude;
        $scope.newOrigin.longitude= $rootScope.data.tempPoint.longitude;
      } else if($rootScope.data.mode === "edit-origin"){
        $rootScope.selectedOrigin.latitude = $rootScope.data.tempPoint.latitude;
        $rootScope.selectedOrigin.longitude= $rootScope.data.tempPoint.longitude;
      } else if($rootScope.data.mode === "new-destination"){
        $scope.newDestination.latitude = $rootScope.data.tempPoint.latitude;
        $scope.newDestination.longitude= $rootScope.data.tempPoint.longitude;
      } else if($rootScope.data.mode === "edit-destination"){
        $rootScope.selectedDestination.latitude = $rootScope.data.tempPoint.latitude;
        $rootScope.selectedDestination.longitude= $rootScope.data.tempPoint.longitude;
      }
    }

    $scope.vm.saveOrigin = function (origin) {
      Origins
        .new(origin)
        .then(function (neworigin) {
          $scope.newOrigin ={};
          $rootScope.data.mode = "none";
          neworigin.Destinations = [];
          $rootScope.origins.push(neworigin);
          Toast.show('Origin successfully created', 'top right', 3000);
          $mdDialog.cancel();
        })
        .catch(function () {
          Toast.show('Error creating origin', 'top right', 3000);
        });

    };
    //Update a destination's details
    $scope.updateOrigin = function (origin) {
      Origins
        .update(origin)
        .then(function () {
          $rootScope.data.mode = "none";
          $scope.initWaypoints();
          Toast.show('Destination successfully updated', 'top right', 3000);
          $mdDialog.cancel();
        })
        .catch(function () {
          Toast.show('Error updating destination', 'top right', 300);
        });
    };

    //create a new destination
    $scope.vm.saveDestination = function (destination) {
      destination['origin_id'] = $rootScope.selectedOrigin.id;
      Destinations
        .new(destination)
        .then(function (newDestination) {
          $rootScope.data.mode = "none";
          $scope.initWaypoints();
          $scope.newDestination ={};
          Toast.show('Destination successfully created', 'top right', 3000);
          $rootScope.selectedOrigin.Destinations.push(newDestination);
          $mdDialog.cancel();
        })
        .catch(function () {
          Toast.show('Error creating destination', 'top right', 3000);
        });
    };

    //Update a destination's details
    $scope.vm.updateDestination = function (destination) {
      Destinations
        .update(destination)
        .then(function () {
          $rootScope.data.mode = "none";
          $scope.initWaypoints();
          Toast.show('Destination successfully updated', 'top right', 3000);
          $mdDialog.cancel();
        })
        .catch(function () {
          Toast.show('Error updating destination', 'top right', 300);
        });
    };
	}]);