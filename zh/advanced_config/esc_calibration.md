# 电调（ESC）校准

:::note
These instructions are only relevant to [PWM ESCs](../peripherals/pwm_escs_and_servo.md).
:::

Electronic Speed Controllers (ESCs) regulate motor speed (and direction) based on the PWM input value from the flight controller (FC). The range of inputs to which an ESC will respond is configurable, and the default range can differ even between ESCs of the same model.

This calibration updates all the ESCs with the maximum and minimum PWM input values that will be supplied by the flight controller. Subsequently all the ESCs/motors will respond to flight controller input in the same way (across the whole input range).

Calibration is recommended for all ESCs, and in particular for low cost models.

## 操作前提

The system must include a power module (PX4 uses the measured voltage to determine whether or not a battery is connected).

## 步骤

To calibrate the ESCs:

1. 卸下螺旋桨。
    
:::warning
Never attempt ESC calibration with props on.
    
    The motors should not spin during ESC calibration. However if an ESC doesn't properly support/detect the calibration sequence then it will respond to the PWM input by running the motor at maximum speed.
:::

2. 断开电池并（仅）通过 USB 连接飞行控制器。

3. 打开 * QGroundControl *** 设置 > 电源**界面，然后按 **校准** 按钮。
    
    ![ESC校准步骤1](../../assets/qgc/setup/esc/qgc_esc_calibration.png)

4. 在出现提示时连接电池:
    
    ![ESC校准步骤2](../../assets/qgc/setup/esc/esc_calibration_step_2.png)
    
    校准将自动开始:
    
    ![ESC校准步骤3](../../assets/qgc/setup/esc/esc_calibration_step_3.png)

5. 校准完成后, 系统将提示您断开电池的连接。
    
    ![ESC校准步骤4](../../assets/qgc/setup/esc/esc_calibration_step_4.png)

:::note
High-quality controllers come with a factory calibration. In *theory* this means that they can be configured by just setting the [PWM_MIN](../advanced_config/parameter_reference.md#PWM_MIN) and [PWM_MAX](../advanced_config/parameter_reference.md#PWM_MAX) parameters to the values provided in the ESC technical specification. In practice the input range may differ even on high quality controllers, which is why calibration is recommended.
:::