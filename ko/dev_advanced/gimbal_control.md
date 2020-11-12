# 짐벌 제어 설정

If you want to control a gimbal with a camera (or any other payload) attached to the vehicle, you need to configure how you want to control it and how PX4 can command it. 여기서는 이 설정에 관해 설명합니다.

PX4 contains a generic mount/gimbal control driver with different input and output methods.
- The input defines how you control the gimbal: via RC or via MAVLink commands (for example in missions or surveys).
- The output defines how the gimbal is connected: some support MAVLink commands, others use PWM (described as AUX output in the following). Any input method can be selected to drive any output. 두 방식 모두 매개변수를 통해 구성되어야 합니다.

## 매개변수

[These parameters](../advanced/parameter_reference.md#mount) are used to setup the mount driver.

The most important ones are the input ([MNT_MODE_IN](../advanced/parameter_reference.md#MNT_MODE_IN)) and the output ([MNT_MODE_OUT](../advanced/parameter_reference.md#MNT_MODE_OUT)) mode. 초기 값으로 입력은 활성화되어 있지 않고 드라이버도 작동하지 않습니다. After selecting the input mode, reboot the vehicle so that the mount driver starts.

If the input mode is set to `AUTO`, the mode will automatically be switched based on the latest input. To switch from MAVLink to RC, a large stick motion is required.

## AUX 출력

출력 할당은 다음과 같습니다:

출력은 [믹서 파일 만들기](../concept/system_startup.md#starting-a-custom-mixer)로 원하는 데로 변경이 가능하며, SD 카드의 `etc/mixers/mount.aux.mix`에 있습니다.

A common configuration is to have a serial connection to the gimbal from the Flight Controller TELEM2 port (assuming TELEM2 is free). For this configuration you would set:
- [MAV_1_CONFIG](../advanced/parameter_reference.md#MAV_1_CONFIG) to **TELEM2** (if `MAV_1_CONFIG` is already used for a companion computer (say), use `MAV_2_CONFIG`).
- **AUX4**: 셔터/원상복귀
- [SER_TEL2_BAUD](../advanced/parameter_reference.md#SER_TEL2_BAUD) to manufacturer recommended baude rate.

This will enable the user to command the gimbal using [MAV_CMD_DO_MOUNT_CONTROL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_MOUNT_CONTROL) and [MAV_CMD_DO_MOUNT_CONFIGURE](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_MOUNT_CONFIGURE).


## Gimbal on Flight Controller (MNT_MODE_OUT=AUX)

To just test the mount driver on other models or simulators, make sure the driver runs, using `vmount start`, then configure its parameters.

If the output mode is set to `AUX`, a mixer file is required to define the mapping for the output pins and the [mount mixer](https://github.com/PX4/Firmware/blob/master/ROMFS/px4fmu_common/mixers/mount.aux.mix) is automatically selected (overriding any aux mixer provided by the airframe configuration).

The output assignment is as following:
- **AUX1**: Pitch
- **AUX2**: Roll
- **AUX3**: Yaw
- **AUX4**: Shutter/retract

### 믹서 구성 맞춤설정

> **주의** 믹서의 작동 및 믹서 파일의 형식에 대한 설명은 [혼합과 구동기](../concept/mixing.md)를 보세요.

The outputs can be customized by [creating a mixer file](../concept/system_startup.md#starting-a-custom-mixer) on the SD card named `etc/mixers/mount.aux.mix`.

설치를 위한 기본 믹서 구성은 아래과 같습니다.

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

Typhoon H480 모델은 미리 설정모의된 짐벌과 함께 제공됩니다.

To run it, use:
```
make px4_sitl gazebo_typhoon_h480
```

To just test the mount driver on other models or simulators, make sure the driver runs (using `vmount start`), then configure its parameters.


## 시험하기
이 드라이버는 간단한 시험 명령어를 제공하는데 먼저 `vmount stop`으로 정지시킵니다. 아래는 SITL에서의 시험 방법에 대한 설명이지만, 실제 장비에서도 이 명령어들은 작동합니다.

매개변수가 변경될 필요는 없습니다. 아래 명령어로 시뮬레이션을 시작합니다.
```
make px4_sitl gazebo_typhoon_h480
```
Armed되어 있는지 확인하세요. 예를 들면, `commander takeoff`를 입력하고 아래 명령어를 사용합니다.
```
vmount test yaw 30
```

주의할 것은 모의된 짐벌은 자동으로 안정화되므로 Mavlink 명령어들을 통해 `stabilize` 플래그를 false로 설정하세요.

![Gazebo 짐벌 모의](../../assets/simulation/gazebo/gimbal-simulation.png)

