---
canonicalUrl: https://docs.px4.io/main/ko/dev_setup/fast-dds-installation
---

# Fast DDS 설치

<img alt="로고" src="../../assets/fastrtps/eprosima_logo.png" style="float:left;" /> [eProsima Fast DDS](https://github.com/eProsima/Fast-DDS)는 OMG(Object Management Group) DDS(Data Distribution Service) 사양 및 RTPS(Real Time Publish Subscribe) 프로토콜의 C++ 구현입니다.

Fast DDS는 PX4 uORB 주제가 동일한 DDS 도메인에 참여하는 로봇 공학 및 시뮬레이터 도구를 포함한 오프보드 구성 요소와 공유될 수 있도록 하는 RTPS/DDS 인터페이스를 활성화합니다. 특히 Fast DDS는 Robot Operating System 2(ROS 2)의 기본 미들웨어 구현이며 PX4와 ROS2를 통합에 필수적입니다.

이 항목에서는 PX4와 함께 사용하기 위한 Fast DDS를 설치 방법을 설명합니다.

:::tip
Fast DDS는 PX4 Autopilot의 필수 구성 요소가 아니며, ROS 2와 같은 다른 Fast RTPS/DDS 시스템과 함께 PX4 Autopilot을 사용할 계획인 경우에만 설치 합니다. This means you just need to install *Fast-RTPS-Gen* and have your ROS 2 environment sourced (`source /opt/ros/<distro>/setup.bash`) in order to be able to compile the `rtps` targets in the PX4-Autopilot repo.

For *ROS2 Galactic and above*, one has to install the `rmw` implementation through `apt` using `apt install ros-galactic-rmw-fastrtps`, since the default middleware for Galactic and above is CycloneDDS and the FastDDS middleware doesn't come installed by default.
:::

:::tip
Fast DDS is not an essential component of the PX4 Autopilot and should only be installed if you plan to interface the PX4 Autopilot with Fast RTPS/DDS participants.
ROS 2 nodes are an example of these, though Fast DDS middleware and C++ implementations are installed by default on ROS 2 Foxy and below, as mentioned above.
:::

:::note
Fast DDS was previously named FastRTPS (the name was changed in version 2.0.0 as it now includes a full DDS implementation, rather than just the RTPS wire protocol).
:::


## 준비 사항

*eProsima Fast DDS* requires the following packages to work.

또한 소스 생성기(Fast-RTPS-Gen)를 빌드하려면 [Gradle을 설치](https://gradle.org/install/)하여야 합니다. [sdkman](https://sdkman.io)을 통하여 Gradle을 설치하는 것이 좋습니다.
- **Ubuntu 18.04:** Fast RTPS 1.8.2(또는 그 이상) 및 Fast-RTPS-Gen 1.0.4(이후는 아님!)
- **Ubuntu 20.04:** Fast DDS 2.0.0(또는 그 이상) 및 Fast-RTPS-Gen 1.0.4(이후는 아님!)
:::

:::tip
Remember (again) you only need to install Fast DDS if you are not using ROS 2 and just want to leverage non-ROS2 DDS networks and applications. If you have ROS 2 installed (and `rmw-fasrtps` as its default middleware), you can skip to [Fast-RTPS-Gen build and install](#fast-rtps-gen).
:::

### Java

Java is required to build and use eProsima's RTPS/DDS from IDL code generation tool - *Fast-RTPS-Gen*. [Java JDK 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) is recommended, and it is installed through the setup scripts made available in [Ubuntu Development Environment](../dev_setup/dev_env_linux.md).

### Foonathan 메모리

Linux에서는 다음 명령어들을 실행하십시오.

```sh
git clone https://github.com/eProsima/foonathan_memory_vendor.git
cd foonathan_memory_vendor
mkdir build && cd build
cmake ..
cmake --build . --target install
```

이렇게 하면 보안 통신 지원과 함께 Fast DDS가 `/usr/local`에 설치됩니다.
:::


## 소스 코드로 설치하기

### Windows 7 32 비트와 64 비트

Windows를 사용하는 경우 *Visual Studio* 버전을 선택합니다.

```sh
$ git clone --recursive https://github.com/eProsima/Fast-DDS.git -b v2.0.0 ~/FastDDS-2.0.0
$ cd ~/FastDDS-2.0.0
$ mkdir build && cd build
```

*CMake*를 호출시, 다음 추가 인수를 사용할 수 있습니다.

```sh
$ cmake -DTHIRDPARTY=ON -DSECURITY=ON ..
$ make -j$(nproc --all)
$ sudo make install
```

*Fast-RTPS-Gen*은 Fast RTPS(DDS) IDL 코드 생성기입니다. If you need to install to a custom location you can use: `-DCMAKE_INSTALL_PREFIX=<path>`.

#### Visual C ++ 2013 또는 2015 재배포 가능 패키지

그런 다음 Fast-RTPS-Gen 1.0.4를 설치합니다(이를 위해서는 Gradle이 필요합니다).

- `-DCOMPILE_EXAMPLES=ON`: 예제 컴파일
- `-DPERFORMANCE_TESTS=ON`: 성능 테스트 컴파일


### Fast-RTPS (DDS)

:::note
바이너리를 사용할 수 있지만, 바이너리가 필수 구성 요소 및 종속성과 함께 제공되지 않을 수 있으므로, 소스를 빌드하고 설치하는 것이 좋습니다. It should be installed after Fast RTPS (DDS) and made sure the `fastrtpsgen` application is in your `PATH`. You can check with `which fastrtpsgen`.

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

## 바이너리로 설치

:::note
Although the binaries are available, we recommend to build and install the code from source, given that the binaries may not come with required components and dependencies in place.
:::

설치 프로그램을 실행하고 지침에 따라 메시지가 표시되면, 원하는 *Visual Studio* 버전과 아키텍처를 선택합니다.

*eProsima Fast DDS*가 제대로 작동하려면, 다음과 같은 환경 변수 설정이 필요합니다.

#### 컴파일 옵션

* `FASTRTPSGEN_DIR`: Root folder where *eProsima Fast-RTPS-Gen* is installed, usually set to `/usr/local`, which is the default installation directory. If the user sets a different install directory in the `gradle install` step, it must set this variable to that same directory as well. Otherwise, the code generation step, and consequently, the build of the `rtps` targets in PX4 will fail.


## 추가 정보

- [RTPS/DDS Interface: PX4-Fast RTPS(DDS) Bridge](../middleware/micrortps.md)
- [PX4-ROS 2 bridge](../ros/ros2_comm.md)

- Additional installation information can be found in the official [*eProsima Fast DDS* documentation](https://fast-dds.docs.eprosima.com/en/latest/) (from which this topic is derived):
  - 소스 코드로 설치하기
    - [Linux](https://fast-dds.docs.eprosima.com/en/latest/installation/sources/sources_linux.html)
    - [Windows](https://fast-dds.docs.eprosima.com/en/latest/installation/sources/sources_windows.html)
  - Installation from Binaries
    - [Linux](https://fast-dds.docs.eprosima.com/en/latest/installation/binaries/binaries_linux.html)
    - [Windows](https://fast-dds.docs.eprosima.com/en/latest/installation/binaries/binaries_windows.html)
