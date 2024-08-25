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

          this._steelseries = new steelseries.Radial(this.element[0].id, params);

        },

        _update: function(response) {
          if (response[0] > 0) {
             this._steelseries.setValueAnimated((-1)*parseFloat(response[0]));
          } else {
             this._steelseries.setValueAnimated(parseFloat(response[1]));
          }
        },
    });
	