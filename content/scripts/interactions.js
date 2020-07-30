//DO NOT MODIFY ↓
define([
	'jquery',
	'utils',
	"settings-general",
], function ($, Utils, GeneralSettings) {
	//DO NOT MODIFY ↑

	function initialize() {
		setEvents();
	}

	function setEvents() {
		$(masterStructure)
			.on("Framework:systemReady", function () {
				systemReady();
			})
			.on("Framework:pageLoaded", function () {
				pageLoaded();
			});
	}

	/* is called only once, when the Course has loaded*/
	function systemReady() {
		//console.log("Interactions:systemReady");
	}

	/* is called on every page load, great for adding custom code to all pages*/
	function pageLoaded() {

		var medias = [];
		medias = Array.prototype.concat.apply(medias, document.getElementsByTagName('audio'));
		medias = Array.prototype.concat.apply(medias, document.getElementsByTagName('video'));
		
		$(medias).each(function(index){
			var catched = false;
			$(this).on('playing',function(e){							
				if(!catched){		        
					catched = true; 					
					window.ga('send',{
						hitType:'event',
						eventCategory:this.nodeName,
						eventAction:'play',
						eventLabel:this.getAttribute('title')
					})
		     	}
			});
		});		
		//console.log("Interactions:pageLoaded");
		
		// Inline popups
		$('#dynamic_content .wb-lbx').magnificPopup({
			delegate: 'a',
			removalDelay: 500, //delay removal by X to allow out-animation
			callbacks: {
				beforeOpen: function () {
					this.st.mainClass = this.st.el.attr('data-effect');
				}
			},
			midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
		});


		// Image popups
		$('#image-popups').magnificPopup({
			delegate: 'a',
			type: 'image',
			removalDelay: 500, //delay removal by X to allow out-animation
			callbacks: {
				beforeOpen: function () {
					// just a hack that adds mfp-anim class to markup 
					this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
					this.st.mainClass = this.st.el.attr('data-effect');
				}
			},
			closeOnContentClick: true,
			midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
		});


		// Hinge effect popup
		$('a.hinge').magnificPopup({
			mainClass: 'mfp-with-fade',
			removalDelay: 1000, //delay removal by X to allow out-animation
			callbacks: {
				beforeClose: function () {
					this.content.addClass('hinge');
				},
				close: function () {
					this.content.removeClass('hinge');
				}
			},
			midClick: true
		});
		
		loadFAQ();
	}
	
	//this is for the FAQ favourites.
	function loadFAQ() {
		var itemID;
		//list of learneable items
		for(var i=0;i<$(".learn-list>li").length;i++){
			itemID=$(".learn-list>li>.hint").eq(i).attr("id");
			$(".learn-list>li>.hint").eq(i).append("<a data-fav=\"#"+itemID+"\" class='favbtntest'>toggle favourite</a>");
		}	
		//this is the list of buttons for a predefined search
		for(i=0;i<$(".search-list>button").length;i++){
			$(".search-list>button").eq(i).click(function() {
				var searchText=($(this).text()==="*")?"":$(this).text();
				$(".wb-fltr-inpt").val(searchText)
				var e = jQuery.Event("keyup");
				//e.which = 50; // # Some key code value
				$(".wb-fltr-inpt").trigger(e);

			});
		}
	}	
	


	initialize();

});
