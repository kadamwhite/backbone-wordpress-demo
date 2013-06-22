<?php
/**
 * The homepage image gallery.
 *
 * Renders the 6 most recent thumbnails from the artwork custom post type
 *
 * @package Twenty Eleven Art Gallery
 * @since 0.1.0
 */
if ( is_front_page() ) :
	$args = array(
		'post_type' => 'ag_artwork_item',
		'posts_per_page' => 6
	);
	$artwork_items = new WP_Query($args);

	if($artwork_items->have_posts()) :
?>
<div class="artwork-header-gallery">
	<div class="artwork-thumbnails">
		<?php while( $artwork_items->have_posts() ) : $artwork_items->the_post(); ?>

		<a href="<?php the_permalink(); ?>"
			 title="<?php echo esc_attr(sprintf( __( '%s', 'artwork' ), the_title_attribute( 'echo=0' ) ) ); ?>">
			<?php the_post_thumbnail( 'thumbnail' ); ?>
		</a>

		<?php endwhile; ?>
	</div> <!-- .artwork-thumbnails -->
	<?php endif; // have_posts() ?>
</div> <!-- .artwork-header-gallery -->
<?php endif; // is_front_page() ?>