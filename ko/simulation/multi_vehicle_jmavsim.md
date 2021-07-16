# JMAVSim 다중 차량 시뮬레이션

이 항목에서는 JMAVSim과 SITL을 사용하여 다중 UAV(멀티콥터) 차량을 시뮬레이션 방법을 설명합니다. 모든 차량 인스턴스는 시뮬레이션의 동일한 위치에서 시작합니다.

:::tip PX4 다중 차량을 시뮬레이션하는 가장 편리한 방법입니다. *QGroundControl*(또는 [MAVSDK](https://mavsdk.mavlink.io/) 등)에서 다중 차량 지원을 테스트하는 데 적합합니다. [Gazebo를 사용한 다중 차량 시뮬레이션](../simulation/multi-vehicle-simulation.md)은 많은 차량이 있는 무리 시뮬레이션이나 Gazebo에서만 지원되는 컴퓨터 비전과 같은 기능을 테스트하는 데 사용하여야 합니다.
:::


## 다중 인스턴스 시작 방법

다중 인스턴스를 시작하려면(별도의 포트에서):

1. PX4를 빌드합니다.
   ```
   make px4_sitl_default
   ```
1. 시작할 인스턴스 수를 지정하여 **sitl_multiple_run.sh**를 실행합니다(예: 2):
   ```
   ./Tools/sitl_multiple_run.sh 2
   ```
1. 첫 번째 인스턴스를 시작합니다.
   ```
   ./Tools/jmavsim_run.sh -l
   ```
1. 인스턴스에 대한 *시뮬레이션* TCP 포트를 지정하여 후속 인스턴스를 시작합니다.
   ```
   ./Tools/jmavsim_run.sh -p 4561 -l
   ```
   포트는 `[0, N-1]`의 `i`에 대하여 `4560+i`로 설정되어야 합니다.

*QGroundControl*과 같은 지상국은 PX4의 원격 UDP 포트 `14550`에서 모든 차량 인스턴스를 수신 대기합니다(모든 GCS 트래픽은 *동일한* 원격 포트로 전송됩니다).

*MAVSDK* 또는 *MAVROS*와 같은 개발자 API는 `14540`(첫 번째 인스턴스)에서 `14549</1까지 순차적으로 할당된 PX4 원격 UDP 포트에서 수신 대기합니다.
추가 인스턴스 <em x-id="3">모두</em>는 <code>14549` 포트에 연결됩니다.

## 추가 자료

* 포트 설정에 대한 자세한 내용은 [시뮬레이션](../simulation/README.md)을 참고하십시오.
