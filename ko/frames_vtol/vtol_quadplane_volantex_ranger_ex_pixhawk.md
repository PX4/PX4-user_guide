# Volantex Ranger-Ex QuadPlane VTOL (Pixhawk)

QuadRanger VTOL은 QuadCopter 시스템으로 설계된 Volantex Ranger-Ex를 기반의 표준 꼬리 비행기입니다. Ranger-Ex는 비행법이 간편한 범용적인 FPV 플랫폼입니다. HobbyKing에서 구매할 수 있으며, Quanum Observer로 제품명이 변경되었습니다. 플라스틱 동체와 2m EPO 날개는 탑재 하중이 높은 견고한 기체입니다.

주요 정보:

- **기체: ** Volantex Ranger-Ex 또는 *Quanum Observer*
- **비행 컨트롤러:** Pixhawk

![QuadRanger](../../assets/airframes/vtol/quadranger_rangerex_pixhawk/quadranger_vtol_complete_build.jpg)

VTOL 변환된 비행기의 중량은 LiPo를 포함하여 약 3.5kg 정도 증가합니다. 변환된 비행기는 약 65%의 추진력으로 순항할 수 있습니다. 제안하는 쿼드 설정은 7.5kg의 추력을 제공하며 기체는 약 4.5kg의 총 중량으로 비행할 수 있습니다. FPV 장비와 카메라를 탑재에 충분한 하중 용량이 남아 있습니다.

변환은 공기 역학에 미치는 영향을 최소화하고 추가 강도를 제공하여 날개 굴곡을 최소화하도록 설계되었습니다.

## 부품 명세서

- Volantex Ranger-Ex 혹은 Quanum Observer
- 1200KV 530W 모터
- 30A 속도 컨트롤러
- 4s 배터리
- APC Electric 11x5 프로펠러

## 변환 키트

- 필요한 기본 부품은 다음과 같습니다.
- Pixhawk 호환 제품
- 디지털 풍속 센서
- 3DR 호환 전원 모듈
- GPS

Hobbyking EU 및 전세계 매장 링크가 있는 전체 부품 목록은 [QuadRanger-VTOL-partslist](http://px4.io/wp-content/uploads/2016/01/QuadRanger-VTOL-partslist-1.xlsx)를 참조하십시오.

아래 이미지는 한 날개에 필요한 부품을 보여줍니다.

![QuadRanger Parts](../../assets/airframes/vtol/quadranger_rangerex_pixhawk/quadranger_vtol_parts_for_one_wing.jpg)

  The tools required for the conversion are;

- A Dremel or similar rotary tool
- A hobby knife
- UHU POR glue
- CA glue
- Tape-line
- Tape

![QuadRanger conversion tools](../../assets/airframes/vtol/quadranger_rangerex_pixhawk/quadranger_vtol_conversion_tools.jpg)

## Wing conversion

A full build log is provided in the following video.

:::note
Please note that the conversion in this build log is performed on a wing that shows damage from a previous conversion. 
:::

@[youtube](https://youtu.be/l_ppJ_HhAUQ)

Cut both 800mm square carbon tubes to a length of 570mm and 230mm.

Making a slot in the Styrofoam wing 1.5cm deep using a rotary tool with some form of guidance to keep a fixed depth. The slot should be the length, depth and width of one 230mm square carbon tube. It should be located as indicated below.

![QuadRanger carbon tube slot](../../assets/airframes/vtol/quadranger_rangerex_pixhawk/quadranger_vtol_carbon_tube_slot.jpg)

Glue the 300x150x1.5mm carbon sheet to the 230mm carbon tube using CA glue and create an opening to run wires through. Insert the wires for power and signal to the ESC's. Using UHU POR glue the sheet and carbon tube to the Styrofoam wing as indicated below.

![QuadRanger sheet attachment](../../assets/airframes/vtol/quadranger_rangerex_pixhawk/quadranger_vtol_sheet_attachment.jpg)

Using CA glue, glue the 570mm square carbon tube to the carbon sheet. It should be located 285mm from where the wings join. The tube should be centred relative to the vertical area of the wing. It should extend exactly 165mm on both sides.

Attach the motor mount to the motor. With another motor mount plate and 4 M3x25mm screws clamp the motor on the end of the square carbon tube as indicated below. Attach the ESC's with tie wraps to the carbon tube. When using the Afro ESC be sure to connect at least signal and ground wire.

![QuadRanger motor and esc](../../assets/airframes/vtol/quadranger_rangerex_pixhawk/quadranger_vtol_motor_and_esc.jpg)

## Wiring

The outputs of Pixhawk should be wired like this (orientation as seen like "sitting in the plane").

| Port   | Connection             |
| ------ | ---------------------- |
| MAIN 1 | Front right motor, CCW |
| MAIN 2 | Back left motor, CCW   |
| MAIN 3 | Front left motor, CW   |
| MAIN 4 | Back right motor, CW   |
| AUX 1  | Left aileron           |
| AUX 2  | Right aileron          |
| AUX 3  | Elevator               |
| AUX 4  | Rudder                 |
| AUX 5  | Throttle               |

:::note
The servo direction can be reversed using the PWM\_REV parameters in the PWM\_OUTPUT group of QGroundControl (cogwheel tab, last item in the left menu)
:::

For further instructions on wiring and configurations please see: [Standard VTOL Wiring and Configuration](../config_vtol/vtol_quad_configuration.md)

## Configuration

Configure the frame as shown in QGroundControl below (do not forget to click **Apply and Restart** in the top).

![QGC - select firmware for standard VTOL](../../assets/airframes/vtol/funcub_pixhawk/qgc_firmware_standard_vtol_fun_cub_quad.png)

## Support

If you have any questions regarding your VTOL conversion or configuration please visit <https://discuss.px4.io/c/px4/vtol>.