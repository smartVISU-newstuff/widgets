$.widget("sv.steelseries_radial_energy", $.sv.widget, {

        initSelector: 'canvas[data-widget="steelseries.radial_energy"]',

        options: {
          title: "",
          unit: "",
          widgetsize: 200,
          pointercolor: null,
          'min-value': null,
          'max-value': null,
        },

        _steelseries: null,

        _create: function() {
          this._super();

          var areas = [steelseries.Section(this.options['min-value'], 0, 'rgba(220, 0, 0, 0.3)'),
                    steelseries.Section(0, this.options['max-value'], 'rgba(0, 220, 0, 0.3)')];
          var params = {
              gaugeType: steelseries.GaugeType.TYPE4,
              size: this.options.widgetsize,
              titleString: this.options.title,
              unitString: this.options.unit,
              frameDesign: steelseries.FrameDesign.BLACK_METAL,
              backgroundColor: steelseries.BackgroundColor.TURNED,
              minValue: this.options['min-value'],
              maxValue: this.options['max-value'],
              ledVisible: false,
              lcdVisible: true,
              area: areas,
              lcdDecimals: 1,
              useOdometer: false
          };
          if(this.options.pointercolor)
            params.pointerColor = steelseries.ColorDef[this.options.pointercolor];

          this._steelseries = new steelseries.Radial(this.element[0], params);

        },

        _update: function(response) {
          if (response[0] > 0) {
             this._steelseries.setValueAnimated((-1)*parseFloat(response[0]));
          } else {
             this._steelseries.setValueAnimated(parseFloat(response[1]));
          }
        },
    });


$.widget("sv.steelseries_linear", $.sv.widget, {

        initSelector: 'canvas[data-widget="steelseries.linear"]',

        options: {
          title: "",
          unit: "",
          valuecolor: 'RED',
          'min-value': null,
          'max-value': null,
		  threshold: null,
		  devicetype: 'Linear',
		  framestyle: 'DARK_METAL',
		  background: 'TURNED',
		  deviceoptions: null,
        },

        _steelseries: null,

        _create: function() {
          this._super();
		  var deviceType = this.options.devicetype.toLowerCase();
		  var gaugeType = 'Type1';
		  if (deviceType == 'thermo')
			  gaugeType= 'TYPE2';

          var params = {
              gaugeType: steelseries.GaugeType[gaugeType],
              width: this.element.attr('width'),
              height: this.element.attr('height'),
              titleString: this.options.title,
              unitString: this.options.unit,
              frameDesign: steelseries.FrameDesign[this.options.framestyle.toUpperCase()],
              backgroundColor: steelseries.BackgroundColor[this.options.background.toUpperCase()],
			  valueColor: steelseries.ColorDef[this.options.valuecolor.toUpperCase()],
              minValue: this.options['min-value'],
              maxValue: this.options['max-value'],
			  threshold: this.options.threshold ? this.options.threshold *1 : 'none',
              ledVisible: false,
              lcdVisible: true,
              lcdDecimals: 1,
          };

          $.extend(true, params, this.options.deviceoptions);
		  
          // convert some string of the device options into objects
		   if (this.options.deviceoptions) {
			var optionObjects = ['area', 'section', 'valueGradient', 'ledColor', 'lcdColor'];
			optionObjects.forEach(function(name){
				eval('params.'+ name +'='+params[name]);
			});
		  }
		  
          if(deviceType == 'bargraph')

			  this._steelseries = new steelseries.LinearBargraph(this.element[0], params);
		  else
			  this._steelseries = new steelseries.Linear(this.element[0], params);
			  

        },

        _update: function(response) {
          this._steelseries.setValueAnimated(parseFloat(response[0]));
        },
    });
	
$.widget("sv.steelseries_radial", $.sv.widget, {

        initSelector: 'canvas[data-widget="steelseries.radial"]',

        options: {
          title: "",
          unit: "",
          valuecolor: 'RED',
          'min-value': null,
          'max-value': null,
		  threshold: null,
		  devicetype: 'radial',
		  gaugetype: 'TYPE4',
		  framestyle: 'DARK_METAL',
		  background: 'TURNED',
		  deviceoptions: null,
        },

        _steelseries: null,

        _create: function() {
          this._super();
		  var deviceType = this.options.devicetype.toLowerCase();
		  var gaugeType = (deviceType == 'vertical' ? null : this.options.gaugetype.toUpperCase() );

          var params = {
              gaugeType: steelseries.GaugeType[gaugeType],
              size: this.element.attr('width'),
              titleString: this.options.title,
              unitString: this.options.unit,
              frameDesign: steelseries.FrameDesign[this.options.framestyle.toUpperCase()],
              backgroundColor: steelseries.BackgroundColor[this.options.background.toUpperCase()],
			  valueColor: (deviceType == 'bargraph' ? steelseries.ColorDef[this.options.valuecolor.toUpperCase()] : null),
			  pointerColor: (deviceType == 'bargraph' ? null : steelseries.ColorDef[this.options.valuecolor.toUpperCase()]),
              minValue: this.options['min-value'],
              maxValue: this.options['max-value'],
			  threshold: this.options.threshold ? this.options.threshold *1 : 'none',
              ledVisible: false,
              lcdVisible: true,
			  orientation: (deviceType == 'vertical' ? steelseries.Orientation[this.options.gaugetype.toUpperCase()] : null ),
              lcdDecimals: 1,
          };

          $.extend(true, params, this.options.deviceoptions);
		  
          // convert some string of the device options into objects
		  if (this.options.deviceoptions) {
			var optionObjects = ['area', 'section', 'valueGradient', 'pointerType', 'ledColor', 'lcdColor'];
			optionObjects.forEach(function(name){
				eval('params.'+ name +'='+params[name]);
			});
		  }

          if(deviceType == 'bargraph')
			  this._steelseries = new steelseries.RadialBargraph(this.element[0], params);
		  else if (deviceType == 'vertical')
			  this._steelseries = new steelseries.RadialVertical(this.element[0], params);
		  else
			  this._steelseries = new steelseries.Radial(this.element[0], params);
			  

        },

        _update: function(response) {
          this._steelseries.setValueAnimated(parseFloat(response[0]));
        },
    });