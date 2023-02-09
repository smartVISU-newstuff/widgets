# smartvisu-timeshift
Plot analysing widget for smartvisu

The widget shifts existing plots in the time-range. Just link it via the id (2nd parameter), add the time delta (3rd parameter) and size of the buttons:
```
{{ plot.period('load', ['env.system.load', 'bath.light.value'], 'avg', '1d', '', '', '', '', 'system load') }}
{{ myplot.timeshift('','load', '1d','mini') }}

The widget can be placed in the headline of a block. Use type "head" then instead of "mini"

Compatible with smartVISU v3.3.x
