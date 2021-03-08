# Robocat 270

Robocat 270은 경주용이 아닌 순항용으로 설계된 소형 쿼드 콥터로 [Pixracer](../flight_controller/pixracer.md) 자동조종장치를위한 최적의 시험용 제품입니다. 일반적인 250 레이서보다 무겁지만, 추가 기능과 최대 3S/2200mAh의 더 큰 배터리를 위한 많은 공간을 제공합니다. 초보자를위한 견고한 소형 쿼드 콥터로, 노년층 전문가에게도 적당합니다. 매우 쉽습니다 : Robocat, PX4 소프트웨어가 포함된 Pixracer 및 QGroundControl Groundstation : 조립, 보정 및 비행!

## 조립 및 배선

![red robo case](../../assets/airframes/multicopter/robocat_270_pixracer/red_robo_case.jpg)

Robocat 270 프레임 키트는 여러 소스에서 사용할 수 있습니다. 두 가지 버전 : 유리 섬유 또는 탄소. 후자는 유리 섬유 버전과 함께 제공되는 깨지기 쉬운 플라스틱 대신 다양한 알루미늄 스탠드오프와 함께 제공됩니다.

![red parts robocat](../../assets/airframes/multicopter/robocat_270_pixracer/red_parts_robocat.jpg)

표시된 키트에는 EMAX MT2204 모터, EMAX 12A ESC, SimonK 및 6045 카본 프로펠러가 사전에 플래시됩니다. 이것은 최고 품질보다는 저렴하지만 가격을 고려할 때 꽤 괜찮습니다. 예산이 충분합 숙련된 조종사는 Tiger Motors 및 더 빠른 ESC를 사용합니다. 더불어, CAN 버전도 Pixracer/PX4 스택과 함께 사용할 수 있습니다. 이러한 CAN 기반 FOC/벡터 제어 ESC는 많은 효율성과 신뢰성에서 얻을 수 있습니다.

![Robocat 750 basic setup](../../assets/airframes/multicopter/robocat_270_pixracer/robocat750_basic_setup_1.jpg)

첫 번째 단계는 테스트를 위해 모든 부품을 프레임에 장착하기 전에 조립하는 것입니다. 배선 세부 사항은 [Pixracer 지침](../flight_controller/pixracer.md) 가이드에 나와 있습니다.

![red robo esc](../../assets/airframes/multicopter/robocat_270_pixracer/red_robo_esc.jpg)

그 후, 36x36mm AUAV ACSP4 전원 모듈/PDB와 ESC가 잘 맞는 바닥 부분을 조립합니다. 히트 싱크가 없는 ESC를 사용하는 경우에는 공기가 잘 통하는 암 상단에 설치하는 것이 좋습니다.

![red robo bottom](../../assets/airframes/multicopter/robocat_270_pixracer/red_robo_bottom.jpg)

전류 감지를 위해 션트 저항과 함께 ACSP4를 설치하는 것이 좋습니다. 뜨거워 질 수 있으므로 전선이 닿지 않도록 해야합니다. 전도성 탄소가 단락을 일으킬 수 있으므로, 모든 와이어 절연체가 손상되지 않도록 주의하는 것이 매우 중요합니다. 12V 소스/PDB가 필요하지 않은 경우 I/U 감지 및 5V BEC를 제공하는 더 작은 (17x17mm) 새 ACSP5 전원 모듈도 사용할 수 있습니다.

![red robo top plate](../../assets/airframes/multicopter/robocat_270_pixracer/red_robo_top_plate.jpg)

Pixracer는 배터리 칸 위 1 층에 부드럽게 장착합니다. 이것은 공간 낭비처럼 보이지만, 밀접하게 연결된 와이어는 진동 방지에 적절하지 않기 때문에 배선 간격을 위해 약 20mm의 공간이 필요합니다.

Excursus : Althold 및 GPS 모드를 사용하는 모든 고급 비행 스택 및 조종사는 효과적인 댐핑이 필요합니다. 주변에 여전히 *하드 마운터*가 있지만, 대부분의 빌드/컨트롤러/플라이트 스택은 진동의 영향을 받아 Aliasing/Clipping의 핵심 문제로 이어집니다.

![vibration_aliasing](../../assets/airframes/multicopter/robocat_270_pixracer/vibration_aliasing.png)

PX4 스택은 이러한 영향도 로깅하므로 분석하기 쉽습니다. 예제 플롯은 진동으로 인한 드롭 아웃 피크가 센서 값 위아래로 상승하는 대신 한 방향으로 가고 있음을 보여줍니다. 이것은 신호의 중심을 이동시켜 비행 컨트롤러가 높이를 올리거나 내리는 것을 잘못 "말"하는 것입니다. 최신 EKF 필터 알고리즘이이를 특정 양으로 처리하도록 설계되었지만, 표시된 소프트 마운트로 인해 이와 같은 영향을 방지하는 것이 좋습니다.

![red robo damping](../../assets/airframes/multicopter/robocat_270_pixracer/red_robo_damping.jpg)

이것은 3DR 폼 패드 또는 HK 오렌지 라텍스에서 제공됩니다. 후자는 자체 접착이 아니지만 3M 5925F와 같은 양면 테이프를 사용하는 것이 좋습니다. Pixracer에 하우징을 사용하지 않는 경우 패드가 36x36mm 섬유 또는 탄소 보드 아래에 달라 붙어 baro 센서 상단의 필수 폼을 압착합니다. This foam reduces all light and most airflow impacts onto the sensor.

![red robo wires](../../assets/airframes/multicopter/robocat_270_pixracer/red_robo_wires.jpg)

It is recommended to fix the cables underneath the Pixracer to prevent damages or relocation during battery placement. Zip ties for the motor wires are worth discussing. If one arm breaks, the damage might be even bigger. For the required X Quad config, connect the four motors according to the layout shown below, so the MAIN1 connector should connect to ESC for motor 1, and so on.

![Motor order connection for Quad - X configuration](../../assets/airframes/multicopter/robocat_270_pixracer/motor_order_quad_x.png)

![red robo naked side](../../assets/airframes/multicopter/robocat_270_pixracer/red_robo_naked_side.jpg)

The side view shows lots of space for the battery and other addons like an FPV Cam/Tx, RC Rx, OSD and 3DR radio (if the ESP 8266 Wifi board, provided with the Pixracer is not used. The Piezo speaker is mounted sunnyside down near the front stand off. The safety switch, still provided with the Pixracer kit, is not needed at all. The PX4 stack doesn´t use it.

![red fat robo](../../assets/airframes/multicopter/robocat_270_pixracer/red_fat_robo.jpg)

The Pixracer with PX4 stack is providing several GPS dependent flight modes, such as Auto Missions,Loiter, Position Control and Return to Land. If the GPS is not only used for the latter, it is recommended to install one of the better GNSS units with concurrent GPS / GLONASS ability. Any type with u-blox M8N on a 35x35mm board will fit @ 2nd floor, acting as a mast replacement. It is better to use a GNSS bord with a MAG sensor onboard, since the internal MAG of a flight Controller is always prone to EMI impacts and build related offsets. These might cause TBE (Toilet bowl) effects, impacting GPS modes. Any good rec. for the Pixhawk will work with the Pixracer as well.

![red robo aufgeklappt](../../assets/airframes/multicopter/robocat_270_pixracer/red_robo_aufgeklappt.jpg)

The foldable upper part of the Robocat frame allows easy access to the Pixracer and other external components. The wiring provided with the Pixracer kit will be long enough for this application. For others it might be required to enlongate them, which is easier than to crimp new ones with JST-GH connectors.

:::note AUAV.CO supplies a large variety of replacements for several applications.
:::

When everything is ready, its time for configuration and calibration with QGroundControl.

## Airframe Configuration

Select the QAV250 configuration as shown below. This will not only put PX4 into quadrotor mode, but also load decent default tuning gains.

![QGC - select QAV240 firmware](../../assets/airframes/multicopter/robocat_270_pixracer/qav250_qgc_firmware.png)