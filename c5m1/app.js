(function(){
	'use strict';
	angular.module('LunchCheck', [])
	.controller('LunchCheckController', LunchCheckController);
	LunchCheckController.$inject = ['$scope'];
	function LunchCheckController ($scope){
		$scope.items = "";
		$scope.results = "";
		var outputstyle = {};
		var inputstyle = {};
		$scope.checkLunch = function(){
			if ($scope.items == "") {
				outputstyle = {
					"display": "inline-block",
					"color": "red",
				};
				inputstyle = {
					"border-color": "red",
				};
				$scope.results = "Please enter data first";
			}else{
				outputstyle = {
					"display": "inline-block",
					"color": "green",
				};
				inputstyle = {
						"border-color": "green",
				};

				var initialItems = $scope.items.split(',');
				var finalItmes = [];
				var j = 0;
				for (var i in initialItems){
					initialItems[i] = initialItems[i].trim();
					if (initialItems[i] != "") {
						finalItmes[j] = initialItems[i];
						j += 1;
					}
				}
				if ( finalItmes.length > 3) {
					$scope.results = "Too much!";
				}else{
					$scope.results = "Enjoy!";
				}
			}

			$scope.outputstyle = outputstyle;
			$scope.inputstyle = inputstyle;
			return $scope.results;
		};
	};
})();