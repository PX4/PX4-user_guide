# 짐벌 콘트롤 설정

차량에 부착된 짐벌로 카메라(또는 다른 페이로드) 제어 방법과 PX4가 명어로 제어하기 위한 설정 방법을 설명합니다. 이 페이지에서는 설정 방법을 설명합니다.

PX4에는 입력과 출력이 다른 일반 마운트/짐벌 제어 드라이버가 포함되어 있습니다.
- 입력은 RC 또는 MAVLink 명령(예: 임무 또는 조사)을 통하여 짐벌을 제어하는 방법을 정의합니다.
- 출력은 MAVLink 명령이나 Flight Controller AUX PWM 포트를 사용하여 짐벌이 연결되는 방식을 정의합니다. 입력 방법을 선택하여 출력을 구동할 수 있으며, 입출력 모두 매개변수로 설정합니다.

## 매개변수

[마운트](../advanced_config/parameter_reference.md#mount) 매개변수는 마운트 드라이버를 설정합니다.

입력([MNT_MODE_IN](../advanced_config/parameter_reference.md#MNT_MODE_IN))과 출력([MNT_MODE_OUT](../advanced_config/parameter_reference.md#MNT_MODE_OUT)) 모드가 제일 중요합니다. 기본적으로, 입력은 비활성화되어 있으며 드라이버가 실행되지 않습니다. 입력 모드 선택 후, 차량을 재부팅하여 마운트 드라이버를 실행합니다.

입력 모드를 `AUTO`로 설정하면, 최근 입력을 기준으로 모드가 자동 전환됩니다. MAVLink에서 RC로 전환하려면, 스틱을 크게 움직이십시오.

## MAVLink 짐벌(MNT_MODE_OUT=MAVLINK)

MAVLink 짐벌을 활성화하려면, 매개변수 [MNT_MODE_IN](../advanced_config/parameter_reference.md#MNT_MODE_IN)을 `MAVLINK_DO_MOUNT`로 설정하고 [MNT_MODE_OUT](../advanced_config/parameter_reference.md#MNT_MODE_OUT)을 `MAVLINK`로 설정합니다.

짐벌은 [MAVLink 주변 장치(GCS/OSD/Companion)](../peripherals/mavlink_peripherals.md)의 지침을 사용하여 *직렬 포트*에 연결할 수 있습니다([직렬 포트 설정](../peripherals/serial_configuration.md#serial-port-configuration) 참조).

일반적인 설정 방법은 비행 콘트롤러 TELEM2 포트에서 짐벌에 직렬 연결을 하는 것입니다(TELEM2가 사용 가능할 때). 이렇게 구성하려면, 다음과 같이 설정합니다:
- [MAV_1_CONFIG](../advanced_config/parameter_reference.md#MAV_1_CONFIG)에서 **TELEM2**까지(`MAV_1_CONFIG`가 이미 보조 컴퓨터에 사용되고 있는 경우(예: `MAV_2_CONFIG` 사용))
- [MAV_1_MODE](../advanced_config/parameter_reference.md#MAV_1_MODE)에서 **NORMAL**로
- 제조업체 권장 전송 속도에 대한 [SER_TEL2_BAUD](../advanced_config/parameter_reference.md#SER_TEL2_BAUD).

이렇게 하면 사용자가 [MAV_CMD_DO_MOUNT_CONTROL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_MOUNT_CONTROL)와 [MAV_CMD_DO_MOUNT_CONFIGURE](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_MOUNT_CONFIGURE)를 사용하여 짐벌에 명령을 실행합니다.


## 비행 콘트롤러의 짐벌(MNT_MODE_OUT=AUX)

짐벌은 출력 모드를 `MNT_MODE_OUT=AUX`로 설정하여 비행 콘트롤러 AUX 포트에 연결할 수 있습니다.

출력 핀을 매핑 정의하려면 믹서 파일이 필요하며, [마운트 믹서](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/mixers/mount.aux.mix)가 자동으로 선택됩니다(이는 기체 설정의 모든 AUX 믹서를 무시합니다).

출력 할당은 다음과 같습니다:
- **AUX1**: 상하 회전각(Pitch)
- **AUX2**: 좌우 회전각(Roll)
- **AUX3**: 방위 회전각(Yaw)
- **AUX4**: 촬영/복귀

### 믹서 구성 사용자 정의

:::tip
믹서 작동 방식과 믹서 파일 형식에 대한 설명은 [믹싱 및 액추에이터](../concept/mixing.md)를 참고하십시오.
:::

출력은 SD 카드에 `etc/mixers/mount.aux.mix` [믹서 파일을 생성](../concept/system_startup.md#starting-a-custom-mixer)하여 사용자가 정의할 수 있습니다.

마운트에 대한 기본 믹서 설정은 다음과 같습니다.

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

Typhoon H480 모델은 사전에 설정된 시뮬레이션 짐벌과 함께 제공됩니다.

실행하려면 다음을 사용하십시오.
```
make px4_sitl gazebo_typhoon_h480
```

다른 모델이나 시뮬레이터에서 마운트 드라이버를 테스트하려면 `vmount start`를 사용하여 드라이버가 실행되는 지 확인한 다음, 해당 매개변수를 설정하십시오.


## 시험
드라이버는 간단한 테스트 명령을 제공합니다. 먼저 `vmount stop`으로 중지합니다. 다음은 SITL에서의 테스트 방법을 설명합니다. 이 명령은 실제 장치에서도 작동합니다.

다음을 사용하여 시뮬레이션을 시작합니다(이를 위해 매개변수를 변경할 필요는 없음).
```
make px4_sitl gazebo_typhoon_h480
```
예를 들어 시동 여부를 확인하십시오. `commander takeoff` 명령어를 실행한 다음, 다음 명령을 사용하여 짐벌(예)을 제어합니다:
```
vmount test yaw 30
```

시뮬레이션된 짐벌은 자체적으로 안정적이므로, MAVLink 명령을 보내는 경우 `stabilize` 플래그를 `false`로 설정합니다.

![Gazebo 짐벌 시뮬레이션](../../assets/simulation/gazebo/gimbal-simulation.png)

