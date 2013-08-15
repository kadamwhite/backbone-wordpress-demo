/*! Twenty Eleven Art Gallery - v0.1.0 - 2013-06-26
 * http://github.com/kadamwhite
 * Copyright (c) 2013; * Licensed GPLv2+ */
(function( window, $, undefined ) {
	'use strict';

	var $headerGallery, $thumbnails, $featuredArtwork, render;

	render = function( data ) {
		// Concatenate the HTML and the data into a JavaScript string
		return [
			'<a class="artwork-image" href="', data.url, '" title="', data.permalink, '" rel="bookmark">',
				data.image,
			'</a>',
			'<div class="artwork-information">',
				'<h3>',
					'<a href="', data.url, '" title="', data.permalink, '" rel="bookmark">',
						data.title,
					'</a>',
				'</h3>',
				data.content,
				'<div class="entry-meta">',
					'<p>', data.author, '</p>',
					'<p>', data.dimensions, '</p>',
					'<p>', data.media, '</p>',
				'</div>',
			'</div>'
		].join('');
	};

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
				.html( render( data ) )
				// Set the ID so we can do that convenient comparison up above
				.data( 'id', data.id );
		} else {
			// If the gallery is not yet open, slide it open and hide the banner
			$('#branding').children('a').slideUp();
			$featuredArtwork.html( render( data ) ).slideDown();
			$thumbnails.addClass('open'); // For styling only
		}
	});
})( this, jQuery );