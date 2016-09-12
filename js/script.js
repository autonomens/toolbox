/*
••••••••••••••••••••••••

Powered by Type & Grids™
www.typeandgrids.com

••••••••••••••••••••••••
*/

jQuery.easing.def = "easeOutQuad";

$(document).ready(function()
{

	// Make enlarge buttons inactive if no onClick event
	$(".enlargeButton").each(function() {
        if ( $(this).attr("onClick") == undefined )  {
            $(this).addClass("projectNavInactive");
        };
    });

	// For fluid video embedding
	// $(".video").fitVids();

	// Hide project info
	// $(".projectInfo").css("display", "none");
	// Don't hide video info
	$(".videoInfo").css("display", "inline");

	// Move projects to second column
	$(".project:odd").appendTo("#col2");

	// Hide hover effect on touch devices
	if (Modernizr.touch) {
		$(".projectThumbnailHover").css("display", "none");
		$(".projectThumbnailHover").css("visibility", "hidden");
		$(".projectThumbnail").unbind("mouseenter");
		$(".projectThumbnail").unbind("mouseleave");
	}

	// Page navigation
	var isWorkCurrentPage = true;
	var isAboutCurrentPage = false;

	$("#logoDetailView").click(function()
	{
		window.location = "../../index.html";
	});

	$("#workPage, #logo").click(function()
		{
			if(!isWorkCurrentPage)
			{
				isWorkCurrentPage = true;
				isAboutCurrentPage = false;
				$("#workPage").attr("class", "currentPage");
				$("#aboutPage").removeClass("currentPage");

				$("#about").fadeOut(500, function()
				{
					$("#work").fadeIn(500);
				});
			}
		});

	$("#aboutPage").click(function()
		{
			if(!isAboutCurrentPage)
			{
				isAboutCurrentPage = true;
				isWorkCurrentPage = false;
				$("#aboutPage").attr("class", "currentPage");
				$("#workPage").removeClass("currentPage");

				$("#work").fadeOut(500, function()
				{
					$("#about").fadeIn(500);
				});
			}
		});

	// Make Work page current page
	$("#workPage").attr("class", "currentPage");

	// Hide About page
	//$("#about").css("display", "none");
	$("#about").fadeOut(0);

	// For site fade site in
	$(".container").css("display", "none");

});

// Remove site preloader after site is loaded
$(window).load(function() {
	$('#sitePreloader').delay(200).fadeOut(500, function() {
		$(this).remove();
	});

	// Fade site in
	$(".container").delay(700).fadeIn(500);
});

// Portfolio slider setup
jQuery(document).ready(function($) {
	var sliderProps = {
		autoScaleSlider: true,
	   	autoScaleSliderWidth: 460,
	   	autoScaleSliderHeight: 284,
	   	captionShowEffects: '',
	   	controlNavEnabled: false,
	   	keyboardNavEnabled: true,
	   	directionNavEnabled: false,
	   	startSlideIndex: 0,
	   	imageScaleMode: 'fill' },
		openedProjectInfo,
		isAnimating = false,
		currOpenProject;

	function closeOpenedProject(el) {
		openedProjectInfo.slideUp(900);
		openedProjectInfo.parent().find('.portfolioSlider').fadeOut();
		openedProjectInfo = false;
		if(el && el.length) {
			el.css('visibility', 'visible');
		}
	}

});
