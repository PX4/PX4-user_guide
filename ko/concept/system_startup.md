---
canonicalUrl: https://docs.px4.io/main/ko/concept/system_startup
---

# 시스템 시작

PX4 시작은 쉘 스크립트로 제어합니다. NuttX에서 쉘 스크립트는 [ROMFS/px4fmu_common/init.d](https://github.com/PX4/PX4-Autopilot/tree/master/ROMFS/px4fmu_common/init.d) 폴더에 있습니다. 일부 POSIX 계열(Linux/MacOS) 운영체제도 동일합니다. POSIX 전용 스크립트는 [ROMFS/px4fmu_common/init.d-posix](https://github.com/PX4/PX4-Autopilot/tree/master/ROMFS/px4fmu_common/init.d-posix)에 위치합니다.

숫자와 밑줄 문자로 시작하는 모든 파일(예: `00000_airplane`)은 사전 정의 기체 프레임 설정 파일입니다. 설정 값은 빌드 타임에 [QGroundControl](http://qgroundcontrol.com)에서 해석할 `airframes.xml` 파일로 내보내고 기체 선택 UI에 활용합니다. 새 설정 추가는 [여기](../dev_airframes/adding_a_new_frame.md)에서 다룹니다.

남아있는 파일은 공통 시작 로직의 일부입니다. 첫 실행 파일은 다른 모든 스크립트를 호출하는 [init.d/rcS](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/init.d/rcS) 스크립트 (또는 POSIX에서 [init.d-posix/rcS](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/init.d-posix/rcS))입니다.

다음의 섹션은 PX4가 실행되는 운영체제에 따라 구분되어 있습니다.


## POSIX (Linux/MacOS)

POSIX에서는 시스템 셸을 셸 인터프리터로 사용합니다 (예. /bin/sh는 우분투에서 대시로 심볼릭링크함) 동작하기 위한 몇가지 조건들이 있습니다.
- PX4 모듈은 시스템에서 개별적으로 실행할 수 있어야합니다. 이 동작은 심볼릭 링크로 처리합니다. 빌드 폴더의 `bin` 디렉터리에 각 모듈의 `px4-<module> -> px4` 심볼릭 링크를 만듭니다. 이 심볼릭 링크를 실행하면 바이너리 경로를 확인(`argv[0]`) 하고, 모듈로 판명이 나면 (`px4-`), PX4 주 인스턴스로 명령을 보냅니다(하단 참조).

:::tip
The `px4-` prefix is used to avoid conflicts with system commands (e.g. `shutdown`), and it also allows for simple tab completion by typing `px4-<TAB>`.
:::
- 쉘은 심볼릭 링크를 찾을 위치를 알아야합니다. 이 때문에 시동 스크립트를 실행하기 전 심볼릭 링크가 들어있는 `bin` 디렉터리를 `PATH` 환경 변수에 추가합니다.
- 셸에서는 각 모듈을 새 (클라이언트) 프로세스로 시작합니다. 각 클라이언트 프로세스는 PX4(서버)의 주 인스턴스와 통신해야 하는데, 실제 모듈은 스레드로 실행합니다. 이 일련의 과정은 [UNIX 소켓](http://man7.org/linux/man-pages/man7/unix.7.html)으로 처리합니다. 서버는 클라이언트가 연결하고 명령을 보낼 수 있는 소켓으로 수신 대기합니다. 그 다음 서버에서는 출력을 내보내고 클라이언트에 코드를 반환합니다.
- 시동 스크립트는 `px4-` 접두어를 쓰지 않고 `commander start` 명령처럼 모듈을 직접 호출합니다. 이 과정은 alias로 진행합니다. `bin/px4-alias.sh` 파일 실행시 각 모듈에 대해 `alias <module>=px4-<module>` 모듈과 같은 모양새로 별칭을 만듭니다.
- `rcS` 스크립트는 PX4 주 인스턴스에서 실행합니다. 어떤 모듈도 시작하지 않지만 `PATH` 환경 변수를 처음 업데이트하고 셸 상에서 단순하게 `rcS`  파일을 인자로 간주하여 실행합니다.
- 게다가, 다중 서버 인스턴스는 다중 기체 모의 시험 용도로 시작할 수 있습니다. 클라이언트는 `--instance`로 인스턴스를 선택합니다. 인스턴스는 `$px4_instance` 변수로 스크립트에서 활용할 수 있습니다.

시스템에서 PX4를 이미 실행중일 때 모듈을 어떤 터미널에서든 실행할 수 있습니다. 예를 들어:
```
cd <PX4-Autopilot>/build/px4_sitl_default/bin
./px4-commander takeoff
./px4-listener sensor_accel
```

### 동적 모듈

보통, 모든 모듈은 하나의 PX4 실행 파일로 합쳐 컴파일됩니다. 그러나 POSIX에서는 모듈을 `dyn` 명령으로 PX4에 불러올 수 있는 별개의 파일로 컴파일하는 옵션이 있습니다.
```
dyn ./test.px4mod
```

## NuttX

NuttX에는 통합 셸 인터프리터가 있으며([NuttShell (NSH)](https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=139629410)), 스크립트를 직접 실행할 수 있습니다.

### 시스템 부팅 디버깅

프로그램 요소의 드라이버 동작 실패가 부팅 중단을 유발하지는 않습니다. 시동 스크립트에서 `set +e` 명령으로 다룹니다.

[시스템 콘솔](../debug/system_console.md)에 연결한 후, 전원을 차단했다가 다시 연결하면 부팅 과정 디버깅을 수행할 수 있습니다. 결과 부팅 로그는 부팅 순서의 세부 정보를 담고 있으며, 왜 부팅이 멈추었는지에 대한 실마리가 들어갑니다.

#### 일반적인 부팅 실패 사례

  * 개별 프로그램: 시스템의 RAM 용량 부족. `free` 명령을 실행하여 남아있는 가용 RAM 용량을 살펴보십시오.
  * 프로그램 동작 실패 또는 스택 트레이스 출력

### 시스템 시동 과정 바꾸기

대부분의 경우 기본 부팅 과정을 별도로 설정하는 방식이 아래에 설명하는대로 그나마 나은 방법입니다. 만약 완전하게 잘 돌아가는 부팅 과정을 바꾸어야 한다면 마이크로 SD 카드의 `etc` 폴더에 있는 `/fs/microsd/etc/rc.txt` 파일을 만드십시오. 이 파일이 시스템에 없다면 자동으로 시작합니다.

### 시스템 시동 개별 설정

시스템 시동 스크립트를 개별 설정하는 최상의 방법은 [새 기체프레임 설정](../dev_airframes/adding_a_new_frame.md)을 도입하는 방법입니다. 약간의 수정만이 필요하다면(프로그램을 하나 이상 시작하거나 다른 믹서를 사용하는 경우) 시동 과정에 특별한 훅을 활용할 수 있습니다.

세가지 주요 훅이 있습니다. 참고로 마이크로 SD 카드의 루트 폴더는 `/fs/microsd` 경로로 나타냅니다.
:::

`config.txt` 파일은 셸 변수 값을 바꿀때 활용할 수 있습니다. 부팅하기 *전에 * 주 시스템을 구성할 때 불러옵니다.

* /fs/microsd/etc/config.txt
* /fs/microsd/etc/extras.txt
* /fs/microsd/etc/mixers/NAME_OF_MIXER

#### 개별 구성 (config.txt)

`extras.txt` 파일은 주 시스템 부팅 실행 후 프로그램을 추가로 시작할 때 활용할 수 있습니다. 보통 추가로 시작하는 프로그램은 적재 장치 제어 프로그램이거나, 이와 유사한 추가 개별 요소일 수 있습니다.

#### 추가 프로그램 시작

The `extras.txt` can be used to start additional applications after the main system boot. Typically these would be payload controllers or similar optional custom components.

기본적으로 시스템은 `/etc/mixers`에서 믹서를 불러옵니다. `/fs/microsd/etc/mixers`에 동일한 이름이 들어간 파일이 있다면, 이 파일을 대신 불러옵니다. 이 방식으로 펌웨어를 다시 컴파일하지 않고 믹서 파일을 개별 설정할 수 있습니다.

다음 예제에서 개별 AUX 믹서를 추가하는 방법을 보여줍니다:
  * SD 카드에 다음의 내용을 넣어 `etc/extras.txt` 파일을 만드십시오:
    ```
    custom_app start
    ```
  * `set +e` 명령과 `set -e` 명령으로 명령을 선택 실행할 수 있습니다.
    ```
    set +e
    optional_app start      # Will not result in boot failure if optional_app is unknown or fails
    set -e

    mandatory_app start     # Will abort boot if mandatory_app is unknown or fails
    ```

#### 개별 믹서 시작

By default the system loads the mixer from `/etc/mixers`. If a file with the same name exists in `/fs/microsd/etc/mixers` this file will be loaded instead. This allows to customize the mixer file without the need to recompile the Firmware.

##### 예제

The following example shows how to add a custom aux mixer:
  * SD 카드에 믹서 내용이 들어간 `etc/mixers/gimbal.aux.mix` 파일을 만드십시오.
  * 그 다음 이 파일을 사용하려면, 아래 내용이 들어간 `etc/config.txt` 추가 파일을 만드십시오:
    ```
    set MIXER_AUX gimbal
    set PWM_AUX_OUT 1234
    set PWM_AUX_DISARMED 1500
    set PWM_AUX_MIN 1000
    set PWM_AUX_MAX 2000
    set PWM_AUX_RATE 50
    ```
