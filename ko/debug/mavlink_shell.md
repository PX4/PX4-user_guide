# MAVLink 쉘

The MAVLink Shell is an _NSH console_ that can be accessed via MAVLink over serial (USB/Telemetry) or WiFi (UDP/TCP) links (in particular, on NuttX-based systems like: Pixhawk, Pixracer, etc.).

쉘은 명령 및 모듈을 실행하고 출력을 표시합니다. While the shell cannot _directly_ display the output of modules that it does not start, it can do so indirectly using the `dmesg` command (`dmesg -f &` can be used to display the output of other modules and tasks running on the work queue).

:::tip
[QGroundControl MAVLink 콘솔](#qgroundcontrol)은 콘솔에 접근하기 가장 편리합니다. 시스템이 제대로 시작되지 않으면, [시스템 콘솔](../debug/system_console.md)을 사용하여야 합니다.
:::

## 쉘 열기

<a id="qgroundcontrol"></a>

### QGroundControl MAVLink 콘솔

The easiest way to access shell is to use the [QGroundControl MAVLink Console](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/analyze_view/mavlink_console.html) (see **Analyze View > Mavlink Console**).

### mavlink_shell.py

**mavlink_shell.py** 스크립트를 사용하여 터미널에서 쉘에 접근할 수 있습니다.

1. Shut down _QGroundControl_.
1. 패키지를 설치합니다.

   ```sh
   pip3 install --user pymavlink pyserial
   ```

1. 터미널(PX4-Autopilot 디렉토리)을 열고, 쉘을 시작합니다.

   ```sh
   # For serial port
   ./Tools/mavlink_shell.py /dev/ttyACM0
   ```

   ```sh
   # For Wi-Fi connection
   ./Tools/mavlink_shell.py 0.0.0.0:14550
   ```

사용 가능한 모든 인수에 대한 설명을 보려면, `mavlink_shell.py -h`를 사용하십시오.

## MAVLink 쉘 사용

자세한 내용은 [PX4 콘솔/쉘 > 콘솔/쉘 사용](../debug/consoles.md#using_the_console)을 참고하십시오.
