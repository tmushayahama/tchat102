'use strict';

angular.module('myApp.view2', ['ngRoute'])

        .config(['$routeProvider', function ($routeProvider) {
          $routeProvider.when('/view2', {
           templateUrl: 'view2/view2.html',
           controller: 'View2Ctrl'
          });
         }])

        .controller('View2Ctrl', ['$scope', "$http", "chatFactory", function ($scope, $http, chatFactory) {
          'use strict';
          var ThemeAccount = function (id) {
           this.id = id;
           this.action = "";
           this.acts = [
            {description: "Ready..."}
           ];
           this.currentActions = [];
           this.currentIndex = 0;
           this.currentAct = this.acts[this.currentIndex];

           this.inviteChat;

           self.isReadyTimer;
          };

          $scope.addChatAction = function () {
           var error = function (data) {
           }
           var success = function (data) {
            if (data["results"]) {
             clearTimeout(self.isReadyTimer);
             console.log("Ready", data["results"])
             self.acts = [];
             angular.forEach(data["results"], function (value, key) {
              self.acts.push({
               description: value.action.action,
               action_period: value.chatAction.action_period
              });
             });
             setTimeout(function () {
              $scope.$apply(function ()
              {
               $scope.quickPlayWizardStep = "play";
              });
             });
             self.spitActions(false);
             return -1;
            }
           };

           var data = {
            action: $scope.actionModel.title,
            chat_id: $scope.selectChat.id,
           };
           chatFactory.ajaxPost("../site/addChatAction/", data, success, error);
          }

          ThemeAccount.prototype.getChatActions = function (chatId) {
           var self = this;
           var error = function (data) {
           }
           var success = function (data) {
            var currentActions = [];

            angular.forEach(data["results"], function (value, key) {
             currentActions.push({
              description: value.action.action,
              action_period: value.chatAction.action_period
             });
            });
            console.log("Current", self.currentActions)
            setTimeout(function () {
             $scope.$apply(function ()
             {
              self.currentActions = currentActions;
             });
            });
           };
           var data = {
            random: false,
            offset: 0
           };
           chatFactory.ajaxPost("../site/allChatActions/chatId/" + chatId, data, success, error);
          }


          $scope.getLoggedInUser = function () {
           $http.post("../site/loggedInUser", {}).success(function (data) {
            if (data["user"]) {
             $scope.user = data["user"];
            }
            if (data.error) {
             self.error = data.error;
             return typeof error === 'function' && error(data);
            }
            typeof success === 'function' && success(data);
           }).error(function (data) {
            typeof error === 'function' && error(data);
           });
          };

          $scope.getChats = function () {
           $scope.chats = [];
           $http.post("../site/chats", {}).success(function (data) {
            angular.forEach(data["chats"], function (value, key) {
             var id = value["id"];
             $scope.chats.push({id: id, value: value});
            });
            if (data.error) {
             self.error = data.error;
             return typeof error === 'function' && error(data);
            }
            typeof success === 'function' && success(data);
           }).error(function (data) {
            typeof error === 'function' && error(data);
           });
          };

          $scope.requestChat = function (user) {
           var data = {
            user_id: user.id,
            chat_id: $scope.selectedChat.id
           };
           $http.post("../site/requestChat", {}).success(function (data) {
            if (data.error) {
             self.error = data.error;
             return typeof error === 'function' && error(data);
            }
            typeof success === 'function' && success(data);
           }).error(function (data) {
            typeof error === 'function' && error(data);
           });
           $scope.users = users;
          };

          $scope.getUsers = function () {
           var users = [];
           $http.post("../site/users", {}).success(function (data) {
            angular.forEach(data["users"], function (value, key) {
             users.push({
              id: value.id,
              firstname: value.firstname,
              lastname: value.lastname
             });
            });
            if (data.error) {
             self.error = data.error;
             return typeof error === 'function' && error(data);
            }
            typeof success === 'function' && success(data);
           }).error(function (data) {
            typeof error === 'function' && error(data);
           });
           $scope.users = users;
          };

          $scope.themeAccount = new ThemeAccount(1);
          $scope.chatPageWizard = "chats";
          $scope.chats = [];
          $scope.users = [];
          $scope.user = [];
          $scope.selectedChat = [];
          $scope.acceptInvitationData = '';
          $scope.acceptInvitationDataError = '';

          $scope.selectAction = function (actionType) {
           switch (actionType) {
            case 1:
             $scope.quickPlayWizardStep = "start-type";
             break;
            case 2:
             $scope.quickPlayWizardStep = "chats-selection";
             console.log("chats", $scope.chats);
             break;
           }
          };

          $scope.selectChat = function (chatId) {
           $scope.chatPageWizard = "chat";
           function filterByID(obj) {
            if ('id' in obj && obj.id === chatId) {
             return true;
            } else {
             return false;
            }
           }

           $scope.selectedChat = $scope.chats.filter(filterByID)[0];
           $scope.themeAccount.getChatActions($scope.selectedChat.id);
           console.log("Chat ", $scope.selectedChat);
          };

          $scope.selectPlay = function (playType) {
           switch (playType) {
            case 1:
             $scope.quickPlayWizardStep = "play";
             if ($scope.selectedChat.id) {
              $scope.improvConv.quickPlay(2, $scope.selectedChat.id);
              return;
             }
             $scope.improvConv.quickPlay(1);
             break;
            case 2:
             $scope.quickPlayWizardStep = "invite-play";
             $scope.improvConv.invitePlay(1);
             break;
            case 3:
             $scope.quickPlayWizardStep = "invite-play";
             $scope.improvConv.invitePlay(2);
             break;
            case 4:
             $scope.quickPlayWizardStep = "play";
             $scope.improvConv.quickPlay(2, 1);
             break;
           }
          };


          $scope.invitePlay = function (inviteType) {
           switch (inviteType) {
            case 1:
             $scope.improvConv.invitePlay(1);
             $scope.quickPlayWizardStep = "invite-wait";
             break;
           }
          };

          $scope.selectUser = function (index) {
           $scope.selectedUser = $scope.users[index];
          };

          $scope.quickPlay = function () {
           $scope.improvConv.quickPlay();
          };

          $scope.start = function () {
           $scope.quickPlayWizardStep = "actions";
          };



          $scope.selectRandomPlay = function () {
           $scope.quickPlayWizardStep = 2;
           $scope.improvConv.quickPlay(0);
          };


          $scope.getLoggedInUser();
          $scope.getChats();
          $scope.getUsers();
         }]);