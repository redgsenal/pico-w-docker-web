console.log('pico w');

$(function () {
	console.log('pic w start up app');

	$.fn.callpico = function (v) {
		console.log('pico called: ', v);
		$.ajax({
			url: '//192.168.1.33',
			method: 'GET',
			type: 'json',
			data: v,
			success: function (response) {
				console.log('success: ', response);
				$("#pot").text(response.pot);
				$("#temp").text(response.temp);
				var sw  = $(".circle.switch");
				var led  = $(".circle.led");
				sw.removeClass('yellow');
				led.removeClass('red');
				if (response.switch == '1'){
					sw.addClass('yellow');
				}
				if (response.redled == '1'){
					led.addClass('red');
				}
			},
			error: function (error) {
				console.log('fail: ', error);
			}
		});
	}

	$('.redled').click(function (evnt) {
		evnt.preventDefault();
		console.log('red on');
		var btn = $(this);
		var v = btn.val();
		var p = { redled : v }
		console.log('p: ', p);
		$(this).callpico(p);
	});

	$('.ledblink').click(function (evnt) {
		evnt.preventDefault();
		console.log('led blinking...');
		var p = { 'led' : 'blink' };
		console.log('v: ', p);
		$(this).callpico(p);
	});

	$('.content').callpico();
});