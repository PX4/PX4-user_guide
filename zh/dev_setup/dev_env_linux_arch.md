# ArchLinux 上的开发环境

将当前用户加入用户组 “uucp” ： <!-- NEED px4_version -->

该脚本默认安装所有必需的工具，用于编译基于NuttX的PX4源码（不带RTPS），以及运行基于 *jMAVsim* 的仿真器。 你也可以安装额外的*Gazebo*仿真器通过在命令行中指定一个参数： `--gazebo`。

![Arch上使用Gazebo](../../assets/simulation/gazebo/arch-gazebo.png)

> **Note** *genromfs* is also available in the [Archlinux User Repository](https://aur.archlinux.org/packages/genromfs/) (AUR). To use this package, install [yaourt](https://archlinux.fr/yaourt-en) (Yet AnOther User Repository Tool) and then use it to download, compile and install *genromfs* as shown:

To install using this script, enter the following in a terminal:
* [Download PX4 Source Code](../dev_setup/building_px4.md) and run the scripts in place:
  ```
  wget https://raw.githubusercontent.com/PX4/containers/master/docker/px4-dev/scripts/archlinux_install_script.sh
sudo -s
source ./archlinux_install_script.sh
  ```
* 只下载你所需的脚本并运行他们：
  ```sh
  Once ArchLinux is installed you can use the docker script <a href="https://github.com/PX4/containers/blob/master/docker/px4-dev/scripts/archlinux_install_script.sh">archlinux_install_script.sh</a> to install all dependencies required for building PX4 firmware.
  ```

该脚本可以加入这些可选的参数：
- `--gazebo`：添加此参数从 [AUR](https://aur.archlinux.org/packages/gazebo/) 安装 Gazebo 仿真器。 > **Note** Gazebo gets compiled from source. 这个过程需要花费一些时间并且需要添加 `sudo` 并多次输入密码（对于依赖项）。
- `--no-nuttx`: 不要安装 NuttX/Pixhawk 的工具链 (比如你只想使用仿真器的功能)。
- `--no-sim-tools`：不要安装 jMAVSim/Gazebo 仿真器（例如你只想使用或者开发调试 Pixhawk/NuttX）
