# Widget for a buffer

![grafik](https://user-images.githubusercontent.com/17801971/226099060-14998a90-e302-42c2-9059-5dc7e346690f.png)

Copy the widget files into smartVISU/dropins/widgets. They will be automatically imported for usage in your visu pages. Each buffer widget must have a unique id if you use more than one on a page.

# Examples: 
Use these widget calls to achieve the results shown in the images below:
```
{{buffer.solar_stove('1', 'Solar.Messwerte.ProzentBuffer', 'Solar.Messwerte.T_Speicher_oben', '', '', '', 'Solar.Messwerte.T_Speicher_unten', '', 'Ofen.Messwerte.T_Holzkessel_RL', 'Ofen.Messwerte.T_Holzkessel_VL', 'Ofen.Messwerte.Pumpe', 'Holzkessel', 'Solar.Messwerte.T_Solar_RL', 'Solar.Messwerte.T_Solar_VL', 'Solar.Messwerte.T_Solar_Kollektor', 'Solar.Messwerte.Solarpumpe', 'Solar')}}

{{buffer.solar_stove('2', 'Solar.Messwerte.ProzentBuffer1', 'Solar.Messwerte.T_Speicher_1', 'Solar.Messwerte.T_Speicher_2', 'Solar.Messwerte.T_Speicher_3', 'Solar.Messwerte.T_Speicher_4', 'Solar.Messwerte.T_Speicher_unten')}}

{{buffer.solar_stove('3', 'Solar.Messwerte.ProzentBuffer2', 'Solar.Messwerte.T_Speicher_oben', '', 'Solar.Messwerte.T_Speicher_mitte', '', 'Solar.Messwerte.T_Speicher_unten', '', '', '', '', '', 'Solar.Messwerte.T_Solar_RL', 'Solar.Messwerte.T_Solar_VL', '', 'Solar.Messwerte.Solarpumpe', 'Solar')}}
```
![grafik](https://user-images.githubusercontent.com/17801971/226099172-c57b0a83-185b-4664-bbe1-aa5f377dc18d.png)
