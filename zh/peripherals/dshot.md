---
canonicalUrl: https://docs.px4.io/main/zh/peripherals/dshot
---

# DShot ESCs

DShot is an alternative ESC protocol that has several advantages over PWM or OneShot:
- Reduced latency.
- Increased robustness via a checksum.
- No need for ESC calibration as the protocol uses digital encoding.
- Telemetry feedback is available/supported on some ESCs.
- Can reverse motor spin directions via commands when needed (rather than physically moving wires/re-soldering).
- Other useful commands are supported.

This topic shows how to connect and configure DShot ESCs.

<span id="wiring"></span>
## Wiring/Connections

DShot ESCs are connected and wired the same way as [PWM ESCs](pwm_escs_and_servo.md), and you can switch between these protocols just by changing software parameters (ESCs automatically detect the selected protocol on startup).

If using a Pixhawk flight controller that only has a MAIN port, connect the pins according to the [airframe reference](../airframes/airframe_reference.md) for your vehicle.

If using a Pixhawk that has ports labeled AUX and MAIN, set [SYS_USE_IO=0](../advanced_config/parameter_reference.md#SYS_USE_IO) and connect your ESCs to the AUX-labeled outputs *as though they were labeled MAIN*.

:::note
A Pixhawk flight controller that has both FMU and IO will label these ports as AUX and MAIN respectively. DShot can only be used on the FMU ports (labeled AUX), which is a problem because ESC/motor outputs are typically assigned to the MAIN port in the [airframe reference](../airframes/airframe_reference.md).

To use DShot you therefore normally set `SYS_USE_IO=0` (which makes the ports labeled AUX behave *as though* they were the ports labeled MAIN), and connect your ESCs to the corresponding AUX-labeled outputs. Any outputs that would normally be assigned to AUX ports in the [airframe reference](../airframes/airframe_reference.md) are no longer available.

Developers might alternatively modify the [airframe AUX mixer](../dev_airframes/adding_a_new_frame.md#mixer-file) so that the multirotor outputs are on the AUX port rather than MAIN.
:::

:::note FMUv5-based boards (e.g. Pixhawk 4 or CUAV Pixhawk V5+) support DShot only on the first four FMU pins due to hardware conflicts. The other pins cannot be used as motor/servo outputs.
:::

:::tip
You can't mix DShot ESCs/servos and PWM ESCs/servos on the FMU (DShot is enabled/disabled for *all* FMU pins on the port).
:::

<span id="configuration"></span>
## 配置

:::warning
Remove propellers before changing ESC configuration parameters!
:::

Enable DShot with the [DSHOT_CONFIG](../advanced_config/parameter_reference.md#DSHOT_CONFIG) parameter (if the parameter does not exist, the board does not support DShot).

DShot comes with different speed options: *DShot150*, *DShot300*, *DShot600* and *DShot1200*, where the number indicates the speed in kilo-bits/second. You should set the parameter to the highest speed supported by your ESC (according to its datasheet) and then reboot the vehicle.

Then connect the battery and arm the vehicle. The ESCs should initialize and the motors turn in the correct directions.
- If the motors do not spin in the correct direction (for the [selected airframe](../airframes/airframe_reference.md)), reverse them by sending an [ESC Command](#commands).
- Adjust [DSHOT_MIN](../advanced_config/parameter_reference.md#DSHOT_MIN) so that the motors spin at lowest throttle (but the vehicle does not take off).

<span id="commands"></span>
## ESC Commands

Commands can be sent to the ESC via the [MAVLink shell](../debug/mavlink_shell.md). See [here](../modules/modules_driver.md#dshot) for a full reference of the supported commands.

The most important ones are:
- Make the first motor beep (helps with identifying motors):
  ```
  dshot beep1 -m 1
  ```
- Permanently reverse the spin direction of the first motor:
  ```
  dshot reverse -m 1
  dshot save -m 1
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

## Telemetry

Some ESCs are capable of sending telemetry back to the flight controller, including:
- 温度
- voltage
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
