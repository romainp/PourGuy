Products = new Mongo.Collection('products');

if (Meteor.isClient) {
  // counter starts at 0

  Template.fridge.helpers({
    products: function () {
      return Products.find({
        place: 'fridge',
      })
    }
  });

  Template.fridge.onRendered(function(){
    var templateInstance = this;
    templateInstance.$('#fridge').droppable({
      drop: function(evt, ui) {
        var query = { _id: ui.draggable.data('id') };
        var changes = { $set: { place: 'fridge' }};
        Products.update(query,changes);
      }
    });
  });

  Template.productListItem.onRendered(function(){
    var templateInstance = this;
    templateInstance.$('.draggable').draggable({
      cursor: 'move',
      helper: 'clone'
    });
  });

  Template.productList.helpers({
      products: function () {
        return Products.find({
          place: 'supermarket',
        })
      }
  });

  Template.productList.onRendered(function(){
    var templateInstance = this;
    templateInstance.$('#supermarket').droppable({
      drop: function(evt, ui) {
        var query = { _id: ui.draggable.data('id') };
        var changes = { $set: { place: 'supermarket' }};
        Products.update(query,changes);
      }
    });
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Products.remove({});

    Products.insert({
      name: 'Milk',
      img: '/milk.png',
      place: 'supermarket'
    });

    Products.insert({
      name: 'Bread',
      img: '/bread.png',
      place: 'supermarket'
    });

    Products.insert({
      name: 'Banana',
      img: '/banana.png',
      place: 'supermarket'
    });

    Products.insert({
      name: 'Juice',
      img: '/juice.png',
      place: 'supermarket'
    });

    Products.insert({
      name: 'Bacon',
      img: '/bacon.jpg',
      place: 'supermarket'
    });

  });
}
