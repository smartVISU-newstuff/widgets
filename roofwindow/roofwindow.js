 /**
* -----------------------------------------------------------------------------
* @package smartVISU
* @author raman
* @copyright 2023
* @license GPL [http://www.gnu.de]
* -----------------------------------------------------------------------------
*/ 

// ----- icon_roofwindow ------------------------------------------------------
$.widget("sv.roofwindow_roofwindow", $.sv.widget, {

	initSelector: 'svg[data-widget="roofwindow.roofwindow"]',
	options: {
		min: 0,
		max: 255
	},

	_update: function(response) {
		// response is: {{ gad_value }}, {{ gad_window }}
		this._super(response);
		
		var color = this.element.attr('data-color').explode();
		var must = false;
		if (color[1].indexOf('!') > -1){		//support legacy function constant color
			color[1] = color[1].substr(1);
			must = true; 
		}
		var style = color.slice();
		for (var i=0; i<=1; i++){
			if (color[i].indexOf('icon') == 0) 
				style[i] = '';
			else 	
				color[i] = '';
		}
		this.element.attr('class', 'icon' + ((response[1] && response[1] != 'closed') || (response[2] && response[2] != 'closed') || (must == true) ? ' '+color[1] : ' '+color[0]));
		this.element.attr('style', ((response[1] && response[1] != 'closed') || (response[2] && response[2] != 'closed') || (must == true) ? 'stroke: '+ style[1]+'; fill: '+style[1]+';' : 'stroke: '+ style[0]+'; fill: '+style[0]+';'));

		var max = parseFloat(this.options.max);
		var min = parseFloat(this.options.min);        
		var x = response[1] * 1; 
		var y = Math.min(Math.max((response[0] - min) / (max - min), 0), 1);
		
		var m1 = (264 - 100) / (80 - 154);
		var m2 = (264 - 100) / (205 - 279);
		
		var y0 = 100 + (164 * y);
		var x1 = (y0 - 100) / ((264 - 100) / (80 - 156)) + 156;
		var x2 = (y0 - 100) / ((264 - 100) / (203 - 279)) + 279;
		
		var points = "156,100 279,100 " + x2 + "," + y0 + " " + x1 + "," + y0 + " 156,100";
		
		this.element.find('#blind').attr('points', points);
		
		this.element.find('#window0').attr('stroke-width', x === 0 ? '10':'0');
		this.element.find('#knob0').attr('fill-opacity', x === 0 ? '1':'0');
		this.element.find('#window1').attr('stroke-width', x === 1 ? '10':'0');
		this.element.find('#knob1').attr('fill-opacity', x === 1 ? '1':'0');
		this.element.find('#window2').attr('stroke-width', x === 2 ? '10':'0');
		this.element.find('#knob2').attr('fill-opacity', x === 2 ? '1':'0');
	}
});
