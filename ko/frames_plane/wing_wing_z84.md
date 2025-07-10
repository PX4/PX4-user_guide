---
canonicalUrl: https://docs.px4.io/main/ko/frames_plane/wing_wing_z84
---

# Wing Wing Z-84 Pixracer 조립

Wing Wing Z-84는 매우 좋은 표준 기체입니다. 작고 튼튼하며 [Pixracer](../flight_controller/pixracer.md)를 장착이 가능합니다.

주요 정보:

- **기체:** Wing Wing Z-84
- **비행 컨트롤러:** Pixracer

![Wing Wing Z-84 조립](../../assets/airframes/fw/wing_wing/wing_wing_build11.jpg)

## 부품 목록

### Z-84 Plug n' Fly (PNF/PNP) 혹은 키트

다음 중 하나 :
- [Banggood](https://www.banggood.com/Wing-Wing-Z-84-Z84-EPO-845mm-Wingspan-Flying-Wing-PNP-p-973125.html)
- [Hobbyking 미국 창고](https://hobbyking.com/en_us/wing-wing-z-84-epo-845mm-kit.html)

:::tip
PNF (또는 "PNP") 버전에는 모터, 프로펠러 및 ESC가 포함됩니다.
"키트"버전에는 이러한 구성 요소가 포함되어 있지 않아서 별도로 구매하여야 합니다.
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
- 125x110 mm 프로펠러 ([Hobbyking](https://hobbyking.com/en_us/gws-ep-propeller-dd-5043-125x110mm-green-6pcs-set.html))


## 배선

아래 배선은 Pixhawk 및 Pixracer에 적용됩니다. AUX로 표시된 출력이 아닌 메인 출력을 사용하십시오. 자동 조종 장치가 서보 레일에 전원을 공급하지 않기 때문에, 모터 컨트롤러에는 내장 BEC가 있어야합니다.

| 포트     | 연결                          |
| ------ | --------------------------- |
| RC IN  | PPM or S.BUS / S.BUS2 input |
| MAIN 1 | 좌측 보조익                      |
| MAIN 2 | 우측 보조익                      |
| MAIN 3 | 비어있음                        |
| MAIN 4 | 스로틀                         |


## 조립 방법

아래 이미지는 조립 공정에 대한 대략적인 아이디어를 제공합니다. 글루건으로 사용하는 것이 좋습니다.

![wing wing build01](../../assets/airframes/fw/wing_wing/wing_wing_build01.jpg) ![wing wing build02](../../assets/airframes/fw/wing_wing/wing_wing_build02.jpg) ![wing wing build03](../../assets/airframes/fw/wing_wing/wing_wing_build03.jpg) ![wing wing build04](../../assets/airframes/fw/wing_wing/wing_wing_build04.jpg) ![wing wing build09](../../assets/airframes/fw/wing_wing/wing_wing_build09.jpg) ![Wing Wing Z-84 조립](../../assets/airframes/fw/wing_wing/wing_wing_build11.jpg)

## 기체 설정

QGC 기체 구성의 비행 날개 섹션에서 Z-84를 선택합니다.

![QGC-West Wing용 펌웨어 선택](../../assets/airframes/fw/wing_wing/qgc_firmware_flying_wing_west_wing.png)
