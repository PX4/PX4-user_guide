---
canonicalUrl: https://docs.px4.io/main/ko/peripherals/mavlink_peripherals
---

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
  - *사용자 정의* 또는 *매직* : 없음(기본 PX4 구현 방식). 모드는 새 모드를 개발시 테스트용으로 사용할 수 있습니다.
  - *온보드* : 보조 컴퓨터 표준 메시지 집합입니다.
  - *OSD* : OSD 시스템 표준 메시지 세트.
  - *설정* : 고속 링크 표준 메시지 세트 및 속도 설정(예 : USB).
  - *최소* : 대기 시간이 긴 링크에 연결된 GCS와 함께 사용하기 위한 최소 메시지 집합입니다.
  - *ExtVision* 또는 *ExtVisionMin* : 오프보드 비전 시스템 메시지(VIO에 필요한 ExtVision).
  - *이리듐* : [이리듐 위성 통신 시스템](../advanced_features/satcom_roadblock.md) 메시지입니다.
  
:::note
각 모드에 대한 특정 메시지 세트를 찾으려면 [/src/modules/mavlink/mavlink_main.cpp](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mavlink/mavlink_main.cpp)에서 `MAVLINK_MODE_`를 검색하십시오.
:::
  
:::tip
모드는 *기본* 메시지와 속도를 정의합니다. 연결된 MAVLink 시스템은 [MAV_CMD_SET_MESSAGE_INTERVAL](https://mavlink.io/en/messages/common.html#MAV_CMD_SET_MESSAGE_INTERVAL)을 사용하여 원하는 스트림과 속도를 계속 요청할 수 있습니다.
:::

- [MAV_X_RATE](../advanced_config/parameter_reference.md#MAV_0_MODE) - 인스턴스의 최대 *데이터 속도*를 설정합니다 (바이트/초).
  
  - 이는 개별 메시지의 모든 스트림에 대한 결합 비율입니다 (총 비율이이 값을 초과하면 개별 메시지에 대한 비율이 감소됨).
  - 기본 설정은 일반적으로 허용되지만 원격 분석 링크가 포화 상태가 되고, 너무 많은 메시지가 삭제되는 경우에는 감소할 수 있습니다.
  - 값이 0이면 데이터 속도가 이론적인 값의 절반으로 설정됩니다.
- [MAV_X_FORWARD](../advanced_config/parameter_reference.md#MAV_0_FORWARD) - 현재 인스턴스에서 수신한 MAVLink 패킷을 다른 인터페이스로 전달할 수 있습니다. 예를 들어 GCS가 보조 컴퓨터에 연결된 MAVLink 지원 카메라와 통신할 수 있도록 GCS와 보조 컴퓨터간에 메시지를 전송에 사용할 수 있습니다.

다음으로 위에서 할당한 직렬 포트의 전송 속도를 설정하여야 합니다 (`MAV_X_CONFIG /0>).</p>

<p>:::tip
매개변수를 사용하가 위하여 PX4를 재부팅합니다(예 : QGroundControl에서).
:::</p>

<p>사용되는 매개변수는 <a href="../advanced_config/parameter_reference.md#serial">할당 직렬 포트</a>에 따라 다릅니다(예: <code>SER_GPS1_BAUD`, `SER_TEL2_BAUD` 등). 사용하는 값은 연결 유형과 연결된 MAVLink 주변 장치에 따라 달라집니다.

<span id="default_ports"></span>

## 기본 MAVLink 포트

`TELEM 1` 포트는 대부분 GCS 원격 분석 스트림에 사용됩니다.

이를 지원하기 위하여 아래와 같은 MAVLink 인스턴스 0의 [기본 직렬 포트 매핑](../peripherals/serial_configuration.md#default_port_mapping)을 사용합니다.

- [MAV_0_CONFIG](../advanced_config/parameter_reference.md#MAV_0_CONFIG) = `TELEM 1`
- [MAV_0_MODE](../advanced_config/parameter_reference.md#MAV_0_MODE) = `Normal`
- [MAV_0_RATE](../advanced_config/parameter_reference.md#MAV_0_RATE)= `1200` 바이트/초
- [MAV_0_FORWARD](../advanced_config/parameter_reference.md#MAV_0_FORWARD) = `True`
- [SER_TEL1_BAUD](../advanced_config/parameter_reference.md#SER_TEL1_BAUD) = `57600`

## 예

예를 들어, `TELEM 2`에서 보조 컴퓨터를 사용하려면 아래와 같은 매개변수를 설정합니다.

- [MAV_2_CONFIG](../advanced_config/parameter_reference.md#MAV_2_CONFIG) = `TELEM 2`
- [MAV_2_MODE](../advanced_config/parameter_reference.md#MAV_2_MODE) = `Onboard`
- [MAV_2_RATE](../advanced_config/parameter_reference.md#MAV_2_RATE)= `80000` 바이트/초 :::tip 이 값은 메시지 유실시 조정하거나 감소할 수 있습니다.
:::
- [MAV_2_FORWARD](../advanced_config/parameter_reference.md#MAV_2_FORWARD) = `True`
- [SER_TEL2_BAUD](../advanced_config/parameter_reference.md#SER_TEL2_BAUD) = `921600` baud