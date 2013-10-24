Shortly.LinksView = Backbone.View.extend({

  className: 'links',

  initialize: function(params){
    this.collection.on('sync', this.addAll, this);
    this.collection.fetch();
    this.criteria = params.criteria || '';
  },

  render: function() {
    this.$el.empty();
    return this;
  },

  addAll: function(){
    this.collection.forEach(function(item) {
      if(item.get('title').toLowerCase().indexOf(this.criteria.toLowerCase()) > -1) {
        this.addOne(item);
      }
    }, this);
  },

  addOne: function(item){
    var view = new Shortly.LinkView( {model: item} );

    this.$el.append(view.render().el);
  }

});