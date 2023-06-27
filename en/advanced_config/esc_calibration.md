# ESC Calibration

:::note
These instructions are only relevant to [PWM ESCs](../peripherals/pwm_escs_and_servo.md) and [OneShot ESCs](../peripherals/oneshot.md).
[DShot](../peripherals/dshot.md) and [CAN](../can/README.md) ESCs ([DroneCAN](../dronecan/escs.md)/Cyphal) do not require this kind of calibration.
:::

Electronic Speed Controllers (ESCs) regulate motor speed (and direction) based on the PWM input value from the flight controller (FC).
The range of inputs to which an ESC will respond is configurable, and the default range can differ even between ESCs of the same model.

This calibration updates all the ESCs with a fixed maximum (2000us) and minimum (1000us) PWM input from the flight controller.
Subsequently all the ESCs/motors will respond to flight controller input in the same way across the whole input range.

Calibration is recommended for all PWM/OneShot ESCs that support it, and in particular for low cost models.

:::note
High-quality controllers come with a factory calibration and should all respond the same way.
In practice the input range may differ even on high quality controllers because they may be have been manually recalibrated after leaving the factory, and that might not have been done correctly. Following manual calibration they might not respond in the same way as they did after factory calibration.

Using this calibration tool is recommended, as it ensures that all ESCs behave exactly the same way.
:::

:::note
Some ESCs do not support such a calibration. They must come factory calibrated and should respond consistently out of the box.
This has to be verified using [Actuator Testing](../config/actuators.md#actuator-testing). Jump to step 7 which is still important.
:::

OneShot ESCs should be [configured to use OneShot](../peripherals/oneshot.md#px4-configuration) before calibration (you should calibrate the ESCs after switching, even if you have previously calibrated).


## Preconditions

You must be able to (un)power ESCs and flight controller independently.
If the flight controller is powered through USB and there is a power module the procedure can detect battery connection.
If battery power can't be detected e.g. because there's no power module then the calibration sequence is still performed based on timeouts.


## Steps

To calibrate the ESCs:

1. Remove the propellers.

   :::warning
   Never attempt ESC calibration with propellers on!

   The motors should not spin during ESC calibration.
   However if calibration starts when the ESC is powered already, or if the ESC doesn't properly support/detect the calibration sequence, then it will respond to the PWM input by running the motor at maximum speed.

   :::
1. Map the ESCs you're calibrating as motors in the vehicle's [Actuator Configuration](../config/actuators.md).
   Only mapped actuators get an output, and hence only ESCs mapped as motors will be calibrated.

1. Unpower the ESCs by unplugging the battery.
   The flight controller should ideally still be powered via USB, and remain connected to the ground station.

1. Open the *QGroundControl* **Settings > Power**, then press the **Calibrate** button.

   ![ESC Calibration step 1](../../assets/qgc/setup/esc/qgc_esc_calibration.png)

1. After successfully starting the calibration immediately power the ESCs:

   ![ESC Calibration step 2](../../assets/qgc/setup/esc/esc_calibration_step_2.png)

   The calibration will begin automatically:

   ![ESC Calibration step 3](../../assets/qgc/setup/esc/esc_calibration_step_3.png)

1. During the calibration you should hear model specific beeping from the ESC, which indicates the individual steps of the calibration.

   You will be prompted when the calibration completes. 


   ![ESC Calibration step 4](../../assets/qgc/setup/esc/esc_calibration_step_4.png)

1. Go back to the [Actuator Configuration](../config/actuators.md).
   All motors with the same (re)calibrated ESCs should behave the same and work with the same configuration.
   Verify the following things:
   
   - The minimum value for a motor (default: 1100us, parameters: [PWM_MAIN_MINn](../advanced_config/parameter_reference.md#PWM_MAIN_MIN1)/[PWM_AUX_MINn](../advanced_config/parameter_reference.md#PWM_AUX_MIN1)) should make the motor spin slowly but reliably and also spin up reliably after it was stopped.
     Use a bit of margin here to make sure it doesn't stop in air when it shouldn't.
     To find the right value you can (still without propellers) test by changing the disarmed value e.g. to 1100us and 1050us and 1025us which makes the motor spin immediately and when you found the right value reset the disarmed value.
     After setting the desired minimum value you can test it using [Actuator Testing](../config/actuators.md#actuator-testing) by moving the test output slider just above the initial bump.
   - The maximum value for a motor (default: 1900us, parameters: [PWM_MAIN_MAXn](../advanced_config/parameter_reference.md#PWM_MAIN_MAX1)/[PWM_AUX_MAXn](../advanced_config/parameter_reference.md#PWM_AUX_MAX1)) should be chosen such that if the value is further increased from there the motor doesn't actually spin faster anymore.
     This can again be done by changing the disarmed value e.g. to 1900us and 1950us and 1975us and observing e.g. audibly if the motor is still going faster.
   - The disarmed value for a motor (default: 1000us, parameters: [PWM_MAIN_DISn](../advanced_config/parameter_reference.md#PWM_MAIN_DIS1)/[PWM_AUX_DISn](../advanced_config/parameter_reference.md#PWM_AUX_DIS1)) should make the motor stop and stay stopped.
     When calibrated properly this value should be able to stay 1000us.
     If the ESC was previously mis-calibrated then the motor might already spin with 1000us.


   :::note
   VTOL and fixed-wing motors do not need any special PWM configuration.
   They will automatically stop during flight when commanded by the autopilot with the default PWM configuration.

   :::

## Troubleshooting

Possible problems:

1. If you do not plug any ESC at the right time or the ESCs don't support calibration you'll still get the message that the calibration successfully completed because the system cannot possibly know if it actually worked.
1. If you have a power module configured and connected the system will disallow starting the calibration for safety reasons.
   Unplug power to the ESCs first. If you're blocked because a power module is necessary to keep your flight controller alive but can (un)power the ESCs separately make sure the power module is disabled in PX4 just for the ESC calibration e.g. by [PWM_AUX_MINn](../advanced_config/parameter_reference.md#PWM_AUX_MIN1).
1. If there is a power module and the system detects an increase in current consumption directly after successfully initiating calibration it will be aborted for safety reasons.

