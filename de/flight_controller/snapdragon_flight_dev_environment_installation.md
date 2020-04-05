# Snapdragon Development Environment Installation

> **Note** The *Qualcomm Snapdragon Flight* is discontinued (it has been superseded but PX4 does not yet support the newer version). This documentation is provided for existing users, but will be removed in a future release.

This topic explains how to set up the *Qualcomm Snapdragon Flight* development toolchain on a Linux computer.

> ***Note*** The firmware for the *Qualcomm Snapdragon Flight* must be built manually (Firmware is not supplied for automatic download via *QGroundControl*).

## Set up Development Environment

To set up the development environment:

1. Add your user to the *dialout* group: ```sudo usermod -a -G dialout $USER```
2. Log out and back in.
3. Download the [ubuntu_sim_common_deps.sh](https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/ubuntu_sim_common_deps.sh) script and run it on your machine: 
        cd ~
        wget https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/ubuntu_sim_common_deps.sh ~
        sudo chmod +x ubuntu_sim_common_deps.sh
        ./ubuntu_sim_common_deps.sh

## Cross-toolchain & Hexagon SDK

To install the Cross-Toolchain and Hexagon SDK:

1. Start by installing some dependencies:
    
        sudo apt-get install android-tools-adb android-tools-fastboot \
            fakechroot fakeroot unzip xz-utils wget python python-empy -y
        

2. Clone the cross_toolchain repo:
    
        git clone https://github.com/ATLFlight/cross_toolchain.git
        cd cross_toolchain
        

3. Download the Hexagon SDK v3.0 from [here](https://developer.qualcomm.com/software/hexagon-dsp-sdk/tools) to your cross_toolchain/downloads location (you will need to create an account if you don't have one).
4. Download the latest version of the qrlSDK file from [here](https://support.intrinsyc.com/projects/snapdragon-flight/files) to your cross_toolchain/downloads location (you need to create an account if you don't have one).
5. Run the installer: ```./installsdk.sh --APQ8074 --arm-gcc --qrlSDK```
6. The installer tells you to set a few environment variables. Append these to your `~/.bashrc`: 
        export HEXAGON_SDK_ROOT=/home/<YOUR_LINUX_USERNAME>/Qualcomm/Hexagon_SDK/3.0
        export HEXAGON_TOOLS_ROOT=/home/<YOUR_LINUX_USERNAME>/Qualcomm/HEXAGON_Tools/7.2.12/Tools
        export HEXAGON_ARM_SYSROOT=/home/<YOUR_LINUX_USERNAME>/Qualcomm/qrlinux_sysroot
        export ARM_CROSS_GCC_ROOT=/home/<YOUR_LINUX_USERNAME>/Qualcomm/ARM_Tools/gcc-4.9-2014.11 Don't forget to source it: ```source ~/.bashrc```