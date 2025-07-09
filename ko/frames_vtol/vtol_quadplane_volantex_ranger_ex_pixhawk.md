---
canonicalUrl: https://docs.px4.io/main/ko/frames_vtol/vtol_quadplane_volantex_ranger_ex_pixhawk
---

# Volantex Ranger-Ex QuadPlane VTOL(Pixhawk)

QuadRanger VTOL은 QuadCopter 시스템으로 설계된 Volantex Ranger-Ex를 기반의 표준 꼬리 비행기입니다. Ranger-Ex는 비행법이 간단한 범용적인 FPV 플랫폼입니다. HobbyKing에서 구매할 수 있으며, Quanum Observer로 제품명이 변경되었습니다. 플라스틱 동체와 2m EPO 날개는 탑재 하중이 높은 견고한 기체입니다.

주요 정보:

- **기체: ** Volantex Ranger-Ex 또는 *Quanum Observer*
- **비행 컨트롤러:** Pixhawk

![쿼드레인저](../../assets/airframes/vtol/quadranger_rangerex_pixhawk/quadranger_vtol_complete_build.jpg)

VTOL 변환된 비행기의 중량은 LiPo를 포함하여 약 3.5kg 정도 증가합니다. 변환된 비행기는 약 65%의 추진력으로 순항할 수 있습니다. The suggested quad setup provides a thrust of 7.5kg and the airframe can fly with a total weight of around 4.5kg. FPV 장비와 카메라를 탑재에 충분한 하중 용량을 가지고 있습니다.

The conversion is designed to minimize impact on the aerodynamics and provide additional strength minimize wing flexing.


## 부품 명세서

- Volantex Ranger-Ex 혹은 Quanum Observer
- 1200KV 530W 모터
- 30A 속도 컨트롤러
- 4S 배터리
- APC Electric 11x5 프로펠러

## 변환 키트

-   필요한 기본 부품은 다음과 같습니다.
-   Pixhawk 호환 제품
-   디지털 풍속 센서
-   3DR 호환 전원 모듈
-   GPS

For a full parts list with links to Hobbyking EU and International warehouse see: [QuadRanger-VTOL-partslist](https://px4.io/wp-content/uploads/2016/01/QuadRanger-VTOL-partslist-1.xlsx)

아래 이미지는 한 날개에 필요한 부품을 보여줍니다.

![쿼드레인저 부품](../../assets/airframes/vtol/quadranger_rangerex_pixhawk/quadranger_vtol_parts_for_one_wing.jpg)


변환에 필요한 도구는 다음과 같습니다.

-   Dremel 또는 유사한 회전 도구
-   취미용 칼
-   UHU POR 접착제
-   CA 접착제
-   줄자
-   테이프

![쿼드레인저 변환 도구](../../assets/airframes/vtol/quadranger_rangerex_pixhawk/quadranger_vtol_conversion_tools.jpg)

## 날개 변환

A full build log is provided in the following video.

:::note
이 변환 조립 방법은 이전 변환으로 인한 손상을 보여주는 날개에서 수행됩니다. 
:::

@[유투브](https://youtu.be/l_ppJ_HhAUQ)

Cut both 800mm square carbon tubes to a length of 570mm and 230mm.

Making a slot in the Styrofoam wing 1.5cm deep using a rotary tool with some form of guidance to keep a fixed depth. 슬롯은 230mm 정사각형 탄소 튜브 1 개의 길이, 깊이 및 너비를 유지하여야 합니다. 아래 표시된 위치에 있어야합니다.

![QuadRanger 탄소 튜브 슬롯](../../assets/airframes/vtol/quadranger_rangerex_pixhawk/quadranger_vtol_carbon_tube_slot.jpg)

CA 접착제를 사용하여 300x150x1.5mm 탄소 시트를 230mm 탄소 튜브에 붙이고 전선을 통과할 구멍을 만듭니다. 전원 및 신호용 전선을 ESC에 삽입합니다. UHU POR를 사용하여 시트와 탄소 튜브를 아래 표시된대로 스티로폼 날개에 붙입니다.

![QuadRanger 시트 첨부](../../assets/airframes/vtol/quadranger_rangerex_pixhawk/quadranger_vtol_sheet_attachment.jpg)

Using CA glue, glue the 570mm square carbon tube to the carbon sheet. It should be located 285mm from where the wings join. 튜브는 날개의 수직 영역을 기준으로 중앙에 있어야 합니다. 양쪽에서 정확히 165mm 연장되어야합니다.

모터 마운트를 모터에 부착합니다. With another motor mount plate and 4 M3x25mm screws clamp the motor on the end of the square carbon tube as indicated below. 타이 랩이있는 ESC를 카본 튜브에 부착합니다. Afro ESC를 사용할 때는 최소한 신호와 접지선을 연결하십시오.

![QuadRanger 모토와 esc](../../assets/airframes/vtol/quadranger_rangerex_pixhawk/quadranger_vtol_motor_and_esc.jpg)

## 배선

Pixhawk의 출력은 다음과 같이 연결되어야합니다 ( "평면에 앉아 있음"과 같은 방향)

| 포트     | 연결                     |
| ------ | ---------------------- |
| MAIN 1 | Front right motor, CCW |
| MAIN 2 | 후방 촤즉, 반시계 방향          |
| MAIN 3 | 전방 좌측, 시계방향            |
| MAIN 4 | 후방 우측, 시계 방향           |
| AUX 1  | 좌측 보조익                 |
| AUX 2  | 우측 보조익                 |
| AUX 3  | 승강타                    |
| AUX 4  | 방향타                    |
| AUX 5  | 스로틀                    |


:::note
서보 방향은 QGroundControl의 PWM\_OUTPUT 그룹 (톱니 바퀴 탭, 왼쪽 메뉴의 마지막 항목)에서 PWM\_REV 매개 변수를 사용하여 변경 가능합니다.
:::

배선 및 설정에 관한 자세한 지침은 [표준 VTOL 배선 및 설정](../config_vtol/vtol_quad_configuration.md)을 참고하십시오.


## 설정

아래 QGroundControl에 표시된대로 기체를 설정합니다 (맨 위의 **적용 및 다시 시작**을 클릭하는 것을 잊지 마십시오).

![QGC - 표준 VTOL용 펌웨어 선택](../../assets/airframes/vtol/funcub_pixhawk/qgc_firmware_standard_vtol_fun_cub_quad.png)


## 지원

If you have any questions regarding your VTOL conversion or configuration please visit <https://discuss.px4.io/c/px4/vtol>.

