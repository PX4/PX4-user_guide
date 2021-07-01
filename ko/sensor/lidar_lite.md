# Lidar-Lite

LIDAR-Lite는 드론, 로봇 또는 무인 차량용 소형 고성능 광학 원거리 측정 센서입니다. I2C 또는 PWM에 연결됩니다.

![LidarLite v3](../../assets/hardware/sensors/lidar_lite/lidar_lite_v3.jpg)

## 구매처

* [LIDAR-Lite v3](https://buy.garmin.com/en-AU/AU/p/557294) (5cm - 40m)

## 핀배열

Lidar-Lite (v2, v3) 핀배열은 아래와 같습니다.

| 핀 | 명칭       | 설명                                                                                                |
| - | -------- | ------------------------------------------------------------------------------------------------- |
| 1 | POWER_IN | 전원 공급. 4.75-5.5V DC 공칭, 최대 6V DC.                                                                 |
| 2 | POWER_EN | 액티브 하이는 3.3V 마이크로 컨트롤러 레귤레이터의 작동을 가능하게 합니다. 낮음은 보드를 절전 모드로 전환하고 40μA 미만을 소모합니다. (내장 100K pull-up) |
| 3 | 모드 선택 제어 | 트리거 (하이-로우 에지) PWM 출력 (하이) 제공                                                                     |
| 4 | SCL      | I2C Clock                                                                                         |
| 5 | SDA      | I2C 데이터                                                                                           |
| 6 | GND      | 신호/전원 접지.                                                                                         |

## 배선

The *Lidar-Lite v3* can be used with either PWM or I2C. PWM is recommended if using an older model. The rangefinder must be separately powered via some ESC/BEC (whether connected via PWM or I2C).

:::note
The I2C interface of non-blue-label Lidar-Lite (v1) devices has stability limitations and all silver-label generations of Lidar-Lite sensors are therefore excluded from the I2C interface. The use of the PWM interface (as detailed below) is advised for these sensors. The blue label (v2) devices can exhibit a constant offset if powered on with less than 5V under some conditions. This is currently (Q4/2015) under investigation by the manufacturer and potentially can be resolved by adhering to specific operational conditions. The recommended robust setup is a v1 device interfaced via PWM.
:::

The standard wiring instructions for Lidar-Lite 3 (from the [Operation Manual](http://static.garmin.com/pumac/LIDAR_Lite_v3_Operation_Manual_and_Technical_Specifications.pdf)) are shown below. Lidar-Lite v2 and v3 are the same, except that the order of pins in the connector is reversed (i.e. it is as though the connector was turned over).

![LidarLite v3 - Standard Wiring from Garmin Specification](../../assets/hardware/sensors/lidar_lite/lidar_lite2_standard_wiring_spec.jpg)

### PWM Interface Wiring

The pin connections for wiring LidarLite to the *Pixhawk 1* AUX ports (PWM interface) are shown below.

| Pin | Lidar-Lite (v2, v3) | Pixhawk AUX Servo | Comment                                                                                             |
| --- | ------------------- | ----------------- | --------------------------------------------------------------------------------------------------- |
| 1   | VCC                 | AUX 6 (center)    | Power supply. 4.75-5.5V DC Nominal, Maximum 6V DC.                                                  |
| 2   | RESET               | AUX 6 (bottom)    | Reset line of the sensor                                                                            |
| 3   | PWM                 | AUX 5 (bottom)    | PWM output of the Lidar Lite. **Needs a 470 Ohm pull-down (to GND), Do not use a 1 K0hm resistor.** |
| 4   | SCL                 | -                 | Not connected                                                                                       |
| 5   | SDA                 | -                 | Not connected                                                                                       |
| 6   | GND                 | AUX 6 (top)       | Ground                                                                                              |

:::note
On a flight controller that has no AUX port the equivalent MAIN pins are used (e.g. the PWM output on the lidar instead maps to MAIN 5). The pin numbers are hard-coded.
:::

The wiring for LidarLite v2 is shown below. Lidar-Lite v3 is wired similarly, except that the pin-numbering on the connector is reversed.

![Lidar Lite 2 Interface wiring](../../assets/hardware/sensors/lidar_lite/lidar_lite_2_interface_wiring.jpg)

![Lidar Lite 2 Interface wiring](../../assets/hardware/sensors/lidar_lite/lidarlite_wiring_scheme_pixhawk.jpg)

![Lidar Lite 2 pins/cabling](../../assets/hardware/sensors/lidar_lite/lidarlite_wiring_pins_cables.jpg)

### I2C Interface Wiring

The I2C wiring is the same for any other distance sensor. Simply connect the SLA, SLC, GND and VCC to the corresponding (same) pins on the flight controller and the sensor.

## Software Configuration

The rangefinder/port is enabled using [SENS_EN_LL40LS](../advanced_config/parameter_reference.md#SENS_EN_LL40LS) - set to `1` for PWM, or `2` for I2C.

:::note
The driver for this rangefinder is usually present in firmware. If missing, you would also need to add the driver (`drivers/ll40ls`) to the board configuration.
:::

## Further Information

* [LIDAR_Lite_v3_Operation_Manual_and_Technical_Specifications.pdf](http://static.garmin.com/pumac/LIDAR_Lite_v3_Operation_Manual_and_Technical_Specifications.pdf) (Garmin)