---
canonicalUrl: https://docs.px4.io/main/ja/peripherals/mavlink_peripherals
---

# MAVLink Peripherals (GCS/OSD/Companion)

Ground Control Stations (GCS), On-Screen Displays (OSD), Companion Computers, ADS-B receivers, and other MAVLink peripherals interact with PX4 using separate MAVLink streams, sent via different serial ports. These communication channels are configured using the [MAVLink parameters](../advanced_config/parameter_reference.md#mavlink).

## MAVLink Instances

In order to assign a particular peripheral to a serial port we use the (abstract) concept of a *MAVLink instance*.

Each instance can represent a particular set of streamed messages (see [MAV_X_MODE](#MAV_X_MODE) below); parameters are used to define the set of messages, the port used, data rate, etc.

:::note
At time of writing three MAVLink *instances* are defined, which correspond to the 0, 1, 2 in the parameters listed below.
:::

The parameters for each instance are:

- [MAV_X_CONFIG](../advanced_config/parameter_reference.md#MAV_0_CONFIG) - Set the serial port (UART) for this instance "X", where X is 0, 1, 2. It can be any unused port, e.g.: TELEM2, TELEM3, GPS2 etc. For more information see [Serial Port Configuration](../peripherals/serial_configuration.md).
- <span id="MAV_X_MODE"></span>[MAV_X_MODE](../advanced_config/parameter_reference.md#MAV_0_MODE) - Specify the telemetry mode/target (the set of messages to stream for the current instance and their rate). The default values are:
  
  - *Normal*: Standard set of messages for a GCS. 
  - *Custom* or *Magic*: Nothing (in the default PX4 implementation). Modes may be used for testing when developing a new mode.
  - *Onboard*: Standard set of messages for a companion computer.
  - *OSD*: Standard set of messages for an OSD system.
  - *Config*: Standard set of messages and rate configuration for a fast link (e.g. USB).
  - *Minimal*: Minimal set of messages for use with a GCS connected on a high latency link.
  - *ExtVision* or *ExtVisionMin*: Messages for offboard vision systems (ExtVision needed for VIO).
  - *Iridium*: Messages for an [Iridium satellite communication system](../advanced_features/satcom_roadblock.md).
  
:::note
If you need to find the specific set of message for each mode search for `MAVLINK_MODE_` in [/src/modules/mavlink/mavlink_main.cpp](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mavlink/mavlink_main.cpp).
:::
  
:::tip
The mode defines the *default* messages and rates. A connected MAVLink system can still request the streams/rates that it wants using [MAV_CMD_SET_MESSAGE_INTERVAL](https://mavlink.io/en/messages/common.html#MAV_CMD_SET_MESSAGE_INTERVAL).
:::

- [MAV_X_RATE](../advanced_config/parameter_reference.md#MAV_0_MODE) - Set the maximum *data rate* for this instance (bytes/second).
  
  - This is the combined rate for all streams of individual message (the rates for individual messages are reduced if the total rate exceeds this value).
  - The default setting will generally be acceptable, but might be reduced if the telemetry link becomes saturated and too many messages are being dropped.
  - A value of 0 sets the data rate to half the theoretical value.
- [MAV_X_FORWARD](../advanced_config/parameter_reference.md#MAV_0_FORWARD) - Enable forwarding of MAVLink packets received by the current instance onto other interfaces. This might be used, for example, to transfer messages between a GCS and a companion computer so that the GCS can talk to a MAVLink enabled camera connected to the companion computer.

Next you need to set the baud rate for the serial port you assigned above (in `MAV_X_CONFIG`).

:::tip
You will need to reboot PX4 to make the parameter available (i.e. in QGroundControl).
:::

The parameter used will depend on the [assigned serial port](../advanced_config/parameter_reference.md#serial) - for example: `SER_GPS1_BAUD`, `SER_TEL2_BAUD`, etc. The value you use will depend on the type of connection and the capabilities of the connected MAVLink peripheral.

<span id="default_ports"></span>

## Default MAVLink Ports

The `TELEM 1` port is almost always used for the GCS telemetry stream.

To support this there is a [default serial port mapping](../peripherals/serial_configuration.md#default_port_mapping) of MAVLink instance 0 as shown below:

- [MAV_0_CONFIG](../advanced_config/parameter_reference.md#MAV_0_CONFIG) = `TELEM 1`
- [MAV_0_MODE](../advanced_config/parameter_reference.md#MAV_0_MODE) = `Normal`
- [MAV_0_RATE](../advanced_config/parameter_reference.md#MAV_0_RATE)= `1200` Bytes/s
- [MAV_0_FORWARD](../advanced_config/parameter_reference.md#MAV_0_FORWARD) = `True`
- [SER_TEL1_BAUD](../advanced_config/parameter_reference.md#SER_TEL1_BAUD) = `57600`

## Example

For example, to use a companion computer on `TELEM 2` you might set parameters as shown:

- [MAV_2_CONFIG](../advanced_config/parameter_reference.md#MAV_2_CONFIG) = `TELEM 2`
- [MAV_2_MODE](../advanced_config/parameter_reference.md#MAV_2_MODE) = `Onboard`
- [MAV_2_RATE](../advanced_config/parameter_reference.md#MAV_2_RATE)= `80000` Bytes/s :::tip This value might have to be tuned/reduced in the event of message losses.
:::
- [MAV_2_FORWARD](../advanced_config/parameter_reference.md#MAV_2_FORWARD) = `True`
- [SER_TEL2_BAUD](../advanced_config/parameter_reference.md#SER_TEL2_BAUD) = `921600` baud