---
canonicalUrl: https://docs.px4.io/main/ko/dev_setup/fast-rtps-installation
---

# Fast RTPS 설치

<img alt="logo" src="../../assets/fastrtps/eprosima_logo.png" style="float:left;" /> [eProsima Fast RTPS](http://eprosima-fast-rtps.readthedocs.io/en/latest/)는 RTPS(Real Time Publish Subscribe) 규약을 C++로 구현한 것으로 개체 관리 그룹(Object Management Group, OMG) 컨소시엄에 의해 정의되고 관리되는 UDP와 같은 신뢰성이 좋지 않은 전송을 통해 게시자-가입자간의 통신을 제공합니다. 또한 RTPS는 역시나 OMG에 의한 데이터 분배 서비스(Data Distribution Service, DDS)로 정의된 유선 상호 운용성 규약입니다.

Fast RTPS는 PX4에서 RTPS 인터페이스가 활성화되도록 사용되어 PX4 uORB 주제를 허용함으로서 로봇 공학 및 시뮬레이터 도구를 포함한 보드 이외의 구성 요소와 공유되도록 합니다. RTPS는 DDS의 기반 규약으로 우주항공, 군사, 그리고 IoT 활용에 널리 사용되는 실시간 게시/가입 미들웨어를 제공하는 OMG(Object Management Group)의 표준입니다. 또한 ROS2 로봇 공학 툴킷을 위한 미들웨어로서 채택되었습니다. 더 많은 정보는 [RTPS/ROS2 인터페이스: PX4-FastRTPS 브릿지](../middleware/micrortps.md)를 보십시오.

:::tip
For Ubuntu, at time of writing, you will need to install Fast-RTPS 1.8.2 *from source*.
:::

:::note
This topic is derived from the official [*eProsima Fast RTPS* documentation](http://eprosima-fast-rtps.readthedocs.io/en/latest/).

For more information see:
- 소스로 설치
  - [Linux](https://fast-dds.docs.eprosima.com/en/latest/installation/sources/sources_linux.html)
  - [Windows](https://fast-dds.docs.eprosima.com/en/latest/installation/sources/sources_windows.html)
- 바이너리로 설치
  - [Linux](https://fast-dds.docs.eprosima.com/en/latest/installation/binaries/binaries_linux.html)
  - [Windows](https://fast-dds.docs.eprosima.com/en/latest/installation/binaries/binaries_windows.html)
:::

## 표준 설치

Github에서 프로젝트를 복사십시오.


### 의존성 실행

#### Java

Java is required to use our built-in code generation tool - *fastrtpsgen*. [Java JDK 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) is recommended.

### Windows 7 32-bit와 64-bit

#### Visual C ++ 2013 또는 2015 재배포 가능 패키지

이렇게하면 Fast RTPS가 `/usr/local`에 설치됩니다. `DCMAKE_INSTALL_PREFIX = <path>`를 사용하여 사용자 지정 위치에 설치할 수 있습니다.



## 요구사항

### Windows 7 32-bit 와 64-bit

Linux를 사용하는 경우 다음을 실행하십시오.

```sh
$ git clone https://github.com/eProsima/Fast-RTPS
$ mkdir Fast-RTPS/build && cd Fast-RTPS/build
```

:::note
You may need to [install Gradle](https://gradle.org/install/) to build the source (e.g. this is true on vanilla Fedora Linux). A build warning will be displayed if this is the case.
:::

Windows 사용자 인 경우 다음 *Visual Studio* 버전을 선택하십시오.

```sh
$ cmake -DTHIRDPARTY=ON -DBUILD_JAVA=ON ..
$ make
$ sudo make install
```

This will install Fast RTPS to `/usr/local`, with secure communications support. 그런 다음 `fastrtpsgen` 응용 프로그램이 `PATH`에 있는지 확인하십시오.

성능 테스트를 컴파일하려면 *CMake*를 호출 할 때 `-DPERFORMANCE_TESTS = ON` 인수를 추가해야합니다.

```sh
> cmake -G "Visual Studio 14 2015 Win64" -DTHIRDPARTY=ON -DBUILD_JAVA=ON ..
> cmake --build . --target install
```

#### 환경 변수

*eProsima Fast RTPS*의 최신 바이너리 릴리즈는 [회사 웹 사이트](http://www.eprosima.com/)에서 항상 다운로드 할 수 있습니다.

이를 수행하는 방법에 대한 문서는 [바이너리로 설치](http://eprosima-fast-rtps.readthedocs.io/en/latest/binaries.html#installation-from-binaries)(*eProsima Fast RTPS 공식 문서*)에서 찾을 수 있습니다

### Fast-RTPS-Gen

*Fast-RTPS-Gen* is the Fast RTPS IDL code generator tool. It should be installed after Fast RTPS and made sure the `fastrtpsgen` application is in your `PATH`. You can check with `which fastrtpsgen`.

*eProsima Fast RTPS*는 제대로 작동하려면 다음 환경 변수 설정이 필요합니다.
```
git clone --recursive https://github.com/eProsima/Fast-RTPS-Gen.git -b v1.0.4 ~/Fast-RTPS-Gen \
    && cd ~/Fast-RTPS-Gen \
    && ./gradlew assemble \
    && sudo ./gradlew install
```

## 소스로 설치

:::note
Although the binaries are available, we recommend to build and install the code from source, given that the binaries may not come with required components and dependencies in place.
:::

You can always download the latest binary release of *eProsima Fast RTPS* from the [company website](http://www.eprosima.com/).

컴파일을 구성합니다.


### Windows 7 32-bit and 64-bit

디버그 기호로 컴파일하려면 다음과 같이하십시오(verbose mode도 활성화됨).

#### Environmental Variables

프로젝트를 구성한 후 라이브러리를 컴파일하고 설치하십시오.

* [Mac에서의 개발 환경](../setup/dev_env_mac.md) (Fast RTPS는 공통 도구에 포함되어 있음.)
* [리눅스에서의 개발 환경](../setup/dev_env_linux.md) (Fast RTPS는 설치 스크립트에 포함되어 있음)
* [Windows > Windows의 Bash에서의 개발 환경](/setup/dev_env_windows.md#bash-on-windows-new) (Fast RTPS는 설치 스크립트에 포함되어 있음.)

These variables are set automatically by checking the corresponding box during the installation process.


### Linux

Extract the contents of the package. It will contain both *eProsima Fast RTPS* and its required package *eProsima Fast CDR*. You will have follow the same procedure for both packages, starting with *Fast CDR*.

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

* `FASTRTPSHOME`: *eProsima Fast RTPS*가 설치된 루트 폴더. If the user sets a different install directory in the `gradle install` step, it must set it here as well.
