# 카메라 트리거 

카메라 트리거 드라이버를 사용하여 AUX 포트로 카메라를 트리거 펄스를 전송할 수 있습니다.

펄스가 전송되는 것 외에도 시퀀스 번호(즉, 현재 세션의 이미지 시퀀스 번호)와 해당 타임스탬프가 포함 된 MAVLink [CAMERA_TRIGGER](https://mavlink.io/en/messages/common.html#CAMERA_TRIGGER) 메시지가 게시됩니다. 이 타임스탬프는 항공 측량을 위한 타임 스탬프 사진, 다중 카메라 시스템 동기화 또는 시각적 관성 내비게이션을 포함한 여러 응용 프로그램에 사용할 수 있습니다.

카메라는 또한 (선택적으로) 비행 콘트롤러 [카메라 캡처 핀](#camera-capture)을 사용하여 사진 프레임이 촬영되는 정확한 순간을 알릴 수 있습니다. 이를 통하여 지오 태깅을위한 GPS 위치 또는 VIO 동기화를 위한 올바른 IMU 샘플 등에 이미지를 보다 정확하게 매핑할 수 있습니다.

## 트리거 설정

카메라 트리거는 일반적으로 *QGroundControl* [기체 설정 &gt; 카메라](https://docs.qgroundcontrol.com/en/SetupView/Camera.html#px4-camera-setup) 섹션에서 설정합니다.

![Trigger pins](../../assets/camera/trigger_pins.png)

다양한 [트리거 모드](#trigger-modes), [백엔드 인터페이스](#trigger-interface-backends) 및 [하드웨어 설정](#trigger-hardware-configuration)이 아래에 설명되어 있습니다 (이는 [매개 변수](../advanced_config/parameters.md)에서 직접 설정할 수도 있음).

:::note
카메라 모듈이 펌웨어에 자동으로 포함되지 않기 때문에 FMUv2 기반 비행 콘트롤러 (예 : 3DR Pixhawk)의 경우 기본적으로 카메라 설정 섹션을 사용할 수 없습니다. 자세한 내용은 [매개변수 검색/업데이트 &gt; 펌웨어에 없는 매개변수](../advanced_config/parameters.md#parameter-not-in-firmware)를 참고하십시오.
:::

## 트리거 모드

네 가지 모드가 지원되며 [TRIG_MODE](../advanced_config/parameter_reference.md#TRIG_MODE) 매개변수로 설정됩니다.

| 모드 | 설명                                                                                                                              |
| -- | ------------------------------------------------------------------------------------------------------------------------------- |
| 0  | 카메라 트리거가 비활성화됩니다.                                                                                                               |
| 1  | MAVLink 명령 `MAV_CMD_DO_TRIGGER_CONTROL`을 사용하여 활성화 및 비활성화 할 수 있는 기본 간격계처럼 작동합니다. 자세한 내용은 [명령 인터페이스](#command-interface)를 참고하십시오. |
| 2  | 간격계를 계속 켭니다.                                                                                                                    |
| 3  | 거리를 기반으로 트리거합니다. 설정 수평 거리를 초과시 마다 촬영됩니다. 그러나, 두 샷 사이의 최소 시간 간격은 설정된 트리거 간격에 의해 제한됩니다.                                           |
| 4  | 임무 모드에서 비행시 측량은 자동으로 트리거됩니다.                                                                                                    |

:::note
카메라 트리거 앱을 처음 활성화하는 경우 `TRIG_MODE` 매개변수를 변경 후 재부팅하여야 합니다.
:::

## 트리거 하드웨어 설정

GPIO, PWM 또는 Seagull 기반 트리거링 (예 : MAVLink 카메라를 사용하지 않는 경우)에 대한 이미지 캡처를 트리거하는 데 사용 핀은 [TRIG_PINS](../advanced_config/parameter_reference.md#TRIG_PINS) 매개변수에서 설정합니다. 기본값은 56이며, 이는 *FMU* 핀 5 및 6에서 트리거 활성화를 의미합니다.

:::note FMU
및 I/O 보드가 모두있는 Pixhawk 비행 콘트롤러에서 이러한 FMU 핀은 `AUX5`와 `AUX6` (예 : Pixhawk 4, CUAV v5 +)에 매핑됩니다. FMU만 있는 콘트롤러에서는 핀이 `MAIN5`와 `MAIN6`에 매핑됩니다 (예 : Pixhawk 4 mini, CUAV v5 nano). 작성 시점에 트리거링은 FMU 핀에서만 작동합니다. I/O 보드의 핀을 사용하여 카메라를 트리거 할 수 없습니다.
:::

:::warning
`TRIG_PINS=56` (기본값)으로 AUX 핀 1 ~ 4를 액추에이터 출력 (서보/ESC 용)으로 사용할 수 있습니다. `TRIG_PINS=78`을 사용하면 AUX 핀 1-6을 액추에이터 출력으로 사용할 수 있습니다. 다른 핀 조합을 선택할 수 있지만, 다른 FMU 핀을 출력으로 사용할 수 없습니다.
:::

## 트리거 인터페이스 백엔드

카메라 트리거 드라이버는 여러 백엔드를 지원합니다. 각 백엔드는 [TRIG_INTERFACE](../advanced_config/parameter_reference.md#TRIG_INTERFACE) 매개변수에 의해 제어되는 특정 애플리케이션을 위한 것입니다.

| 번호 | 설명                                                                                                                                                                                                                                                                                                                                             |
| -- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1  | GPIO 인터페이스를 활성화합니다. AUX 출력은 [TRIG_INTERVAL](../advanced_config/parameter_reference.md#TRIG_INTERVAL) 시간마다 (`TRIG_POLARITY` 매개변수에 따라) 높거나 낮게 펄스됩니다. 이것은 대부분의 표준 머신비전 카메라를 직접 트리거 할 수 있습니다. PX4FMU 시리즈 하드웨어 (Pixhawk, Pixracer 등)에서 AUX 핀의 신호 레벨은 3.3v입니다.                                                                                       |
| 2  | Seagull MAP2 인터페이스를 활성화합니다. 이를 통해 [Seagull MAP2](http://www.seagulluav.com/product/seagull-map2/)를 사용하여 지원되는 여러 카메라에 연결할 수 있습니다. MAP2의 핀/채널 1 (카메라 트리거) 및 핀/채널 2 (모드 선택기)는 각각 `TRIG_PINS`의 하위 및 상위 AUX 핀에 연결되어야합니다 (따라서 채널/핀 1에서 AUX 기본적으로 채널/핀 2에서 AUX 6으로). Seagull MAP2를 사용하는 PX4는 QX-1과 같은 Sony Multiport 카메라의 자동 전원 제어 및 연결 유지 기능도 지원합니다. |
| 3  | MAVLink 인터페이스를 사용합니다. 이 모드에서는 실제 하드웨어 출력이 사용되지 않습니다. `CAMERA_TRIGGER` MAVLink 메시지는 자동 조종 장치에 의해 전송됩니다 (MAVLink 응용 프로그램이 `온보드` 모드인 경우 기본적으로). 그렇지 않으면, 사용자 정의 스트림을 활성화하여야 합니다.                                                                                                                                                                  |
| 4  | 범용 PWM 인터페이스를 사용합니다. [적외선 트리거](https://hobbyking.com/en_us/universal-remote-control-infrared-shutter-ir-rc-1g.html) 또는 서보가 카메라를 트리거 할 수 있습니다. 트리거 신호는 `TRIG_PINS`를 사용하여 지정된 두 핀에서 복제됩니다.                                                                                                                                                       |

## 기타 매개변수

| 매개변수                                                                       | 설명                                                                                                                          |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| [TRIG_POLARITY](../advanced_config/parameter_reference.md#TRIG_POLARITY)   | GPIO 인터페이스를 사용하는 동안에만 관련됩니다. 트리거 핀의 극성을 설정합니다. 액티브 하이는 핀이 로우로 정상적으로 당겨지고 트리거 이벤트에서 하이로 풀링됨을 의미합니다. 액티브 로우는 반대의 경우도 마찬가지입니다. |
| [TRIG_INTERVAL](../advanced_config/parameter_reference.md#TRIG_INTERVAL)   | 두 개의 연속 트리거 이벤트 사이의 시간을 밀리 초 단위로 정의합니다.                                                                                     |
| [TRIG_ACT_TIME](../advanced_config/parameter_reference.md#TRIG_ACT_TIME) | 트리거 핀이 "활성"상태로 유지되어 중립으로 돌아가기 전의 시간을 밀리 초 단위로 정의합니다. PWM 모드에서는 50Hz PWM 신호에 항상 활성화 펄스를 맞출 수 있도록 최소값이 40ms로 제한됩니다.           |

카메라 트리거 모듈과 관련 전체 매개변수 목록은 [매개변수 참조](../advanced_config/parameter_reference.md#camera-trigger) 페이지를 참고하십시오.

## 카메라 캡처

Cameras can also (optionally) use the flight controller camera capture pin to signal the exact moment when a photo/frame is taken. This allows more precise mapping of images to GPS position for geotagging, or the right IMU sample for VIO synchronization, etc.

Camera capture/feedback is enabled in PX4 by setting [CAM_CAP_FBACK = 1](../advanced_config/parameter_reference.md#CAM_CAP_FBACK). The capture pin used depends on the hardware:

* Pixhawk FMUv5x boards use the board-specific camera capture pin (PI0).
* Other board use FMU PWM pin 6 (hardcoded) for camera capture.

PX4 detects a rising edge with the appropriate voltage level on the camera capture pin (for Pixhawk flight controllers this is normally 3.3V). If the camera isn't outputing an appropriate voltage, then additional circuitry will be required to make the signal compatible.

Cameras that have a hotshoe connector (for connecting a flash) can usually be connected via a hotshoe-adaptor. For example, the [Seagull #SYNC2 Universal Camera Hot Shoe Adapter](https://www.seagulluav.com/product/seagull-sync2/) is an optocoupler that decouples and shifts the flash voltage to the Pixhawk voltage. This slides into the flash slot on the top of the camera. The red and black ouptputs are connected to the servo rail/ground and the white wire is connected to the input capture pin.

![Seagull SYNC#2](../../assets/peripherals/camera_capture/seagull_sync2.png)

:::note PX4 emits the MAVLink [CAMERA_TRIGGER](https://mavlink.io/en/messages/common.html#CAMERA_TRIGGER) message on both camera trigger and camera capture. If camera capture is configured, the timestamp from the camera capture driver is used, otherwise the triggering timestamp.
:::

## Command Interface

**TODO : NEEDS UPDATING updating**

The camera trigger driver supports several commands:

[MAV_CMD_DO_TRIGGER_CONTROL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_TRIGGER_CONTROL) - Accepted in "command controlled" mode (`TRIG_MODE` 1).

트리거 사이클 시간 (밀리 초 단위) (` TRIG_INTERVAL </ 0> 매개 변수 설정)</td>
</tr>
<tr>
  <td>Param #3</td>
  <td>시퀀스 재설정 (이미지 시퀀스 번호를 재설정하려면 1로 설정하고 현재 시퀀스 번호를 유지하려면 0으로 설정)</td>
</tr>
</tbody>
</table>

<p><a href="https://mavlink.io/en/messages/common.html#MAV_CMD_DO_DIGICAM_CONTROL">MAV_CMD_DO_DIGICAM_CONTROL</a> - Accepted in all modes.
This is used by the GCS to test-shoot the camera from the user interface.
The trigger driver does not yet support all camera control parameters defined by the MAVLink spec.</p>

<table>
<thead>
<tr>
  <th>Command Parameter</th>
  <th>Description</th>
</tr>
</thead>
<tbody>
<tr>
  <td>Param #5</td>
  <td>원샷 명령을 트리거합니다 (단일 이미지 프레임을 트리거하려면 1로 설정).</td>
</tr>
</tbody>
</table>

<p><a href="https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAM_TRIGG_DIST">MAV_CMD_DO_SET_CAM_TRIGG_DIST</a> - Accepted in "mission controlled" mode (<code>TRIG_MODE` 4)</p> 

This command is autogenerated during missions to trigger the camera based on survey missions from the GCS.

## Testing Trigger Functionality

1. PX4 콘솔에서 : ```카메라_트리거 테스트```
2. From *QGroundControl*:
    
    Click on **Trigger Camera** in the main instrument panel. 이러한 샷은 위치 정보 태그 지정을 위해 기록되거나 계산되지 않습니다.
    
    ![QGC 테스트 카메라](../../assets/camera/qgc_test_camera.png)

## Sony QX-1 example (Photogrammetry)

![photogrammetry](../../assets/camera/photogrammetry.png)

In this example, we will use a Seagull MAP2 trigger cable to interface to a Sony QX-1 and use the setup to create orthomosaics after flying a fully autonomous survey mission.

### Trigger Settings

The recommended camera settings are:

* `TRIG_INTERFACE=2` (Seagull MAP2).
* `TRIG_MODE=4` (Mission controlled).
* Leave the remaining parameters at their defaults.

You will need to connect the Seagull MAP2 to the auxiliary/FMU pins on your autopilot. Pin 1 goes to `AUX 5`, and Pin 2 to `AUX 6`. The other end of the MAP2 cable will go into the QX-1's "MULTI" port.

### Camera Configuration

We use a Sony QX-1 with a 16-50mm f3.5-5.6 lens for this example.

To avoid autofocus and metering lag when the camera is triggered, the following guidelines should be followed:

* Manual focus to infinity
* Set camera to continuous shooting mode
* Manually set exposure and aperture
* ISO should be set as low as possible
* Manual white balance suitable for scene

### Mission Planning

![QGC Survey Polygon](../../assets/camera/qgc_survey_polygon.jpeg)

![QGC Survey Parameters](../../assets/camera/qgc_survey_parameters.jpg)

### Geotagging

Download/copy the logfile and images from the flight and point QGroundControl to them. Then click on "Start Tagging".

![QGC Geotagging](../../assets/camera/qgc_geotag.png)

You can verify the geotagging using a free online service like [Pic2Map](https://www.pic2map.com/). Note that Pic2Map is limited to only 40 images.

### Reconstruction

We use [Pix4D](https://pix4d.com/) for 3D reconstruction.

![GeoTag](../../assets/camera/geotag.jpg)

## Camera-IMU sync example (VIO)

In this example, we will go over the basics of synchronising IMU measurements with visual data to build a stereo Visual-Inertial Navigation System (VINS). To be clear, the idea here isn't to take an IMU measurement exactly at the same time as we take a picture but rather to correctly time stamp our images so as to provide accurate data to our VIO algorithm.

The autopilot and companion have different clock bases (boot-time for the autopilot and UNIX epoch for companion), so instead of skewing either clock, we directly observe the time offset between the clocks. This offset is added or subtracted from the timestamps in the MAVLink messages (e.g `HIGHRES_IMU`) in the cross-middleware translator component (e.g MAVROS on the companion and `mavlink_receiver` in PX4). The actual synchronisation algorithm is a modified version of the Network Time Protocol (NTP) algorithm and uses an exponential moving average to smooth the tracked time offset. This synchronisation is done automatically if MAVROS is used with a high-bandwidth onboard link (MAVLink mode `onboard`).

For acquiring synchronised image frames and inertial measurements, we connect the trigger inputs of the two cameras to a GPIO pin on the autopilot. The timestamp of the inertial measurement from start of exposure and a image sequence number is recorded and sent to the companion computer (`CAMERA_TRIGGER` message), which buffers these packets and the image frames acquired from the camera. They are matched based on the sequence number (first image frame is sequence 0), the images timestamped (with the timestamp from the `CAMERA_TRIGGER` message) and then published.

The following diagram illustrates the sequence of events which must happen in order to correctly timestamp our images.

![Sequence diag](../../assets/camera/sequence_diagram.jpg)

<!-- Could generate using Mermaid: https://mermaidjs.github.io/mermaid-live-editor
{/% mermaid %/}
sequenceDiagram
  Note right of PX4 : Time sync with mavros is done automatically
  PX4 ->> mavros : Camera Trigger ready
  Note right of camera driver : Camera driver boots and is ready
  camera driver ->> mavros : mavros_msgs::CommandTriggerControl
  mavros ->> PX4 : MAVLink::MAV_CMD_DO_TRIGGER_CONTROL
  loop Every TRIG_INTERVAL milliseconds
  PX4 ->> mavros : MAVLink::CAMERA_TRIGGER
  mavros ->> camera driver : mavros_msgs::CamIMUStamp
  camera driver ->> camera driver : Match sequence number
  camera driver ->> camera driver : Stamp image and publish
end
{/% endmermaid %/}
-->

### Step 1

First, set the TRIG_MODE to 1 to make the driver wait for the start command and reboot your FCU to obtain the remaining parameters.

### Step 2

For the purposes of this example we will be configuring the trigger to operate in conjunction with a Point Grey Firefly MV camera running at 30 FPS.

* `TRIG_INTERVAL`: 33.33 ms
* `TRIG_POLARITY`: 0 (active low)
* `TRIG_ACT_TIME`: 0.5 ms. The manual specifies it only has to be a minimum of 1 microsecond.
* `TRIG_MODE`: 1, because we want our camera driver to be ready to receive images before starting to trigger. This is essential to properly process sequence numbers.
* `TRIG_PINS`: 56, Leave default.

### Step 3

Wire up your cameras to your AUX port by connecting the ground and signal pins to the appropriate place.

### Step 4

You will have to modify your driver to follow the sequence diagram above. Public reference implementations for [IDS Imaging UEye](https://github.com/ProjectArtemis/ueye_cam) cameras and for [IEEE1394 compliant](https://github.com/andre-nguyen/camera1394) cameras are available.