---
canonicalUrl: https://docs.px4.io/main/ko/frames_vtol/vtol_quadplane_fun_cub_vtol_pixhawk
---

# FunCub QuadPlane (Pixhawk)

Fun Cub QuadPlane VTOL은 QuadCopter 시스템으로 개조된 표준 테일 플레인 항공기 (Multiplex FunCub)입니다.

주요 정보:

- **기체:** Multiplex FunCub
- **비행 컨트롤러:** Pixhawk

![Fun Cub VTOL](../../assets/airframes/vtol/funcub_pixhawk/fun_cub_vtol_complete.jpg)

수정되지 않은 Fun Cub는 비교적 저렴하고 비행방법이 비교적 쉽습니다. 조립후에는 비행기는 비교적 무겁고 비행이 간단하지 않습니다. 비행은 우수하지만, 전진 비행시에는 약 75 %의 추진력이 필요합니다.

## 부품 명세서

실제 평면도는 위의 이미지와 비슷합니다 (다른 유사한 모델도 잘 작동합니다. 이것은 Multiplex Fun Cub입니다). 필요한 최소한의 장비는 다음과 같습니다.

- Multiplex FunCub (또는 유사 제품)
- Pixhawk 또는 호환 제품
- 디지털 풍속 센서
- 900kV 모터 (예 : Iris 추진 세트 - 모터 및 ESC)
- 쿼드 모터 용 10 " 프로펠러(10x45 또는 10x47)
- 고정익 모터용 10" 프로펠러(10 × 7)
- GPS 모듈
- 4S 배터리
- 쿼드 모터 장착 용 알루미늄 프레임 (10x10mm 사각 튜브, 벽 두께 1mm)
- TOW는 4200mAh 4S 배터리로 중량은 약 2.3kg입니다.

## 구조

구조는 아래와 같이 알루미늄 재질로 만들어집니다.

![quad_frame](../../assets/airframes/vtol/funcub_pixhawk/fun_cub_aluminium_frame_for_vtol.jpg) ![un Cub -frame for vtol mounted](../../assets/airframes/vtol/funcub_pixhawk/fun_cub_aluminium_frame_for_vtol_mounted.jpg)

## 배선

Pixhawk의 출력은 다음과 같이 연결되어야합니다 ( "평면에 앉아 있는" 방향과 같음).

:::tip
The servo direction can be reversed using the [PWM_MAIN_REVn](../advanced_config/parameter_reference.md#PWM_MAIN_REV1) parameters in the PWM_OUTPUT group of *QGroundControl* (cogwheel tab, last item in the left menu).
:::

| 포트     | 연결               |
| ------ | ---------------- |
| MAIN 1 | 전방 우측(반시계 방향)    |
| MAIN 2 | 후방 좌측 모터(반시계 방향) |
| MAIN 3 | 전방 좌측 모터(시계 방향)  |
| MAIN 4 | 후방 우측 모터(시계 방향)  |
| AUX 1  | 좌측 보조익 TODO      |
| AUX 2  | 우측 보조익           |
| AUX 3  | 승강타              |
| AUX 4  | 방향타              |
| AUX 5  | 스로틀              |

배선 및 설정에 관한 자세한 지침은 다음을 참조하십시오. [표준 VTOL 배선 및 설정](../config_vtol/vtol_quad_configuration.md). <!-- replace with Pixhawk Wiring Quickstart -->

## 기체 설정

아래 QGroundControl에 표시된대로 기체를 설정합니다 (맨 위의 **적용 및 다시 시작**을 클릭하는 것을 잊지 마십시오).

![QCG - Fun Cub Quad 펌웨어 선택](../../assets/airframes/vtol/funcub_pixhawk/qgc_firmware_standard_vtol_fun_cub_quad.png)

## 비디오

@[유투브](https://youtu.be/4K8yaa6A0ks)

## 지원

VTOL 변환 또는 구성에 대한 질문이 있으시면 <https://discuss.px4.io/c/px4/vtol>을 방문하십시오.