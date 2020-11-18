# Bash on Windows 工具链

> **注意：** [Windows Cygwin 工具链](../setup/dev_env_windows_cygwin.md) 是Windows平台唯一获得官方支持的开发环境。

Windows 用户还可以选择在 [Bash on Windows](https://github.com/Microsoft/BashOnWindows) 中安装经过 *少许修改* 的基于Ubuntu Linux的PX4 开发环境 ，该开发环境可用于：
* 编译针对 NuttX/Pixhawk 平台的固件。
* 使用 JMAVSim 进行PX4仿真 (需要搭配一个基于Windows的 X-Windows 应用来显示仿真UI界面)。

> **注意：** 本特性仅可在Windows 10上实现， 它本质上仍是在虚拟机中运行工具链, 与其他解决方案相比运行相对缓慢。 It essentially runs the toolchain in a virtual machine, and is relatively slow compared to other solutions.


### 设置开发环境

设置开发环境的最简单的方法是使用 **<a href="https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/windows_bash_nuttx.sh" target="_blank" download>windows_bash_nuttx.sh</a>** 安装脚本 （脚本文件的详细说明见 [下文](#build_script_details)）。 <!-- NEED px4_version -->

要设置开发环境, 请执行以下操作:
1. 在Windows 10上启用、安装 [Bash on Windows](https://github.com/Microsoft/BashOnWindows)。
1. 打开 bash shell 命令行界面。
1. 下载 **windows_bash_nuttx.sh** 脚本文件: `wget https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/windows_bash_nuttx.sh` <!-- NEED px4_version -->
1. 使用如下命令运行安装脚本 (根据需要确认任何提示)： sh source windows_bash_nuttx.sh
  ```sh
  bash windows_bash_nuttx.sh
  ```

### 编译固件

固件编译流程（以编译 px4_fmu-v4 的固件为例）：
1. 在 bash shell 命令行界面输入如下指令：
   ```
   cd ~/src/Firmware
 make px4_fmu-v4_default
   ```
   成功完成编译后可以在 `Firmware/build/px4_fmu-v4_default/px4_fmu-v4_default.px4` 文件夹下找到编译好的固件。

   > **注意：** 为其它飞控板编译固件的 `make` 指令参见 [编译代码](../setup/building_px4.md#nuttx--pixhawk-based-boards)

1. 在 Windows 平台上无法直接在 bash shell 中使用 `upload` 命令完成固件的烧写，你可以使用 *QGroundControl* 或者 *Mission Planner* 烧写自定义的固件。


### 仿真模拟 （JMAVSim）

Bash on Windows 并不包括任何UI库的支持。 为了显示 jMAVSim 的UI界面，在进行仿真之前你需要在 Windows 平台上安装 X-Window 图形用户接口应用，比如： [XMing](https://sourceforge.net/projects/xming/)。

JMAVSim 运行流程：
1. 在 Windows 平台安装并启动 [XMing](https://sourceforge.net/projects/xming/)。
1. 在 bash shell 命令行界面输入如下指令： sh export DISPLAY=:0 >
   ```sh
   sh
  export DISPLAY=:0
  export GAZEBO_IP=127.0.0.1
  make px4_sitl gazebo
   ```

   > **提示：** 将上一行命令加入 Ubuntu 的 **.bashrc** 文件末尾可避免在新的 bash 会话中重复输入该命令。
1. 在 bash shell 界面中启动 px4 和 jmavsim：
   ```sh
   make px4_sitl jmavsim
   ```
   JMAVSim 的UI界面会显示在 XMing 程序中，如下所示：

   ![jMAVSimOnWindows](../../assets/simulation/jmavsim_on_windows.png)

> **注意！ ** Gazebo 也可以以类似方式在 Ubuntu Bash for Windows 中运行，但运行速度太慢以至于没有实用价值。 如要尝试运行，请遵循 [ROS kinetic install guide](http://wiki.ros.org/kinetic/Installation/Ubuntu) 的指示然后在 Bash shell 界面中使用如下命令运行Gazebo： 
> 
> ```sh
  export DISPLAY=:0
  export GAZEBO_IP=127.0.0.1
  make px4_sitl gazebo
```

<a id="build_script_details" mark="crwd-mark"></a>

### 开发环境安装脚本详情

Bash on Windows开发环境的 [windows_bash_nuttx.sh](https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/windows_bash_nuttx.sh) 安装脚本在 Ubuntu 开发环境搭建脚本的基础上进行了修改，移除了包括包括 *Qt Creator* IDE 和模拟器仿真程序在内的所有 Ubuntu 独有的以及与UI界面相关的程序组件。

此外， 由于 Bash on Windows 不支持运行32位 ELF 程序，该脚本弃用了来自 `https://launchpad.net/gcc-arm-embedded` 的默认32位编译器，改用 [64 bit arm-none-eabi compiler](https://github.com/SolinGuo/arm-none-eabi-bash-on-win10-.git) 。

手动将此编译器添加到您的环境中请执行以下操作:

1. Download the compiler:
   ```sh
   下载编译器: 
     sh
     wget https://github.com/SolinGuo/arm-none-eabi-bash-on-win10-/raw/master/gcc-arm-none-eabi-5_4-2017q2-20170512-linux.tar.bz2
   ```
1. Unpack it using this command line in the Bash On Windows console:
   ```sh
   Bash On Windows 控制台中使用命令行进行解压： 
     sh
     tar -xvf gcc-arm-none-eabi-5_4-2017q2-20170512-linux.tar.bz2 该命令会将 arm gcc cross-compiler 解压至： <code>gcc-arm-none-eabi-5_4-2017q2/bin</code>
   ```

   </code>
   This will unpack the arm gcc cross-compiler to:
   ```
   gcc-arm-none-eabi-5_4-2017q2/bin
   ```
1. 将下面这行命令添加到环境中（将该行添加到 bash 配置文件中完成永久性更改） `export PATH=$HOME/gcc-arm-none-eabi-5_4-2017q2/bin:\$PATH`
   ```
   export PATH=$HOME/gcc-arm-none-eabi-5_4-2017q2/bin:$PATH
   ```
