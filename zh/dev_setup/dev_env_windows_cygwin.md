---
canonicalUrl: https://docs.px4.io/main/zh/dev_setup/dev_env_windows_cygwin
---

# Windows Cygwin 工具链

该工具链非常轻便，而且容易安装和使用。 它是目前Windows环境下用于PX4开发的最新和最好的工具。
* 编译/上传 PX4到Nuttx目标(Pixhawk系列飞控)
* [jMAVSim Simulation](../simulation/jmavsim.md)

:::tip
This setup is supported by the PX4 dev team. To build other targets you will need to use a [different OS](../dev_setup/dev_env.md#supported-targets) (or an [unsupported windows development environment](../advanced/dev_env_unsupported.md)).
:::

<a id="installation"></a>

## 安装说明

1. 从 [Github](https://github.com/PX4/windows-toolchain/releases) 或者 [S3](https://s3-us-west-2.amazonaws.com/px4-tools/PX4+Windows+Cygwin+Toolchain/PX4+Windows+Cygwin+Toolchain+0.5.msi) 下载最新的MSI安装文件。
1. 运行它，选择你需要的安装路径，执行安装 ![jMAVSimOnWindows](../../assets/toolchain/cygwin_toolchain_installer.png)
1. Tick the box at the end of the installation to *clone the PX4 repository, build and run simulation with jMAVSim* (this simplifies the process to get you started). :::note If you missed this step you will need to [clone the PX4-Autopilot repository manually](#getting_started).
:::

<a id="getting_started"></a>

## 入门指南

这篇文章将解释怎样下载和使用该环境，并且在需要的时候怎样扩展和更新(比如，使用其他的编译器)。

1. 进入到工具链的安装目录(默认**C:\PX4**)
1. 运行**run-console.bat**(双击)启动Cygwin bash控制台
1. 在控制台中运行克隆PX4 Firmware仓库命令

:::note
Skip this step if you ticked the installer option to *clone the PX4 repository, build and run simulation with jMAVSim*. Cloning only needs to be done once!
:::

   ```bash
   # Clone the PX4-Autopilot repository into the home folder & loads submodules in parallel
   git clone --recursive -j8 https://github.com/PX4/PX4-Autopilot.git
   ```

   You can now use the console/PX4-Autopilot repository to build PX4.

1. 举例，要运行JMAVSim:
   ```bash
   # 进入Firmware仓库目录
    cd Firmware 
    # 使用JMAVSim编译并运行SITL模拟器来验证 
    make px4_sitl jmavsim
   ```
   控制台将会显示：

   ![jMAVSimOnWindows](../../assets/simulation/jmavsim_windows_cygwin.png)


## 使用说明

编写或复制 ** 批处理脚本 ** [`run-console.bat`](https://github.com/MaEtUgR/PX4Toolchain/blob/master/run-console.bat) 和 [`setup-environment-variables.bat`](https://github.com/MaEtUgR/PX4Toolchain/blob/master/toolchain/setup-environment-variables.bat)。

- 使用 jMAVSim 编译和运行 SITL, 其性能明显优于虚拟机 (Cygwin会生成一个本机 windows 二进制文件 ** px4.exe **)。
- 编译和上传 NuttX 二进制文件（例如：px4_fmu-v2 和 px4_fmu-v4）。

<a id="usage_instructions"></a>

## 附加信息

### Windows & Git 特殊情况

工具链使用专门配置的控制台(通过运行**run-console.bat**脚本)从而可以使用PX4编译命令

下面[ 有关如何生成 PX4 的详细说明 ](../setup/building_px4.md) (或参阅下面的部分以了解更多常规用法说明)。

### Windows & Git 特殊情况

#### Windows CR+LF 对比 Unix LF 行结尾

We recommend that you force Unix style LF endings for every repository you're working with using this toolchain (and use an editor which preserves them when saving your changes - e.g. Eclipse or VS Code). Compilation of source files also works with CR+LF endings checked out locally, but there are cases in Cygwin (e.g. execution of shell scripts) that require Unix line endings (otherwise you get errors like `$'\r': Command not found.`). Luckily git can do this for you when you execute the two commands in the root directory of your repo:
```
git config core.autocrlf false
git config core.eol lf
```

If you work with this toolchain on multiple repositories you can also set these two configurations globally for your machine:
```
git config --global ...
```
This is not recommended because it may affect any other (unrelated) git use on your Windows machine.

#### Unix 执行权限

Under Unix there's a flag in the permissions of each file that tells the OS whether or not the file is allowed to be executed. *git* under Cygwin supports and cares about that bit (even though the Windows NTFS file system does not use it). This often results in *git* finding "false-positive" differences in permissions. The resulting diff might look like this:
```
diff --git ...
old mode 100644
new mode 100755
old mode 100644
new mode 100755
```

但我们并不建议这样做, 因为它可能会影响 Windows 计算机上的任何其他 (无关) git 使用。
```sh
git config --global core.fileMode false # disable execution bit check globally for the machine 
```

For existing repositories that have this problem caused by a local configuration, additionally:
```sh
git config --unset core.filemode # 移除当前存储库的局部配置，改用全局配置
git submodule foreach --recursive git config --unset core.filemode # 移除所有子模块的局部配置 
```




<!--
Instructions for building/updating this toolchain are covered in [Windows Cygwin Development Environment (Maintenance Instructions)](../advanced/windows_cygwin_toolchain_setup.md)
-->