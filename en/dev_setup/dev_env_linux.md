# Development Environment on Linux

Linux allows you to build for [all PX4 targets](../dev_setup/dev_env.md#supported-targets) (NuttX based hardware, Qualcomm Snapdragon Flight hardware, Linux-based hardware, Simulation, ROS).

:::tip
[Ubuntu Linux LTS](../dev_setup/dev_env_linux_ubuntu.md) LTS 18.04 and 20.04 are supported.
Other Linux environments and versions may be made to work, but are less well tested and documented.
:::

The following instructions explain how to set up a development environment on various Linux platforms.

* [Ubuntu/Debian Linux](../dev_setup/dev_env_linux_ubuntu.md) - Recommended!
* [CentOS Linux](../dev_setup/dev_env_linux_centos.md)
* [Arch Linux](../dev_setup/dev_env_linux_arch.md)
* [Advanced Linux](../dev_setup/dev_env_advanced_linux.md)


## Next Steps

Once you have finished setting up the command-line toolchain:
- Install [VSCode](../dev_setup/vscode.md) (if you prefer using an IDE to the command line).
- Install the [QGroundControl Daily Build](https://docs.qgroundcontrol.com/en/releases/daily_builds.html)
  :::tip
  The *daily build* includes development tools that hidden in release builds.
  It may also provide access to new PX4 features that are not yet supported in release builds.
  :::
- Continue to the [build instructions](../dev_setup/building_px4.md).