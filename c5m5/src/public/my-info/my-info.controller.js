(function(){
	"use strict";

	angular.module('public')
	.controller('MyInfoController', MyInfoController);
	MyInfoController.$inject = ['MenuService'];
	function MyInfoController(MenuService){
		var ctrl = this;
		ctrl.registered = MenuService.registered;

		if (ctrl.registered) {
			ctrl.userInfo = MenuService.getUserInfo();
			// -----for TEST-----
			// ctrl.userInfo = {
			// 	'firstname': 'Joee',
			// 	'lastname': 'Ling',
			// 	'email': 'joe@ling.com',
			// 	'phone': '123-123-1233',
			// 	'favmenu': 'SP2'
			// }
			//------TEST-----
			var favShortName = ctrl.userInfo.favmenu;
			ctrl.favItem = {};
			console.log(ctrl.userInfo);
			MenuService.getMenuItems().then(function(rsp){

	      		for (var x in rsp.menu_items ){
	      			var item = rsp.menu_items[x];
					var stname;
					stname = item.short_name;
					if (stname == favShortName) {
						ctrl.favItem.description = item.description;
						ctrl.favItem.name = item.name;
					}
	      		}
	      	});
	      }
	}
})();