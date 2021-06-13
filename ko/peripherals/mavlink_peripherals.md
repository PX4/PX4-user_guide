# MAVLink 주변 장치(OSD/GCS/보조 컴퓨터 등)

GCS(Ground Control Station), OSD(On-Screen Display), 보조 컴퓨터, ADS-B 수신기와 기타 MAVLink 주변 장치들은 서로 다른 직렬 포트를 통하여 전송되는 별도의 MAVLink 스트림을 통하여 PX4와 상호 작용합니다. 이러한 통신 채널은 [MAVLink 매개변수](../advanced_config/parameter_reference.md#mavlink)를 사용하여 설정됩니다.

## MAVLink 인스턴스

특정 주변 장치를 직렬 포트에 할당하기 위하여 *MAVLink 인스턴스*를 사용합니다.

각 인스턴스는 특정 스트리밍 메시지 집합을 나타낼 수 있습니다 (아래 [MAV_X_MODE](#MAV_X_MODE) 참조). 매개변수는 메시지 세트, 사용된 포트, 데이터 속도 등을 정의합니다.

:::note
이 문서의 작성시점에서는 3 개의 MAVLink *인스턴스*가 정의되어 있으며, 이는 아래 나열된 매개변수의 0, 1, 2 입니다.
:::

각 인스턴스의 매개변수는 아래와 같습니다.

- [MAV_X_CONFIG](../advanced_config/parameter_reference.md#MAV_0_CONFIG) - 인스턴스 "X"의 직렬 포트(UART)를 설정합니다. 여기서 X는 0, 1, 2입니다. 사용되지 않는 포트일 수 있습니다 (예 : TELEM2, TELEM3, GPS2 등). 자세한 내용은 [직렬 포트 설정](../peripherals/serial_configuration.md)을 참고하십시오.
- <span id="MAV_X_MODE"></span>[MAV_X_MODE](../advanced_config/parameter_reference.md#MAV_0_MODE) - 원격 측정 모드와 대상(현재 인스턴스 및 해당 속도에 대한 스트리밍 메시지 집합)을 지정합니다. 기본값은 아래와 같습니다.
  
  - *일반* : GCS 표준 메시지 집합입니다. 
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