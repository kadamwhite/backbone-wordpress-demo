/**
 * Twenty Eleven Art Gallery
 * http://github.com/kadamwhite
 *
 * Copyright (c) 2013 K.Adam White
 * Licensed under the GPLv2+ license.
 */

// Passing in modules off a namespace is The Poor Man's Require.js
(function( window, $, models, views, undefined ) {
	'use strict';

	var $thumbnails, artwork, featuredArtwork;

	// Define our Backbone model & view instances
	artwork = new models.Artwork();
	featuredArtwork = new views.FeaturedArtwork({
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
})( this, jQuery, this.artgallery.models, this.artgallery.views );
