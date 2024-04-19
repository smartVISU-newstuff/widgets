# Hacks using the scripting option of basic.print
The 'script' option of basic.print gives us a method to directly address elements on the page and change their properties using JavaScript and jQuery mobile. You just need to give the
target elements a unique ID, e.g. 'myID' which is automatically concatenated with the page name by smartVISU in almost all widgets: '#myPage-myID'. 

## Enable / disable flipswitch
Thread in the forum: https://knx-user-forum.de/forum/supportforen/smartvisu/1928558-basic-flip-taster-sperren

Task: enable/disable flipswitch for an item 'myItem' dependig on the value of a second item 'myValue'. The threshod for myValue is e.g. 50.

Solution:
```
{{basic.flip('myID', 'myItem')}}
{{basic.print('', 'myValue', 'script', 'if (VAR1 >50){$("#myPage-myID").prop("disabled", true).flipswitch("disable")}else{$("#myPage-myID").prop("disabled", false).flipswitch("enable")}')}}
```

Result:
![disable](https://github.com/smartVISU-newstuff/widgets/assets/60430485/78b1006f-2767-409a-bcac-b9cea5ca4168)


## Hysteresis for basic.symbol
Thread in the forum: https://knx-user-forum.de/forum/supportforen/smartvisu/1933127-hysterese-f%C3%BCr-basic-symbol-schwellwerte

Task: a symbol shall change properties if the item 'myItem' reaches a threshold value (e.g.80) and change back after passing a hysteresis of e.g. 5, i.e. at a value of 75. 

Solution:
```
{{basic.symbol('myID', 'myItem', '','light_control', '80', '>', ['icon1', 'icon2'])}}
{{basic.print('', 'myItem', 'script','$("#myPage-myID").data("sv-basic_symbol").options.mode = VAR1>=80?">VAR1+5":(VAR1<75 ? ">": $("#myPage-myID").data("sv-basic_symbol").options.mode);')}}
```


## Change an image on the page depending on an items value
Thread in the forum: https://knx-user-forum.de/forum/supportforen/smartvisu/1748643-kwl-widget?p=1751275#post1751275

Task: change e.g. a background image according to an item value (like basic.symbol does that for symbols). 
 
Solution:
```
<img id="myID" src="" alt="Test Image">
{{basic.print('', 'myItem', 'script', '$("#myID").attr("src", (VAR==1 ? "icons/ws/light_light.svg" : "icons/ws/light_downlight.svg"))')}}
```


Note: 'myID' in a html tag must be unique across all pages since concatenation with the page name is only automatic for widget IDs.

Result:  
![basic_print](https://github.com/smartVISU-newstuff/widgets/assets/60430485/1405c628-1848-4a57-b6c3-348b79059956)

Alternative: define the script in a twig variable:
```
{% set mydir = "icons/ws/" %}
{% set myscript = '$("#mytest").attr("src", (VAR==1 ? "'~mydir~'light_light.svg" : "'~mydir~'light_downlight.svg"))' %}
<img id="myID" src="" alt="Test Image">
{{basic.print('', 'myItem', 'script', myscript )}}
```
If the item is providing an image URL:
```
<img id="myID" src="" />
{{basic.print('','myItem','script','$("#myID").attr("src", VAR)') }}
```

To change an image source in a widget you need to provide a widget ID for the widget (e.g. "myID") and then find the right selector to address the img attribute "src". Use the developer tools of the browser to find the selector. 
For basic.stateswitch the active element is always a sibling of the span containing the widget ID. The sibling is an anchor tag with an img tag below.
```
{{ basic.print('', 'myItem','script','$("#myPage-myID").next("a").find("img.icon").attr("src", "something "+VAR1+"somethimgelse");')​ }}
                                       \________________________________________/              \_____________________________/
                                                         selector                                  new attr depending on item value           
```


## Change the color of an icon by an item containing the RGB(A) color value
(Usage recommended until smartVISU v3.4. Option is integrated in basic.icon as from v3.4.a)

Thread in the forum: https://knx-user-forum.de/forum/supportforen/smartvisu/1930478-hilfe-symbolfarbe-durch-farbcode-in-item-steuern

Task: see title.

Solution:
```
<span id="myId"> {{basic.icon('myIcon','#fff','','icon')}} <span>
{{basic.print('','myItem', 'script','$("#myId .icon").css("stroke",VAR1).css("fill", VAR1).css("color",VAR1)')}}
```

Note: basic.icon does not have a widget ID. you need to wrap it in a span with ID and add the class name '.icon' preceded by a blank (!) in the scripts selector to make the selector point to the right element.


## Execute JavaScript Code from custom .js files

Task: call a function in e.g. visu.js with parameters from the page and an item.

Example: let a symbol grow with the item value if a threshold is superceded.      

Solution:
```
{{basic.symbol('m1','myItem', '','light_control', '80', '>', ['icon1', 'icon2'])}}
{{basic.print('', 'myItem','script','myScript("#myPage-m1",VAR1);')}}
```
./pages/myPages/visu.js:
```
function myScript(id, VAR){
	if (VAR >= 80)
		$(id + ' .icon').css('transform', 'scale(' + VAR/80 +')');
	else
		$(id + ' .icon').css('transform', 'scale(1)');
}	
```
Result:
![functionCall](https://github.com/smartVISU-newstuff/widgets/assets/17801971/9eeb9acd-da59-440b-8a33-01a52206122c)
