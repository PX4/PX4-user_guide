# 비행 제어기 선택

기체의 물리적인 조건, 비행 목적과 비용에 적합한 하드웨어를 선택해야 합니다.

PX4는 많은 수의 비행 제어기에서 실행가능합니다. [Autopilot Hardware](../flight_controller/README.md)나 [Github의 ](https://github.com/PX4/PX4-Autopilot/#supported-hardware) 지원 보드 목록을 참고하세요. 주요한 목록은 아래와 같습니다.

## 픽스호크 시리즈

[픽스호크 시리즈](../flight_controller/pixhawk_series.md)는 NuttX OS 기반으로 PX4를 실행하는 개방형 하드웨어 비행 제어기입니다. 다양한 폼 팩터를 기반으로 많은 적용 사례가 있으며, 높은 시장 점유율을 자랑합니다.

아래의 [픽스호크 표준 자동조종장치](../flight_controller/autopilot_pixhawk_standard.md)들은 PX를 지원하고 있으며, PX4 지원팀의 테스트를 거친 제품들입니다. 기타 자동조종장치들은 [제조사들의 지원을](../flight_controller/autopilot_manufacturer_supported.md) 받고 있습니다.

픽스호코 4 미니는 *Pixhawk 4*의 성능을 더 작은 드론으로 적용하기를 원하는 엔지니어와 동호인들을 위해 설계되었습니다. *Pixhawk 4 Mini*는 *Pixhawk 4*의 FMU 프로세서 및 메모리 리소스는 동일하며 자주 사용되지 않는 인터페이스들을 제거하였습니다. 87 / 5000 Translation results 이를 통해 * Pixhawk 4 Mini </ 0>는 250mm 레이서 드론에 들어갈 수있을 만큼 작습니다.</td> </tr> 

</tbody> </table> 

## Autopilots for Computationally Intensive Tasks

These flight controllers (and development platforms) offer on-vehicle "companion computing", enabling computer vision and other computationally intensive tasks.

| Controller                                                                 | Description                                                              |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [Raspberry Pi 2/3 Navio2](../flight_controller/raspberry_pi_navio2.md)     | RasPi can be connected to an autopilot and used as a companion computer. |
| [Raspberry Pi 2/3/4 PilotPi](../flight_controller/raspberry_pi_pilotpi.md) | Fly your Pi :)                                                           |

## Commercial UAVs that can run PX4

PX4 is available on many popular commercial drone products, including some that ship with PX4 and others that can be updated with PX4 (allowing you to add mission planning and other PX4 Flight modes to your vehicle).

For more information see [Complete Vehicles](../complete_vehicles/README.md).