/**
 * Twenty Eleven Art Gallery
 * http://github.com/kadamwhite
 *
 * Copyright (c) 2013 K.Adam White
 * Licensed under the GPLv2+ license.
 */

(function( window, $, Backbone, undefined ) {
	'use strict';

	var $thumbnails, Artwork, FeaturedArtwork, artwork, featuredArtwork;

	Artwork = Backbone.Model.extend({});

	FeaturedArtwork = Backbone.View.extend({
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

	artwork = new Artwork();
	featuredArtwork = new FeaturedArtwork({
		model: artwork
	});

	// Don't need `$(document).ready` since this script is loaded at page bottom
	$thumbnails = $('.artwork-thumbnails');

	// Catch any clicks on the image thumbnails
	$thumbnails.on('click', 'a', function( evt ) {
		var data;

		evt.preventDefault();

		// Get the featured image data from the link we clicked
		data = $( this ).data();

		// If we clicked the same image that's showing, do nothing
		if ( artwork.id === data.id ) {
			return;
		}

		if ( !artwork.id ) {
			// If the gallery is not yet open, hide the banner
			$('#branding').children('a').slideUp();
			$thumbnails.addClass('open'); // For styling only
		}

		// Set the data for the model, which will trigger a view `.render()`
		artwork.set( data );
	});
})( this, jQuery, Backbone );
