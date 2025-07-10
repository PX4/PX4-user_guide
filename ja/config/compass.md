---
canonicalUrl: https://docs.px4.io/main/ja/config/compass
---

# Compass Calibration

The compass calibration process configures all connected internal and external [magnetometers](../gps_compass/README.md). *QGroundControl* will guide you to position the vehicle in a number of set orientations and rotate the vehicle about the specified axis.

:::note
If you are using an external magnetometer/compass (e.g. a compass integrated into a GPS module) make sure you mount the external compass on your vehicle properly and connect it to the autopilot hardware. Instructions for connecting your GPS+compass can be found in [Basic Assembly](../assembly/README.md) for your specific autopilot hardware. Once connected, *QGroundControl* will automatically detect the external magnetometer.
:::

:::tip
You will need to calibrate your compass on first use, and you may need to recalibrate it if the vehicles is ever exposed to a very strong magnetic field, or if it is used in an area with abnormal magnetic characteristics. Indications of a poor compass calibration include multicopter circling during hover, toilet bowling (circling at increasing radius/spiraling-out, usually constant altitude, leading to fly-way), or veering off-path when attempting to fly straight.
:::

## Performing the Calibration

The calibration steps are:

1. Choose a location away from large metal objects or magnetic fields. :::tip Metal is not always obvious! Avoid calibrating on top of an office table (often contain metal bars) or next to a vehicle. Calibration can even be affected if you're standing on a slab of concrete with uneven distribution of re-bar.
:::
2. Start *QGroundControl* and connect the vehicle.
3. Select the **Gear** icon (Vehicle Setup) in the top toolbar and then **Sensors** in the sidebar.
4. Click the **Compass** sensor button.
    
    ![Select Compass calibration PX4](../../assets/qgc/setup/sensor/sensor_compass_select_px4.jpg)
    
:::note
You should already have set the [Autopilot Orientation](../config/flight_controller_orientation.md). If not, you can also set it here.
:::

5. Click **OK** to start the calibration.

6. Place the vehicle in any of the orientations shown in red (incomplete) and hold it still. Once prompted (the orientation-image turns yellow) rotate the vehicle around the specified axis in either/both directions. Once the calibration is complete for the current orientation the associated image on the screen will turn green.
    
    ![Compass calibration steps on PX4](../../assets/qgc/setup/sensor/sensor_compass_calibrate_px4.jpg)

7. Repeat the calibration process for all vehicle orientations.

Once you've calibrated the vehicle in all the positions *QGroundControl* will display *Calibration complete* (all orientation images will be displayed in green and the progress bar will fill completely). You can then proceed to the next sensor.

## Further Information

* [QGroundControl User Guide > Sensors](https://docs.qgroundcontrol.com/en/SetupView/sensors_px4.html#compass)
* [PX4 Setup Video - @2m38s](https://youtu.be/91VGmdSlbo4?t=2m38s) (Youtube)
* [Compass Power Compensation](../advanced_config/compass_power_compensation.md) (Advanced Configuration)