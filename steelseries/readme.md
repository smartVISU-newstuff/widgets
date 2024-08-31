Copy the files into the folder ./dropins/widgets below your smartVISU root folder. They will be imported automatically from there.

## General widgets for linear and radial instruments:
![grafik](https://github.com/user-attachments/assets/dc44954b-89d3-4487-bd4d-c7882463ff82)

See the docu page "steelseries.linear" in the "Custom" section of the inline docu for widget parametrization.


## Radial Enery Widget:

![grafik](https://github.com/user-attachments/assets/84f92183-4c80-4a63-aa9c-a3ae218c1d45)

Widget usage:
```
{{ steelseries.radial_energy('steel.radial_smaem','myItem_1','myItem_2', -8000, 8000, '267', '', 'Energiebilanz', 'Watt') }}
```
The display will show the value of myItem_1 in the red area if it is greater than zero. Otherwise it will show the value of myItem_2.
