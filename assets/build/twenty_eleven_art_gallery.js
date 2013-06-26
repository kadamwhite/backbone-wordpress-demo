/*! Twenty Eleven Art Gallery - v0.1.0 - 2013-06-26
 * http://github.com/kadamwhite
 * Copyright (c) 2013; * Licensed GPLv2+ */
this["artgallery"] = this["artgallery"] || {};

this["artgallery"]["assets/js/templates/gallery_featured_image.tmpl"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape, __j = Array.prototype.join;function print() { __p += __j.call(arguments, '') }with (obj) {__p += '<a class="artwork-image" href="' +((__t = ( url )) == null ? '' : __t) +'" title="' +((__t = ( permalink )) == null ? '' : __t) +'" rel="bookmark">\n\t' +((__t = ( image )) == null ? '' : __t) +'\n</a>\n<div class="artwork-information">\n\t<h3>\n\t\t<a href="' +((__t = ( url )) == null ? '' : __t) +'" title="' +((__t = ( permalink )) == null ? '' : __t) +'" rel="bookmark">\n\t\t\t' +((__t = ( title )) == null ? '' : __t) +'\n\t\t</a>\n\t</h3>\n\t'; if ( content ) { ;__p +=((__t = ( content )) == null ? '' : __t); } ;__p += '\n\t<div class="entry-meta">\n\t\t<p>' +((__t = ( artist )) == null ? '' : __t) +'</p>\n\t\t'; if ( dimensions ) { ;__p += '<p>' +((__t = ( dimensions )) == null ? '' : __t) +'</p>'; } ;__p += '\n\t\t'; if ( media ) {      ;__p += '<p>' +((__t = ( media      )) == null ? '' : __t) +'</p>'; } ;__p += '\n\t</div>\n</div>\n';}return __p};
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
