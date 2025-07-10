---
canonicalUrl: https://docs.px4.io/main/ko/debug/system_console
---

# PX4 시스템 콘솔

PX4 *시스템 콘솔*은 시스템에 대한 낮은 수준의 액세스, 디버그 출력 및 시스템 부팅 프로세스 분석을 제공합니다.

:::tip
시스템이 부팅되지 않으면, 콘솔을 디버깅에 사용해야 합니다. 그렇지 않으면, [MAVLink Shell](../debug/mavlink_shell.md)이 더 적합할 수 있습니다. 설정이 훨씬 쉽고 [동일한 여러 작업](../debug/consoles.md#console_vs_shell)에 사용할 수 있기 때문입니다.
:::

## 콘솔 배선

The console is made available through a (board-specific) UART that can be connected to a computer USB port using a [3.3V FTDI](https://www.digikey.com/en/products/detail/TTL-232R-3V3/768-1015-ND/1836393) cable. 이렇게 하면, 터미널 응용 프로그램을 사용하여 콘솔에 접근할 수 있습니다.

Pixhawk 콘트롤러 제조업체는 [Pixhawk 커넥터 표준](#pixhawk_debug_port)을 준수하는 전용 *디버그 포트*를 통해 콘솔 UART 및 SWD(JTAG) 디버그 인터페이스를 제공하여야 합니다. 불행히도, 일부 보드는 이 표준 이전이거나 비준수품입니다.

:::note
다양한 보드를 대상으로 하는 개발자는 *디버그 어댑터*를 사용하여 여러 보드를 간단하게 연결할 수 있습니다. 예를 들어, [Dronecode 프로브](https://kb.zubax.com/display/MAINKB/Dronecode+Probe+documentation)는 [Pixhawk 디버그 포트](#pixhawk_debug_port)와 기타 여러 보드용 커넥터와 함께 제공됩니다.
:::

아래 섹션은 많은 공통 보드에 대한 배선 및 시스템 콘솔 정보에 대한 개요를 설명합니다.


### 보드별 연결 방법

시스템 콘솔 UART 핀아웃/디버그 포트는 일반적으로 [자동 조종 장치 개요 페이지](../flight_controller/README.md)에 문서화되어 있습니다(일부는 아래에 링크되어 있음).
- [3DR Pixhawk v1 비행 콘트롤러](../flight_controller/pixhawk.md#console-port)([mRo Pixhawk](../flight_controller/mro_pixhawk.md#debug-ports), [Holybro pix32](../flight_controller/holybro_pix32.md#debug-port)에도 적용됨)
- [Pixhawk 3](../flight_controller/pixhawk3_pro.md#debug-port)
- [Pixracer](../flight_controller/pixracer.md#debug-port)


<a id="pixhawk_debug_port"></a>

### Pixhawk 디버그 포트

Flight controllers that adhere to the Pixhawk Connector standard use the [Pixhawk Standard Debug Port](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-009%20Pixhawk%20Connector%20Standard.pdf).

포트/FTDI 매핑은 아래와 같습니다.

| Pixhawk 디버그 포트 | -                        | FTDI | -                       |
| -------------- | ------------------------ | ---- | ----------------------- |
| 1 (적)          | TARGET PROCESSOR VOLTAGE |      | N/C (SWD/JTAG 디버깅에 사용됨) |
| 2 (흑)          | CONSOLE TX (출력)          | 5    | FTDI RX (황)             |
| 3 (흑)          | CONSOLE RX (입력)          | 4    | FTDI TX (적황)            |
| 4 (흑)          | SWDIO                    |      | N/C (SWD/JTAG 디버깅에 사용됨) |
| 5 (흑)          | SWCLK                    |      | N/C (SWD/JTAG 디버깅에 사용됨) |
| 6 (흑)          | GND                      | 1    | FTDI GND (흑)            |

## 콘솔 열기

콘솔 연결이 연결된 후, 선택한 기본 직렬 포트 도구 또는 아래에 설명된 기본값을 사용합니다.

### Linux / Mac 운영체제: Screen

Ubuntu에 screen 명령어를 설치합니다. Mac OS에 이미 설치되어 있습니다.

```bash
sudo apt-get install screen
```

* 시리얼: Pixhawk v1 / Pixracer는 57600 보드를 사용합니다.

화면을 BAUDRATE baud, 8 데이터 비트, 1 정지 비트를 오른쪽 직렬 포트에 연결합니다(`ls /dev/tty*`를 사용하고 USB 장치를 뽑거나 다시 꽂을 때 어떻게 변하는 지 관찰). 일반적인 이름은 Linux의 경우 `/dev/ttyUSB0`와 `/dev/ttyACM0`이고, Mac OS의 경우 `/dev/tty.usbserial-ABCBD`입니다.

```bash
screen /dev/ttyXXX BAUDRATE 8N1
```

### 윈도우: PuTTY

[PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html)를 다운로드하고 실행합니다.

'직렬 연결'을 선택하고, 포트 매개변수를 다음과 같이 설정합니다.

* 57600 baud
* 8 data bits
* 1 stop bit
