# Fast RTPS 설치

<img alt="logo" src="../../assets/fastrtps/eprosima_logo.png" style="float:left;" /> [eProsima Fast RTPS](http://eprosima-fast-rtps.readthedocs.io/en/latest/)는 RTPS(Real Time Publish Subscribe) 규약을 C++로 구현한 것으로 개체 관리 그룹(Object Management Group, OMG) 컨소시엄에 의해 정의되고 관리되는 UDP와 같은 신뢰성이 좋지 않은 전송을 통해 게시자-가입자간의 통신을 제공합니다. 또한 RTPS는 역시나 OMG에 의한 데이터 분배 서비스(Data Distribution Service, DDS)로 정의된 유선 상호 운용성 규약입니다.

Fast RTPS는 PX4에서 RTPS 인터페이스가 활성화되도록 사용되어 PX4 uORB 주제를 허용함으로서 로봇 공학 및 시뮬레이터 도구를 포함한 보드 이외의 구성 요소와 공유되도록 합니다. RTPS는 DDS의 기반 규약으로 우주항공, 군사, 그리고 IoT 활용에 널리 사용되는 실시간 게시/가입 미들웨어를 제공하는 OMG(Object Management Group)의 표준입니다. 또한 ROS2 로봇 공학 툴킷을 위한 미들웨어로서 채택되었습니다. 더 많은 정보는 [RTPS/ROS2 인터페이스: PX4-FastRTPS 브릿지](../middleware/micrortps.md)를 보십시오.

> *eProsima Fast RTPS*는 작동을 위해 아래의 패키지들을 필요로 합니다.

<span></span>
> **주의** 이 주제는 공식 [*eProsima Fast RTPS* 문서](http://eprosima-fast-rtps.readthedocs.io/en/latest/)에서 발췌되었습니다. 더 자세한 정보는 다음을 참고하세요.
  - [요구사항](http://eprosima-fast-rtps.readthedocs.io/en/latest/requirements.html#requirements)
  - [소스로 설치](http://eprosima-fast-rtps.readthedocs.io/en/latest/sources.html#installation-from-sources)
  - [바이너리로 설치](http://eprosima-fast-rtps.readthedocs.io/en/latest/binaries.html#installation-from-binaries)


## 표준 설치

Fast RTPS는 아래와 같은 일부 플랫폼에서 PX4 개발자 환경의 일부로 설치됩니다.


### 의존성 실행

#### Java

Java는 내장된 코드 생성 도구인 *fastrtpsgen*을 사용해야합니다. [Java JDK 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)이 권장됩니다.

### Windows 7 32-bit와 64-bit

#### Visual C ++ 2013 또는 2015 재배포 가능 패키지

*eProsima Fast RTPS*는 설치 또는 컴파일 중에 선택한 Visual Studio 버전에 대한 Visual C ++ 재배포 가능 패키지가 필요합니다. 이 설치 프로그램은 다운로드 및 설치 옵션을 제공합니다.



## 요구사항

### Windows 7 32-bit 와 64-bit

Github에서 프로젝트를 복사십시오.

```sh
$ git clone https://github.com/eProsima/Fast-RTPS
$ mkdir Fast-RTPS/build && cd Fast-RTPS/build
```

> **참고** 소스를 빌드하려면 [Gradle을 설치](https://gradle.org/install/)해야 할 수도 있습니다(예: vanilla Fedora Linux의 경우에 해당). 이 경우 빌드 경고가 표시됩니다.

If you are on Linux, execute:

```sh
$ cmake -DTHIRDPARTY=ON -DBUILD_JAVA=ON ..
$ make
$ sudo make install
```

이렇게하면 Fast RTPS가 `/usr/local`에 설치됩니다. `DCMAKE_INSTALL_PREFIX = <path>`를 사용하여 사용자 지정 위치에 설치할 수 있습니다.

Linux를 사용하는 경우 다음을 실행하십시오.

```sh
> cmake -G "Visual Studio 14 2015 Win64" -DTHIRDPARTY=ON -DBUILD_JAVA=ON ..
> cmake --build . --target install
```

#### 환경 변수

예제를 컴파일하려면, *CMake*를 호출 할 때 `-DCOMPILE_EXAMPLES = ON` 인수를 추가해야합니다.

Windows 사용자 인 경우 다음 *Visual Studio* 버전을 선택하십시오.

### Fast-RTPS-Gen

*Fast-RTPS-Gen* is the Fast RTPS IDL code generator tool. 그런 다음 `fastrtpsgen` 응용 프로그램이 `PATH`에 있는지 확인하십시오. `which fastrtpsgen`으로 확인할 수 있습니다.

성능 테스트를 컴파일하려면 *CMake*를 호출 할 때 `-DPERFORMANCE_TESTS = ON` 인수를 추가해야합니다.
```
git clone --recursive https://github.com/eProsima/Fast-RTPS-Gen.git -b v1.0.4 ~/Fast-RTPS-Gen \
    && cd ~/Fast-RTPS-Gen \
    && ./gradlew assemble \
    && sudo ./gradlew install
```

## 소스로 설치

> **Note** Although the binaries are available, we recommend to build and install the code from source, given that the binaries may not come with required components and dependencies in place.

*eProsima Fast RTPS*의 최신 바이너리 릴리즈는 [회사 웹 사이트](http://www.eprosima.com/)에서 항상 다운로드 할 수 있습니다.

이를 수행하는 방법에 대한 문서는 [바이너리로 설치](http://eprosima-fast-rtps.readthedocs.io/en/latest/binaries.html#installation-from-binaries)(*eProsima Fast RTPS 공식 문서*)에서 찾을 수 있습니다


### Windows 7 32-bit and 64-bit

설치 관리자를 실행하고 지침에 따라 원하는 *Visual Studio* 버전 및 아키텍처를 선택하십시오.

#### Environmental Variables

*eProsima Fast RTPS*는 제대로 작동하려면 다음 환경 변수 설정이 필요합니다.

* [Mac에서의 개발 환경](../setup/dev_env_mac.md) (Fast RTPS는 공통 도구에 포함되어 있음.)
* [리눅스에서의 개발 환경](../setup/dev_env_linux.md) (Fast RTPS는 설치 스크립트에 포함되어 있음)
* [Windows > Windows의 Bash에서의 개발 환경](/setup/dev_env_windows.md#bash-on-windows-new) (Fast RTPS는 설치 스크립트에 포함되어 있음.)

이러한 변수는 설치 과정에서 해당 상자를 체크하여 자동으로 설정됩니다.


### Linux

패키지의 내용을 추출하십시오. *eProsima Fast RTPS*와 필요한 패키지 *eProsima Fast CDR*을 모두 포함합니다. *Fast CDR*부터 두 패키지 모두 동일한 절차를 따라야합니다.

컴파일을 구성합니다.

```sh
$ ./configure --libdir=/usr/lib
```

디버그 기호로 컴파일하려면 다음과 같이하십시오(verbose mode도 활성화됨).

```sh
$ ./configure CXXFLAGS="-g -D__DEBUG"  --libdir=/usr/lib
```

프로젝트를 구성한 후 라이브러리를 컴파일하고 설치하십시오.

```sh
$ sudo make install
```

#### Environmental Variables

* `FASTRTPSHOME`: *eProsima Fast RTPS*가 설치된 루트 폴더. If the user sets a different install directory in the `gradle install` step, it must set it here as well.
