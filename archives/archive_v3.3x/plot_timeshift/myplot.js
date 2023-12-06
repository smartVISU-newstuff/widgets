// ----- myplot.timeshift -----------------------------------------------------------
$.widget("sv.myplot_timeshift", $.sv.widget, {

	initSelector: '[data-widget="myplot.timeshift"]',

	options: {
		bind: null,
		step: null
	},
	
	delta: null,
	mem_tmin: null,
	mem_tmax: null,

	_update: function(response) {
	},

	_events: {
    'click': function (event) {
		event.preventDefault();
		event.stopPropagation();
		var step = this.options.step;
		var direction =  ($(event.target).closest('a').hasClass('timeshift-back')) ?  ' ' :  ' -'; 
		var tmin = $('#'+this.options.bind).attr('data-tmin');
		var tmax = $('#'+this.options.bind).attr('data-tmax');
		if (this.delta == null){
			this.mem_tmin = tmin;
			this.mem_tmax = tmax;
		}

		var unique = Array();
		var items = $('#'+this.options.bind).attr('data-item').split(/,\s*/);
		for (var i = 0; i < items.length; i++) {
			var pt = items[i].split('.');
			if (!unique[items[i]] && widget.plot(items[i]).length == 1) {
				var item = items[i].substr(0, items[i].length - 4 - pt[pt.length - 4].length - pt[pt.length - 3].length - pt[pt.length - 2].length - pt[pt.length - 1].length);
				if (sv.config.driver.name == 'smarthomeng')
					io.send({'cmd': 'series_cancel', 'item': item, 'series': pt[pt.length - 4], 'start': tmin, 'end': tmax, 'count': pt[pt.length - 1]});
				else if (sv.config.driver.name == 'offline')
					clearTimeout(io.seriesTimer[items[i]]);
				delete widget.buffer[items[i]];
				unique[items[i]] = 1;
			}
		}
		this.delta = this.delta == null ? direction + step : this.delta + direction + step;
		this.delta = this.delta.replace(' '+ step + ' -' + step, '').replace(' -'+ step + ' ' + step, '');
		tmin = this.mem_tmin + this.delta;
		tmax = this.mem_tmax + this.delta;
		$('#'+this.options.bind).attr('data-tmin', tmin)
		$('#'+this.options.bind).attr('data-tmax', tmax)
		var that = $('#'+this.options.bind).data().svWidget
		that.options.tmin = tmin;
		that.options.tmax = tmax; 

		unique = Array();
		plot = '';
		for (var i = 0; i < items.length; i++) {
			var pt = items[i].split('.');
			if (!unique[items[i]] && (pt instanceof Array) && widget.checkseries(items[i])) {
				var item = items[i].substr(0, items[i].length - 4 - pt[pt.length - 4].length - pt[pt.length - 3].length - pt[pt.length - 2].length - pt[pt.length - 1].length);
				plot = plot + (i >0 ? ',' : '') + item + '.' + pt[pt.length - 4] + '.' + tmin + '.' + tmax + '.'  + pt[pt.length - 1];
				$('#'+this.options.bind).attr('data-item', plot)
				that.options.item = plot;
				that.items[i] = item + '.' + pt[pt.length - 4] + '.' + tmin + '.' + tmax + '.'  + pt[pt.length - 1];
				if (sv.config.driver.name == 'smarthomeng'){
					io.send({'cmd': 'series', 'item': item, 'series': pt[pt.length - 4], 'start': tmin, 'end': tmax, 'count': pt[pt.length - 1]});
					unique[items[i]] = 1;
				}
			}
		}
		if (sv.config.driver.name =='offline')
			io.all()	
	}
}
});
