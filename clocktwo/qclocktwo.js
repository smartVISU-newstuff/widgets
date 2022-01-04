
$.widget("sv.qclocktwo_qclocktwo", $.sv.widget, {

	initSelector: '[data-widget="qclocktwo.qclocktwo"]',

	options: {
		time: 120,
		mode: 'widget',
		lang: 'de',
		////color: 'white', 
	},

	_create: function () {
		this._super();
		console.log("qlocktwo");
		console.log("timeout is ", this.options.time);
		// create user defined shadow
		
		//$("lit").css("color", 'green');
		//$("lit").css("text-shadow", '0 0 10px '+this.options.color);

		//idleTimer() takes an optional argument that defines the idle timeout
		//timeout is in milliseconds; defaults to 30000
		if (this.options.mode == 'screensaver') {
			console.log("Function screensaver");
			idleTimer(this.options.time*1000);
			console.log("starte timer");

			function showQlock() {
				console.log("showqlock");
				$(".mask").css('display','block');
				$(this).closest("div").addClass("overlay");
				$("#qclocktwo").css("display", "flex");
				$(".ui-header").css("z-index", "500");
				console.log("SUPERSIZE QLOCK");
				supersized = true;
			};

			$(document).on('click', function () {
				if (supersized == true) {
					$(this).closest("div").removeClass('overlay');
					$("#qclocktwo").css("display", "none");
					$(".mask").css('display','none');
					supersized = false;
					$(document.body).removeClass("overlay");
					console.log("remove QLOCK");
				}
			});
		} else {
			console.log("Function widget");
			$("#qclocktwo").css("display", "flex");
			$('.frame').addClass('widget');
		}
		




		clearInterval(q2.clockTimer);
		abortFadeTimer();
		q2.current.minute = -1;

		initQlockTwo('de', '#qclocktwo');
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
	

	}

});
