# TBS Crossfire Telemetry (CRSF)

TBS Crossfire telemetry allows users to get vehicle telemetry information from the flight controller on a compatible RC transmitter.

The protocol was developed by [Team BlackSheep](https://www.team-blacksheep.com/) for their Crossfire RC system, and can also be used with ExpressLRS (ELRS) RC systems.
It is a bidirectional protocol that only needs a single UART for communicating both RC and telemetry.

Available [telemetry is listed here](#messages), and includes: flight mode, battery level, GPS data RC signal strength, speed, altitude, and so on.

:::note
If you don't need telemetry you can connect a TBS Crossfire to the `RCIN` port and configure the receiver to use S.BUS.
:::

:::warning
PX4 does not include the CRSF support by default.
The instructions below explain how to build and upload custom PX4 firmware that includes the required modules.
:::

## Hardware Setup

CRSF telemetry requires:

- An [TRS-Crossfire-compatible RC transmitter](#compatible-rc-transmitters).
  This will either have an inbuilt transmitter module or a separate external module.
- An [TRS-Crossfire receiver](#telemetry-receivers)
- A cable to connect the receiver to a flight controller UART.

<a id="configure"></a>

## PX4 Configuration

### Firmware Configuration/Build

PX4 CRSF telemetry support is not included in firmware by default.
To use this feature you must build and upload custom firmware that includes [crsf-rc](../modules/modules_driver.md#crsf-rc) and removes [rc_input](../modules/modules_driver.md#rc-input).

The steps are:

1. [Setup a development environment](../dev_setup/dev_env.md) for building PX4.

   As part of this process you will have used `git` to fetch source code into the **PX4-Autopilot** directory.

1. Open a terminal and `cd` into the `PX4-Autopilot` directory.

   ```sh
   cd PX4-Autopilot
   ```

1. Launch the [PX4 board config tool (`menuconfig`)](../hardware/porting_guide_config.md#px4-menuconfig-setup) for your `make` target using the `boardconfig` option (here the target is the [ARK Electronics ARKV6X](../flight_controller/arkv6x.md) flight controller):

   ```sh
   make ark_fmu-v6x_default boardconfig
   ```

1. In the PX4 board config tool:

   - Disable the default `rc_input` module
     1. Navigate to the `drivers` submenu, then scroll down to highlight `rc_input`.
     1. Use the enter key to remove the `*` from `rc_input` checkbox.
   - Enable the `crsf_rc` module
     1. Scroll to highlight the `RC` submenu, then press enter to open it.
     1. Scroll to highlight `crsf_rc` and press enter to enable it.

   Save and exit the PX4 board config tool.

1. [Build the PX4 source code](../dev_setup/building_px4.md) with your changes (again assuming you are using ARKV6X):

   ```sh
   make ark_fmu-v6x_default
   ```

This will build your custom firmware, which must now be uploaded to your flight controller.

### Firmware Upload

To upload the custom firmware, first connect your flight controller to the development computer via USB.

You can upload firmware as part of the build process using the `upload` options:

```sh
make ark_fmu-v6x_default upload
```

Alternatively you can use QGroundControl to install the firmware, as described in [Firmware > Installing PX4 master, beta, or custom firmware](https://docs.px4.io/main/en/config/firmware.html#installing-px4-master-beta-or-custom-firmware).

### Parameter Configuration

[Set the parameter](../advanced_config/parameters.md) named [RC_CRSF_PRT_CFG](../advanced_config/parameter_reference.md#RC_CRSF_PRT_CFG) to port that is connected to the CRSF receiver (such as `TELEM1`).

This [configures the serial port](../peripherals/serial_configuration.md) to use the CRSF protocol.
Note that some serial ports may already have a [default serial port mapping](../peripherals/serial_configuration.md#default-serial-port-configuration) or [default MAVLink serial port mapping](../peripherals/mavlink_peripherals.md#default-mavlink-ports) that you will have to un-map before you can assign to CRSF.
For example, if you want to use `TELEM1` or `TELEM2` you first need to modify [MAV_0_CONFIG](../advanced_config/parameter_reference.md#MAV_0_CONFIG) or [MAV_1_CONFIG](../advanced_config/parameter_reference.md#MAV_1_CONFIG) to stop setting those ports.

There is no need to set the baud rate for the port, as this is configured by the driver.

## Radio Setup

See [TBS Crossfire Manual](https://www.team-blacksheep.com/tbs-crossfire-manual.pdf) (search for 'Setting up radio for CRSF').

<a id="transmitters"></a>

## Compatible RC Transmitters

:::note
An RC radio system historically consisted of a handheld controller on the ground that transmitted to an on-vehicle receiver.
Even though many radio systems are now bidirectional, the ground module is often referred to as the transmitter, and the air unit is called a receiver.
:::

You will need an RC transmitter that can receive the CRSF telemetry stream from a bound CRSF receiver on the vehicle.

Radio controllers may come with an inbuilt base module ("transmitter") [such as these by TBS](https://www.team-blacksheep.com/shop/q:radio%20drone%20controller)

Other ground controllers allow transmitters to be added as separate transmitter modules.
TBS transmitters are usually compatible with the "JR module bay".
For example the [FrSky Taranis X9D Plus (2)](https://www.frsky-rc.com/product/taranis-x9d-plus-2/) can be used with TBS modules

Popular alternatives that can be used with [TBS Transmitter Modules](http://team-blacksheep.com/shop/cat:rc_transmitters#product_listing) include:

- FrSky Taranis X9D Plus (recommended)
- ?

These transmitters will need to be configured for use with your transmitter.
The [TBS Crossfire Manual](https://www.team-blacksheep.com/tbs-crossfire-manual.pdf) provides some common setup instructions (i.e. for OpenTX running on the Taranis X9D plus).

<a id="receivers"></a>

## Telemetry Receivers

<!-- what should we list here? -->

- [TBS Crossfire Nano RX](http://team-blacksheep.com/products/prod:crossfire_nano_rx) - designed for small Quads.
- ELRS RX <!-- add link and more detail -->

## Wiring

The TX and RX on your selected Flight Controller UART should be connected to separate channels on the receiver.
If using a TBS receiver the signal is uninverted, and can be directly connected (no additional inverter logic is required in the cable).

<!-- ELRS - uninverted too? Is setup the same? -->
<!-- how do I set up the channels that are used to mean tx/rx. The receivers I am seeing appear to have 4 channels on them. What's the story? Are these supposed to be single wire? --->

<!--
Connect the Nano RX and Omnibus pins as shown:

| Omnibus UART1 | Nano RX |
| ------------- | ------- |
| TX            | Ch2     |
| RX            | Ch1     |

-->

### Pixhawk

<a id="messages"></a>

## Telemetry Messages

The [TBS Crossfire Manual](https://www.team-blacksheep.com/tbs-crossfire-manual.pdf) includes a list of messages: search on "Available sensors with OpenTX".

## See Also

- [TBS Crossfire Manual](https://www.team-blacksheep.com/tbs-crossfire-manual.pdf)
- [FrSky Telemetry](../peripherals/frsky_telemetry.md)

<!-- also seems to indicate you can use with MAVLink rather than to RC? in user guide. Is it one or other? I guess at that point it is pure MAVLink just a dumb transmitter? -->
