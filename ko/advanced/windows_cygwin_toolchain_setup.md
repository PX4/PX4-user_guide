---
canonicalUrl: https://docs.px4.io/main/ko/advanced/windows_cygwin_toolchain_setup
---

# Windows Cygwin 개발 환경(유지 보수 지침)

This topic explains how to construct and extend the development environment used for the no-longer-supported [Cygwin-based Windows Development Environment](../dev_setup/dev_env_windows_cygwin.md).

## 추가 정보

<a id="features"></a>

### 기능 / 이슈

다음 기능이 (버전 2.0)에서 작동하는 것으로 알려져 있습니다.

- 가상머신보다 훨씬 더 나은 성능으로 jMAVSim을 사용하여 SITL을 빌드하고 실행합니다(기본 Windows 바이너리 **px4.exe** 생성).
- NuttX 빌드 및 업로드 (예:  px4_fmu-v2 and px4_fmu-v4)
- Style check with _astyle_ (supports the command: `make format`)
- 명령행 자동 완성
- 비침투적 설치 도구 The installer does NOT affect your system and global path (it only modifies the selected installation directory e.g. \*\*C:\PX4\*\* and uses a temporary local path).
- 설치 마법사에서는 툴체인 폴더의 개별 설정을 유지하면서 새 버전으로 업데이트할 수 있습니다.

미지원:

- 시뮬레이션: Gazebo와 ROS는 지원되지 않습니다.
- NuttX와 JMAVSim/SITL 빌드만 지원됩니다.
- [알려진 문제](https://github.com/orgs/PX4/projects/6) (또한 보고할 문제).

<a id="script_setup"></a>

### 셸 스크립트 설치

Github 프로젝트에서 셸 스크립트를 사용하여 환경을 설치할 수 있습니다.

1. [Windows용 Git](https://git-scm.com/download/win)이 설치 여부를 체크합니다.
1. 도구 체인을 설치하려는 위치에 https://github.com/PX4/windows-toolchain 저장소를 복제합니다. 기본 위치와 이름은 `Git Bash`를 열고, 다음을 실행하여 지정합니다.

```
cd /c/
git clone https://github.com/PX4/windows-toolchain PX4
```

1. 모든 구성 요소를 설치하려면, 새로 복제된 폴더로 이동하여 `toolchain` 폴더에 있는 `install-all-components.bat` 스크립트를 두 번 클릭합니다. 특정 구성 요소만 필요하고 인터넷 트래픽 및/또는 디스크 공간을 보호하려면, 예를 들어 다음과 같은 다른 구성 요소 폴더로 이동할 수 있습니다. `toolchain\cygwin64` 및 **install-XXX.bat** 스크립트를 클릭하여 특정 항목만 가져옵니다.
1. [시작하기](../dev_setup/dev_env_windows_cygwin.md#getting-started)를 계속합니다.

<a id="manual_setup"></a>

### 수동 설치 (툴체인 개발자용)

이 섹션에서는 스크립트 기반 설치 저장소에서  해당 스크립트를 사용하여 수동으로 Cygwin 도구 체인을 설정하는 방법을 설명합니다. 결과는 스크립트를 활용하는 방법이나 MSI 설치 관리자를 활용하는 방법이나 동일합니다.

:::note
툴체인은 유지 관리되므로, 이 지침은 향후 모든 변경 사항의 모든 세부 사항을 다루지 않습니다.
:::

1. Create the _folders_: **C:\PX4\*\*, **C:\PX4\toolchain\*\* and \*\*C:\PX4\home\*\*
1. Download the _Cygwin installer_ file [setup-x86_64.exe](https://cygwin.com/setup-x86_64.exe) from the [official Cygwin website](https://cygwin.com/install.html)
1. 다운로드한 설치 파일을 실행합니다.
1. In the wizard choose to install into the folder: \*\*C:\PX4\toolchain\cygwin64\*\*
1. 기본 Cygwin 기반과 다음 추가 패키지의 사용 가능한 최신 버전을 설치하려면 선택합니다.

   - **범주:패키지 이름 **
   - Devel:cmake (3.3.2 gives no deprecated warnings, 3.6.2 works but has the warnings)
   - Devel:gcc-g++
   - Devel:gdb
   - Devel:git
   - Devel:make
   - Devel:ninja
   - Devel:patch
   - Editors:xxd
   - Editors:nano (vim을 사용하지 않는 경우)
   - Python:python2
   - Python:python2-pip
   - Python:python2-numpy
   - Python:python2-jinja2
   - Python:python2-pyyaml
   - Python:python2-cerberus
   - Archive:unzip
   - Utils:astyle
   - Shells:bash-completion
   - Web:wget

   :::note
이 목록에 없는 패키지를 가능한 선택하지 마십시오. 일부 패키지는 충돌하고 빌드를 손상시킵니다.
:::

:::note
이것이 [cygwin64/install-cygwin-px4.bat](https://github.com/MaEtUgR/PX4Toolchain/blob/master/toolchain/cygwin64/install-cygwin-px4.bat)가 하는 일입니다.
:::

1. **배치 스크립트** [`run-console.bat`](https://github.com/MaEtUgR/PX4Toolchain/blob/master/run-console.bat)와 [`setup-environment.bat`](https://github.com/PX4/windows-toolchain/blob/master/toolchain/scripts/setup-environment.bat)를 작성하거나 복사합니다.

   준비된 배치 스크립트를 통하여 모든 개발 도구를 시작하는 이유는 도구 체인의 폴더 내에서 로컬 이식 가능한 Cygwin 환경을 사용하도록 시작 프로그램을 미리 설정하기 때문입니다. 이것은 항상 먼저 스크립트 [**setup-environment.bat**](https://github.com/PX4/windows-toolchain/blob/master/toolchain/scripts/setup-environment.bat)를 호출하고, 그 후에 콘솔과 같은 원하는 애플리케이션을 호출하여 수행됩니다.

   [setup-environment.bat](https://github.com/PX4/windows-toolchain/blob/master/toolchain/scripts/setup-environment.bat) 스크립트는 작업 환경 루트 디렉터리의 환경 변수 `PX4_DIR`, 전체 바이너리 경로 `PATH`, 유닉스 환경의 계정 루트 디렉터리 `HOME`을 설정합니다.

1. Cygwin 도구 모음 콘솔을 열고(**run-console.bat** 두 번 클릭) 다음을 실행하여 필요한 **python 패키지**를 설정에 추가합니다.

   ```
   pip2 install toml
   pip2 install pyserial
   pip2 install pyulog
   ```

:::note
이것이 [cygwin64/install-cygwin-python-packages.bat](https://github.com/MaEtUgR/PX4Toolchain/blob/master/toolchain/cygwin64/install-cygwin-python-packages.bat)가 하는 일입니다.
:::

1. [**ARM GCC 컴파일러**](https://developer.arm.com/open-source/gnu-toolchain/gnu-rm/downloads)를 Windows용 바이너리의 zip 아카이브로 다운로드하고, `C:\PX4\toolchain\gcc-arm` 폴더에 압축을 해제합니다.

:::note
도구 모음이 [gcc-arm/install-gcc-arm.bat](https://github.com/MaEtUgR/PX4Toolchain/blob/master/toolchain/gcc-arm/install-gcc-arm.bat)에서 수행하는 작업입니다.
:::

1. JDK를 설치합니다.

   - [Oracle](https://www.oracle.com/java/technologies/javase-jdk14-downloads.html) 또는 [AdoptOpenJDK](https://adoptopenjdk.net/)에서 Java 14를 다운로드합니다.
   - 애석하게도, 바이너리를 포함하는 파일이 없기 때문에 설치하여야 합니다.
   - 바이너리를 찾아 **C:\PX4\toolchain\jdk**로 이동/복사하십시오.
   - 윈도우 시스템에서 키트 설치를 제거할 수 있습니다. 툴체인에는 바이너리만 필요합니다.

:::note
이것이 툴체인이 [jdk/install-jdk.bat](https://github.com/MaEtUgR/PX4Toolchain/blob/master/toolchain/jdk/install-jdk.bat)에서 하는 일입니다.
:::

1. Windows용 바이너리의 zip 아카이브로 [**Apache Ant**](https://ant.apache.org/bindownload.cgi)를 다운로드하고, `C:\PX4\toolchain\apache-ant` 폴더에 압축을 해제합니다.

   :::tip
Make sure you don't have an additional folder layer from the folder which is inside the downloaded archive.
:::

:::note
This is what the toolchain does in: [apache-ant/install-apache-ant.bat](https://github.com/MaEtUgR/PX4Toolchain/blob/master/toolchain/apache-ant/install-apache-ant.bat).
:::

1. Download, build and add _genromfs_ to the path:

   - 다음을 사용하여 **C:\PX4\toolchain\genromfs\genromfs-src** 폴더에 소스 코드를 복제합니다.

     ```
     cd /c/toolchain/genromfs
     git clone https://github.com/chexum/genromfs.git genromfs-src
     ```

   - 다음 명령으로 컴파일합니다.
     ```
     cd genromfs-src
     make all
     ```

   ```

   * Copy the resulting binary **genromfs.exe** one folder level out to: **C:\PX4\toolchain\genromfs**

   :::note
   .
   :

   ```

1. 설치된 모든 구성요소의 모든 바이너리 폴더가 [**setup-environment.bat**](https://github.com/PX4/windows-toolchain/blob/master/toolchain/scripts/setup-environment.bat)에 의해 구성된 `PATH` 변수에 올바르게 나열되어 있는지 확인하십시오.
