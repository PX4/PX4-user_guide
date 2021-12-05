# 픽스호크 시리즈 보조 컴퓨터

Pixhawk 보드에 연결된 보조 컴퓨터(라즈베리 파이, Odroid, Tegra K1)는  동일한 방식으로 작동합니다. 보조 컴퓨터 연결 직렬 포트 `TELEM 2`를 사용하여 연결합니다. 통신 포맷은 [MAVLink](https://mavlink.io/en/)입니다.

## 픽스호크 설정

[설정 가능한 직렬 포트](../peripherals/serial_configuration.md)에서 MAVLink를 활성화하십시오.

:::tip
일반적으로 `TELEM 2` 포트는 보조 컴퓨터에 사용됩니다.
:::

`TELEM 2`에서 다음 매개변수를 사용하여, 보조 컴퓨터 메시지 전송을 설정합니다.
* [MAV_1_CONFIG](../advanced_config/parameter_reference.md#MAV_1_CONFIG) = `TELEM 2` (`MAV_1_CONFIG`는 `TELEM 2` 포트 매핑 목적으로 주로 사용됩니다)
* [MAV_1_MODE](../advanced_config/parameter_reference.md#MAV_1_MODE) = `Onboard`
* [SER_TEL2_BAUD](../advanced_config/parameter_reference.md#SER_TEL2_BAUD) = `921600` (로그 스트리밍 또는 FastRTPS 활용 목적으로 921600 이상의 값을 권장합니다)

자세한 내용은 [MAVLink 주변 장치(GCS/OSD/보조컴퓨터)](../peripherals/mavlink_peripherals.md)를 참고하십시오.


## 보조 컴퓨터 설정

MAVLink를 수신하기위하여 보조 컴퓨터의 직렬 포트와 통신하는 소프트웨어를 실행하여합니다. 가장 일반적인 옵션은 다음과 같습니다.

  * ROS 노드 통신용 [MAVROS](../ros/mavros_installation.md)
  * 개별 작성 코드를 연결용 [C/C++ 예제 코드](https://github.com/mavlink/c_uart_interface_example)
  * 직렬과 UDP 간에 MAVLink를 라우팅하기 위한 [MAVLink 라우터](https://github.com/intel/mavlink-router)(권장) 또는 [MAVProxy](https://ardupilot.org/mavproxy/)

## 하드웨어 설정

아래의 방법에 따라 직렬 포트를 연결합니다. 모든 Pixhawk 직렬 포트는 3.3V에서 작동하며 5V 레벨과 호환됩니다.

:::warning
최신 보조 컴퓨터는 대부분 하드웨어 UART에서 1.8V 레벨만 지원하며 3.3V 레벨에서는  손상될 수 있습니다. 레벨 시프터를 사용하십시오. 대부분의 경우 액세스 가능한 하드웨어 직렬 포트에는 이미 일부 기능(모뎀 또는 콘솔)이 연결되어 있으며, 사용하기 전에 *Linux에서 재구성*하여야 합니다.
:::

확실하고 안전한 방법은 아래의 결선표를 참고하여 FTDI 칩을 내장한 USB-직렬 변환 보드를 사용하는 것입니다. 이것은 항상 작동하며, 설정도 간편합니다.

| TELEM2 |           | FTDI | &nbsp;            |
| ------ | --------- | ---- | ----------------- |
| 1      | +5V (red) |      | 연결 금지!            |
| 2      | TX  (출력)  | 5    | FTDI RX (황) (입력)  |
| 3      | RX  (입력)  | 4    | FTDI TX (적황) (출력) |
| 4      | CTS (입력)  | 6    | FTDI RTS (녹) (출력) |
| 5      | RTS (출력)  | 2    | FTDI CTS (갈) (입력) |
| 6      | GND       | 1    | FTDI GND (흑)      |

## Linux에서 소프트웨어 설정

Linux에서 USB FTDI의 기본 이름은 `\dev\ttyUSB0` 입니다. USB 또는 Arduino에 연결된 두 번째 FTDI가 있는 경우에는 `\dev\ttyUSB1`으로 등록됩니다. 첫 번째 연결된 것과 두 번째 연결된 것 사이의 혼란을 피하기 위하여, USB 장치의 공급업체 및 제품 ID에 따라 `ttyUSBx`에서 친숙한 이름으로 심볼릭 링크를 만드는 것이 좋습니다.

`lsusb`를 사용하여 공급업체 및 제품 ID를 조회할 수 있습니다.

```sh
$ lsusb

Bus 006 Device 002: ID 0bda:8153 Realtek Semiconductor Corp. Bus 006 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 005 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 004 Device 002: ID 05e3:0616 Genesys Logic, Inc. Bus 004 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 003 Device 004: ID 2341:0042 Arduino SA Mega 2560 R3 (CDC ACM)
Bus 003 Device 005: ID 26ac:0011
Bus 003 Device 002: ID 05e3:0610 Genesys Logic, Inc. 4-port hub
Bus 003 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 002 Device 001: ID 1d6b:0001 Linux Foundation 1.1 root hub
Bus 001 Device 002: ID 0bda:8176 Realtek Semiconductor Corp. RTL8188CUS 802.11n WLAN Adapter
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
```

Arduino는 `버스 003 장치 004: ID 2341:0042 Arduino SA Mega 2560 R3(CDC ACM)`을 사용합니다.

Pixhawk는 `버스 003 장치 005: ID 26ac:0011`을 사용합니다.

:::note
기기를 찾을 수 없으면, 플러그를 뽑은 다음 `lsusb`를 실행하고, 플러그를 꽂고 `lsusb`를 다시 실행하여 추가된 기기를 확인할 수 있습니다.
:::

따라서, 다음 내용으로 `/etc/udev/rules.d/99-pixhawk.rules`라는 파일에 새 UDEV 규칙을 생성하여 idVendor 및 idProduct를 귀하의 것으로 변경할 수 있습니다.

```sh
SUBSYSTEM=="tty", ATTRS{idVendor}=="2341", ATTRS{idProduct}=="0042", SYMLINK+="ttyArduino"
SUBSYSTEM=="tty", ATTRS{idVendor}=="26ac", ATTRS{idProduct}=="0011", SYMLINK+="ttyPixhawk"
```

마지막으로, **재부팅** 후에 어떤 장치들이 사용되는 지를 알수 있으며, `/dev/ttyUSB0` 대신 `/dev/ttyPixhawk`를 스크립트에 추가하십시오.

:::note
루트로 스크립트를 실행할 필요가 없도록, `usermod`를 통해 `tty` 및 `dialout` 그룹을 현재 사용자에게 추가합니다.
:::

```sh
usermod -a -G tty ros-user
usermod -a -G dialout ros-user
newgrp ros-user
```
