---
canonicalUrl: https://docs.px4.io/main/ko/dev_setup/dev_env_mac
---

# MacOS 개발 환경

아래에서 macOS용 PX4 개발 환경 설정 방법을 설명합니다. PX4 빌드에 사용되어 집니다.
* Pixhawk와 기타 NuttX 기반 하드웨어
* [jMAVSim 시뮬레이션](../simulation/jmavsim.md)
* [가제보 시뮬레이션](../simulation/gazebo.md)

:::details
애플 M1 맥북 사용자 Apple M1 Macbook이 있는 경우 x86 터미널을 설정하여 터미널을 x86으로 실행해야 합니다.
1. 유틸리티 폴더(**Finder > 이동 메뉴 > 유틸리티**)에서 터미널 애플리케이션을 찾습니다.
2. *Terminal.app*을 선택하고 마우스 오른쪽 버튼으로 클릭한 다음 **복제**를 선택합니다.
3. 복제된 터미널 앱의 이름을 변경합니다(예: *x86 터미널*으로)
4. 이름이 변경된 *x86 Terminal* 앱을 선택하고 마우스 오른쪽 버튼을 클릭하고 **정보 입수*를 선택합니다.
5. **Rosetta를 사용하여 열기** 확인란을 선택하고, 창을 닫습니다.
6. 현재 PX4 도구 모음을 지원하는 *x86 터미널*을 실행합니다.
:::

:::tip
이 설정은 PX4 개발 팀에서 지원합니다. 다른 대상을 빌드하려면 [다른 OS](../dev_setup/dev_env.md#supported-targets)(또는 [지원되지 않는 개발 환경](../advanced/dev_env_unsupported.md))를 사용하여야 합니다.
:::

## 영상 가이드

@[유투브](https://youtu.be/tMbMGiMs1cQ)

## Homebrew 설치

Homebrew 설치는 빠르고 쉽습니다: [설치 방법](https://brew.sh).

## 더 많은 열린 파일 활성화("LD: 너무 많은 열린 파일" 오류 처리)

`~/.zshenv` 파일을 생성하거나 추가하고(터미널에서 `open ~/.zshenv` 실행) 다음 줄을 추가합니다.
```sh
ulimit -S -n 2048
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
python3 -m pip install --user pyserial empy toml numpy pandas jinja2 pyyaml pyros-genmsg packaging
# if this fails with a permissions error, your Python install is in a system path - use this command instead:
sudo -H python3 -m pip install --user pyserial empy toml numpy pandas jinja2 pyyaml pyros-genmsg packaging
```

## 가제보 시뮬레이션

Gazebo로 SITL 시뮬레이션을 설치하려면:

```sh
brew install --cask xquartz
brew install px4-sim-gazebo
```

## jMAVSim 시뮬레이션

jMAVSim과 함께 SITL 시뮬레이션을 사용하려면, 최신 버전의 Java(예: Java 15)를 설치합니다. You can download [Java 15 (or later) from Oracle](https://www.oracle.com/java/technologies/javase-downloads.html#JDK15) or use the AdoptOpenJDK tap:

```sh
brew tap AdoptOpenJDK/openjdk
brew install --cask adoptopenjdk15
```

```sh
brew install px4-sim-jmavsim
```

:::warning PX4 v1.11 이상용 jMAVSim에는 JDK 15 이상의 버전이 필요합니다.

이전 버전의 경우 macOS 사용자는 `스레드 "main" java.lang.UnsupportedClassVersionError의 예외:` 오류가 발생할 수 있습니다. 여기에서 수정 방법을 참고하십시오: [SITL이 있는 jMAVSim > 문제 해결](../simulation/jmavsim.md#troubleshooting)).
:::

## 다음 단계

명령줄 도구 모음 설정후, 다음을 수행합니다.
- [VSCode](../dev_setup/vscode.md)를 설치합니다(명령줄에 IDE 사용을 선호하는 경우).
- [QGroundControl 일일 빌드](https://docs.qgroundcontrol.com/en/releases/daily_builds.html) 설치 :::tip *일일 빌드*에는 릴리스 빌드에 숨겨진 개발 도구가 포함됩니다. 또한, 릴리스 빌드에서 아직 지원되지 않는 새로운 PX4 기능에 대한 액세스를 제공할 수도 있습니다.
:::
- [빌드 지침](../dev_setup/building_px4.md)을 계속 진행합니다.
