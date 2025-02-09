# Widget for a heat pump

![image](https://github.com/user-attachments/assets/3c751870-88d7-4484-91dd-d45b1323a7df)



Copy the widget files into smartVISU/dropins/widgets. They will be automatically imported for usage in your visu pages. Each heatpump widget must have a unique id if you use more than one on a page.

# Widget call
{{ hp.heatpump(id, item_heatpump_mode, item_flow_temperature, item_reverse_temperature, item_water_temperature, item_compressor_pump_on, item_heating_pump_on, item_water_valve_open, item_compressor_power_percent, item_blower_power_percent, item_root_temperature, item_electric_water_heating_on, [water_temp_hi, water_temp_low, water_temp_target, water_temp_min], [txt_mode_off, txt_mode_warm_water])


# Examples: 
Use this widget call to achieve the result shown in the image
```
			{{ hp.heatpump(
				'v200',
				'd.heizung.allgemein.betriebsart',
				'd.heizung.heizkreis.temperatur.vorlauf.ist',
				'd.heizung.heizkreis.temperatur.ruecklauf.ist',
				'd.heizung.warmwasser.temperatur.ist',
				'd.heizung.pumpen.sekundaer',
				'd.heizung.pumpen.heizkreis',
				'd.heizung.warmwasser.ventil',
				'd.heizung.allgemein.kompressor_freq',
				'd.heizung.allgemein.outdoor_fanspeed',
				'd.heizung.heizkreis.temperatur.raum.soll',
				'd.heizung.warmwasser.elektro',
				[60, 37, 48, 40],
				['Abschaltbetrieb', 'Warmwasser']) }}
```

