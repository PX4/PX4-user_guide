---
canonicalUrl: https://docs.px4.io/main/ko/debug/swd_gdb
---

# SWD GDB 하드웨어 디버깅

터미널에서 GDB를 사용하여 하드웨어 대상을 연결하는 방법을 설명합니다. IDE를 사용하려면 [Eclipse](../debug/eclipse_jlink.md) 또는 [VSCode](../dev_setup/vscode.md#hardware-debugging) 사용법을 참고하십시오.

For the wiring interface setup, please see this detailed information: [SWD/JTAG Debug Interface](../debug/swd_debug.md).

## Dronecode 프로브 / Blackmagic 프로브 사용

:::note STM32F7 이상(FMUv5 이상)을 디버그하려면, Dronecode 프로브/Blackmagic 프로브에 펌웨어 업데이트해야 할 수 있습니다. [blackmagic probe를 업데이트하는 방법은 여기](https://github.com/blacksphere/blackmagic/wiki/Upgrading-Firmware)를 참고하십시오.
:::

GDB와 함께 Dronecode 프로브를 사용하려면, 현재 자동조종장치에서 플래싱된 정확한 ELF 파일로 GDB를 시작하십시오.

```bash
arm-none-eabi-gdb build/px4_fmu-v5_default/px4_fmu-v5_default.elf
```

그런 다음, Dronecode 프로브 인터페이스를 선택하여야 합니다. Linux에서는 다음과 같습니다.
```bash
target ext /dev/serial/by-id/usb-Black_Sphere_Technologies_Black_Magic_Probe_f9414d5_7DB85DAC-if00
```

그런 다음 대상을 스캔합니다.
```bash
monitor swdp_scan
```

다음과 같은 내용이 표시되어야 합니다.
```bash
Target voltage: 3.3V
Available Targets:
No. Att Driver
 1      STM32F76x M7
```

일부 자동조종장치는 0.0V를 표시하지만, 후속 단계는 그럼에도 불구하고 작동합니다.

이제 해당 대상에 연결할 수 있습니다.
```
attach 1
```

이제 연결되어야 합니다.

## JLink 사용

JLink 디버거를 사용하려면, 먼저 JLink GDB 서버가 포함된 [JLink 소프트웨어를 설치](https://www.segger.com/downloads/jlink/#J-LinkSoftwareAndDocumentationPack)합니다.

JLink 설치 프로그램은 JLink GDB 서버를 `/usr/bin/`에 설치합니다. 설치가 완료되면, 다음을 사용하여 서버를 시작합니다.

```bash
JLinkGDBServer -if swd
```

그런 다음, 권장되는 JLink를 업데이트하고, 통신 중인 장치를 지정하라는 메시지가 표시될 수 있습니다. 특정 장치에 대한 자동조종장치의 문서를 확인하십시오.

완료되면 다음과 같이 GDB 서버는 포트 `2331`에서 수신 대기를 시작합니다.
```bash
Checking target voltage...
Target voltage: 3.28 V
Listening on TCP/IP port 2331
Connecting to target...
Connected to target
Waiting for GDB connection...
```

이제 자동조종장치(별도의 터미널에서)에서 현재 플래시된 정확한 elf 파일로 GDB를 시작할 수 있습니다.

```bash
arm-none-eabi-gdb build/px4_fmu-v5_default/px4_fmu-v5_default.elf
```

그리고, GDB 서버에 연결합니다:
```bash
target remote :2331
```

이제 연결되어야 합니다.

## GDB 퀵 스타트

연결되면, 다음과 같은 일반적인 GDB 명령을 사용할 수 있습니다.
- `continue` : 프로그램 실행을 계속 실행
- `run` : 처음부터 시작
- `backtrace` : 역추적을 조회
- `break somewhere.cpp:123` : 중단점 설정
- `delete somewhere.cpp:123` 중단점 삭제
- `info locals` : 지역 변수 조회
- `info registers` : 리지스터 출력

그리고, 좋은 툴을 사용하여 GDB에 대하여 더 공부하십시오.

:::tip
매번 GDB에 연결하기 위하여, 모든 명령을 입력해야 하는 것을 피하기 위하여 `~/.gdbinit`에 작성할 수 있습니다.
:::
