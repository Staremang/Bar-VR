if (typeof(jQuery) !== "undefined") {
	$(document).ready(function () {

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
		
		if (typeof $.fn.owlCarousel  !== 'undefined') {

			$('.section-reviews-slider').addClass('owl-carousel owl-carousel_no-dots owl-theme');
			$('.section-reviews-slider').owlCarousel({
				loop: true,
				nav: true,
				navText: [ '', '' ],
				items: 1,
//				autoWidth:true, 
//				center:true,
			})
			
			
		}
	})
	
}