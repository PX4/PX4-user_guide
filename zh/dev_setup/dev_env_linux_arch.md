# ArchLinux 上的开发环境

将当前用户加入用户组 “uucp” ：

The script installs (by default) all tools to build PX4 (without RTPS) for NuttX targets and run simulation with *jMAVsim*. You can additionally install the *Gazebo* simulator by specifying the command line argument: `--gazebo`.

![Gazebo on Arch](../../assets/simulation/gazebo/arch-gazebo.png)

> **Note** *genromfs* is also available in the [Archlinux User Repository](https://aur.archlinux.org/packages/genromfs/) (AUR). To use this package, install [yaourt](https://archlinux.fr/yaourt-en) (Yet AnOther User Repository Tool) and then use it to download, compile and install *genromfs* as shown:

To install using this script, enter the following in a terminal:
* [Download PX4 Source Code](../setup/building_px4.md) and run the scripts in place:
  ```
  wget https://raw.githubusercontent.com/PX4/containers/master/docker/px4-dev/scripts/archlinux_install_script.sh
sudo -s
source ./archlinux_install_script.sh
  ```
* Download just the needed scripts and then run them:
  ```sh
  Once ArchLinux is installed you can use the docker script <a href="https://github.com/PX4/containers/blob/master/docker/px4-dev/scripts/archlinux_install_script.sh">archlinux_install_script.sh</a> to install all dependencies required for building PX4 firmware.
  ```

The script takes the following optional parameters:
- `--gazebo`: Add this parameter parameter to install Gazebo from the [AUR](https://aur.archlinux.org/packages/gazebo/). > **Note** Gazebo gets compiled from source. It takes some time to install and requires entering the `sudo` password multiple times (for dependencies).
- `--no-nuttx`: Do not install the NuttX/Pixhawk toolchain (i.e. if only using simulation).
- `--no-sim-tools`: Do not install jMAVSim/Gazebo (i.e. if only targeting Pixhawk/NuttX targets)
