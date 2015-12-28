'use strict';
angular.module('myApp.view1', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
          $routeProvider.when('/view1', {
           templateUrl: 'view1/view1.html',
           controller: 'View1Ctrl'
          });
         }])

        .controller('View1Ctrl', ['$scope', "$http", "chatFactory", function ($scope, $http, chatFactory) {
          var ImprovConv = function (id) {
           this.id = id;
           this.action = "";
           this.acts = [
            {description: "..."}
           ];
           this.currentIndex = 0;
           this.currentAct = this.acts[this.currentIndex];
           this.inviteChat;
           self.isReadyTimer;
          };
          ImprovConv.prototype.spitActions = function () {
           var self = this;
           var count = -1;
           var spitAction = function () {
            if (count === -1) {
             var rand = Math.round(Math.random() * (5000 - 2000)) + 2000;
             self.quickPlayTimer = setTimeout(spitAction, rand);
             count++;
            } else if (count < self.acts.length) {
             setTimeout(function () {
              $scope.$apply(function ()
              {
               //self.currentIndex = count;
               console.log("Acts", self.acts);
               self.currentAct = self.acts[count];

               var rand = self.currentAct.action_period;
               console.log(rand, "  " + count + "  ", self.currentAct);
               var snd = $("#ic-sound").get(0);
               snd.play();
               count++;
               self.quickPlayTimer = setTimeout(spitAction, rand);
              });
             });
            }

           };
           spitAction();
          };
          ImprovConv.prototype.listenInvite = function (mode) {
           var self = this;
           var count = 0;
           var errorInvitation = function (data) {
            console.log("an error");
            self.isReadyTimer = setTimeout(isReady(), 1000);
           }
           var successInvitation = function (data) {
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
             self.acts.push({
              description: "...END",
              action_period: 1
             })
             setTimeout(function () {
              $scope.$apply(function ()
              {
               $scope.quickPlayWizardStep = "play";
              });
             });
             self.spitActions();
             return -1;
            }
            self.isReadyTimer = setTimeout(isReady(), 1000);
           };
           var isReady = function () {
            var data = {
             chat_id: self.inviteChat.chat_id,
             codename: self.inviteChat.codename,
            };
            clearTimeout(self.isReadyTimer);
            chatFactory.ajaxPost("../site/isReady/", data, successInvitation, errorInvitation);
           }
           isReady();
          };
          ImprovConv.prototype.acceptInvitation = function () {
           var self = this;
           var success = function (data) {
            console.log("Status", data["status"])
            if (data["error"]) {
             $scope.improvConv.acceptInvitationDataError = data["error"];
            } else {
             $("#partner-code-modal").modal("hide");
             $scope.improvConv.acceptInvitationDataError = '';
             self.acts = [];
             angular.forEach(data["results"], function (value, key) {
              self.acts.push({
               description: value.action.action,
               action_period: value.chatAction.action_period
              });
             });
             self.acts.push({
              description: "...END",
              action_period: 1
             })
             setTimeout(function () {
              $scope.$apply(function ()
              {
               $scope.quickPlayWizardStep = "play";
              });
             });
             self.spitActions();
            }
           };
           chatFactory.ajaxPost("../site/acceptInvitation/", $scope.improvConv.acceptInvitationData, success);
          };
          ImprovConv.prototype.invitePlay = function (mode) {
           var self = this;
           switch (mode) {
            case 1:
             console.log("Im now inviting...");
             $http.post("../site/inviteChat", {}).success(function (data) {
              console.log("InviteChat", data["inviteChat"]);
              self.inviteChat = data["inviteChat"];
              self.listenInvite(1);
              if (data.error) {
               self.error = data.error;
               return typeof error === 'function' && error(data);
              }
              typeof success === 'function' && success(data);
             }).error(function (data) {
              typeof error === 'function' && error(data);
             });
             break;
            case 2:
             console.log("I am a quick play mode 2");
             var self = this;
             $http.post("../site/allChatActions/chatId/" + chatId, {}).success(function (data) {
              self.acts = [];
              angular.forEach(data["results"], function (value, key) {
               self.acts.push({
                description: value.action.action,
                action_period: value.chatAction.action_period
               });
              });
              self.acts.push({
               description: "...END",
               action_period: 1
              })
              console.log("Actions", data["results"]);
              self.spitActions();
              if (data.error) {
               self.error = data.error;
               return typeof error === 'function' && error(data);
              }
              typeof success === 'function' && success(data);
             }).error(function (data) {
              typeof error === 'function' && error(data);
             });
             break;
           }
          };
          ImprovConv.prototype.quickPlay = function (mode, chatId) {
           var self = this;
           var data = {
            random: true,
            offset: 0
           };
           var success = function (data) {
            var acts = [];
            angular.forEach(data["results"], function (value, key) {
             acts.push({
              description: value.action.action,
              action_period: value.chatAction.action_period
             });
            });
            acts.push({
             description: "...END",
             action_period: 1
            })
            setTimeout(function () {
             $scope.$apply(function ()
             {
              self.acts = acts;
              self.spitActions();
             });
            });
           }

           switch (mode) {
            case 1:
             chatFactory.ajaxPost("../site/allChatActions/chatId/1", data, success);
             break;
            case 2:
             chatFactory.ajaxPost("../site/allChatActions/chatId/" + chatId, data, success);
             break;
           }
          }
          ImprovConv.prototype.restartQuickPlay = function () {
           var self = this;
           clearTimeout(self.quickPlayTimer);
           clearTimeout(self.isReadyTimer);
           self.currentIndex = 0;
           setTimeout(function () {
            $scope.$apply(function ()
            {
             self.currentAct = self.acts[self.currentIndex];
            });
           });
           self.spitActions();
          };
          ImprovConv.prototype.endQuickPlay = function () {
           var self = this;
           clearTimeout(self.quickPlayTimer);
           self.currentIndex = 0;
           self.acts = [
            {description: "Ready..."}
           ];
           setTimeout(function () {
            $scope.$apply(function ()
            {
             self.currentAct = self.acts[self.currentIndex];
             $scope.quickPlayWizardStep = "home";
             self.inviteChat = [];
            });
           });
          };
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
          $scope.improvConv = new ImprovConv(1);
          $scope.quickPlayWizardStep = "home";
          $scope.chats = [];
          $scope.users = [];
          $scope.user = [];
          $scope.selectedChat = [];
          $scope.acceptInvitationData = '';
          $scope.acceptInvitationDataError = '';

          $scope.showDemo = function () {
           $scope.quickPlayWizardStep = "demo";
          }
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
           $scope.quickPlayWizardStep = "start-type";
           function filterByID(obj) {
            if ('id' in obj && obj.id === chatId) {
             return true;
            } else {
             return false;
            }
           }

           $scope.selectedChat = $scope.chats.filter(filterByID)[0];
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
           //for mobile to init the sound
           var snd = $("#ic-sound").get(0);
           snd.play();
           snd.pause();
          };
          $scope.selectChatsWizard = function () {
           $scope.quickPlayWizardStep = 1;
          };
          $scope.selectRandomPlay = function () {
           $scope.quickPlayWizardStep = 2;
           $scope.improvConv.quickPlay(0);
          };
          $("body").on("click", "#ic-samplestart-btn", function (e) {
           $scope.improvConv.quickPlay();
          });
          $scope.getLoggedInUser();
          $scope.getChats();
          $scope.getUsers();


          $("body").on("click", ".play-me", function () {
           var snd = $("#ic-sound").get(0);
           snd.play();
          })
         }]);