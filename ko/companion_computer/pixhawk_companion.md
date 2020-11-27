# 픽스호크 시리즈용 보조 컴퓨터

픽스호크 계열 보드에 보조 컴퓨터(라즈베리 파이, 오드로이드, 테그라 K1)를 붙이는 작업의 방식은 동일합니다. 보조 컴퓨터를 연결하려는 용도의 포트 `TELEM 2`에 직렬 포트로 연결하면 됩니다. 이 연결의 메시지 형식은 [MAVLink](https://mavlink.io/en/) 입니다.

## 픽스호크 설정

[설정 가능한 직렬 포트](../peripherals/serial_configuration.md)에 MAVLink를 활성화하십시오.

> **Tip** 보통 `TELEM 2` 포트는 보조 컴퓨터용으로 사용합니다.

`TELEM 2`의 기본 보조 컴퓨터 메시지 스트림을 설정하려면 다음 매개변수를 설정하십시오:
* [MAV_1_CONFIG](../advanced_config/parameter_reference.md#MAV_1_CONFIG) = `TELEM 2` (`MAV_1_CONFIG`는 `TELEM 2` 포트 매핑 목적으로 주로 활용합니다)
* [MAV_1_MODE](../advanced_config/parameter_reference.md#MAV_1_MODE) = `Onboard`
* [SER_TEL2_BAUD](../advanced_config/parameter_reference.md#SER_TEL2_BAUD) = `921600` (로그 스트리밍 또는 FastRTPS 활용 목적으로 921600 이상 값을 권장합니다)

더 많은 정보는 [MAVLink 주변기기 편(GCS/OSD/보조기기)](../peripherals/mavlink_peripherals.md)을 참고하십시오.


## 보조 컴퓨터 설정

MAVLink 메시지를 받으려면, 보조 컴퓨터에서 직렬 포트로 통신하는 어떤 프로그램이 필요합니다. 대부분 일반적으로 선택할 수 있는 방안은 다음과 같습니다:

  * ROS 노드와 통신 용도로 사용하는 [MAVROS](../ros/mavros_installation.md)
  * 개별 작성 코드를 연결할 [C/C++ 예제 코드](https://github.com/mavlink/c_uart_interface_example)
  * 시리얼 인터페이스와 UDP 통신간 라우팅 작업을 수행하는 [MAVLink 라우터](https://github.com/intel/mavlink-router)(추천) 또는 [MAVProxy](https://ardupilot.org/mavproxy/)

## 하드웨어 설정

다음 절차에 따라 직렬 포트를 연결하십시오. 모든 픽스호크 직렬 포트는 3.3V ~ 5V 레벨 호환으로 동작합니다.

> **Warning** 대부분의 최근 보조 컴퓨터는 1.8V 레벨에서 하드웨어 UART가 동작하며 3.3V 레벨에서 손상을 입을 수 있습니다. 전압 변환 칩을 활용하십시오. 대부분의 경우 접근할 수 있는 하드웨어 직렬 포트에는 연결하려는 장비(모뎀 또는 콘솔)와 관련된 일부 기능이 있으며, 해당 장비를 사용할 수 있으려면 *리눅스에서 재설정*해야합니다.

확실히 안전한 방법은 아래의 결선표를 참고하여 FTDI 칩을 내장한 USB-to-serial 변환 보드를 사용하는 방법입니다. 얼마든지 동작하고, 설정하기도 쉽습니다.

|  | TELEM2 |          | FTDI |                   |
|  | ------ | -------- | ---- | ----------------- |
|  | 1      | +5V (적)  |      | 연결 금지!            |
|  | 2      | Tx  (출력) | 5    | FTDI RX (황) (입력)  |
|  | 3      | Rx  (입력) | 4    | FTDI TX (적황) (출력) |
|  | 4      | CTS (입력) | 6    | FTDI RTS (녹) (출력) |
|  | 5      | RTS (출력) | 2    | FTDI CTS (갈) (입력) |
|  | 6      | GND      | 1    | FTDI GND (흑)      |

## 리눅스 프로그램 설정

리눅스에서 USB FTDI 기본 명칭은 `/dev/ttyUSB0`와 같습니다. USB로 두번째 FTDI 칩을 연결했을 경우나, 아두이노에 연결했다면 `/dev/ttyUSB1`이 됩니다. 첫번째 연결 하드웨어와 두번째 연결 하드웨어의 혼동을 막으려면 `ttyUSBx`의 심볼릭 링크를 USB 장치의 제조사, 제폼 ID 에 따라 알기 쉬운 이름으로 만드시는 방안을 추천해드립니다.

`lsusb`를 사용하면 제조사와 제품 ID를 가져올 수 있습니다.

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

여기서 아두이노는 `Bus 003 Device 004: ID 2341:0042 Arduino SA Mega 2560 R3 (CDC ACM)`입니다.

픽스호크 장비는 `Bus 003 Device 005: ID 26ac:0011`입니다.

> **Note** 장치를 찾지 못하겠다면, 뽑고 `lsusb`를 입력, 다시 연결한 후 `lsusb`를 다시 입력하여 추가 장치를 확인하십시오.

이 과정을 수행하여 `/etc/udev/rules.d/99-pixhawk.rules` 파일에 다음 내용에서 idVendor와 idProduct를 여러분의 장비에 맞게 바꾸어 추가한 새 UDEV 규칙을 만들 수 있습니다.

```sh
SUBSYSTEM=="tty", ATTRS{idVendor}=="2341", ATTRS{idProduct}=="0042", SYMLINK+="ttyArduino"
SUBSYSTEM=="tty", ATTRS{idVendor}=="26ac", ATTRS{idProduct}=="0011", SYMLINK+="ttyPixhawk"
```

마지막으로 **reboot**를 수행하면 방금 작성한 스크립트를 통해, 어떤 장치를 연결했을 때 `/dev/ttyUSB0` 대신 `/dev/ttyPixhawk`가 뜨는지 확인할 수 있습니다.

> **Note** 스크립트를 루트 계정으로 실행하는 일을 막기 위해  `usermod` 명령으로 `tty` 그룹과 `dialout` 그룹에 여러분 자신의 계정을 추가했는지 확인하십시오.

```sh
usermod -a -G tty ros-user
usermod -a -G dialout ros-user
```
