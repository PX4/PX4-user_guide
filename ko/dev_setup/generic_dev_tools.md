---
canonicalUrl: https://docs.px4.io/main/ko/dev_setup/generic_dev_tools
---

# 일반적인 개발 도구

이 절에서는 핵심 PX4 빌드 툴체인이 아닌 유용한 추가 개발 도구를 나열합니다.

## 지상 통제 소프트웨어

Download and install the [QGroundControl Daily Build](https://docs.qgroundcontrol.com/master/en/releases/daily_builds.html).

:::tip
*일일 빌드*에는 릴리스 빌드에 숨겨진 개발 도구가 포함됩니다. 또한, 릴리스 빌드에서 아직 지원되지 않는 새로운 PX4 기능에 대한 액세스를 제공할 수도 있습니다.
:::

![QGroundControl](../../assets/toolchain/qgc_goto.jpg)


## 에디터 / IDE

개발팀은 인기 있는 오픈 소스 IDE인 [Visual Studio Code(VSCode)](../dev_setup/vscode.md)를 권장합니다. VSCode는 "공식적으로 지원되는" IDE입니다. 주로 PX4에서 설정하고 사용하기 가장 편리한 IDE이기 때문입니다.

다음 IDE도 작동합니다(하지만 전문가가 아닌 이상 권장하지 않음).
* [Visual Studio Code](https://code.visualstudio.com/): 꽤 새롭고 인기있는 오픈 소스 IDE
* [C/C++를 위한 Eclipse](https://www.eclipse.org/downloads/eclipse-packages/): 많은 기능을 갖고 있는 Java 기반 IDE
* [Sublime Text](https://www.sublimetext.com): 빠르고 군더더기 없는 텍스트 에디터

:::note
소스 트리에는 [Eclipse 프로젝트](https://github.com/PX4/PX4-Autopilot/blob/master/eclipse.project)와 [Sublime 프로젝트](https://github.com/PX4/PX4-Autopilot/blob/master/Firmware.sublime-project)가 있습니다.
:::
