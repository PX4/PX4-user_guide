---
canonicalUrl: https://docs.px4.io/main/ko/advanced/windows_cygwin_toolchain_setup
---

# 윈도우즈 환경의 Cygwin 개발 환경 설정 (유지 보수 지침)

이 주제는 어떤 방식으로 [Cygwin 기반의 윈도우 개발 환경](../dev_setup/dev_env_windows_cygwin.md)을 구성하고 확장하는 방법을 설명해주는 글입니다.


## 추가 정보

<a id="features"></a>

### 기능 / 문제

다음과 같은 기능은 다음과 같은 버전에서 확실히 작동합니다. (Version 2.0):

* SITL과 jMAVSim의 빌드 및 실행은 가상 머신에서의 동작보다 월등합니다. (이것은 윈도우 자체 바이너리를 만듭니다.  **px4.exe**).
* NuttX 빌드 및 업로드 (예:  px4_fmu-v2 and px4_fmu-v4)
* *astyle*을 이용한 코드 검사(명령어: `make format`)
* 명령행 자동 완성
* 비침투적 설치 도구 해당 설치 프로그램은 사용자의 시스템과 전역 경로 설정에 어떤 영향도 주지 않습니다 (C:\PX4\와 같은 선택한 설치 디렉터리만 수정하며 임시 로컬 경로를 사용합니다).
* 설치 마법사에서는 툴체인 폴더의 개별 설정을 유지하면서 새 버전으로 업데이트할 수 있습니다.

미지원:
* Simulation: Gazebo and ROS are not supported.
* Only NuttX and JMAVSim/SITL builds are supported.
* [Known problems](https://github.com/orgs/PX4/projects/6) (Also use to report issues).

<a id="script_setup"></a>

### Shell Script Installation

You can also install the environment using shell scripts in the Github project.

1. Make sure you have [Git for Windows](https://git-scm.com/download/win) installed.
1. Clone the repository https://github.com/PX4/windows-toolchain to the location you want to install the toolchain. Default location and naming is achieved by opening the `Git Bash` and executing:
```
cd /c/
git clone https://github.com/PX4/windows-toolchain PX4
```
1. If you want to install all components navigate to the freshly cloned folder and double click on the script `install-all-components.bat` located in the folder `toolchain`. If you only need certain components and want to safe Internet traffic and or disk space you can navigate to the different component folders like e.g. `toolchain\cygwin64` and click on the **install-XXX.bat** scripts to only fetch something specific.
1. Continue with [Getting Started](../dev_setup/dev_env_windows_cygwin.md#getting-started).


<a id="manual_setup"></a>

### Manual Installation (for Toolchain Developers)

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
