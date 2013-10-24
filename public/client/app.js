window.Shortly = Backbone.View.extend({

  template: _.template(' \
      <h1>Shortly</h1> \
      <div class="navigation"> \
      <ul> \
        <li><a href="#" class="index">All Links</a></li> \
        <li><a href="#" class="create">Shorten</a></li> \
      </ul> \
      </div> \
      <input type="text" placeholder="Filter links" class="search"></input> \
      <select class="select"> \
        <option value="visits">View Count</option> \
        <option value="title">Title</option> \
        <option value="updated_at">Date</option> \
      </select> \
      <div id="container"></div>'
  ),

  events: {
    "click li a.index":  "renderIndexView",
    "click li a.create": "renderCreateView",
    "keyup input.search": "renderIndexView",
    "change select": "renderIndexView"
  },

  initialize: function(){
    console.log( "Shortly is running" );
    $('body').append(this.render().el);

    this.router = new Shortly.Router({el: this.$el.find("#container")});
    Backbone.history.start({ pushState: true });
    this.router.on('navigate', this.updateNav, this);

  },

  render: function(){
    this.$el.html( this.template() );
    return this;
  },

  renderIndexView: function(e){
    // $("select").fadeIn();
    // $(".search").fadeIn();
    e && e.preventDefault();
    // var links = new Shortly.Links();
    // links.comparator = $('.select').val();
    // var linksView = new Shortly.LinksView( {collection: links, criteria: $('.search').val()} );
    // this.$el.find('#container').html( linksView.render().el );

    this.router.navigate('/', {trigger: true});
    this.updateNav('index');
  },

  renderCreateView: function(e){
    e && e.preventDefault();
    // $("select").hide();
    // $(".search").hide();
    // var linkCreateView = new Shortly.LinkCreateView();
    // this.$el.find('#container').html( linkCreateView.render().el );
    this.router.navigate('/create', {trigger: true});
    this.updateNav('create');
  },

  updateNav: function(className){
    this.$el.find('.navigation li a')
            .removeClass('selected')
            .filter('.'+className)
            .addClass('selected');
  }

});