// ----- plottools.compare -----------------------------------------------------------
$.widget("sv.plottools_compare", $.sv.widget, {

	initSelector: '[data-widget="plottools.compare"]',

	options: {
		bind: null,
		step: null
	},

	_create: function() {
        this._super();
		
		// get widget parameters from target plot widget
		var step = this.options.step.split(/,\s*/);
		var target = $('#'+this.options.bind);
		var tmin = target.attr('data-tmin');
		var tmax = target.attr('data-tmax');
		var mode = target.attr('data-mode');
		var plot = target.attr('data-item');
		var items = plot.split(/,\s*/);
		var that = target.data().svWidget;
		var mem_tmin = tmin;
		var mem_tmax = tmax;

		// stop target plot and destroy highcharts object
		io.stopseries(target);
		that.element.highcharts().destroy();
		if (that.options.chartOptions == undefined)
			that.options.chartOptions = {};

		// copy the original series and insert them with the computed compare durations 
		var newOptions = {series:[], xAxis:[{type: 'datetime', min: mem_tmin, max: mem_tmax}]};
		for (var i = 0; i < items.length; i++){
			newOptions.series[i] = {xAxis: 0};
		}
		for (var j = 0; j < step.length; j++) {
			tmin = mem_tmin + ' ' + step[j];
			tmax = mem_tmax + ' ' + step[j];
			
			for (var i = 0; i < items.length; i++) {
				var definition = widget.parseseries(items[i]);
				that.items[items.length * (1 + j) + i] =  definition.item + '.' + definition.mode + '.' + tmin + '.' + tmax + '.'  + definition.count;
				plot = plot + ',' + that.items[items.length * (1 + j) + i];
				newOptions.series[items.length * (1 + j) + i] = {xAxis: j+1};
				if (!newOptions.xAxis[j+1])
					newOptions.xAxis[j+1] = {type: 'datetime', min: tmin, max: tmax, visible: false}
			}
			that.options.mode += ','+ mode;
			that.options.exposure
		}

        $.extend(true, that.options.chartOptions, newOptions);
		target.attr('data-chart-options', JSON.stringify(that.options.chartOptions));

		// write all series and modes back to the target widget
		target.attr('data-item', plot)
		target.attr('data-mode',  that.options.mode);
		that.options.item = plot;

		// rebuild target plot widget and start plots  
		that._create();
		io.startseries(target);		
	},
	
	_update: function(response) {
	},


});

// ----- plottools.record -----------------------------------------------------------
$.widget("sv.plottools_record", $.sv.plot_period, {

    initSelector: 'div[data-widget="plottools.record"]',
	seriesData: [],
	
	_create: function(){
		//create plot
		this._super();
		//create array for recording of series data
		var modes = String(this.options.mode).explode();
		for (var i = 0; i < modes.length; i++) {
			this.seriesData.push([]);
		}
	},
	
   _update: function(response) {
        // response is: [ [ [t1, y1], [t2, y2] ... ], [ [t1, y1], [t2, y2] ... ], ... ]
		// DEBUG: console.log(response)
        var chart = this.element.highcharts();
		// window.servertimeoffset should be available now
		if (window.servertimeoffset != undefined && window.servertimeoffset != 0 && this.options.servertime == 'yes')
			chart.time.update({timezoneOffset: parseInt(-Number(sv.serverTimezone.offset)/60) + parseInt(window.servertimeoffset/60000 ||0) });
		var actualDate = new Date();

        if (this.options.chartOptions && this.options.chartOptions.xAxis != undefined && typeof this.options.chartOptions.xAxis == 'object' && this.options.chartOptions.xAxis[0].min && this.options.chartOptions.xAxis[0].max){
			for (var i = this.options.chartOptions.xAxis.length - 1; i > -1; i--){
				var xMin = actualDate - new Date().duration(this.options.chartOptions.xAxis[i].min);
				var xMax = actualDate - new Date().duration(this.options.chartOptions.xAxis[i].max);
				chart.xAxis[i].update({ min: xMin, max: xMax }, false);
			}
		}
		else {
			var xMin = actualDate - new Date().duration(this.options.tmin);
			var xMax = actualDate - new Date().duration(this.options.tmax);
			var dayDuration = 24*3600*1000;

			if (this.options.zoom == "day"){
			    xMin -= chart.time.options.timezoneOffset * 60000;
			    xMin = xMin - xMin % dayDuration + dayDuration + chart.time.options.timezoneOffset * 60000;
				xMax = xMin + dayDuration;
			}
		//	chart.xAxis[0].update({ min: xMin, max: xMax }, false);
		}
        if(chart.navigator) {
            chart.navigator.xAxis.update({ min: xMin, max: xMax }, false);
        }

        var itemCount = response.length;

        var seriesIndex = -1;
        for (var i = 0; i < itemCount; i++) {
            seriesIndex++;

            if (response[i] != undefined) {
				this.seriesData[i].push([actualDate.getTime(), response[i]])
                chart.series[seriesIndex].setData(this.seriesData[seriesIndex], false);
            }
		}
		chart.redraw();
    },

});
