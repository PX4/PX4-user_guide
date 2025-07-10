---
canonicalUrl: https://docs.px4.io/main/ko/dev_setup/generic_dev_tools
---

# 일반적인 개발 도구

이 절에서는 핵심 PX4 빌드 툴체인이 아닌 유용한 추가 개발 도구를 나열합니다.

## 지상 통제 소프트웨어

[QGroundControl 데일리 빌드](https://docs.qgroundcontrol.com/en/releases/daily_builds.html)를 다운로드하고 설치하세요.

:::tip
The *daily build* includes development tools that hidden in release builds. It may also provide access to new PX4 features that are not yet supported in release builds.
:::

![QGroundControl](../../assets/toolchain/qgc_goto.jpg)


## 에디터 / IDE

The development team recommend [Visual Studio Code (VSCode)](../dev_setup/vscode.md), a popular open source IDE. VSCode is the "officially supported" IDE, primarily because it is the easiest of the IDEs to set up and use with PX4.

The following IDEs also work (but are not recommended unless you're an expert):
* [Visual Studio Code](https://code.visualstudio.com/): 꽤 새롭고 인기있는 오픈 소스 IDE
* [C/C++를 위한 Eclipse](https://www.eclipse.org/downloads/eclipse-packages/): 많은 기능을 갖고 있는 Java 기반 IDE
* [Sublime Text](https://www.sublimetext.com): 빠르고 군더더기 없는 텍스트 에디터

:::note
There is an [Eclipse project](https://github.com/PX4/PX4-Autopilot/blob/master/eclipse.project) and a [Sublime project](https://github.com/PX4/PX4-Autopilot/blob/master/Firmware.sublime-project) in the source tree.
:::
