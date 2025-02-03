$.widget("sv.inverter", $.sv.widget, {
    initSelector: 'div[data-widget="inverter.hp"]',

    gradient_diff: 40,
    // soc, pv, grid, house, bat, hp, self_sufficiency, own_consumption
    defaults: [50, 0, 0, 0, 0, 0, 0, 0],
    present: [false, false, false, false, false, false, false, false],

    _create: function () {
        this._super();
        var items = this.options.item.explode();
        for (var i = 0; i < items.length; i++) {
            if (items[i] != '') {
                this.present[i] = true;
            } else 
                this.present[i] = false;
        };  

        // disable elements not to be shown for missing gads

        // soc or battery - battery frame
        if (this.present[0] || this.present[4]) {
            this.element[0].getElementsByClassName("icon_battery")[0].style.setProperty("display", "inline");
            this.element[0].getElementsByClassName("line_battery")[0].style.setProperty("display", "inline");
        } else {
            this.element[0].getElementsByClassName("icon_battery")[0].style.setProperty("display", "none");
            this.element[0].getElementsByClassName("line_battery")[0].style.setProperty("display", "none");
        }
        // soc
        if (this.present[0]) {
            this.element[0].getElementsByClassName("battery_gradient")[0].style.setProperty("display", "inline");
            this.element[0].getElementsByClassName("text_soc")[0].style.setProperty("display", "inline");
        } else {
            this.element[0].getElementsByClassName("battery_gradient")[0].style.setProperty("display", "none");
            this.element[0].getElementsByClassName("text_soc")[0].style.setProperty("display", "none");
        }
        // pv
        if (this.present[1]) {
            this.element[0].getElementsByClassName("icon_pv1")[0].style.setProperty("display", "inline");
            this.element[0].getElementsByClassName("icon_pv2")[0].style.setProperty("display", "inline");
            this.element[0].getElementsByClassName("line_pv")[0].style.setProperty("display", "inline");
            this.element[0].getElementsByClassName("text_pv")[0].style.setProperty("display", "inline");
            this.element[0].getElementsByClassName("arrow_pv")[0].style.setProperty("display", "inline");
        } else {
            this.element[0].getElementsByClassName("icon_pv1")[0].style.setProperty("display", "none");
            this.element[0].getElementsByClassName("icon_pv2")[0].style.setProperty("display", "none");
            this.element[0].getElementsByClassName("line_pv")[0].style.setProperty("display", "none");
            this.element[0].getElementsByClassName("text_pv")[0].style.setProperty("display", "none");
            this.element[0].getElementsByClassName("arrow_pv")[0].style.setProperty("display", "none");
        }
        // grid
        if (this.present[2]) {
            this.element[0].getElementsByClassName("icon_grid")[0].style.setProperty("display", "inline");
            this.element[0].getElementsByClassName("line_grid")[0].style.setProperty("display", "inline");
            this.element[0].getElementsByClassName("text_grid")[0].style.setProperty("display", "inline");
            this.element[0].getElementsByClassName("arrow_grid_up")[0].style.setProperty("display", "inline");
            this.element[0].getElementsByClassName("arrow_grid_down")[0].style.setProperty("display", "inline");
        } else {
            this.element[0].getElementsByClassName("icon_grid")[0].style.setProperty("display", "none");
            this.element[0].getElementsByClassName("line_grid")[0].style.setProperty("display", "none");
            this.element[0].getElementsByClassName("text_grid")[0].style.setProperty("display", "none");
            this.element[0].getElementsByClassName("arrow_grid_up")[0].style.setProperty("display", "none");
            this.element[0].getElementsByClassName("arrow_grid_down")[0].style.setProperty("display", "none");
        }
        // house
        if (this.present[3]) {
            this.element[0].getElementsByClassName("icon_house")[0].style.setProperty("display", "inline");
            this.element[0].getElementsByClassName("line_house")[0].style.setProperty("display", "inline");
            this.element[0].getElementsByClassName("text_house")[0].style.setProperty("display", "inline");
            this.element[0].getElementsByClassName("arrow_house")[0].style.setProperty("display", "inline");
        } else {
            this.element[0].getElementsByClassName("icon_house")[0].style.setProperty("display", "none");
            this.element[0].getElementsByClassName("line_house")[0].style.setProperty("display", "none");
            this.element[0].getElementsByClassName("text_house")[0].style.setProperty("display", "none");
            this.element[0].getElementsByClassName("arrow_house")[0].style.setProperty("display", "none");
        }
        // bat
        if (this.present[4]) {
            this.element[0].getElementsByClassName("text_battery")[0].style.setProperty("display", "inline");
            this.element[0].getElementsByClassName("arrow_battery_up")[0].style.setProperty("display", "inline");
            this.element[0].getElementsByClassName("arrow_battery_down")[0].style.setProperty("display", "inline");
        } else {
            this.element[0].getElementsByClassName("text_battery")[0].style.setProperty("display", "none");
            this.element[0].getElementsByClassName("arrow_battery_up")[0].style.setProperty("display", "none");
            this.element[0].getElementsByClassName("arrow_battery_down")[0].style.setProperty("display", "none");
        }
        // hp
        if (this.present[5]) {
            this.element[0].getElementsByClassName("icon_heatpump")[0].style.setProperty("display", "inline");
            this.element[0].getElementsByClassName("line_heatpump")[0].style.setProperty("display", "inline");
            this.element[0].getElementsByClassName("text_heatpump")[0].style.setProperty("display", "inline");
            this.element[0].getElementsByClassName("arrow_heatpump")[0].style.setProperty("display", "inline");
        } else {
            this.element[0].getElementsByClassName("icon_heatpump")[0].style.setProperty("display", "none");
            this.element[0].getElementsByClassName("line_heatpump")[0].style.setProperty("display", "none");
            this.element[0].getElementsByClassName("text_heatpump")[0].style.setProperty("display", "none");
            this.element[0].getElementsByClassName("arrow_heatpump")[0].style.setProperty("display", "none");
        }
        // self sufficiency
        if (this.present[6]) {
            this.element[0].getElementsByClassName("text_suff")[0].style.setProperty("display", "inline");
        } else {
            this.element[0].getElementsByClassName("text_suff")[0].style.setProperty("display", "none");
        }
        // grid
        if (this.present[7]) {
            this.element[0].getElementsByClassName("text_cons")[0].style.setProperty("display", "inline");
        } else {
            this.element[0].getElementsByClassName("text_cons")[0].style.setProperty("display", "none");
        }
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
        response = values;

        var gradient = this.element[0].getElementsByClassName("battery_gradient")[0];

        if (parseInt(response[0]) >= 45.0) {
            gradient.getElementsByClassName("battery_gradient_color")[0].attributes['style'].value = "stop-color:rgba(0,180,0,1);";
        } else if (parseInt(response[0]) >= 30.0) {
            gradient.getElementsByClassName("battery_gradient_color")[0].attributes['style'].value = "stop-color:rgba(255,255,0,1);";
        } else if (parseInt(response[0]) >= 15.0) {
            gradient.getElementsByClassName("battery_gradient_color")[0].attributes['style'].value = "stop-color:rgba(255,165,0,1);";
        } else {
            gradient.getElementsByClassName("battery_gradient_color")[0].attributes['style'].value = "stop-color:rgba(255,0,0,1);";
        }

        var y1 = "" + (100 - parseInt(response[0]) + (this.gradient_diff / 2.0) + 30) + "%";
        var y2 = "" + (100 - parseInt(response[0]) - (this.gradient_diff / 2.0)) + "%";
        gradient.setAttribute("y1", y1);
        gradient.setAttribute("y2", y2);

        // pv
        if (parseFloat(response[1]) > 0.0) {
            this.element[0].getElementsByClassName("arrow_pv")[0].style.setProperty("fill-opacity", "1.0");
            this.element[0].getElementsByClassName("arrow_pv")[0].style.setProperty("stroke-opacity", "1.0");
        } else {
            this.element[0].getElementsByClassName("arrow_pv")[0].style.setProperty("fill-opacity", "0.0");
            this.element[0].getElementsByClassName("arrow_pv")[0].style.setProperty("stroke-opacity", "0.0");
        }

        // grid
        if (parseFloat(response[2]) < 0.0) {
            this.element[0].getElementsByClassName("arrow_grid_up")[0].style.setProperty("fill-opacity", "0.0");
            this.element[0].getElementsByClassName("arrow_grid_up")[0].style.setProperty("stroke-opacity", "0.0");
            this.element[0].getElementsByClassName("arrow_grid_down")[0].style.setProperty("fill-opacity", "1.0");
            this.element[0].getElementsByClassName("arrow_grid_down")[0].style.setProperty("stroke-opacity", "1.0");
        } else if (parseFloat(response[2]) > 0.0) {
            this.element[0].getElementsByClassName("arrow_grid_up")[0].style.setProperty("fill-opacity", "1.0");
            this.element[0].getElementsByClassName("arrow_grid_up")[0].style.setProperty("stroke-opacity", "1.0");
            this.element[0].getElementsByClassName("arrow_grid_down")[0].style.setProperty("fill-opacity", "0.0");
            this.element[0].getElementsByClassName("arrow_grid_down")[0].style.setProperty("stroke-opacity", "0.0");
        } else {
            this.element[0].getElementsByClassName("arrow_grid_up")[0].style.setProperty("fill-opacity", "0.0");
            this.element[0].getElementsByClassName("arrow_grid_up")[0].style.setProperty("stroke-opacity", "0.0");
            this.element[0].getElementsByClassName("arrow_grid_down")[0].style.setProperty("fill-opacity", "0.0");
            this.element[0].getElementsByClassName("arrow_grid_down")[0].style.setProperty("stroke-opacity", "0.0");
        }

        // house
        if (parseFloat(response[3]) > 0.0) {
            this.element[0].getElementsByClassName("arrow_house")[0].style.setProperty("fill-opacity", "1.0");
            this.element[0].getElementsByClassName("arrow_house")[0].style.setProperty("stroke-opacity", "1.0");
        } else {
            this.element[0].getElementsByClassName("arrow_house")[0].style.setProperty("fill-opacity", "0.0");
            this.element[0].getElementsByClassName("arrow_house")[0].style.setProperty("stroke-opacity", "0.0");
        }

        // bat
        if (parseFloat(response[4]) > 0.0) {
            this.element[0].getElementsByClassName("arrow_battery_up")[0].style.setProperty("fill-opacity", "0.0");
            this.element[0].getElementsByClassName("arrow_battery_up")[0].style.setProperty("stroke-opacity", "0.0");
            this.element[0].getElementsByClassName("arrow_battery_down")[0].style.setProperty("fill-opacity", "1.0");
            this.element[0].getElementsByClassName("arrow_battery_down")[0].style.setProperty("stroke-opacity", "1.0");
        // e3dc has idle battery drain of 12 W, so only show arrow for more than 12 W drain
        } else if (parseFloat(response[4]) < -12.0) {
            this.element[0].getElementsByClassName("arrow_battery_up")[0].style.setProperty("fill-opacity", "1.0");
            this.element[0].getElementsByClassName("arrow_battery_up")[0].style.setProperty("stroke-opacity", "1.0");
            this.element[0].getElementsByClassName("arrow_battery_down")[0].style.setProperty("fill-opacity", "0.0");
            this.element[0].getElementsByClassName("arrow_battery_down")[0].style.setProperty("stroke-opacity", "0.0");
        } else {
            this.element[0].getElementsByClassName("arrow_battery_up")[0].style.setProperty("fill-opacity", "0.0");
            this.element[0].getElementsByClassName("arrow_battery_up")[0].style.setProperty("stroke-opacity", "0.0");
            this.element[0].getElementsByClassName("arrow_battery_down")[0].style.setProperty("fill-opacity", "0.0");
            this.element[0].getElementsByClassName("arrow_battery_down")[0].style.setProperty("stroke-opacity", "0.0");
        }

        // hp
        if (parseFloat(response[5]) > 0.0) {
            this.element[0].getElementsByClassName("arrow_heatpump")[0].style.setProperty("fill-opacity", "1.0");
            this.element[0].getElementsByClassName("arrow_heatpump")[0].style.setProperty("stroke-opacity", "1.0");
        } else {
            this.element[0].getElementsByClassName("arrow_heatpump")[0].style.setProperty("fill-opacity", "0.0");
            this.element[0].getElementsByClassName("arrow_heatpump")[0].style.setProperty("stroke-opacity", "0.0");
        }
    }

});