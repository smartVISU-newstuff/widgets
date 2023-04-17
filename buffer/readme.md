# Widget for a buffer

![buffer](https://user-images.githubusercontent.com/36001771/229436995-14335e19-6aab-479e-9906-add11c41caf7.png)

Copy the widget files into smartVISU/dropins/widgets. They will be automatically imported for usage in your visu pages. Each buffer widget must have a unique id if you use more than one on a page.

# Widget call
{{buffer.solar_stove(id, item_percent, item_temp1, item_temp2, item_temp3, item_temp4, item_temp5, temp_format, item_stove_temp_h, item_stove_temp_c, item_stove_pump, item_stove_pump_percent, stove_text, item_solar_temp_h, item_solar_temp_c, item_solar_temp_collector, item_solar_pump, item_solar_pump_percent, solar_text)}}

# Examples: 
Use these widget calls to achieve the results shown in the images below:
```
{{buffer.solar_stove('1', 'Solar.Messwerte.ProzentBuffer1', 'Solar.Messwerte.T_Speicher_oben', 'Solar.Messwerte.T_Speicher_2', 'Solar.Messwerte.T_Speicher_mitte', 'Solar.Messwerte.T_Speicher_4', 'Solar.Messwerte.T_Speicher_unten')}}

{{buffer.solar_stove('2', 'Solar.Messwerte.ProzentBuffer2', 'Solar.Messwerte.T_Speicher_oben', '', 'Solar.Messwerte.T_Speicher_mitte', '', 'Solar.Messwerte.T_Speicher_unten', '', '', '', '', '', '', 'Solar.Messwerte.T_Solar_RL', 'Solar.Messwerte.T_Solar_VL', '', 'Solar.Messwerte.Solarpumpe', '', 'Solar')}}

{{buffer.solar_stove('3', 'Solar.Messwerte.ProzentBuffer3', 'Solar.Messwerte.T_Speicher_oben', '', '', '', 'Solar.Messwerte.T_Speicher_unten', '', 'Ofen.Messwerte.T_Holzkessel_RL', 'Ofen.Messwerte.T_Holzkessel_VL', 'Ofen.Messwerte.Pumpe', '', 'Holzkessel')}}
```
![grafik](https://user-images.githubusercontent.com/17801971/226099172-c57b0a83-185b-4664-bbe1-aa5f377dc18d.png)
