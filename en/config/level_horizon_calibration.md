# Level Horizon Calibration

You can use *Level Horizon Calibration* to compensate for small miss-alignments in controller orientation and to level the horizon in the QGroundControl flight view (blue on top and green on bottom). Leveling the horizon is highly recommended, and will result in the best flight performance. 

This process can also be repeated if you notice a constant drift during flight.

## Performing the Calibration 

To calibrate the horizon:

1. Configure the [Flight Controller Orientation](../config/flight_controller_orientation.md) (if this has not already been done).
2. Place the vehicle in its level flight orientation on a level surface:
   - For planes this is the position during level flight (planes tend to have their wings slightly pitched up!)
   - For copters this is the hover position.
3. Open the QGroundControl menu: **Settings > Sensors**.
4. Click the **Level Horizon** button. 

   ![Event Horizon Calibration step 1](../../images/event_horizon_calibration_step_1.png)

5. Press **OK** to start the calibration process

   ![Event Horizon Calibration step 2](../../images/event_horizon_calibration_step_2.png)

6. Wait until the calibration process is finished.

   ![Event Horizon Calibration step 3](../../images/event_horizon_calibration_step_3.png)


## Further information

* [Advanced Orientation Tuning](../advanced_config/advanced_flight_controller_orientation_leveling.md) (advanced users only).
