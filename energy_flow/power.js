$.widget("sv.power", $.sv.widget, {
    initSelector: 'div[data-widget="power.powerflow"]',

    _create: function () {
        this._super();
    },

    _update: function (response) {
        var pv = parseFloat(response[0]);        
        var grid = parseFloat(response[1]);
        var battery = parseFloat(response[2]);
        var house = parseFloat(response[3]); 
	    var vehicle = parseFloat(response[4]);
        if (pv > -10 && pv < 10) pv = 0;

	    update(pv,grid,vehicle,battery, house);

        function update(pv, grid, vehicle, battery, house) { 
            $('#pvToGrid').toggle(pv > 0 && grid < 0); 
            $('#pvToHome').toggle(pv > 0 && house > 0); 
            $('#pvToVehicle').toggle(pv > 0 && vehicle > 0); 
            $('#pvToBattery').toggle(pv > 0 && battery < 0); 
            $('#gridToHome').toggle(grid > 0 && house > 0); 
            $('#gridToVehicle').toggle(grid > 0 && vehicle > 0); 
            $('#gridToBattery').toggle(grid > 0 && battery < 0); 
            $('#batteryToGrid').toggle(battery > 0 && grid < 0); 
            $('#batteryToHome').toggle(battery > 0 && house > 0); 
            $('#batteryToVehicle').toggle(battery > 0 && vehicle > 0);
	    };
    }
});
