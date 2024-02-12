# Hacks unsing the scripting option of basic.print



## Enable / disable flipswitch
Thread in the forum: https://knx-user-forum.de/forum/supportforen/smartvisu/1928558-basic-flip-taster-sperren
Solution:
```
{{basic.flip('w1', 'myItem')}}
{{basic.print('', 'myValue', 'script', 'if (VAR1 >50){$("#myPage-w1").prop("disabled", true).flipswitch("disable")}else{$("#myPage-w1").prop("disabled", false).flipswitch("enable")}')}}
```

Result:


## Hysteresis for basic.symbol
Thread in the forum: 
Solution:
```

```