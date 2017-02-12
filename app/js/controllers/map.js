angular.module('Map.controllers')
	.controller('MapController', ['$rootScope', '$scope', '$mdDialog', 
  'Toast', 'Origins','Destinations' , 'Common',
  function($rootScope, $scope, $mdDialog, Toast, Origins, Destinations, Common) {

    $scope.common = Common; //common function
    //replace the icon for origin
    $scope.originIcon = {
        "scaledSize": [64, 64],
        "url": "http://icons.iconarchive.com/icons/icons-land/vista-map-markers/256/Map-Marker-Marker-Outside-Azure-icon.png"
    };
    //replace the icon for destination
    $scope.destinationIcon = {
      "scaledSize":[64,64],
      "url": "http://icons.iconarchive.com/icons/icons-land/vista-map-markers/256/Map-Marker-Marker-Outside-Pink-icon.png"
    }

	  $scope.vm = this;
    $rootScope.data.mode = "none"; //mode for editing data
    $rootScope.directions = {}; //data for maps directions
    $rootScope.data.tempPoint = {}; //temp point of clickpoint of map
    $scope.newOrigin ={}; // temp variable to store newOrigin
    $scope.newDestination ={}; // temp variable to store new Destination
    $scope.distance = 0;

    
    //initiate waypoints of maps directions
    $scope.initWaypoints = function () {
      if($rootScope.selectedOrigin.Destinations.length>0){
        $rootScope.directions.show = true;
        $rootScope.directions.wayPoints = [];
        var maxDistance = 0;
        var keyMax = 0;
        //loop to push destination to wayPoints and find the farthest point
        angular.forEach($rootScope.selectedOrigin.Destinations, 
          function(destination, key){
              var distance = $scope.common
              .calculateSimpleDistance($rootScope.selectedOrigin, destination);
              if(maxDistance<distance){
                maxDistance = distance;
                keyMax = key;
              }
              $rootScope.directions.wayPoints.push(
                {location: {lat:destination.latitude, lng: destination.longitude}, stopover: false}
              );
          });
        $rootScope.directions.first = {
          location: {
            lat: $rootScope.selectedOrigin.latitude, 
            lng: $rootScope.selectedOrigin.longitude
          }};

        $rootScope.directions.last = $rootScope.directions.wayPoints[keyMax]; //last destination
        $rootScope.directions.wayPoints.splice(keyMax,1); //remove last destination from waypoints
        $rootScope.directions.mode= "DRIVING";
      } else {
        $rootScope.directions.show = false;
        $rootScope.directions.wayPoints = [];
        $rootScope.directions.last.location ={};
        $rootScope.directions.first.location ={};
      }
      $rootScope.data.mode = "none";
      $rootScope.data.tempPoint = {};
    }
    //update Directions event emited by main.js
    $rootScope.$on('updateDirections', function(event, mass) { 
        $scope.initWaypoints();      
    });
    //addMarker function 
    $scope.vm.addMarker = function(event) {
      var ll = event.latLng; //latitude and longitude from ngmap click event
      if($rootScope.data.mode !== "none"){
        $rootScope.data.tempPoint = {latitude: ll.lat(), longitude: ll.lng()};
      }
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
    //save new origin point
    $scope.vm.saveOrigin = function (origin) {
      if(!$scope.common.pointValidation(origin)){
        Toast.show('Please click on map to specify location', 'top right', 3000);
      } else{
        if(origin.label===null || origin.label===undefined){
          origin.label = "Origin Point "+ $rootScope.origins.length;
        }
        Origins
          .new(origin)
          .then(function (neworigin) {
            $scope.newOrigin ={}; //reset
            neworigin.Destinations = [];
            $rootScope.origins.push(neworigin);
            Toast.show('Origin successfully created', 'top right', 3000);
            $mdDialog.cancel();
          })
          .catch(function () {
            Toast.show('Error creating origin', 'top right', 3000);
          });
      }  
    };
    //Update a destination's details, Not used for now
    $scope.updateOrigin = function (origin) {
      Origins
        .update(origin)
        .then(function () {
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
      if(!$scope.common.pointValidation(destination)){
        Toast.show('Please click on map to specify location', 'top right', 3000);
      } else {
        if(destination.label===null || destination.label===undefined){
          destination.label = "Destination Point "+ $rootScope.selectedOrigin.Destinations.length;
        }
        destination.origin_id = $rootScope.selectedOrigin.id;
        Destinations
        .new(destination)
        .then(function (newDestination) {
          Toast.show('Destination successfully created', 'top right', 3000);
          $rootScope.selectedOrigin.Destinations.push(newDestination);
          $scope.initWaypoints();
          $mdDialog.cancel();
        })
        .catch(function () {
          Toast.show('Error creating destination', 'top right', 3000);
        });
      }      
    };

    //Update a destination's details
    $scope.vm.updateDestination = function (destination) {
      if(!$scope.common.pointValidation(destination)){
        Toast.show('Please click on map to specify location', 'top right', 3000);
      } else {
        Destinations
        .update(destination)
        .then(function () {          
          Toast.show('Destination successfully updated', 'top right', 3000);
          $scope.initWaypoints();
          $mdDialog.cancel();
        })
        .catch(function () {
          Toast.show('Error updating destination', 'top right', 300);
        });
      }      
    };
	}]);