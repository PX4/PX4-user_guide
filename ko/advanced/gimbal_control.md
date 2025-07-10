---
canonicalUrl: https://docs.px4.io/main/ko/advanced/gimbal_control
---

# 짐벌 제어 설정

기체에 카메라(또는 다른 장치)를 달아 장착하는 짐벌을 제어하려면, 어떻게 제어할 지, PX4가 어떻게 명령을 내릴지 설정해야합니다. 여기서는 설정 방법을 설명합니다.

PX4에는 제각각의 입출력 방식을 가진 일반 마운트/짐벌 제어 드라이버가 있습니다.
- 입력에서는 (임무 수행이나 조사 활동시) RC나 MAVLink 명령 중 짐벌 제어 방식을 정의합니다.
- 출력에서는 MAVLink 명령 또는 비행 제어 장치 AUX PWM 포트 중 어떤 방식으로 짐벌을 연결할 지 정의합니다. 어떤 입력 방식이든 출력을 처리할 용도로 선택할 수 있으며, 두 방식 모두 매개변수로 구성해야합니다.

## 매개변수

[마운트](../advanced_config/parameter_reference.md#mount) 매개변수는 마운트 드라이버 구성애 활용합니다.

가장 중요한 부분은 입력([MNT_MODE_IN](../advanced_config/parameter_reference.md#MNT_MODE_IN)) 상태와 출력([MNT_MODE_OUT](../advanced_config/parameter_reference.md#MNT_MODE_OUT)) 상태입니다. 기본적으로 입력은 꺼져있으며 드라이버를 실행하지 않습니다. 입력 상태를 선택하고 나면, 기체 구동을 다시 시작하여 마운트 드라이버를 시작하십시오.

입력 상태를 `AUTO`(자동)로 설정하면, 가장 최근의 입력 상태로 자동으로 전환합니다. MAVLink에서 RC로 전환하려면, 스틱을 크게 움직여야 합니다.

## AUX 출력

MAVLink 짐벌 동작을 켜려면 우선 [MNT_MODE_IN](../advanced_config/parameter_reference.md#MNT_MODE_IN) 매개변수 값을 `MAVLINK_DO_MOUNT`로, [MNT_MODE_OUT](../advanced_config/parameter_reference.md#MNT_MODE_OUT) 매개변수 값을 `MAVLINK`로 설정하십시오.

짐벌은 \[MAVLink 주변 기기 (GCS/OSD/보조)\](../peripherals/mavlink_peripherals.md#mavlink-peripherals-gcsosdcompanion) 에서 다루는 방법과 같이 *어떤 여분의 직렬 포트*에든 연결할 수 있습니다([직렬 포트 구성](../peripherals/serial_configuration.md#serial-port-configuration)도 참고).

일반 구성은 비행 제어장치의 TELEM2 포트(TELEM2가 비어있다고 가정)에 짐벌을 직렬 연결하는 방식입니다. 이 구성을 진행하려면 다음과 같이 설정해야합니다:
- [MAV_1_CONFIG](../advanced_config/parameter_reference.md#MAV_1_CONFIG) 매개변수 값을 **TELEM2**로 설정하십시오( `MAV_1_CONFIG`를 이미 보조 컴퓨터에서 쓰는 경우 `MAV_2_CONFIG` 매개변수를 활용하십시오).
- [MAV_1_MODE](../advanced_config/parameter_reference.md#MAV_1_MODE) 매개변수 값을 **NORMAL**로 설정하십시오
- [SER_TEL2_BAUD](../advanced_config/parameter_reference.md#SER_TEL2_BAUD) 매개변수 값을 제조사 권장 전송율(baud rate)로 설정하십시오

이 절차를 거치고 나면, 사용자는 [MAV_CMD_DO_MOUNT_CONTROL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_MOUNT_CONTROL) 매개변수와 [MAV_CMD_DO_MOUNT_CONFIGURE](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_MOUNT_CONFIGURE) 매개변수로 짐벌을 제어할 수 있습니다.


## 비행 제어장치의 짐벌 (MNT_MODE_OUT=AUX)

`MNT_MODE_OUT=AUX`로 설정하여 짐벌을 비행 제어장치 AUX 포트에 연결할 수 있습니다.

믹서 파일은 출력 핀 대응 정의에 필요하며 [mount mixer](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/mixers/mount.aux.mix)는 자동으로 선택합니다(이 명령으로 비행 기체 프레임 구성에서 제공하는 AUX 믹서 설정을 무시합니다).

출력 할당은 다음과 같습니다:
- **AUX1**: 상하 회전각(Pitch)
- **AUX2**: 좌우 회전각(Roll)
- **AUX3**: 방위 회전각(Yaw)
- **AUX4**: 촬영/복귀

### 믹서 구성 맞춤설정

:::tip
믹서의 작동 및 믹서 파일의 형식에 대한 설명은 [믹싱과 액츄에이터](../concept/mixing.md)를 확인하십시오.
:::

출력은 SD 카드의 `etc/mixers/mount.aux.mix` [믹서 파일을 만들어](../concept/system_startup.md#starting-a-custom-mixer) 원하는 대로 개별 설정할 수 있습니다.

태풍 H480 모델은 사전 구성 후 모의 설정한 짐벌이 딸려옵니다.

```
# roll
M: 1
O:      10000  10000      0 -10000  10000
S: 2 0  10000  10000      0 -10000  10000

# pitch
M: 1
O:      10000  10000      0 -10000  10000
S: 2 1  10000  10000      0 -10000  10000

# yaw
M: 1
O:      10000  10000      0 -10000  10000
S: 2 2  10000  10000      0 -10000  10000
```


## SITL

모의 설정 짐벌을 실행하려면 다음 명령을 활용하십시오:

다른 모듈 또는 모의 시험 환경에 설치한 마운트 드라이버를 시험하려면, 드라이버가 실행 중인지 확인(`vmount start` 명령 활용)하고, 매개변수를 구성하십시오.
```
make px4_sitl gazebo_typhoon_h480
```

다른 모델 또는 모의 시험 환경에 설치한 마운트 드라이버를 시험하려면, 드라이버가 실행 중인지 확인(`vmount start` 명령 활용)하고, 매개변수를 구성하십시오.


## 시험
이 드라이버는 간단한 시험 명령어를 제공합니다. 먼저 `vmount stop`으로 동작을 멈추어야합니다. 아래는 SITL에서의 시험 방법을 설명하지만, 이 명령어가 실제 장비에서도 작동합니다.

다음 명령으로 시작하십시오(매개 변수값을 바꿀 필요는 없습니다):
```
make px4_sitl gazebo_typhoon_h480
```
참고로 모의 환경 짐벌은 자체적으로 안정 상태로 돌아갑니다. 따라서 MAVLink 명령을 보낼 경우 `stabilize` 플래그를 `false`로 설정하십시오.
```
vmount test yaw 30
```

참고로 모의 환경 짐벌은 스스로 안정 상태로 돌아갑니다. 따라서 MAVLink 명령을 보낸다면 `stabilize` 플래그를 `false`로 설정하십시오.

![Gazebo 짐벌 모의 시험](../../assets/simulation/gazebo/gimbal-simulation.png)

