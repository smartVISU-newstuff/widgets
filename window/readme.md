The window widget contains a set of visualization elements for windows with their opening status (0=closed, 1=tilt, 2=open).
Icon color is icon0 when window is closed, changes to icon1 if opened.

- window.pic: double-wing window with status on right wing only, no text  
    Call:  {{ window.pic(id, 'item.status') }}  
- window.one: single-wing window with status and text  
    Call:  {{ window.one(id, 'Text', 'item.status') }}  
- window.two: double-wing window with status on right wing and text  
    Call:  {{ window.two(id, 'Text', 'item.status') }}

  ![](https://github.com/smartVISU-newstuff/widgets/blob/master/window/pics/two.png)
