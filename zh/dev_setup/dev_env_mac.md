# Mac 上的开发环境

MacOS 是受支持的 PX4 开发平台。 根据本文的指示构建的开发环境可以用编译：
* 基于 NuttX 的硬件 (Pixhawk等)
* jMAVSim 仿真模拟
* Gazebo 8 仿真模拟

:::note
To build other targets see: [Toolchain Installation > Supported Targets](../dev_setup/dev_env.md#supported-targets).
:::

:::tip
A video tutorial can be found here: [Setting up your PX4 development environment on macOS](https://youtu.be/tMbMGiMs1cQ).
:::

## Homebrew 安装

The installation of Homebrew is quick and easy: [installation instructions](https://brew.sh).

## 常用工具

The PX4 toolchain requires the usage of the ZSH shell. If you are using the shell, add this line to your shell profile:

完成编译/仿真开发环境设置后，你可以从 [Additional Tools](../setup/generic_dev_tools.md) 找到一些有用的“通用”开发工具。
```sh
brew tap PX4/px4
brew install px4-dev
# 可选，但建议安装额外的仿真模拟用工具
brew install px4-sim
```

## 额外工具

设置完环境后，请转至 [build instructions](../setup/building_px4.md) 。

```sh
brew cask install xquartz java
```

## 后续步骤

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

## Gazebo 仿真

To install SITL simulation with Gazebo:

```sh
brew cask install xquartz
brew install px4-sim-gazebo
```

## jMAVSim 仿真模拟

To use SITL simulation with jMAVSim you need to install a recent version of Java (e.g. Java 14). You can either download [Java 14 from Oracle](https://www.oracle.com/java/technologies/javase-jdk14-downloads.html) or use the AdoptOpenJDK tap:

```sh
brew tap AdoptOpenJDK/openjdk
brew cask install adoptopenjdk14
```

```sh
brew install px4-sim-jmavsim
```

:::note
jMAVSim for PX4 v1.11 and earlier required Java 8.
:::

## 额外工具

See [Additional Tools](../dev_setup/generic_dev_tools.md) for information about other useful development tools that are not part of the build toolchain (for example IDEs and GCSs).

## 后续步骤

Once you have finished setting up the environment, continue to the [build instructions](../dev_setup/building_px4.md).

