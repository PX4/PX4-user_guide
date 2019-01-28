# ESC Calibration

> **Note** These instructions are only relevant to ESCs that use a PWM input.

Electronic Speed Controllers (ESCs) regulate motor speed (and direction) based on the PWM input value from the flight controller (FC). The range of inputs to which an ESC will respond is configurable, and the default range can differ even between ESCs of the same model.

This calibration updates all the ESCs with the maximum and minimum PWM input values that will be supplied by the flight controller. Subsequently all the ESCs/motors will respond to flight controller input in the same way (across the whole input range).

Calibration is recommended for all ESCs, and in particular for low cost models.

## Preconditions

The system must include a power module (PX4 uses the measured voltage to determine whether or not a battery is connected).

## Steps

To calibrate the ESCs:

1. Remove the propellers.
    
    > **Warning** Never attempt ESC calibration with props on.
    > 
    > The motors should not spin during ESC calibration. However if an ESC doesn't properly support/detect the calibration sequence then it will respond to the PWM input by running the motor at maximum speed.

2. Disconnect the battery and connect the flight controller via USB (only).

3. Open the *QGroundControl* **Settings > Power**, then press the **Calibrate** button.
    
    ![ESC Calibration step 1](../../images/qgc_esc_calibration.png)

4. Connect the battery when prompted:
    
    ![ESC Calibration step 2](../../images/esc_calibration_step_2.png)
    
    The calibration will begin automatically:
    
    ![ESC Calibration step 3](../../images/esc_calibration_step_3.png)

5. Once the calibration complete you will be prompted to disconnect the battery.
    
    ![ESC Calibration step 4](../../images/esc_calibration_step_4.png)

> **Note** High-quality controllers come with a factory calibration. In *theory* this means that they can be configured by just setting the [PWM_MIN](../advanced_config/parameter_reference.md#PWM_MIN) and [PWM_MAX](../advanced_config/parameter_reference.md#PWM_MAX) parameters to the values provided in the ESC technical specification. In practice the input range may differ even on high quality controllers, which is why calibration is recommended.