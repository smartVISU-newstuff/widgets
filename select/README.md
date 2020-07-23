New feature for basic.select widget: dynamic options

In basic.select, it is now possible to change option lists for the pulldown menu (type="menu") dynamically via items. 
The item "itemvals" provides the selectable values in list form. If specified, it overrides the other static parameters in the widget. 
An optional item "itemtxts" provides the corresponding menu texts. The widget will use alternative texts from the value list if itemtxts is not specified.

To install the new featue, copy the two snippets into the basic.html and basic.js files found in the ./widgets path and replace the existing widget code under the same name. 
