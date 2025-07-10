---
canonicalUrl: https://docs.px4.io/main/de/dev_setup/fast-dds-installation
---

# Fast DDS Installation

<img alt="logo" src="../../assets/fastrtps/eprosima_logo.png" style="float:left;" /> [eProsima Fast DDS](https://github.com/eProsima/Fast-DDS) is a C++ implementation of the Object Management Group's (OMG) Data Distribution Service (DDS) specification and the Real Time Publish Subscribe (RTPS) protocol.

Fast DDS enables an RTPS/DDS interface that allows PX4 uORB topics to be shared with offboard components that participate in same DDS domain, including robotics and simulator tools. In particular, Fast DDS is the default middleware implementation for Robot Operating System 2 (ROS 2), and is essential for integrating PX4 with ROS2.

This topic explains how to install Fast DDS and *Fast-RTPS-Gen* to use in the PX4 build system and with the microRTPS bridge.

:::note
You do not have to install Fast DDS if you have ROS 2 Dashing (Ubuntu 18.04) or ROS 2 Foxy (Ubuntu 20.04) installed, as it comes included with the default `base` or `desktop` installations through the `ros-<distro>-rmw-fastrtps` package. This means you just need to install *Fast-RTPS-Gen* and have your ROS 2 environment sourced (`source /opt/ros/<distro>/setup.bash`) in order to be able to compile the `rtps` targets in the PX4-Autopilot repo.

For *ROS2 Galactic and above*, one has to install the `rmw` implementation through `apt` using `apt install ros-galactic-rmw-fastrtps`, since the default middleware for Galactic and above is CycloneDDS and the FastDDS middleware doesn't come installed by default.
:::

:::tip
Fast DDS is not an essential component of the PX4 Autopilot and should only be installed if you plan to interface the PX4 Autopilot with Fast RTPS/DDS participants.
ROS 2 nodes are an example of these, though Fast DDS middleware and C++ implementations are installed by default on ROS 2 Foxy and below, as mentioned above.
:::

:::note
Fast DDS was previously named FastRTPS (the name was changed in version 2.0.0 as it now includes a full DDS implementation, rather than just the RTPS wire protocol).
:::


## Prerequisites

*eProsima Fast DDS* requires the following packages to work.

:::note
At time of writing you will need to install *from source* for:
- **Ubuntu 18.04:** Fast RTPS 1.8.4 (or later) and Fast-RTPS-Gen 1.0.4 (not later!).
- **Ubuntu 20.04:** Fast DDS 2.0.2 (or later) and Fast-RTPS-Gen 1.0.4 (not later!).
:::

:::tip
Remember (again) you only need to install Fast DDS if you are not using ROS 2 and just want to leverage non-ROS2 DDS networks and applications. If you have ROS 2 installed (and `rmw-fasrtps` as its default middleware), you can skip to [Fast-RTPS-Gen build and install](#fast-rtps-gen).
:::

### Java

Java is required to build and use eProsima's RTPS/DDS from IDL code generation tool - *Fast-RTPS-Gen*. [Java JDK 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) is recommended, and it is installed through the setup scripts made available in [Ubuntu Development Environment](../dev_setup/dev_env_linux.md).

### Foonathan memory

In order to build Fast DDS you need to install the Foonathan Memory dependency.

```sh
git clone https://github.com/eProsima/foonathan_memory_vendor.git
cd foonathan_memory_vendor
mkdir build && cd build
cmake ..
cmake --build . --target install
```

:::note
If the last step fails, try running the command with the proper user privileges (`sudo`).
:::


## Installation from Sources

### Fast DDS

Clone the project from Github:

```sh
$ git clone --recursive https://github.com/eProsima/Fast-DDS.git -b v2.0.2 ~/FastDDS-2.0.2
$ cd ~/FastDDS-2.0.2
$ mkdir build && cd build
```

If you are on Linux, execute:

```sh
$ cmake -DTHIRDPARTY=ON -DSECURITY=ON ..
$ make -j$(nproc --all)
$ sudo make install
```

This will install Fast DDS to `/usr/local`, with secure communications support. If you need to install to a custom location you can use: `-DCMAKE_INSTALL_PREFIX=<path>`.

#### Compile Options

The following additional arguments can be used when calling *CMake*:

- `-DCOMPILE_EXAMPLES=ON`: Compile the examples
- `-DPERFORMANCE_TESTS=ON`: Compile the performance tests


### Fast-RTPS-Gen

*Fast-RTPS-Gen* is the Fast RTPS (DDS) IDL code generator tool. It should be installed after Fast RTPS (DDS) and made sure the `fastrtpsgen` application is in your `PATH`. You can check with `which fastrtpsgen`.

Then clone Fast-RTPS-Gen 1.0.4:
```
git clone --recursive https://github.com/eProsima/Fast-DDS-Gen.git -b v1.0.4 ~/Fast-RTPS-Gen \

&& cd ~/Fast-RTPS-Gen/gradle/wrapper
```

After that, modify the distribution version  of gradle inside the gradle-wrapper.properties file to gradle-6.8.3 such that the distributionUrl file becomes as follows:

```
distributionUrl=https\://services.gradle.org/distributions/gradle-6.8.3-bin.zip
```
Now you should run the following commands:

```
    cd ~/Fast-RTPS-Gen 
    ./gradlew assemble && sudo env "PATH=$PATH" ./gradlew install
```

## Installation from Binaries

:::note
Although the binaries are available, we recommend to build and install the code from source, given that the binaries may not come with required components and dependencies in place.
:::

The latest binary release of *eProsima Fast DDS* can be downloaded from the [company website](http://www.eprosima.com/).

Documentation on how to do this can be found here: [Installation from Binaries on Linux](https://fast-dds.docs.eprosima.com/en/latest/installation/binaries/binaries_linux.html) and [Installation from Binaries on Windows](https://fast-dds.docs.eprosima.com/en/latest/installation/binaries/binaries_windows.html) (*eProsima Fast DDS* official documentation)

#### Environmental Variables

* `FASTRTPSGEN_DIR`: Root folder where *eProsima Fast-RTPS-Gen* is installed, usually set to `/usr/local`, which is the default installation directory. If the user sets a different install directory in the `gradle install` step, it must set this variable to that same directory as well. Otherwise, the code generation step, and consequently, the build of the `rtps` targets in PX4 will fail.


## Further Information

- [RTPS/DDS Interface: PX4-Fast RTPS(DDS) Bridge](../middleware/micrortps.md)
- [PX4-ROS 2 bridge](../ros/ros2_comm.md)

- Additional installation information can be found in the official [*eProsima Fast DDS* documentation](https://fast-dds.docs.eprosima.com/en/latest/) (from which this topic is derived):
  - Installation from Sources
    - [Linux](https://fast-dds.docs.eprosima.com/en/latest/installation/sources/sources_linux.html)
    - [Windows](https://fast-dds.docs.eprosima.com/en/latest/installation/sources/sources_windows.html)
  - Installation from Binaries
    - [Linux](https://fast-dds.docs.eprosima.com/en/latest/installation/binaries/binaries_linux.html)
    - [Windows](https://fast-dds.docs.eprosima.com/en/latest/installation/binaries/binaries_windows.html)
