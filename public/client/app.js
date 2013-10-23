window.Shortly = Backbone.View.extend({

  template: _.template(' \
      <h1>Shortly</h1> \
      <div class="navigation"> \
      <ul> \
        <li><a href="#" class="index">All Links</a></li> \
        <li><a href="#" class="create">Shorten</a></li> \
      </ul> \
      </div> \
      <input type="text" class="search"></input> \
      <div id="container"></div>'
  ),

  events: {
    "click li a.index":  "renderIndexView",
    "click li a.create": "renderCreateView",
    "keyup input.search": "filter"
  },

  initialize: function(){
    console.log( "Shortly is running" );
    $('body').append(this.render().el);
    this.renderIndexView(); // default view
  },

  render: function(){
    this.$el.html( this.template() );
    return this;
  },

  filter: function(e){
    // this.renderIndexView(e.tar)

    var $target = $(e.target);

    this.renderIndexView(null,$target.val());

    // App.Mediator.trigger("filterLists", $(@el).attr("value"))
  },

  // Good to not make a new collection every time this way?
  // links: new Shortly.Links(),

  renderIndexView: function(e, searchValue){
    e && e.preventDefault();
    var links = new Shortly.Links();
    links.comparator = 'visits';
    var linksView = new Shortly.LinksView( {collection: links, criteria: searchValue} );
    this.$el.find('#container').html( linksView.render().el );
    this.updateNav('index');
  },

  renderCreateView: function(e){
    e && e.preventDefault();
    var linkCreateView = new Shortly.LinkCreateView();
    this.$el.find('#container').html( linkCreateView.render().el );
    this.updateNav('create');
  },

  updateNav: function(className){
    this.$el.find('.navigation li a')
            .removeClass('selected')
            .filter('.'+className)
            .addClass('selected');
  }

});