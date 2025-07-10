---
canonicalUrl: https://docs.px4.io/main/zh/advanced_config/esc_calibration
---

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
    
    电调校准期间电机不应旋转。 但是如果电调不支持/检测校准序列，它将以最大速度运行电机来响应 PWM 输入。
:::

2. 断开电池并（仅）通过 USB 连接飞行控制器。

3. 打开 * QGroundControl *** 设置 > 电源**界面，然后按 **校准** 按钮。
    
    ![电调校准步骤 1](../../assets/qgc/setup/esc/qgc_esc_calibration.png)

4. 在出现提示时连接电池:
    
    ![电调校准步骤 2](../../assets/qgc/setup/esc/esc_calibration_step_2.png)
    
    校准将自动开始:
    
    ![电调校准步骤 3](../../assets/qgc/setup/esc/esc_calibration_step_3.png)

5. 校准完成后, 系统将提示您断开电池的连接。
    
    ![电调校准步骤 4](../../assets/qgc/setup/esc/esc_calibration_step_4.png)

:::note
高品质的电调带有出厂校准。 In *theory* this means that they can be configured by just setting the [PWM_MAIN_MINn](../advanced_config/parameter_reference.md#PWM_MAIN_MIN)/[PWM_AUX_MINn](../advanced_config/parameter_reference.md#PWM_AUX_MIN) and [PWM_MAIN_MAXn](../advanced_config/parameter_reference.md#PWM_MAIN_MAX)/[PWM_AUX_MAXn](../advanced_config/parameter_reference.md#PWM_AUX_MAX) parameters to the values provided in the ESC technical specification. 实际上，即使在高质量控制器上，输入范围也可能不同，这就是建议校准的原因。
:::