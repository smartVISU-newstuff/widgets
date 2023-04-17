From Alexander Zeh: 

Added alternative wunderground adapter with free access which ist also used by wunderground enabled weather Stations.
The Public Key is 6532d6454b8aa370768e63d6ba5a832e

From wvhn:

The weather station ID must be entered in the location field in smartVISU confg page.
Additionally, you need to enter the key "weather_postal" manually into config.ini, followed by your postal code and 
national suffix, e.g. "weather_postal = "70000:DE".

Actually, the widget is not running without a weather station id. It is not possible to get current weather by entering
a location name. Thererfore, we keep the widget here in this repository and are not going to integrate it into 
an upcoming release of smartVISU.
