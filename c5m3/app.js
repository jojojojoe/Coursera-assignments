(function(){
	'use strict';

	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.directive('foundItems', FoundItemsDirective);
	// .directive('itemsLoaderIndicator',ItemsLoaderIndicator);
	// function ItemsLoaderIndicator(){
	// 	var ddo = {
	// 		templateUrl: 'loader/itemsloaderindicator.template.html'
	// 	}
	// 	return ddo;
	// }


	function FoundItemsDirective(){
		var ddo = {
			templateUrl: 'foundItems.html',
			scope:{
				found: '<',
				onRemove: '&',
				notFoundOrEmpty: '<',
				isJustInitialized: '<'
			},
		};
		return ddo;
	}

	NarrowItDownController.$inject = ['MenuSearchService', '$scope'];
	function NarrowItDownController(MenuSearchService, $scope){
		var ctrl = this;
		ctrl.notFoundOrEmpty = true;
		ctrl.isJustInitialized = true;
		$scope.searchTerm = "";
		ctrl.getNarrowedItems = function(){
			var promise = MenuSearchService.getMatchedMenuItems($scope.searchTerm);
			promise.then(function(response){
				ctrl.isJustInitialized = false;
				ctrl.found = response;
				if (!$scope.searchTerm.trim()) {
					ctrl.notFoundOrEmpty = true;
				} else if($scope.searchTerm.trim() && !MenuSearchService.menuSearchResult){
					ctrl.notFoundOrEmpty = true;
				} else{
					ctrl.notFoundOrEmpty = false;
				}
			});
		}
		ctrl.removeItem = function(itemIndex){
			ctrl.found.splice(itemIndex, 1);
		}

	}

	MenuSearchService.$inject = ['$http', '$q'];
	function MenuSearchService($http, $q){
		var service = this;
		service.getMatchedMenuItems = function(searchTerm){
			return $http({
		      method: "GET",
		      // url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
		      url: "menu_items.json"
		    }).then(function (result) {
			  // process result and only keep items that match
			  var items = result.data.menu_items;
			  var foundItems = [];
			  for(var index in items){
			  	var desc = items[index].description.split(' ');
			  	if (desc.indexOf(searchTerm) != -1) {
				  foundItems.push([items[index]]);
				}
			  }
			  if (foundItems.length != 0) {
			  	service.menuSearchResult = true;
			  }else{
			  	service.menuSearchResult = false;
			  }
			  // console.log(foundItems.length);
			  return foundItems;
			});
		};
	}

})();