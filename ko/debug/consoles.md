# PX4 콘솔/쉘

PX4에서는 [MAVLink 쉘](../debug/mavlink_shell.md)과 [시스템 콘솔](../debug/system_console.md)을 사용하여 시스템에 터미널에 접급 가능합니다.

이 페이지에서는 주요 차이점과 콘솔/쉘 사용 방법을 설명합니다.

<a id="console_vs_shell"></a>

## 시스템 콘솔 vs. 셸

PX4 *시스템 콘솔*은 시스템에 대한 낮은 수준의 액세스, 디버그 출력 및 시스템 부팅 프로세스 분석을 제공합니다.

하나의 특정 UART(NuttX에 구성된 디버그 포트)에서 실행되고 일반적으로 FTDI 케이블(또는 [Dronecode 프로브](https://kb.zubax.com/display/MAINKB/Dronecode+Probe+documentation)와 같은 다른 디버그 어댑터)을 통하여 컴퓨터에 연결되는 *시스템 콘솔*이 하나 있습니다.
- *저수준 디버깅/개발*에 사용: 부팅, NuttX, 시작 스크립트, 보드 불러오기, PX4의 중앙 부분(예: uORB) 개발.
- 특히, 모든 부팅 출력(부팅 시 자동으로 시작되는 응용 프로그램에 대한 정보 포함)이 인쇄되는 유일한 장소입니다.

Shells provide higher-level access to the system:
- Used for basic module testing/running commands.
- Only *directly* display the output of modules you start.
- Cannot *directly* display the output of tasks running on the work queue.
- Can't debug problems when the system doesn't start (as it isn't running yet).

:::note
The `dmesg` command is now available through the shell on some boards, enabling much lower level debugging than previously possible. For example, with `dmesg -f &` you also see the output of background tasks.
:::

There can be several shells, either running on a dedicated UART, or via MAVLink. Since MAVLink provides more flexibility, currently only the [MAVLink Shell](../debug/mavlink_shell.md) is used.

The [System Console](../debug/system_console.md) is essential when the system does not boot (it displays the system boot log when power-cycling the board). The [MAVLink Shell](../debug/mavlink_shell.md) is much easier to setup, and so is more generally recommended for most debugging.

<a id="using_the_console"></a>

## Using Consoles/Shells

The MAVLink shell/console and the [System Console](../debug/system_console.md) are used in much the same way.

For example, type `ls` to view the local file system, `free` to see the remaining free RAM, `dmesg` to look at boot output.

```bash
nsh> ls
nsh> free
nsh> dmesg
```

Many other system commands and modules are listed in the [Modules and Command Reference](../modules/modules_main.md) (e.g. `top`, `listener`, etc.).

:::tip
Some commands may be disabled on some boards (i.e. the some modules are not included in firmware for boards with RAM or FLASH constraints). In this case you will see the response: `command not found`
:::
