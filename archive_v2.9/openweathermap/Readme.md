# integrated in smartVISU as of v2.9.2 - use only for older versions

## Openweathermap.org weather service for smartVISU

## Installation
1. copy the files to your smartVISU installation following the given folder structure
2. register at openweathermap.org to get an api key
3. in SmartVISU config page 1. choose openweather.org, 2. enter your location (i.e. Köln) 3. enter your api key  

English and German language file for SmartVISU v2.9 are provided with this package.
If you are running v2.8 or earlier: copy the following 4 lines to smartVISU/lang/lang_de_txt or similiar to your language file
    
    // ----- openweathermap.org ------------------------------------------------------    
    $lang['openweathermap']['lang']			= 'de';    
    $lang['openweathermap']['humidity']		= 'Luftfeuchte';    
    $lang['openweathermap']['wind']			= 'Wind';

## Troubleshooting/Debug:
1. check for file smartVISU/temp/openweathermap_YOURCITY.json
   this is the api response from openweathermap.org. View it with a json viewer (i.e. addon to chrome)
2. check for 'openweathermaps' entries in Logs/nginx/error.log (or Logs/apache2/)
