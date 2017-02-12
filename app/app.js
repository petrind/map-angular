angular.module('Map.controllers', []);
angular.module('Map.services', []);

//Inject dependencies to the Map module.
var Map = angular.module('Map', [
  'ngMaterial',
  'ngMdIcons',
  'Map.controllers',
  'Map.services',
  'ngMap'
]);

Map
  .config(['$mdThemingProvider', function ($mdThemingProvider) {
    //Set default theme of ngmaterial
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('red');
    $mdThemingProvider.theme('success')
      .primaryPalette('green')
      .accentPalette('blue');
    $mdThemingProvider.theme('error')
      .primaryPalette('red')
      .accentPalette('blue');
  }])
  .config(['$mdIconProvider', function ($mdIconProvider) {
    //Placeholder icon for origin info.
    $mdIconProvider
      .icon('origin', './images/svg/origin.svg');
  }]);