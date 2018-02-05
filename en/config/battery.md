# Battery and Powermodule Setup

> **Warning** Before you fly for the first time you should make sure you have a way to monitor your battery state. Not knowing how much fuel is left may likely lead to deep discharge of the used battery which can cause damage to the battery, loss of vehicle control and hence a crash.

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
Most battery cells particularly also li-pos suffer a lot when they get used after they are "empty". To say if they are empty is not binary and not accurately possible by only knowing the cell voltage.
On one hand if a li-po ever sees a voltage lower than 3.2V even if it's under load it will suffer significant damage for sure. On the other hand the nominal cell voltage 3.7V without load is where the battery starts to get into the empty range and that's the most conservative voltage to consider it empty.
In between these extremes the earlier you put the battery to charge again the longer the life span will be and the less capacity degrade you'll see.

> **Hint** As my personal most general rule of thumb if the first li-po cell raw voltage gets below 3.5V during flight (under load) I start to land immediately.

When speaking about the empty cell voltage we need to distinguish:
* Raw voltage under load, the voltage directly measured while flying
This value highly varies depending on the momentary current draw from the cells. As a result you will see fluctuating battery percentages
* Rest voltage without a load when the battery is resting for some time
Best suitable measurement to infer charge status of the cell.
* Load compensated voltage calculated in air (under load)
Ideally you want to have a load compensated voltage available during flight which reflects the rest voltage without load. but in practise the load compensated value will always be a bit below what you end up with because the battery "recovers" its unloaded voltage over time without gaining usable capacity.

## Without load compensation
With the default parameter set there is no load compensation enabled because if you don't have a current sensor, it might be uncalibrated or the internal resistance of your battery is completely off the resulting compensation might not make sense.

If you don't want to use load compensation set the empty cell voltage to the value that should result in 0% battery estimation.

## With load compensation
If you use load compensation the empty voltage should be set higher than without because the compensated voltage gets used for the estimation. What you want to set is typically a bit below the expected rest cell voltage when empty after use.

### With thrust based load compensation (not recommended)
Without a current sensor it's very hard to do load compensation. You can enable compensation based on the total thrust which gets commanded to the motors by setting the parameter BAT_V_LOAD_DROP to how much voltage drop a cell shows under the load of full throttle. But this method is not accurate even with a good parameter because there's a delay between thrust command and current and the thrust in not linearly proportional to the current.

### With current based load compensation (recommended)
If you have a current sensor on board you can enable load compensation using the current measurement by setting the parameter `BAT_R_INTERNAL` to the internal resistance of your battery. There are li-po chargers out there which can measure the internal resistance of your battery. A typical value is 5mΩ but this can vary with discharge current rating, age and health of the cells.
With decent configured load compensation the voltage used for the battery fuel estimation is much more stable and will not vary that much anymore when flying up and down.

### Calibration Voltage Devider & Current per volt
If you have a vehicle which measures voltage and current through a power module and the ADC of the FCU then you should check and calibrate the measurements once per board. To calibrate you'll need a multimeter.

The easiest way to calibrate the dividers is by using QGroundControl and following the step-by-step guide on https://docs.qgroundcontrol.com/en/SetupView/Power.html.

## Combning voltage based estimation with current integration
After tuning the voltage based estimation you can achieve a more stable linear and accurate estimation by fusing your estimate with the so far used capacity. This is only possible with accurate current measurements because the current gets mathematically integrated over time to have a used capacity estimate.
This is the best way to have totally accurate relative fuel consumption of the battery. You can not use only this technique because:
* You cannot detect how full the battery is when the vehicle is turned on
* If the absolute fuel estimation is for some reason wrong or the battery is faulty you don't have feedback.

That's why you should always configure and tune the voltage based estimation first and then afterwards enable direct used capacity fusion.
To enable this feature make sure you have a working and safe voltage based estimation then set the parameter `BAT_CAPACITY` to around 90% of the advertised battery capacity which is usually printed on a label on the battery.
Setting this value too large will not extend your flight time it will only result in worse estimation and a sudden percentage drop or if exaggerated to totally unreliable percentages.

If you set up all of this correctly and you use a healthy, fresh charged battery on every boot up the estimation will be comparable to a smart battery and theoretically allow for accurate remaining flight time estimation.
