# LightWare SF1X/SF02/LW20 라이다

LightWare는 UAV에 장착에 적합한 경량의 범용 레이저 고도계( "라이다")를 개발합니다. 지형 추적, 정밀 호버링 (예 : 사진 촬영), 규제 높이 제한 경고, 충돌 방지 감지 등의 응용 분야에 유용합니다.

![LightWare SF11/C Lidar](../../assets/hardware/sensors/lidar_lightware/sf11c_120_m.jpg)

## 지원 모델

아래의 모델들은 PX4에서 지원되며, I2C 또는 직렬 버스에 연결할 수 있습니다 (아래 표는 각 모델에 사용할 수 있는 버스를 나타냄).

### Available

| Model                                                                                  | Range (m) | Bus               | Description                                                     |
| -------------------------------------------------------------------------------------- | --------- | ----------------- | --------------------------------------------------------------- |
| [SF11/C](https://lightware.co.za/collections/lidar-rangefinders/products/sf11-c-120-m) | 120       | Serial or I2C bus |                                                                 |
| [LW20/C](https://lightware.co.za/products/lw20-c-100-m)                                | 100       | I2C bus           | Waterproofed (IP67) with servo for sense-and-avoid applications |

### Discontinued

The following models are no longer available from the manufacturer.

| Model                                                                                              | Range | Bus                                                                       |
| -------------------------------------------------------------------------------------------------- | ----- | ------------------------------------------------------------------------- |
| [SF02](http://documents.lightware.co.za/SF02%20-%20Laser%20Rangefinder%20Manual%20-%20Rev%208.pdf) | 50    | Serial                                                                    |
| [SF10/A](http://documents.lightware.co.za/SF10%20-%20Laser%20Altimeter%20Manual%20-%20Rev%206.pdf) | 25    | Serial or I2C                                                             |
| [SF10/B](http://documents.lightware.co.za/SF10%20-%20Laser%20Altimeter%20Manual%20-%20Rev%206.pdf) | 50    | Serial or I2C                                                             |
| SF10/C                                                                                             | 100m  | Serial or I2C                                                             |
| LW20/B                                                                                             | 50    | I2C bus | Waterproofed (IP67) with servo for sense-and-avoid applications |

## I2C Setup

Check the tables above to confirm that which models can be connected to the I2C port.

### Lidar Configuration

This hardware does not ship with Pixhawk I2C compatibility enabled by default. To enable support, you have to download [LightWare Studio](https://lightwarelidar.com/pages/lightware-studio) and got to **Parameters > Communication** and tick mark **I2C compatibility mode (Pixhawk)**

![LightWare SF11/C Lidar-I2C Config](../../assets/hardware/sensors/lidar_lightware/lightware_studio_i2c_config.jpg)

<a id="i2c_hardware_setup"></a>

### Hardware

Connect the Lidar the autopilot I2C port as shown below (in this case, for the [Pixhawk 1](../flight_controller/mro_pixhawk.md)).

![SF1XX LIDAR to I2C connection](../../assets/hardware/sensors/lidar_lightware/sf1xx_i2c.jpg)

:::note
Some older revisions cannot be used with PX4. Specifically they may be miss-configured to have an I2C address equal to `0x55`, which conflicts with `rgbled` module. On Linux systems you may be able to determine the address using [i2cdetect](http://manpages.ubuntu.com/manpages/bionic/en/man8/i2cdetect.8.html). If the I2C address is equal to `0x66` the sensor can be used with PX4.
:::

<a id="i2c_parameter_setup"></a>

### Parameter Setup

Set the [SENS_EN_SF1XX](../advanced_config/parameter_reference.md#SENS_EN_SF1XX) parameter to match the rangefinder model and then reboot.

## Serial Setup

<a id="serial_hardware_setup"></a>

### Hardware

The lidar can be connected to any unused *serial port* (UART), e.g.: TELEM2, TELEM3, GPS2 etc.

<!-- Would be good to show serial setup! -->

<a id="serial_parameter_setup"></a>

### Parameter Setup

[Configure the serial port](../peripherals/serial_configuration.md) on which the lidar will run using [SENS_SF0X_CFG](../advanced_config/parameter_reference.md#SENS_SF0X_CFG). There is no need to set the baud rate for the port, as this is configured by the driver.

:::note
If the configuration parameter is not available in *QGroundControl* then you may need to [add the driver to the firmware](../peripherals/serial_configuration.md#parameter_not_in_firmware).
:::

Then set the [SENS_EN_SF0X](../advanced_config/parameter_reference.md#SENS_EN_SF0X) parameter to match the rangefinder model and reboot.

## Further Information

- [Modules Reference: Distance Sensor (Driver) : sf1xx](../modules/modules_driver_distance_sensor.md#sf1xx)