# MacOS 개발 환경

아래에서 macOS용 PX4 개발 환경 설정 방법을 설명합니다. PX4 빌드에 사용되어 집니다.

- Pixhawk와 기타 NuttX 기반 하드웨어
- [Gazebo Classic Simulation](../sim_gazebo_classic/index.md)

:::tip
이 설정은 PX4 개발 팀에서 지원합니다. To build other targets you will need to use a [different OS](../dev_setup/dev_env.md#supported-targets) (or an [unsupported development environment](../advanced/community_supported_dev_env.md)).
:::

## 영상 가이드

@[유투브](https://youtu.be/tMbMGiMs1cQ)

## Base Setup

The "base" macOS setup installs the tools needed for building firmware, and includes the common tools that will be needed for installing/using the simulators.

### Environment Setup

:::details
애플 M1 맥북 사용자 Apple M1 Macbook이 있는 경우 x86 터미널을 설정하여 터미널을 x86으로 실행해야 합니다.

1. 유틸리티 폴더(**Finder > 이동 메뉴 > 유틸리티**)에서 터미널 애플리케이션을 찾습니다.
2. Select _Terminal.app_ and right-click on it, then choose **Duplicate**.
3. Rename the duplicated Terminal app, e.g. to _x86 Terminal_
4. Now select the renamed _x86 Terminal_ app and right-click and choose \*_Get Info_
5. **Rosetta를 사용하여 열기** 확인란을 선택하고, 창을 닫습니다.
6. Run the _x86 Terminal_ as usual, which will fully support the current PX4 toolchain
:::

First set up the environment

1. Enable more open files by appending the following line to the `~/.zshenv` file (creating it if necessary):

   ```sh
   echo ulimit -S -n 2048 >> ~/.zshenv
   ```

   ::: info If you don't do this, the build toolchain may report the error: `"LD: too many open files"`
:::

1. Enforce Python 3 by appending the following lines to `~/.zshenv`

   ```sh
   # Point pip3 to MacOS system python 3 pip
   alias pip3=/usr/bin/pip3
   ```

### 공통 도구

To setup the environment to be able to build for Pixhawk/NuttX hardware (and install the common tools for using simulators):

1. Install Homebrew by following these [installation instructions](https://brew.sh).
1. Run these commands in your shell to install the common tools:

   ```sh
   brew tap PX4/px4
   brew install px4-dev
   ```

1. Install the required Python packages:

   ```sh
   # install required packages using pip3
   python3 -m pip install --user pyserial empty toml numpy pandas jinja2 pyyaml pyros-genmsg packaging kconfiglib future jsonschema
   # if this fails with a permissions error, your Python install is in a system path - use this command instead:
   sudo -H python3 -m pip install --user pyserial empty toml numpy pandas jinja2 pyyaml pyros-genmsg packaging kconfiglib future jsonschema
   ```

## Gazebo Classic Simulation

To setup the environment for [Gazebo Classic](../sim_gazebo_classic/index.md) simulation:

1. Run the following commands in your shell:

   ```sh
   brew unlink tbb
   sed -i.bak '/disable! date:/s/^/  /; /disable! date:/s/./#/3' $(brew --prefix)/Library/Taps/homebrew/homebrew-core/Formula/tbb@2020.rb
   brew install tbb@2020
   brew link tbb@2020
   ```

   jMAVSim과 함께 SITL 시뮬레이션을 사용하려면, 최신 버전의 Java(예: Java 15)를 설치합니다. They can be removed once it is fixed (along with this note).
:::

1. To install SITL simulation with Gazebo Classic:

   ```sh
   brew install --cask temurin
   brew install --cask xquartz
   brew install px4-sim-gazebo
   ```

1. Run the macOS setup script: `PX4-Autopilot/Tools/setup/macos.sh` The easiest way to do this is to clone the PX4 source, and then run the script from the directory, as shown:

   ```sh
   git clone https://github.com/PX4/PX4-Autopilot.git --recursive
   cd PX4-Autopilot/Tools/setup
   sh macos.sh
   ```


## 다음 단계

Once you have finished setting up the command-line toolchain:

- [VSCode](../dev_setup/vscode.md)를 설치합니다(명령줄에 IDE 사용을 선호하는 경우).
- Install the [QGroundControl Daily Build](../dev_setup/qgc_daily_build.md)

:::tip
The _daily build_ includes development tools that are hidden in release builds. 또한, 릴리스 빌드에서 아직 지원되지 않는 새로운 PX4 기능에 대한 액세스를 제공할 수도 있습니다.
:::

- [빌드 지침](../dev_setup/building_px4.md)을 계속 진행합니다.
