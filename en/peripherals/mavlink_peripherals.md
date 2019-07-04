# MAVLink Peripherals (GCS/OSD/Companion)

Ground Control Stations (GCS), On-Screen Displays (OSD), Companion Computers, ADS-B receivers, and other MAVLink peripherals interact with PX4 using separate MAVLink streams, sent via different serial ports.
These communication channels are configured using the [MAVLink parameters](../advanced_config/parameter_reference.md#mavlink).

## MAVLink Instances

In order to assign a particular peripheral to a serial port we use the (abstract) concept of a *MAVLink instance*.
Each instance can represent a particular set of streamed messages (see "mode" below); parameters are used to define the set of messages, the port used, data rate, etc.

> **Note** At time of writing three instances are defined, which correspond to the 0, 1, 2 in the parameters listed below.

The parameters for each instance are:
- [MAV_X_CONFIG](../advanced_config/parameter_reference.md#MAV_0_CONFIG) - Set the serial port (UART) for this instance "X", where X is 0, 1, 2. 
  It can be any unused port, e.g.: TELEM2, TELEM3, GPS2 etc. For more information see [Serial Port Configuration](../peripherals/serial_configuration.md).
- [MAV_X_MODE](../advanced_config/parameter_reference.md#MAV_0_MODE) - Specify the telemetry mode/target (the set of messages to stream for the current instance and their rate).
  The default values are:
  - *Normal*: Standard set of messages for a GCS.
  - *Custom* or *Magic*: Nothing (in the default PX4 implementation).
    These might be used for testing when developing a new mode.
  - *Onboard*: Standard set of messages for a companion computer.
  - *OSD*: Standard set of messages for an OSD system.
  - *Config*: Standard set of messages and rate configuration for a fast link (e.g. USB).
  - *Minimal*: Minimal set of messages for use with a GCS connected on a high latency link.
  
  > **Tip** The mode defines the *default* messages and rates.
  A connected MAVLink system can still request the streams/rates that it wants using [MAV_CMD_SET_MESSAGE_INTERVAL](https://mavlink.io/en/messages/common.html#MAV_CMD_SET_MESSAGE_INTERVAL).
- [MAV_X_RATE](../advanced_config/parameter_reference.md#MAV_0_MODE) - Set the maximum data rate for this instance (bytes/second). 
  This is the combined rate for all streams of individual message (the rates for individual messages are reduced if the total rate exceeds this value).
  The default setting will generally be acceptable, but might be reduced if the telemetry link becomes saturated and too many messages are being dropped.
In many cases the default should be good however.
- [MAV_X_FORWARD](../advanced_config/parameter_reference.md#MAV_0_FORWARD) - Enable forwarding of MAVLink packets received by the current instance onto other interfaces. This might be used, for example, to transfer messages between a GCS and a companion computer so that the GCS can talk to a MAVLink enabled camera connected to the companion computer.


## Default MAVLink Ports {#default_ports}

The `TELEM 1` port is almost always used for the GCS telemetry stream.

To support this there is a [default serial port mapping](../peripherals/serial_configuration.md#default_port_mapping) of MAVLink instance 0 as shown below:
- [MAV_0_CONFIG](../advanced_config/parameter_reference.md#MAV_0_CONFIG) = `TELEM 1`
- [MAV_0_MODE](../advanced_config/parameter_reference.md#MAV_0_MODE) = `Normal`
- [MAV_0_RATE](../advanced_config/parameter_reference.md#MAV_0_RATE)= `57600` baud
- [MAV_0_FORWARD](../advanced_config/parameter_reference.md#MAV_0_FORWARD) = `True`

## Example

For example, to use a Companion Computer on `TELEM 2` you might set parameters as shown:
- [MAV_2_CONFIG](../advanced_config/parameter_reference.md#MAV_2_CONFIG) = `TELEM 2`
- [MAV_2_MODE](../advanced_config/parameter_reference.md#MAV_2_MODE) = `Onboard`
- [MAV_2_RATE](../advanced_config/parameter_reference.md#MAV_2_RATE)= `921600` baud
- [MAV_2_FORWARD](../advanced_config/parameter_reference.md#MAV_2_FORWARD) = `True`
