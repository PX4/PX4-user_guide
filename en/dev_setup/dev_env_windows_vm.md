# Windows Virtual Machine-Hosted Toolchain

:::warning
This development environment is [not supported](../advanced/dev_env_unsupported.md).
See [Toolchain Installation](../dev_setup/dev_env.md) for information about the environments and tools we do support!
:::

Windows developers can run the PX4 toolchain in a virtual machine (VM) with Linux as the guest operating system. After setting up the virtual machine, the installation and setup of PX4 within the VM is exactly the same as on a native Linux computer.

:::tip
Allocate as many CPU cores and memory resources to the VM as possible.
:::

While using a VM is a very easy way to set up and test an environment for building firmware, users should be aware:
1. Firmware building will be slower than native building on Linux.
1. The JMAVSim frame rate be much slower than on native Linux. In some cases the vehicle may crash due to issues related to insufficient VM resources.
1. Gazebo and ROS can be installed, but are unusably slow.

## Instructions

There are multiple ways to setup a VM which is capable of executing the PX4 environment on your system. 
This guide walks you through a VMWare setup. 
VMWare performance is acceptable for basic usage (building Firmware) but not for running ROS or Gazebo Classic.

1. Download [VMWare Player Freeware](https://www.vmware.com/products/workstation-player/workstation-player-evaluation.html)
1. Install it on your Windows system
1. Download the desired version of [Ubuntu Desktop ISO Image](https://www.ubuntu.com/download/desktop).
   (see [Linux Instructions Page](../dev_setup/dev_env_linux.md) for recommended Ubuntu version).
1. Open *VMWare Player*.
1. Enable 3D acceleration in the VM's settings: **VM > Settings > Hardware > Display > Accelerate 3D graphics**

   :::note
   This option is required to properly run 3D simulation environments like jMAVSim and Gazebo Classic.
   We recommend this is done before installing Linux in the virtual environment.
   :::
1. Select the option to create a new virtual machine.
1. In the VM creation wizard choose the downloaded Ubuntu ISO image as your installation medium and will automatically detect the operating system you want to use.
1. Also in the wizard, select the resources you want to allocate to your virtual machine while it is running. Allocate as much memory and as many CPU cores as you can without rendering your host Windows system unusable.
1. Run your new VM at the end of the wizard and let it install Ubuntu following the setup instructions. Remember all settings are only for within your host operating system usage and hence you can disable any screen saver and local workstation security features which do not increase risk of a network attack.
1. Once the new VM is booted up make sure you install *VMWare tools drivers and tools extension* inside your guest system. This will enhance performance and usability of your VM usage:
    * Significantly enhanced graphics performance
    * Proper support for hardware device usage like USB port allocation (important for target upload), proper mouse wheel scrolling, sound support
    * Guest display resolution adaption to the window size
    * Clipboard sharing to host system
    * File sharing to host system
1. Continue with [PX4 environment setup for Linux](../dev_setup/dev_env_linux.md)

## VirtualBox 7 USB passthrough for QGroundControl / Firmware Flashing

In order to flash newly-built firmware onto autopilot hardware, there's a need to configure USB passthrough settings.

:::tip
This guide is for VirtualBox 7 users hosting Ubuntu 20.04 LTS on a Windows 10 machine.
:::

1. Ensure that the user has been added to the dialout group using `sudo usermod -a -G dialout $USER` and restart
1. Enable serial port(s) in VM: **VirtualBox > Settings > Serial Ports 1/2/3/etc...**
1. Enable USB controller in VM: **VirtualBox > Settings > USB**
1. Add USB filters for the bootloader and autopilot in VM: **VirtualBox > Settings > USB > Add new USB filter**
   ... Autopilot: This shows up at a device after the bootloader finishes the booting process
   ... Bootloader: This shows up as a device for a few seconds after plugging in the USB cable, you only have a few seconds to add to filter before it disappears as a device.
1. Select the device in the VM instance's dropdown menu **VirtualBox > Devices > your_device**

If successful, your device will show up with `lsusb` and QGroundControl will connect to the device automatically.
Repeat step 4 if your connected device does not show up.


