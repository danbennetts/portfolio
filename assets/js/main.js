

(function($) {

	skel.breakpoints({
		wide: '(max-width: 1920px)',
		normal: '(max-width: 1680px)',
		narrow: '(max-width: 1280px)',
		narrower: '(max-width: 1000px)',
		mobile: '(max-width: 736px)',
		mobilenarrow: '(max-width: 480px)',
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$header = $('#header'),
			$all = $body.add($header);

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 0);
			});

		// Touch mode.
			skel.on('change', function() {

				if (skel.vars.mobile || skel.breakpoint('mobile').active)
					$body.addClass('is-touch');
				else
					$body.removeClass('is-touch');

			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on mobile.
			skel.on('+mobile -mobile', function() {
				$.prioritize(
					'.important\\28 mobile\\29',
					skel.breakpoint('mobile').active
				);
			});

		// CSS polyfills (IE<9).
			if (skel.vars.IEVersion < 9)
				$(':last-child').addClass('last-child');

		// Gallery.
			$window.on('load', function() {
				$('.gallery').poptrox({
					baseZIndex: 10001,
					useBodyOverflow: false,
					usePopupEasyClose: false,
					overlayColor: '#1f2328',
					overlayOpacity: 0.65,
					usePopupDefaultStyling: false,
					usePopupCaption: true,
					popupLoaderText: '',
					windowMargin: (skel.breakpoint('mobile').active ? 5 : 50),
					usePopupNav: true
				});
			});

		// Section transitions.
			if (!skel.vars.mobile
			&&	skel.canUse('transition')) {

				var on = function() {

					// Generic sections.
						$('.main.style1')
							.scrollex({
								mode:		'middle',
								delay:		100,
								initialize:	function() { $(this).addClass('inactive'); },
								terminate:	function() { $(this).removeClass('inactive'); },
								enter:		function() { $(this).removeClass('inactive'); },
								leave:		function() { $(this).addClass('inactive'); }
							});

						$('.main.style2')
							.scrollex({
								mode:		'middle',
								delay:		100,
								initialize:	function() { $(this).addClass('inactive'); },
								terminate:	function() { $(this).removeClass('inactive'); },
								enter:		function() { $(this).removeClass('inactive'); },
								leave:		function() { $(this).addClass('inactive'); }
							});

					// Work.
						$('#work')
							.scrollex({
								top:		'40vh',
								bottom:		'30vh',
								delay:		50,
								initialize:	function() {

												var t = $(this);

												t.find('.row.images')
													.addClass('inactive');

											},
								terminate:	function() {

												var t = $(this);

												t.find('.row.images')
													.removeClass('inactive');

											},
								enter:		function() {

												var t = $(this),
													rows = t.find('.row.images'),
													length = rows.length,
													n = 0;

												rows.each(function() {
													var row = $(this);
													window.setTimeout(function() {
														row.removeClass('inactive');
													}, 100 * (length - n++));
												});

											},
								leave:		function(t) {

												var t = $(this),
													rows = t.find('.row.images'),
													length = rows.length,
													n = 0;

												rows.each(function() {
													var row = $(this);
													window.setTimeout(function() {
														row.addClass('inactive');
													}, 100 * (length - n++));
												});

											}
							});

					// Contact.
						$('#contact')
							.scrollex({
								top:		'50%',
								delay:		50,
								initialize:	function() { $(this).addClass('inactive'); },
								terminate:	function() { $(this).removeClass('inactive'); },
								enter:		function() { $(this).removeClass('inactive'); },
								leave:		function() { $(this).addClass('inactive'); }
							});

				};

				var off = function() {

					// Generic sections.
						$('.main.style1')
							.unscrollex();

						$('.main.style2')
							.unscrollex();

					// Work.
						$('#work')
							.unscrollex();

					// Contact.
						$('#contact')
							.unscrollex();

				};

				skel.on('change', function() {

					if (skel.breakpoint('mobile').active)
						(off)();
					else
						(on)();

				});

			}

		// Events.
			var resizeTimeout, resizeScrollTimeout;

			$window
				.resize(function() {

					// Disable animations/transitions.
						$body.addClass('is-resizing');

					window.clearTimeout(resizeTimeout);

					resizeTimeout = window.setTimeout(function() {

						// Update scrolly links.
							$('a[href^=#]').scrolly({
								speed: 1500,
								offset: $header.outerHeight() - 1
							});

						// Re-enable animations/transitions.
							window.setTimeout(function() {
								$body.removeClass('is-resizing');
								$window.trigger('scroll');
							}, 0);

					}, 100);

				})
				.load(function() {
					$window.trigger('resize');
				});

	});

})(jQuery);


// Fake Bash Terminal
$(function() {

	$("#typed").typed({
		strings: ["Hi I'm Daniel. ^3000", "A junior full stack web developer. ^2000", "Welcome to my portfolio. ^1000", "take a look around and if you are interested in any of my projects, just drop me a line at the bottom of the page. ^2000", "Thanks for stopping by!"],
		typeSpeed: 40,
		callback: function() {
			shift();
		}
	});

});

function shift() {
	$(".head-wrap").addClass("shift-text");
	terminalHeight();
}

function terminalHeight() {
	var termHeight = $(".terminal-height");
	var value = termHeight.text();
	value = parseInt(value);
	setTimeout(function() {
		if (value > 10) {
			value = value - 1;
			this.txtValue = value.toString();
			termHeight.text(this.txtValue);
			self.terminalHeight();
		} else {
			clearTimeout();
		}
	}, 10);
}
