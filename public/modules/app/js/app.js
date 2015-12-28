'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
 'ngRoute',
 'myApp.view1',
 'myApp.view2',
 'myApp.version'
]).config(['$routeProvider', '$httpProvider',
 function ($routeProvider, $httpProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
  //$httpProvider.defaults.headers.post['X-CSRF-Token'] = $('meta[name="csrf-token"]').attr("content");
  $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
  $httpProvider.defaults.headers.common['Accept'] = 'application/json, text/javascript';
  $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
  console.log("ready!");


 }]).factory("chatFactory", function ($http) {
 var factory = {};

 factory.ajaxPost = function (url, data, success, error) {

  return $.ajax({
   url: url,
   type: "POST",
   data: data,
   dataType: "json",
   headers: {'Content-Type': 'application/x-www-form-urlencoded'},
   success: success,
   error: error
  });
 };

 return factory;
});
