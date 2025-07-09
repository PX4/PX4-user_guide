---
canonicalUrl: https://docs.px4.io/main/ko/peripherals/mavlink_peripherals
---

# MAVLink 주변 장치(OSD/GCS/보조 컴퓨터 등)

GCS(Ground Control Station), OSD(On-Screen Display), 보조 컴퓨터, ADS-B 수신기와 기타 MAVLink 주변 장치들은 서로 다른 직렬 포트를 통하여 전송되는 별도의 MAVLink 스트림을 통하여 PX4와 상호 작용합니다.

In order to configure that a particular serial port is used for MAVLink traffic with a particular peripheral, we use [Serial Port Configuration](../peripherals/serial_configuration.md), assigning one of the abstract "MAVLink instance" configuration parameters to the desired port. We then set other properties of the MAVLink channel using the parameters associated with our selected MAVLink instance, so that they match the requirements of our particular peripheral.

The most relevant parameters are described below (the full set are listed in the [Parameter Reference > MAVLink](../advanced_config/parameter_reference.md#mavlink)).

## MAVLink 인스턴스

In order to assign a particular peripheral to a serial port we use the concept of a _MAVLink instance_.

Each MAVLink instance represents a particular MAVLink configuration that you can apply to a particular port. At time of writing three MAVLink _instances_ are defined, each represented by a parameter [MAV_X_CONFIG](#MAV_X_CONFIG), where X is 0, 1, 2.

Each instance has associated parameters that you can use to define the properties of the instance on that port, such as the set of streamed messages (see [MAV_X_MODE](#MAV_X_MODE) below), data rate ([MAV_X_RATE](#MAV_X_RATE)), whether incoming traffic is forwarded to other MAVLink instances ([MAV_X_FORWARD](#MAV_X_FORWARD)), and so on.

:::note
MAVLink instances are an abstract concept for a particular MAVLink configuration.
The number in the name means nothing; you can assign any instance to any port.
:::

각 인스턴스의 매개변수는 아래와 같습니다.

- <a id="MAV_X_CONFIG"></a>[MAV_X_CONFIG](../advanced_config/parameter_reference.md#MAV_0_CONFIG) - 인스턴스 "X"의 직렬 포트(UART)를 설정합니다. 여기서 X는 0, 1, 2입니다. It can be any unused port, e.g.: `TELEM2`, `TELEM3`, `GPS2` etc. 자세한 내용은 [직렬 포트 설정](../peripherals/serial_configuration.md)을 참고하십시오.
- <a id="MAV_X_MODE"></a>[MAV_X_MODE](../advanced_config/parameter_reference.md#MAV_0_MODE) - 원격 측정 모드와 대상(현재 인스턴스 및 해당 속도에 대한 스트리밍 메시지 집합)을 지정합니다. 기본값은 아래와 같습니다.

  - _Normal_: Standard set of messages for a GCS.
  - _Custom_ or _Magic_: Nothing (in the default PX4 implementation). 모드는 새 모드를 개발시 테스트용으로 사용할 수 있습니다.
  - _Onboard_: Standard set of messages for a companion computer.
  - _OSD_: Standard set of messages for an OSD system.
  - _Config_: Standard set of messages and rate configuration for a fast link (e.g. USB).
  - _Minimal_: Minimal set of messages for use with a GCS connected on a high latency link.
  - _ExtVision_ or _ExtVisionMin_: Messages for offboard vision systems (ExtVision needed for VIO).
  - _Iridium_: Messages for an [Iridium satellite communication system](../advanced_features/satcom_roadblock.md).

:::note
각 모드에 대한 특정 메시지 세트를 찾으려면 [/src/modules/mavlink/mavlink_main.cpp](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mavlink/mavlink_main.cpp)에서 `MAVLINK_MODE_`를 검색하십시오.
:::

:::tip
The mode defines the _default_ messages and rates. 연결된 MAVLink 시스템은 [MAV_CMD_SET_MESSAGE_INTERVAL](https://mavlink.io/en/messages/common.html#MAV_CMD_SET_MESSAGE_INTERVAL)을 사용하여 원하는 스트림과 속도를 계속 요청할 수 있습니다.
:::

- <a id="MAV_X_RATE"></a>[MAV_X_RATE](../advanced_config/parameter_reference.md#MAV_0_MODE) - Set the maximum _data rate_ for this instance (bytes/second).
  - 이는 개별 메시지의 모든 스트림에 대한 결합 비율입니다 (총 비율이이 값을 초과하면 개별 메시지에 대한 비율이 감소됨).
  - 기본 설정은 일반적으로 허용되지만 원격 분석 링크가 포화 상태가 되고, 너무 많은 메시지가 삭제되는 경우에는 감소할 수 있습니다.
  - 값이 0이면 데이터 속도가 이론적인 값의 절반으로 설정됩니다.
- <a id="MAV_X_FORWARD"></a>[MAV_X_FORWARD](../advanced_config/parameter_reference.md#MAV_0_FORWARD) - 현재 인스턴스에서 수신한 MAVLink 패킷을 다른 인터페이스로 전달할 수 있습니다. 예를 들어 GCS가 보조 컴퓨터에 연결된 MAVLink 지원 카메라와 통신할 수 있도록 GCS와 보조 컴퓨터간에 메시지를 전송에 사용할 수 있습니다.

다음으로 위에서 할당한 직렬 포트의 전송 속도를 설정하여야 합니다 (`MAV_X_CONFIG /0>).</p>

<p spaces-before="0">:::tip
매개변수를 사용하가 위하여 PX4를 재부팅합니다(예 : QGroundControl에서).
:::</p>

<p spaces-before="0">The parameter used will depend on the <a href="../advanced_config/parameter_reference.md#serial">assigned serial port</a> - for example: <code>SER_GPS1_BAUD`, `SER_TEL2_BAUD`, etc. 사용하는 값은 연결 유형과 연결된 MAVLink 주변 장치에 따라 달라집니다.

<a id="default_ports"></a>

## 기본 MAVLink 포트

### TELEM1

The `TELEM 1` port is almost always configured by default for the GCS telemetry stream ("Normal").

이를 지원하기 위하여 아래와 같은 MAVLink 인스턴스 0의 [기본 직렬 포트 매핑](../peripherals/serial_configuration.md#default_port_mapping)을 사용합니다.

- [MAV_0_CONFIG](../advanced_config/parameter_reference.md#MAV_0_CONFIG) = `TELEM 1`
- [MAV_0_MODE](../advanced_config/parameter_reference.md#MAV_0_MODE) = `Normal`
- [MAV_0_RATE](../advanced_config/parameter_reference.md#MAV_0_RATE)= `1200` 바이트/초
- [MAV_0_FORWARD](../advanced_config/parameter_reference.md#MAV_0_FORWARD) = `True`
- [SER_TEL1_BAUD](../advanced_config/parameter_reference.md#SER_TEL1_BAUD) = `57600`

### TELEM2

The `TELEM 2` port usually configured by default for a companion computer telemetry stream ("Onboard").

이를 지원하기 위하여 아래와 같은 MAVLink 인스턴스 0의 [기본 직렬 포트 매핑](../peripherals/serial_configuration.md#default_port_mapping)을 사용합니다.

- [MAV_1_CONFIG](../advanced_config/parameter_reference.md#MAV_0_CONFIG) = `TELEM 2`
- [MAV_1_MODE](../advanced_config/parameter_reference.md#MAV_0_MODE) = `Onboard`
- [MAV_1_RATE](../advanced_config/parameter_reference.md#MAV_0_RATE)= `0` (Half maximum)
- [MAV_1_FORWARD](../advanced_config/parameter_reference.md#MAV_0_FORWARD) = `Disabled`
- [SER_TEL2_BAUD](../advanced_config/parameter_reference.md#SER_TEL2_BAUD) = `921600`

### ETHERNET

Pixhawk 5x devices (and later) that have an Ethernet port, configure it by default to connect to a GCS:

On this hardware, there is a [default serial port mapping](../peripherals/serial_configuration.md#default_port_mapping) of MAVLink instance 2 as shown below:

- [MAV_2_CONFIG](../advanced_config/parameter_reference.md#MAV_2_CONFIG) = `Ethernet` (1000)
- [MAV_2_BROADCAST](../advanced_config/parameter_reference.md#MAV_2_BROADCAST) = `1`
- [MAV_2_MODE](../advanced_config/parameter_reference.md#MAV_2_MODE) = `0` (normal/GCS)
- [MAV_2_RADIO_CTL](../advanced_config/parameter_reference.md#MAV_2_RADIO_CTL) = `0`
- [MAV_2_RATE](../advanced_config/parameter_reference.md#MAV_2_RATE) = `100000`
- [MAV_2_REMOTE_PRT](../advanced_config/parameter_reference.md#MAV_2_REMOTE_PRT)= `14550` (GCS)
- [MAV_2_UDP_PRT](../advanced_config/parameter_reference.md#MAV_2_UDP_PRT) = `14550` (GCS)

For more information see: [PX4 Ethernet Setup](../advanced_config/ethernet_setup.md)

## See Also

- [Serial Port Configuration](../peripherals/serial_configuration.md)
- [PX4 Ethernet Setup > PX4 MAVLink Serial Port Configuration](../advanced_config/ethernet_setup.md#px4-mavlink-serial-port-configuration)
- [Serial Port Mapping](../hardware/serial_port_mapping.md)
