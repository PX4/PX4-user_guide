# 电调（ESC）校准

:::note
这些说明仅与 [PWM 电调相关](../peripherals/pwm_escs_and_servo.md)。
:::

电调根据飞控的 PWM 输入值 来调节电机速度（和方向）。 电调响应的输入范围是可配置的，甚至同一模型下的不同电调之间的默认范围也是不同的。

此校准将更新所有 ESCs, 其最大和最小 PWM 输入值将由飞控提供。 随后，所有电调/电机机都将以同样方式（跨越整个输入范围）对飞控输入作出反应。

建议对所有电调进行校准，特别是低成本模型机。

## 前置条件

系统必须包括一个电源模块（PX4 使用测量的电压来确定电池是否连接）。

## 步骤

校准电调：

1. 卸下螺旋桨。
    
:::warning
切勿带桨进行电调校准。
    
    电调校准期间电机不应旋转。 However if an ESC doesn't properly support/detect the calibration sequence then it will respond to the PWM input by running the motor at maximum speed.
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