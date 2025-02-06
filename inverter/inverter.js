$.widget("sv.inverter_overview", $.sv.widget, {
    initSelector: 'div[data-widget="inverter.inverter_overview"]',

    gradient_diff: 40,
    // soc, pv, grid, house, bat, hp
    defaults: [50, 0, 0, 0, 0, 0],

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
	    // response is [soc, pv, grid, house, bat, hp]
        response = values;

        var gradient = this.element.find(".battery_gradient");

        if (parseInt(response[0]) >= 45.0) {
            gradient.find('.battery_gradient_color').attr('style', 'stop-color:rgba(0,180,0,1);');
        } else if (parseInt(response[0]) >= 30.0) {
            gradient.find('.battery_gradient_color').attr('style', 'stop-color:rgba(255,255,0,1);');
        } else if (parseInt(response[0]) >= 15.0) {
            gradient.find('.battery_gradient_color').attr('style', 'stop-color:rgba(255,165,0,1);');
        } else {
            gradient.find('.battery_gradient_color').attr('style', 'stop-color:rgba(255,0,0,1);');
        }

        var y1 = "" + (100 - parseInt(response[0]) + (this.gradient_diff / 2.0) + 30) + "%";
        var y2 = "" + (100 - parseInt(response[0]) - (this.gradient_diff / 2.0)) + "%";
        gradient.attr("y1", y1);
        gradient.attr("y2", y2);

        // pv
        if (parseFloat(response[1]) > 0.0)
            this.element.find('.arrow_pv').show(); 
        else
            this.element.find('.arrow_pv').hide();

        // grid
        if (parseFloat(response[2]) < 0.0) {
            this.element.find('.arrow_grid_up').hide();
			this.element.find('.arrow_grid_down').show();
        } else if (parseFloat(response[2]) > 0.0) {
            this.element.find('.arrow_grid_up').show();
			this.element.find('.arrow_grid_down').hide();
        } else {
            this.element.find('.arrow_grid_up').hide();
			this.element.find('.arrow_grid_down').hide();
        }

        // house
        if (parseFloat(response[3]) > 0.0)
            this.element.find('.arrow_house').show(); 
        else
            this.element.find('.arrow_house').hide();

        // bat
        if (parseFloat(response[4]) > 0.0) {
            this.element.find('.arrow_battery_up').hide();
			this.element.find('.arrow_battery_down').show();
        // e3dc has idle battery drain of 12 W, so only show arrow for more than 12 W drain
        } else if (parseFloat(response[4]) < -12.0) {
            this.element.find('.arrow_battery_up').show();
			this.element.find('.arrow_battery_down').hide();
         } else {
            this.element.find('.arrow_battery_up').hide();
			this.element.find('.arrow_battery_down').hide();
        }

        // hp
        if (parseFloat(response[5]) > 0.0)
            this.element.find('.arrow_heatpump').show(); 
       else
            this.element.find('.arrow_heatpump').hide(); 
    }

});