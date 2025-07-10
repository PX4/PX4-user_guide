---
canonicalUrl: https://docs.px4.io/main/ko/dev_setup/fast-dds-installation
---

# Fast DDS 설치

<img alt="로고" src="../../assets/fastrtps/eprosima_logo.png" style="float:left;" /> [eProsima Fast DDS](https://github.com/eProsima/Fast-DDS)는 OMG(Object Management Group) DDS(Data Distribution Service) 사양 및 RTPS(Real Time Publish Subscribe) 프로토콜의 C++ 구현입니다.

Fast DDS는 PX4 uORB 주제가 동일한 DDS 도메인에 참여하는 로봇 공학 및 시뮬레이터 도구를 포함한 오프보드 구성 요소와 공유될 수 있도록 하는 RTPS/DDS 인터페이스를 활성화합니다. 특히 Fast DDS는 Robot Operating System 2(ROS 2)의 기본 미들웨어 구현이며 PX4와 ROS2를 통합에 필수적입니다.

이 항목에서는 PX4와 함께 사용하기 위한 Fast DDS를 설치 방법을 설명합니다.

:::tip
Fast DDS는 PX4 Autopilot의 필수 구성 요소가 아니며, ROS 2와 같은 다른 Fast RTPS/DDS 시스템과 함께 PX4 Autopilot을 사용할 계획인 경우에만 설치 합니다.
:::

:::note
Fast DDS는 이전에 FastRTPS로 명명되었습니다(버전 2.0.0에서는 이제 RTPS 유선 프로토콜이 아닌 전체 DDS 구현을 포함하므로 이름이 변경됨).
:::


## 준비 사항

*eProsima Fast DDS*가 작동하려면 다음 패키지가 필요합니다.

:::note
작성시 다음을 위해 *소스에서* 설치하여야 합니다.
- **Ubuntu 18.04:** Fast RTPS 1.8.2(또는 그 이상) 및 Fast-RTPS-Gen 1.0.4(이후는 아님!)
- **Ubuntu 20.04:** Fast DDS 2.0.0(또는 그 이상) 및 Fast-RTPS-Gen 1.0.4(이후는 아님!)
:::

### Java

내장 코드 생성 도구인 *fastrtpsgen*을 사용하기 위하여 Java가 필요합니다. [JDK 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)을 권장합니다.

### Gradle

또한 소스 생성기(Fast-RTPS-Gen)를 빌드하려면 [Gradle을 설치](https://gradle.org/install/)하여야 합니다. [sdkman](https://sdkman.io)을 통하여 Gradle을 설치하는 것이 좋습니다.

### Foonathan 메모리

Fast DDS를 구축하려면 Foonathan 메모리 종속성을 설치하여야 합니다.

```sh
git clone https://github.com/eProsima/foonathan_memory_vendor.git
cd foonathan_memory_vendor
mkdir build && cd build
cmake ..
cmake --build . --target install
```

:::note
마지막 단계가 실패하면 적절한 사용자 권한(sudo)으로 실행하십시오.
:::

### Windows 7 32 비트와 64 비트

#### Visual C ++ 2013 또는 2015 재배포 가능 패키지

*eProsima Fast DDS*를 사용하려면 설치 또는 컴파일 중에 선택한 Visual Studio 버전용 Visual C++ 재배포 가능 패키지가 필요합니다. 설치 프로그램은 다운로드 및 설치 옵션을 제공합니다.


## 소스 코드로 설치하기

### Fast-RTPS (DDS)

Github에서 프로젝트를 복제합니다.

```sh
$ git clone --recursive https://github.com/eProsima/Fast-DDS.git -b v2.0.0 ~/FastDDS-2.0.0
$ cd ~/FastDDS-2.0.0
$ mkdir build && cd build
```

Linux에서는 다음 명령어들을 실행하십시오.

```sh
$ cmake -DTHIRDPARTY=ON -DSECURITY=ON ..
$ make -j$(nproc --all)
$ sudo make install
```

이렇게 하면 보안 통신 지원과 함께 Fast DDS가 `/usr/local`에 설치됩니다. 사용자 지정 위치에 설치해야 하는 경우 `-DCMAKE_INSTALL_PREFIX=<path>`을 사용할 수 있습니다.

Windows를 사용하는 경우 *Visual Studio* 버전을 선택합니다.

```sh
> cmake -G "Visual Studio 14 2015 Win64" -DTHIRDPARTY=ON -DSECURITY=ON ..
> cmake --build . --target install
```

#### 컴파일 옵션

*CMake*를 호출시, 다음 추가 인수를 사용할 수 있습니다.

- `-DCOMPILE_EXAMPLES=ON`: 예제 컴파일
- `-DPERFORMANCE_TESTS=ON`: 성능 테스트 컴파일

### Fast-RTPS-Gen

*Fast-RTPS-Gen*은 Fast RTPS(DDS) IDL 코드 생성기입니다. It should be installed after Fast RTPS (DDS) and made sure the `fastrtpsgen` application is in your `PATH`. `어떤 fastrtpsgen`인지 확인할 수 있습니다.

그런 다음 Fast-RTPS-Gen 1.0.4를 설치합니다(이를 위해서는 Gradle이 필요합니다).
```
git clone --recursive https://github.com/eProsima/Fast-DDS-Gen.git -b v1.0.4 ~/Fast-RTPS-Gen \
    && cd ~/Fast-RTPS-Gen \
    && ./gradlew assemble \
    && sudo ./gradlew install
```

## 바이너리로 설치

:::note
바이너리를 사용할 수 있지만, 바이너리가 필수 구성 요소 및 종속성과 함께 제공되지 않을 수 있으므로, 소스를 빌드하고 설치하는 것이 좋습니다.
:::

*eProsima Fast DDS*의 최신 바이너리 릴리스는 [회사 웹사이트](http://www.eprosima.com/)에서 다운로드할 수 있습니다.

이 작업을 수행하는 방법에 대한 문서는 [Linux의 바이너리에서 설치](https://fast-dds.docs.eprosima.com/en/latest/installation/binaries/binaries_linux.html)와 [Windows의 바이너리에서 설치](https://fast-dds.docs.eprosima.com/en/latest/installation/binaries/binaries_windows.html)(*eProsima Fast DDS* 공식 문서)에서 찾을 수 있습니다.


### Windows 7 32 비트와 64 비트

설치 프로그램을 실행하고 지침에 따라 메시지가 표시되면, 원하는 *Visual Studio* 버전과 아키텍처를 선택합니다.

#### 환경 변수

*eProsima Fast DDS*가 제대로 작동하려면, 다음과 같은 환경 변수 설정이 필요합니다.

* `FASTRTPSHOME`: *eProsima Fast DDS*가 설치된 루트 폴더입니다.
* `FASTRTPSGEN_DIR`: *eProsima Fast-RTPS-Gen*이 설치된 루트 폴더입니다.
* `PATH`에 대한 추가 사항: 선택한 Visual Studio 버전의 **/bin** 폴더 및 하위 폴더가 PATH에 추가되어야 합니다.

이러한 변수는 설치 과정에서 해당 상자를 선택하여 자동으로 설정됩니다.


### Linux

패키지의 내용을 추출합니다. 여기에는 *eProsima Fast DDS*와 필수 패키지인 *eProsima Fast CDR*이 모두 포함됩니다. *빠른 CDR*부터 시작하여 두 패키지에 대해 동일한 절차를 따라야 합니다.

컴파일 설정:

```sh
$ ./configure --libdir=/usr/lib
```

디버그 기호로 컴파일하려면(자세한 정보 표시 모드도 활성화함):

```sh
$ ./configure CXXFLAGS="-g -D__DEBUG"  --libdir=/usr/lib
```

프로젝트 설정후, 라이브러리를 컴파일하고 설치합니다.

```sh
$ sudo make install
```

#### 환경 변수

* `FASTRTPSGEN_DIR`: *eProsima Fast-RTPS-Gen*이 설치된 루트 폴더로, 일반적으로 기본 설치 디렉토리인 `/usr/local`로 설정됩니다. 사용자가 `gradle 설치` 단계에서 다른 설치 디렉토리를 설정하였으면, 여기에도 설정하여야 합니다.


## 추가 정보


- [RTPS/DDS 인터페이스: PX4-고속 RTPS(DDS) 브릿지](../middleware/micrortps.md)
- [PX4-ROS 2 브릿지](../ros/ros2_comm.md)

- 추가 설치 정보는 공식 [*eProsima Fast DDS* 문서](https://fast-dds.docs.eprosima.com/en/latest/)(이 주제에서 파생됨)를 참고하십시오.
  - 소스로 설치하기
    - [Linux](https://fast-dds.docs.eprosima.com/en/latest/installation/sources/sources_linux.html)
    - [Windows](https://fast-dds.docs.eprosima.com/en/latest/installation/sources/sources_windows.html)
  - 바이너리로 설치
    - [Linux](https://fast-dds.docs.eprosima.com/en/latest/installation/binaries/binaries_linux.html)
    - [Windows](https://fast-dds.docs.eprosima.com/en/latest/installation/binaries/binaries_windows.html)
