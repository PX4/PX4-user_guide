# PX4FLOW 스마트 카메라

PX4FLOW는 [광류](../sensor/optical_flow.md) 스마트 카메라입니다. 기본 해상도는 752x480 픽셀이며, 400Hz에서 4x 구간 영역에서 광학 흐름을 계산하여 매우 높은 감광도를 제공합니다.

![PX4Flow v1.0](../../assets/hardware/sensors/px4flow/px4flow_v1.0_top_generated.png)

마우스 센서와 달리, 조명 LED 없이도 실내와 실외 낮은 조명에서도 작동합니다. 다른 기본적이고 효율적인 저수준 컴퓨터 비전 작업을 수행하도록 자유롭게 다시 프로그래밍 할 수 있습니다.

- 168 MHz Cortex M4F CPU (128 + 64 KB RAM)
- 752x480 MT9V034 이미지 센서, L3GD20 3D 자이로
- 16mm M12 렌즈 (IR 블록 필터)
- 크기: 45.5 mm x 35mm
- 소비 전력: 115mA / 5V

@[유투브](https://youtu.be/0Jpq6DU_HVg)

## 구매처

이 모듈을 아래에서 주문하십시오.

- [Unmanned Tech](http://www.unmannedtechshop.co.uk/px4flow-smart-camera-optical-flow-sensor/) (영국)
- [Holybro](https://shop.holybro.com/px4flow-kit_p1035.html) (독일과 유럽)
- [Drotek](https://store-drotek.com/798-optical-flow-kit-px4flow.html)

## 사양

- 글로벌 셔터가 있는 MT9V034 머신 비전 CMOS 센서
- **400Hz**에서 4x4 구간 이미지에서 광류 처리
- 24x24 μm 수퍼 픽셀로 뛰어난 감광도
- 최대 2000°/s 및 780Hz 업데이트 속도의 온보드 16 비트 자이로스코프, 500°/s의 기본 고정밀 모드
- 온보드 소나 입력 및 [Maxbotix 소나 센서](../sensor/rangefinders.md#maxbotix-i2cxl-maxsonar-ez)용 마운트. (HRLV-EZ4 권장, [SparkFun 제품 링크](https://www.sparkfun.com/products/11309))
- USB 부트로더
- 최대 921600 baud의 USB 직렬([QGroundControl](http://qgroundcontrol.com/)이있는 라이브 카메라 보기 포함)
- USB 전원 옵션
- **MatrixVision Bluefox MV 장착 구멍에 맞습니까? (카메라 중앙에서 벗어남)**

![PX4Flow Top](../../assets/hardware/sensors/px4flow/px4flow_top.jpg) ![px4flow-bottom](../../assets/hardware/sensors/px4flow/px4flow_bottom.jpg)

## 픽스호크 설정

PX4Flow 보드를 사용하려면 I2C 버스(모든 Pixhawk 시리즈 컨트롤러)에 연결하고 [SENS_EN_PX4FLOW](../advanced_config/parameter_reference.md#SENS_EN_PX4FLOW)를 사용하여 드라이버를 활성화합니다.

:::warning PX4FLOW는 **1.9.0** 미만의 PX4 버전 FMUv5 (Pixhawk 4)에서는 작동하지 않습니다. 다른 모든 PX4/PX4-Autopilot 버전에서는 작동합니다.
:::

단계는 아래와 같습니다:

- *QGroundControl* 에서: 
  - PX4Flow에서 펌웨어 업데이트 (왼쪽 상단 메뉴에서 CONFIG를 클릭한 다음 펌웨어 업그레이드를 클릭)
  - 매개변수 [SENS_EN_PX4FLOW](../advanced_config/parameter_reference.md#SENS_EN_PX4FLOW)를 설정하고 재부팅합니다 (매개변수 찾기 및 설정에 대한 정보는 [매개 변수](../advanced_config/parameters.md) 참조).
- PX4Flow I2C를 Pixhawk I2C에 연결합니다.

활성화되면 부팅시 모듈이 감지됩니다. 자동 조종 장치가 **USB**로 연결되면, 흐름 데이터는 10Hz에서 전송되어야합니다. 흐름 데이터는 더 낮은 속도로 무선 채널에서 전송됩니다.

<span id="mounting"></span>

### 장착 및 방향

권장 장착 방향은 다음 그림과 같이 **기체 전면**을 향하는 플로우 보드의 Y로 정의됩니다.

![PX4Flow align with Pixhawk](../../assets/hardware/sensors/px4flow/px4flowalignwithpixhawk.jpg)

**PX4**에서는 [SENS_FLOW_ROT](../advanced_config/parameter_reference.md#SENS_FLOW_ROT) 매개변수로 방향을 설정합니다. 위의 방향은 [SENS_FLOW_ROT=270](#SENS_FLOW_ROT)도 (기본값)에 매핑됩니다.

PX4Flow 보드가 잘 장착되었는 지 확인하십시오.

:::warning PX4Flow는 상당한 양의 전자기 방사를 방출하므로, 가능하면 다른 전자 장치 (특히 GPS 모듈)에서 멀리 떨어져 있어야 합니다 (자세한 내용은 [하드웨어/문제/8](https://github.com/PX4/Hardware/issues/8) 참조).
:::

<span id="px4_configuration"></span>

## PX4 설정

설정 PX4Flow 매개변수는 다음과 같습니다.

| 매개변수                                                                                                      | 설명                           |
| --------------------------------------------------------------------------------------------------------- | ---------------------------- |
| <span id="SENS_EN_PX4FLOW"></span>[SENS_EN_PX4FLOW](../advanced_config/parameter_reference.md#SENS_EN_PX4FLOW)   | PX4 Flow 드라이버를 시작합니다.        |
| <span id="SENS_FLOW_MAXHGT"></span>[SENS_FLOW_MAXHGT](../advanced_config/parameter_reference.md#SENS_FLOW_MAXHGT) | 광학 흐름에 의존시 지상 최대 높이          |
| <span id="SENS_FLOW_MINHGT"></span>[SENS_FLOW_MINHGT](../advanced_config/parameter_reference.md#SENS_FLOW_MINHGT) | 광학 흐름에 의존시 지상 최소 높이.         |
| <span id="SENS_FLOW_MAXR"></span>[SENS_FLOW_MAXR](../advanced_config/parameter_reference.md#SENS_FLOW_MAXR)     | 광류 센서로 안정적으로 측정 기능한 최대 각 유량. |
| <span id="SENS_FLOW_ROT"></span>[SENS_FLOW_ROT](../advanced_config/parameter_reference.md#SENS_FLOW_ROT)       | 차체 프레임을 기준 PX4FLOW 보드의 요 회전. |

ECL/EFK2 추정기와 함께 흐름을 사용하는 경우 [Optical Flow &gt; Estimators &gt; EKF2](../sensor/optical_flow.md#ekf2) 매개변수도 설정하여야 합니다. 이를 통하여 속도 계산을 위한 융합 광류 측정이 가능하며 센서가 차량 중앙에 있지 않은 경우 오프셋을 정의할 수 있습니다.

### 연결 

PX4flow는 I2C 버스에 연결됩니다. 여러 장치를 동일한 버스에 연결하는 경우에는 각 장치를 고유 주소로 설정합니다. 다음 섹션에서 이 방법을 설명합니다.

### PX4FLOW I2C 장치 주소

PX4Flow의 기본 I2C 주소는 0x42이지만 "I2C BUS ADDR"이라고 표시된 3개의 솔더 점퍼를 사용하여 증가시킬 수 있습니다. 다른 장치의 주소가 같은 경우 사용할 수 있는 방법입니다.

주소 증분은 점퍼로 인코딩된 3 비트 값과 같습니다. 예를 들어 점퍼 0과 1이 납땜되고 점퍼 2가 납땜되지 않은 경우 주소는 1*1 + 1* 2 + 0\* 4 = 3만큼 증가하여 주소 0x45를 제공합니다. 모든 점퍼가 납땜되지 않은 경우, 자동조종장치 펌웨어에 의해 카메라가 자동으로 검색됩니다.

8개의 선택 가능 항목에 대한 주소 범위는 0x42 ~ 0x49입니다.

| 주소                 | 비트 2 | 비트 1 | 비트 0 |
| ------------------ | ---- | ---- | ---- |
| 7 비트 주소 0x42 (기본값) | 0    | 0    | 0    |
| 7 비트 주소 0x43       | 0    | 0    | 1    |
| :                  | :    | :    | :    |
| 7 비트 주소 0x49       | 1    | 1    | 1    |

:::tip
다양한 I2C 판독 값을 사용할 수 있습니다. **I2C 프레임**과 **I2C 통합 프레임**에 대한 자세한 내용은 드라이버 소스 코드에 있습니다.
:::

PX4Flow의 I2C 주소를 수정하는 경우 올바른 주소로 PX4 드라이버를 시작하여야 합니다.

    px4flow start                  # address=0x42 (default)
    px4flow stop
    px4flow start -a 0x45          # address=0x45
    

## 렌즈 초점 맞추기

우수한 광류 품질을 보장하려면 카메라를 PX4Flow에 원하는 비행 높이로 초점을 맞추어야 합니다. 카메라 초점을 맞추려면 텍스트가 있는 개체 (예 : 책) PX4Flow를 USB에 연결하고 *QGroundControl*을 실행합니다. 설정 메뉴에서 PX4Flow를 선택하면 카메라 이미지가 표시됩니다. 고정 나사를 풀고 렌즈를 풀고 조여 초점이 맞는 위치를 찾아 렌즈의 초점을 맞춥니 다.

:::note
3m 이상 비행하면 카메라가 무한대로 초점이 맞춰지며, 더 높은 비행을 위해 변경할 필요가 없습니다.
:::

![Flow Focus Book](../../assets/hardware/sensors/px4flow/flow_focus_book.jpg)

*그림: 교과서를 사용하여 비행하려는 높이 (일반적으로 1-3 미터)에 흐름 카메라의 초점을 맞춥니 다. 3 미터 이상에서는 카메라가 무한대에 초점을 맞추고 모든 높은 고도에서 작동하여야 합니다.*

![Flow Focusing](../../assets/hardware/sensors/px4flow/flow_focusing.png)

*그림: 카메라 초점을 맞추는 데 사용할 수있는 QGroundControl px4flow 인터페이스*

## 정확도

아래의 정사 사진은 공원 도로 위의 비행이 정확하게 측정되었음을 보여줍니다. 이것은 수동 비행에서 약 1.6m 고도에서 비행하는 7 "쿼드의 PX4FMU로 수행되었습니다. GPS 없음, 위치의 PX4FLOW 통합만.

![PX4FLOW trajectory](../../assets/hardware/sensors/px4flow/px4flow_trajectory.jpg)

## 다운로드

### 매뉴얼 및 회로도

- [PX4FLOW v1.3 사용자 매뉴얼](https://github.com/PX4/px4_user_guide/raw/master/assets/hardware/sensors/px4flow/px4flow_manual_v1.3.pdf)
- [PX4FLOW v1.3 회로도 및 레이아웃](https://github.com/PX4/px4_user_guide/raw/master/assets/hardware/sensors/px4flow/px4flow_schematic_v1.3.pdf) 
- 하드웨어 저장소의 문서: [PX4/Hardware/FLOWv1](https://github.com/PX4/Hardware/tree/master/FLOWv1)

### USB 드라이버

Linux와 MacOS에는 필수 드라이버가 함께 제공됩니다. Windows 드라이버는 [px4flow_win_drivers.zip](https://github.com/PX4/px4_user_guide/raw/master/assets/hardware/sensors/px4flow/px4flow_win_drivers.zip)에서 다운로드할 수 있습니다.

### 논문

흐름 모듈은 독일 칼 스루에에서 열린 국제 로봇 및 자동화 회의 (ICRA 2013)의 논문으로 승인되었습니다.

- Dominik Honegger, Lorenz Meier, Petri Tanskanen and Marc Pollefeys: [An Open Source and Open Hardware Embedded Metric Optical Flow CMOS Camera for Indoor and Outdoor Applications](https://github.com/PX4/px4_user_guide/raw/master/assets/hardware/sensors/px4flow/px4flow_paper.pdf)

### 라이브러리

다음은 프로젝트에서 흐름 모듈을 통합하는 타사 라이브러리입니다.

- [mavros](https://github.com/vooon/mavros) : Vladimir Ermakov가 관리하는 일반적인 MAVLink ROS 인터페이스
- \[px-ros-pkg]\](https://github.com/cvg/px-ros-pkg): Lionel Heng (hengli@inf.ethz.ch)에서 관리하는 PX4FLOW ROS (로봇 운영 체제) 인터페이스입니다.
- [arduino-px4flow-i2c](https://github.com/eschnou/arduino-px4flow-i2c): Laurent Eschenauer (laurent@eschenauer.be)가 관리하는 I2C 인터페이스를 래핑 Arduino 라이브러리입니다.

## 커넥터

- **USART2 (J2)**: Hirose DF13 6 pos ([Digi-Key Link: DF13A-6P-1.25H(20)](https://www.digikey.com/products/en?keywords=H3371-ND)) 
  - Mates: Hirose DF13 6 pos housing ([Digi-Key Link: Hirose DF13-6S-1.25C](https://www.digikey.com/products/en?keywords=H2182-ND))
- **USART3 (J1)**: Hirose DF13 6 pos ([Digi-Key Link: DF13A-6P-1.25H(20)](https://www.digikey.com/products/en?keywords=H3370-ND)) 
  - Mates: Hirose DF13 6 pos housing ([Digi-Key Link: Hirose DF13-6S-1.25C](https://www.digikey.com/products/en?keywords=DF13-6S-1.25C))
- **I2C1 (J3)**: Hirose DF13 4 pos ([Digi-Key Link: DF13A-4P-1.25H(20)](https://www.digikey.com/products/en?keywords=H3369-ND)) 
  - Mates: Hirose DF13 4 pos housing ([Digi-Key Link: Hirose DF13-4S-1.25C](https://www.digikey.com/products/en?keywords=DF13-4S-1.25C))
- **USB (J5)**: Micro USB-B 
  - Mates: Cell phone data / charger cables, e.g. [Digi-Key Link: ASSMANN AK67421-0.5-R](https://www.digikey.com/products/en?keywords=AE10418-ND)
- **ARM MINI JTAG (J6**, //not populated per default//**)**: 1.27 mm 10pos header (SHROUDED, for Black Magic Probe: Samtec FTSH-105-01-F-DV-K or (untested) or Harwin M50-3600542 ([Digikey](https://www.digikey.com/products/en?keywords=M50-3600542) or [Mouser](http://ch.mouser.com/ProductDetail/Harwin/M50-3600542/?qs=%2fha2pyFadujTt%2fIEz8xdzrYzHAVUnbxh8Ki%252bwWYPNeEa09PYvTkIOQ%3d%3d)) 
  - JTAG 어댑터 옵션 #1: [BlackMagic Probe](https://1bitsquared.com/products/black-magic-probe). 케이블없이 제공될 수 있습니다 (공급 업체에 확인). 그렇다면 **Samtec FFSD-05-D-06.00-01-N** 케이블 ([Samtec 샘플 서비스](http://www.samtec.com/suddenservice/samples/samples.aspx) 또는 [Digi-Key Link : SAM8218-ND](http://www.digikey.com/product-search/en?x=0&y=0&lang=en&site=us&KeyWords=FFSD-05-D-06.00-01-N)) 및 Mini-USB 케이블
  - JTAG 어댑터 옵션 #2: [Digi-Key Link: ST-LINK/V2](https://www.digikey.com/products/en?keywords=497-10484-ND) / [ST USER MANUAL](http://www.st.com/internet/com/TECHNICAL_RESOURCES/TECHNICAL_LITERATURE/USER_MANUAL/DM00026748.pdf), needs an ARM Mini JTAG to 20pos adapter: [Digi-Key Link: 726-1193-ND](https://www.digikey.com/products/en?keywords=MDL-ADA2) 
    - JTAG 어댑터 옵션 # 3 : [SparkFun 링크 : Olimex ARM-TINY](http://www.sparkfun.com/products/8278) 또는 기타 OpenOCD 호환 ARM Cortex JTAG 어댑터, ARM Mini JTAG 대 20pos 어댑터 필요 : [Digi-Key 링크 : 726- 1193-ND](https://www.digikey.com/products/en?keywords=MDL-ADA2)

### 광학

올바른 광학 장치는 이미 장착되고 초점이 맞춰진 3D Robotics에 의해 제공됩니다.

- [렌즈 장착](http://www.lensation.de/de/shop/detail/27-accessories/flypage/418-s-mount-lens-holder-13mm-sh02m13.html?sef=hcfp)
- 16mm M12 (S- 마운트) 렌즈 (IR 컷 필터 포함)

초점 거리는 측정 가능한 최대 속도에 영향을줍니다.

    최대 속도 = +/- 4 픽셀 / (1 초 / 내부 업데이트 속도) *지면 거리 / 초점 거리 (픽셀)
    

내부 업데이트 속도는 400Hz입니다.

pixelize는 24 마이크로 미터이므로 16mm 렌즈의 초점 거리는 0.016 미터/픽셀 당 24 마이크로 미터 = 666.666 픽셀입니다.

다양한 초점 거리 렌즈와 지면 거리에 대한 최대 속도 :

| 지상 거리   | 1m     | 3m      | 10m   |
| ------- | ------ | ------- | ----- |
| 16mm 렌즈 | 2.4m/s | 7.2m/s  | 24m/s |
| 8mm 렌즈  | 4.8m/s | 14.4m/s | 48m/s |
| 6mm 렌즈  | 6.4m/s | 19.2m/s | 64m/s |
| 4mm 렌즈  | 9.6m/s | 28.8m/s | 96m/s |

    max_vel = 4/(1/400) *지면 거리/(초점 길이/0.000024)
    

## 설정: 이미지 품질 및 출력

PX4FLOW는 카메라로 설계되지 않았지만, 모든 처리를 온칩으로 수행합니다. 이미지 품질과 출력을 설정할 수 있습니다 (이미지 출력은 렌즈의 초점을 맞추기 위한 것입니다).

![Video Downlink](../../assets/hardware/sensors/px4flow/qgc_video_downlink_px4flow.jpg)

    -[QGroundControl] 다운로드 (http://qgroundcontrol.com/#downloads)
    -유량 센서를 분리하십시오
    -* QGroundControl *에서 ** Configuration > 펌웨어 업데이트 **. 큰 녹색 **스캔** 버튼을 누릅니다.
    - 유량 센서를 연결합니다.
      감지되면 업그레이드를 클릭합니다 (기본값은 "안정"으로 유지).
    -* QGroundControl * 창을 최대화합니다. **도구 위젯 > 비디오 다운 링크 **
    -라이브 뷰를 즐기고 ** 잠금 나사를 풀고 3m 거리에있는 물체에서 렌즈를 돌려 카메라 초점을 맞춥니 다 **.
    - 센서 초점을 맞추기 위해 더 높은 해상도를 얻으려면 ** Config > 고급 구성 **을 선택하고 [VIDEO_ONLY] (# VIDEO_ONLY) 매개변수를 1로 설정합니다.
    

## 일반적인 문제 해결

- 연결되어있으면, 유량 센서를 분리합니다.
- *QGroundControl*을 시작하고 PX4 시작 모드를 선택하고 **설정 &gt; 펌웨어 업그레이드**로 이동합니다. 
  - 스캔을 클릭합니다 (중앙의 녹색 버튼).
  - 유량 센서를 연결합니다.
  - 펌웨어 안정버전을 플래시합니다.
- 매개변수를 조회는 왼쪽 메뉴에서 **고급 설정**을 클릭하십시오.
- QGroundControl로 비디오 스트림 표시 (**도구 위젯 &gt; 비디오 다운 링크**) 
  - 스트림에 줄무늬가 있는 지 확인하십시오. 줄무늬가 있으면, `IMAGE_TEST_PAT`를 1로 설정하십시오. 위의 예제와 같아야 합니다. 이미지에 줄무늬가 있지만, 이 모드가 활성화되어 있으면, 줄무늬가 없는 경우 두 모드에서 이미지를 한 번 마우스 오른쪽 버튼으로 클릭하고 각 모드의 이미지를 저장하고 제조업체의 지원 팀에 전송합니다.
  - 선명한 이미지 획득 여부를 확인하십시오 (망원/줌 렌즈이므로 가시 영역이 작습니다).
- 고해상도 이미지를 얻으려면, `VIDEO_ONLY` 매개변수를 1로 설정하십시오.
- 작동 거리 (일반 비행 고도)에서 이미지가 선명한 지 확인하십시오.
  
:::tip
아래 그림처럼 어두운 선이 보이는 왜곡된 이미지가있는 경우 [도움을 요청](../contribute/support.md#forums-and-chat) 하십시오. ![Distorted video](../../assets/hardware/sensors/px4flow/px4flow_video_distorted.png)
:::

<span id="developer_guide"></span>

# PX4FLOW 개발자 가이드

## 하드웨어 설정

- PX4FLOW Board v1.3
- HRLV-MaxSonar-EZ (MB1043)
- 16mm 렌즈
- Micro USB 케이블

![PX4FLOW Testing](../../assets/hardware/sensors/px4flow/px4flow_testing.jpg)

## 소프트웨어 / 빌드 소스

- *QGroundControl*이 설치 PC
- PX4FLOW 펌웨어 (Github의 펌웨어 소스 코드: [PX4/Flow](https://github.com/PX4/Flow))

:::note PX4 *드라이버* 코드는[PX4/ PX4-Autopilot/src/drivers/px4flow](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/optical_flow/px4flow)를 참고하십시오.
:::

## 빌드

[PX4 도구 모음](../dev_setup/dev_env.md)을 설치합니다. *git*을 사용하여 https://github.com/PX4/Flow 에서 소스를 복제합니다.

```bash
cd flow
make all
make upload-usb
```

유량 센서를 연결합니다. 성공적으로 업로드되면, 다음 단계가 표시됩니다.

```bash
/dev/ttyACM1에서 보드 6,0 부트 로더 rev 3을 찾았습니다.
삭제...
program...
verify...
done, rebooting.
```

## 문제 해결

앞 단계를 볼 수 없는 경우에는 모뎀 관리자를 다음과 같이 제거하여야 합니다.

```bash
sudo apt-get remove modemmanager
```

사용자는 또한 plugdev 그룹에 있어야 합니다.

```bash
sudo usermod -a -G plugdev $USER
```

## 이미지 초점

Connect PX4FLOW to QGroundControl:

- Connect PX4FLOW sensor over USB to PC
- Open QGroundControl
- Switch to Plot perspective: Perspectives/Plot 
- Connect to PX4FLOW sensor: Communication/Add Link

![PX4 Onboard Parameters](../../assets/hardware/sensors/px4flow/px4flow_onboard_parameters.png)

- Link Type: Serial
- Protocol: MAVLink
- Serial Port: corresponding Port (e.g. /dev/ttyACM* or COMM*)

Now a new unmanned system should appear and onboard parameters are loaded (click on "Get" if not)

Change Parameter `VIDEO_ONLY` to 1 and press Set.

The Widget Video Downlink shows now the Image in full resolution. Focus the lens on 1.5m. Fix the lens position and switch `VIDEO_ONLY` Mode off.

## Data Output

The PX4FLOW module outputs [MAVLink](https://mavlink.io/en/) packets on USB and serial port. Use [QGroundControl](http://qgroundcontrol.com/) to read data from the module. An I2C interface for sensor data reading is offered as well. Third party [libraries](#libraries) are available to connect and integrate PX4FLOW data in your projects.

- USART3: MAVLink at 115200, 8N1 baud: [OPTICAL_FLOW](https://mavlink.io/en/messages/common.html#OPTICAL_FLOW) message, [OPTICAL_FLOW_RAD](https://mavlink.io/en/messages/common.html#OPTICAL_FLOW_RAD), [HEARTBEAT](https://mavlink.io/en/messages/common.html#HEARTBEAT) message
- USB: Baud rate is not relevant (USB ignores it): `OPTICAL_FLOW` message, `OPTICAL_FLOW_RAD`, `HEARTBEAT` message, image.
- I2C1: latest Flow value (i2c_frame) and accumulated Flow (i2c_integral_frame) values since last I2C readout available for readout.

## PX4FLOW Parameters

The following list gives a short explanation of the current available parameters in the PX4FLOW firmware.

:::warning
Parameters are currently not written to ROM (they reset at power loss). To change them permanently build your own version of firmware using instructions in the [PX4FLOW Developer Guide](#developer_guide) above. Relevant parameters can be found [here](https://github.com/PX4/Flow/blob/master/src/modules/flow/settings.c).
:::

### BFLOW_F_THRD

This parameter is a feature threshold and limits the quality of patterns that are used to calculate the bottom flow. For low values (e.g. 10) almost every pattern is taken, for higher values (e.g. 100) only significant patters are taken.

### BFLOW_V_THRD

This is a pattern correlation threshold for filtering bad matches. Lower means only strong correlations are accepted.

### Others

| Name             | Default | Access | Comment                                                                                                                                                                                                                                        |
| ---------------- | ------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AEC              | 1       | RW     | Camera Automatic Exposure Control. 1: ON, 0: OFF.                                                                                                                                                                                              |
| AGC              | 1       | RW     | Camera Automatic Gain Control. 1: ON, 0: OFF.                                                                                                                                                                                                  |
| BFLOW_F_THLD   | 40      | RW     | This parameter is a feature threshold and limits the quality of patterns that are used to calculate the bottom flow. For low values (e.g. 10) almost every pattern is taken, for higher values (e.g. 100) only significant patterns are taken. |
| BFLOW_V_THLD   | 5000    | RW     | This is a pattern correlation threshold for filtering bad matches. Lower means only strong correlations are accepted.                                                                                                                          |
| BFLOW_HIST_FIL | 0       | RW     | Flow histogram filter. 1: ON, 0: OFF.                                                                                                                                                                                                          |
| BFLOW_GYRO_COM | 0       | RW     | Gyro compensation. 1: ON, 0: OFF.                                                                                                                                                                                                              |
| BFLOW_LP_FIL   | 0       | RW     | Lowpass filter on flow output. 1: ON, 0: OFF.                                                                                                                                                                                                  |
| BFLOW_W_NEW    | 0.3     | RW     | Flow lowpass filter gain                                                                                                                                                                                                                       |
| BFLOW_MAX_PIX  | 8       | R      | Delete (parameter not used).                                                                                                                                                                                                                   |
| BFLOW_RATE       | 10.0    | RW     | Rate with which updates for optical flow are published                                                                                                                                                                                         |
| BRIGHT           | 20      | RW     | Desired brightness level from camera                                                                                                                                                                                                           |
| DEBUG            | 1       | RW     | Debug messages. 1: ON, 0: OFF                                                                                                                                                                                                                  |
| EXPOSURE_MAX     | 500     | RW     | Maximal exposure time (μs)                                                                                                                                                                                                                     |
| GAIN_MAX         | 16      | RW     | Maximal gain (units?)                                                                                                                                                                                                                          |
| GYRO_SENS_DPS  | 250     | RW     | Gyroscope sensitivity: 250, 500, 2000 (dps)                                                                                                                                                                                                    |
| GYRO_COMP_THR  | 0.01    | RW     | Gyro compensation threshold (dps): Gyro data lower than this threshold is not compensated to prevent drift                                                                                                                                     |
| HDR              | 1       | RW     | Camera High Dynamic Range. 1: ON, 0: OFF                                                                                                                                                                                                       |
| IMAGE_HEIGHT     | 64      | R      | Image height (pixels)                                                                                                                                                                                                                          |
| IMAGE_WIDTH      | 64      | R      | Image width (pixels)                                                                                                                                                                                                                           |
| IMAGE_L_LIGHT  | 0       | RW     | Delete (parameter not used).                                                                                                                                                                                                                   |
| IMAGE_NOISE_C  | 1       | RW     | Image sensor noise correction, 1: ON, 0: OFF                                                                                                                                                                                                   |
| IMAGE_TEST_PAT | 0       | RW     | Gray-shaded test pattern mode. 1: ON, 0: OFF                                                                                                                                                                                                   |
| LENS_FOCAL_LEN | 16.0    | RW     | Focal length of lens (mm)                                                                                                                                                                                                                      |
| POSITION         | 0       | RW     | 0: Only position 0 is used (Bottom: 0, Front: 1, Top: 2, Back: 3, Right: 4, Left: 5)                                                                                                                                                           |
| SHTR_W_1       | 443     | RW     | Camera Shutter W_1 ?                                                                                                                                                                                                                           |
| SHTR_W_2       | 473     | RW     | Camera Shutter W_2 ?                                                                                                                                                                                                                           |
| SHTR_W_TOT     | 480     | RW     | Camera Shutter Total ?                                                                                                                                                                                                                         |
| SONAR_FILTERED   | 0       | RW     | Kalman filter on sonar output. 1: ON, 0: OFF.                                                                                                                                                                                                  |
| SONAR_KAL_L1   | 0.8461  | RW     | Sonar Kalman gain L1 (for the position)                                                                                                                                                                                                        |
| SONAR_KAL_L2   | 6.2034  | RW     | Sonar Kalman gain L2 (for the speed)                                                                                                                                                                                                           |
| SYS_ID           | 81      | RW     | [MAVLink](https://mavlink.io/en/) System ID                                                                                                                                                                                                    |
| SYS_COMP_ID    | 50      | RW     | [MAVLink](https://mavlink.io/en/) Component ID                                                                                                                                                                                                 |
| SYS_SENSOR_ID  | 77      | RW     | [MAVLink](https://mavlink.io/en/) Sensor ID                                                                                                                                                                                                    |
| SYS_TYPE         | 0       | RW     | [MAVLink](https://mavlink.io/en/) System Type (0 means generic)                                                                                                                                                                                |
| SYS_AP_TYPE    | 0       | RW     | [MAVLink](https://mavlink.io/en/) Autopilot Type (0 means generic)                                                                                                                                                                             |
| SYS_SW_VER     | 13XX    | R      | Software Version                                                                                                                                                                                                                               |
| SYS_SEND_STATE | 1       | RW     | Send [MAVLink](https://mavlink.io/en/messages/common.html#HEARTBEAT) Heartbeat. 1: ON, 0: OFF.                                                                                                                                                 |
| SYS_SEND_LPOS  | 1       | RW     | Send [MAVLink](https://mavlink.io/en/messages/common.html#LOCAL_POSITION_NED) Local position estimate. 1: ON, 0: OFF.                                                                                                                          |
| USART_2_BAUD   | 115200  | R      | Baudrate USART 2                                                                                                                                                                                                                               |
| USART_3_BAUD   | 115200  | R      | Baudrate USART 3 (Data Output)                                                                                                                                                                                                                 |
| USB_SEND_DEBUG | 1       | RW     | Send debug msgs over USB. 1: ON, 0: OFF.                                                                                                                                                                                                       |
| USB_SEND_FLOW  | 1       | RW     | Send flow over USB. 1: ON. 0: OFF.                                                                                                                                                                                                             |
| USB_SEND_FWD   | 0       | RW     | Send forwarded flow over USB. 1: ON, 0: OFF.                                                                                                                                                                                                   |
| USB_SEND_GYRO  | 1       | RW     | Send gyro data over USB. 1: ON, 0: OFF.                                                                                                                                                                                                        |
| USB_SEND_VIDEO | 1       | RW     | Send video over USB. 1: ON, 0: OFF.                                                                                                                                                                                                            |
| VIDEO_ONLY       | 0       | RW     | High resolution video mode. 1: ON, 0: OFF                                                                                                                                                                                                      |
| VIDEO_RATE       | 50      | RW     | Time between images of video transmission (ms)                                                                                                                                                                                                 |

## Modes

<span id="VIDEO_ONLY"></span>

### VIDEO ONLY Mode

Set `VIDEO_ONLY` to 1 for high resolution mode. In this mode the camera image is transmitted at a higher resolution to ease the lens focus process. No flow values are calculated in this mode.

### Test Pattern Mode

If the parameter `IMAGE_TEST_PAT` is set to 1, the sensor inserts a vertical gray-shaded test pattern in the signal chain.

- Test Pattern 64x64 (VIDEO ONLY Mode is OFF) ![test_pattern_64x64](../../assets/hardware/sensors/px4flow/test_pattern_64x64.png)
- Test Pattern 376x240 (VIDEO ONLY Mode is ON) ![test_pattern_376x240](../../assets/hardware/sensors/px4flow/test_pattern_376x240.png)