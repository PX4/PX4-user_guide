# 电调（ESC）校准

:::note
此处指定仅限于[PWM ESCs](../peripherals/pwm_escs_and_servo.md) 和 [OneShot ESCs](../peripherals/oneshot.md). [DShot](../peripherals/dshot.md) and [CAN](../can/README.md) ESCs ([DroneCAN](../dronecan/escs.md)/Cyphal) 不需要这种校准。
:::

电子速度控制器(ESC)根据飞行控制器的输入指令（FC）调节电机的速度（和方向）。 电调响应的输入范围是可配置的，甚至同一型号的不同电调之间的默认范围也是不同的。

此校准将使用来自飞行控制器的固定最大值 (2000us) 和最小值 (1000us) PWM 输入更新所有ESC。 因此，载具上的所有ESC/电机都将以同样的方式在整个输入范围内响应飞行控制器的输入。

建议使用此工具校准支持它的所有 PWM/OneShot ESC。

:::note
校准对于低成本的 ESC具有特别重要的意义，因为它们通常在响应输入时会有很多变化。

然而，也建议为高质量的控制员提供这种校准。 即使这些都是工厂校准的，而且都应以同样的方式作出反应，但实际上输入范围可能有所不同。 例如，如果控制器在离开工厂后被手动校准，它可能不再以同样的方式动作。
:::

:::警告 如果您想使用不支持此校准的 ESC ，则必须是工厂进行校准过的，开箱后不变的产品。 应该使用[Actuator Testing](../config/actuators.md#actuator-testing)进行验证。 跳转到 [促动器配置步骤 (7)](#actuatorconfig_step) (仍然很重要)。
:::

OneShot ESC应配置为 [在校准前使用 OneShot](../peripherals/oneshot.md#px4-configuration)。 您应该在更换ESC后校准，即使您先前已校准。

## 前置条件

校准序列要求您能够保持飞行控制器的供电，同时手动对ESC进行上电循环。

如果使用 Pixhawk 飞行控制器，推荐这样做的方式是通过USB单独为飞行控制器提供电力。 并在需要时连接/断开ESC的电池供电。 无法通过 USB 为自动飞行供电的飞行控制系统将需要 [不同的](#problem_power_module)步骤。

如果电池通过电源模块连接，校准程序可以检测电池连接并用它来驱动校准序列。 如果无法检测到电池电力，则根据超时执行校准顺序。

## 步骤

校准电调：

1. 卸下螺旋桨。

   :::警告 切勿带桨进行电调校准。

   电调校准期间电机不应旋转。 但是，如果校准是在ESC 已经供电后开始的，或者如果ESC 对校准序列支持/检测不恰当， 它将响应PWM的输入，以最大速度运行电机。
:::

1. 在 载具的[驱动器配置](../config/actuators.md)中，映射需要校准的ESC为电机。 只有映射的驱动器才能获得输出，并且只有被映射为电机的ESC将被校准。

1. 拔下电池，断开ESC电源。 飞行控制器必须保持供电，例如将USB连接到地面站。

1. 打开 _ QGroundControl _** 设置 > 电源**界面，然后按 **校准** 按钮。

   ![电调校准步骤 1](../../assets/qgc/setup/esc/qgc_esc_calibration.png)

1. 启动校准序列后，在没有错误的情况下，直接给 ESC供电 (您应该被提示):

   ![电调校准步骤 2](../../assets/qgc/setup/esc/esc_calibration_step_2.png)

   校准将自动开始:

   ![电调校准步骤 3](../../assets/qgc/setup/esc/esc_calibration_step_3.png)

1. 在校准过程中，您应该听到来自ESC的特定模型不同的嘀音，它表明校准的各个步骤。

   校准完成后会提示您。<a id="actuatorconfig_step"></a>
   ![电调校准步骤 4](../../assets/qgc/setup/esc/esc_calibration_step_4.png)

1. 返回到 [驱动器配置](../config/actuators.md) 部分。

   在ESC 校准后，所有具有相同(重新)校准的 ESC的电机对同样的输入应以同样的方式动作。 驱动器配置中默认的 PWM 输出设置现在应该能开箱即用。

   你需要确认电机确实正常工作。 由于默认配置值已经设置为保守的设置，您可能也希望调整它们以适用于您的特定的 ESC。

:::note
下面的步骤类似于 [A驱动器配置 > 电机配置](../config/actuators.md#motor-configuration)中所描述
:::

   验证以下值：

   - 电机的最小值 (默认： `1100us`) 应该使电机缓慢且可靠地转动， 并在停止后可靠地转速增高。

     使能滑条后，可以确认 [驱动器测试](../config/actuators.md#actuator-testing)中电机以最低速度旋转(仍然没有安装桨叶)，然后将电机的测试输出滑块从底部移动到第一个吸附位置。 当你将滑块从解锁到最小值时，正确的值应该使电机立即和可靠地旋转。

     要找到“最佳”最小值，请将滑块移动到底部(禁用)。 然后少量(例如1025us，1050us)增加PWM输出的 `解锁` 设置，直到电机开始可靠地旋转之前（稍高一点比稍低一点更合适）。 将此值输入所有电机PWM输出的 `最小` 设置。 并还原 `禁用` 输出到 `1100us`

   - 电机的最大值 (默认： `1900us`)应选择继续增加这个数值，也不会使发动机旋转速度更快的值。

     You can confirm that the motor spins quickly at the maximum setting in [Actuator Testing](../config/actuators.md#actuator-testing), by moving the associated test output slider to the top position.

     To find the "optimal" maximum value, first move the slider to the bottom (disarmed). Then increase the PWM output's `disarmed` setting to near the default maximum (`1900`) - the motors should spin up. Listen to the tone of the motor as you increase the PWM maximum value for the output in increments (e.g. 1925us, 1950us, etc). The optimal value is found at the point when the sound of the motors does not change as you increase the value of the output. Enter this value into the `maximum` setting for all the motor PWM outputs, and restore the `disarmed` output to `1100us`.

   - The disarmed value for a motor (default: `1000us`) should make the motor stop and stay stopped.

     You can confirm this in [Actuator Testing](../config/actuators.md#actuator-testing) by moving the test output slider to the snap position at the bottom of the slider and observing that the motor does not spin.

     If the ESC spins with the default value of 1000us then the ESC is not properly calibrated. If using an ESC that can't be calibrated, you should reduce the PWM output value for the output to below where the motor does not spin anymore (such as 950us or 900us).

   :::note
VTOL and fixed-wing motors do not need any special PWM configuration.
With the default PWM configuration they will automatically stop during flight when commanded by the autopilot.
:::

## Troubleshooting

1. Calibration can state that it has succeeded even when it has failed.

   This happens if you do not power the ESC at the right time, or the ESCs don't support calibration. This occurs because PX4 has no feedback from the ESC to know whether or not calibration was successful. You have to rely on interpreting the beeps during the calibration and subsequent motor tests to know for sure that the calibration worked.

   <a id="problem_power_module"></a>

1. Calibration cannot be started if you have a power module configured and connected (for safety reasons).

   Unplug power to the ESCs first. If you're blocked because a power module is necessary to keep your flight controller alive, but you can (un)power the ESCs separately, you can temporarily disable the detection of the power module just for the ESC calibration using the parameters [BATn_SOURCE](../advanced_config/parameter_reference.md#BAT1_SOURCE). Once the power module that's powering the autopilot is not detected as battery anymore a timing based calibration is possible.

1. PX4 will abort calibration (for safety reasons) if the system detects an increase in current consumption immediately after initiating calibration. This requires a power module.
