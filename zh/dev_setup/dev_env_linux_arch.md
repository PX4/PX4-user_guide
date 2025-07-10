---
canonicalUrl: https://docs.px4.io/main/zh/dev_setup/dev_env_linux_arch
---

# ArchLinux 上的开发环境

:::warning
This development environment is [not supported](../advanced/dev_env_unsupported.md). See [Toolchain Installation](../dev_setup/dev_env.md) for information about the environments and tools we do support!
:::

The PX4-Autopilot repository provides a convenient script to set your Arch installation up for PX4 development: [Tools/setup/arch.sh](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/setup/arch.sh). <!-- NEED px4_version -->

The script installs (by default) all tools to build PX4 (without RTPS) for NuttX targets and run simulation with *jMAVsim*. You can additionally install the *Gazebo* simulator by specifying the command line argument: `--gazebo`.

![Gazebo on Arch](../../assets/simulation/gazebo/arch-gazebo.png)

:::note
The instructions have been tested on [Manjaro](https://manjaro.org/) (Arch based distribution) as it is much easier to set up than Arch Linux.
:::

To get and run the scripts, do either of:
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
- `--gazebo`: Add this parameter to install Gazebo from the [AUR](https://aur.archlinux.org/packages/gazebo/). :::note Gazebo gets compiled from source. It takes some time to install and requires entering the `sudo` password multiple times (for dependencies).
:::

- `--no-nuttx`: Do not install the NuttX/Pixhawk toolchain (i.e. if only using simulation).
- `--no-sim-tools`：不要安装 jMAVSim/Gazebo 仿真器（例如你只想使用或者开发调试 Pixhawk/NuttX）
