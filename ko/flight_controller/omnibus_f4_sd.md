# Omnibus F4 SD

:::warning PX4에서는 이 제품을 제조하지 않습니다. 지원 또는 규정준수 문제는 제조업체에 문의하십시오.
:::

*Omnibus F4 SD*는 레이서를 위해 설계된 컨트롤러입니다. 일반적인 레이서 보드와 달리 SD 카드와 고속 CPU 등이 추가되었습니다.

<img src="../../assets/flight_controller/omnibus_f4_sd/board.jpg" width="400px" title="Omnibus F4 SD" />

다음은 [Pixracer](../flight_controller/pixracer.md)와 주요 차이점은 다음과 같습니다.

* 저렴한 가격
* 더 적은 IO 포트(예 : GPS 또는 Flow 센서를 연결은 가능함)
* 외부 GPS용 I2C 버스에 외부 풀업 저항이 필요합니다. 아래 [I2C](#i2c)를 참조하십시오.
* 적은 RAM (192 KB vs. 256 KB) and FLASH (1 MB vs. 2 MB)
* *Pixracer*와 동일 보드 크기, 약간 더 작은 폼 팩터(커넥터가 적기 때문에)
* 통합 OSD(아직 소프트웨어에서 구현되지 않음)

:::tip
모든 일반적인 PX4 기능은 여전히 레이서에 사용할 수 있습니다!
:::

:::note
이 비행 컨트롤러는 [제조업체의 지원](../flight_controller/autopilot_manufacturer_supported.md)을 받을 수 있습니다.
:::

## 주요 기능

* 메인 시스템 온칩: [STM32F405RGT6](https://www.st.com/en/microcontrollers/stm32f405rg.html) 
  * CPU : 단정밀도 FPU의 168MHz ARM Cortex M4
  * RAM : 192KB SRAM
  * FLASH: 1 MB
* 표준 레이서 폼 팩터 : 36x36mm, 표준 30.5mm 구멍 패턴
* MPU6000 가속/자이로
* BMP280 기압계(모든 보드에 마운트된 것은 아님)
* microSD(로깅)
* Futaba S.BUS 및 S.BUS2/Spektrum DSM2 및 DSMX/Graupner SUMD/PPM 입력/Yuneec ST24
* OneShot PWM 출력(설정 가능)
* 내장 전류 센서
* 내장 OSD 칩(SPI를 통한 AB7456)

## 구매처

보드는 몇 가지 변형된 형태(예 : 기압계 포함 또는 제외)로 여러 공급 업체에서 생산합니다.

:::tip PX4는 Betaflight OMNIBUSF4SD 대상을 지원하는 보드와 호환됩니다(제품 페이지에 *OMNIBUSF4SD*가 있는 경우, 보드는 PX4에서 작동해야 함).
:::

:::tip
모든 Omnibus F4 레이블 파생물(예 : 클론)도 작동합니다. 그러나, 이러한 보드의 배전은 품질이 다양합니다.
:::

아래의 보드들은 테스트되고 작동하는 것입니다.

* [Hobbywing XRotor Flight Controller F4](http://www.hobbywing.com/goods.php?id=636) :::note This board fits on top of the [Hobbywing XRotor Micro 40A 4in1 ESC](http://www.hobbywing.com/goods.php?id=588) without soldering. This ESC board also provides power for the Omnibus board.
:::
  
  Purchase from:
  
  * [Hobbywing XRotor F4 Flight Controller w/OSD](https://www.getfpv.com/hobbywing-xrotor-f4-flight-controller-w-osd.html) (getfpv)

* Original Airbot Omnibus F4 SD
  
  Purchase from:
  
  * [Airbot (CN manufacturer)](https://store.myairbot.com/omnibusf4prov3.html)
  * [Ready To Fly Quads (US reseller)](http://www.readytoflyquads.com/flip-32-f4-omnibus-v2-pro)

Accessories include:

* [ESP8266 WiFi Module](../telemetry/esp8266_wifi_module.md) for MAVLink telemetry. You need to connect these pins: GND, RX, TX, VCC and CH-PD (CH-PD to 3.3V). The baud rate is 921600.

## Connectors

Boards from different vendors (based on this design) can have significantly different layout. Layouts/Silkscreens for various versions are shown below.

### Airbot Omnibus F4 SD

Below are silkscreens for the Airbot Omnibus F4 SD (V1), showing both top and bottom.

![Omnibus F4 SD v1 Silkscreen Top](../../assets/flight_controller/omnibus_f4_sd/silk-top.jpg) ![Omnibus F4 SD v1 Silkscreen Bottom](../../assets/flight_controller/omnibus_f4_sd/silk-bottom.jpg)

### Hobbywing XRotor Flight Controller F4

Below are silkscreens for the Hobbywing XRotor Flight Controller F4.

![Hobbywing XRotor Flight Controller F4 Silkscreen](../../assets/flight_controller/omnibus_f4_sd/hobbywing_xrotor_silk.png)

## Pinouts

### Radio Control

RC is connected to one of the following ports:

* UART1
* SBUS/PPM port (via inverter, internally goes to UART1)

:::note
Some Omnibus F4 boards have a jumper connecting either or both the MCU SBUS and PPM to a single pin header. Set your jumper or solder bridge to the appropriate MCU pin before use.
:::

### UARTs

* UART6: GPS port
  
  * TX: MCU pin PC6
  * RX: MCU pin PC7
  
  * Airbot Omnibus F4 SD Pinout is on Port J10 (TX6/RX6):
  
  ![Omnibus F4 SD UART6](../../assets/flight_controller/omnibus_f4_sd/uart6.jpg)

* UART4
  
  * TX: MCU pin PA0
  * RX: MCU pin PA1
  * 57600 baud
  * This can be configured as the `TELEM 2` port.
  * Airbot Omnibus F4 SD Pinout: 
    * TX: RSSI pin
    * RX: PWM out 5
  
  ![Omnibus F4 SD UART4](../../assets/flight_controller/omnibus_f4_sd/uart4.jpg)
  
  ![Omnibus F4 SD UART4 Top](../../assets/flight_controller/omnibus_f4_sd/uart4-top.jpg)

### I2C

There is one I2C port available via:

* SCL: MCU pin PB10 (might be labeled as TX3)
* SDA: MCU pin PB11 (might be labeled as RX3)

:::note
You will need external pullups on both signals (clock and data). You can use 2.2k pullups for example to attach an external mag.
:::

    - Airbot Omnibus F4 SD Pinout is on Port J10 (SCL [clock] / SCA [data]):
    

![](../../assets/flight_controller/omnibus_f4_sd/uart6.jpg "Omnibus F4 SD UART6")

Here is an example implementation. I used a Spektrum plug to get 3.3v from the DSM port, connecting only 3.3v + to each line via 2.2k resistor.

![Omnibus F4 SD Pullup](../../assets/flight_controller/omnibus_f4_sd/pullup-schematic.jpg)

![Omnibus F4 SD Pullup Implementation](../../assets/flight_controller/omnibus_f4_sd/pullup.jpg)

## Serial Port Mapping

| UART   | Device     | Port     |
| ------ | ---------- | -------- |
| USART1 | /dev/ttyS0 | SerialRX |
| USART4 | /dev/ttyS1 | TELEM1   |
| USART6 | /dev/ttyS2 | GPS      |

<!-- Note: Got ports using https://github.com/PX4/px4_user_guide/pull/672#issuecomment-598198434 -->

## RC Telemetry

The Omnibus supports telemetry to the RC Transmitter using [FrSky Telemetry](../peripherals/frsky_telemetry.md) or [CRSF Crossfire Telemetry](#crsf_telemetry).

<span id="crsf_telemetry"></span>

### CRSF Crossfire Telemetry

TBS CRSF Crossfire telemetry is used to send telemetry data from the flight controller (the vehicle's attitude, battery, flight mode and GPS data) to the RC transmitter (Taranis).

Benefits over FrSky telemetry include:

* Only a single UART is needed for RC and telemetry.
* The CRSF protocol is optimized for low latency.
* 150 Hz RC update rate.
* The signals are uninverted and thus no (external) inverter logic is required.

For Omnibus we recommend the [TBS Crossfire Nano RX](http://team-blacksheep.com/products/prod:crossfire_nano_rx), since it is specifically designed for small Quads.

On the handheld controller (e.g. Taranis) you will also need a [Transmitter Module](http://team-blacksheep.com/shop/cat:rc_transmitters#product_listing). This can be plugged into the back of the RC controller.

:::note
The referenced links above contains the documentation for the TX/RX modules.
:::

#### Setup

Connect the Nano RX and Omnibus pins as shown:

| Omnibus UART1 | Nano RX |
| ------------- | ------- |
| TX            | Ch2     |
| RX            | Ch1     |

Nothing else needs to be configured on PX4 flight controller side - the RC protocol is auto-detected.

Next update the TX/RX modules to use the CRSF protocol and set up telemetry. Instructions for this are provided in the [TBS Crossfire Manual](https://www.team-blacksheep.com/tbs-crossfire-manual.pdf) (search for 'Setting up radio for CRSF').

## Schematics

The schematics are provided by [Airbot](https://myairbot.com/): [OmnibusF4-Pro-Sch.pdf](http://bit.ly/obf4pro).

<span id="bootloader"></span>

## PX4 Bootloader Update

The board comes pre-installed with [Betaflight](https://github.com/betaflight/betaflight/wiki). Before PX4 firmware can be installed, the *PX4 bootloader* must be flashed. Download the [omnibusf4sd_bl.hex](https://github.com/PX4/px4_user_guide/raw/master/assets/flight_controller/omnibus_f4_sd/omnibusf4sd_bl_d52b70cb39.hex) bootloader binary and read [this page](../advanced_config/bootloader_update_from_betaflight.md) for flashing instructions.

## Building Firmware

To [build PX4](../dev_setup/building_px4.md) for this target:

    make omnibus_f4sd_default
    

## Installing PX4 Firmware

The firmware can be installed in any of the normal ways:

* Build and upload the source ```make omnibus_f4sd_default upload```
* [Load the firmware](../config/firmware.md) using *QGroundControl*. You can use either pre-built firmware or your own custom firmware.

## Configuration

In addition to the [basic configuration](../config/README.md), the following parameters are important:

| Parameter                                                                | Setting                                                                                                                 |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [SYS_HAS_MAG](../advanced_config/parameter_reference.md#SYS_HAS_MAG)   | This should be disabled since the board does not have an internal mag. You can enable it if you attach an external mag. |
| [SYS_HAS_BARO](../advanced_config/parameter_reference.md#SYS_HAS_BARO) | Disable this if your board does not have a barometer.                                                                   |
| [MOT_ORDERING](../advanced_config/parameter_reference.md#MOT_ORDERING)   | If you use a 4-in-1 ESC with Betaflight/Cleanflight motor assignment, this parameter can be set accordingly.            |

## Further Info

A review with further information of the board can be found [here](https://nathan.vertile.com/blog/2016/10/12/omnibusf4/).

[This page](https://blog.dronetrest.com/omnibus-f4-flight-controller-guide/) also provides a nice overview with pinouts and setup instructions.