# Widget for a inverter



Copy the widget files into smartVISU/dropins/widgets. They will be automatically imported for usage in your visu pages. Each inverter widget must have a unique id if you use more than one on a page.

# Widget call
{{ inverter.inverter_overview(id, item_pv_power, item_grid_power, item_house_power, item_battery_power, item_soc, power_format, item_self_sufficiency, self_sufficiency_text, item_own_consumption, own_consumption_text) }}


# Examples: 
Use this widget call to achieve the result shown in the images
```
{{inverter.inverter_overview('1', 'System.Pv.Inverter.Messwerte.Leistung_Pv', 'System.Pv.Inverter.Messwerte.Leistung_Netz', 'System.Pv.Inverter.Messwerte.Leistung_Haus', 'System.Pv.Inverter.Messwerte.Leistung_Batterie', 'System.Pv.Inverter.Messwerte.soc_Batterie', '', 'System.Pv.Inverter.Berechnungen.Autarkie', '', 'System.Pv.Inverter.Berechnungen.Eigenverbrauch', '')}}"

```
