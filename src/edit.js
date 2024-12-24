/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

function formCalendarElement(value){
	return new Promise((resolve, reject) => {
		try {
			var d = document.createElement('div');
			d.className += " lwcw slick event-shell-carousel py-5 edited";
			d.setAttribute('data-options', `id=${value}&format=html`);
			// Append the new calendar element to the DOM
			document.body.appendChild(d);
			resolve();
		} catch (error) {
			reject(error);
		}
	});
}

function loadScript(){
	return new Promise((resolve, reject) => {
		try {
			var e = document.createElement('script'); 
			e.src = 'https://ufl.lwcal.com/livewhale/theme/core/scripts/lwcw.js';
			e.id = 'lw_lwcw';
			e.type = 'text/javascript';
			e.defer = true;
			document.body.appendChild(e);
			resolve();
		} catch (error) {
			reject(error);
		}
	});
}

function editID(value, setAttributes){
	setAttributes( { liveWhaleID: value } );

	(function () {

		window.LW_REMOTE_WIDGET_INITIALIZED = undefined;

		formCalendarElement(value)
			.then(() => loadScript())
			.catch((error) => {
				console.error('An error occurred:', error);
			});

	  } ());

}

export default function Edit({attributes, setAttributes}) {
	const { liveWhaleEventsTitle, liveWhaleID } = attributes;

	// Your code to fetch data or perform an action when the component mounts
	formCalendarElement(liveWhaleID)
	.then(() => loadScript())

    return (
        <>
            <InspectorControls>
				<PanelBody title={__( 'Settings', 'livewhale-events-block' )}>
					<TextControl 
						label={ __('LiveWhale ID', 'livewhale-events-block')}
						value={ liveWhaleID || '' }
						onChange={ (value) => editID(value, setAttributes) }
					/>
					<TextControl 
						label={ __('Title', 'livewhale-events-block')}
						value={ liveWhaleEventsTitle || '' }
						onChange={ (value) => setAttributes( { liveWhaleEventsTitle: value })}
					/>
				</PanelBody>
            </InspectorControls>
			<div {...useBlockProps()} >
				{ !attributes.liveWhaleID && (
					<p className='notice'>Enter livewhale ID in block settings to the right.</p>
				)}
				{ attributes.liveWhaleID && (                    
					<div>
						<p className='notice'>The following events will be displayed in a carousel.</p>
						<section className="event-shell" >
							<div className="event-shell-wrapper">
								<div className="col-12">
									<h2>{ attributes.liveWhaleEventsTitle }</h2>
								</div>
								<div className="lwcw slick event-shell-carousel py-5" data-options={`id=${attributes.liveWhaleID}&format=html`}> </div>
								<script type="text/javascript" id="lw_lwcw" src="https://ufl.lwcal.com/livewhale/theme/core/scripts/lwcw.js" defer></script>
							</div>
						</section>
					</div>
				) }
			</div>

        </>
    );
}
