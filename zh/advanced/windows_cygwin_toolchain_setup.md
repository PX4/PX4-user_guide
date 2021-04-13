# Windows Cygwin 开发环境 (维护说明)

本主题解释了如何构建和扩展支持的 [基于Cygwin的Windows开发环境](../dev_setup/dev_env_windows_cygwin.md) 的开发环境。


## 附加信息

<a id="features"></a>

### 特性/问题

以下已知正常功能 (版本 2.0):

* 使用 jMAVSim 编译和运行 SITL，其性能明显优于虚拟机 (它生成一个原生windows 二进制 ** px4.exe **)。
* 编译和上传 NuttX 二进制文件（例如：px4_fmu-v2 和 px4_fmu-v4）
* 使用 *astyle* 进行格式检查 (支持命令: `make format`)
* 命令行自动补全
* 绿色安装 安装程序不会影响您的系统和全局路径设置 (它只修改选定的安装目录, 例如 ** C:\PX4 \ ** 并使用临时本地路径变量)。
* 安装程序支持更新到最新版本，同时保持您的个人更改在工具链文件夹中。

补充：
* 仿真模拟：暂不支持 Gazebo 和 ROS。
* 仅支持 NuttX 和 JMAVSim/SITL 构建。
* [已知问题](https://github.com/orgs/PX4/projects/6) (也用来报告问题)。

<a id="script_setup"></a>

### Shell 脚本安装

你还可以使用 Github 项目中的 shell 脚本进行开发环境的安装。

1. 确保您安装了 [Windows 版本的 Git](https://git-scm.com/download/win)。
1. 将代码仓库 https://github.com/PX4/windows-toolchain 克隆到要安装工具链的位置。 打开 `Git Bash` 并执行以下操作，打开后会自动进入默认的安装目录：
```
cd /c/
git clone https://github.com/PX4/windows-toolchain PX4
```
1. 如果要安装所有组件，请进入到新克隆的代码仓库文件夹， 然后双击位于文件夹 `toolchain`目录中的脚本 ` install-all-components.bat`。 If you only need certain components and want to safe Internet traffic and or disk space you can navigate to the different component folders like e.g. `toolchain\cygwin64` and click on the **install-XXX.bat** scripts to only fetch something specific.
1. Continue with [Getting Started](#getting_started) (or [Usage Instructions](#usage_instructions))


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

   * **Category:Packagename**
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
