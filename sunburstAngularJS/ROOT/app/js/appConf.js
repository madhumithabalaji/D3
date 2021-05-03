//Specify any global configurations here
(function (angular) {
  'use strict';
  angular.module('app', []).controller('AppController', function AppController() {
    //Binding
    this.data = {
      //put chart config here
      name: '',
      width: 950,
      height: 800,
      url: "app/components/sunburst/fullInput.json",
    };
  });
})(window.angular);
