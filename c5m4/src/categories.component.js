(function(){
	angular.module('MenuApp')
	.component('categories', {
		templatesUrl: 'src/templates/categories.template.html',
		binds: {
			categories: '<'
		}
	});

})();