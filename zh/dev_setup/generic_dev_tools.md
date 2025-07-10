---
canonicalUrl: https://docs.px4.io/main/zh/dev_setup/generic_dev_tools
---

# 通用开发工具

本节列出了不属于核心 PX4 构建工具链的实用的其他开发工具。

## 地面控制软件

下载并安装 [QGroundControl Daily Build](https://docs.qgroundcontrol.com/en/releases/daily_builds.html)。

:::tip
The *daily build* includes development tools that hidden in release builds. It may also provide access to new PX4 features that are not yet supported in release builds.
:::

![QGroundControl](../../assets/toolchain/qgc_goto.jpg)


## 编辑器 / IDE

The development team recommend [Visual Studio Code (VSCode)](../dev_setup/vscode.md), a popular open source IDE. VSCode is the "officially supported" IDE, primarily because it is the easiest of the IDEs to set up and use with PX4.

The following IDEs also work (but are not recommended unless you're an expert):
* [Visual Studio Code](https://code.visualstudio.com/)：相当新的、流行的开源 IDE
* [Eclipse C/C++](https://www.eclipse.org/downloads/eclipse-packages/)：功能非常丰富的基于 JAVA 的 IDE
* [Sublime text](https://www.sublimetext.com)：快速而精简的文本编辑器。

:::note
There is an [Eclipse project](https://github.com/PX4/PX4-Autopilot/blob/master/eclipse.project) and a [Sublime project](https://github.com/PX4/PX4-Autopilot/blob/master/Firmware.sublime-project) in the source tree.
:::
