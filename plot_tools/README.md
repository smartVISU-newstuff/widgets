## Collection of Plot Tools

### plottools.compare
The widget simplifies comparing data over different time periods by subscribing one or multiple datasets for comparison and adds the 
respective x-axes to the plot.
- specify a plot using plot.period with the main curve and give it a unique ID
- call plottools.compare with the ID of the plot and the time difference in duration format 

```
{{plot.period('p1','bath.light','avg', '1d', 'now')}}
{{plottools.compare('','p1','1d')}}
```

### plottools.record
The widget records data from one ore more given items which are not plot-items. Every item update gives a new point in the recorded plot. 
This is useful for testing, e.g. recording the behaviour of an UZSU. Recording works while the page is active. The plot is deleted on page reload. 
Most of the parameters of plot.period can be used.
```
{{plottools.record('','test.varuzsu', '12h', 'now')}}
```
