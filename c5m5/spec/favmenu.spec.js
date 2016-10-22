describe('faverate menu', function () {
  var $httpBackend;
  var ApiPath;
  var menuService;
  var $controller;
  var SignUpController;
  var category = 'SP';

  beforeEach(module('public'));
  beforeEach(inject(function (_$controller_, $injector) {
    $controller = _$controller_;
    $httpBackend = $injector.get('$httpBackend');
    ApiPath = $injector.get('ApiPath');
    menuService = $injector.get('MenuService');

    $httpBackend.when('GET', ApiPath + '/menu_items.json?category=' + category)
                .respond({'menu_items': [{'short_name': 'SP3'}, {'short_name': 'SP4'}]});
  }));

  it('should exists', function() {
    menuService.getMenuItems(category).then(function(response){
      // console.log("spec then", response);
      expect(response).toEqual({'menu_items': [{'short_name': 'SP3'}, {'short_name': 'SP4'}]})
    })
    $httpBackend.flush();
  });
});