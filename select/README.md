#New feature for basic.select widget: dynamic options

In basic.select, it is now possible to change options lists for the pulldown menu (type="menu") dynamically via items. The item "itemvals" provides the selectable values in list form. 
If specifoed, it overrides the other static parameters in the widget. An optional item "itemtxts" provides the corresponding menu texts. The widget will use alternative textes from the value list if  itemtxts is not specified.

To install the new featue, copy the two snippets into the basic.html and basic.js found in the ./widgets path and replace the existing widget code having the same name. 
