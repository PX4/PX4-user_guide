# PX4 시스템 콘솔

PX4 *시스템 콘솔*은 시스템에 대한 낮은 수준의 액세스, 디버그 출력 및 시스템 부팅 프로세스 분석을 제공합니다.

:::tip
시스템이 부팅되지 않으면, 콘솔을 디버깅에 사용해야 합니다. 그렇지 않으면, [MAVLink Shell](../debug/mavlink_shell.md)이 더 적합할 수 있습니다. 설정이 훨씬 쉽고 [동일한 여러 작업](../debug/consoles.md#console_vs_shell)에 사용할 수 있기 때문입니다.
:::

## 콘솔 배선

콘솔은 [3.3V FTDI](https://www.digikey.com/product-detail/en/TTL-232R-3V3/768-1015-ND/1836393) 케이블을 사용하여, 컴퓨터 USB 포트에 연결할 수 있는 (보드별) UART를 통하여 사용할 수 있습니다. 이렇게 하면, 터미널 응용 프로그램을 사용하여 콘솔에 접근할 수 있습니다.

Pixhawk 콘트롤러 제조업체는 [Pixhawk 커넥터 표준](#pixhawk_debug_port)을 준수하는 전용 *디버그 포트*를 통해 콘솔 UART 및 SWD(JTAG) 디버그 인터페이스를 노출합니다. Unfortunately some boards predate this standard or a non-compliant.

:::note
Developers targeting a number of different boards may wish to use a *debug adapter* to simplify connecting multiple boards. For example, the [Dronecode probe](https://kb.zubax.com/display/MAINKB/Dronecode+Probe+documentation) comes with connectors for the [Pixhawk Debug Port](#pixhawk_debug_port) and several other boards.
:::

Connect the 6-pos JST SH 1:1 cable to the Dronecode probe or connect the individual pins of the cable to a FTDI cable like this:


### Connecting via Dronecode Probe

The System Console UART pinouts/debug ports are typically documented in [autopilot overview pages](../flight_controller/README.md) (some are linked below):
- [3DR Pixhawk v1 Flight Controller](../flight_controller/pixhawk.md#console-port) (also applies to [mRo Pixhawk](../flight_controller/mro_pixhawk.md#debug-ports), [Holybro pix32](../flight_controller/holybro_pix32.md#debug-port))
- [Pixhawk 1/2](../flight_controller/pixhawk3_pro.md#debug-port)
- [Pixracer](../flight_controller/pixracer.md#debug-port)

<a id="pixhawk_debug_port"></a>

### Connecting via FTDI 3.3V Cable

Flight controllers that adhere to the Pixhawk Connector standard use the [Pixhawk Standard Debug Port](https://pixhawk.org/pixhawk-connector-standard/#dronecode_debug).

The port/FTDI mapping is shown below.

| Pixracer / Pixhawk v3 | -         | FTDI | -                |
| --------------------- | --------- | ---- | ---------------- |
| 2                     | +5V (red) |      | N/C              |
| 2                     | UART7 Tx  | 5    | FTDI RX (yellow) |
| 3                     | UART7 Rx  | 4    | FTDI TX (orange) |
| 4 (blk)               | SWDIO     |      | N/C              |
| +5V (red)             | SWCLK     |      | N/C              |
| 6                     | GND       | 1    | FTDI GND (black) |

## Opening the Console

After the console connection is wired up, use the default serial port tool of your choice or the defaults described below:

### Linux / Mac OS: Screen

Install screen on Ubuntu (Mac OS already has it installed):

```bash
sudo apt-get install screen
```

* Serial: Pixhawk v1 / Pixracer use 57600 baud

Connect screen at BAUDRATE baud, 8 data bits, 1 stop bit to the right serial port (use `ls /dev/tty*` and watch what changes when unplugging / replugging the USB device). Common names are `/dev/ttyUSB0` and `/dev/ttyACM0` for Linux and `/dev/tty.usbserial-ABCBD` for Mac OS.

```bash
screen /dev/ttyXXX BAUDRATE 8N1
```

### Windows: PuTTY

Download [PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) and start it.

Then select 'serial connection' and set the port parameters to:

* 57600 baud
* 8 data bits
* 1 stop bit
