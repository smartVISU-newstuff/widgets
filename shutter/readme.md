The shutter widget contains a set of control assemblies for shutters.

- shutter.one, shutter.two, shutter.three: controls taylored to fit into one collapsible box (set-2 style)

    Call:  
      {{ shutter.one (id, 'Text', 'item.move', 'item.stop', 'item.pos', 'item.saved') }}  
      {{ shutter.two (id, 'Text', 'item.move', 'item.stop', 'item.pos', 'item.saved') }}  put two in a row  
      {{ shutter.three (id, 'Text', 'item.pos', 'item.saved') }}  put three in a row

![](https://github.com/smartVISU-newstuff/widgets/blob/master/shutter/pics/One.png)&nbsp;&nbsp;![](https://github.com/smartVISU-newstuff/widgets/blob/master/shutter/pics/Two.png)&nbsp;&nbsp;![](https://github.com/smartVISU-newstuff/widgets/blob/master/shutter/pics/Three.png)
- shutter.line: simple line / or table format for shutter controls

    Call:   
      {{ shutter.line (id, 'Text', 'item.move', 'item.stop', 'item.pos', 'item.saved', 'type') }}  # type = micro / mini / midi / icon

![](https://github.com/smartVISU-newstuff/widgets/blob/master/shutter/pics/Line.png)
- shutter.table: same format as shutter.line with more options
