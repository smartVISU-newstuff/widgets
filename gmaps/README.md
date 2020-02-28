This widget allows to display your current position on a Google Maps map. A detailed explanation 
including neccessary items in your SmartHome backend, can be found under https://www.smarthomeng.de/google-maps-widget-fuer-smartvisu-2-9.

The widget contains two versions:

- The first is able to show the route from your home coordinates to your workplace (or any other target):
	```
	map(id, gad_lat, gad_lon, gad_home_lat, gad_home_lon, gad_calculate_way_home, gad_calculate_way_work, gad_work_lat, gad_work_lon, traffic)
	```
- The second just displays yourself (or any icon) at a given coordinate:
	```
	simple_map(id, gad_lat, gad_lon)
	```

When you want to use the widget, ensure to replace the string "\<your_api_key\>" in the gmaps.js 
(for each of the two versions!) with your Google Maps/Directions API key.

For one of the two widgets you also have to specify a path to a picture of the person / object you want to show placed on the map.
For this replace "\<path_to_your_pic\>" with the URL-suffix where this image is located (e.g. /smartVISU/pics/phone/\<my_number\>.jpg).