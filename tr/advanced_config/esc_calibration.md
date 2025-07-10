---
canonicalUrl: https://docs.px4.io/main/tr/advanced_config/esc_calibration
---

# ESC Calibration

:::note
These instructions are only relevant to [PWM ESCs](../peripherals/pwm_escs_and_servo.md) and [OneShot ESCs](../peripherals/oneshot.md) ([DShot](../peripherals/dshot.md) and [UAVCAN](../uavcan/escs.md) ESCs do not require calibration). :::

Electronic Speed Controllers (ESCs) regulate motor speed (and direction) based on the PWM input value from the flight controller (FC). The range of inputs to which an ESC will respond is configurable, and the default range can differ even between ESCs of the same model.

This calibration updates all the ESCs with the maximum and minimum PWM input values that will be supplied by the flight controller. Subsequently all the ESCs/motors will respond to flight controller input in the same way (across the whole input range).

Calibration is recommended for all ESCs, and in particular for low cost models.

## Preconditions

The system must include a power module (PX4 uses the measured voltage to determine whether or not a battery is connected).

## Steps

To calibrate the ESCs:

1. Remove the propellers.

:::warning
Never attempt ESC calibration with props on.

   The motors should not spin during ESC calibration. However if an ESC doesn't properly support/detect the calibration sequence then it will respond to the PWM input by running the motor at maximum speed. :::
1. Disconnect the battery and connect the flight controller via USB (only).
1. Open the *QGroundControl* **Settings > Power**, then press the **Calibrate** button.

   ![ESC Calibration step 1](../../assets/qgc/setup/esc/qgc_esc_calibration.png)

1. Connect the battery when prompted:

   ![ESC Calibration step 2](../../assets/qgc/setup/esc/esc_calibration_step_2.png)

   The calibration will begin automatically:

   ![ESC Calibration step 3](../../assets/qgc/setup/esc/esc_calibration_step_3.png)

1. Once the calibration complete you will be prompted to disconnect the battery.

   ![ESC Calibration step 4](../../assets/qgc/setup/esc/esc_calibration_step_4.png)


:::note
High-quality controllers come with a factory calibration. In *theory* this means that they can be configured by just setting the [PWM_MAIN_MINn](../advanced_config/parameter_reference.md#PWM_MAIN_MIN)/[PWM_AUX_MINn](../advanced_config/parameter_reference.md#PWM_AUX_MIN) and [PWM_MAIN_MAXn](../advanced_config/parameter_reference.md#PWM_MAIN_MAX)/[PWM_AUX_MAXn](../advanced_config/parameter_reference.md#PWM_AUX_MAX) parameters to the values provided in the ESC technical specification. In practice the input range may differ even on high quality controllers, which is why calibration is recommended.
:::