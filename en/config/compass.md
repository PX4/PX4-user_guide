# Compass Calibration

*QGroundControl* will guide you to position the vehicle in a number of set orientations and rotate the vehicle about the specified axis. 

## Performing the Calibration 

The calibration steps are:

1. Start *QGroundControl* and connect the vehicle.
1. Select the **Gear** icon (Vehicle Setup) in the top toolbar and then **Sensors** in the sidebar.
1. Click the **Compass** sensor button.

   ![Select Compass calibration PX4](../../images/qgc/setup/sensor_compass_select_px4.jpg)
   
   > **Note** You should already have set the [Autopilot Orientation](../config/flight_controller_orientation.md). If not, you can also set it here.

1. Click **OK** to start the calibration. 
1. Place the vehicle in any of the orientations shown in red (incomplete) and hold it still. Once prompted (the orientation-image turns yellow) rotate the vehicle around the specified axis in either/both directions. Once the calibration is complete for the current orientation the associated image on the screen will turn green.
 
   ![Compass calibration steps on PX4](../../images/qgc/setup/sensor_compass_calibrate_px4.jpg)
   
1. Repeat the calibration process for all vehicle orientations.
   
Once you've calibrated the vehicle in all the positions *QGroundControl* will display *Calibration complete* (all orientation images will be displayed in green and the progress bar will fill completely). You can then proceed to the next sensor. 


## Further Information

* [QGroundControl User Guide > Sensors](https://docs.qgroundcontrol.com/en/SetupView/Sensors.html#px4-compass-calibration)
