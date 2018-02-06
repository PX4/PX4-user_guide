# Flight Mode Configuration

[Flight Modes](../flight_modes/README.md) provide different types of *autopilot-assisted flight*, and *fully autonomous flight* via missions or offboard (companion computer) control. Different flight modes allow new users to learn flying with a more forgiving platform than provided by basic RC control alone. They also enable automation of common tasks like taking off, landing and returning to the original launch position.

PX4 allows you to select flight modes from a ground station (tablet or desktop) or from a radio control transmitter. If radio control and tablet are both connected, either system can change the mode and override the previous setting.

This topic explains how to map flight modes to the switches on your radio control transmitter.

> **Note** You must already have [configured your radio](../config/radio.md) in order to set flight modes.


## What Flight Modes Should I Set?

You can set any (or none) of the flight modes [described here](../flight_modes/README.md).

New users should consider setting one or more of the following modes, which make the vehicle much easier to fly:

- **Stabilized** - Vehicle hard to flip, and will level-out if the sticks are released (but not hold position).
- **Position** - When sticks are released the vehicle will stop (and hold position against wind drift).
- **Altitude** - Climb and drop are controlled to have a maximum rate.

It is also common to map switches to:

- [Return To Launch](../flight_modes/rtl.md) - This mode raises the vehicle to a safe height and returns to the launch position.
- **Mission** - This mode runs a pre-programmed mission sent by the ground control station.

Some pilots may also wish to enable:

<span id="kill-switch">
- **Kill Switch** - Immediately stops all motor outputs. The vehicle will crash, which may in some circumstances be more desirable than allowing it to continue flying.



## Multi Channel vs Single Channel Mode Selection

*PX4* (*QGroundControl*) supports two modes for mapping flight modes to transmitter switches/dials:

- **Single Channel Mode Selection:** Assign up to 6 flight modes to switch positions encoded in a single channel.
- **Multi Channel Mode Selection:** Assign modes to switch positions encoded in one or more channels. Some modes are hard coded to share channels, or are defined/set automatically based on other mode selections (the behaviour of multi-channel mode selection can sometimes be confusing). 

> **Tip** The recommended approach is use *Single Channel Mode Selection* because it easy to understand and configure. 

<span id="single_channel"></span>
## Single-Channel Flight Mode Selection

The single-channel selection mode allows you to specify a "mode" channel and select up to 6 flight modes that will be activated based on the PWM value of the channel. You can also separately specify channels for mapping a kill switch, return to launch mode, and offboard mode.

> **Note** In order to use this approach you will first need to configure your *transmitter* to encode the physical positions of your mode switch(es) into a single channel. We provide a video guide of how this is done for the popular *Taranis* transmitter [below](#taranis_setup) (check your documentation if you use a different transmitter). 

To configure single-channel flight mode selection:

1. Start *QGroundControl* and connect the vehicle.
1. Turn on your RC transmitter.
1. Select the **Gear** icon (Vehicle Setup) in the top toolbar and then **Flight Modes** in the sidebar.
   
   ![Flight modes multi-channel](../../images/qgc/setup/flight_modes_single_channel.jpg)
   
   > **Tip** If the screen opens in *Multi Channel Mode* click the **Use Single Channel Mode Selection** button to change screen.
   
1. Specify *Flight Mode Settings*:
   * Select the **Mode channel** (above this shown as Channel 5, but this will depend on your transmitter configuration). 
   * Select up to six **Flight Modes**.
1. Specify *Switch Settings*:
   * Select channels for *Return To Launch* mode, *Kill Switch*, and *offboard* mode (if you have spare switches and channels on your transmitter).
1. Test that the modes are mapped to the right transmitter switches:
   * Check the *Channel Monitor* to confirm that the expected channel is changed by each switch.
   * Select each mode switch on your transmitter in turn, and check that the desired flight mode is activated (the text turns yellow on *QGroundControl* for the active mode).


All values are automatically saved as they are changed.

<span id="taranis_setup"></span>
### Video Example (including Transmitter Setup)

It is common to use the positions of a 2- and a 3-position switch on the transmitter to represent the 6 flight modes, and encode each combination of switches as a particular PWM value for the mode that will be sent on a single channel. 

The video below shows how this is done with the *FrSky Taranis* transmitter (a very popular and highly recommended RC transmitter). The process involves assigning a "logical switch" to each combination of positions of the two real switches. Each logical switch is then assigned to a different PWM value on the same channel.

The video then shows how to use *QGroundControl* to specify the mode channel and map modes to each of the 6 "slots".
{% youtube %}
http://www.youtube.com/watch?v=scqO7vbH2jo
{% endyoutube %}

<span id="multi_channel"></span>
## Multi-Channel Flight Mode Selection

> **Tip** We recommend you use [Single Channel Flight Mode](#single_channel) selection because the Multi Channel selection user interface can be confusing. If you do choose to use this method, then the best approach is to start assigning channels and take note of information displayed by *QGroundControl* following your selection. 

The multi-channel selection UI allows you to map one or more modes to one or more channels. There are some modes (and hence switches) that must always be defined, and the channel to which they must be allocated.

To configure flight modes using the multi-channel UI:

1. Turn on your RC transmitter.
1. Start *QGroundControl* and connect the vehicle.
1. Select the **Gear** icon (Vehicle Setup) in the top toolbar and then **Flight Modes** in the sidebar.
   
   ![Flight modes multi-channel](../../images/qgc/setup/flight_modes_multi_channel.jpg)
   
   > **Tip** If the screen opens in *Single Channel Mode* click the **Use Multi Channel Mode Selection** button to change screen.
   
1. Select the modes you want to assign to your switches and select the associated channel (selected modes will *move* in the UI to be grouped by channel).
   There are a number of complications on the mode to channel assignments:
   * Some modes will have a grayed out channel selector because they cannot be disabled and you cannot directly set the value. For example:
     * *Mission* mode - Has the same channel number as *Hold* (if it is defined), or otherwise the same channel as *Stabilized/Main* mode.
     * *Altitude* mode - Has the same channel number as *Position Control* (if it is defined), or otherwise the same channel as *Stabilized/Main* mode.
   * *Assist* mode -  This mode is added to the same channel as *Stabilized/Main* mode if (and only if) *Position Control* is enabled and defined on a different channel than *Stabilized/Main*.
1. Click the **Generate Thresholds** button. 
   * This will automatically create threshold values for all modes, spread evenly across each channel for its assigned modes. For example, in the mode assignment shown above, most modes are assigned to mode 5, and you can see that the channel thresholds for each mode are spread evenly across the channel. 

This mode is demonstrated in the [autopilot setup video here](https://youtu.be/91VGmdSlbo4?t=6m53s) (youtube).

> **Note** This flight mode selection mechanism is relatively complicated due to the way that PX4 works out which mode should be selected. You may be able to gain some insight from this [flow chart](https://dev.px4.io/en/concept/flight_modes.html#flight-mode-evaluation-diagram) (PX4 Developer Guide).


## Further Information

* [Flight Modes Overview](../flight_modes/README.md)
* [QGroundControl > Flight Modes](https://docs.qgroundcontrol.com/en/SetupView/FlightModes.html#px4-pro-flight-mode-setup)
* [PX4 Setup Video - @6m53s](https://youtu.be/91VGmdSlbo4?t=6m53s) (Youtube)



