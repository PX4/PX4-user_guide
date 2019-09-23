# DShot

DShot is an alternative ESC protocol to traditional PWM or OneShot.
It has several advantages compared to those:
- Reduced latency
- Checksum (increased robustness)
- Digital encoding (no need for ESC calibrations)
- Possibility to get feedback (telemetry)
- Sending commands (such as reversing the motor spin direction)

ESC's are connected and wired the same way as for [PWM Outputs](pwm_escs_and_servo.md).
It is possible to switch between both protocols by changing software parameters only.
ESC's automatically detect the protocol on startup.

## Configuration
DShot comes with different speed options: *DShot150*, *DShot300*, *DShot600* and *DShot1200*.
It defines the speed in number of bits per second.
Select the highest speed supported by the ESC, which can be found in the datasheet.

> **Warning** As usual: change ESC configuration parameters without props mounted.

Enable DShot with the [DSHOT_CONFIG](../advanced_config/parameter_reference.md#DSHOT_CONFIG) parameter by selecting the appropriate speed and reboot the vehicle.

> **Note** If the parameter does not exist, the board does not support DShot.

<span></span>

> **Tip** On boards with an IO, DShot is only supported on the AUX pins.
> It is best to disable the IO via [SYS_USE_IO](../advanced_config/parameter_reference.md#SYS_USE_IO) and then connect the motors to the AUX pins instead of MAIN.

If connected via battery, the ESC's should initialize and the motors turn when armed.
In case the motors do not spin at lowest throttle, increase [DSHOT_MIN](../advanced_config/parameter_reference.md#DSHOT_MIN) until they spin.

## Sending commands
Via [MAVLink shell](https://dev.px4.io/master/en/debug/system_console.html#mavlink_shell) it is possible to send commands to the ESC.
Type `dshot help` for a full list.
The most important ones include:
- Let the first motor beep (helps with identifying motors):
  ```
  dshot beep1 -m 1
  ```
- Permanently reverse the spin direction of the first motor:
  ```
  dshot reverse -m 1
  dshot save -m 1
  ```
- Retrieve ESC infos (requires telemetry, see below):
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
In order to get feedback from the ESC's, an additional wire from the ESC's to the flight controller needs to be connected and the ESC needs to support that.
Connect all wires from the ESC's together to one of the RX pins of an unused serial port of the flight controller.
Then enable telemetry on that serial port via [DSHOT_TEL_CFG](../advanced_config/parameter_reference.md#MOT_POLE_COUNT).

After a reboot you can use `dshot esc_info -m 1` to check if telemetry is working (make sure the battery is connected).

The telemetry data includes:
- temperature
- voltage
- current
- accumulated current consumption
- RPM values

> **Tip** You may have to configure [MOT_POLE_COUNT](../advanced_config/parameter_reference.md#SYS_USE_IO) to get the correct RPM values.

