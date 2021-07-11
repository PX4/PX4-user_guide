# Fast DDS 설치

<img alt="logo" src="../../assets/fastrtps/eprosima_logo.png" style="float:left;" /> [eProsima Fast DDS](https://github.com/eProsima/Fast-DDS)는 OMG(Object Management Group) DDS(Data Distribution Service) 사양 및 RTPS(Real Time Publish Subscribe) 프로토콜의 C++ 구현입니다.

Fast DDS는 PX4 uORB 주제가 동일한 DDS 도메인에 참여하는 로봇 공학 및 시뮬레이터 도구를 포함한 오프보드 구성 요소와 공유될 수 있도록 하는 RTPS/DDS 인터페이스를 활성화합니다. 특히 Fast DDS는 Robot Operating System 2(ROS 2)의 기본 미들웨어 구현이며 PX4와 ROS2를 통합에 필수적입니다.

이 항목에서는 PX4와 함께 사용하기 위한 Fast DDS를 설치 방법을 설명합니다.

:::tip
Fast DDS는 PX4 Autopilot의 필수 구성 요소가 아니며, ROS 2와 같은 다른 Fast RTPS/DDS 시스템과 함께 PX4 Autopilot을 사용할 계획인 경우에만 설치 합니다.
:::

:::note
Fast DDS는 이전에 FastRTPS로 명명되었습니다(버전 2.0.0에서는 이제 RTPS 유선 프로토콜이 아닌 전체 DDS 구현을 포함하므로 이름이 변경됨).
:::


## 준비 사항

*eProsima Fast DDS* requires the following packages to work.

:::note
At time of writing you will need to install *from source* for:
- **Ubuntu 18.04:** Fast RTPS 1.8.2 (or later) and Fast-RTPS-Gen 1.0.4 (not later!).
- **Ubuntu 20.04:** Fast DDS 2.0.0 (or later) and Fast-RTPS-Gen 1.0.4 (not later!).
:::

### Java

Java is required to use our built-in code generation tool - *fastrtpsgen*. [Java JDK 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) is recommended.

### Gradle

You also need to [install Gradle](https://gradle.org/install/) to build the source generators (Fast-RTPS-Gen), we recommend you install Gradle via [sdkman](https://sdkman.io).

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
If the last step fails, try running the command with the proper user privileges (sudo)
:::

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
