# Hacks unsing the scripting option of basic.print
The 'script' option of basic.print gives us a method to directly address elements on the page and change their properties using JavaScript and jQuery mobile. You just need to give the
target elements a unique ID, e.g. 'myID' which is automatically concatenated with the pagename by smartVISU in almost all widgets: '#myPage-myID'. 

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
