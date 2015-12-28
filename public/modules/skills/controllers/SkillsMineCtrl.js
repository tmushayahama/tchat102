var skillsMineCtrl = function (
        ConstantsManager,
        SkillsManager,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log,
        $filter) {

 var vm = this;
 vm.skillsManager = new SkillsManager();
 vm.skillsManager.getMySkills();
};


skillsMineCtrl.$inject = [
 'ConstantsManager',
 'SkillsManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.skills").controller('SkillsMineCtrl', skillsMineCtrl);
