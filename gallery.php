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
	<script id="gallery-template" type="text/html">
		<a class="artwork-image" href="<%= url %>" title="<%= permalink %>" rel="bookmark">
			<%= image %>
		</a>
		<div class="artwork-information">
			<h3>
				<a href="<%= url %>" title="<%= permalink %>" rel="bookmark">
					<%= title %>
				</a>
			</h3>
			<% if ( content ) { %><%= content %><% } %>
			<div class="entry-meta">
				<p><%= artist %></p>
				<% if ( dimensions ) { %><p><%= dimensions %></p><% } %>
				<% if ( media ) {      %><p><%= media      %></p><% } %>
			</div>
		</div>
	</script>

	<div class="artwork-featured" style="display: none;"></div>
	<div class="artwork-thumbnails">
		<?php
			while( $artwork_items->have_posts() ) : $artwork_items->the_post();

				$permalink_title = esc_attr( sprintf( __( 'Permalink to %s', 'artwork' ), the_title_attribute( 'echo=0' ) ) );
				$image = get_the_post_thumbnail( $post->ID, 'large' );
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

		<a href="<?php the_permalink(); ?>"
			 data-title="<?php the_title_attribute(); ?>"
			 data-artist="<?php the_author(); ?>"
			 data-id="<?php echo $post->ID; ?>"
			 data-image="<?php echo esc_attr( $image ); ?>"
			 data-content="<?php echo esc_attr( wpautop( get_the_content() ) ); ?>"
			 data-dimensions="<?php echo esc_attr( $dimensions ); ?>"
			 data-permalink="<?php echo esc_attr( $permalink_title ); ?>"
			 data-url="<?php echo the_permalink(); ?>"
			 data-media="<?php echo esc_attr( $media ); ?>"
			 title="<?php echo esc_attr(sprintf( __( '%s', 'artwork' ), the_title_attribute( 'echo=0' ) ) ); ?>">
			<?php the_post_thumbnail( 'thumbnail' ); ?>
		</a>

		<?php endwhile; ?>
	</div> <!-- .artwork-thumbnails -->
	<?php endif; // have_posts() ?>
</div> <!-- .artwork-header-gallery -->
<?php endif; // is_front_page() ?>