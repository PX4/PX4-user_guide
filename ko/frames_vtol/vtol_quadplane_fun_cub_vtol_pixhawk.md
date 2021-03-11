# FunCub QuadPlane (Pixhawk)

Fun Cub QuadPlane VTOL은 QuadCopter 시스템으로 개조된 표준 테일 플레인 항공기 (Multiplex FunCub)입니다.

주요 정보:

- **기체:** Multiplex FunCub
- **비행 컨트롤러:** Pixhawk

![Fun Cub VTOL](../../assets/airframes/vtol/funcub_pixhawk/fun_cub_vtol_complete.jpg)

수정되지 않은 Fun Cub는 비교적 저렴하고 비행방법이 비교적 쉽습니다. 변환 후 비행기는 상당히 무겁고 공기 역학적으로 난해합니다. 비행은 우수하지만, 전진 비행시에는 약 75 %의 스로틀이 필요합니다.

## 부품 명세서

The actual plane looks roughly like as shown in the image above (other similar models will work just fine - this is a Multiplex Fun Cub). The minimal equipment required is:

- Multiplex FunCub (or similar)
- Pixhawk or compatible
- Digital airspeed sensor
- 900 kV motors (e.g. Iris propulsion set - motors and ESC)
- 10" props for quad motors (10x45 or 10x47)
- 10" prop for fixed-wing motor (10×7)
- GPS module
- 4S battery
- Aluminum frame for mounting the quad motors (10x10mm square tube, 1mm wall thickness)
- TOW is ~2.3kg with a 4200mAh 4S battery

## Structure

The structure is made out of aluminum booms as shown below.

![quad_frame](../../assets/airframes/vtol/funcub_pixhawk/fun_cub_aluminium_frame_for_vtol.jpg) ![Fun Cub -frame for vtol mounted](../../assets/airframes/vtol/funcub_pixhawk/fun_cub_aluminium_frame_for_vtol_mounted.jpg)

## Wiring

The outputs of Pixhawk should be wired like this (orientation as seen like "sitting in the plane").

:::tip
The servo direction can be reversed using the PWM\_REV parameters in the PWM_OUTPUT group of *QGroundControl* (cogwheel tab, last item in the left menu)
:::

| Port   | Connection              |
| ------ | ----------------------- |
| MAIN 1 | Front right motor (CCW) |
| MAIN 2 | Back left motor (CCW)   |
| MAIN 3 | Front left motor (CW)   |
| MAIN 4 | Back right motor (CW)   |
| AUX 1  | Left aileron TODO       |
| AUX 2  | Right aileron           |
| AUX 3  | Elevator                |
| AUX 4  | Rudder                  |
| AUX 5  | Throttle                |

For further instructions on wiring and configurations please see: [Standard VTOL Wiring and Configuration](../config_vtol/vtol_quad_configuration.md). <!-- replace with Pixhawk Wiring Quickstart -->

## Airframe Configuration

Configure the frame as shown in QGroundControl below (do not forget to click **Apply and Restart** in the top).

![QCG - Select Fun Cub Quad firmware](../../assets/airframes/vtol/funcub_pixhawk/qgc_firmware_standard_vtol_fun_cub_quad.png)

## Video

@[youtube](https://youtu.be/4K8yaa6A0ks)

## Support

If you have any questions regarding your VTOL conversion or configuration please visit <https://discuss.px4.io/c/px4/vtol>.