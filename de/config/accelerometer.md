# Accelerometer

You will need to calibrate your accelerometer on first use or if the flight controller orientation is changed. Otherwise you should not need to recalibrate (except perhaps in winter, if you have a flight controller that was not [thermally calibrated](../advanced_config/sensor_thermal_calibration.md) in the factory).

> **Note** Poor accelerometer calibration is generally caught by preflight checks and arming-denied messages (QGC warnings typically refer to "high accelerometer bias" and "consistency check failures").

*QGroundControl* will guide you to place and hold your vehicle in a number of orientations (you will be prompted when to move between positions).

> **Tip** This is similar to [compass calibration](../config/compass.md) except that you hold the vehicle still (rather than rotate it) in each orientation.

<span></span>

> **Note** The calibration uses a least squares 'fit' algorithm that doesn't reaquire you to have "perfect" 90 degree orientations. Provided each axis is pointed mostly up and down at some time in the calibration sequence, and the vehicle is held stationary, the precise orientation doesn't matter.

## Performing the Calibration

The calibration steps are:

1. Start *QGroundControl* and connect the vehicle.
2. Select the **Gear** icon (Vehicle Setup) in the top toolbar and then **Sensors** in the sidebar.
3. Click the **Accelerometer** sensor button.
    
    ![Accelerometer calibration](../../assets/qgc/setup/sensor/accelerometer.jpg)
    
    > **Note** You should already have set the [Autopilot Orientation](../config/flight_controller_orientation.md). If not, you can also set it here.

4. Click **OK** to start the calibration.

5. Position the vehicle as guided by the *images* on the screen. Once prompted (the orientation-image turns yellow) hold the vehicle still. Once the calibration is complete for the current orientation the associated image on the screen will turn green.
    
    ![Accelerometer calibration](../../assets/qgc/setup/sensor/accelerometer_positions_px4.jpg)

6. Repeat the calibration process for all vehicle orientations.

Once you've calibrated the vehicle in all the positions *QGroundControl* will display *Calibration complete* (all orientation images will be displayed in green and the progress bar will fill completely). You can then proceed to the next sensor.

## Further Information

* [QGroundControl User Guide > Sensors](https://docs.qgroundcontrol.com/en/SetupView/sensors_px4.html#accelerometer)
* [PX4 Setup Video - @1m46s](https://youtu.be/91VGmdSlbo4?t=1m46s) (Youtube)