# Snapdragon Development Environment Installation
In order to get your Snapdragon into the air, a few things need to be installed on your local PC.

> ***Note*** The proper firmware for the Qualcomm Snapdragon Flight is not built and downloaded by QGroundControl by default.

## Set up Development Environment
Add your user to the dialout group:

`sudo usermod -a -G dialout $USER`


Log out and back in

Download this script and run it on your machine:

```
cd ~
wget https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/ubuntu_sim_common_deps.sh ~
sudo chmod +x ubuntu_sim_common_deps.sh
./ubuntu_sim_common_deps.sh
```

## Cross- toolchain & Hexagon SDK
Start by installing some dependencies:
```
sudo apt-get install android-tools-adb android-tools-fastboot \
	    fakechroot fakeroot unzip xz-utils wget python python-empy -y
```

Clone the cross_toolchain repo
```
git clone https://github.com/ATLFlight/cross_toolchain.git
cd cross_toolchain
```

Download the Hexagon SDK v3.0 from [here](https://developer.qualcomm.com/software/hexagon-dsp-sdk/tools) to your cross_toolchain/downloads location. (You need to create an account if you don't have one).

Download the latest version of the qrlSDK file from [here](https://support.intrinsyc.com/projects/snapdragon-flight/files) to your cross_toolchain/downloads location. (You need to create an account if you don't have one).
Run the installer

`./installsdk.sh --APQ8074 --arm-gcc --qrlSDK`

Lastly, the installer tells you to set a few environment variables. Append those to your `~/.bashrc`:
```
export HEXAGON_SDK_ROOT=/home/<YOUR_LINUX_USERNAME>/Qualcomm/Hexagon_SDK/3.0
export HEXAGON_TOOLS_ROOT=/home/<YOUR_LINUX_USERNAME>/Qualcomm/HEXAGON_Tools/7.2.12/Tools
export HEXAGON_ARM_SYSROOT=/home/<YOUR_LINUX_USERNAME>/Qualcomm/qrlinux_sysroot
export ARM_CROSS_GCC_ROOT=/home/<YOUR_LINUX_USERNAME>/Qualcomm/ARM_Tools/gcc-4.9-2014.11
```

And don't forget to source it
```
source ~/.bashrc
```
