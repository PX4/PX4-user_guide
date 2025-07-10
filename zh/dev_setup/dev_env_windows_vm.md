---
canonicalUrl: https://docs.px4.io/main/zh/dev_setup/dev_env_windows_vm
---

# Windows 虚拟机托管的工具链

Windows 平台开发者可以在运行Linux的虚拟机中运行 PX4 工具链。 设置好虚拟机后，在虚拟机内进行 PX4 开发环境的安装、设置的流程与原生 Linux 电脑没有任何差别。
:::

Windows developers can run the PX4 toolchain in a virtual machine (VM) with Linux as the guest operating system. After setting up the virtual machine, the installation and setup of PX4 within the VM is exactly the same as on a native Linux computer.

有很多种方法在你的系统上设定一个可以运行 PX4 开发环境的虚拟机。 本指南将引导你使用 VMWare 完成虚拟机的设置。

While using a VM is a very easy way to set up and test an environment for building firmware, users should be aware:
1. 固件的编译速度比原生 Linux 要更慢一些。
1. JMAVSim 的帧率比原生 Linux 要低得多。 虚拟机运行资源不足可能导致特定情况下无人机坠毁。
1. 可以安装 Gazebo 和 ROS，但运行速度非常慢。

## 操作说明

There are multiple ways to setup a VM which is capable of executing the PX4 environment on your system. This guide walks you through a VMWare setup. VMWare performance is acceptable for basic usage (building Firmware) but not for running ROS or Gazebo.

1. 下载 [VMWare Player Freeware](https://www.vmware.com/products/workstation-player/workstation-player-evaluation.html)。
1. 将其安装在 Windows 系统上。
1. 下载所需版本的 Ubuntu Desktop ISO 镜像文件</0>。 (参阅 [Linux Instructions Page](../setup/dev_env_linux.md) 以获取推荐的 Ubuntu 版本)。
1. 打开 *VMWare Player* 并选择创建新虚拟机的选项。
1. Enable 3D acceleration in the VM's settings: **VM > Settings > Hardware > Display > Accelerate 3D graphics**

:::note
This option is required to properly run 3D simulation environments like jMAVSim and Gazebo. We recommend this is done before installing Linux in the virtual environment.
:::
1. Select the option to create a new virtual machine.
1. In the VM creation wizard choose the downloaded Ubuntu ISO image as your installation medium and will automatically detect the operating system you want to use.
1. Also in the wizard, select the resources you want to allocate to your virtual machine while it is running. Allocate as much memory and as many CPU cores as you can without rendering your host Windows system unusable.
1. Run your new VM at the end of the wizard and let it install Ubuntu following the setup instructions. Remember all settings are only for within your host operating system usage and hence you can disable any screen saver and local workstation security features which do not increase risk of a network attack.
1. Once the new VM is booted up make sure you install *VMWare tools drivers and tools extension* inside your guest system. This will enhance performance and usability of your VM usage:
    * Significantly enhanced graphics performance
    * Proper support for hardware device usage like USB port allocation (important for target upload), proper mouse wheel scrolling, sound suppport
    * Guest display resolution adaption to the window size
    * Clipboard sharing to host system
    * File sharing to host system
1. Continue with [PX4 environment setup for Linux](../dev_setup/dev_env_linux.md)
