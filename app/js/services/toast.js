angular.module('Map.services')
  .factory('Toast', ['$mdToast', function ($mdToast) {
    return {
      show: function (text, position, delay) {
        $mdToast.show(
          $mdToast.simple()
            .textContent(text)
            .position(position)
            .hideDelay(delay)
            .theme("success")
          );
      },
      error: function (text, position, delay) {
        $mdToast.show(
          $mdToast.simple()
            .textContent(text)
            .position(position)
            .hideDelay(delay)
            .theme("error")
          );
      }
    };
  }]);
