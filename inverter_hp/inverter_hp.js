$.widget("sv.inverter", $.sv.widget, {
    initSelector: 'div[data-widget="inverter.inverter_overview"]',

    gradient_diff: 40,
    // soc, pv, grid, house, bat, hp
    defaults: [50, 0, 0, 0, 0, 0],

    _create: function () {
        this._super();
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


        if (parseFloat(response[1]) > 0.0) {
            this.element[0].getElementsByClassName("arrow_pv")[0].style.setProperty("fill-opacity", "1.0");
            this.element[0].getElementsByClassName("arrow_pv")[0].style.setProperty("stroke-opacity", "1.0");
        } else {
            this.element[0].getElementsByClassName("arrow_pv")[0].style.setProperty("fill-opacity", "0.0");
            this.element[0].getElementsByClassName("arrow_pv")[0].style.setProperty("stroke-opacity", "0.0");
        }

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

        if (parseFloat(response[3]) > 0.0) {
            this.element[0].getElementsByClassName("arrow_house")[0].style.setProperty("fill-opacity", "1.0");
            this.element[0].getElementsByClassName("arrow_house")[0].style.setProperty("stroke-opacity", "1.0");
        } else {
            this.element[0].getElementsByClassName("arrow_house")[0].style.setProperty("fill-opacity", "0.0");
            this.element[0].getElementsByClassName("arrow_house")[0].style.setProperty("stroke-opacity", "0.0");
        }

        if (parseFloat(response[4]) > 0.0) {
            this.element[0].getElementsByClassName("arrow_battery_up")[0].style.setProperty("fill-opacity", "0.0");
            this.element[0].getElementsByClassName("arrow_battery_up")[0].style.setProperty("stroke-opacity", "0.0");
            this.element[0].getElementsByClassName("arrow_battery_down")[0].style.setProperty("fill-opacity", "1.0");
            this.element[0].getElementsByClassName("arrow_battery_down")[0].style.setProperty("stroke-opacity", "1.0");
        } else if (parseFloat(response[4]) < 0.0) {
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

        if (parseFloat(response[5]) > 0.0) {
            this.element[0].getElementsByClassName("arrow_heatpump")[0].style.setProperty("fill-opacity", "1.0");
            this.element[0].getElementsByClassName("arrow_heatpump")[0].style.setProperty("stroke-opacity", "1.0");
        } else {
            this.element[0].getElementsByClassName("arrow_heatpump")[0].style.setProperty("fill-opacity", "0.0");
            this.element[0].getElementsByClassName("arrow_heatpump")[0].style.setProperty("stroke-opacity", "0.0");
        }
    }

});