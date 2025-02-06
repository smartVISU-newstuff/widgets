# Widget for an inverter - now with a heat pump

![grafik](https://github.com/user-attachments/assets/794f5f37-4cb5-45b6-ab57-aca57dfa96b0)


Copy the widget files into smartVISU/dropins/widgets. They will be automatically imported for usage in your visu pages. Each inverter widget must have a unique id if you use more than one on a page.

# Widget call
{{ inverter.inverter_overview(id, item_pv_power, item_grid_power, item_house_power, item_battery_power, item_soc, power_format, item_self_sufficiency, self_sufficiency_text, item_own_consumption, own_consumption_text, item_heatpump_power) }}


# Examples: 
Use this widget call to achieve the result shown in the image
```
{{inverter.inverter_overview('1', 'System.Pv.Inverter.Messwerte.Leistung_Pv', 'System.Pv.Inverter.Messwerte.Leistung_Netz', 'System.Pv.Inverter.Messwerte.Leistung_Haus', 'System.Pv.Inverter.Messwerte.Leistung_Batterie', 'System.Pv.Inverter.Messwerte.soc_Batterie', '', 'System.Pv.Inverter.Berechnungen.Autarkie', '', 'System.Pv.Inverter.Berechnungen.Eigenverbrauch', '', 'System.Pv.Inverter.Messwerte.Leistung_Waermepumpe)}}"
```

