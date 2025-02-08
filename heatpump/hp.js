$.widget("sv.heatpump", $.sv.widget, {
    initSelector: 'div[data-widget="hp.heatpump"]',

    // data-item="{{ gad_mode }}, {{ gad_flow_temp }}, {{ gad_return_temp }}, {{ gad_water_temp }}, {{ gad_comp_pump }}, {{ gad_heat_pump }}, {{ gad_water_valve }}, {{ gad_comp_power }}, {{ gad_blow_power }}, {{ gad_hp_room_temp }}, {{ gad_hp_el_water }}">
    // mode, flow, return, comp_pump, heat_pump, water_valve, comp_power, blow_power, room_temp
    defaults: [2, 0.0, 0.0, 0.0, 1, 1, 1, 100.0, 100.0, 0.0],
    
    options: {
        temps: [37.0, 55.0, 48.0, 40.0],
        modes: ["Abschaltbetrieb", "Warmwasser"]
    },

    // absolute and relative temperatures for water color gradient
    t_cold: 0,
    t_hot: 1,
    t_target: 2,
    t_min: 3,
    rtemps: [0.0, 1.0, .7, .3],

    // mode names for off and warm water only
    m_off: "Abschaltbetrieb",
    m_ww: "Warmwasser",

    _temp: function(temp) {
        // return relative temp
        return Math.min(Math.max(temp - this.temps[this.t_cold], 0.0) / (this.temps[this.t_hot] - this.temps[this.t_cold]), 1.0);
    },
    _upper: function(rtemp) {
        // return upper stop for water gradient
        return 1 - Math.min(1.0, Math.max(0.0, (rtemp - this.rtemps[this.t_min]) / this.rtemps[this.t_target]));
    },
    _lower: function(rtemp) {
        // return lower stop for water gradient
        return 1 - Math.min(1.0, Math.max(0.0, (rtemp / this.rtemps[this.t_target])));
    },

    _create: function() {
        this._super();
        
        this.temps = this.options.temps.explode();

        // calculate relative gradient temperatures
        for (var i = 0; i < 4; i++) {
            this.rtemps[i] = this._temp(this.temps[i]);
        };

        this.m_off = this.options.modes.explode()[0];
        this.m_ww = this.options.modes.explode()[1];
    },

    _update: function (response) {

        // make sure that items are correlated correctly even if optional items are omitted
        var items = this.options.item.explode();
        var values = new Array(this.items.length);
        var j=0;
        for (var i = 0; i < items.length; i++) {
            if (items[i] != '') {
                values[i] = response[j];
                j++;
            } else 
                values[i] = this.defaults[i];
        };
        // response is [mode, flow, return, water, comp_pump, heat_pump, water_valve, comp_power, blow_power, room_temp, el_heat]

        response = values;

        // show water temperature/gradient
        var temp = parseFloat(response[3]);
        if (temp != NaN) {
            var gradient = this.element.find(".hp_gradient");

            var s_lower = this._lower(this._temp(parseFloat(response[3])));
            var s_upper = this._upper(this._temp(parseFloat(response[3])));

            gradient.find('.stop_lower').attr('offset', s_lower);
            gradient.find('.stop_upper').attr('offset', s_upper);
        }

        // parse mode
        if (response[0] == this.m_off) {
            // heating off, disable all elements
            this.element.find('.hp_line_ww').addClass('hpld'); 
            this.element.find('.hp_line_house').addClass('hpld'); 
            this.element.find('.hp_line_comp').addClass('hpld'); 
        } else if (response[0] == this.m_ww) {
            // warm water only, disable house circuit
            this.element.find('.hp_line_ww').removeClass('hpld'); 
            this.element.find('.hp_line_house').addClass('hpld'); 
            this.element.find('.hp_line_comp').removeClass('hpld'); 
        } else {
            // heating and warm water - or anything else, disable nothing
            this.element.find('.hp_line_ww').removeClass('hpld'); 
            this.element.find('.hp_line_house').removeClass('hpld'); 
            this.element.find('.hp_line_comp').removeClass('hpld'); 
        };

        // process pumps
        // compressor pump
        if (parseInt(response[4])) {
            this.element.find('.hp_status_comp').removeClass('red');
            this.element.find('.hp_status_comp').addClass('green');
        } else {
            this.element.find('.hp_status_comp').removeClass('green');
            this.element.find('.hp_status_comp').addClass('red');
        }
        // heating pump
        if (parseInt(response[5])) {
            this.element.find('.hp_status_house').removeClass('red');
            this.element.find('.hp_status_house').addClass('green');
        } else {
            this.element.find('.hp_status_house').removeClass('green');
            this.element.find('.hp_status_house').addClass('red');
        }
        // water valve
        if (parseInt(response[6])) {
            this.element.find('.hp_status_ww').removeClass('red');
            this.element.find('.hp_status_ww').addClass('green');
        } else {
            this.element.find('.hp_status_ww').removeClass('green');
            this.element.find('.hp_status_ww').addClass('red');
        }

        // process electricity indicator
        if (parseInt(response[10])) {
            this.element.find('.hp_el_water').show();
        } else {
            this.element.find('.hp_el_water').hide();
        }
    }
});
