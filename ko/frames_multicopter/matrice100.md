---
canonicalUrl: https://docs.px4.io/main/ko/frames_multicopter/matrice100
---

# DJI Matrice 100 (Pixhawk 1)

DJI <sup>&reg;</sup> Matrice 쿼드콥터는 커스터마이징과 프로그래밍이 가능한 비행 플랫폼입니다. This build log provides build and configuration instructions for using the frame with the *3DR Pixhawk* flight controller.

주요 정보:

- **기체:** DJI Matrice 100
- **비행 컨트롤러:** [Pixhawk 1](../flight_controller/pixhawk.md)

![DJI Matrice 100](../../assets/airframes/multicopter/matrice100/Matrice100.jpg)

## 부품 목록

  * \[DJI Matrice 100\] (http://store.dji.com/product/matrice-100) ESC 모터와 프레임만 있습니다.

## 모터 연결

자동조종장치 조립 방법은 [Pixhawk Wiring Quickstart](../assembly/quick_start_pixhawk.md)를 참조하십시오.

### 배선 다이어그램

!\[연결 \](../../assets/airframes/multicopter/matrice100/Wiring Diagram.jpg)

### 배선 하네스

![배선 하네스
](../../assets/airframes/multicopter/matrice100/WiringHarness.jpg)

### PWM 연결

![PWM 연결](../../assets/airframes/multicopter/matrice100/PwmInput.jpg)

### 기타

![상단](../../assets/airframes/multicopter/matrice100/Top.jpg)

![후면
](../../assets/airframes/multicopter/matrice100/Back.jpg)

![스택 없음](../../assets/airframes/multicopter/matrice100/NoStack.jpg)

![상단 데크 없음
](../../assets/airframes/multicopter/matrice100/NoTopDeck.jpg)

### 자동조종장치 출력


<!-- 
The autopilot outputs are specified in [Airframe Reference > DJI Matrice 100](../airframes/airframe_reference.md#copter_quadrotor_x_dji_matrice_100)) (or more specifically, in the [quadrotor-x configuration section](../airframes/airframe_reference.md#quadrotor-x). 
-->

| 출력    | 주파수    | 액추에이터         |
| ----- | ------ | ------------- |
| MAIN1 | 400 Hz | 전방 우측, 반시계 방향 |
| MAIN2 | 400 Hz | 후방 촤즉, 반시계 방향 |
| MAIN3 | 400 Hz | 전방 좌측, 시계방향   |
| MAIN4 | 400 Hz | 후방 우측, 시계 방향  |
| AUX1  | 50 Hz  | RC AUX1       |
| AUX2  | 50 Hz  | RC AUX2       |
| AUX3  | 50 Hz  | RC AUX3       |


## 매개 변수

* 높은 스로틀에서 내부 루프는 기본값의 4 배 이득으로 진동을 유발합니다. 낮은 스로틀에서 높은 게인은 더 나은 응답을 제공합니다. 이는 스로틀을 기반으로하는 일부 게인 스케줄링이 전체 응답을 향상시킬 수 있으며, 이는 mc_att_control에서 구현될 수 있음을 의미합니다. 지금은 낮은 스로틀이나 높은 스로틀에서 진동이 없도록 조정하고, 낮은 스로틀에서 대역폭을 조정합니다.
  * MC_PITCHRATE_P: 0.05
  * MC_PITCHRATE_D: 0.001
* 배터리에는 기본 3셀 대신 6 개의 셀이 있습니다.
  * BAT_N_CELLS: 6

## 비디오

@[유투브](https://youtu.be/3OGs0ONemGc)