/*! Twenty Eleven Art Gallery - v0.1.0 - 2013-06-26
 * http://github.com/kadamwhite
 * Copyright (c) 2013; * Licensed GPLv2+ */
(function( window, $, undefined ) {
	'use strict';

	$(document).ready(function() {
		var $headerGallery, $thumbnails, $featuredArtwork;

		$headerGallery = $('.artwork-header-gallery');
		$thumbnails = $headerGallery.find('.artwork-thumbnails');
		$featuredArtwork = $headerGallery.find('.artwork-featured');

		// Catch any clicks on the image thumbnails
		$thumbnails.on('click', 'a', function( evt ) {
			var index, $selectedItem, $visibleItems;

			evt.preventDefault();

			// Figure out which thumbnail we clicked
			index = $( this ).index();

			// Match that index to featured image div
			$selectedItem = $featuredArtwork.eq( index );
			$visibleItems = $featuredArtwork.filter(':visible');

			// If we clicked the same image that's showing, do nothing
			if ( $visibleItems.index() === index ) {
				return;
			}

			// If the gallery is open, just switch the image
			if ( $visibleItems.length ) {
				$visibleItems.hide();
				$selectedItem.show();
			} else {
				// If the gallery is not yet open, slide it open and hide the banner
				$('#branding').children('a').slideUp();
				$selectedItem.slideDown();
				$thumbnails.addClass('open'); // For styling only
			}
		});
	});
})( this, jQuery );