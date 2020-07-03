# Flight Controller/Sensor Orientation

By default the flight controller (and external compass(es), if present) should be placed on the frame top-side up, oriented so that the arrow points towards the front of the vehicle.
If the board or an external compass are mounted in any other orientation then you will need configure this in the firmware.

## Calculating Orientation

ROLL, PITCH and/or YAW offsets of the flight controller are calculated relative to the vehicle around the forward, right, down axes.

The axes to rotate around stay the same from one rotation step to the next one.
So the frame to perform the rotation in stays fixed.
This is also known as *extrinsic rotation*.

<img src="../../images/fc_orientation_1.png" style="width: 600px;"/>

For example, the vehicles shown below have rotations around the z-axis (only) corresponding to: `ROTATION_NONE`, `ROTATION_YAW_90`,`ROTATION_YAW_180`,`ROTATION_YAW_270`.

![Yaw Rotation](../../images/yaw_rotation.png)

## Setting the Orientation

To set the orientations:

1. Start *QGroundControl* and connect the vehicle.
1. Select the **Gear** icon (Vehicle Setup) in the top toolbar and then **Sensors** in the sidebar.
1. Select the **Set Orientations** button.
   <img src="../../images/qgc/setup/sensor_orientation_set_orientations.jpg" style="width: 600px;"/>
1. Select the **AutoPilot Orientation** (as [calculated above](#calculating-orientation)).

   <img src="../../images/qgc/setup/sensor_orientation_selector_values.jpg" style="width: 200px;"/>
1. Select the **External Compass Orientation** in the same way (this option will only be displayed if your vehicle has an external compass).
1. Press **OK**.


## Fine Tuning

You can use [Level Horizon Calibration](../config/level_horizon_calibration.md) to compensate for small miss-alignments in controller orientation and to level the horizon in flight view.

## Further Information

* [Advanced Orientation Tuning](../advanced_config/advanced_flight_controller_orientation_leveling.md) (advanced users only).
* [QGroundControl User Guide > Sensors](https://docs.qgroundcontrol.com/en/SetupView/sensors_px4.html#flight_controller_orientation)
