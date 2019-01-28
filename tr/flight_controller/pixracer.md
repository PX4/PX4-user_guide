# Pixracer

The Pixhawk<sup>&reg;</sup> XRacer board family is optimized for small racing quads and planes. In contrast to [Pixfalcon](../flight_controller/pixfalcon.md) and [Pixhawk](../flight_controller/pixhawk.md) it has in-built Wifi, new sensors, convenient full servo headers, CAN and supports 2M flash.

<img src="../../assets/flight_controller/pixracer/pixracer_hero_grey.jpg" width="300px" title="pixracer + 8266 grey" />

## Key Features

* Main System-on-Chip: [STM32F427VIT6 rev.3](http://www.st.com/web/en/catalog/mmc/FM141/SC1169/SS1577/LN1789) 
  * CPU: 180 MHz ARM Cortex<sup>&reg;</sup> M4 with single-precision FPU
  * RAM: 256 KB SRAM (L1)
* Standard FPV form factor: 36x36 mm with standard 30.5 mm hole pattern
* Invensense<sup>&reg;</sup> ICM-20608 Accel / Gyro (4 KHz) / MPU9250 Accel / Gyro / Mag (4 KHz)
* HMC5983 magnetometer with temperature compensation
* Measurement Specialties MS5611 barometer
* JST GH connectors
* microSD (logging)
* Futaba S.BUS and S.BUS2 / Spektrum DSM2 and DSMX / Graupner SUMD / PPM input / Yuneec ST24
* FrSky<sup>&reg;</sup> telemetry port
* OneShot PWM out (configurable)
* Optional: Safety switch and buzzer

## Where to Buy

Pixracer is available from the [mRobotics.io](https://store.mrobotics.io/mRo-PixRacer-R15-Official-p/auav-pxrcr-r15-mr.htm).

Accessories include:

* [Digital airspeed sensor](http://www.hobbyking.com/hobbyking/store/__62752__HKPilot_32_Digital_Air_Speed_Sensor_And_Pitot_Tube_Set.html)
* [HKPilot Transceiver Telemetry Radio Set V2 (915Mhz - US Telemetry)](https://hobbyking.com/en_us/hkpilot-transceiver-telemetry-radio-set-v2-915mhz.html)
* [Hobbyking<sup>&reg;</sup> OSD + EU Telemetry (433 MHz)](http://www.hobbyking.com/hobbyking/store/__74650__Micro_HKPilot_Telemetry_Radio_Module_with_On_Screen_Display_OSD_unit_433MHz_.html)

## Kit

The Pixracer is designed to use a separate avionics power supply. This is necessary to avoid current surges from motors or ESCs to flow back to the flight controller and disturb its delicate sensors.

* Power module (with voltage and current sensing)
* I2C splitter (supporting AUAV, Hobbyking and 3DR<sup>&reg;</sup> peripherals)
* Cable kit for all common peripherals

## Wifi (no USB required)

One of the main features of the board is its ability to use Wifi for flashing new firmware, system setup and in-flight telemetry. This frees it of the need of any desktop system.

> **Todo** Setup and telemetry are already available, firmware upgrade is already supported by the default bootloader but not yet enabled

* [ESP8266 Wifi](../telemetry/esp8266_wifi_module.md)
* [Custom ESP8266 MAVLink firmware](https://github.com/dogmaphobic/mavesp8266)

## Wiring Diagrams

![Grau setup pixracer top](../../assets/flight_controller/pixracer/grau_setup_pixracer_top.jpg)

![Grau setup pixracer bottom](../../assets/flight_controller/pixracer/grau_setup_pixracer_bottom.jpg)

![setup pixracer GPS](../../assets/flight_controller/pixracer/grau_setup_pixracer_gps.jpg)

![Grau b Pixracer FrSkyS.Port Connection](../../assets/flight_controller/pixracer/grau_b_pixracer_frskys.port_connection.jpg)

![Grau ACSP4 2 roh](../../assets/flight_controller/pixracer/grau_acsp4_2_roh.jpg)

![Grau ACSP5 roh](../../assets/flight_controller/pixracer/grau_acsp5_roh.jpg)

## Connectors

All connectors follow the [Dronecode connector standard](https://wiki.dronecode.org/workgroup/connectors/start). Unless noted otherwise all connectors are JST GH.

## Pinouts

TELEM1, TELEM2+OSD ports

| Pin     | Signal    | Volt  |
| ------- | --------- | ----- |
| 1 (red) | VCC       | +5V   |
| 2 (blk) | TX (OUT)  | +3.3V |
| 3 (blk) | RX (IN)   | +3.3V |
| 4 (blk) | CTS (IN)  | +3.3V |
| 5 (blk) | RTS (OUT) | +3.3V |
| 6 (blk) | GND       | GND   |

GPS port

| Pin     | Signal   | Volt  |
| ------- | -------- | ----- |
| 1 (red) | VCC      | +5V   |
| 2 (blk) | TX (OUT) | +3.3V |
| 3 (blk) | RX (IN)  | +3.3V |
| 4 (blk) | I2C1 SCL | +3.3V |
| 5 (blk) | I2C1 SDA | +3.3V |
| 6 (blk) | GND      | GND   |

FrSky Telemetry / SERIAL4

| Pin     | Signal   | Volt  |
| ------- | -------- | ----- |
| 1 (red) | VCC      | +5V   |
| 2 (blk) | TX (OUT) | +3.3V |
| 3 (blk) | RX (IN)  | +3.3V |
| 4 (blk) | GND      | GND   |

RC Input (accepts PPM / S.BUS / Spektrum / SUMD / ST24)

| Pin     | Signal  | Volt  |
| ------- | ------- | ----- |
| 1 (red) | VCC     | +5V   |
| 2 (blk) | RC IN   | +3.3V |
| 3 (blk) | RSSI IN | +3.3V |
| 4 (blk) | VDD 3V3 | +3.3V |
| 5 (blk) | GND     | GND   |

CAN

| Pin     | Signal | Volt |
| ------- | ------ | ---- |
| 1 (red) | VCC    | +5V  |
| 2 (blk) | CAN_H  | +12V |
| 3 (blk) | CAN_L  | +12V |
| 4 (blk) | GND    | GND  |

POWER

| Pin     | Signal  | Volt  |
| ------- | ------- | ----- |
| 1 (red) | VCC     | +5V   |
| 2 (blk) | VCC     | +5V   |
| 3 (blk) | CURRENT | +3.3V |
| 4 (blk) | VOLTAGE | +3.3V |
| 5 (blk) | GND     | GND   |
| 6 (blk) | GND     | GND   |

SWITCH

| Pin     | Signal           | Volt  |
| ------- | ---------------- | ----- |
| 1 (red) | SAFETY           | GND   |
| 2 (blk) | !IO_LED_SAFETY | GND   |
| 3 (blk) | VCC              | +3.3V |
| 4 (blk) | BUZZER-          | -     |
| 5 (blk) | BUZZER+          | -     |

Dronecode debug port (JST SM06B connector)

| Pin     | Signal           | Volt  |
| ------- | ---------------- | ----- |
| 1 (red) | VCC TARGET SHIFT | +3.3V |
| 2 (blk) | CONSOLE TX (OUT) | +3.3V |
| 3 (blk) | CONSOLE RX (IN)  | +3.3V |
| 4 (blk) | SWDIO            | +3.3V |
| 5 (blk) | SWCLK            | +3.3V |
| 6 (blk) | GND              | GND   |

![Pixracer top pinouts](../../assets/flight_controller/pixracer/pixracer_r09_top_pinouts.jpg)

![Pixracer bottom pinouts](../../assets/flight_controller/pixracer/pixracer_r09_bot_pinouts.jpg)

![Pixracer esp](../../assets/flight_controller/pixracer/pixracer_r09_esp_01.jpg)

## Schematics

The reference is provided as: [Altium Design Files](https://github.com/AUAV-OpenSource/FMUv4-PixRacer)

The following PDF files are provided for *convenience only*:

* [pixracer-rc12-12-06-2015-1330.pdf](https://github.com/PX4/px4_user_guide/raw/master/assets/flight_controller/pixracer/pixracer-rc12-12-06-2015-1330.pdf)
* [pixracer-r14.pdf](https://github.com/PX4/px4_user_guide/raw/master/assets/flight_controller/pixracer/pixracer-r14.pdf) - R14 or RC14 is printed next to the SDCard socket

## Building Firmware

> **Tip** Most users will not need to build this firmware! It is pre-built and automatically installed by *QGroundControl* when appropriate hardware is connected.

To [build PX4](https://dev.px4.io/en/setup/building_px4.html) for this target:

    make px4_fmu-v4_default
    

## Credits

This design was created by Nick Arsov and Phillip Kocmoud and architected by Lorenz Meier, David Sidrane and Leonard Hall.