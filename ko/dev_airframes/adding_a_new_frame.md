# 신규 기체 구성 추가

PX4는 고정된 기체 구성을 기체의 시작점으로 사용합니다. 구성은 [ROMFS/px4fmu_common/init.d](https://github.com/PX4/PX4-Autopilot/tree/master/ROMFS/px4fmu_common/init.d) 폴더에 저장된 [구성 파일](#config-file)에 정의됩니다. 구성 파일은 시스템의 물리적 구성을 설명하고 [ROMFS/px4fmu_common/mixers](https://github.com/PX4/PX4-Autopilot/tree/master/ROMFS/px4fmu_common/mixers) 폴더에 저장되는 [믹서 파일](#mixer-file)을 참조합니다.

구성을 추가하는 것은 간단합니다. [init.d/airframes 폴더](https://github.com/PX4/PX4-Autopilot/tree/master/ROMFS/px4fmu_common/init.d/airframes)에 새 구성 파일을 만들고(파일 이름 앞에 사용하지 않은 자동 시작 ID 추가), 새 기체 구성 파일의 이름을 <1 관련 섹션에서 >CMakeLists.txt</a>를 찾은 다음 소프트웨어를 [빌드 및 업로드](../dev_setup/building_px4.md)합니다.

자체 구성을 만들고 싶지 않은 개발자는 [맞춤 시스템 시작](../concept/system_startup.md) 페이지에 설명된 대로 microSD 카드의 텍스트 파일을 사용하여 기존 구성을 맞춤 설정할 수 있습니다.

:::note
구성 파일에서 설정하는 매개변수를 결정하려면, 먼저 일반 기체를 할당하고 차량을 조정한 다음 [`param show-for-airframe`](../modules/modules_command.md#param)을 사용하여 변경된 매개변수를 나열합니다.
:::

## 구성 파일 개요

구성 파일과 믹서 파일의 구성은 몇 가지 주요 블록으로 이루어집니다.

* 기체 문서([기체 정의서](../airframes/airframe_reference.md) 및 *QGroundControl*에서 사용됨).
* [튜닝 게인](#tuning-gains)을 포함한 차량 매개변수 설정.
* 시작해야 하는 컨트롤러 및 앱(예: 멀티콥터 또는 고정익 컨트롤러, 지면 탐지기 등)
* 시스템 물리적 구성(예: 비행기, 날개 또는 멀티콥터). 이것을 [믹서](../concept/mixing.md)라고 합니다.

이러한 측면은 대부분 독립적이므로, 많은 구성이 기체의 동일한 물리적 레이아웃을 공유하고 동일한 응용 프로그램을 시작하며 튜닝 이득이 가장 차이가 납니다.

:::note
새 기체 파일은 클린 빌드(`make clean` 실행) 이후에만, 빌드 시스템에 자동으로 추가됩니다.
:::

<a id="config-file"></a>

### 설정 파일

일반적인 구성 파일은 아래와 같습니다([원본 파일은 여기](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/init.d/airframes/3033_wingwing)).

첫 번째 섹션은 기체 문서입니다. 이것은 [기체 정의서](../airframes/airframe_reference.md)와 *QGroundControl*에서 사용됩니다.
```bash
#!/bin/sh
#
# @name Wing Wing (aka Z-84) Flying Wing
#
# @url https://docs.px4.io/master/en/frames_plane/wing_wing_z84.html
#
# @type Flying Wing
# @class Plane
#
# @output MAIN1 left aileron
# @output MAIN2 right aileron
# @output MAIN4 throttle
#
# @output AUX1 feed-through of RC AUX1 channel
# @output AUX2 feed-through of RC AUX2 channel
# @output AUX3 feed-through of RC AUX3 channel
#
# @maintainer Lorenz Meier <lorenz@px4.io>
#
# @board px4_fmu-v2 exclude
# @board bitcraze_crazyflie exclude
#
```

다음 섹션은 [튜닝 게인](#tuning-gains)을 포함하여, 차량 매개변수를 지정합니다.
```bash
. ${R}etc/init.d/rc.fw_defaults

param set-default BAT_N_CELLS 2
param set-default FW_AIRSPD_MAX 15
param set-default FW_AIRSPD_MIN 10
param set-default FW_AIRSPD_TRIM 13
param set-default FW_R_TC 0.3
param set-default FW_P_TC 0.3
param set-default FW_L1_DAMPING 0.74
param set-default FW_L1_PERIOD 16
param set-default FW_LND_ANG 15
param set-default FW_LND_FLALT 5
param set-default FW_LND_HHDIST 15
param set-default FW_LND_HVIRT 13
param set-default FW_LND_TLALT 5
param set-default FW_THR_LND_MAX 0
param set-default FW_PR_FF 0.35
param set-default FW_RR_FF 0.6
param set-default FW_RR_P 0.04

param set-default PWM_MAIN_DISARM 1000
```

기체 유형 설정([MAV_TYPE](https://mavlink.io/en/messages/common.html#MAV_TYPE)):
```bash
# Configure this as plane
set MAV_TYPE 1
```

사용할 [믹서](#mixer-file) 설정:
```bash
# Set mixer
set MIXER wingwing
```

PWM 출력을 구성합니다(구동/활성화할 출력 및 레벨 지정).
```bash
set PWM_OUT 4
```

:::warning
If you want to reverse a channel, never do this on your RC transmitter or with e.g `RC1_REV`. The channels are only reversed when flying in manual mode, when you switch in an autopilot flight mode, the channels output will still be wrong (it only inverts your RC signal). Thus for a correct channel assignment change either your PWM signals with `PWM_MAIN_REV1` (e.g. for channel one) or change the signs of the output scaling in the corresponding mixer (see below).
:::

<a id="mixer-file"></a>

### Mixer File

:::note
First read [Concepts > Mixing](../concept/mixing.md). This provides background information required to interpret this mixer file.
:::

A typical mixer file is shown below ([original file here](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/mixers/wingwing.main.mix)). A mixer filename, in this case `wingwing.main.mix`, gives important information about the type of airframe (`wingwing`), the type of output (`.main` or `.aux`) and lastly that it is a mixer file (`.mix`).

The mixer file contains several blocks of code, each of which refers to one actuator or ESC. So if you have e.g. two servos and one ESC, the mixer file will contain three blocks of code.

:::note
The plugs of the servos / motors go in the order of the mixers in this file.
:::

So MAIN1 would be the left aileron, MAIN2 the right aileron, MAIN3 is empty (note the Z: zero mixer) and MAIN4 is throttle (to keep throttle on output 4 for common fixed wing configurations).

A mixer is encoded in normalized units from -10000 to 10000, corresponding to -1..+1.

```
M: 2
O:      10000  10000      0 -10000  10000
S: 0 0  -6000  -6000      0 -10000  10000
S: 0 1   6500   6500      0 -10000  10000
```

For a new airframe belonging to an existing group, you don't need to do anything more than provide documentation in the airframe description located at [ROMFS/px4fmu_common/init.d](https://github.com/PX4/Firmware/tree/master/ROMFS/px4fmu_common/init.d).

* M: Indicates two scalers for two control inputs. It indicates the number of control inputs the mixer will receive.
* O: Indicates the output scaling (*1 in negative, *1 in positive), offset (zero here), and output range (-1..+1 here).
  * If you want to invert your PWM signal, the signs of the output scalings have to be changed.
    ```
    (<code>O:      -10000  -10000      0 -10000  10000</code>)
    ```
)
    </code>
  * This line can (and should) be omitted completely if it specifies the default scaling: `O:      10000  10000   0 -10000  10000`
    ```
    O:      10000  10000   0 -10000  10000
    ```
* S: Indicates the first input scaler: It takes input from control group #0 (Flight Control) and the first input (roll). It scales the roll control input * 0.6 and reverts the sign (-0.6 becomes -6000 in scaled units). It applies no offset (0) and outputs to the full range (-1..+1)
* S: Indicates the second input scaler: It takes input from control group #0 (Flight Control) and the second input (pitch). It scales the pitch control input * 0.65. It applies no offset (0) and outputs to the full range (-1..+1)

:::note
In short, the output of this mixer would be SERVO = ( (roll input \* -0.6 + 0)  \* 1 + (pitch input \* 0.65 + 0)  \* 1 ) \* 1 + 0
:::

Behind the scenes, both scalers are added, which for a flying wing means the control surface takes maximum 60% deflection from roll and 65% deflection from pitch.

To make a new airframe available for section in the *QGroundControl* [airframe configuration](https://docs.px4.io/en/config/airframe.html):


```bash
Delta-wing mixer for PX4FMU
===========================

Designed for Wing Wing Z-84

This file defines mixers suitable for controlling a delta wing aircraft using
PX4FMU. The configuration assumes the elevon servos are connected to PX4FMU
servo outputs 0 and 1 and the motor speed control to output 3. Output 2 is
assumed to be unused.

Inputs to the mixer come from channel group 0 (vehicle attitude), channels 0
(roll), 1 (pitch) and 3 (thrust).

See the README for more information on the scaler format.

Elevon mixers
-------------
Three scalers total (output, roll, pitch).

The scaling factor for roll inputs is adjusted to implement differential travel
for the elevons.

This first block of code is for Servo 0...

M: 2
O:      10000  10000      0 -10000  10000
S: 0 0  -6000  -6000      0 -10000  10000
S: 0 1   6500   6500      0 -10000  10000

And this is for Servo 1...

M: 2
O:      10000  10000      0 -10000  10000
S: 0 0  -6000  -6000      0 -10000  10000
S: 0 1  -6500  -6500      0 -10000  10000

Note that in principle, you could implement left/right wing asymmetric mixing, but in general the two blocks of code will be numerically equal, and just differ by the sign of the third line (S: 0 1), since to roll the plane, the two ailerons must move in OPPOSITE directions.
The signs of the second lines (S: 0 0) are indentical, since to pitch the plane, both servos need to move in the SAME direction.

Output 2
--------
This mixer is empty.

Z:

Motor speed mixer
-----------------
Two scalers total (output, thrust).

This mixer generates a full-range output (-1 to 1) from an input in the (0 - 1)
range.  Inputs below zero are treated as zero.

M: 1
O:      10000  10000      0 -10000  10000
S: 0 3      0  20000 -10000 -10000  10000

```

## Adding a New Airframe Group

Airframe "groups" are used to group similar airframes for selection in [QGroundControl](https://docs.qgroundcontrol.com/en/SetupView/Airframe.html) and in the *Airframe Reference* documentation ([PX4 DevGuide](../airframes/airframe_reference.md) and [PX4 UserGuide](../airframes/airframe_reference.md)). Every group has a name, and an associated svg image which shows the common geometry, number of motors, and direction of motor rotation for the grouped airframes.

The airframe metadata files used by *QGroundControl* and the documentation source code are generated from the airframe description, via a script, using the build command: `make airframe_metadata`

For a new airframe belonging to an existing group, you don't need to do anything more than provide documentation in the airframe description located at [ROMFS/px4fmu_common/init.d](https://github.com/PX4/PX4-Autopilot/tree/master/ROMFS/px4fmu_common/init.d).

If the airframe is for a **new group** you additionally need to:
1. Add the svg image for the group into user guide documentation (if no image is provided a placeholder image is displayed): [assets/airframes/types](https://github.com/PX4/px4_user_guide/tree/master/assets/airframes/types)
1. Add a mapping between the new group name and image filename in the [srcparser.py](https://github.com/PX4/Firmware/blob/master/Tools/px4airframes/srcparser.py) method `GetImageName()` (follow the pattern below): def GetImageName(self): """ Get parameter group image base name (w/o extension) """ if (self.name == "Standard Plane"): return "Plane" elif (self.name == "Flying Wing"): return "FlyingWing" ... ...
   ```
   def GetImageName(self):
       """
       Get parameter group image base name (w/o extension)
       """
       if (self.name == "Standard Plane"):
           return "Plane"
       elif (self.name == "Flying Wing"):
           return "FlyingWing"
        ...
    ...
       return "AirframeUnknown"
   ```
1. Update *QGroundControl*:
   * Add the svg image for the group into: [src/AutopilotPlugins/Common/images](https://github.com/mavlink/qgroundcontrol/tree/master/src/AutoPilotPlugins/Common/Images)
   * Add reference to the svg image into [qgcimages.qrc](https://github.com/mavlink/qgroundcontrol/blob/master/qgcimages.qrc), following the pattern below:
     ```
     <qresource prefix="/qmlimages">
        ...
        <file alias="Airframe/AirframeSimulation">src/AutoPilotPlugins/Common/Images/AirframeSimulation.svg</file>
        <file alias="Airframe/AirframeUnknown">src/AutoPilotPlugins/Common/Images/AirframeUnknown.svg</file>
        <file alias="Airframe/Boat">src/AutoPilotPlugins/Common/Images/Boat.svg</file>
        <file alias="Airframe/FlyingWing">src/AutoPilotPlugins/Common/Images/FlyingWing.svg</file>
        ...
     ```
:::note
The remaining airframe metadata should be automatically included in the firmware (once **srcparser.py** is updated).
:::


## Tuning Gains

The following topics explain how to tune the parameters that will be specified in the config file:

* [Multicopter PID Tuning Guide](../config_mc/pid_tuning_guide_multicopter.md)
* [Fixed Wing PID Tuning Guide](../config_fw/pid_tuning_guide_fixedwing.md)
* [VTOL Configuration](../config_vtol/README.md)


## Add New Airframe to QGroundControl

To make a new airframe available for section in the *QGroundControl* [airframe configuration](../config/airframe.md):

1. Make a clean build (e.g. by running `make clean` and then `make px4_fmu-v5_default`)
1. Open QGC and select **Custom firmware file...** as shown below:

  ![QGC flash custom firmware](../../assets/gcs/qgc_flash_custom_firmware.png)

  You will be asked to choose the **.px4** firmware file to flash (this file is a zipped JSON file and contains the airframe metadata).
1. Navigate to the build folder and select the firmware file (e.g. **Firmware/build/px4_fmu-v5_default/px4_fmu-v5_default.px4**).
1. Press **OK** to start flashing the firmware.
1. Restart *QGroundControl*.

The new airframe will then be available for selection in *QGroundControl*.
