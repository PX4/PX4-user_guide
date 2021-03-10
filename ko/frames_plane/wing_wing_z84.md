# Wing Wing Z-84 Pixracer 조립

Wing Wing Z-84는 매우 좋은 표준 기체입니다. 작고 튼튼하며 [Pixracer](../flight_controller/pixracer.md)를 장착이 가능합니다.

주요 정보:

- **기체:** Wing Wing Z-84
- **비행 컨트롤러:** Pixracer

![Wing Wing Z-84 build](../../assets/airframes/fw/wing_wing/wing_wing_build11.jpg)

## 부품 목록

### Z-84 Plug n' Fly (PNF/PNP) 혹은 키트

다음 중 하나 :

- [Banggood](https://www.banggood.com/Wing-Wing-Z-84-Z84-EPO-845mm-Wingspan-Flying-Wing-PNP-p-973125.html)
- [Hobbyking 미국 창고](https://hobbyking.com/en_us/wing-wing-z-84-epo-845mm-kit.html)

:::tip PNF
(또는 "PNP") 버전에는 모터, 프로펠러 및 ESC가 포함됩니다. "키트"버전에는 이러한 구성 요소가 포함되어 있지 않아서 별도로 구매하여야 합니다.
:::

### 전자 속도 컨트롤러 (ESC)

다음 중 하나 (작은 (> = 12A) ESC가 수행함) :

- [블루 시리즈 12A ESC](https://hobbyking.com/en_us/hobbyking-12a-blueseries-brushless-speed-controller.html) (Hobbyking)
- [Lumenier Regler 30A BLHeli_S ESC OPTO](https://www.getfpv.com/lumenier-30a-blheli-s-esc-opto-2-4s.html) (GetFPV)

### Autopilot 및 필수 부품들

- [Pixracer](../flight_controller/pixracer.md) 키트 (GPS 및 전원 모듈 포함)
- FrSky D4R-II 수신기 또는 동급 (설명서에 따라 PPM 합계 출력으로 점퍼됨)
- Holybro pix32용 [미니 텔레메 트리 세트](../flight_controller/pixfalcon.md#availability)
- Holybro pix32 / Pixfalcon용 [디지털 대기 속도 센서](../flight_controller/pixfalcon.md#availability)
- 1800mAh 2S LiPo 배터리 - 예 : [팀 오리온 1800mAh 7.4V 50C 2S1P](https://teamorion.com/en/batteries-en/lipo/soft-case/team-orion-lipo-1800-2s-7-4v-50c-xt60-en/)

### 권장 예비 부품

- 프로펠러 보호용 직경 1cm O - 링 ([Hobbyking](https://hobbyking.com/en_us/wing-wing-z-84-o-ring-10pcs.html))
- 125x110 mm propellers ([Hobbyking](https://hobbyking.com/en_us/gws-ep-propeller-dd-5043-125x110mm-green-6pcs-set.html))

## Wiring

The wiring below is valid for Pixhawk and Pixracer. Use the main outputs, not the ones labeled with AUX. The motor controller needs to have an in-built BEC, as the autopilot is not powering the servo rail.

| Port   | Connection                  |
| ------ | --------------------------- |
| RC IN  | PPM or S.BUS / S.BUS2 input |
| MAIN 1 | Left Aileron                |
| MAIN 2 | Right Aileron               |
| MAIN 3 | Empty                       |
| MAIN 4 | Throttle                    |

## Build Log

The images below give a rough idea about the assembly process, which is simple and can be done with a hot glue gun.

![wing wing build01](../../assets/airframes/fw/wing_wing/wing_wing_build01.jpg) ![wing wing build02](../../assets/airframes/fw/wing_wing/wing_wing_build02.jpg) ![wing wing build03](../../assets/airframes/fw/wing_wing/wing_wing_build03.jpg) ![wing wing build04](../../assets/airframes/fw/wing_wing/wing_wing_build04.jpg) ![wing wing build09](../../assets/airframes/fw/wing_wing/wing_wing_build09.jpg) ![Wing Wing Z-84 build](../../assets/airframes/fw/wing_wing/wing_wing_build11.jpg)

## Airframe Configuration

Select the Z-84 in the flying wing section of the QGC airframe config:

![QGC - select firmware for West Wing](../../assets/airframes/fw/wing_wing/qgc_firmware_flying_wing_west_wing.png)