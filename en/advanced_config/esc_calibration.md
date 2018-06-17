# ESC Calibration

Electronic Speed Controllers (ESC) regulate the speed (and direction) of motors based on a PWM input from the flight controller (FC). 

All ESCs in a multicopter must be configured to respond to flight controller input in the same way (across the whole input range). 
High-quality controllers come with a factory calibration and can be just configured using the [PWM_MIN](../advanced_config/parameter_reference.md#PWM_MIN) and [PWM_MAX](../advanced_config/parameter_reference.md#PWM_MAX) parameters provided in the ESC technical specification.

Many low-cost models require calibration. This can/should be performed if you are unsure whether it is required!

> **Warning** Never attempt ESC calibration with props on. Before you begin just remove them.

To calibrate the ESCs:

1. Disconnect the battery and connect the flight controller via USB (only). 
1. Open the *QGroundControl* **Settings > Power**, then press the **Calibrate** button.

   ![ESC Calibration step 1](../../images/qgc_esc_calibration.png)

1. Connect the battery when prompted:

   ![ESC Calibration step 2](../../images/esc_calibration_step_2.png)

   The calibration will begin automatically:

   ![ESC Calibration step 3](../../images/esc_calibration_step_3.png)

1. Once the calibration complete you will be prompted to disconnect the battery.

   ![ESC Calibration step 4](../../images/esc_calibration_step_4.png)

