Shortly.LinksView = Backbone.View.extend({

  className: 'links',

  initialize: function(params){
    this.collection.on('sync', this.addAll, this);
    this.collection.fetch();
    // this.collection.on('reset', this.addAll, this);
    this.criteria = params.criteria || '';
  },

  render: function() {
    this.$el.empty();
    // this.$el.on('click', function(){
    //   this.collection.sort();
    //   console.log('hi');
    // });
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