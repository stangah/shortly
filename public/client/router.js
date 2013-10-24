Shortly.Router = Backbone.Router.extend({

  routes: {
    ''      : 'index',
    'create': 'create'
  },

  initialize: function(params) {
    this.$el = params.el;
  },

  swapView: function(){

  },

  index: function() {
    var links = new Shortly.Links();
    links.comparator = $('.select').val();
    var linksView = new Shortly.LinksView( {collection: links, criteria: $('.search').val()} );
    this.$el.html( linksView.render().el );
  },

  create: function() {
    $("select").hide();
    $(".search").hide();
    var linkCreateView = new Shortly.LinkCreateView();
    this.$el.html( linkCreateView.render().el );
  }

});