## Widgets to visualize energy flow and energy distribution.
Copy power.html and power.js to &lt;smartvisu-root-directory&gt;/dropins/widgets and scene_home.svg to &lt;smartvisu-root-directory&gt;/dropins/icons/ws

### Widget Calls:
`{{ power.powerflow (id, item_pvPower, item_gridPower, item_batteryPower, item_housePower, item_vehiclePower, item_batterySoC, item_vehicleSoC) }}`

<img width="291" height="330" alt="grafik" src="https://github.com/user-attachments/assets/cc8eef1b-72b6-4607-a7eb-f42913f72019" />

`{{ power.powerdistribution(id, item_pvPower, item_gridPower, item_batteryPower, item_housePower, item_vehiclePower, item_batterySoC, item_vehicleSoc) }}`

<img width="330" height="143" alt="grafik" src="https://github.com/user-attachments/assets/0b85e7fa-2857-4cad-8dd4-332373f5c0b7" />

