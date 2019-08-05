# DJI Matrice 100 (Pixhawk 1)

quadcopter는 완전히 사용자 정의가 가능한 프로그래밍 가능한 비행 플랫폼입니다. 이 빌드 로그는 * 3DR Pixhawk </ 0> 비행 컨트롤러와 함께 프레임을 사용하기위한 빌드 및 구성 지침을 제공합니다. </p> 

Key information:

* **Frame:** DJI Matrice 100 
* **Flight controller:** [Pixhawk 1](../flight_controller/pixhawk.md) 

![DJI Matrice 100](../../assets/airframes/multicopter/matrice100/Matrice100.jpg)

## Parts List

    * [DJI Matrice 100](http://store.dji.com/product/matrice-100) Just ESCs motors, and frame.
    
    

## Motor Connections 

자동 조종 장치 조립 지침은  Pixhawk Wiring Quickstart </ 0>를 참조하십시오.</p> 

### Wiring Diagram 

![Connections
](../../assets/airframes/multicopter/matrice100/Wiring Diagram.jpg)

### Wiring Harness 

![Wiring Harness](../../assets/airframes/multicopter/matrice100/WiringHarness.jpg)

### PWM Connections 

![PWM Connections](../../assets/airframes/multicopter/matrice100/PwmInput.jpg)

### Other views 

![Top
](../../assets/airframes/multicopter/matrice100/Top.jpg)

![Back
](../../assets/airframes/multicopter/matrice100/Back.jpg)

![No Stack
](../../assets/airframes/multicopter/matrice100/NoStack.jpg)

![No Top Deck
](../../assets/airframes/multicopter/matrice100/NoTopDeck.jpg)

### 자동 조종 장치 출력 

<!-- 
The autopilot outputs are specified in [Airframe Reference > DJI Matrice 100](../airframes/airframe_reference.md#copter_quadrotor_x_dji_matrice_100)) (or more specifically, in the [quadrotor-x configuration section](../airframes/airframe_reference.md#quadrotor-x). 
-->

| Output | Rate   | Actuator         |
| ------ | ------ | ---------------- |
| MAIN1  | 400 Hz | Front right, CCW |
| MAIN2  | 400 Hz | Back left, CCW   |
| MAIN3  | 400 Hz | Front left, CW   |
| MAIN4  | 400 Hz | Back right, CW   |
| AUX1   | 50 Hz  | RC AUX1          |
| AUX2   | 50 Hz  | RC AUX2          |
| AUX3   | 50 Hz  | RC AUX3          |

## Parameters

* 높은 스로틀에서 내부 루프는 기본 x 4 배 이득으로 진동을 유발합니다. 저속 스로틀에서는 높은 게인이 더 나은 응답을 제공하므로 스로틀을 기반으로 한 일부 게인 일정 계획이 전체 응답을 향상시킬 수 있으며 이는 mc_att_control에서 구현 될 수 있음을 알 수 있습니다 지금은 낮은 스로틀이나 높은 스로틀에서 진동이 없도록 조정하고 낮은 스로틀에서 대역폭을 맞 춥니 다 
  * MC_PITCHRATE_P: 0.05 
  * MC_PITCHRATE_D: 0.001 
* 배터리에는 기본 3 대신 6 개의 셀이 있습니다. 
  * BAT_N_CELLS: 6 

## Video

{% youtube %}https://www.youtube.com/watch?v=3OGs0ONemGc{% endyoutube %}