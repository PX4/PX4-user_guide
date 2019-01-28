# Radio (Remote Control) Setup

The *Radio Setup* screen is used to configure the mapping of your remote control unit's main attitude control sticks (roll, pitch, yaw, throttle) to channels, and to calibrate the minimum, maximum, trim and reverse settings for all other transmitter controls/RC channels.

## Binding the Receiver

Before you can calibrate the radio system the receiver and transmitter must be connected/bound. The process for binding a transmitter and receiver pair is hardware specific (see your RC manual for instructions).

> **Note** If you are using a *Spektrum* receiver, you can put it into bind mode using *QGroundControl*, as [shown below](#spektrum_bind).
> 
> **Note** If you are using a *FrSky* receiver, you can bind it with its transmitter, by following instructions [here](https://www.youtube.com/watch?v=1IYg5mQdLVI).

## Performing the Calibration

The calibration process is straightforward - you will be asked to move the sticks in a specific pattern that is shown on the transmitter diagram on the top right of the screen.

To calibrate the radio:

1. Turn on your RC transmitter.
2. Start *QGroundControl* and connect the vehicle.
3. Select the **Gear** icon (Vehicle Setup) in the top toolbar and then **Radio** in the sidebar.
4. Press **OK** to start the calibration.
    
    ![Radio setup - before starting](../../images/qgc/setup/radio_start_setup.jpg)

5. Set the [transmitter mode](../getting_started/rc_transmitter_receiver.md#transmitter_modes) radio button that matches your transmitter (this ensures that *QGroundControl* displays the correct stick positions for you to follow during calibration).
    
    ![Radio setup - move sticks](../../images/qgc/setup/radio_sticks_throttle.jpg)

6. Move the sticks to the positions indicated in the text (and on the transmitter image). Press **Next** when the sticks are in position. Repeat for all positions.

7. When prompted, move all other switches and dials through their full range (you will be able to observe them moving on the *Channel Monitor*).

8. Press **Next** to save the settings.

Radio calibration is demonstrated in the [autopilot setup video here](https://youtu.be/91VGmdSlbo4?t=4m30s) (youtube).

## Additional Radio Setup

As well as calibrating your control sticks and other transmitter controls, there are a number of additional radio setup options that you may find useful on this screen.

<img src="../../images/qgc/setup/radio_additional_radio_setup.jpg" title="Radio setup - additional settings" width="300px" />

<span id="spektrum_bind"></span>

### Spectrum Bind

Before you can calibrate the radio system the receiver and transmitter must be connected/bound. If you have a *Spektrum* receiver you can put it in *bind mode* using *QGroundControl* as shown below (this can be particularly useful if you don't have easy physical access to the receiver on your vehicle).

To bind a Spektrum transmitter/receiver:

1. Select the **Spektrum Bind** button
2. Select the radio button for your receiver
3. Press **OK**
    
    ![Spektrum Bind](../../images/qgc/setup/radio_additional_setup_spectrum_bind_select_channels.jpg)

4. Power on your Spektrum transmitter while holding down the bind button.

### Copy Trims

This setting is used to copy the manual trim settings from your radio transmitter so that they can be applied automatically within the autopilot. After this is done you will need to remove the manually set trims.

> **Note** Trim settings are used to adjust the roll, pitch, yaw such that when you center the sticks on your remote control, you get stable or level flight (in Stabilized flight mode). Some RC controllers provide trim knobs that allow you to provide an offset to the value sent by the RC controller for each stick position. The **Copy Trims** setting here moves the offsets into the autopilot.

To copy the trims:

1. Select **Copy Trims**.
2. Center your sticks and move throttle all the way down. 
3. Press **Ok**.
    
    ![Copy Trims](../../images/qgc/setup/radio_additional_radio_setup_copy_trims.jpg)

4. Reset the trims on your transmitter back to zero.

### AUX Passthrough Channels

AUX passthrough channels allow you to control arbitrary optional hardware from your transmitter (for example, a gripper).

To use the AUX passthrough channels:

1. Map up to 2 transmitter controls to separate channels. 
2. Specify these channels to map to the AUX1 and AUX2 ports respectively, as shown below. Values are saved to the vehicle as soon as they are set.
    
    ![AUX1 and AUX2 RC passthrough channels](../../images/qgc/setup/radio_additional_setup_aux_passthrough_channels.jpg)

The flight controller will pass through the unmodified values from the specified channels out of AUX1/AUX2 to the connected servos/relays that drive your hardware.

### Param Tuning Channels

Tuning channels allow you to map a transmitter tuning knob to a parameter (so that you can dynamically modify a parameter from your transmitter).

> **Tip** This feature is provided to enable manual in-flight tuning: [Multicopter PID Tuning Guide](../config_mc/pid_tuning_guide_multicopter.md), [Fixedwing PID Tuning Guide](../config_fw/pid_tuning_guide_fixedwing.md).

The channels used for parameter tuning are assigned in the *Radio* setup (here!), while the mapping from each tuning channel to its associated parameter is defined in the *Parameter editor*.

To set up tuning channels:

1. Map up to 3 transmitter controls (dials or sliders) to separate channels.
2. Select the mapping of *PARAM Tuning Id* to radio channels, using the selection lists. Values are saved to the vehicle as soon as they are set.
    
    ![Map radio channels to tuning channels](../../images/qgc/setup/radio_additional_radio_setup_param_tuning.jpg)

To map a PARAM tuning channel to a parameter:

1. Open the **Parameters** sidebar. 
2. Select the parameter to map to your transmitter (this will open the *Parameter Editor*).
3. Check the **Advanced Settings** checkbox.
4. Click the **Set RC to Param...** button (this will pop-up the forground dialog displayed below)
    
    ![Map tuning channels to parameters](../../images/qgc/setup/parameters_radio_channel_mapping.jpg)

5. Select the tuning channel to map (1, 2 or 3) from the *Parameter Tuning ID* selection list.

6. Press **OK** to close the dialog.
7. Press **Save** to save all changes and close the *Parameter Editor*.

> **Tip** You can clear all parameter/tuning channel mappings by selecting menu **Tools > Clear RC to Param** at the top right of the *Parameters* screen.

## Further Information

* [QGroundControl > Radio Control](https://docs.qgroundcontrol.com/en/SetupView/Radio.html)
* [PX4 Setup Video - @4m30s](https://youtu.be/91VGmdSlbo4?t=4m30s) (Youtube)