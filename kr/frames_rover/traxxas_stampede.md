# Traxxas Stampede VXL

이 비행체는 Pixhawk가 휠이 장착된 플랫폼에서 어떻게 사용될 수 있는지 보여주기 위해서 선택되었습니다. 매우 대중적이고 RC 커뮤니티에서 브랜드 인지도가 아주 높기 때문에 Traxxas를 선택하게 되었습니다. autopilot으로 휠이 달린 UGV를 쉽게 제어할 수 있는 플랫폼이라는 것이 아이디어입니다.

{% youtube %}https://youtu.be/N3HvSKS3nCw{% endyoutube %}

![Traxxas Stampede VXL](../../assets/airframes/experimental/stampede/stampede.jpg)

## 부품 목록

  * [Traxxas Stampede](https://traxxas.com/products/models/electric/stampede-vxl-tsm) 상단 플라스틱 커버를 제외하고 여기 모든 것이 사용
  * [Pixhawk Mini](https://store.3dr.com/products/3dr-pixhawk)
  * [Power Module](https://store.3dr.com/products/10s-power-module)
  * [Telemetry Module (EU)](https://store.3dr.com/products/433-mhz-telemetry-radio) US 버전은 해당 사이트에서 가능
  * [Spektrum Dxe Controller](http://www.spektrumrc.com/Products/Default.aspx?ProdId=SPM1000) 혹은 다른 PX4 호환 리모트 콘트롤러
  * [Spektrum Quad Race Serial Receiver w/Diversity](http://www.spektrumrc.com/Products/Default.aspx?ProdID=SPM4648)
  * [PX4Flow](https://pixhawk.org/modules/px4flow)


## 조립

모든 autopilot 부품을 연결할 수 있는 나무 프레임으로 구성되어 있습니다. 테스트에서는 Pixhawk와 Flow 모듈을 위해서 진동을 더 잘 차단할 수 있는 것이 사용되었습니다.

![Stampede Chassis](../../assets/airframes/experimental/stampede/stampede_chassis.jpg)

![Wooden Panel Top](../../assets/airframes/experimental/stampede/panel_top.jpg)

![Wooden Panel Bottom](../../assets/airframes/experimental/stampede/panel_bottom.jpg)

![Traxxas Stampede Final Assembly](../../assets/airframes/experimental/stampede/final_assembly.jpg)

![Side View Final Assembly](../../assets/airframes/experimental/stampede/final_side.jpg)

![Wodden panel fixture](../../assets/airframes/experimental/stampede/mounting_detail.jpg)

특수 마운팅을 위해서 상단 판을 붙이기 위해서 rover와 함께 제공된 clip을 사용하기로 결정했습니다. 이를 위해 3D 프린팅을 사용하였고 CAD 파일은 [다음](https://github.com/PX4/Devguide/raw/master/assets/airframes/experimental/stampede/plane_holders.zip)과 같습니다.

> **Warning** 트레이닝 모드에서 ESC를 설정은 파워를 50% 줄여닌 것을 **강력 추천** 합니다.


## Output connections

| PWM Output | Rate | Actuator |
| -- | -- | -- |
| MAIN1 | 50 Hz | Not connected |
| MAIN2 | 50 Hz | Steering servo |
| MAIN3 | 50 Hz | Not Connected |
| MAIN4 | 50 Hz | ESC input |
| MAIN5 | 50 Hz | Not Connected |
| MAIN6 | 50 Hz | Not Connected |
| MAIN7 | 50 Hz | Not Connected |
| MAIN8 | 50 Hz | Not Connected |

## Simulation

알고리즘을 테스트하기 위해서 시뮬레이션을 사용합니다. 다음과 같이 Firmware 폴더에서 실행할 수 있습니다.

 ```sh
 make posix gazebo-rover
 ```

 보다 자세한 내용은 [Gazebo Simulation](../simulation/gazebo.md)을 참고하세요.

## 사용
현재 PX4는 RC 리모트가 연결되는 경우 MISSION과 MANUAL 모드를 지원합니다. mission 모드를 사용하기 위해서 가장 먼저 QGC와 연결된 비행체에 새로운 mission을 업로드합니다. 다음으로 ARMING하기 전에, `MISSION`을 선택하고 arm을 수행합니다.

> **Warning** 일반적인 waypoint로 **만** mission을 설정할 수 있다는 것이 **_매우 중요_** 합니다. (예로 **TAKEOFF WAYPOINTS가 없음**) 그리고 제대로 수행하기 위해서는 **모든 WAYPOINT의 높이를 0으로 설정** 해야하는 것이 핵심입니다. 이렇게 하지 않으면 rover가 waypoint 주변을 계속 회전하게 됩니다.

올바른 미션 셋업 방법은 다음과 같습니다.

![mission](../../assets/airframes/experimental/stampede/correct_mission.jpg)

현재 개발 상태에서는 장애물 회피가 없습니다. 먼저 소프트웨어 사용법을 익히기 위해서 시뮬레이터로 mission을 테스트하는 것을 추천합니다.


## 펌웨어 만들기
펌웨어를 만들기 위해서 터미널을 사용해야합니다.(QGC는 아직 지원하지 않음) [Building the Code section](../setup/building_px4.md) 지시를 따라서 진행하며 다음과 같이 실행하여 업로드합니다.

```sh
cd ~/src/Firmware
make px4fmu-v2_default upload
```

## Parameters

현재 소프트웨어는 attitude 제어기와 position 제어기를 제공합니다. GPS 좌표(실제 혹은 가짜)를 따라 Ackerman steered 비행체를 이동시키기 위해서 고정익 프레임워크의 윗부분에 설치. 이를 위해 2 PID가 구현되어 있는데 steering과 속도에 각각 하나씩 입니다.
다음과 같은 일반 파라미터를 설정해서 시작시킬 수 있습니다. QGC로 설정할 수 있습니다. (방법은 [여기](https://docs.qgroundcontrol.com/en/SetupView/Parameters.html)참조):
* SYS_AUTOSTART 50002
* MAV_TYPE 10
* MIS_LTRMIN_ALT 0.01
* MIS_TAKEOFF_ALT 0.01

이제 Traxxas Stampede VXL를 위해 설정한 Pixhawk를 시작시킬 수 있습니다. steering 제어기는 다음 파라미터로 튜닝할 수 있습니다. :
* GND_WR_D 0.1
* GND_WR_I 0.01
* GND_WR_IMAX 0.1
* GND_WR_P 1.5

closed loop 속도 제어는 다음을 설정해서 가능합니다 :
* GND_SP_CTRL_MODE 1

다음 파라미터를 이용하면 두번째 PID를 사용해서 속도를 제어할 수 있습니다 :
* GND_SPEED_D 5
* GND_SPEED_I 0.01
* GND_SPEED_IMAX 0.5
* GND_SPEED_P 2.0
* GND_SPEED_THR_SC 0.1
* GND_SPEED_TRIM 4

만약 closed loop이 활성화되면 속도 제어기는 target 속도로 GND_SPEED_TRIM을 가지고 이를 추적할 수 있습니다. 반면에 GND_SP_CTRL_MODE가 0으로 설정되는 경우, 속도 제어기는 throttle의 안전 open loop 셋팅으로 전환될 것입니다. 다음 파라미터로 제어 :
* GND_THR_CRUISE 0.1
* GND_THR_IDLE 0
* GND_THR_MAX 0.5
* GND_THR_MIN 0

다음으로 일반 navigation 파라미터들은 더 사용성이 좋게 튜닝할 수 있습니다 :
* GND_L1_DIST 3
* NAV_ACC_RAD 0.5
