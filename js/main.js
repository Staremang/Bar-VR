
/**
 * anchor.js - jQuery Plugin
 * Jump to a specific section smoothly
 *
 * @dependencies	jQuery v1.5.0 http://jquery.com
 * @author			Cornel Boppart <cornel@bopp-art.com>
 * @copyright		Author
 
 * @version		1.0.5 (02/11/2014)
 */

;(function ($) {
	
	window.anchor = {
		
		/**
		 * Default settings
		 *
		 */
		settings: {
			transitionDuration: 2000,
			transitionTimingFunction: 'swing',
			labels: {
				error: 'Couldn\'t find any section'
			}
		},

		/**
		 * Initializes the plugin
		 *
		 * @param	{object}	options	The plugin options (Merged with default settings)
		 * @return	{object}	this	The current element itself
		 */
		init: function (options) {
			// Apply merged settings to the current object
			$(this).data('settings', $.extend(anchor.settings, options));

			return this.each(function () {
				var $this = $(this);

				$this.unbind('click').click(function (event) {
					event.preventDefault();
					anchor.jumpTo(
						anchor.getTopOffsetPosition($this),
						$this.data('settings')
					);
				});
			});
		},

		/**
		 * Gets the top offset position
		 *
		 * @param	{object}	$object				The root object to get sections position from
		 * @return	{int}		topOffsetPosition	The top offset position
		 */
		getTopOffsetPosition: function ($object) {
			var href = $object.attr('href'),
				$section = $($(href).get(0)),
				documentHeight = $(document).height(),
				browserHeight = $(window).height();

			if (!$section || $section.length < 1) {
				throw new ReferenceError(anchor.settings.labels.error);
			}

			if (($section.offset().top + browserHeight) > documentHeight) {
				return documentHeight - browserHeight;
			} else {
				return $section.offset().top;
			}
		},
		
		/**
		 * Jumps to the specific position
		 *
		 * @param	{int}		topOffsetPosition	The top offset position
		 * @param	{object}	settings			The object specific settings
		 * @return	{void}
		 */
		jumpTo: function (topOffsetPosition, settings) {
			var $viewport = $('html, body');

			$viewport.animate(
				{scrollTop: topOffsetPosition},
				settings.transitionDuration,
				settings.transitionTimingFunction
			);

				// Stop the animation immediately, if a user manually scrolls during the animation.
			$viewport.bind('scroll mousedown DOMMouseScroll mousewheel keyup', function(event){
				if (event.which > 0 || event.type === 'mousedown' || event.type === 'mousewheel') {
					$viewport.stop().unbind('scroll mousedown DOMMouseScroll mousewheel keyup');
				}
			});
		}

	};

	$.fn.anchor = function (method) {
			// Method calling logic
		if (anchor[method]) {
			return anchor[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return anchor.init.apply(this, arguments);
		} else {
			return $.error('Method ' + method + ' does not exist on jQuery.anchor');
		}
	};

})(jQuery);


if (typeof(jQuery) !== "undefined") {
	$(document).ready(function () {
		$('#date').dateDropper();
		$('#time').timeDropper({
			format: 'HH:00',
			setCurrentTime: false
		});

		$('.nav-menu-btn').click(function() {
			if ($(this).hasClass('open')) {
				$(this).removeClass('open');
				$(this).children('.nav-menu-btn__text').html('Открыть меню')
				$('.menu').removeClass('open');
			} else {
				$(this).addClass('open');
				$(this).children('.nav-menu-btn__text').html('Закрыть меню');
				$('.menu').addClass('open');
			}
		})


		$('.section-game-list__category-link').click(function(e) {
			e.preventDefault();

			$('.section-game-list__category-link').removeClass('active');
			$(this).addClass('active');

			$('.section-game-list__tab').removeClass('active');
			$('.section-game-list__tab[data-tab="' + $(this).attr('data-tab') + '"]').addClass('active');

		})
		
//		var totalPrice = 0;
		$('.reservation__item').click(function () {
			$(this).toggleClass('active');
			var total = 0;
			$('.reservation__item.active').each(function () {
				total += +$(this).attr('data-price');
			})
			$('.reservation__total-num').html(total.toString() + ' Р');
		})
		
		
		$('a[data-anchor]').anchor({
			transitionDuration : 1000
		});
		
		var popup = false;
		$('[data-popup]').click(function (e) {
			e.preventDefault();
			if (popup) {
				$('body').css('overflow', 'auto');
				$('.popup.active').fadeOut();
				$('.popup.active').removeClass('active');
				popup = false;
			} else {
				$('body').css('overflow', 'hidden');
				$('#' + $(this).attr('data-popup')).addClass('active');
				$('#' + $(this).attr('data-popup')).fadeIn();
				popup = true;
			}
		})
		$('.popup').click(function(e) {
			if ($(e.target).hasClass('popup')) {
				
//				e.preventDefault();
				$(this).fadeOut();
				$(this).removeClass('active');
				$('body').css('overflow', 'auto');
				popup = false;
			}
		})
		
		if (typeof $.fn.owlCarousel  !== 'undefined') {

			$('.section-reviews-slider').addClass('owl-carousel owl-carousel_no-dots owl-theme');
			$('.section-reviews-slider').owlCarousel({
				loop: true,
				nav: false,
				navText: [ '', '' ],
				items: 1,
//				autoWidth:true, 
//				center:true,
				responsive : {
					768 : {
						nav: true
					}
				}
				})
			
			
		}
	})
	
}