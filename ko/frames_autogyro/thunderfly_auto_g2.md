# ThunderFly Auto-G2 오토자이로

*ThunderFly Auto-G2*는 [Durafly ™ Auto-G2 Gyrocopter](https://hobbyking.com/en_us/duraflytm-auto-g2-gyrocopter-w-auto-start-system-821mm-pnf.html) RC 모델을 기반으로 한 자동 조종 제어 자동자이로입니다.  원본 모델의 여러 부분이 3D 인쇄 가능한 모델로 대체되었습니다.

![Auto-G2](../../assets/airframes/autogyro/auto-g2/autog2_title.jpg)

:::note
Auto-G2 오토자이로의 기체는 ThuderFly s.r.o 사에서 개발 및 유지 관리합니다.
:::

추가된 내용들은 [GitHub](https://github.com/ThunderFly-aerospace/TF-G2/)에서 오픈 소스로 제공하고 있습니다. 인쇄된 부품들은 [OpenSCAD](https://www.openscad.org/)로 설계되었습니다.


## 수정 내역

Durafly Auto-G2는 원 디자인에는 CLARK-Y 프로파일을 가진 400mm 길이의 세 개의 블레이드 로터가 있습니다. 로터 헤드는 ROLL 축에서만 기울일 수 있습니다. Autogyro는 방향타와 엘리베이터로 제어됩니다. Durafly Auto-G2 오토 자이로 박스에는 오토 자이로 폴리스티렌 본체, ESC, 모터 (아마 800kV), 4 개의 서보, 테일 에어 포일, 로터 센터 부품이있는 3 개의 블레이드, 와이어 섀시 및 프리 로테이터가 포함되어 있습니다.

Durafly 모델의 수정 내역은 아래와 같습니다.
* 자율 비행 기능 추가
* 두 개의 자유 축(피치, 롤)이있는 로터 헤드
* 안전하게 파손 가능한 로터 플레이트가있는 2 개의 블레이드 로터
* 더 큰 랜딩 기어

### 자율 비행

수정된 모델의 항공기의 중량은 상당히 무겁습니다. 따라서 경량 비행 컨트롤러가 권장됩니다 (예 : [Holybro pix32](../flight_controller/holybro_pix32.md) 또는 [CUAV nano](../flight_controller/cuav_v5_nano.md)).

자율비행 장치는 3D 프린트 진도 방지 패드의 오토자이로 하단에 장착되어야 합니다. [Thingiverse](https://www.thingiverse.com/thing:160655)에있는 진동 방지 제품을 사용하였습니다.


### 로터 헤드

The rotor head is (compared to the original autogyro) modified so it allows a motion in both roll and pitch axes. Thanks to this, the rotor can control turning as well climbing of the autogyro. Directional control of autogyro by rotor is possible even in case of low airspeed compared to the original rudder and elevator control.

The printed rotor head consists of three parts. The bottom part is screwed using an M2.5 screw to the original plywood pylon. An M3x35 screw found between the first and the second part creates the pitch axis freedom and the connection between the second and the third part the roll axis freedom. The latter axis is made of an M3x30 screw with a screwed self-locking nut. From the rotor side, the screw head has a large area washer.

Rotor axis, made of M3x50 high tensile strength screw, goes through the third part. Bearings used are 623 2Z C3 SKF. At the end of this part, there are ball rods attached via M2.5 screws to servos positioned in the bottom part of the pylon. It is preferable to exchange these original servos for better quality ones as they are weak and in the original construction they help each other.

![Rotorhead](../../assets/airframes/autogyro/auto-g2/modif_rh.png)

### Two-blade rotor

The original Durafly Auto-G2 autogyro has a three-blade rotor, which as been modified in this built to use a two-blade rotor. The reasons are reduced vibration and easier construction. Printed central parts are designed to be used both with Chinese Durafly blades or 3D printed blades.

The rotor's central part consists of several components which have following roles:
* They enable blade flapping.
* They have deformation zones that break upon impact with ground. Thanks to this, the rotor can usually be repaired quickly by replacing only one component.
* Easy setup of blades angle-of-attack.

#### HobbyKing rotor blades

It is possible to use a printed central part of the rotor with the original blades. These blades can be bought on [HobbyKing](https://hobbyking.com/en_us/duraflytm-auto-g-gyrocopter-821mm-replacement-main-blade-1pcs-bag.html). Hobbyking blades differ in the position of center of gravity and it is therefore necessary to balance them properly.

#### 3D printed rotor blades

It is also possible to print rotor blades.

The printed rotor blads are still under development, but preliminary tests show they are of better quality mostly thanks to their precise shape and absence of longitudinal grooves. However, some of the production processes still need to be tuned.

![Blades assembly](../../assets/airframes/autogyro/auto-g2/modif_blade.png)

#### Balancing

Proper blades balance is very important to minimize vibrations. Blades have to be balanced in such a way, that the center of gravity is located in the middle of the rotor axis.

Printed blades are balanced in the production process and there is no need to further balance them.

### Release device

If you want to launch an autogyro using a winch or if you want to launch it by towing you need to print a release device. It is a small box equipped with servo which pulls out the pin and releases the rope.

The whole part is glued, using a hot-melt adhesive, under the engine on the bottom part of an autogyro’s body. If an autogyro is towed by a rope its engine must not be turned on. It can be handled, for example, by nulling the engine’s output in the transmitter if the release device switch is closed.

![Release device](../../assets/airframes/autogyro/auto-g2/modif_release.png)

## Parts List

### Electronic

* Autopilot ([Holybro pix32](../flight_controller/holybro_pix32.md), [CUAV nano](../flight_controller/cuav_v5_nano.md))
* GPS (GPS Modul NEO-6M, with patch antenna)
* Airspeed sensor ([SDP3x](https://www.sensirion.com/en/flow-sensors/differential-pressure-sensors/worlds-smallest-differential-pressure-sensor/))
* Stronger servos as a substitution for the original ones (optional), ([BlueBird BMS-125WV](https://www.blue-bird-model.com/products_detail/411.htm))
* Additional servo for release device (optional)

### Mechanical parts

* Rotor head Bearing (623 2Z C3)
* Propeller ([APC 10x7](https://www.apcprop.com/product/10x7e/))
* [Prop adapter](https://mpjet.com/shop/gb/prop-adapters/184-collet-prop-adapter-19-mm-4-mm-shaft-m629-standard.html)


### Printable parts

* Rotor head:
  * [Pylon end](https://github.com/ThunderFly-aerospace/Auto-G2/blob/master/CAD/stl/111_1001.stl)
  * [Pitch part](https://github.com/ThunderFly-aerospace/Auto-G2/blob/master/CAD/stl/111_1002.stl)
  * [Roll part](https://github.com/ThunderFly-aerospace/Auto-G2/blob/master/CAD/stl/111_1003.stl)

* Rotor:
  * [center part washer top](https://github.com/ThunderFly-aerospace/Auto-G2/blob/master/CAD/stl/111_1008.stl)
  * [center part washer bottom](https://github.com/ThunderFly-aerospace/Auto-G2/blob/master/CAD/stl/111_1004.stl)
  * [center plate with deformation zones](https://github.com/ThunderFly-aerospace/Auto-G2/blob/master/CAD/stl/888_1001.stl)
  * [washers for setting AoA of blades](https://github.com/ThunderFly-aerospace/Auto-G2/blob/master/CAD/stl/111_1005.stl)
  * [Rotor nut](https://github.com/ThunderFly-aerospace/Auto-G2/blob/master/CAD/stl/888_1002.stl)

* Rotor blades (optional)
* Autopilot holder
* [Release device](https://github.com/ThunderFly-aerospace/Auto-G2/blob/master/CAD/stl/888_1010.stl)
* [Front wheels](https://github.com/ThunderFly-aerospace/Auto-G2/blob/master/CAD/stl/888_1011.stl)

### Recommended spare parts

* Servos with improved quality (recomended [BlueBird BMS-125WV](https://www.blue-bird-model.com/products_detail/411.htm), original servos are not very durable))
* Propeller ([APC 10x7](https://www.apcprop.com/product/10x7e/))
* Rotor centre plate with deformation zones (3D printed)
* Rotor blades ([HobbyKing](https://hobbyking.com/en_us/duraflytm-auto-g-gyrocopter-821mm-replacement-main-blade-1pcs-bag.html) or 3D printed)

## Video

@[youtube](https://youtu.be/YhXXSWz5wWs)

## Photo gallery of changes

![Auto-G2 1](../../assets/airframes/autogyro/auto-g2/autog2_1.jpg) ![Auto-G2 2](../../assets/airframes/autogyro/auto-g2/autog2_2.jpg) ![Auto-G2 3](../../assets/airframes/autogyro/auto-g2/autog2_3.jpg) ![Auto-G2 4](../../assets/airframes/autogyro/auto-g2/autog2_4.jpg)
