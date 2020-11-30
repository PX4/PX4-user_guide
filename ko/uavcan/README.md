# UAVCAN 소개

![UAVCAN 로고](../../assets/uavcan/uavcan_logo_transparent.png)

[UAVCAN](http://uavcan.org)는 보드상에서 처리하는 네트워크로 자동 항법 장치를 항공 전자장비에 연결할 수 있게 합니다. 다음 하드웨어를 지원합니다:

* 모터 컨트롤러
  * [Zubax Orel 20](https://zubax.com/product/zubax-orel-20)

    > **Note** [Sapog Firmware](https://github.com/px4/sapog)(오픈소스)를 실행합니다. [Sapog Reference Hardware](https://github.com/PX4/Hardware/tree/master/sapog_reference_hardware)에 기반합니다.
* 항속 센서
  * [Thiemar 항속 센서](https://github.com/thiemar/airspeed)
* GPS 및 GLONASS용 GNSS 리시버
  * [Zubax GNSS](https://zubax.com/products/gnss_2)
* 전력량계
  * [Pomegranate Systems 전원 모듈](../power_module/pomegranate_systems_pm.md)
  * [CUAV CAN PMU 전원 모듈](../power_module/cuav_can_pmu.md)

취미 활용 수준의 장치와는 달리, 이들 장치는 기복이 있는 차분 신호처리를 활용하며, 버스를 통한 펌웨어 업그레이드 기능을 지원합니다. 모든 모터 제어부에는 상태 피드백 기능을 제공하고 지상 지향 제어(FOC) 기능을 구현했습니다.

> **Note** PX4에서는 UAVCAN 노드 할당 및 펌웨어 업그레이드 기능을 활용하려면 SD카드가 필요합니다. 비행중에 UAVCAN으로 사용하는 기능이 아닙니다.

## 초기 설정

다음 설명을 통해 쿼드콥터로의 ESC 장비와 GPS의 UAVCAN 연결 및 설정 방법을 단계별로 안내합니다. 선택한 하드웨어는  Pixhawk 2.1, Zubax Orel 20 ESCs, Zubax GNSS GPS 입니다.

### 결선

처음 단계에서 할 일은 UAVCAN을 활성화한 모든 장치와 비행 제어 장치의 연결입니다. 다음 그림은 모든 부품에 대한 결선 방법을 보여줍니다. 여기서 활용하는 Zubax 장치는 모두 두번째 버스를 옵션으로 달고 있지만 이를 통해 연결 신뢰성을 개선하는 이중 CAN 인터페이스를 지원합니다.

![UAVCAN 결선](../../assets/uavcan/uavcan_wiring.png)

일부 장치(예: Zubax Orel 20\)의 경우 외부 전원 공급 장치가 필요하며 나머지\(예: Zubax GNSS\)는 CAN 연결로 자체 전원을 공급받을 수 있음을 참고할 필요가 있습니다. 설정을 계속 진행하기 전 하드웨어 문서를 참고하십시오.

### 펌웨어 설치

그 다음, [UAVCAN 설정](../uavcan/node_enumeration.md)의 지침에 따라 펌웨어에서 UAVCAN 기능을 켜십시오. 전원을 끊은 후 다시 연결하십시오. 전원 재인가 후, Orel 20 ESC의 모터에서 비프음을 내어 확인하는 방식으로 UAVCAN 장치를 찾아내야합니다. 이 과정이 끝나야 일반 설치 및 보정 과정으로 계속 진행할 수 있습니다.

사용 하드웨어에 따라, UAVCAN 장치의 펌웨어 업데이트를 진행할 여건이 갖춰집니다. UAVCAN 자체와 PX4 펌웨어로 처리가 가능합니다. 자세한 내용은 [UAVCAN 펌웨어](../uavcan/node_firmware.md)의 절차를 참고 하십시오.

## 노드 펌웨어 업그레이드

PX4 미들웨어에서는 UAVCAN 노드에 일치하는 펌웨어를 받았을 경우 자동으로 업그레이드합니다. 절차와 요구사항은 [UAVCAN 펌웨어](../uavcan/node_firmware.md) 페이지에 있습니다.

## 모터 컨트롤러 기수 부여 및 설정

ID와 각 모터 컨트롤러의 회전 방향은 간단한 설치 루틴에서 설치 과정을 마친 후 할당할 수 있습니다: [UAVCAN 노드 기수 부여](../uavcan/node_enumeration.md). QGroundControl에서 사용자가 루틴 실행을 시작할 수 있습니다.

## 참고할만한 링크

* [홈페이지](http://uavcan.org)
* [상세사양](https://uavcan.org/specification/)
* [구현 및 자습서](http://uavcan.org/Implementations)



