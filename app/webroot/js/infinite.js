/*global Sly */
jQuery(function ($) {
	'use strict';
		var options = {
			scrollBy: 200,
			speed: 200,
			easing: 'easeOutQuart',
			scrollBar: '#scrollbar',
			dynamicHandle: 1,
			dragHandle: 1,
			clickBar: 1,
			mouseDragging: 1,
			touchDragging: 1,
			releaseSwing: 1
		};
		var frame = new Sly('#article_list', options);
		var $items = $('#down');
		resetHeight();
	    var speed = 1000;
	    $("#down").masonry({
	       singleMode: true,
	       columnWidth: 590,
	       itemSelector: '.item',
	       animate: false,
	       animationOptions: {
	           duration: 500,
	           easing: 'linear',
	           queue: false
	       }
	   });
	   
	   $("#down").infinitescroll({
		   loading: {
		        finished: undefined,
		        finishedMsg: "<em>加载完成</em>",
		        img: "/img/003.gif",
		        msg: null,
		        msgText: "<em>正在努力加载中...</em>",
		        selector: "#article_list",
		        speed: 'fast',
		        start: undefined
		    },
	       navSelector : '#page_nav', // selector for the paged navigation
	       nextSelector : '#page_nav a', // selector for the NEXT link (to page 2)
	       itemSelector : '.item', // selector for all items you'll retrieve
	       debug: true,
	       behavior: 'local',
	       binder: $("#article_list"),
	       errorCallback: function() {
	       // fade out the error message after 2 seconds
	       //$('#infscr-loading').animate({opacity: .8},2000).fadeOut('normal');
	       }},
	       // call masonry as a callback.
	       function( newElements ) { 
	           $(this).masonry({ appendedContent: $(newElements) });
	           frame.reload();
	        }
	   );
	

	// Add more items when close to the end
	frame.on('load change', function () {
		if (this.pos.dest > this.pos.end - 200) {
			//populate(10);
			//scroll
			 $("#down").infinitescroll("scroll");
			// this.reload();
		}
	});

	// Populate items
	//populate(20);

	// Initiate Sly
	frame.init();

	// Reload on resize
	$(window).on('resize', function () {
		resetHeight();
		frame.reload();
	});
});
function resetHeight(){
	 var wheight =  $(window).height();
		$("#article_list").height(wheight-60);
}