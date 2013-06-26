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
