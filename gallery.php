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
	<?php
		while( $artwork_items->have_posts() ) : $artwork_items->the_post();
			$permalink_title = esc_attr( sprintf( __( 'Permalink to %s', 'artwork' ), the_title_attribute( 'echo=0' ) ) );
	?>
	<div class="artwork-featured" style="display: none;">
		<a class="artwork-image"
			 href="<?php the_permalink(); ?>"
			 title="<?php echo $permalink_title; ?>"
			 rel="bookmark">
			<?php the_post_thumbnail( 'large' ); ?>
		</a>
		<div class="artwork-information">
			<h3>
				<a href="<?php the_permalink(); ?>"
					 title="<?php echo $permalink_title; ?>"
					 rel="bookmark">
					<?php the_title(); ?>
				</a>
			</h3>
			<?php
				// Using `get_the_content` to opt out of the post type plugin's custom formatting in `the_content` filter
				echo wpautop( get_the_content() );

				// Get taxonomies
				$dimensions = get_the_term_list(
					$post->ID,
					'ag_artwork_dimensions',
					'Dimensions: ',
					', ',
					''
				);

				$media = get_the_term_list(
					$post->ID,
					'ag_artwork_media',
					'Media: ',
					', ',
					''
				);
			?>
			<div class="entry-meta">
				<p><?php the_author(); ?></p>
				<p><?php echo $dimensions; ?></p>
				<p><?php echo $media; ?></p>
			</div> <!-- .entry-meta -->
		</div> <!-- .artwork-information -->
	</div> <!-- .artwork-featured -->
	<?php endwhile; ?>
	<div class="artwork-thumbnails">
		<?php
			rewind_posts(); // Second verse, same as the first
			while( $artwork_items->have_posts() ) : $artwork_items->the_post();
		?>

		<a href="<?php the_permalink(); ?>"
			 title="<?php echo esc_attr(sprintf( __( '%s', 'artwork' ), the_title_attribute( 'echo=0' ) ) ); ?>">
			<?php the_post_thumbnail( 'thumbnail' ); ?>
		</a>

		<?php endwhile; ?>
	</div> <!-- .artwork-thumbnails -->
	<?php endif; // have_posts() ?>
</div> <!-- .artwork-header-gallery -->
<?php endif; // is_front_page() ?>