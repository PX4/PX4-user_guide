---
canonicalUrl: https://docs.px4.io/main/ja/peripherals/dshot
---

# DShot ESCs

DShot is an alternative ESC protocol that has several advantages over [PWM](../peripherals/pwm_escs_and_servo.md) or [OneShot](../peripherals/oneshot.md):

- Reduced latency.
- Increased robustness via a checksum.
- No need for ESC calibration as the protocol uses digital encoding.
- Telemetry feedback is available/supported on some ESCs.
- Can reverse motor spin directions via commands when needed (rather than physically moving wires/re-soldering).
- Other useful commands are supported.

This topic shows how to connect and configure DShot ESCs.

<a id="wiring"></a>

## Wiring/Connections

DShot ESC are wired the same way as [PWM ESCs](pwm_escs_and_servo.md). The only difference is that they can only be connected to the FMU, and usually only to some subset of pins.

:::note
You may want to check the actuator configuration screen to see what pins are available for DShot on your controller before wiring up!
:::

Pixhawk controllers with both an FMU and an IO board usually label them as `AUX` (FMU) and `MAIN` (IO), respectively. These match the `PWM AUX` and `PWM MAIN` output tabs on the actuator configuration screen. For these controllers connect the DShot ESC to the `AUX` port.

Controllers that don't have an IO board usually label the (single) output port as `MAIN`, and this is where you will connect your DShot ESC. If the controller without IO has its own firmware, the actuator assignment will be to the matching `PWM MAIN` outputs. However if the same firmware is used for hardware with/without the IO board, such as for the Pixhawk 4 and Pixhawk 4 Mini, then actuator assignment tab used is the same in both cases: `PWM AUX` (i.e. not matching the port label `MAIN` in the "mini" case).

## Configuration

:::warning
Remove propellers before changing ESC configuration parameters!
:::

Enable DShot for your required outputs in the [Actuator Configuration](../config/actuators.md).

DShot comes with different speed options: *DShot150*, *DShot300*, *DShot600* and *DShot1200*, where the number indicates the speed in kilo-bits/second. You should set the parameter to the highest speed supported by your ESC (according to its datasheet).

Then connect the battery and arm the vehicle. The ESCs should initialize and the motors turn in the correct directions.
- If the motors do not spin in the correct direction (for the [selected airframe](../airframes/airframe_reference.md)) you can reverse them in the UI using the **Set Spin Direction** option (this option appears after you select DShot and assign motors). You can also reverse motors by sending an [ESC Command](#commands).

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

  Retrieving ESC information after the `dshot reverse -m 1` command  without the `dshot save -m 1` command will show:

  ```
  Rotation Direction: reversed
  ```

  after saving it with `dshot save -m 1` command, reversed direction will become new normal direction:

  ```
  Rotation Direction: normal
  ```

  To change direction again new `dshot reverse -m 1` command needs to be sent.

## Telemetry

Some ESCs are capable of sending telemetry back to the flight controller, including:

- temperature
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
