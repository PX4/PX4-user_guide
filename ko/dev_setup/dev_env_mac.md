# MacOS 개발 환경

아래에서 macOS용 PX4 개발 환경 설정 방법을 설명합니다. PX4 빌드에 사용되어 집니다.
* Pixhawk와 기타 NuttX 기반 하드웨어
* [jMAVSim 시뮬레이션](../simulation/jmavsim.md)
* [Gazebo Classic Simulation](../sim_gazebo_classic/README.md)

:::details
애플 M1 맥북 사용자 Apple M1 Macbook이 있는 경우 x86 터미널을 설정하여 터미널을 x86으로 실행해야 합니다.

1. 유틸리티 폴더(**Finder > 이동 메뉴 > 유틸리티**)에서 터미널 애플리케이션을 찾습니다.
2. *Terminal.app*을 선택하고 마우스 오른쪽 버튼으로 클릭한 다음 **복제**를 선택합니다.
3. 복제된 터미널 앱의 이름을 변경합니다(예: *x86 터미널*으로)
4. 이름이 변경된 *x86 Terminal* 앱을 선택하고 마우스 오른쪽 버튼을 클릭하고 **정보 입수*를 선택합니다.
5. **Rosetta를 사용하여 열기** 확인란을 선택하고, 창을 닫습니다.
6. Run the *x86 Terminal* as usual, which will fully support the current PX4 toolchain
:::

:::tip
이 설정은 PX4 개발 팀에서 지원합니다. 다른 대상을 빌드하려면 [다른 OS](../dev_setup/dev_env.md#supported-targets)(또는 [지원되지 않는 개발 환경](../advanced/dev_env_unsupported.md))를 사용하여야 합니다.
:::

## 영상 가이드

@[유투브](https://youtu.be/tMbMGiMs1cQ)

## Homebrew 설치

Homebrew 설치는 빠르고 쉽습니다: [설치 방법](https://brew.sh).

## 더 많은 열린 파일 활성화("LD: 너무 많은 열린 파일" 오류 처리)

Append the line `ulimit -S -n 2048` to the end of the `~/.zshenv` file (creating it if necessary):
```sh
echo ulimit -S -n 2048 >> ~/.zshenv
```

## Python 버전 시행

`~/.zshrc` 파일이 없으면 생성하여, 파일에 다음 줄을 추가합니다.

```sh
# Point pip3 to MacOS system python 3 pip
alias pip3=/usr/bin/pip3
```

## 공통 도구

Homebrew를 설치 후, 셸에서 다음 명령을 실행하여 공통 도구를 설치합니다.

```sh
brew tap PX4/px4
brew install px4-dev
```
필요한 파이썬 패키지들을 설치합니다.

```sh
# install required packages using pip3
python3 -m pip install --user pyserial empty toml numpy pandas jinja2 pyyaml pyros-genmsg packaging kconfiglib future jsonschema
# if this fails with a permissions error, your Python install is in a system path - use this command instead:
sudo -H python3 -m pip install --user pyserial empty toml numpy pandas jinja2 pyyaml pyros-genmsg packaging kconfiglib future jsonschema
```

## Gazebo Classic Simulation

Gazebo로 SITL 시뮬레이션을 설치하려면:

```sh
brew install --cask xquartz
brew install px4-sim-gazebo
```
jMAVSim과 함께 SITL 시뮬레이션을 사용하려면, 최신 버전의 Java(예: Java 15)를 설치합니다. They can be removed once it is fixed (along with this note).
:::

To install SITL simulation with Gazebo Classic:

```sh
brew install --cask temurin
brew install --cask xquartz
brew install px4-sim-gazebo
```

Run this macOS setup script: `PX4-Autopilot/Tools/setup/macos.sh` The easiest way to do this is to clone the PX4 source, and then run the script from the directory, as shown:

```sh
git clone https://github.com/PX4/PX4-Autopilot.git --recursive
cd PX4-Autopilot/Tools/setup
sh macos.sh
```

## jMAVSim 시뮬레이션

To use SITL simulation with jMAVSim you need to install a recent version of Java (e.g. Java 15). You can download [Java 15 (or later) from Oracle](https://www.oracle.com/java/technologies/javase-downloads.html) or use [Eclipse Temurin](https://adoptium.net):

```sh
brew install --cask temurin
```

Then install jMAVSim:

```sh
brew install px4-sim-jmavsim
```

:::warning PX4 v1.11 and beyond require at least JDK 15 for jMAVSim simulation.

For earlier versions, macOS users might see the error `Exception in thread "main" java.lang.UnsupportedClassVersionError:`. You can find the fix in the [jMAVSim with SITL > Troubleshooting](../simulation/jmavsim.md#troubleshooting)).
:::

## 다음 단계

Once you have finished setting up the command-line toolchain:
- [VSCode](../dev_setup/vscode.md)를 설치합니다(명령줄에 IDE 사용을 선호하는 경우).
- Install the [QGroundControl Daily Build](https://docs.qgroundcontrol.com/master/en/releases/daily_builds.html) :::tip The *daily build* includes development tools that are hidden in release builds. 또한, 릴리스 빌드에서 아직 지원되지 않는 새로운 PX4 기능에 대한 액세스를 제공할 수도 있습니다.
:::
- [빌드 지침](../dev_setup/building_px4.md)을 계속 진행합니다.
