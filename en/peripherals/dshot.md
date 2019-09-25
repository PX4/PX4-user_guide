# DShot ESCs

DShot is an alternative ESC protocol that has several advantages over PWM or OneShot:
- Reduced latency
- Increased robustness via a checksum
- No need for ESC calibration as mechanism uses digital encoding
- Telemetry feedback is available/supported on some ESCs
- Can reverse motor spin directions via commands when needed (rather than physically moving wires/re-soldering).
- Other useful commands are supported.

This topic shows how to connect and configure DShot ESCs.


## Wiring/Connections {#wiring}

DShot ESCs are connected and wired the same way as [PWM ESCs](pwm_escs_and_servo.md), and you can switch between these protocols just by changing software parameters (ESCs automatically detect the selected protocol on startup).

On Pixhawk flight controllers that have both MAIN and AUX ports, DShot can only be used on the MAIN ports if the AUX port is disabled (see configuration below).
This means that if you use DShot ESCs you're restricted to [airframes](../airframes/airframe_reference.md) that don't *require* AUX ports for essential controls (you can use airframes where an AUX port is used for an optional output).


## Configuration {#configuration}

> **Warning** Remove propellers before changing ESC configuration parameters!

Enable DShot with the [DSHOT_CONFIG](../advanced_config/parameter_reference.md#DSHOT_CONFIG) parameter (if the parameter does not exist, the board does not support DShot).

DShot comes with different speed options: *DShot150*, *DShot300*, *DShot600* and *DShot1200*, where the number indicates the speed in bits per second.
You should set the parameter to the highest speed supported by your ESC (according to its datasheet) and then reboot the vehicle.

Then connect the battery and arm the vehicle.
The ESCs should initialize and the motors turn in the correct directions.
- If the motors do not spin in the correct direction (for the [selected airframe](../airframes/airframe_reference.md)), reverse them by sending an [ESC Command](#commands).
- Adjust [DSHOT_MIN](../advanced_config/parameter_reference.md#DSHOT_MIN) so that the motors spin at lowest throttle (but the vehicle does not take off).

On boards that have both MAIN and AUX ports, set [SYS_USE_IO=0](../advanced_config/parameter_reference.md#SYS_USE_IO).

> **Note** DShot is only supported on FMU pins, which map to the AUX ports on boards that have both MAIN and AUX.
  Setting `SYS_USE_IO=0` disables the IO board, and remaps the FMU pins to the MAIN port.
  This is needed because most [airframes](../airframes/airframe_reference.md) specify that ESCs/motors are connected to MAIN pins. 


## ESC Commands {#commands}

Commands can be sent to the ESC via the [MAVLink shell](https://dev.px4.io/master/en/debug/system_console.html#mavlink_shell).
See [here](https://dev.px4.io/master/en/middleware/modules_driver.html#dshot) for a full reference of the supported commands.

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
- temperature
- voltage
- current
- accumulated current consumption
- RPM values

These Dshot ESCs will have an additional telemetry wire.

To enable this feature (on ESCs that support it):
1. Join all the telemetry wires from all the ESCs together, and then connect them to one of the RX pins on an unused flight controller serial port.
1. Enable telemetry on that serial port using [DSHOT_TEL_CFG](../advanced_config/parameter_reference.md#DSHOT_TEL_CFG).

After a reboot you can check if telemetry is working (make sure the battery is connected) using:
```
dshot esc_info -m 1
```


> **Tip** You may have to configure [MOT_POLE_COUNT](../advanced_config/parameter_reference.md#MOT_POLE_COUNT) to get the correct RPM values.
