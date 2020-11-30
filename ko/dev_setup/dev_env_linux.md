# Development Environment on Linux

Linux allows you to build for [all PX4 targets](../setup/dev_env.md#supported-targets) (NuttX based hardware, Qualcomm Snapdragon Flight hardware, Linux-based hardware, Simulation, ROS).

> **Tip** We have standardized on Debian / [Ubuntu Linux LTS](https://wiki.ubuntu.com/LTS) (16.04) as the supported Linux distribution. Instructions are also provided for [CentOS](../setup/dev_env_linux_centos.md) and [Arch Linux](../setup/dev_env_linux_arch.md).

The following instructions explain how to set up a development environment on Ubuntu LTS using convenience bash scripts.

* Follow setup instructions in [Ubuntu/Debian Linux](../setup/dev_env_linux_ubuntu.md) for [Raspberry Pi](../setup/dev_env_linux_ubuntu.md#raspberry-pi-hardware).
* [Software Installation](../dev_setup/dev_env_linux_centos.md)
* [Configuration](../dev_setup/dev_env_linux_arch.md)
* [Advanced Linux](../dev_setup/dev_env_advanced_linux.md)


To install the development toolchain:
- [Additional Tools](../dev_setup/generic_dev_tools.md) lists some other useful tools.
- Download <a href="https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/ubuntu_sim_nuttx.sh" target="_blank" download>ubuntu_sim_nuttx.sh</a>.
