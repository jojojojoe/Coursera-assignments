(function(){
	'use strict';
	angular.module('LunchCheck', [])
	.controller('LunchCheckController', LunchCheckController);
	LunchCheckController.$inject = ['$scope'];
	function LunchCheckController ($scope){
		$scope.items = "";
		$scope.results = "";
		var mystyle = {};
		$scope.checkLunch = function(){
			if ($scope.items == "") {
				mystyle = {
						"display": "inline-block",
						"color": "red",
						"border": "1px solid red",
					};

				$scope.results = "Please enter data first";
			}else{
				mystyle = {
						"display": "inline-block",
						"color": "green",
						"border": "1px solid green",
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
				// console.log(initialItems);
				console.log(finalItmes);
				if ( finalItmes.length > 3) {
					$scope.results = "Too much!";
				}else{
					$scope.results = "Enjoy!";
				}
			}

			$scope.mystyle = mystyle;
			return $scope.results;
		};
	};
})();