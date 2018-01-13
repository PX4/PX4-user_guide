# Battery and Powermodule Setup

Before you fly for the first time you should make sure you have a way to monitor your battery state. Not knowing how much fuel is left may likely lead to deep discharge of the used battery which can cause damage to the battery, loss of vehicle control and hence a crash.

> **Note** The battery monitoring related features of PX4 can only be used if you have compatible hardware which is in most cases a power module that measures the battery voltage and the current between battery and vehicle.

## Set the Basic Battery Settings

1. Start *QGroundControl* and connect the vehicle.
1. Select the **Gear** icon (Vehicle Setup) in the top toolbar and then **Power** in the sidebar.

You are presented with the basic settings that characterize your battery.

### Number of accumulator cells connected in series
Batteries commonly rely on a chemical process to save and supply energy. The voltage across one atomic battery cell is given by the chemical properties of the battery type.
For example the byy far most common battery type for remote controlled vehicles are lithium polymer (li-po) accumulators with a nominal cell voltage of 3.7V.
To achieve higher voltages for efficiently powering the actuators of a vehicle, multiple cells are connected in series.
This results in multiples of the cell voltage as output at the battery terminals. Batteries are labeled with the number of cells they contain by a number followed by a big S for series. E.g. 1S is one cell, 4S are four cells in series.
If you cannot find any label on your battery telling you the number of cells you can infer the count by the battery type and its nominal voltage.

So for li-po batteries the following voltages are possible
* 1S - 3.7V
* 2S - 7.4V
* 3S - 11.1V
* 4S - 14.8V
* 5S - 18.5V
* 6S - 22.2V

This setting sets the number of cells connected in series PX4 should monitor.

### Full cell voltage
A chemical battery cells output voltage depends on many parameters like the way the battery was built, temperature, load, if the battery was damaged. But for a healthy battery under normal conditions with no load attached the remaining capacity is the main factor.
Normal li-po batteries should be charged by dedicated charging devices such that each cell reaches a maximal voltage of exactly 4.2V. But after the battery was fully charged and is stored for later use the voltage starts to decrease even with no external load at all.
That's why this setting should be set just a bit lower than the maximal voltage of a cell otherwise the fuel estimate will likely already be below 100% by the time you connect the battery to your autopilot.

### Empty cell voltage
