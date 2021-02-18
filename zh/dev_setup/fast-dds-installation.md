# Fast DDS Installation

<img alt="logo" src="../../assets/fastrtps/eprosima_logo.png" style="float:left;" /> [eProsima Fast DDS](https://github.com/eProsima/Fast-DDS) is a C++ implementation of the Object Management Group's (OMG) Data Distribution Service (DDS) specification and the Real Time Publish Subscribe (RTPS) protocol.

Fast DDS enables an RTPS/DDS interface that allows PX4 uORB topics to be shared with offboard components, including robotics and simulator tools, that participate in same DDS domain. In particular, Fast DDS is the default middleware implementation for Robot Operating System 2 (ROS 2), and is essential for integrating PX4 with ROS2.

This topic explains how to install Fast DDS for use with PX4.

:::note
Fast DDS was previously named FastRTPS (the name was changed in version 2.0.0 as it now includes a full DDS implementation, rather than just the RTPS wire protocol).
:::

:::tip
- For Ubuntu 18.04, at time of writing, you will need to install Fast RTPS 1.8.2 and Fast-RTPS-Gen 1.0.4 or higher *from source*.
- For Ubuntu 20.04, at time of writing, you will need to install Fast DDS 2.0.0 and Fast-RTPS-Gen 1.0.4  higher *from source*.
:::


## Prerequisites

*eProsima Fast DDS* requires the following packages to work.


### Java

Java is required to use our built-in code generation tool - *fastrtpsgen*. [Java JDK 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) is recommended.

### Windows 7 32-bit and 64-bit

#### Visual C++ 2013 or 2015 Redistributable Package

*eProsima Fast DDS* requires the Visual C++ Redistributable packages for the Visual Studio version you chose during the installation or compilation. The installer gives you the option of downloading and installing them.


## Installation from Sources

### Fast-RTPS (DDS)

Clone the project from Github:

```sh
$ git clone --recursive https://github.com/eProsima/Fast-DDS.git -b v2.0.0 ~/FastDDS-2.0.0
$ cd ~/FastDDS-2.0.0
$ mkdir build && cd build
```

:::note
You may need to [install Gradle](https://gradle.org/install/) to build the source (e.g. this is true on vanilla Fedora Linux). A build warning will be displayed if this is the case.
:::

If you are on Linux, execute:

```sh
$ cmake -DTHIRDPARTY=ON -DSECURITY=ON ..
$ make -j$(nproc --all)
$ sudo make install
```

This will install Fast DDS to `/usr/local`, with secure communications support. If you need to install to a custom location you can use: `-DCMAKE_INSTALL_PREFIX=<path>`.

If you are on Windows, choose your version of *Visual Studio*:

```sh
> cmake -G "Visual Studio 14 2015 Win64" -DTHIRDPARTY=ON -DSECURITY=ON ..
> cmake --build . --target install
```

#### Compile Options

The following additional arguments can be used when calling *CMake*:

- `-DCOMPILE_EXAMPLES=ON`: Compile the examples
- `-DPERFORMANCE_TESTS=ON`: Compile the performance tests

### Fast-RTPS-Gen

*Fast-RTPS-Gen* is the Fast RTPS (DDS) IDL code generator tool. It should be installed after Fast RTPS (DDS) and made sure the `fastrtpsgen` application is in your `PATH`. You can check with `which fastrtpsgen`.

Then install Fast-RTPS-Gen 1.0.4 (Gradle is required for this):
```
git clone --recursive https://github.com/eProsima/Fast-DDS-Gen.git -b v1.0.4 ~/Fast-RTPS-Gen \
    && cd ~/Fast-RTPS-Gen \
    && ./gradlew assemble \
    && sudo ./gradlew install
```

## Installation from Binaries

:::note
Although the binaries are available, we recommend to build and install the code from source, given that the binaries may not come with required components and dependencies in place.
:::

The latest binary release of *eProsima Fast DDS* can be downloaded from the [company website](http://www.eprosima.com/).

Documentation on how to do this can be found here: [Installation from Binaries on Linux](https://fast-dds.docs.eprosima.com/en/latest/installation/binaries/binaries_linux.html) and [Installation from Binaries on Windows](https://fast-dds.docs.eprosima.com/en/latest/installation/binaries/binaries_windows.html) (*eProsima Fast DDS* official documentation)


### Windows 7 32-bit and 64-bit

Execute the installer and follow the instructions, choosing your preferred *Visual Studio* version and architecture when prompted.

#### Environmental Variables

*eProsima Fast DDS* requires the following environmental variable setup in order to function properly

* `FASTRTPSHOME`: Root folder where *eProsima Fast DDS* is installed.
* `FASTRTPSGEN_DIR`: Root folder where *eProsima Fast-RTPS-Gen* is installed.
* Additions to the `PATH`: the **/bin** folder and the subfolder for your Visual Studio version of choice should be appended to the PATH.

These variables are set automatically by checking the corresponding box during the installation process.


### Linux

Extract the contents of the package. It will contain both *eProsima Fast DDS* and its required package *eProsima Fast CDR*. You will have follow the same procedure for both packages, starting with *Fast CDR*.

Configure the compilation:

```sh
$ ./configure --libdir=/usr/lib
```

If you want to compile with debug symbols (which also enables verbose mode):

```sh
$ ./configure CXXFLAGS="-g -D__DEBUG"  --libdir=/usr/lib
```

After configuring the project compile and install the library:

```sh
$ sudo make install
```

#### Environmental Variables

* `FASTRTPSGEN_DIR`: Root folder where *eProsima Fast-RTPS-Gen* is installed, usually set to `/usr/local`, which is the default installation directory. If the user sets a different install directory in the `gradle install` step, it must set it here as well.


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

