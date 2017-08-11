# Intel® Aero Ready to Fly Drone

The Intel® Aero Ready to Fly Drone is a UAV development platform. Part of this is the [Intel Aero
Compute Board](https://software.intel.com/en-us/aero/dev-kit), running Linux on
a Quad-core CPU. The other part is an STM32 microcontroller that is connected
to it and that runs PX4 on NuttX. These are integrated in the same package on
the [Intel® Aero Ready to Fly Drone](https://software.intel.com/en-us/aero/drone-dev-kit), which also includes
the vision accessory kit.


![](../../assets/hardware/hardware-intel-aero-rtf.jpg)

## Introduction

The main documentation is on the [official wiki](https://github.com/intel-aero/meta-intel-aero/wiki). It includes instructions how to setup, update and connect to the board. It's important to update to the latest image available since some instructions changed from previous releases.

You can check the BIOS and distro version by connecting to the board and running the following command:

```
get_aero_version.py
```

The instructions here are tested with the following version:

```
BIOS_VERSION = Aero-01.00.12_Prod
OS_VERSION = v01.00.04
```

The official documentation also explains how to do development on the Linux side, while these instructions concentrate on updating the firmware on the microcontroller from a development tree.

## Flashing

After setting up the PX4 development environment, follow these steps update the PX4 software:

1. Do a full update of all software on the Aero (https://github.com/intel-aero/meta-intel-aero/wiki/Upgrade-To-Latest-Software-Release)

2. Grab the [Firmware](https://github.com/PX4/Firmware)

3. Compile with `make aerofc-v1_default`

4. Configure the target hostname

If your system resolves link local names you don't have to do anything and you can skip this step. You can test it by trying to ssh into intel-aero.local after connecting to it either via WiFi or USB:

```
ssh root@intel-aero.local
```

If it doesn't work you can try giving the IP that will be used by the upload script:

```
export AERO_HOSTNAME=192.168.1.1`
```

5. Upload with  `make aerofc-v1_default upload`


## Connecting QGroundControl via Network

1. Make sure you are connected to the board with WiFi or USB Network

2. ssh to the board and make sure mavlink forwarding runs. By default it automatically starts when booting. It can be started manually with:
```
/etc/init.d/mavlink-routerd.sh start
```

3. Start QGroundControl and it should automatically connect.

4. Instead of starting QGroundControl, you can open a [NuttX shell](../debug/system_console.md#mavlink-shell) with:
```
./Tools/mavlink_shell.py 0.0.0.0:14550
```

## Connecting a Lidar Lite range finder

The following instructions are for a Lidar Lite V3 connected via I2C. The I2C port on the Aero (labled compass) is used for the external magnetometer (part of the GPS). Therefore a I2C splitter has to be used to connect the Lidar Lite (see picture).

![](../../assets/hardware/Aero_I2C_splitter.JPG)

The pinout for the Lidar Lite V3 is as follows

| pin | Aerofc I2C | Lidar Lite V3    |
| --- | ---------- | ---------------- |
| 1   | VCC        | VCC              |
| 2   | SCL        | - (Power enable) |
| 3   | SDA        | - (Mode control) |
| 4   | GND        | SCL              |
| 5   | -          | SDA              |
| 6   | -          | GND              |

![](../../assets/hardware/Aero_LidarLite.JPG)
