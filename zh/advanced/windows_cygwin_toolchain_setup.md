---
canonicalUrl: https://docs.px4.io/main/zh/advanced/windows_cygwin_toolchain_setup
---

# Windows Cygwin 开发环境 (维护说明)

This topic explains how to construct and extend the development environment used for the no-longer-supported [Cygwin-based Windows Development Environment](../dev_setup/dev_env_windows_cygwin.md).

## 附加信息

<a id="features"></a>

### 特性/问题

以下已知正常功能 (版本 2.0):

- 使用 jMAVSim 编译和运行 SITL，其性能明显优于虚拟机 (它生成一个原生windows 二进制 ** px4.exe **)。
- 编译和上传 NuttX 二进制文件（例如：px4_fmu-v2 和 px4_fmu-v4）
- Style check with _astyle_ (supports the command: `make format`)
- 命令行自动补全
- 绿色安装 The installer does NOT affect your system and global path (it only modifies the selected installation directory e.g. \*\*C:\PX4\*\* and uses a temporary local path).
- 安装程序支持更新到最新版本，同时保持您的个人更改在工具链文件夹中。

补充：

- 仿真模拟：暂不支持 Gazebo 和 ROS。
- 仅支持 NuttX 和 JMAVSim/SITL 构建。
- [已知问题](https://github.com/orgs/PX4/projects/6) (也用来报告问题)。

<a id="script_setup"></a>

### Shell 脚本安装

你还可以使用 Github 项目中的 shell 脚本进行开发环境的安装。

1. 确保您安装了 [Windows 版本的 Git](https://git-scm.com/download/win)。
1. 将代码仓库 https://github.com/PX4/windows-toolchain 克隆到要安装工具链的位置。 打开 `Git Bash` 并执行以下操作，打开后会自动进入默认的安装目录：

```
cd /c/
git clone https://github.com/PX4/windows-toolchain PX4
```

1. 如果要安装所有组件，请进入到新克隆的代码仓库文件夹， 然后双击位于文件夹 `toolchain`目录中的脚本 ` install-all-components.bat`。 如果您只需要某些组件并希望占用有限的Internet 数据和磁盘空间，则可以进入到不同的组件文件夹，如 ` toolchain\cygwin64 `，然后单击 ** install-XXX.bat ** 脚本以获取特定的内容。
1. 继续 [ 入门指南 ](#getting_started) (或 [ 使用说明 ](#usage_instructions))

<a id="manual_setup"></a>

### 手动安装 (用于工具链开发者)

本节描述如何手动设置Cygwin工具链，同时指向基于脚本的安装仓库中对应的脚本。 结果应与使用脚本或 MSI 安装程序相同。

:::note
由于工具链的更新维护，这些指令可能无法涵盖未来更改的所有细节。
:::

1. Create the _folders_: **C:\PX4\*\*, **C:\PX4\toolchain\*\* and \*\*C:\PX4\home\*\*
1. Download the _Cygwin installer_ file [setup-x86_64.exe](https://cygwin.com/setup-x86_64.exe) from the [official Cygwin website](https://cygwin.com/install.html)
1. 运行下载的安装文件
1. In the wizard choose to install into the folder: \*\*C:\PX4\toolchain\cygwin64\*\*
1. 选择安装默认的 Cygwin 基础包和以下附加包的最新可用版本:

   - **类别:Packagename**
   - Devel:cmake (3.3.2 正常工作无告警, 3.6.2有告警但能够正常工作)
   - Devel:gcc-g++
   - Devel:gdb
   - Devel:git
   - Devel:make
   - Devel:ninja
   - Devel:patch
   - Editors:xxd
   - Editors:nano (除非你精通 vim)
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
不要选择尽可能多的不在这个列表上的软件包，有些软件包冲突和中断构建。
:::

:::note
这就是 [Cygwin64/install-cygwin-px4.bat](https://github.com/MaEtUgR/PX4Toolchain/blob/master/toolchain/cygwin64/install-cygwin-px4.bat) 批处理做的。
:::

1. 编写或复制 **批处理脚本** [`run-console.bat`](https://github.com/MaEtUgR/PX4Toolchain/blob/master/run-console.bat) 和 [`setup-environment.bat`](https://github.com/PX4/windows-toolchain/blob/master/toolchain/scripts/setup-environment.bat).

   使用预先准备好的批处理脚本启动开发环境的原因是，这些脚本预配置了程序使用工具链所在目录下的绿色版 Cygwin 环境变量。 通过始终先调用脚本[** setup-environment.bat **](https://github.com/PX4/windows-toolchain/blob/master/toolchain/scripts/setup-environment.bat)和像控制台这样所需的应用程序来完成此操作。

   脚本[setup-environment.bat](https://github.com/PX4/windows-toolchain/blob/master/toolchain/scripts/setup-environment.bat)用于设置工作区根目录 `PX4_DIR`的环境变量，和 unix 环境中的 `HOME`目录。

1. 通过打开并运行 Cywin 工具链控制台（双击**run-console.bat**）来添加必要的 **python packages**。

   ```
   pip2 install toml
   pip2 install pyserial
   pip2 install pyulog
   ```

:::note
这是脚本 [cygwin64/install-cygwin-python-packages.bat](https://github.com/MaEtUgR/PX4Toolchain/blob/master/toolchain/cygwin64/install-cygwin-python-packages.bat)做的操作。
:::

1. 下载 [**ARM GCC 编译器**](https://developer.arm.com/open-source/gnu-toolchain/gnu-rm/downloads) zip 二进制压缩包，并将内容解压缩到文件夹 `C:\PX4\toolchain\gcc-arm`。

:::note
这是在脚本[gcc-arm/install-gcc-arm.bat](https://github.com/MaEtUgR/PX4Toolchain/blob/master/toolchain/gcc-arm/install-gcc-arm.bat)中工具链做的操作。
:::

1. 安装 JDK

   - 从 [Oracle](https://www.oracle.com/java/technologies/javase-jdk14-downloads.html) 或 [AdoptOpenJDK](https://adoptopenjdk.net/) 下载 Java 14。
   - 不幸的是，没有包含二进制文件的便携存档，您必须直接安装它。
   - 找到二进制文件并将其移动/复制到 **C:\PX4\toolchain\jdk**
   - 您可以再次从 Windows 系统卸载工具包，我们只需要工具链中的二进制工具。

:::note
这是工具链在: [jdk/install-jdk.bat](https://github.com/MaEtUgR/PX4Toolchain/blob/master/toolchain/jdk/install-jdk.bat) 中所起的作用。
:::

1. 下载 Windows的二进制文件压缩包[**Apache Ant**](https://ant.apache.org/bindownload.cgi) ，并将内容解包到文件夹 `C:\PX4\toolchain\apache-ant`

   :::tip
Make sure you don't have an additional folder layer from the folder which is inside the downloaded archive.
:::

:::note
This is what the toolchain does in: [apache-ant/install-apache-ant.bat](https://github.com/MaEtUgR/PX4Toolchain/blob/master/toolchain/apache-ant/install-apache-ant.bat).
:::

1. Download, build and add _genromfs_ to the path:

   - 克隆源代码到文件夹 **C:\PX4\toolchain\genromfs\genromfs-src** 使用

     ```
     cd /c/toolchain/genromfs
     git clone https://github.com/chexum/genromfs.git genromfs-src
     ```

   - 编译:
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

1. 确保所有已安装组件的二进制文件夹都正确配置在 [**setup-environment.bat**](https://github.com/PX4/windows-toolchain/blob/master/toolchain/scripts/setup-environment.bat)配置的</code>PATH</0>环境变量中。
