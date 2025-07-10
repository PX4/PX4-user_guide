---
canonicalUrl: https://docs.px4.io/main/ko/dev_setup/building_px4
---

# PX4 소프트웨어 빌드

PX4는 시뮬레이션 대상과 하드웨어 대상을 콘솔이나 IDE에서 구축할 수 있습니다.

:::note
이 지침을 따르기 전에 먼저 호스트 운영 체제와 대상 하드웨어에 대한 [개발자 도구 모음](../dev_setup/dev_env.md)을 설치하여야 합니다. 이 저장소를 Github 계정과 연결된 복사본을 [만들어](https://help.github.com/articles/fork-a-repo/), 이 원본을 로컬 컴퓨터에 [복제](https://help.github.com/articles/cloning-a-repository/)하는 것이 좋습니다.

:::tip
일반적인 빌드 문제에 대한 해결 방법은 아래 [문제 해결](#troubleshooting)을 참고하십시오.
:::

## PX4 소스 코드 다운로드

PX4 소스 코드는 Github의 [PX4/PX4-Autopilot](https://github.com/PX4/PX4-Autopilot) 저장소에 저장되어 있습니다. *최신* 버전을 컴퓨터에 다운로드하려면 터미널에 다음 명령을 실행하십시오.

```sh
git clone https://github.com/PX4/PX4-Autopilot.git --recursive
```

:::note
이것이 최신 코드를 빌드하기 위해 필요합니다. [GIT 예제 > PX4에 코드 기여](../contribute/git_examples.md#contributing_code)는 PX4에 기여하기 위해 git을 사용 방법을 설명합니다.
:::

## 최초 빌드 (jMAVSim 시뮬레이션 활용)

먼저 콘솔 환경에서 시뮬레이션 대상을 빌드합니다. 이를 통하여 실제 하드웨어와 IDE로 사용전에 시스템 설정을 검증할 수 있습니다.

**PX4-Autopilot** 디렉토리로 이동하여, 다음 명령을 사용하여 [jMAVSim](../simulation/jmavsim.md)을 시작합니다.
```sh
make px4_sitl jmavsim
```

그러면, 아래와 같은 PX4 콘솔이 나타납니다.

![PX4 콘솔 (jMAVSim)](../../assets/toolchain/console_jmavsim.png)

다음 명령어로 드론을 날릴 수 있습니다.
```sh
pxh> commander takeoff
```

![jMAVSim UI](../../assets/toolchain/jmavsim_first_takeoff.png)

드론은 `commander land`를 입력하여 착륙할 수 있으며, 전체 시뮬레이션은 **CTRL+C**(또는 `shutdown`)를 입력하여 중지할 수 있습니다.

지상 관제소로 시뮬레이션 비행이 기체의 실제 작동에 더 가깝습니다. 기체 비행중에 지도에서 위치를 클릭하고(이륙 비행 모드) 슬라이더를 활성화합니다. 이렇게 하면, 기체의 위치가 변경됩니다.

![QGroundControl 바로 가기](../../assets/toolchain/qgc_goto.jpg)

:::tip PX4는 [Gazebo Simulation](../simulation/gazebo.md)와 [AirSim Simulation](../simulation/airsim.md)을 비롯하여 여러가지 [시뮬레이터](../simulation/README.md)와 함께 사용할 수 있습니다. 이것들은 또한 *make*로 시작됩니다.
```
make px4_sitl gazebo
```
:::

## NuttX/Pixhawk 기반 보드

### NuttX용 빌드

NuttX 또는 Pixhawk 기반 보드용으로 빌드하려면, **PX4-Autopilot** 디렉토리로 이동한 다음 보드용 빌드 타겟으로 `make`를 호출하십시오.

예를 들어, [Pixhawk 4](../flight_controller/pixhawk4.md) 하드웨어용으로 빌드하려면 다음 명령을 사용할 수 있습니다.
```sh
cd PX4-Autopilot
make px4_fmu-v4_default
```

성공적인 실행은 다음과 유사한 출력으로 종료됩니다.
```sh
-- 빌드 파일은 /home/youruser/src/PX4-Autopilot/build/px4_fmu-v4_default에 작성되었습니다.
[954/954] Creating /home/youruser/src/PX4-Autopilot/build/px4_fmu-v4_default/px4_fmu-v4_default.px4
```

빌드 대상 `px4_fmu-v4`의 첫 번째 부분은 특정 비행 콘트롤러 하드웨어의 펌웨어를 나타냅니다. 다음 목록은 [Pixhawk 표준](../flight_controller/autopilot_pixhawk_standard.md) 보드에 대한 빌드 명령을 보여줍니다.
* [Pixhawk 4](../flight_controller/pixhawk4.md): `make px4_fmu-v5_default`
* [Pixhawk 4 Mini](../flight_controller/pixhawk4_mini.md): `make px4_fmu-v5_default`
* [CUAV V5+](../flight_controller/cuav_v5_plus.md): `make px4_fmu-v5_default`
* [CUAV V5 nano](../flight_controller/cuav_v5_nano.md): `make px4_fmu-v5_default`
* [Pixracer](../flight_controller/pixracer.md): `make px4_fmu-v4_default`
* [Pixhawk 3 Pro](../flight_controller/pixhawk3_pro.md): `make px4_fmu-v4pro_default`
* [Pixhawk Mini](../flight_controller/pixhawk_mini.md): `make px4_fmu-v3_default`
* [Pixhawk 2 (Cube Black)](../flight_controller/pixhawk-2.md): `make px4_fmu-v3_default`
* [mRo Pixhawk](../flight_controller/mro_pixhawk.md): `make px4_fmu-v3_default` (2MB Flash 지원)
* [Holybro pix32](../flight_controller/holybro_pix32.md): `make px4_fmu-v2_default`
* [Pixfalcon](../flight_controller/pixfalcon.md): `make px4_fmu-v2_default`
* [Dropix](../flight_controller/dropix.md): `make px4_fmu-v2_default`
* [Pixhawk 1](../flight_controller/pixhawk.md): `make px4_fmu-v2_default` :::warning 이 보드(예: [CI/docker](../test_and_ci/docker.md)에서 사용하는 것과 동일)를 빌드하거나 빌드에서 모듈을 제거하려면 지원되는 GCC 버전을 **반드시** 사용하여야 합니다. PX4가 보드의 1MB 플래시 제한에 가깝기 때문에, 지원되지 않는 GCC로 빌드가 실패할 수 있습니다.
:::
* 2MB 플래시가 있는 Pixhawk 1: `make px4_fmu-v3_default`

비 Pixhawk NuttX 전투 컨트롤러(및 기타 모든 보드)에 대한 빌드 명령은 개별 [비행 콘트롤러 보드](../flight_controller/README.md) 문서에서 제공합니다.

:::note
`_default` 접미사는 펌웨어 _configuration_입니다. This is optional (i.e. you can also build using `make px4_fmu-v4`, `make bitcraze_crazyflie`, etc.).
:::

### 펌웨어 업로드 (보드 플래싱)

USB로 자동조종장치에 컴파일된 바이너리를 업로드하려면 make `upload` 명령어를 사용하십시오. Make sure you can connect to your RPi over ssh, see [instructions how to access your RPi](https://docs.px4.io/en/flight_controller/raspberry_pi_navio2.html#developer-quick-start).

```sh
make px4_fmu-v4_default upload
```

성공적인 실행은 다음 출력으로 종료됩니다.

```sh
Erase  : [====================] 100.0%
Program: [====================] 100.0%
Verify : [====================] 100.0%
Rebooting.

[100%] Built target upload
```

## 기타 보드

다른 보드에 대한 빌드 명령어 정보는 [보드별 비행 콘트롤러 페이지](../flight_controller/README.md)에서 제공됩니다(일반적으로 *펌웨어 빌드* 제목 아래).

다음 명령어는 모든 빌드 대상을 나열합니다.
```sh
make list_config_targets
```


## 그래픽 IDE에서의 컴파일

[VSCode](../dev_setup/vscode.md)는 PX4 개발을 위해 공식적으로 지원되고 권장되는 IDE입니다. 설정이 편하고, 시뮬레이션 및 하드웨어 환경 모두에 대하여 PX4를 컴파일할 수 있습니다.


## 문제 해결

### 일반 빌드 오류

많은 빌드 문제는 일치하지 않는 하위 모듈이나 불완전하게 정리된 빌드 환경으로 인하여 발생합니다. 하위 모듈을 업데이트하고 `distclean`을 수행하면 이 오류를 수정할 수 있습니다:
```
git submodule update --recursive
make distclean
```

### Flash overflowed by XXX bytes

`XXXX바이트로 오버플로된 영역 '플래시'` 오류는 펌웨어가 대상 하드웨어 플랫폼에 비해 너무 크다는 것을 나타냅니다. 이는 플래시 크기가 1MB로 제한되는 `make px4_fmu-v2_default` 빌드에서 나타납니다.

*vanilla* 마스터 브랜치를 구축하는 경우, 가장 큰 원인은 지원되지 않는 GCC 버전을 사용하기 때문입니다. 이 경우, [개발자 도구 모음](../dev_setup/dev_env.md) 지침에 지정된 버전을 설치하십시오.

자체 브랜치를 구축하는 경우, 펌웨어 크기를 1MB 제한 이상으로 늘렸을 수 있습니다. 이 경우 빌드에서 필요하지 않은 드라이버 모듈을 제거하여야 합니다.


### macOS: 열린 파일이 너무 많음 오류

MacOS는 실행 중인 모든 프로세스에서 기본적으로 최대 256개의 열린 파일을 허용합니다. PX4 빌드 시스템은 많은 수의 파일을 오픈하므로, 이 갯수를 초과할 수 있습니다.

그러면, 빌드 도구 모음에서 아래와 같이 많은 파일에 대해 `열린 파일이 너무 많음` 에러가 발생합니다.
```sh
/usr/local/Cellar/gcc-arm-none-eabi/20171218/bin/../lib/gcc/arm-none-eabi/7.2.1/../../../../arm-none-eabi/bin/ld: cannot find NuttX/nuttx/fs/libfs.a: Too many open files
```

해결책은 허용되는 최대 열린 파일 수를 늘리는 것입니다(예: 300). 각 세션에 대해 macOS *터미널*에서 이 작업을 수행할 수 있습니다:
- [Tools/mac_set_ulimit.sh](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/mac_set_ulimit.sh) 스크립트를 실행하거나,
- 다음 명령어를 실행하십시오.
  ```sh
  ulimit -S -n 300
  ```

### macOS Catalina: cmake 실행 문제

macOS Catalina 10.15.1부터 *cmake*로 시뮬레이터를 빌드시 문제가 발생할 수 있습니다. 이 플랫폼에서 빌드 문제가 발생하면, 터미널에서 다음 명령을 실행하십시오:
```sh
xcode-select --install
sudo ln -s /Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/usr/include/* /usr/local/include/
```

### Ubuntu 18.04: arm_none_eabi_gcc와 관련된 컴파일 오류

`arm_none_eabi_gcc`와 관련된 빌드 문제는 손상된 g++ 도구 모음 설치로 인한 것일 수 있습니다. 다음을 사용하여 누락된 종속성을 확인하여 이러한 경우인지 확인할 수 있습니다.
```bash
arm-none-eabi-gcc --version
arm-none-eabi-g++ --version
arm-none-eabi-gdb --version
arm-none-eabi-size --version
```

종속성이 누락된 bash 출력의 예:
```bash
arm-none-eabi-gdb --version
arm-none-eabi-gdb: command not found
```

이 문제는 [컴파일러를 제거하고 다시 설치](https://askubuntu.com/questions/1243252/how-to-install-arm-none-eabi-gdb-on-ubuntu-20-04-lts-focal-fossa)하여 해결할 수 있습니다.

### Ubuntu 18.04: Visual Studio Code는 이 큰 작업 영역에서 파일 변경 사항을 감시할 수 없습니다.

[Visual Studio Code IDE(VSCode) > 문제 해결](../dev_setup/vscode.md#troubleshooting)을 참고하십시오.

### Python 패키지를 가져오지 못했습니다.

`make px4_sitl jmavsim` 명령을 실행시, "가져오기 실패" 오류는 일부 Python 패키지가 설치되지 않았음을 나타냅니다(예상된 위치).
```
Failed to import jinja2: No module named 'jinja2'
You may need to install it using:
    pip3 install --user jinja2
```
이러한 종속성을 이미 설치했다면 컴퓨터에 두 개 이상의 Python 버전이 있고(예: Python 2.7.16 Python 3.8.3) 빌드 툴체인에서 사용하는 버전에 모듈이 없는 문제일 수 있습니다.

다음과 같이 종속성을 명시적으로 설치하여, 이 문제를 해결할 수 있습니다.
```
pip3 install --user pyserial empy toml numpy pandas jinja2 pyyaml pyros-genmsg packaging
```


## PX4 빌드 타겟 만들기

이전 섹션에서는 *make*를 호출하여 다양한 대상을 빌드하고, 시뮬레이터를 시작하고, IDE를 사용 방법 등을 설명하였습니다. 이 섹션에서는 *make* 옵션 설정 방법과 사용 가능한 선택 항목 검색 방법을 설명합니다.

특정 설정 및 초기화 파일로 *make*를 호출하는 전체 구문은 다음과 같습니다.
```sh
make [VENDOR_][MODEL][_VARIANT] [VIEWER_MODEL_DEBUGGER_WORLD]
```

**VENDOR_MODEL_VARIANT**: (`CONFIGURATION_TARGET`이라고도 함)

- **공급업체:** 보드 제조업체: `px4`, `aerotenna`, `airmind`, `atlflight` , `auav`, `beaglebone`, `intel`, `nxp` 등 Pixhawk 시리즈 보드의 공급업체 이름은 `px4`입니다.
- **모델:** *보드 모델* "모델": `sitl`, `fmu-v2`, `fmu-v3< /2>, <code>fmu-v4`, `fmu-v5`, `navio2` 등
- **변종:** 특정 구성을 나타냅니다. 예: `rtps`, `lpe`, `기본` 구성에 없는 구성요소를 포함합니다. 가장 일반적으로 이것은 `기본값`이며 생략 가능합니다.

:::tip
You can get a list of *all* available `CONFIGURATION_TARGET` options using the command below:
```sh
make list_config_targets
```
:::

**VIEWER_MODEL_DEBUGGER_WORLD:**

- **VIEWER:** 이것은 `gazebo`, `jmavsim`, `none`을 실행하고 연결할 시뮬레이터("뷰어")입니다. <!-- , ?airsim -->

:::tip
`none`은 PX4를 시작하고 시뮬레이터(jmavsim, 전망대 또는 기타 시뮬레이터)를 기다리면, 사용할 수 있습니다. 예를 들어, `make px4_sitl none_iris`는 시뮬레이터 없이(그러나 홍채 기체가 있는) PX4를 시작합니다.
:::
- **모델:** 사용할 *기체* 모델(예: `iris`(*기본*), `rover` , `tailsitter` 등), 시뮬레이터에 의해 로드됩니다. 환경 변수 `PX4_SIM_MODEL`은 선택한 모델로 설정되며, 이 모델은 [시작 스크립트](../simulation/README.md#startup-scripts)에서 적절한 매개변수 선택합니다.
- **디버거:** 사용할 디버거: `없음`(*기본*), `ide`, `gdb`, `lldb`, `ddd`, `valgrind`, `callgrind`. 자세한 내용은 [시뮬레이션 디버깅](../debug/simulation_debugging.md)을 참고하십시오.
- **WORLD:** (Gazebo 만). 로드되는 세계([PX4/sitl_gazebo/worlds](https://github.com/PX4/sitl_gazebo/tree/master/worlds))를 설정합니다. 기본값은 [empty.world](https://github.com/PX4/sitl_gazebo/blob/master/worlds/empty.world)입니다. 자세한 내용은 [전망대 > 특정 세계 로드](../simulation/gazebo.md#set_world)를 참고하십시오.

:::tip
You can get a list of *all* available `VIEWER_MODEL_DEBUGGER_WORLD` options using the command below:
```sh
make px4_sitl list_vmd_make_targets
```
:::

Notes:
- `CONFIGURATION_TARGET`과 `VIEWER_MODEL_DEBUGGER`에 있는 대부분의 값에는 기본값이 있으므로 선택사항입니다. 예를 들어, `gazebo`는 `gazebo_iris` 또는 `gazebo_iris_none`과 같습니다.
- 두 개의 다른 설정 사이에 기본값을 지정하려는 경우에는, 세 개의 밑줄을 사용할 수 있습니다. 예를 들어, `gazebo___gdb`는 `gazebo_iris_gdb`와 동일합니다.
- `VIEWER_MODEL_DEBUGGER`에 `없음` 값을 사용하여 PX4를 시작하고 시뮬레이터를 실행할 수 있습니다. 예를 들어 `make px4_sitl_default none`을 사용하여 PX4를 시작하고, `./Tools/jmavsim_run.sh -l`을 사용하여 jMAVSim을 시작합니다.


`VENDOR_MODEL_VARIANT` 옵션은 [/boards](https://github.com/PX4/PX4-Autopilot/tree/master/boards) 디렉토리 아래의 PX4 소스 트리에 있는 특정 *cmake* 설정 파일에 매핑됩니다. 특히 `VENDOR_MODEL_VARIANT`는 설정 파일 **boards/VENDOR/MODEL/VARIANT.cmake**에 매핑됩니다. (예: `px4_fmu-v5_default`는 [boards/px4/fmu-v5/default.cmake](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v5/default.cmake)에 해당).

추가 make 대상은 관련 섹션에서 설명합니다.
- `bloaty_compare_master`: [Binary Size Profiling]()
- ...


## 펌웨어 버전과 Git 태그

*PX4 펌웨어 버전*과 *사용자 정의 펌웨어 버전*은 MAVLink [AUTOPILOT_VERSION](https://mavlink.io/en/messages/common.html#AUTOPILOT_VERSION) 메시지를 사용하여 게시되고, *QGroundControl* < 2>설정 > 요약</strong> 기체 패널에서 출력됩니다.

![펌웨어 정보](../../assets/gcs/qgc_setup_summary_airframe_firmware.jpg)

이들은 저장소 트리의 활성 *git 태그*에서 빌드시 추출됩니다. The git tag should be formatted as `<PX4-version>-<vendor-version>` (e.g. the tag in the image above was set to `v1.8.1-2.22.1`).

:::warning
다른 git 태그 형식을 사용하는 경우에는 버전 정보가 정확하게 표시되지 않을 수 있습니다.
:::


