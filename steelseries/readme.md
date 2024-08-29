Copy the files into the folder ./dropins/widgets below your smartVISU root folder. They will be imported automatically from there.

Widget usage:
```
{{ steelseries.radial_energy('steel.radial_smaem','myItem_1','myItem_2', -8000, 8000, '267', '', 'Energiebilanz', 'Watt') }}
```
The display will show the value of myItem_1 in the red area if it is greater than zero. Otherwise it will show the value of myItem_2.
![grafik](https://github.com/user-attachments/assets/84f92183-4c80-4a63-aa9c-a3ae218c1d45)
