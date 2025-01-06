$.widget("sv.power_powerflow", $.sv.widget, {
    initSelector: 'div[data-widget="power.powerflow"]',

    _create: function () {
        this._super();
    },

    _update: function (response) {
        let pv = parseFloat(response[0]);        
        let grid = parseFloat(response[1]);
        let battery = parseFloat(response[2]);
        let house = parseFloat(response[3]); 
	    let vehicle = parseFloat(response[4]);
      
        if(pv > 0 && grid < 0) {
            $('#pvToGrid').toggle(true); 
            pv = pv + grid;
        }
        else {
            $('#pvToGrid').toggle(false); 
        }

        if(pv > 0 && vehicle > 0) {
            $('#pvToVehicle').toggle(true); 
            pv = pv - vehicle;
        }
        else {
            $('#pvToVehicle').toggle(false); 
        }

        if(pv > 0 && house > 0) {
            $('#pvToHome').toggle(true); 
            pv = pv - house;
        }
        else {
            $('#pvToHome').toggle(false); 
        }
        $('#pvToBattery').toggle(pv > 0 && battery < 0); 

        if(grid > 0 && house > 0) {
            $('#gridToHome').toggle(true); 
            grid = grid - house;
        }
        else {
            $('#gridToHome').toggle(false); 
        }
        if(grid > 0 && vehicle > 0) {
            $('#gridToVehicle').toggle(true); 
            grid = grid - vehicle;
        }
        else {
            $('#gridToVehicle').toggle(false); 
        }
        $('#gridToBattery').toggle(grid > 0 && battery < 0); 

        $('#batteryToGrid').toggle(battery > 0 && grid < 0); 
        $('#batteryToHome').toggle(battery > 0 && house > 0); 
        $('#batteryToVehicle').toggle(battery > 0 && vehicle > 0);
    }
});

$.widget("sv.power_powerdistribution", $.sv.widget, {
    initSelector: 'div[data-widget="power.powerdistribution"]',

    _create: function () {
        this._super();
    },

    _update: function (response) {
        let pv = splitInputOutut(response[0]); 
        let grid = splitInputOutut(response[1]);
        var battery = splitInputOutut(response[2]);
        var house = splitInputOutut(response[3]); 
    	var vehicle = splitInputOutut(response[4]);

        var input = pv[0] + grid[0] + battery[0];
        var inputPvLength = pv[0] / input;
	    var inputGridLength = grid[0] / input;
	    var inputBatteryLength = battery[0] / input;
        
        var output = house[0] + vehicle[0] + battery[1] + grid[1];
	    var outputHouseLength = house[0] / output;
        var outputVehicleLength = vehicle[0] / output;
	    var outputBatteryLength = battery[1] / output;
        var outputGridLength = grid[1] / output;

	    arrangeElement("#inputPv", 0, inputPvLength);
	    arrangeElement("#inputBattery", inputPvLength, inputBatteryLength );
        arrangeElement("#inputGrid", inputPvLength + inputBatteryLength, inputGridLength );
        
        arrangeElement("#outputHouse", 0, outputHouseLength );
        arrangeElement("#outputVehicle", outputHouseLength, outputVehicleLength );
        arrangeElement("#outputBattery", outputHouseLength + outputVehicleLength, outputBatteryLength );
        arrangeElement("#outputGrid", outputHouseLength + outputVehicleLength + outputBatteryLength, outputGridLength );
        
        function splitInputOutut(source) {
            let value = parseFloat(source);     
            let input = Math.max(0, value);
            let output = value > 0 ? 0 : Math.abs(value);
            return [input, output];
        }
        function arrangeElement(baseClass, x, width) { 
            let iconClass = baseClass + "Icon";
            $(baseClass).attr('x', x * 500); 
            $(iconClass).attr('x', x * 500); 
            $(baseClass).width( width * 500);
            $(iconClass).width( width * 500);
            $(iconClass).toggle(width > 0.1);
	    };

	
    }
});
