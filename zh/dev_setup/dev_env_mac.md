# Mac 上的开发环境

MacOS 是受支持的 PX4 开发平台。 根据本文的指示构建的开发环境可以用编译：
* 基于 NuttX 的硬件 (Pixhawk等)
* jMAVSim 仿真模拟
* Gazebo 8 仿真模拟

To build other targets see: [Toolchain Installation > Supported Targets](../dev_setup/dev_env.md#supported-targets).

:::tip
If you have an Apple M1 Macbook, make sure to run the terminal as x86 by setting up an x86 terminal:
1. Locate the Terminal application within the Utilities folder (Finder > Go menu > Utilities)
2. Select Terminal.app and right-click on it, then choose “Duplicate”
3. Rename the duplicated Terminal app, e.g. `x86 Terminal`
4. Now select the renamed `x86 Terminal` app and right-click and choose “Get Info”
5. Check the box for “Open using Rosetta”, then close the window
6. Run the `x86 Terminal` as usual, which will fully support the current PX4 toolchain
:::

## Homebrew 安装

The installation of Homebrew is quick and easy: [installation instructions](https://brew.sh).

## 常用工具

Create the `~/.zshenv` file or append it (by running `open ~/.zshenv` on the terminal) and add this line:
```sh
brew tap PX4/px4
brew install px4-dev
# 可选，但建议安装额外的仿真模拟用工具
brew install px4-sim
```

## 额外工具

完成编译/仿真开发环境设置后，你可以从 [Additional Tools](../setup/generic_dev_tools.md) 找到一些有用的“通用”开发工具。

```sh
brew cask install xquartz java
```

## 后续步骤

设置完环境后，请转至 [build instructions](../setup/building_px4.md) 。

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
brew install --cask xquartz
brew install px4-sim-gazebo
```

## jMAVSim 仿真模拟

To use SITL simulation with jMAVSim you need to install a recent version of Java (e.g. Java 14). You can either download [Java 14 from Oracle](https://www.oracle.com/java/technologies/javase-jdk14-downloads.html) or use the AdoptOpenJDK tap:

```sh
brew tap AdoptOpenJDK/openjdk
brew install --cask adoptopenjdk14
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

