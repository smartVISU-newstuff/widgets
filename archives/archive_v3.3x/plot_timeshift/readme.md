# smartvisu-timeshift
Plot analysing widget for smartvisu

The widget shifts existing plots in the time-range. Just link it via the id (2nd parameter), add the time delta (3rd parameter) and size of the buttons:
```
{{ plot.period('load', ['env.system.load', 'bath.light.value'], 'avg', '1d', '', '', '', '', 'system load') }}
{{ myplot.timeshift('','load', '1d','mini') }}
```
![image](https://user-images.githubusercontent.com/17801971/217889071-2bb9a0b8-7e0d-4ba0-bb46-270814318df1.png)

The widget can also be placed in the headline of a block. Use type "head" then instead of "mini".

![image](https://user-images.githubusercontent.com/17801971/217889304-2761cdce-bb9b-4c8c-a495-514d6737bbe8.png)


Compatible with smartVISU v3.3.x
