/*! Twenty Eleven Art Gallery - v0.1.0 - 2013-06-26
 * http://github.com/kadamwhite
 * Copyright (c) 2013; * Licensed GPLv2+ */
this["artgallery"] = this["artgallery"] || {};

this["artgallery"]["assets/js/templates/gallery_featured_image.tmpl"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape, __j = Array.prototype.join;function print() { __p += __j.call(arguments, '') }with (obj) {__p += '<a class="artwork-image" href="' +((__t = ( url )) == null ? '' : __t) +'" title="' +((__t = ( permalink )) == null ? '' : __t) +'" rel="bookmark">\n\t' +((__t = ( image )) == null ? '' : __t) +'\n</a>\n<div class="artwork-information">\n\t<h3>\n\t\t<a href="' +((__t = ( url )) == null ? '' : __t) +'" title="' +((__t = ( permalink )) == null ? '' : __t) +'" rel="bookmark">\n\t\t\t' +((__t = ( title )) == null ? '' : __t) +'\n\t\t</a>\n\t</h3>\n\t'; if ( content ) { ;__p +=((__t = ( content )) == null ? '' : __t); } ;__p += '\n\t<div class="entry-meta">\n\t\t<p>' +((__t = ( artist )) == null ? '' : __t) +'</p>\n\t\t'; if ( dimensions ) { ;__p += '<p>' +((__t = ( dimensions )) == null ? '' : __t) +'</p>'; } ;__p += '\n\t\t'; if ( media ) {      ;__p += '<p>' +((__t = ( media      )) == null ? '' : __t) +'</p>'; } ;__p += '\n\t</div>\n</div>\n';}return __p};
(function( window, $, undefined ) {
	'use strict';

	var $headerGallery, $thumbnails, $featuredArtwork, renderGallery;

	// Grab the template, which has been compiled into a JS function using Grunt
	renderGallery = window.artgallery['assets/js/templates/gallery_featured_image.tmpl'];

	// Don't need `$(document).ready` since this script is loaded at page bottom
	$headerGallery = $('.artwork-header-gallery');
	$thumbnails = $headerGallery.find('.artwork-thumbnails');
	$featuredArtwork = $headerGallery.find('.artwork-featured');

	// Catch any clicks on the image thumbnails
	$thumbnails.on('click', 'a', function( evt ) {
		var data;

		evt.preventDefault();

		// Get the featured image data from the link we clicked
		data = $( this ).data();

		// If we clicked the same image that's showing, do nothing
		if ( data.id === $featuredArtwork.data('id') ) {
			return;
		}

		// If the gallery is open, just switch the image
		if ( $featuredArtwork.is(':visible') ) {
			$featuredArtwork
				.html( renderGallery( data ) )
				// Set the ID so we can do that convenient comparison up above
				.data( 'id', data.id );
		} else {
			// If the gallery is not yet open, slide it open and hide the banner
			$('#branding').children('a').slideUp();
			$featuredArtwork.html( renderGallery( data ) ).slideDown();
			$thumbnails.addClass('open'); // For styling only
		}
	});
})( this, jQuery );
