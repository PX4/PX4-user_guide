---
canonicalUrl: https://docs.px4.io/main/ko/peripherals/serial_configuration
---

# 직렬 포트 설정

Pixhawk 보드의 직렬(UART) 포트들은 매개변수를 통하여 설정합니다. 예 : `GPS1`, `TELEM1`, `TELEM2`, `TELEM4` (`UART + I2C`).

설정을 통하여 아래의 작업들이 용이해집니다.(예 :)

* 포트의 전송 속도를 변경합니다.
* 다른 포트에서 MAVLink를 실행하거나 스트리밍 메시지를 변경합니다.
* 듀얼 GPS를 설정합니다.
* 일부 [거리 센서](../sensor/rangefinders.md)와 같이 직렬 포트에서 실행되는 센서를 활성화합니다.

:::note RC
입력이나 시스템 콘솔(`SERIAL 5`)과 같이 특정 용도로 사용되는 일부 포트는 설정할 수 없습니다.
:::

<span id="default_port_mapping"></span>

## 사전 설정된 포트

아래의 기능들은 일반적으로 모든 보드에서 동일하게 특정 직렬 포트에 기본적으로 매핑됩니다.

* MAVLink는 전송 속도가 57600인 `TELEM 1` 포트에 매핑됩니다([원격 측정 모듈](../telemetry/README.md)의 경우).
* GPS 1 ([gps 드라이버](../modules/modules_driver.md#gps))은 전송 속도가 *자동*인 `GPS 1` 포트에 매핑됩니다. 이 설정은 GPS 전송 속도를 자동으로 감지합니다(115200 전송 속도가 필요한 Trimble MB-Two 제외).

다른 모든 포트에는 할당된 기능이 없습니다(비활성화 됨).

:::tip
위의 포트 매핑은 [MAV_0_CONFIG](../advanced_config/parameter_reference.md#MAV_0_CONFIG) 및 [GPS_1_CONFIG](../advanced_config/parameter_reference.md#GPS_1_CONFIG)를 각각 *비활성화*로 설정할 수 있습니다.
:::

## 포트를 설정 방법

모든 직렬 드라이버와 포트는 동일한 방식으로 설정합니다.

1. 서비스와 주변기기에 대한 매개변수를 사용할 포트로 설정하십시오.
    
:::note
설정 매개변수 이름은 <0 *_CONFIG</code> 또는 `*_ CFG` 패턴을 따릅니다. *QGroundControl*은 펌웨어에 있는 서비스와 드라이버에 대한 매개변수만 표시합니다. 이 문서 작성 시점의 세트는 다음과 같습니다: [GPS_1_CONFIG](../advanced_config/parameter_reference.md#GPS_1_CONFIG), [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG), [ISBD_CONFIG](../advanced_config/parameter_reference.md#ISBD_CONFIG), [MAV_0_CONFIG](../advanced_config/parameter_reference.md#MAV_0_CONFIG), [MAV_1_CONFIG](../advanced_config/parameter_reference.md#MAV_1_CONFIG), [MAV_2_CONFIG](../advanced_config/parameter_reference.md#MAV_2_CONFIG), [RTPS_CONFIG](../advanced_config/parameter_reference.md#RTPS_CONFIG), [RTPS_MAV_CONFIG](../advanced_config/parameter_reference.md#RTPS_MAV_CONFIG), [TEL_FRSKY_CONFIG](../advanced_config/parameter_reference.md#TEL_FRSKY_CONFIG), [TEL_HOTT_CONFIG](../advanced_config/parameter_reference.md#TEL_HOTT_CONFIG), [SENS_LEDDAR1_CFG](../advanced_config/parameter_reference.md#SENS_LEDDAR1_CFG), [SENS_SF0X_CFG](../advanced_config/parameter_reference.md#SENS_SF0X_CFG), [SENS_TFMINI_CFG](../advanced_config/parameter_reference.md#SENS_TFMINI_CFG), [SENS_ULAND_CFG](../advanced_config/parameter_reference.md#SENS_ULAND_CFG).
:::

2. 추가 설정 매개변수를 표시하기 위하여 기체를 재부팅합니다.

3. 선택한 포트의 전송속도 매개변수를 설정합니다.
4. 모듈별 매개변수를 설정합니다(예 : MAVLink 스트림 및 데이터 속도 설정).

[GPS/Compass > Secondary GPS](../gps_compass/README.md#dual_gps) 섹션은 *QGroundControl*에서 포트 설정 방법실제 예를 제공합니다(`TELEM 2` 포트의 보조 GPS 사용을 위한 `GPS_2_CONFIG`를 사용 방법을 보여줍니다. ).

## 포트 충돌 해제

포트 충돌은 시스템 시작에 의해 처리되므로 특정 포트에서 최대 하나의 서비스만 실행됩니다.

:::warning
이 글을 쓰는 시점에는 충돌하는 포트에 관련된 사용자 피드백은 없습니다.
:::

## 문제 해결

<span id="parameter_not_in_firmware"></span>

### *QGroundControl*에서 누락된 설정 매개변수

*QGroundControl*은 펌웨어의 서비스와 드라이버의 매개변수들만 표시합니다. 펌웨어에 누락된 매개변수를 추가할 수 있습니다.

:::note PX4 펌웨어는 기본적으로 [Pixhawk 시리즈](../flight_controller/pixhawk_series.md) 보드에 드라이버를 대부분 포함합니다. 플래시 제한 보드는 드라이버를 주석 처리하거나 생략할 수 있습니다(작성 시점에는 FMUv2 기반 보드에만 영향을 미침).
:::

빌드하려는 [보드](https://github.com/PX4/PX4-Autopilot/tree/master/boards/px4)에 해당하는 **default.cmake** 설정 파일에서 드라이버의 주석을 제거하거나 추가하여 누락된 드라이버를 펌웨어에 포함시킬 수 있습니다. 예를 들어, sf0x 드라이버를 활성화하려면 아래 줄의 시작 부분에서 `#`을 제거합니다.

    #distance_sensor/sf0x
    

그런 다음 [PX4 소프트웨어 빌드](../dev_setup/building_px4.md) 방법으로 플랫폼용 펌웨어를 빌드하여야 합니다.

## 추가 정보

* [MAVLink 주변 장치(OSD/GCS/보조 컴퓨터 등)](../peripherals/mavlink_peripherals.md)