# Flight Mode Configuration

This topic explains how to map [flight modes](../getting_started/flight_modes.md) and other functions to the switches on your radio control transmitter.

:::tip
You must already have [configured your radio](../config/radio.md) in order to assign flight modes and functions.
:::

:::note
PX4 allows you to select flight modes from a ground station (tablet or desktop) or from a radio control transmitter.
If radio control and tablet are both connected, either system can change the mode and override the previous setting.
:::

## What Flight Modes and Switches Should I Set?

*Flight Modes* provide different types of *autopilot-assisted flight*, and *fully autonomous flight*.
You can set any (or none) of the flight modes [described here](../getting_started/flight_modes.md).
Most users should set the following functions, as these make the vehicle easier and safer to fly:

- **Position mode** ([multicopter](../getting_started/flight_modes.md#position-mode-mc), [fixed-wing](../getting_started/flight_modes.md#position-mode-fw)) - Easiest and safest mode for manual flight.
- [Return mode](../flight_modes/return.md) - Return to launch position by safe path and land (by default).
- **VTOL Transition Switch** - Toggle between fixed-wing and multicopter flight configuration on VTOL vehicles.

It is also common to map switches to:

- [Mission](../flight_modes/mission.md) - This mode runs a pre-programmed mission sent by the ground control station.
- <a id="kill_switch"></a> [Kill Switch](../config/safety.md#kill-switch) - Immediately stops all motor outputs (the vehicle will crash, which may in some circumstances be more desirable than allowing it to continue flying).


## Multi Channel vs Single Channel Mode Selection

*PX4* (*QGroundControl*) supports two modes for mapping flight modes to transmitter switches/dials:

- **Single Channel Mode Selection:** Assign up to 6 flight modes to switch positions encoded in a single channel.
- **Multi Channel Mode Selection:** Assign modes to switch positions encoded in one or more channels.
  Some modes are hard coded to share channels, or are defined/set automatically based on other mode selections (the behaviour of multi-channel mode selection can sometimes be confusing). 

:::tip
The recommended approach is use *Single Channel Mode Selection* because it easy to understand and configure.
:::

<span id="single_channel"></span>
## Single-Channel Flight Mode Selection

The single-channel selection mode allows you to specify a "mode" channel and select up to 6 flight modes that will be activated based on the PWM value of the channel.
You can also separately specify channels for mapping a kill switch, return to launch mode, and offboard mode.

:::note
In order to use this approach you will first need to configure your *transmitter* to encode the physical positions of your mode switch(es) into a single channel.
We provide information on how this is done for the popular *Taranis* transmitter [below](#taranis-setup-3-way-switch-configuration-for-single-channel-mode) (check your documentation if you use a different transmitter).
:::

To configure single-channel flight mode selection:

1. Start *QGroundControl* and connect the vehicle.
1. Turn on your RC transmitter.
1. Select **QGroundControl icon > Vehicle Setup**, and then **Flight Modes** in the sidebar.
   
   ![Flight modes single-channel](../../assets/qgc/setup/flight_modes/flight_modes_single_channel.jpg)
   
   :::tip
   If the screen opens in *Multi Channel Mode* click the **Use Single Channel Mode Selection** button to change screen.
   :::
   
1. Specify *Flight Mode Settings*:
   * Select the **Mode channel** (above this shown as Channel 5, but this will depend on your transmitter configuration).
   * Move the transmitter switch (or switches) that you have set up for mode selection through the available positions.
     The mode slot matching your current switch position will be highlighted (above this is *Flight Mode 4*).
     :::note
     While you can set flight modes in any of the 6 slots, only the channels that are mapped to switch positions will be highlighted/used.
     :::
   * Select the flight mode that you want triggered for each switch position.
1. Specify *Switch Settings*:
   * Select the channels that you want to map to specific actions - e.g.: *Return* mode, *Kill switch*, *offboard* mode, etc. (if you have spare switches and channels on your transmitter).
   
1. Test that the modes are mapped to the right transmitter switches:
   * Check the *Channel Monitor* to confirm that the expected channel is changed by each switch.
   * Select each mode switch on your transmitter in turn, and check that the desired flight mode is activated (the text turns yellow on *QGroundControl* for the active mode).

All values are automatically saved as they are changed.

<span id="taranis_setup"></span>
### Taranis Setup: 3-way Switch Configuration for Single-Channel Mode

If you only need to support selecting between two or three modes then you can map the modes to the positions of a single 3-way switch.
Below we show how to map the Taranis 3-way "SD" switch to channel 5.

:::note
This example shows how to set up the popular *FrSky Taranis* transmitter.
Transmitter setup will be different on other transmitters.
:::

Open the Taranis UI **MIXER** page and scroll down to **CH5**, as shown below:

![Taranis - Map channel to switch](../../assets/qgc/setup/flight_modes/single_channel_mode_selection_1.png)

Press **ENT(ER)** to edit the **CH5** configuration then change the **Source** to be the *SD* button.

![Taranis - Configure channel](../../assets/qgc/setup/flight_modes/single_channel_mode_selection_2.png)

That's it!
Channel 5 will now output 3 different PWM values for the three different **SD** switch positions.

The *QGroundControl* configuration is then as described in the previous section.


### Taranis Setup: Multi-Switch Configuration for Single-Channel Mode

Most transmitters do not have 6-way switches, so if you need to be able to support more modes than the number of switch positions available (up to 6) then you will have to represent them using multiple switches.
Commonly this is done by encoding the positions of a 2- and a 3-position switch into a single channel, so that each switch position results in a different PWM value.

On the FrSky Taranis this process involves assigning a "logical switch" to each combination of positions of the two real switches.
Each logical switch is then assigned to a different PWM value on the same channel.

The video below shows how this is done with the *FrSky Taranis* transmitter.

<!-- [youtube](https://youtu.be/scqO7vbH2jo) Video has gone private and is no longer available -->
<!-- @[youtube](https://youtu.be/BNzeVGD8IZI?t=427) - video showing how to set the QGC side - at about 7mins and 3 secs -->
@[youtube](https://youtu.be/TFEjEQZqdVA)

The *QGroundControl* configuration is then as [described above](#single-channel-flight-mode-selection).



<span id="multi_channel"></span>
## Multi-Channel Flight Mode Selection

:::tip
We recommend you use [Single Channel Flight Mode](#single_channel) selection because the Multi Channel selection user interface can be confusing.
If you do choose to use this method, then the best approach is to start assigning channels and take note of information displayed by *QGroundControl* following your selection.
:::

The multi-channel selection user interface allows you to map one or more modes to one or more channels.
There are some modes (and hence switches) that must always be defined, and the channel to which they must be allocated.

To configure flight modes using the multi-channel UI:

1. Turn on your RC transmitter.
1. Start *QGroundControl* and connect the vehicle.
1. Select the **Gear** icon (Vehicle Setup) in the top toolbar and then **Flight Modes** in the sidebar.
   
   ![Flight modes multi-channel](../../assets/qgc/setup/flight_modes/flight_modes_multi_channel.jpg)
   
   :::tip
   If the screen opens in *Single Channel Mode* click the **Use Multi Channel Mode Selection** button to change screen.
   :::
   
1. Select the modes you want to assign to your switches and select the associated channel (selected modes will *move* in the user interface to be grouped by channel).
   There are a number of complications on the mode to channel assignments:
   * Some modes cannot be manually edited (are grayed out) because their channel and threshold level are automatically defined based on the values of other mode settings. For example:
     * *Mission* mode - is automatically assigned the same channel number as *Hold* (if the channel for *Hold* is defined by the user). If the channel for *Hold* is not defined, *Mission* mode is automatically assigned the same channel as *Stabilized/Main* mode. This, for example, prevents the user from defining *Stabilized/Main* and *Mission* mode on different channels, to ensure that the user cannot switch both modes ON at the same time. 
     * *Altitude* mode - is automatically assigned the same channel number as *Position Control* (if it is defined), or otherwise the same channel as *Stabilized/Main* mode.
   * *Assist* mode -  This mode is added to the same channel as *Stabilized/Main* mode if (and only if) *Position Control* is enabled and defined on a different channel than *Stabilized/Main*.
1. Click the **Generate Thresholds** button. 
   * This will automatically create threshold values for all modes, spread evenly across each channel for its assigned modes. For example, in the mode assignment shown above, most modes are assigned to mode 5, and you can see that the channel thresholds for each mode are spread evenly across the channel. 

This mode is demonstrated in the [autopilot setup video here](https://youtu.be/91VGmdSlbo4?t=6m53s) (youtube).

:::note
This flight mode selection mechanism is relatively complicated due to the way that PX4 works out which mode should be selected.
You may be able to gain some insight from this [flow chart](../concept/flight_modes.md#flight-mode-evaluation-diagram).
:::


## Further Information

* [Flight Modes Overview](../flight_modes/README.md)
* [QGroundControl > Flight Modes](https://docs.qgroundcontrol.com/en/SetupView/FlightModes.html#px4-pro-flight-mode-setup)
* [PX4 Setup Video - @6m53s](https://youtu.be/91VGmdSlbo4?t=6m53s) (Youtube)
* [Radio switch parameters](../advanced_config/parameter_reference.md#radio-switches) - Can be used to set mappings via parameters



