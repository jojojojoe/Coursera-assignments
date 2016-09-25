(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController (ShoppingListCheckOffService) {
  var toBuyList = this;
  toBuyList.items = ShoppingListCheckOffService.getToBuyItems();

  toBuyList.markAsBought = function  (index) {
    var selectedItem = toBuyList.items[index];
    ShoppingListCheckOffService.addBoughtItem(selectedItem);
    ShoppingListCheckOffService.removeToBuyItem(index);
  }
}


AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController (ShoppingListCheckOffService) {
  var boughtList = this;
  boughtList.items = ShoppingListCheckOffService.getBoughtItems();
}


function ShoppingListCheckOffService () {
  var service = this;
  var tobuy = [
    {name: 'cookies', quantity: 10},
    {name: 'coco-cola', quantity: 1},
    {name: 'chips', quantity: 10},
    {name: 'sugar water', quantity: 5},
    {name: 'lenmons', quantity: 3},
    {name: 'apples', quantity: 8},
    {name: 'oranges', quantity: 6},
  ];
  var bought = [];

  service.removeToBuyItem = function (itemIdex) {
    tobuy.splice(itemIdex, 1);
  };

  service.getToBuyItems = function () {
    return tobuy;
  };

  service.addBoughtItem = function (item) {
    bought.push(item);
  };

  service.getBoughtItems = function () {
    return bought;
  };

}


})();
