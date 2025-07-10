---
canonicalUrl: https://docs.px4.io/main/ko/uavcan/README
---

# UAVCAN

<img style="float:right; width: 200px ; padding: 10px;" src="../../assets/uavcan/uavcan_logo_transparent.png" alt="UAVCAN 로고" /> [UAVCAN](http://uavcan.org)은 자동조종장치가 주변 장치에 연결하는 온보드 네트워크입니다. 견고한 차동 신호를 사용하고 버스를 통한 펌웨어 업그레이드와 주변 장치의 상태 피드백을 지원합니다.

:::note PX4는 UAVCAN 노드 할당 및 펌웨어 업그레이드를 위해 SD 카드가 필요합니다. UAVCAN은 비행중에는 사용되지 않습니다.
:::

## 지원 하드웨어

아래와 같은 하드웨어를 지원합니다:

- [ESC/모터 콘트롤러](../uavcan/escs.md)
- 항속 센서
  - [Thiemar 항속 센서](https://github.com/thiemar/airspeed)
- GPS 및 GLONASS용 GNSS 수신기
  - [Zubax GNSS](https://zubax.com/products/gnss_2)
  - [Zubax GNSS](https://zubax.com/products/gnss_2)
- 전원 모니터
  - [Pomegranate 시스템 전원 모듈](../power_module/pomegranate_systems_pm.md)
  - [CUAV CAN PMU 전원 모듈](../power_module/cuav_can_pmu.md)
- 거리 센서
  - [Ark Flow](ark_flow.md)
  - [Avionics Anonymous Laser Altimeter UAVCAN 인터페이스](../uavcan/avanon_laser_interface.md)
- 광류
  - [Ark Flow](ark_flow.md)


:::note PX4는 UAVCAN 서보를 지원하지 않습니다(작성 시). 선택한 하드웨어는  Pixhawk 2.1, Zubax Orel 20 ESCs, Zubax GNSS GPS 입니다.


## 배선

모든 UAVCAN 구성 요소는 동일한 연결 아키텍처를 공유하거나 동일한 방식으로 배선됩니다. 모든 온보드 UAVCAN 장치를 체인에 연결하고 버스가 끝 노드에서 종료되었는지 확인합니다(노드가 연결/체인된 순서는 중요하지 않음).

다음 다이어그램은 [UAVCAN 모터 컨트롤러(ESC)](../uavcan/escs.md) 및 UAVCAN GNSS에 연결된 비행 콘트롤러의 경우 이를 보여줍니다.

![UAVCAN 배선](../../assets/uavcan/uavcan_wiring.png)

다이어그램에는 전원 배선이 표시되지 않았습니다. 구성 요소에 별도의 전원이 필요 여부와 CAN 버스 자체에서 전원을 공급 여부를 확인하려면 제조업체 지침을 참고하십시오.

적절한 버스 연결에 대한 자세한 내용은 [UAVCAN 장치 상호 연결](https://kb.zubax.com/display/MAINKB/UAVCAN+device+interconnection)(Zubax KB)을 참고하십시오.

:::note
- 연결은 동일하지만 _커넥터_는 기기마다 다를 수 있습니다.
- 두 번째/이중화" CAN 인터페이스를 위에 표시된 것처럼(CAN2) 사용할 수 있습니다. 이것은 선택 사항이지만, 연결의 견고성을 높일 수 있습니다.
:::


## PX4 설정

PX4에서 UAVCAN 구성 요소를 사용하려면 먼저 UAVCAN 드라이버를 활성화하여야 합니다.

1. 배터리에서 기체에 전원을 공급하고 (비행 콘트롤러뿐만 아니라 전체 기체에 전원을 공급하여야 함) *QGroundControl*을 연결합니다.
1. **기체 설정 > 매개 변수** 화면으로 이동합니다.
1. [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE)은 0이 아닌 값 중 하나로 [설정](../advanced_config/parameters.md)하여야 합니다.

   값들은 다음과 같습니다:
   - `0`: UAVCAN 드라이버가 비활성화되었습니다.
   - `1`: 센서 수동 설정.
   - `2`: 센서 자동 설정.
   - `3`: 센서 및 액츄에이터(ESC) 자동 설정

   연결된 UAVCAN 장치가 자동 구성을 지원하지 _없으면_ `1`, `2` 또는 `3` 사용 _일부_가 자동 구성을 지원하고, UAVCAN ESC를 사용하는 경우 `3`입니다(이는 PWM이 아닌 UAVCAN 버스에 모터 제어를 할당함).

:::note
자동 구성을 지원하지 않는 모든 노드에 대해 수동으로 정적 ID를 할당하여야 합니다. 동적 설정 사용시에는 수동으로 할당된 모든 ID는 충돌을 피하기 위해 UAVCAN 장치의 수보다 큰 값을 지정하여야 합니다.
:::

대부분의 UAVCAN 센서는 추가 설정이 필요하지 않습니다(문서에 특별히 언급되지 않는 한 플러그 앤 플레이 방식임).

[UAVCAN 모터 컨트롤러(ESC)](../uavcan/escs.md)는 추가로 모터 순서를 설정하여야 하며, 몇 가지 다른 매개변수를 설정할 수도 있습니다. 간단한 QGroundControl 설정 UI를 사용하여 수행 여부는 ESC 유형에 따라 다릅니다(자세한 내용은 링크 참조).


## 문제 해결

### UAVCAN 장치가 노드 ID를 얻지 못함/펌웨어 업데이트 실패

PX4는 UAVCAN 노드 할당 및 펌웨어 업데이트(부팅 중 발생)를 위한 SD 카드가 필요합니다. SD 카드가 있는 지 확인하고 재부팅하십시오.

### 시동시 모터가 회전하지 않음

PX4 펌웨어 암이 회전하지만 모터가 회전을 시작하지 않는 경우, UAVCAN ESC를 사용하려면 매개 변수 `UAVCAN_ENABLE=3`을 확인하십시오. 추력이 증가하기 전에 모터가 회전을 시작하지 않으면 `UAVCAN_ESC_IDLT=1`을 확인하십시오.

## 개발 정보

- [UAVCAN 개발](../uavcan/developer.md): 새로운 UAVCAN 하드웨어의 개발 및 PX4로의 통합과 관련된 주제입니다.
