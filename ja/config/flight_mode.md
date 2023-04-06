# Flight Mode Configuration

This topic explains how to map [flight modes](../getting_started/flight_modes.md) and other functions to the switches on your radio control transmitter.

:::tip
In order to set up flight modes you must already have:
- [Configured your radio](../config/radio.md)
- [Setup your transmitter](#rc-transmitter-setup) to encode the physical positions of your mode switch(es) into a single channel. [Setup your transmitter](#rc-transmitter-setup) to encode the physical positions of your mode switch(es) into a single channel. :::


## What Flight Modes and Switches Should I Set?

*Flight Modes* provide different types of *autopilot-assisted flight*, and *fully autonomous flight*. You can set any (or none) of the flight modes [described here](../getting_started/flight_modes.md). Most users should set the following functions, as these make the vehicle easier and safer to fly:

- **Position mode** ([multicopter](../getting_started/flight_modes.md#position-mode-mc), [fixed-wing](../getting_started/flight_modes.md#position-mode-fw)) - Easiest and safest mode for manual flight.
- [Return mode](../flight_modes/return.md) - Return to launch position by safe path and land (by default).
- **VTOL Transition Switch** - Toggle between fixed-wing and multicopter flight configuration on VTOL vehicles.

It is also common to map switches to:

- [Mission](../flight_modes/mission.md) - This mode runs a pre-programmed mission sent by the ground control station.
- <a id="kill_switch"></a> [Kill Switch](../config/safety.md#kill-switch) - Immediately stops all motor outputs (the vehicle will crash, which may in some circumstances be more desirable than allowing it to continue flying).


## Flight Mode Selection

PX4 allows you to specify a "mode" channel and select up to 6 flight modes that will be activated based on the PWM value of the channel. You can also separately specify channels for mapping a kill switch, return to launch mode, and offboard mode.

To configure single-channel flight mode selection:

1. Start *QGroundControl* and connect the vehicle.
1. Turn on your RC transmitter.
1. Select **QGroundControl icon > Vehicle Setup**, and then **Flight Modes** in the sidebar.

   ![Flight modes single-channel](../../assets/qgc/setup/flight_modes/flight_modes_single_channel.jpg)

1. Specify *Flight Mode Settings*:
   * Select the **Mode channel** (above this shown as Channel 5, but this will depend on your transmitter configuration).
   * Move the transmitter switch (or switches) that you have set up for mode selection through the available positions. Move the transmitter switch (or switches) that you have set up for mode selection through the available positions. :::note
While you can set flight modes in any of the 6 slots, only the channels that are mapped to switch positions will be highlighted/used.
:::
   * Select the flight mode that you want triggered for each switch position.
1. Specify *Switch Settings*:
   * Select the channels that you want to map to specific actions - e.g.: *Return* mode, *Kill switch*, *offboard* mode, etc. (if you have spare switches and channels on your transmitter).

1. Test that the modes are mapped to the right transmitter switches:
   * Check the *Channel Monitor* to confirm that the expected channel is changed by each switch.
   * Select each mode switch on your transmitter in turn, and check that the desired flight mode is activated (the text turns yellow on *QGroundControl* for the active mode).

All values are automatically saved as they are changed.

## RC Transmitter Setup

This section contains a small number of possible setup configurations for taranis. QGroundControl *may* have [setup information for other transmitters here](https://docs.qgroundcontrol.com/master/en/SetupView/FlightModes.html#transmitter-setup).


<span id="taranis_setup"></span>
### Taranis Setup: 3-way Switch Configuration for Single-Channel Mode

If you only need to support selecting between two or three modes then you can map the modes to the positions of a single 3-way switch. Below we show how to map the Taranis 3-way "SD" switch to channel 5.

:::note
This example shows how to set up the popular *FrSky Taranis* transmitter. Transmitter setup will be different on other transmitters. :::

Open the Taranis UI **MIXER** page and scroll down to **CH5**, as shown below:

![Taranis - Map channel to switch](../../assets/qgc/setup/flight_modes/single_channel_mode_selection_1.png)

Press **ENT(ER)** to edit the **CH5** configuration then change the **Source** to be the *SD* button.

![Taranis - Configure channel](../../assets/qgc/setup/flight_modes/single_channel_mode_selection_2.png)

That's it! Channel 5 will now output 3 different PWM values for the three different **SD** switch positions.

The *QGroundControl* configuration is then as described in the previous section.


### Taranis Setup: Multi-Switch Configuration for Single-Channel Mode

Most transmitters do not have 6-way switches, so if you need to be able to support more modes than the number of switch positions available (up to 6) then you will have to represent them using multiple switches. Commonly this is done by encoding the positions of a 2- and a 3-position switch into a single channel, so that each switch position results in a different PWM value.

On the FrSky Taranis this process involves assigning a "logical switch" to each combination of positions of the two real switches. Each logical switch is then assigned to a different PWM value on the same channel.

The video below shows how this is done with the *FrSky Taranis* transmitter.<!-- \[youtube\](https://youtu.be/scqO7vbH2jo) Video has gone private and is no longer available --><!-- @\[youtube\](https://youtu.be/BNzeVGD8IZI?t=427) - video showing how to set the QGC side - at about 7mins and 3 secs -->@https://youtu.be/TFEjEQZqdVA

The *QGroundControl* configuration is then [as described above](#flight-mode-selection).


## Further Information

* [Flight Modes Overview](../flight_modes/README.md)
* [QGroundControl > Flight Modes](https://docs.qgroundcontrol.com/master/en/SetupView/FlightModes.html#px4-pro-flight-mode-setup)
* [PX4 Setup Video - @6m53s](https://youtu.be/91VGmdSlbo4?t=6m53s) (Youtube)
* [Radio switch parameters](../advanced_config/parameter_reference.md#radio-switches) - Can be used to set mappings via parameters



