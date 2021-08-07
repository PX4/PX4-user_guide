# Windows Cygwin 개발 환경(유지 보수 지침)

[Cygwin 기반 Windows 개발 환경](../dev_setup/dev_env_windows_cygwin.md)을 설정 방법을 설명합니다.


## 추가 정보

<a id="features"></a>

### 기능 / 이슈

다음 기능이 (버전 2.0)에서 작동하는 것으로 알려져 있습니다.

* 가상머신보다 훨씬 더 나은 성능으로 jMAVSim을 사용하여 SITL을 빌드하고 실행합니다(기본 Windows 바이너리 **px4.exe** 생성).
* NuttX 빌드 및 업로드 (예:  px4_fmu-v2 and px4_fmu-v4)
* *astyle*을 사용한 스타일 검사(`make format` 명령 지원)
* 명령행 자동 완성
* 비침투적 설치 도구 해당 설치 프로그램은 사용자의 시스템과 전역 경로 설정에 어떤 영향도 주지 않습니다 (C:\PX4\와 같은 선택한 설치 디렉터리만 수정하여 임시 로컬 경로를 사용합니다).
* 설치 마법사에서는 툴체인 폴더의 개별 설정을 유지하면서 새 버전으로 업데이트할 수 있습니다.

미지원:
* 시뮬레이션: Gazebo와 ROS는 지원되지 않습니다.
* NuttX와 JMAVSim/SITL 빌드만 지원됩니다.
* [알려진 문제](https://github.com/orgs/PX4/projects/6) (또한 보고할 문제).

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

This section describes how to setup the Cygwin toolchain manually yourself while pointing to the corresponding scripts from the script based installation repo. The result should be the same as using the scripts or MSI installer.

:::note
The toolchain gets maintained and hence these instructions might not cover every detail of all the future changes.
:::

1. Create the *folders*: **C:\PX4\**, **C:\PX4\toolchain\** and **C:\PX4\home\**
1. Download the *Cygwin installer* file [setup-x86_64.exe](https://cygwin.com/setup-x86_64.exe) from the [official Cygwin website](https://cygwin.com/install.html)
1. Run the downloaded setup file
1. In the wizard choose to install into the folder: **C:\PX4\toolchain\cygwin64\**
1. Select to install the default Cygwin base and the newest available version of the following additional packages:

   * **Category:Packagename **
   * Devel:cmake (3.3.2 gives no deprecated warnings, 3.6.2 works but has the warnings)
   * Devel:gcc-g++
   * Devel:gdb
   * Devel:git
   * Devel:make
   * Devel:ninja
   * Devel:patch
   * Editors:xxd
   * Editors:nano (unless you're the vim pro)
   * Python:python2
   * Python:python2-pip
   * Python:python2-numpy
   * Python:python2-jinja2
   * Python:python2-pyyaml
   * Python:python2-cerberus
   * Archive:unzip
   * Utils:astyle
   * Shells:bash-completion
   * Web:wget

:::note
Do not select as many packages as possible which are not on this list, there are some which conflict and break the builds.
:::

:::note
That's what [cygwin64/install-cygwin-px4.bat](https://github.com/MaEtUgR/PX4Toolchain/blob/master/toolchain/cygwin64/install-cygwin-px4.bat) does.
:::

1. Write up or copy the **batch scripts** [`run-console.bat`](https://github.com/MaEtUgR/PX4Toolchain/blob/master/run-console.bat) and [`setup-environment.bat`](https://github.com/PX4/windows-toolchain/blob/master/toolchain/scripts/setup-environment.bat).

   The reason to start all the development tools through the prepared batch script is they preconfigure the starting program to use the local, portable Cygwin environment inside the toolchain's folder. This is done by always first calling the script [**setup-environment.bat**](https://github.com/PX4/windows-toolchain/blob/master/toolchain/scripts/setup-environment.bat) and the desired application like the console after that.

   The script [setup-environment.bat](https://github.com/PX4/windows-toolchain/blob/master/toolchain/scripts/setup-environment.bat) locally sets environmental variables for the workspace root directory `PX4_DIR`, all binary locations `PATH`, and the home directory of the unix environment `HOME`.

1. Add necessary **python packages** to your setup by opening the Cygwin toolchain console (double clicking **run-console.bat**) and executing
   ```
   pip2 install toml
   pip2 install pyserial
   pip2 install pyulog
   ```

:::note
That's what [cygwin64/install-cygwin-python-packages.bat](https://github.com/MaEtUgR/PX4Toolchain/blob/master/toolchain/cygwin64/install-cygwin-python-packages.bat) does.
:::

1. Download the [**ARM GCC compiler**](https://developer.arm.com/open-source/gnu-toolchain/gnu-rm/downloads) as zip archive of the binaries for Windows and unpack the content to the folder `C:\PX4\toolchain\gcc-arm`.

:::note
This is what the toolchain does in: [gcc-arm/install-gcc-arm.bat](https://github.com/MaEtUgR/PX4Toolchain/blob/master/toolchain/gcc-arm/install-gcc-arm.bat).
:::

1. Install the JDK:
   * Download Java 14 from [Oracle](https://www.oracle.com/java/technologies/javase-jdk14-downloads.html) or [AdoptOpenJDK](https://adoptopenjdk.net/).
   * Because sadly there is no portable archive containing the binaries directly you have to install it.
   * Find the binaries and move/copy them to **C:\PX4\toolchain\jdk**.
   * You can uninstall the Kit from your Windows system again, we only needed the binaries for the toolchain.

:::note
This is what the toolchain does in: [jdk/install-jdk.bat](https://github.com/MaEtUgR/PX4Toolchain/blob/master/toolchain/jdk/install-jdk.bat).
:::

1. Download [**Apache Ant**](https://ant.apache.org/bindownload.cgi) as zip archive of the binaries for Windows and unpack the content to the folder `C:\PX4\toolchain\apache-ant`.

:::tip
Make sure you don't have an additional folder layer from the folder which is inside the downloaded archive.
:::

:::note
This is what the toolchain does in: [apache-ant/install-apache-ant.bat](https://github.com/MaEtUgR/PX4Toolchain/blob/master/toolchain/apache-ant/install-apache-ant.bat).
:::

1. Download, build and add *genromfs* to the path:
   * Clone the source code to the folder **C:\PX4\toolchain\genromfs\genromfs-src** with
     ```
     cd /c/toolchain/genromfs
     git clone https://github.com/chexum/genromfs.git genromfs-src
     ```

   * Compile it with:
     ```
     cd genromfs-src
     make all
    ```

    * Copy the resulting binary **genromfs.exe** one folder level out to: **C:\PX4\toolchain\genromfs**

:::note
This is what the toolchain does in: [genromfs/install-genromfs.bat](https://github.com/MaEtUgR/PX4Toolchain/blob/master/toolchain/genromfs/install-genromfs.bat).
:::

1. Make sure all the binary folders of all the installed components are correctly listed in the `PATH` variable configured by [**setup-environment.bat**](https://github.com/PX4/windows-toolchain/blob/master/toolchain/scripts/setup-environment.bat).
