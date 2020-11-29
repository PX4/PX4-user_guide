# 电调（ESC）校准

> **Note** These instructions are only relevant to [PWM ESCs](../peripherals/pwm_escs_and_servo.md).

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
    
    ![ESC Calibration step 1](../../assets/qgc/setup/esc/qgc_esc_calibration.png)

4. 在出现提示时连接电池:
    
    ![ESC Calibration step 2](../../assets/qgc/setup/esc/esc_calibration_step_2.png)
    
    校准将自动开始:
    
    ![ESC Calibration step 3](../../assets/qgc/setup/esc/esc_calibration_step_3.png)

5. 校准完成后, 系统将提示您断开电池的连接。
    
    ![ESC Calibration step 4](../../assets/qgc/setup/esc/esc_calibration_step_4.png)

> **Note** 某些高品质的ESC在出厂时就已经被校准过。 *按理说*，这意味着这些电调可以按照电调技术规格书仅通过设置 [PWM_MIN](../advanced_config/parameter_reference.md#PWM_MIN)，[PWM_MAX](../advanced_config/parameter_reference.md#PWM_MAX)参数来进行配置即可。 实际上，高品质的飞控也存在着不同的输入范围，因此我们推荐再次校准。