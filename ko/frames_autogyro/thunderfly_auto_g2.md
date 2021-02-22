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

로터 헤드는 (원래 오토 자이로와 비교하여)  롤 및 피치 축에서도 작동하도록 수정되었습니다. 헤드 로터는 오토 자이로의 회전과 등반 제어가 모두 가능하게 되었습니다. 오토자이로는  낮은 속도에서도 러더 및 엘리베이터를 제어할 수 있습니다.

인쇄된 로터 헤드는 세 부분으로 구성됩니다. 바닥 부분은 M2.5 나사를 사용하여 원래 합판 철탑에 나사로 고정됩니다. 첫 번째 부품과 두 번째 부품 사이에있는 M3x35 나사는 피치 축 자유도를 만들고, 두 번째 부품과 세 번째 부품 사이의 연결은 롤 축 자유도를 만듭니다. 후자의 축은 나사식 자동 잠금 너트가있는 M3x30 나사로 만들어집니다. 로터 쪽에서 스크류 헤드에는 면적이 넓은 와셔가 있습니다.

M3x50 고강도 나사로 만들어진 로터 축은 세 번째 부분을 통과합니다. 사용된 베어링은 623 2Z C3 SKF입니다. 이 부분의 끝에는 M2.5 나사를 통해 파일론의 바닥 부분에 위치한 서보에 부착된 볼로드가 있습니다. 이 부분의 끝에는 M2.5 나사를 통해 관통 파일론의 바닥에 부착된 볼로드가 있습니다.

![Rotorhead](../../assets/airframes/autogyro/auto-g2/modif_rh.png)

### 이중 날 로터

원래 Durafly Auto-G2 오토자이로는 3 날 로터이었으나, 2 날 로터를 사용하도록 수정되었습니다. 주된 이유는 진동이 적고 조립이 간편하기 때문입니다. 인쇄된 중앙 부품은 중국산 Durafly 블레이드 또는 3D 인쇄 블레이드와 함께 사용하도록 설계되었습니다.

로터의 중앙 부분은 다음과 같은 역할을하는 요소들로 구성됩니다.
* 블레이드를 펄럭일 수 있습니다.
* 그들은지면과의 충돌로 부서지는 변형 영역을 가지고 있습니다. 덕분에 일반적으로 하나의 부품만 교체로 로터를 신속하게 수리 할 수 있습니다.
* 블레이드 공격각을 쉽게 설정 가능합니다.

#### HobbyKing 로터 블레이드

원 블레이드와 함께 로터의 인쇄 된 중앙 부분을 사용할 수 있습니다. 이 블레이드는 [HobbyKing](https://hobbyking.com/en_us/duraflytm-auto-g-gyrocopter-821mm-replacement-main-blade-1pcs-bag.html)에서 구입할 수 있습니다. Hobbyking 블레이드는 무게 중심이 다르므로 적절한 균형을 유지하여야 합니다.

#### 3D 프린팅 로터 블레이드

로터 블레이드를 인쇄할 수 있습니다.

인쇄된 로터 블래드는 아직 개발 중이지만, 예비 테스트에서 정확한 모양과 세로 홈이 없기 때문에 품질이 더 우수한 것으로 조사되었습니다. 그러나, 일부 제작 과정은 조정중입니다.

![Blades assembly](../../assets/airframes/autogyro/auto-g2/modif_blade.png)

#### 균형

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
