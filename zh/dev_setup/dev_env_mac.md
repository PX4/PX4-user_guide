---
canonicalUrl: https://docs.px4.io/main/zh/dev_setup/dev_env_mac
---

# Mac 上的开发环境

MacOS 是受支持的 PX4 开发平台。 根据本文的指示构建的开发环境可以用编译：
* 基于 NuttX 的硬件 (Pixhawk等)
* [jMAVSim Simulation](../simulation/jmavsim.md)
* [Gazebo Simulation](../simulation/gazebo.md)

:::details
Apple M1 Macbook users! If you have an Apple M1 Macbook, make sure to run the terminal as x86 by setting up an x86 terminal:
1. Locate the Terminal application within the Utilities folder (**Finder > Go menu > Utilities**)
2. Select *Terminal.app* and right-click on it, then choose **Duplicate**.
3. Rename the duplicated Terminal app, e.g. to *x86 Terminal*
4. Now select the renamed *x86 Terminal* app and right-click and choose **Get Info*
5. Check the box for **Open using Rosetta**, then close the window
6. Run the *x86 Terminal*` as usual, which will fully support the current PX4 toolchain
:::

:::tip
This setup is supported by the PX4 dev team. To build other targets you will need to use a [different OS](../dev_setup/dev_env.md#supported-targets) (or an [unsupported development environment](../advanced/dev_env_unsupported.md)).
:::

## Homebrew 安装

@[youtube](https://youtu.be/tMbMGiMs1cQ)

## 常用工具

The installation of Homebrew is quick and easy: [installation instructions](https://brew.sh).

## 额外工具

完成编译/仿真开发环境设置后，你可以从 [Additional Tools](../setup/generic_dev_tools.md) 找到一些有用的“通用”开发工具。
```sh
brew tap PX4/px4
brew install px4-dev
# 可选，但建议安装额外的仿真模拟用工具
brew install px4-sim
```

## 后续步骤

设置完环境后，请转至 [build instructions](../setup/building_px4.md) 。

```sh
brew cask install xquartz java
```

## Gazebo 仿真

After installing Homebrew, run these commands in your shell to install the common tools:

```sh
sudo easy_install pip
sudo -H pip install pyserial empy toml numpy pandas jinja2 pyyaml
```
Install the required Python packages

```sh
# install required packages using pip3
python3 -m pip install --user pyserial empy toml numpy pandas jinja2 pyyaml pyros-genmsg packaging
# if this fails with a permissions error, your Python install is in a system path - use this command instead:
sudo -H python3 -m pip install --user pyserial empy toml numpy pandas jinja2 pyyaml pyros-genmsg packaging
```

## jMAVSim 仿真模拟

To install SITL simulation with Gazebo:

```sh
brew install --cask xquartz
brew install px4-sim-gazebo
```

## 额外工具

To use SITL simulation with jMAVSim you need to install a recent version of Java (e.g. Java 15). You can download [Java 15 (or later) from Oracle](https://www.oracle.com/java/technologies/javase-downloads.html#JDK15) or use the AdoptOpenJDK tap:

```sh
brew tap AdoptOpenJDK/openjdk
brew install --cask adoptopenjdk15
```

```sh
brew install px4-sim-jmavsim
```

:::warning
jMAVSim for PX4 v1.11 and beyond we require at least JDK 15.

For earlier versions macOS users might see the error `Exception in thread "main" java.lang.UnsupportedClassVersionError:`. You can find the fix in the [jMAVSim with SITL > Troubleshooting](../simulation/jmavsim.md#troubleshooting)).
:::

## 后续步骤

Once you have finished setting up the command-line toolchain:
- Install [VSCode](../dev_setup/vscode.md) (if you prefer using an IDE to the command line).
- Install the [QGroundControl Daily Build](https://docs.qgroundcontrol.com/en/releases/daily_builds.html) :::tip The *daily build* includes development tools that are hidden in release builds. It may also provide access to new PX4 features that are not yet supported in release builds.
:::
- Continue to the [build instructions](../dev_setup/building_px4.md).
