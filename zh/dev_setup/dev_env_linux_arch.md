# ArchLinux 上的开发环境

将当前用户加入用户组 “uucp” ： <!-- NEED px4_version -->

该脚本默认安装所有必需的工具，用于编译基于NuttX的PX4源码（不带RTPS），以及运行基于 *jMAVsim* 的仿真器。 你也可以安装额外的*Gazebo*仿真器通过在命令行中指定一个参数： `--gazebo`。

![Arch上使用Gazebo](../../assets/simulation/gazebo/arch-gazebo.png)

:::note
The instructions have been tested on [Manjaro](https://manjaro.org/) (Arch based distribution) as it is much easier to set up than Arch Linux.
:::

该脚本可以加入这些可选的参数：
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

The script takes the following optional parameters:
- `--gazebo`: Add this parameter parameter to install Gazebo from the [AUR](https://aur.archlinux.org/packages/gazebo/). :::note Gazebo gets compiled from source. It takes some time to install and requires entering the `sudo` password multiple times (for dependencies).
:::

- `--no-nuttx`: Do not install the NuttX/Pixhawk toolchain (i.e. if only using simulation).
- `--no-sim-tools`：不要安装 jMAVSim/Gazebo 仿真器（例如你只想使用或者开发调试 Pixhawk/NuttX）
