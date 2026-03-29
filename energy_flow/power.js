$.widget("sv.power_powerflow", $.sv.widget, {
    initSelector: 'div[data-widget="power.powerflow"]',

	_update: function (response) {
        var pv = toNumberOrZero(response[0]);        
        var grid = toNumberOrZero(response[1]);
        var battery = toNumberOrZero(response[2]);
        var house = toNumberOrZero(response[3]); 
        var vehicle = toNumberOrZero(response[4]);
        var heating = toNumberOrZero(response[5]);
      
        var remainingPv = pv;
		var remainingGrid = grid;
		var remainingBattery = battery;
		var remainingHouse = house;
		var remainingVehicle = vehicle;
		var remainingHeating = heating;
        
		// Preferred: Outer Most
		// PV to Grid
        if (remainingPv > 0 && remainingGrid < 0) {
            $('#pvToGrid').toggle(true); 
			var delta = Math.min(remainingPv, -remainingGrid);
            remainingPv = remainingPv - delta;
			remainingGrid = remainingGrid + delta;
        } else {
            $('#pvToGrid').toggle(false); 
        }
		
		// PV to Battery
		if (remainingPv > 0 && remainingBattery < 0) {
            $('#pvToBattery').toggle(true); 
			var delta = Math.min(remainingPv, -remainingBattery);
            remainingPv = remainingPv - delta;
			remainingBattery = remainingBattery + delta;
        } else {
            $('#pvToBattery').toggle(false); 
        }
		
		// Grid to House
        if (remainingGrid > 0 && remainingHouse > 0) {
            $('#gridToHome').toggle(true); 
            var delta = Math.min(remainingGrid, remainingHouse);
            remainingGrid = remainingGrid - delta;
			remainingHouse = remainingHouse - delta;
        } else {
            $('#gridToHome').toggle(false); 
        }

		// Battery To Vehicle
        if (remainingBattery > 0 && remainingVehicle > 0) {
            $('#batteryToVehicle').toggle(true); 
            var delta = Math.min(remainingBattery, remainingVehicle);
            remainingBattery = remainingBattery - delta;
			remainingVehicle = remainingVehicle - delta;
        } else {
            $('#batteryToVehicle').toggle(false); 
        }
		
		// 2nd: Not center
		// PV to House
		if (remainingPv > 0 && remainingHouse > 0) {
            $('#pvToHome').toggle(true); 
            var delta = Math.min(remainingPv, remainingHouse);
            remainingPv = remainingPv - delta;
			remainingHouse = remainingHouse - delta;
        } else {
            $('#pvToHome').toggle(false); 
        }
		
		// PV to Vehicle
		if (remainingPv > 0 && remainingVehicle > 0) {
            $('#pvToVehicle').toggle(true); 
            var delta = Math.min(remainingPv, remainingVehicle);
            remainingPv = remainingPv - delta;
			remainingVehicle = remainingVehicle - delta;
        } else {
            $('#pvToVehicle').toggle(false); 
        }
		
		// Grid to Heating
        if (remainingGrid > 0 && remainingHeating > 0) {
            $('#gridToHeating').toggle(true); 
            var delta = Math.min(remainingGrid, remainingHeating);
            remainingGrid = remainingGrid - delta;
			remainingHeating = remainingHeating - delta;
        } else {
            $('#gridToHeating').toggle(false); 
        }
		
		// Battery To Heating
        if (remainingBattery > 0 && remainingHeating > 0) {
            $('#batteryToHeating').toggle(true); 
            var delta = Math.min(remainingBattery, remainingHeating);
            remainingBattery = remainingBattery - delta;
			remainingHeating = remainingHeating - delta;
        } else {
            $('#batteryToHeating').toggle(false); 
        }
		
		//Last: Through
		// PV to Heating
		 if (remainingPv > 0 && remainingHeating > 0) {
            $('#pvToHeating').toggle(true); 
            var delta = Math.min(remainingPv, remainingHeating);
            remainingPv = remainingPv - delta;
			remainingHeating = remainingHeating - delta;
        } else {
            $('#pvToHeating').toggle(false); 
        }
		
		// Grid to Vehicle
		if (remainingGrid > 0 && remainingVehicle > 0) {
            $('#gridToVehicle').toggle(true); 
            var delta = Math.min(remainingGrid, remainingVehicle);
            remainingGrid = remainingGrid - delta;
			remainingVehicle = remainingVehicle - delta;
        } else {
            $('#gridToVehicle').toggle(false); 
        }

        // Grid to Battery
		if (remainingGrid > 0 && remainingBattery < 0) {
            $('#gridToBattery').toggle(true); 
            var delta = Math.min(remainingGrid, -remainingBattery);
            remainingGrid = remainingGrid - delta;
			remainingVehicle = remainingVehicle - delta;
        } else {
            $('#gridToBattery').toggle(false); 
        }

		// Battery To House
        if (remainingBattery > 0 && remainingHouse > 0) {
            $('#batteryToHome').toggle(true); 
             var delta = Math.min(remainingGrid, remainingHouse);
            remainingBattery = remainingBattery - delta;
			remainingHouse = remainingHouse - delta;
        } else {
            $('#batteryToHome').toggle(false); 
        }
		
		// Battery To Grid
		if (batteryToGrid > 0 && remainingGrid < 0) {
            $('#pvToGrid').toggle(true); 
			var delta = Math.min(remainingBattery, -remainingGrid);
            remainingBattery = remainingBattery - delta;
			remainingGrid = remainingGrid + delta;
        } else {
            $('#batteryToGrid').toggle(false); 
        }

        $('#batteryIcon, #batteryPower, #batterySoC').toggle(hasItem(2));
        $('#houseIcon, #housePower').toggle(hasItem(3));
        $('#vehicleIcon, #vehiclePower, #vehicleSoC').toggle(hasItem(4));
        $('#heatingIcon, #heatingPower, #heatingSoC').toggle(hasItem(5));

        function toNumberOrZero(value) {
            var n = parseFloat(value);
            return isNaN(n) ? 0 : n;
        }

        function hasItem(index) {
            return response[index] !== undefined && response[index] !== '';
        }
    }
});

$.widget("sv.power_powerdistribution", $.sv.widget, {
    initSelector: 'div[data-widget="power.powerdistribution"]',

    _update: function (response) {
        var pv = splitInputOutut(response[0]); 
        var grid = splitInputOutut(response[1]);
        var battery = splitInputOutut(response[2]);
        var house = splitInputOutut(response[3]); 
    	var vehicle = splitInputOutut(response[4]);
        var heating = splitInputOutut(response[5]);

        var input = pv[0] + grid[0] + battery[0];
        var inputPvLength = pv[0] / input;
	    var inputGridLength = grid[0] / input;
	    var inputBatteryLength = battery[0] / input;
        
        var output = house[0] + vehicle[0] + battery[1] + heating[0] + grid[1];
	    var outputHouseLength = house[0] / output;
        var outputVehicleLength = vehicle[0] / output;
	    var outputBatteryLength = battery[1] / output;
	    var outputHeatingLength = heating[0] / output;
        var outputGridLength = grid[1] / output;

	    arrangeElement("#inputPv", 0, inputPvLength);
	    arrangeElement("#inputBattery", inputPvLength, inputBatteryLength );
        arrangeElement("#inputGrid", inputPvLength + inputBatteryLength, inputGridLength );
        
        arrangeElement("#outputHouse", 0, outputHouseLength );
        arrangeElement("#outputVehicle", outputHouseLength, outputVehicleLength );
        arrangeElement("#outputHeating", outputHouseLength + outputVehicleLength, outputHeatingLength );
        arrangeElement("#outputBattery", outputHouseLength + outputVehicleLength + outputHeatingLength, outputBatteryLength );
        arrangeElement("#outputGrid", outputHouseLength + outputVehicleLength + outputHeatingLength + outputBatteryLength, outputGridLength );
        
        function splitInputOutut(source) {
            var value = toNumberOrZero(source);     
            var input = Math.max(0, value);
            var output = value > 0 ? 0 : Math.abs(value);
            return [input, output];
        }
        function arrangeElement(baseClass, x, width) { 
            var iconClass = baseClass + "Icon";
            $(baseClass).attr('x', x * 500); 
            $(iconClass).attr('x', x * 500); 
            $(baseClass).width( width * 500);
            $(iconClass).width( width * 500);
            $(iconClass).toggle(width > 0.1);
	    };
        function toNumberOrZero(value) {
            var n = parseFloat(value);
            return isNaN(n) ? 0 : n;
        }

	
    }
});
