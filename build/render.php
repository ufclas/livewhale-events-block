<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<p <?php echo get_block_wrapper_attributes(); ?>>
	<?php
	if ($attributes['liveWhaleID']) {
	?>
		<section class="event-shell">
		<div class="event-shell-wrapper">
		<div class="col-12 text-center">
		<h2><?php echo $attributes['liveWhaleEventsTitle']; ?></h2>
		</div>
		<div class="lwcw slick event-shell-carousel py-5" data-options="id=<?php echo $attributes['liveWhaleID'] ?>&amp;format=html"> </div>
		<script type="text/javascript" id="lw_lwcw" src="https://ufl.lwcal.com/livewhale/theme/core/scripts/lwcw.js" defer></script></div>
		</section>
	<?php
	}
	?>
</p>