
// ----- basic.slider ---------------------------------------------------------
// The slider had to be handled in a more complex manner. A 'lock' is used
// to stop the change after a refresh. And a timer is used to fire the trigger
// only every 400ms if it was been moved. There should be no trigger on init.
$.widget("sv.basic_slider", $.sv.widget, {

	initSelector: 'input[data-widget="basic.slider"]',

	options: {
		min: 0,
		max: 255,
		'min-send': 0,
		'max-send': 255, 
		style: ''
		
	},

	_mem: null,
	_timer: false,
	_lock: false,
	_sliding: false,

	_update: function(response) {
		var val = response[0];
		var max = this.element.attr('max') * 1;
		var min = this.element.attr('min') * 1;
		var maxSend = this.options['max-send'];
		var minSend = this.options['min-send'];
		if(min != minSend || max != maxSend)
			val = (val - minSend) / (maxSend - minSend) * (max - min) + min;
		if(!this._sliding) {
			this._lock = true;
			this.element.val(val).slider('refresh');
			this._mem = this.element.val();
			this._lock = false;
		}
		else {
			this._mem = val;
		}
		
		console.log(this.element.attr('data-style'));
		if (this.element.attr('data-style') != ''){
			//add for colouring the slider track 
			var id = this.element.attr('id');
			$('#'+id).next(".ui-slider-track").css("background-image", this.element.attr('data-style'));
			$('#'+id).next(".ui-slider-track").children(".ui-slider-bg").css("background-image", "none");
			$('#'+id).next(".ui-slider-track").children(".ui-slider-bg").css("background-color", "transparent");
		};
	},

	_events: {
		'slidestart': function (event) {
			this._sliding = true;
		},

		'slidestop': function (event) {
			this._timer = false;
			this._sliding = false;
			this._send();
		},

		'change': function (event) {
			this._send();
		},
	},

	_send: function() {
		var val = this.element.val();
		if (!this._lock && !this._timer && val != this._mem) {
			this._timer = true;
			this._mem = val;
			var max = this.element.attr('max') * 1;
			var min = this.element.attr('min') * 1;
			var maxSend = this.options['max-send'];
			var minSend = this.options['min-send'];
			if(min != minSend || max != maxSend)
				val = (val - min) / (max - min) * (maxSend - minSend) + minSend;
			this._write(val);
			this._delay(function() { if(this._timer) { this._timer = false; this._send(); } }, 400);
		}
	}

});
