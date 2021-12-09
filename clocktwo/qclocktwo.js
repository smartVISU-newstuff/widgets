
$.widget("sv.qclocktwo_qclocktwo", $.sv.widget, {

	initSelector: '[data-widget="qclocktwo.qclocktwo"]',

	options: {
		time: 360,
		mode: 'widget',
		lang: 'de',
	},

	_create: function () {
		this._super();
		console.log("qlocktwo");


		//idleTimer() takes an optional argument that defines the idle timeout
		//timeout is in milliseconds; defaults to 30000
		if (this.options.mode == 'screensaver') {
			console.log("Function screensaver");
			idleTimer();
			console.log("starte timer");
			function showQlock() {
				console.log("showqlock");
				$(".mask").css('display','block');
				$(this).closest("div").addClass("overlay");
				$("#qclocktwo").css("display", "flex");
				console.log("SUPERSIZE ME");
				supersized = true;
			};

			$(document).on('click', function () {
				if (supersized == true) {
					$(this).closest("div").removeClass('overlay');
					$("#qclocktwo").css("display", "none");
					supersized = false;
					$(document.body).removeClass("overlay");
				}
			});
		} else {
			console.log("Function widget");
			//$("#qclocktwo").css("font-size", "1.8em");
			$("#qclocktwo").css("display", "flex");
			//$('.q2col').css('height', '');
			//$('.frame').css('height', '');
			//$("#qclocktwo").css("line-height", "1.8em");
			//$('.overlay').css('height', '100vh');
			$('.frame').addClass('widget');
		}
		//var qclockid = 'qclock';

		clearInterval(q2.clockTimer);
		abortFadeTimer();
		q2.current.minute = -1;


		
		initQlockTwo('de', '#qclocktwo');
		q2.current.litCells = [0, 0, 0, 0];
		changeCells(currentTimeCells());

		onClockTimerFired();
		q2.clockTimer = setInterval('onClockTimerFired()', 500);

		function idleTimer() {
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
				t = setTimeout(showQlock, 1000);  // time is in milliseconds
			}
		};
	

	}

});
