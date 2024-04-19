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

没有IO板的飞控通常将输出端口标记为 `MAIN`， 并且这是您连接 DShot 电调的地方。 如果那些没有IO控制器的飞控有自己的固件，执行器分配将匹配到相应的`PWM MAIN`输出。 However if the same firmware is used for hardware with/without the IO board, such as for the Pixhawk 4 and Pixhawk 4 Mini, then actuator assignment tab used is the same in both cases: `PWM AUX` (i.e. not matching the port label `MAIN` in the "mini" case).

## 配置

:::warning
更改电调配置参数之前，请先拆下螺旋桨！
:::

在[执行器配置](../config/actuators.md)中为所需要的输出启用 DShot。

DShot 具有不同的速度选项：_DShot150_，_DShot300_，_DShot600_ 和 _DShot1200_，其中的数字表示千比特每秒。 您应该将参数设置为您的电调支持的最高速度（根据其说明书）。

然后连接电池并解锁无人机。 电调应该初始化，电机应该按照正确的方向转动。

- 如果电机未按照正确方向旋转（适用于[所选机架](../airframes/airframe_reference.md)），您可以在UI中使用**设置旋转方向**选项来反转它们（此选项在您选择DShot并分配电机后出现）。 您也可以通过发送[ESC命令](#commands)来反转电机。

<a id="commands"></a>

## ESC Commands

Commands can be sent to the ESC via the [MAVLink shell](../debug/mavlink_shell.md). See [here](../modules/modules_driver.md#dshot) for a full reference of the supported commands.

The most important ones are:

- Make the first motor beep (helps with identifying motors):

  ```
  dshot beep1 -m 1
  ```

- Retrieve ESC information (requires telemetry, see below):

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

  - Permanently reverse the spin direction of the first motor:

  ```
  dshot reverse -m 1
  dshot save -m 1
  ```

  Retrieving ESC information after the `dshot reverse -m 1` command without the `dshot save -m 1` command will show:

  ```
  Rotation Direction: reversed
  ```

  after saving it with `dshot save -m 1` command, reversed direction will become new normal direction:

  ```
  Rotation Direction: normal
  ```

  To change direction again new `dshot reverse -m 1` command needs to be sent.

## Telemetry

有些电调能够向飞控发送遥测数据，包括：

- 温度
- 电压
- current
- accumulated current consumption
- RPM values

These DShot ESCs will have an additional telemetry wire.

To enable this feature (on ESCs that support it):

1. Join all the telemetry wires from all the ESCs together, and then connect them to one of the RX pins on an unused flight controller serial port.
1. Enable telemetry on that serial port using [DSHOT_TEL_CFG](../advanced_config/parameter_reference.md#DSHOT_TEL_CFG).

After a reboot you can check if telemetry is working (make sure the battery is connected) using:

```
dshot esc_info -m 1
```

:::tip
You may have to configure [MOT_POLE_COUNT](../advanced_config/parameter_reference.md#MOT_POLE_COUNT) to get the correct RPM values.
:::

:::tip
Not all DSHOT-capable ESCs support `[esc_info]`(e.g. APD 80F3x), even when telemetry is supported and enabled. The resulting error is:

```
ERROR [dshot] No data received. If telemetry is setup correctly, try again.
```

Check manufacturer documentation for confirmation/details.
:::
