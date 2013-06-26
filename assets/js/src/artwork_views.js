this.artgallery = this.artgallery || {};

this.artgallery.views = (function( window, $, _, Backbone ) {
	'use strict';

	var views = {};

	views.FeaturedArtwork = Backbone.View.extend({
		el: '.artwork-featured',

		// Pull in our cached template
		template: window.artgallery['assets/js/templates/gallery_featured_image.tmpl'],

		render: function() {
			this.$el.html( this.template( this.model.attributes ) );
			// Always return `this`, to enable chaining
			return this;
		},

		show: function() {
			this.$el.slideDown();
		},

		initialize: function( options ) {
			// Automatically update when the data changes. `listenTo` and
			// `listenToOnce` are part of Backbone 1.0, so you must manually
			// re-register the latest Backbone.js (or be running WP 3.6). On the
			// version of Backbone in 3.5, you may use this syntax instead:
			//     var render = _.bind( this.render, this );
			//     this.model.on( 'change', render );
			this.listenTo( this.model, 'change', this.render );
			this.listenToOnce( this.model, 'change', this.show );
		}
	});

	views.Banner = Backbone.View.extend({
		initialize: function() {
			this.listenToOnce( this.model, 'change', this.hide );
		},

		show: function() {
			this.$el.slideDown();
		},

		hide: function() {
			this.$el.slideUp();
		}
	});

	views.Thumbnails = Backbone.View.extend({
		// Backbone gives us a convenient syntax for defining
		// all of our view's delegated jQuery events:
		events: {
			'click a': 'select'
		},

		select: function( evt ) {
			// Have to go through evt.target: `this` is bound to the View object
			var imageData = $( evt.target ).parent('a').data();

			evt.preventDefault();

			if ( this.model.id !== imageData.id ) {
				this.model.set( imageData );
			}
		},

		initialize: function() {
			this.listenToOnce( this.model, 'change', function() {
				this.$el.addClass('open');
			});
		}
	});

	return views;

})( this, jQuery, _, Backbone );
