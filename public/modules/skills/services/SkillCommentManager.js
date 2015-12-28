var skillCommentManager = function ($http, $q) {

 var SkillCommentManager = function () {
  this.skillComments = [];
 };
 SkillCommentManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
  if (!data || typeof data !== 'object') {
   this.error = 'Error';
  }
  if (!this.error && data.result && data.result.error) {
   this.error = data.result.error;
  }
  if (!this.error && data.error) {
   this.error = data.error.message;
  }
  if (!this.error && defaultMsg) {
   this.error = defaultMsg;
  }
  if (this.error) {
   return deferred.reject(data);
  }
  return deferred.resolve(data);
 };


 SkillCommentManager.prototype.getSkillComment = function (skillId, commentId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/skill/' + skillId + '/comment/' + commentId).success(function (data) {
   self.skillComment = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 SkillCommentManager.prototype.editSkillComment = function (skillCommentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/skill/comment/edit',
   data: skillCommentData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return SkillCommentManager;
};

skillCommentManager.$inject = ['$http', '$q'];

angular.module('app.skills').service('SkillCommentManager', skillCommentManager);
