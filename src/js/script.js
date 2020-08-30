$(document).ready(function(){

	$(".slider").slick({
		dots: true,
		// vertical: true,
		fade: true,
		speed: 1500,
		arrows: false,
		// cssEase: 'ease-in-out',
		mobileFirst: true,
		customPaging : function(slider, i) {
			if(i<10)
				return '<a>'+'0'+(i+1)+'</a>';
			else
				return '<a>'+(i+1)+'</a>';
		}
	});

	Inputmask({
		mask: "+38 (099) 999-99-99",
		clearMaskOnLostFocus: true,
		clearIncomplete: true
	}).mask('input[name="phone"]');

	$(".pop-up__close").click(function(){
		// if($(this).parents().attr("class") == "basket") {
		// 	alert("top");
		// }
		console.dir($(this).parents().attr("class"));
		$(".modal-bg, .pop-up").hide();
	});

	$(".shop__btn").click(function(e){
		$(".shop__btn").removeClass("active__btn");
		$(this).addClass("active__btn");
		e.preventDefault();
		e.stopPropagation();
	});

	// $(window).scroll(function(){
	// 	coordsShop = $(".shop__title")[0].getBoundingClientRect().top;
	// 	coordsWhyWe = $(".why-we__title")[0].getBoundingClientRect().top;
	// 	height = $(window).height();
	// 	if (coordsShop+100 < height) {
	// 		$(".shop").addClass("animate");
	// 	} else if (coordsWhyWe+100 < height) {
	// 		$(".why-we").addClass("animate");
	// 	}
	// 	// console.log(coords);
	// 	// console.log(height);
	// });

	$(".pop-up__btn").click(function(){
		$(this).parent("form").hide();
		$(".pop-up__thanks").removeAttr("data-close");
	});

	$(".pop-up__thanks-btn").click(function(){
		$(this).parent(".pop-up__thanks").attr("data-close",true);
	});

	$(".burger__close").click(function(){
		$(".burger").hide();
	});

	$(".basket__list").niceScroll({
		cursorcolor: "#f2ab1f",
		cursoropacitymin: 1,
		cursorwidth: "3px",
		cursorborderradius: 0,
		cursorborder: 0,
		background: "#cdcdcd",
		horizrailenabled: false
	});

	$("a").click(function(e){
		e.stopPropagation();
		e.preventDefault();
	});
});