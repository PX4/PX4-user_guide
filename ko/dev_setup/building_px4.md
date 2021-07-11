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

![PX4 Console (jMAVSim)](../../assets/toolchain/console_jmavsim.png)

다음 명령어로 드론을 날릴 수 있습니다.
```sh
pxh> commander takeoff
```

![jMAVSim UI](../../assets/toolchain/jmavsim_first_takeoff.png)

드론은 `commander land`를 입력하여 착륙할 수 있으며, 전체 시뮬레이션은 **CTRL+C**(또는 `shutdown`)를 입력하여 중지할 수 있습니다.

지상 관제소로 시뮬레이션 비행이 기체의 실제 작동에 더 가깝습니다. 기체 비행중에 지도에서 위치를 클릭하고(이륙 비행 모드) 슬라이더를 활성화합니다. 이렇게 하면, 기체의 위치가 변경됩니다.

![QGroundControl GoTo](../../assets/toolchain/qgc_goto.jpg)

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

Build commands for other boards are given the [board-specific flight controller pages](../flight_controller/README.md) (usually under a heading *Building Firmware*).

You can also list all configuration targets using the command:
```sh
make list_config_targets
```


## Compiling in a Graphical IDE

[VSCode](../dev_setup/vscode.md) is the officially supported (and recommended) IDE for PX4 development. It is easy to set up and can be used to compile PX4 for both simulation and hardware environments.


## Troubleshooting

### General Build Errors

Many build problems are caused by either mismatching submodules or an incompletely cleaned-up build environment. Updating the submodules and doing a `distclean` can fix these kinds of errors:
```
sudo ./bin/px4 -s px4.config
```

### Flash overflowed by XXX bytes

The `region 'flash' overflowed by XXXX bytes` error indicates that the firmware is too large for the target hardware platform. This is common for `make px4_fmu-v2_default` builds, where the flash size is limited to 1MB.

If you're building the *vanilla* master branch, the most likely cause is using an unsupported version of GCC. In this case, install the version specified in the [Developer Toolchain](../dev_setup/dev_env.md) instructions.

If building your own branch, it is possibly you have increased the firmware size over the 1MB limit. In this case you will need to remove any drivers/modules that you don't need from the build.


### macOS: Too many open files error

MacOS allows a default maximum of 256 open files in all running processes. The PX4 build system opens a large number of files, so you may exceed this number.

The build toolchain will then report `Too many open files` for many files, as shown below:
```sh
cd Firmware
make emlid_navio2_native # for native build
```

The solution is to increase the maximum allowed number of open files (e.g. to 300). You can do this in the macOS *Terminal* for each session:
- Run this script [Tools/mac_set_ulimit.sh](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/mac_set_ulimit.sh), or
- Enter this command:
  ```sh
  ulimit -S -n 300
  ```

### macOS Catalina: Problem running cmake

As of macOS Catalina 10.15.1 there may be problems when trying to build the simulator with *cmake*. If you have build problems on this platform then try run the following command in your terminal:
```sh
xcode-select --install
sudo ln -s /Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/usr/include/* /usr/local/include/
```

### Ubuntu 18.04: Compile errors involving arm_none_eabi_gcc

Build issues related to `arm_none_eabi_gcc`may be due to a broken g++ toolchain installation. You can verify that this is the case by checking for missing dependencies using:
```bash
cd Firmware
make emlid_navio2_cross # for cross-compiler build
```

Example of bash output with missing dependencies:
```bash
arm-none-eabi-gdb --version
arm-none-eabi-gdb: command not found
```

This can be resolved by removing and [reinstalling the compiler](https://askubuntu.com/questions/1243252/how-to-install-arm-none-eabi-gdb-on-ubuntu-20-04-lts-focal-fossa).

### Ubuntu 18.04: Visual Studio Code is unable to watch for file changes in this large workspace

See [Visual Studio Code IDE (VSCode) > Troubleshooting](../dev_setup/vscode.md#troubleshooting).

### Failed to import Python packages

"Failed to import" errors when running the `make px4_sitl jmavsim` command indicates that some Python packages are not installed (where expected).
```
Failed to import jinja2: No module named 'jinja2'
You may need to install it using:
    pip3 install --user jinja2
```
If you have already installed these dependencies this may be because there is more than one Python version on the computer (e.g. Python 2.7.16 Python 3.8.3), and the module is not present in the version used by the build toolchain.

You should be able to fix this by explicitly installing the dependencies as shown:
```
pip3 install --user pyserial empy toml numpy pandas jinja2 pyyaml pyros-genmsg packaging
```


## PX4 Make Build Targets

The previous sections showed how you can call *make* to build a number of different targets, start simulators, use IDEs etc. This section shows how *make* options are constructed and how to find the available choices.

The full syntax to call *make* with a particular configuration and initialization file is:
```sh
make [VENDOR_][MODEL][_VARIANT] [VIEWER_MODEL_DEBUGGER_WORLD]
```

**VENDOR_MODEL_VARIANT**: (also known as `CONFIGURATION_TARGET`)

- **VENDOR:** The manufacturer of the board: `px4`, `aerotenna`, `airmind`, `atlflight`, `auav`, `beaglebone`, `intel`, `nxp`, etc. The vendor name for Pixhawk series boards is `px4`.
- **MODEL:** The *board model* "model": `sitl`, `fmu-v2`, `fmu-v3`, `fmu-v4`, `fmu-v5`, `navio2`, etc.
- **VARIANT:** Indicates particular configurations: e.g. `rtps`, `lpe`, which contain components that are not present in the `default` configuration. Most commonly this is `default`, and may be omitted.

:::tip
You can get a list of *all* available `CONFIGURATION_TARGET` options using the command below:
```sh
make list_config_targets
```
:::

**VIEWER_MODEL_DEBUGGER_WORLD:**

- **VIEWER:** This is the simulator ("viewer") to launch and connect: `gazebo`, `jmavsim`, `none` <!-- , ?airsim -->

:::tip
`none` can be used if you want to launch PX4 and wait for a simulator (jmavsim, gazebo, or some other simulator). For example, `make px4_sitl none_iris` launches PX4 without a simulator (but with the iris airframe).
:::
- **MODEL:** The *vehicle* model to use (e.g. `iris` (*default*), `rover`, `tailsitter`, etc), which will be loaded by the simulator. The environment variable `PX4_SIM_MODEL` will be set to the selected model, which is then used in the [startup script](#scripts) to select appropriate parameters.
- **DEBUGGER:** Debugger to use: `none` (*default*), `ide`, `gdb`, `lldb`, `ddd`, `valgrind`, `callgrind`. For more information see [Simulation Debugging](../debug/simulation_debugging.md).
- **WORLD:** (Gazebo only). Set a the world ([PX4/sitl_gazebo/worlds](https://github.com/PX4/sitl_gazebo/tree/master/worlds)) that is loaded. Default is [empty.world](https://github.com/PX4/sitl_gazebo/blob/master/worlds/empty.world). For more information see [Gazebo > Loading a Specific World](../simulation/gazebo.md#set_world).

:::tip
You can get a list of *all* available `VIEWER_MODEL_DEBUGGER_WORLD` options using the command below:
```sh
make px4_sitl list_vmd_make_targets
```
:::

Notes:
- Most of the values in the `CONFIGURATION_TARGET` and `VIEWER_MODEL_DEBUGGER` have defaults, and are hence optional. For example, `gazebo` is equivalent to `gazebo_iris` or `gazebo_iris_none`.
- You can use three underscores if you want to specify a default value between two other settings. For example, `gazebo___gdb` is equivalent to `gazebo_iris_gdb`.
- You can use a `none` value for `VIEWER_MODEL_DEBUGGER` to start PX4 and wait for a simulator. For example start PX4 using `make px4_sitl_default none` and jMAVSim using `./Tools/jmavsim_run.sh -l`.


The `VENDOR_MODEL_VARIANT` options map to particular *cmake* configuration files in the PX4 source tree under the [/boards](https://github.com/PX4/PX4-Autopilot/tree/master/boards) directory. Specifically `VENDOR_MODEL_VARIANT` maps to a configuration file **boards/VENDOR/MODEL/VARIANT.cmake** (e.g. `px4_fmu-v5_default` corresponds to [boards/px4/fmu-v5/default.cmake](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v5/default.cmake)).

Additional make targets are discussed in relevant sections:
- `bloaty_compare_master`: [Binary Size Profiling]()
- ...


## List all releases (tags) sh git tag -l

The *PX4 Firmware Version* and *Custom Firmware Version* are published using the MAVLink [AUTOPILOT_VERSION](https://mavlink.io/en/messages/common.html#AUTOPILOT_VERSION) message, and displayed in the *QGroundControl* **Setup > Summary** airframe panel:

![Firmware info](../../assets/gcs/qgc_setup_summary_airframe_firmware.jpg)

These are extracted at build time from the active *git tag* for your repo tree. The git tag should be formatted as `<PX4-version>-<vendor-version>` (e.g. the tag in the image above was set to `v1.8.1-2.22.1`).

:::warning
If you use a different git tag format, versions information may not be displayed properly.
:::


