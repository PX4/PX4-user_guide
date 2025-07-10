---
canonicalUrl: https://docs.px4.io/main/ru/config/radio
---

# Radio (Remote Control) Setup

The *Radio Setup* screen is used to configure the mapping of your remote control unit's main attitude control sticks (roll, pitch, yaw, throttle) to channels, and to calibrate the minimum, maximum, trim and reverse settings for all other transmitter controls/RC channels.

## Binding the Receiver

Before you can calibrate the radio system the receiver and transmitter must be connected/bound. The process for binding a transmitter and receiver pair is hardware specific (see your RC manual for instructions).

:::note
If you are using a *Spektrum* receiver, you can put it into bind mode using *QGroundControl*, as [shown below](#spektrum_bind).
:::

:::note
If you are using a *FrSky* receiver, you can bind it with its transmitter, by following instructions [here](https://www.youtube.com/watch?v=1IYg5mQdLVI).
:::

<span id="rc_loss_detection"></span>

## RC Loss Detection

PX4 needs to be able to detect when the signal from the RC controller has been lost in order to be able to take [appropriate safety measures](../config/safety.md#rc_loss_failsafe).

RC receivers have different ways of indicating signal loss:

* Output nothing (automatically detected by PX4)
* Output a low throttle value (you can configure PX4 to detect this).
* Output the last received signal (*cannot be detected by PX4* as it looks like valid input).

If your RC receiver does not support outputting no signal on RC loss, you must configure it to set throttle low instead, and set the corresponding value in [RC_FAILS_THR](../advanced_config/parameter_reference.md#RC_FAILS_THR).

The way to do this is to set the RC controller trim and throttle stick as low as possible, and use the resulting output PWM value in both PX4 and the receiver (read your receiver manual to determine how to set the RC loss value). Then reset the throttle stick trim back to its normal position. This process ensures that the RC loss value is below the minimum value output by the receiver in normal operation.

:::note
Do not use a receiver that cannot support one of the two supported RC loss detection methods!
:::

## Performing the Calibration

The calibration process is straightforward - you will be asked to move the sticks in a specific pattern that is shown on the transmitter diagram on the top right of the screen.

To calibrate the radio:

1. Turn on your RC transmitter.
2. Start *QGroundControl* and connect the vehicle.
3. Select the **Gear** icon (Vehicle Setup) in the top toolbar and then **Radio** in the sidebar.
4. Press **OK** to start the calibration.
    
    ![Radio setup - before starting](../../assets/qgc/setup/radio/radio_start_setup.jpg)

5. Set the [transmitter mode](../getting_started/rc_transmitter_receiver.md#transmitter_modes) radio button that matches your transmitter (this ensures that *QGroundControl* displays the correct stick positions for you to follow during calibration).
    
    ![Radio setup - move sticks](../../assets/qgc/setup/radio/radio_sticks_throttle.jpg)

6. Move the sticks to the positions indicated in the text (and on the transmitter image). Press **Next** when the sticks are in position. Repeat for all positions.

7. When prompted, move all other switches and dials through their full range (you will be able to observe them moving on the *Channel Monitor*).

8. Press **Next** to save the settings.

Radio calibration is demonstrated in the [autopilot setup video here](https://youtu.be/91VGmdSlbo4?t=4m30s) (youtube).

## Additional Radio Setup

As well as calibrating your control sticks and other transmitter controls, there are a number of additional radio setup options that you may find useful on this screen.

<img src="../../assets/qgc/setup/radio/radio_additional_radio_setup.jpg" title="Radio setup - additional settings" width="300px" />

<span id="spektrum_bind"></span>

### Spectrum Bind

Before you can calibrate the radio system the receiver and transmitter must be connected/bound. If you have a *Spektrum* receiver you can put it in *bind mode* using *QGroundControl* as shown below (this can be particularly useful if you don't have easy physical access to the receiver on your vehicle).

To bind a Spektrum transmitter/receiver:

1. Select the **Spektrum Bind** button
2. Select the radio button for your receiver
3. Press **OK**
    
    ![Spektrum Bind](../../assets/qgc/setup/radio/radio_additional_setup_spectrum_bind_select_channels.jpg)

4. Power on your Spektrum transmitter while holding down the bind button.

### Copy Trims

This setting is used to copy the manual trim settings from your radio transmitter so that they can be applied automatically within the autopilot. After this is done you will need to remove the manually set trims.

:::note
Trim settings are used to adjust the roll, pitch, yaw such that when you center the sticks on your remote control, you get stable or level flight (in Stabilized flight mode). Some RC controllers provide trim knobs that allow you to provide an offset to the value sent by the RC controller for each stick position. The **Copy Trims** setting here moves the offsets into the autopilot.
:::

To copy the trims:

1. Select **Copy Trims**.
2. Center your sticks and move throttle all the way down. 
3. Press **Ok**.
    
    ![Copy Trims](../../assets/qgc/setup/radio/radio_additional_radio_setup_copy_trims.jpg)

4. Reset the trims on your transmitter back to zero.

### AUX Passthrough Channels

AUX passthrough channels allow you to control arbitrary optional hardware from your transmitter (for example, a gripper).

To use the AUX passthrough channels:

1. Map up to 2 transmitter controls to separate channels. 
2. Specify these channels to map to the AUX1 and AUX2 ports respectively, as shown below. Values are saved to the vehicle as soon as they are set.
    
    ![AUX1 and AUX2 RC passthrough channels](../../assets/qgc/setup/radio/radio_additional_setup_aux_passthrough_channels.jpg)

The flight controller will pass through the unmodified values from the specified channels out of AUX1/AUX2 to the connected servos/relays that drive your hardware.

### Param Tuning Channels

Tuning channels allow you to map a transmitter tuning knob to a parameter (so that you can dynamically modify a parameter from your transmitter).

:::tip
This feature is provided to enable manual in-flight tuning: [Multicopter PID Tuning Guide](../config_mc/pid_tuning_guide_multicopter.md), [Fixedwing PID Tuning Guide](../config_fw/pid_tuning_guide_fixedwing.md).
:::

The channels used for parameter tuning are assigned in the *Radio* setup (here!), while the mapping from each tuning channel to its associated parameter is defined in the *Parameter editor*.

To set up tuning channels:

1. Map up to 3 transmitter controls (dials or sliders) to separate channels.
2. Select the mapping of *PARAM Tuning Id* to radio channels, using the selection lists. Values are saved to the vehicle as soon as they are set.
    
    ![Map radio channels to tuning channels](../../assets/qgc/setup/radio/radio_additional_radio_setup_param_tuning.jpg)

To map a PARAM tuning channel to a parameter:

1. Open the **Parameters** sidebar. 
2. Select the parameter to map to your transmitter (this will open the *Parameter Editor*).
3. Check the **Advanced Settings** checkbox.
4. Click the **Set RC to Param...** button (this will pop-up the foreground dialog displayed below)
    
    ![Map tuning channels to parameters](../../assets/qgc/setup/radio/parameters_radio_channel_mapping.jpg)

5. Select the tuning channel to map (1, 2 or 3) from the *Parameter Tuning ID* selection list.

6. Press **OK** to close the dialog.
7. Press **Save** to save all changes and close the *Parameter Editor*.

:::tip
You can clear all parameter/tuning channel mappings by selecting menu **Tools > Clear RC to Param** at the top right of the *Parameters* screen.
:::

## Further Information

* [QGroundControl > Radio Control](https://docs.qgroundcontrol.com/en/SetupView/Radio.html)
* [PX4 Setup Video - @4m30s](https://youtu.be/91VGmdSlbo4?t=4m30s) (Youtube)
* [RC System Selection](../getting_started/rc_transmitter_receiver.md) - Choose a compatible RC system.