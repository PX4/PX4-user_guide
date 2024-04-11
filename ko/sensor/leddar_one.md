# LeddarOne 라이다

[ LeddarOne](https://leddartech.com/solutions/leddarone/)은 좁지만 확산 빔이 있는 소형 Lidar 모듈로, 견고하고 신뢰할 수 있으며, 가성비가 높은 패키지로 우수한 감지 범위를 가지고 있습니다. 감지 범위는 1cm ~ 40m이며 UART/직렬 버스로 연결합니다.

<img src="../../assets/hardware/sensors/leddar_one.jpg" alt="LeddarOne 라이다 거리계" width="200px" />

## 하드웨어 설정

LeddarOne can be connected to any unused _serial port_ (UART), e.g.: TELEM2, TELEM3, GPS2 etc.

보드 핀배열과 LeddarOne 핀배열(아래 참조)에 따라 적절한 케이블을 사용합니다. 5V, TX, RX 및 GND 핀만 연결하면 됩니다.

| 핀 | LeddarOne |
| - | --------- |
| 1 | GND       |
| 2 | -         |
| 3 | VCC       |
| 4 | RX        |
| 5 | TX        |
| 6 | -         |

## 매개변수 설정

[SENS_LEDDAR1_CFG](../advanced_config/parameter_reference.md#SENS_LEDDAR1_CFG)를 사용하여 LIDAR가 실행되는 [직렬 포트를 설정](../peripherals/serial_configuration.md)합니다. 포트 전송속도는 드라이버에 의해 설정되므로, 추가로 설정할 필요는 없습니다.

::: info If the configuration parameter is not available in _QGroundControl_ then you may need to [add the driver to the firmware](../peripherals/serial_configuration.md#parameter_not_in_firmware):

```plain
CONFIG_DRIVERS_DISTANCE_SENSOR_LEDDAR_ONE=y
```

:::

## 추가 정보

- [LeddarOne 사양 시트](https://leddartech.com/app/uploads/dlm_uploads/2021/04/Spec-Sheet_LeddarOne_V10.0_EN-1.pdf)
