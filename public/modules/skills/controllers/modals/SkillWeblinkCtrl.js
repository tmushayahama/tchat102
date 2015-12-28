var skillWeblinkCtrl = function (
        SkillWeblinkManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        skillWeblinkData) {
 var vm = this;
 vm.skillId = skillWeblinkData.skill_id;
 vm.skillWeblinkId = skillWeblinkData.id;
 vm.skillWeblinkManager = new SkillWeblinkManager();


 vm.weblinkId = skillWeblinkData.weblink_id;

 vm.weblinkFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newSkillWeblinkData = vm.defaultSkillWeblinkData;

 vm.getSkillWeblink = function (skillId, weblinkId) {
  vm.skillWeblinkManager.getSkillWeblink(skillId, weblinkId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editSkillWeblink = function (data) {
  vm.skillWeblinkManager.editSkillWeblink(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editSkillWeblinkSections = {
  details: function (details) {
   var skillWeblinkData = {
    skillWeblinkId: vm.skillWeblinkId,
    title: details.title,
    description: details.description
   };
   vm.editSkillWeblink(skillWeblinkData);
  }
 }



 vm.showWeblinkForm = function () {
  vm.weblinkFormDisplay = true;
 };



 //--------init------
 vm.getSkillWeblink(vm.skillId, vm.weblinkId);
};


skillWeblinkCtrl.$inject = [
 'SkillWeblinkManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'skillWeblinkData'];

angular.module("app.skills").controller('SkillWeblinkCtrl', skillWeblinkCtrl);
