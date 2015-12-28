var skillTimelineCtrl = function (
        SkillTimelineManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        skillTimelineData) {
 var vm = this;
 vm.skillId = skillTimelineData.skill_id;
 vm.skillTimelineId = skillTimelineData.id;
 vm.skillTimelineManager = new SkillTimelineManager();


 vm.timelineId = skillTimelineData.timeline_id;

 vm.timelineFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newSkillTimelineData = vm.defaultSkillTimelineData;

 vm.getSkillTimeline = function (skillId, timelineId) {
  vm.skillTimelineManager.getSkillTimeline(skillId, timelineId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editSkillTimeline = function (data) {
  vm.skillTimelineManager.editSkillTimeline(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editSkillTimelineSections = {
  details: function (details) {
   var skillTimelineData = {
    skillTimelineId: vm.skillTimelineId,
    title: details.title,
    description: details.description
   };
   vm.editSkillTimeline(skillTimelineData);
  }
 }



 vm.showTimelineForm = function () {
  vm.timelineFormDisplay = true;
 };



 //--------init------
 vm.getSkillTimeline(vm.skillId, vm.timelineId);
};


skillTimelineCtrl.$inject = [
 'SkillTimelineManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'skillTimelineData'];

angular.module("app.skills").controller('SkillTimelineCtrl', skillTimelineCtrl);
