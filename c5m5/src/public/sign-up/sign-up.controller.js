(function(){
	"use strict";

	angular.module('public')
	.controller('SignUpController', SignUpController);

	SignUpController.$inject = ['MenuService', '$scope'];
	function SignUpController(MenuService, $scope){
		var ctrl = this;
		ctrl.signed = false;

		ctrl.disableBtn = function(){
			ctrl.disablebtn = true;
		}

		ctrl.submit = function() {
			ctrl.signed = true;
			MenuService.userInfo = {
				'firstname': ctrl.firstname,
				'lastname': ctrl.lastname,
				'phone': ctrl.phone,
				'email': ctrl.email,
				'favmenu': ctrl.favmenu
			}

			if (ctrl.firstname != undefined) {
				MenuService.registered = true;
			}
		}
	}
})();