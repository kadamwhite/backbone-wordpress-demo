/*! Twenty Eleven Art Gallery - v0.1.0 - 2013-06-26
 * http://github.com/kadamwhite
 * Copyright (c) 2013; * Licensed GPLv2+ */
this["artgallery"] = this["artgallery"] || {};

this["artgallery"]["assets/js/templates/gallery_featured_image.tmpl"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape, __j = Array.prototype.join;function print() { __p += __j.call(arguments, '') }with (obj) {__p += '<a class="artwork-image" href="' +((__t = ( url )) == null ? '' : __t) +'" title="' +((__t = ( permalink )) == null ? '' : __t) +'" rel="bookmark">\n\t' +((__t = ( image )) == null ? '' : __t) +'\n</a>\n<div class="artwork-information">\n\t<h3>\n\t\t<a href="' +((__t = ( url )) == null ? '' : __t) +'" title="' +((__t = ( permalink )) == null ? '' : __t) +'" rel="bookmark">\n\t\t\t' +((__t = ( title )) == null ? '' : __t) +'\n\t\t</a>\n\t</h3>\n\t'; if ( content ) { ;__p +=((__t = ( content )) == null ? '' : __t); } ;__p += '\n\t<div class="entry-meta">\n\t\t<p>' +((__t = ( artist )) == null ? '' : __t) +'</p>\n\t\t'; if ( dimensions ) { ;__p += '<p>' +((__t = ( dimensions )) == null ? '' : __t) +'</p>'; } ;__p += '\n\t\t'; if ( media ) {      ;__p += '<p>' +((__t = ( media      )) == null ? '' : __t) +'</p>'; } ;__p += '\n\t</div>\n</div>\n';}return __p};
this.artgallery = this.artgallery || {};

window.artgallery.models = (function( window, Backbone ) {
	'use strict';

	var models = {};

	models.Artwork = Backbone.Model.extend({});

	return models;

})( this, Backbone );

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

// Passing in modules off a namespace is The Poor Man's Require.js
(function( window, $, models, views, undefined ) {
	'use strict';

	var artwork, featuredArtwork, banner, thumbnails;

	// Define our Backbone model
	artwork = new models.Artwork();

	// Define the views for our little gallery. Note that these all use
	// the same model: `thumbnails` receives click events and sets the data,
	// `featuredArtwork` renders the featured artwork area, and `banner`
	// just hides the top banner the first time the gallery opens
	thumbnails = new views.Thumbnails({
		el: '.artwork-thumbnails',
		model: artwork
	});

	featuredArtwork = new views.FeaturedArtwork({
		model: artwork
	});

	banner = new views.Banner({
		el: '#branding > a',
		model: artwork
	});

})( this, jQuery, this.artgallery.models, this.artgallery.views );
