
$.widget("sv.qclocktwo_qclocktwo", $.sv.widget, {

	initSelector: '[data-widget="qclocktwo.qclocktwo"]',

	options: {
		time: 120,
		mode: 'widget',
		lang: 'de',
		fontcolor: '#ffffff',
		animationfontcolor: '#ffffff',
		inactivefontcolor: '#2e2e2e',
		shadowcolor: '#fff9ae',
		bgcolor: '#101112',
	},

	_create: function () {
		this._super();
		var id = this.element.attr('id');

		var rgbColor = hexToRgb(this.options.shadowcolor);
		console.log("qlocktwo");
		console.log("timeout is ",this.options.time );
		// create user defined font color
		//$(".lit").css('color', this.options.fontcolor);
		//idleTimer() takes an optional argument that defines the idle timeout
		//timeout is in milliseconds; defaults to 30000
		if (this.options.mode == 'screensaver') {
			console.log("Function screensaver");
			idleTimer(this.options.time * 1000);
			console.log("starte timer");
			$(".qclocktwo_mask").css('background-color', this.options.bgcolor);
			$(".qclocktwo").css("color", this.options.inactivefontcolor);

			function showQlock() {
				console.log("showqlock");
				$(".qclocktwo_mask").css('display', 'block');
				
				$(this).closest("div").addClass("overlay");
				$("#qclocktwo").css("display", "flex");
				$(".ui-header").css("z-index", "500");
				console.log("SUPERSIZE QLOCK");
				supersized = true;
				
				//rgbstring = "0 0 10px rgb("+ rgbColor['r'] +","+rgbColor['g'] +","+rgbColor['b'] +")";
				//$(".lit").css('text-shadow', rgbstring);
				//$(".lit").css('color', rgbstring);
			};

			$(document).on('click', function () {
				if (supersized == true) {
					$(this).closest("div").removeClass('overlay');
					$("#qclocktwo").css("display", "none");
					$(".qclocktwo_mask").css('display', 'none');
					supersized = false;
					$(document.body).removeClass("overlay");
					console.log("remove QLOCK");
				}
			});
		} else {
			console.log("Function widget");
			$("#qclocktwo").css("display", "flex");
			$('.qclocktwo_mask').addClass('widget');
			$(".qclocktwo_mask").css('display', 'block');
		}

		clearInterval(q2.clockTimer);
		abortFadeTimer();
		q2.current.minute = -1;

		initQlockTwo('de', '#qclocktwo', this.options.shadowcolor,this.options.animationfontcolor);
		q2.current.litCells = [0, 0, 0, 0];
		changeCells(currentTimeCells());
		onClockTimerFired();
		q2.clockTimer = setInterval('onClockTimerFired()', 500);

		function idleTimer(time) {
			var t;
			window.onload = resetTimer;
			window.onmousemove = resetTimer;
			window.onmousedown = resetTimer;  // catches touchscreen presses as well      
			window.ontouchstart = resetTimer; // catches touchscreen swipes as well 
			window.onclick = resetTimer;      // catches touchpad clicks as well
			window.onkeydown = resetTimer;
			window.addEventListener('scroll', resetTimer, true); // improved; see comments

			function resetTimer() {
				clearTimeout(t);
				t = setTimeout(showQlock, time);  // time is in milliseconds
			}
		};

		function hexToRgb(hex) {
			// from https://stackoverflow.com/questions/13780709/jquery-convert-any-css-color-to-rgb
			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			return result ? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16)
			} : null;

		}

	}

});
