---
canonicalUrl: https://docs.px4.io/main/ja/config/compass
---

# Compass Calibration

The compass calibration process configures all connected internal and external [magnetometers](../gps_compass/README.md). *QGroundControl* will guide you to position the vehicle in a number of set orientations and rotate the vehicle about the specified axis.

You will need to calibrate your compass on first use, and you may need to recalibrate it if the vehicles is ever exposed to a very strong magnetic field, or if it is used in an area with abnormal magnetic characteristics.

Two types of compass calibration are available:

1. [Complete](#complete-calibration): This calibration is required after installing the autopilot on an airframe for the first time or when the configuration of the vehicle has changed significantly. It compensates for hard and soft iron effects by estimating an offset and a scale factor for each axis.
1. [Partial](#partial-quick-calibration) ("Quick Calibration"): This calibration can be performed as a routine when preparing the vehicle for a flight, after changing the payload, or simply when the compass rose seems inaccurate. This type of calibration only estimates the offsets to compensate for a hard iron effect.

:::note
If you are using an external magnetometer/compass (or a compass integrated into a GPS module) make sure it is [mounted](../assembly/mount_gps_compass.md) as far as possible from other electronics and in a *supported orientation*. Instructions for *connecting* your GPS+compass can be found in [Basic Assembly](../assembly/README.md) for your specific autopilot hardware. Once connected, *QGroundControl* will automatically detect the external magnetometer.
:::

:::tip
Indications of a poor compass calibration include multicopter circling during hover, toilet bowling (circling at increasing radius/spiraling-out, usually constant altitude, leading to fly-way), or veering off-path when attempting to fly straight.
:::

## Performing the Calibration

### Complete Calibration

The calibration steps are:

1. Choose a location away from large metal objects or magnetic fields. :::tip
Metal is not always obvious! Avoid calibrating on top of an office table (often contain metal bars) or next to a vehicle. 
Calibration can even be affected if you're standing on a slab of concrete with uneven distribution of re-bar.
:::
1. Start *QGroundControl* and connect the vehicle.
1. Select the **Gear** icon (Vehicle Setup) in the top toolbar and then **Sensors** in the sidebar.
1. Click the **Compass** sensor button.

   ![Select Compass calibration PX4](../../assets/qgc/setup/sensor/sensor_compass_select_px4.jpg)

:::note
You should already have set the [Autopilot Orientation](../config/flight_controller_orientation.md). If not, you can also set it here.
:::
1. Click **OK** to start the calibration.
1. Place the vehicle in any of the orientations shown in red (incomplete) and hold it still. Once prompted (the orientation-image turns yellow) rotate the vehicle around the specified axis in either/both directions. Once the calibration is complete for the current orientation the associated image on the screen will turn green.

   ![Compass calibration steps on PX4](../../assets/qgc/setup/sensor/sensor_compass_calibrate_px4.jpg)

1. Repeat the calibration process for all vehicle orientations.

Once you've calibrated the vehicle in all the positions *QGroundControl* will display *Calibration complete* (all orientation images will be displayed in green and the progress bar will fill completely). You can then proceed to the next sensor.

### Partial "Quick" Calibration

This calibration is similar to the well-known figure-8 compass calibration done on a smartphone:

1. Hold the vehicle in front of you and randomly perform partial rotations on all its axes.
1. Wait for the heading estimate to stabilize and verify that the compass rose is pointing to the correct direction (this can take a couple of seconds).

Notes:

- There is no start/stop for this type of calibration (the algorithm runs continuously when the vehicle is disarmed).
- The calibration is immediately applied to the data (no reboot is required) but is saved to the calibration parameters after disarming the vehicle only (the calibration is lost if no arming/disarming sequence is performed between calibration and shutdown).
- The amplitude and the speed of the partial rotations done in step 1 can affect the calibration quality. However, 2-3 oscillations of ~30 degrees in every direction is usually enough.

## Further Information

* [Peripherals > GPS & Compass > Compass Configuration](../gps_compass/README.md#compass-configuration)
* [QGroundControl User Guide > Sensors](https://docs.qgroundcontrol.com/en/SetupView/sensors_px4.html#compass)
* [PX4 Setup Video - @2m38s](https://youtu.be/91VGmdSlbo4?t=2m38s) (Youtube)
* [Compass Power Compensation](../advanced_config/compass_power_compensation.md) (Advanced Configuration)
