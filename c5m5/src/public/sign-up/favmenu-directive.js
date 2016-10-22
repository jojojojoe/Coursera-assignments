(function(){
	"use strict";

	angular.module('public')
	.directive('favmenuDirective', favmenuDirective);

	favmenuDirective.$inject = ['MenuService'];
	function favmenuDirective(MenuService){
		return {
			controller: 'SignUpController',
			controllerAs: 'signUpCtrl',
			scope: {
				disablebtn: '=disablebtn'
			},
			require: 'ngModel',
			link: function(scope, element, attr, ctrl) {
		      function myValidation(value) {
		      	// console.log(MenuService.getMenuItems());
		      	MenuService.getMenuItems().then(function(rsp){

		      		for (var x in rsp.menu_items ){
						var stname;
						stname = rsp.menu_items[x].short_name;
						if (stname == value) {
							scope.disablebtn = false;
					        ctrl.$setValidity('validfavmenu', true);
							return;
						}else{
							ctrl.$setValidity('validfavmenu', false);
						}
		      		}
		      	});
		        return value;
		      }
		      ctrl.$parsers.push(myValidation);
		    }
		};
	}
})();