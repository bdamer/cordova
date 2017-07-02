(function() {
	console.log('init script');
	
	DATA = DATA || {};

	var bind = function(controlId, data) {
		$.each(data, function(id, val) {
			$(controlId).append($('<option>', {
				value: id, 
				text: val.name
			}));
		});
	};

	/* For having a faster transition */
	$(document).on('mobileinit', function() {
		//$.mobile.defaultPageTransition = 'none';
		//$.mobile.defaultDialogTransition = 'none';
		$.mobile.page.prototype.options.domCache = true;
	});                
	
	$(document).on('pagecreate', '#character-list', function() {
		console.log('init character list');
		$("#character-list a").click(function() {
			// TODO: load character
			$.mobile.navigate("#character-details");
		});
	});
	
	$(document).on('pagecreate', '#character-details', function() {
		console.log('init character details');
		
		$("#character-details").on('swipe', function(ev) {
			ev.stopImmediatePropagation();
			var dx = ev.swipestop.coords[0] - ev.swipestart.coords[0];
			// navigate left
			if (dx > 0) {
				$.mobile.navigate("#character-list");
			// navigate right
			} else if (dx < 0) {
				$.mobile.navigate("#abilities");
			}		
		});
		
		// Populate dropdowns
		bind('#cd_race', DATA.RACES);
		bind('#cd_class', DATA.CLASSES);
		bind('#cd_alignment', DATA.ALIGNMENT);	
		bind('#cd_deity', DATA.DEITIES);
	});
	
	$(document).on('pagecreate', '#abilities', function() {
		console.log('init abilities');
		
		$("#abilities").on('swipe', function(ev) {
			ev.stopImmediatePropagation();
			var dx = ev.swipestop.coords[0] - ev.swipestart.coords[0];
			// navigate left
			if (dx > 0) {
				$.mobile.navigate("#character-details");
			// navigate right
			} else if (dx < 0) {
			}		
		});
		
		$(".btn-ability-dec").click(function() {
			var ability = $(this).attr('data-ability');
			console.log('decrease', ability);
			var base = C.getBase(ability);
			base--;
			C.setBase(ability, base);			
			$("#ab_" + ability).html(base);
		});
		
		$(".btn-ability-inc").click(function() {
			var ability = $(this).attr('data-ability');
			console.log('increase', ability);
			var base = C.getBase(ability);
			base++;
			C.setBase(ability, base);
			$("#ab_" + ability).html(base);
		});
		
	});
})();