---
canonicalUrl: https://docs.px4.io/main/ko/debug/consoles
---

# PX4 콘솔/쉘

PX4에서는 [MAVLink 쉘](../debug/mavlink_shell.md)과 [시스템 콘솔](../debug/system_console.md)을 사용하여 시스템에 접근할 수 있습니다.

이 페이지에서는 콘솔과 쉘 사용 방법과 주요 차이점을 설명합니다.

<a id="console_vs_shell"></a>

## 시스템 콘솔과 셸의 차이점

The PX4 _System Console_ provides low-level access to the system, debug output and analysis of the system boot process.

There is just one _System Console_, which runs on one specific UART (the debug port, as configured in NuttX), and is commonly attached to a computer via an FTDI cable (or some other debug adapter like a [Dronecode probe](https://kb.zubax.com/display/MAINKB/Dronecode+Probe+documentation)).

- Used for _low-level debugging/development_: bootup, NuttX, startup scripts, board bringup, development on central parts of PX4 (e.g. uORB).
- 특히, 모든 부팅 출력(부팅 시 자동으로 시작되는 응용 프로그램에 대한 정보 포함)이 인쇄되는 유일한 장소입니다.

셸은 시스템에 대한 상위 수준의 접급을 제공합니다.

- 기본 모듈 테스트와 명령어를 실행할 수 있습니다.
- Only _directly_ display the output of modules you start.
- Cannot _directly_ display the output of tasks running on the work queue.
- 시스템이 시작되지 않으면(아직 실행되지 않기 때문에) 문제를 디버그할 수 없습니다.

:::note
`dmesg` 명령은 이제 일부 보드의 셸을 통해 사용할 수 있으므로, 이전보다 훨씬 낮은 수준의 디버깅이 가능합니다. 예를 들어, `dmesg -f &`를 사용하면 백그라운드 작업의 출력도 조회할 수 있습니다.
:::

전용 UART에서 실행되거나, MAVLink로 실행되는 여러 셸이 있을 수 있습니다. MAVLink가 더 많은 유연성을 제공하므로, 현재 [MAVLink Shell](../debug/mavlink_shell.md)만 사용됩니다.

[시스템 콘솔](../debug/system_console.md)은 시스템이 부팅되지 않을 때 사용됩니다(보드의 전원을 껐다 켤 때 시스템 부팅 로그를 표시함). [MAVLink Shell](../debug/mavlink_shell.md)은 설정이 훨씬 용이하므로, 대부분의 디버깅에 사용됩니다.

<a id="using_the_console"></a>

## 콘솔/쉘 사용

MAVLink 셸/콘솔과 [시스템 콘솔](../debug/system_console.md)은 같은 방식으로 사용됩니다.

예를 들어, 로컬 파일 시스템을 보려면 `ls`를 입력하고, 남은 여유 RAM을 보려면 `free`를 입력하고, 부팅 출력을 보려면 `dmesg`를 입력합니다.

```bash
nsh> ls
nsh> free
nsh> dmesg
```

Below are a couple of commands which can be used in the [NuttShell](https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=139629410) to get insights of the system.

This NSH command provides the remaining free memory:

```bash
free
```

The top command shows the stack usage per application:

```
top
```

Note that stack usage is calculated with stack coloring and is the maximum since the start of the task (not the current usage).

To see what is running in the work queues and at what rate, use:

```
work_queue status
```

To debug uORB topics:

```
uorb top
```

To inspect a specific uORB topic:

```
listener <topic_name>
```

다른 많은 시스템 명령과 모듈은 [모듈 및 명령 참조](../modules/modules_main.md)에 나열되어 있습니다(예: `top`, `listener` 등).

:::tip
일부 명령은 일부 보드에서 비활성화될 수 있습니다(예: RAM 또는 FLASH 제약 조건이 있는 보드의 경우 일부 모듈은 펌웨어에 포함되지 않음). 이 경우에는 응답이 표시됩니다. `명령어를 찾을 수 없음`
:::
