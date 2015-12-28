'use strict';
angular.module('app').controller('AppsCtrl', ['$scope', '$auth', '$state', '$http', '$rootScope', 'localStorageService',
 function ($scope, $auth, $state, $http, $rootScope, localStorageService) {
  var vm = this;

  vm.logout = function () {
   localStorageService.remove('user');
   $rootScope.authenticated = false;
   $state.go('auth');
  }
 }
]);
