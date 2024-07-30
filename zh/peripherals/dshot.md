# DShot 电调

DShot 是一种更高级的电调协议，相比 [PWM](../peripherals/pwm_escs_and_servo.md) 或 [OneShot](../peripherals/oneshot.md) 具有几个优势：

- 低延迟
- 通过校验提高鲁棒性
- 由于协议使用数字编码，因此无需电调校准
- 很多电调支持数传反馈。
- 可以通过命令反转电机方向（而不是物理调换两根线/重新焊接）。
- 支持其他好用的命令。

本章介绍了如何连接和配置 DShot 电调。

<a id="wiring"></a>

## 接线和连接

DShot 电调与[PWM 电调](pwm_escs_and_servo.md)的接线方式相同。 唯一的区别在于它们只能连接到FMU，通常只能连接到某些引脚的子集。

::: info
在接线之前，您可能需要检查执行器配置屏幕来查看飞控上可用于 DShot 的引脚！
:::

通常带有FMU和IO板的Pixhawk飞控将它们分别标记为`AUX`（连接到FMU）和`MAIN`（连接到IO控制器）。 `PWM AUX` 和 `PWM MAIN` 的输出选项卡在执行器配置屏幕上。 对于这些飞控来说，DShot 电调连接到 `AUX` 端口。

没有IO板的飞控通常将输出端口标记为 `MAIN`， 并且这是您连接 DShot 电调的地方。 如果那些没有IO控制器的飞控有自己的固件，执行器分配将匹配到相应的`PWM MAIN`输出。 然而，如果无论有没有IO板都用的是同一个固件，如Pixhawk 4和 Pixhawk 4Mini, 那么在这种情况下使用的执行器选项是相同的： `PWM AUX` （比如：不匹配端口标签 `MAIN` 在“mini”案例中）。

## 配置

:::warning
更改电调配置参数之前，请先拆下螺旋桨！
:::

在[执行器配置](../config/actuators.md)中为所需要的输出启用 DShot。

DShot 具有不同的速度选项：_DShot150_，_DShot300_，_DShot600_ 和 _DShot1200_，其中的数字表示千比特每秒。 您应该将参数设置为您的电调支持的最高速度（根据其说明书）。

然后连接电池并解锁无人机。 电调应该初始化，电机应该按照正确的方向转动。

- 如果电机未按照正确方向旋转（适用于[所选机架](../airframes/airframe_reference.md)），您可以在UI中使用**设置旋转方向**选项来反转它们（此选项在您选择DShot并分配电机后出现）。 您也可以通过发送[ESC命令](#commands)来反转电机。

<a id="commands"></a>

## 关于电调的指令

可以通过 [MAVLink shell](../debug/mavlink_shell.md) 向电调发送命令。 查看[这里](../modules/modules_driver.md#dshot)以获取完整的参考命令。

其中最重要的是：

- Make a motor connected to to FMU output pin 1 beep (helps with identifying motors)

  ```
  dshot beep1 -m 1
  ```

- 检索电调信息（需要TELE功能，请参见下文）：

  ```
  nsh> dshot esc_info -m 2
  INFO  [dshot] ESC Type: #TEKKO32_4in1#
  INFO  [dshot] MCU Serial Number: xxxxxx-xxxxxx-xxxxxx-xxxxxx
  INFO  [dshot] Firmware version: 32.60
  INFO  [dshot] Rotation Direction: normal
  INFO  [dshot] 3D Mode: off
  INFO  [dshot] Low voltage Limit: off
  INFO  [dshot] Current Limit: off
  INFO  [dshot] LED 0: unsupported
  INFO  [dshot] LED 1: unsupported
  INFO  [dshot] LED 2: unsupported
  INFO  [dshot] LED 3: unsupported
  ```

  - Permanently reverse the spin direction of a motor connected to FMU output pin 1:

  ```
  dshot reverse -m 1
  dshot save -m 1
  ```

  在执行`dshot reverse -m 1`命令后而没有执行`dshot save -m 1`命令会显示电调信息的检索结果。

  ```
  Rotation Direction: reversed
  ```

  使用 `dshot save -m 1` 命令保存后，反向方向将变为新的正常方向：

  ```
  Rotation Direction: normal
  ```

  如果要再次改变方向，需要发送新的 `dshot reverse -m 1` 命令。

## Telemetry

有些电调能够向飞控发送Telemetry数据，包括：

- 温度
- 电压
- 电流
- 累计消耗的电量
- 转速值

这些DShot 电调会有一条额外的连接线。

开启遥测数据功能（仅对于能支持遥测数据的电调）:

1. 把电调上的TELE端口连接到飞控上空的串口的 RX 端。
1. 使用 [DSHOT_TEL_CFG](../advanced_config/parameter_reference.md#DSHOT_TEL_CFG) 命令在该串行端口启用遥测。

重启后，您可以检查TELE数据传输是否正常工作（确保电池已连接），方法如下：

```
dshot esc_info -m 1
```

:::tip
您可能需要配置[MOT_POLE_COUNT](../advanced_config/parameter_reference.md#MOT_POLE_COUNT)以获取正确的转速（RPM值）。
:::

:::tip
并非所有支持DSHOT的电调都支持`[esc_info]`（例如APD 80F3x），就算支持并且开启了TELE功能。 显示的错误是：

```
ERROR [dshot] No data received. If telemetry is setup correctly, try again.
```

查看制造商文档以获取详细信息。
:::
