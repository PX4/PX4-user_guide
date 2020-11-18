# Development Environment on ArchLinux

The user needs to be added to the group "uucp": <!-- NEED px4_version -->

The script installs (by default) all tools to build PX4 (without RTPS) for NuttX targets and run simulation with *jMAVsim*. You can additionally install the *Gazebo* simulator by specifying the command line argument: `--gazebo`.

![Gazebo on Arch](../../assets/simulation/gazebo/arch-gazebo.png)

> *Alternatively*, the standard instructions for installing the **official** version are listed below.

To install using this script, enter the following in a terminal:
* [Download PX4 Source Code](../dev_setup/building_px4.md) and run the scripts in place:
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
