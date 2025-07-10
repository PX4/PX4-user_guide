---
canonicalUrl: https://docs.px4.io/main/zh/dev_setup/fast-rtps-installation
---

# FastRTPS 安装

<img alt="logo" src="../../assets/fastrtps/eprosima_logo.png" style="float:left;" /> [eProsima Fast RTPS](http://eprosima-fast-rtps.readthedocs.io/en/latest/) 是 RTPS（实时发布订阅者）协议的 C++ 实现，它在不可靠的传输（如 UDP）上提供发布者-订阅者通信，由对象管理组（OMG）定义和维护社区。 RTPS 也是为数据分发服务（DDS）标准定义的有线互操作性协议，也是由 OMG 定义的。

PX4 使用 FastRTPS，使 RTPS 接口能够与板外组件（包括机器人和模拟器工具）共享 PX4 uORB 主题。 RTPS 是 DDS 的基本协议，是 OMG（对象管理组）提供实时发布/订阅中间件的标准，广泛应用于航空航天、国防和物联网应用。 它也被用作 ROS2 机器人工具包的中间件。 有关详细信息，请参阅：[RTPS/ROS2 接口：PX4-FastRTPS Bridge](../middleware/micrortps.md)。

:::tip
For Ubuntu, at time of writing, you will need to install Fast-RTPS 1.8.2 *from source*.
:::

:::note
This topic is derived from the official [*eProsima Fast RTPS* documentation](http://eprosima-fast-rtps.readthedocs.io/en/latest/).

For more information see:
- 源码安装
  - [Linux](https://fast-dds.docs.eprosima.com/en/latest/installation/sources/sources_linux.html)
  - [Windows](https://fast-dds.docs.eprosima.com/en/latest/installation/sources/sources_windows.html)
- 二进制安装
  - [Linux](https://fast-dds.docs.eprosima.com/en/latest/installation/binaries/binaries_linux.html)
  - [Windows](https://fast-dds.docs.eprosima.com/en/latest/installation/binaries/binaries_windows.html)
:::

## 标准安装

在 Github 上下载项目：


### 依赖

#### Java

Java is required to use our built-in code generation tool - *fastrtpsgen*. [Java JDK 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) is recommended.

### Windows 7 32位和64位

#### Visual C++ 2013 or 2015 Redistributable Package

这会将 FastRTPS 安装在 `/usr/local`。 您可以使用 `-DCMAKE_INSTALL_PREFIX=<path>` 定义自己的安装路径。



## 要求

### Windows 7 32位和64位

如果您在 Linux 上，请执行：

```sh
$ git clone https://github.com/eProsima/Fast-RTPS
$ mkdir Fast-RTPS/build && cd Fast-RTPS/build
```

:::note
You may need to [install Gradle](https://gradle.org/install/) to build the source (e.g. this is true on vanilla Fedora Linux). A build warning will be displayed if this is the case.
:::

如果你是在 Windows，选择 *Visual Studio* 的版本：

```sh
$ cmake -DTHIRDPARTY=ON -DSECURITY=ON ..
$ cmake -DTHIRDPARTY=ON -DBUILD_JAVA=ON ..
$ make
$ sudo make install
```

This will install Fast RTPS to `/usr/local`, with secure communications support. 然后确保 `fastrtpsgen` 已经在你的 `PATH`。

如果你想编译性能测试程序，那么请在调用 *CMake* 时，添加参数 `-DPERFORMANCE_TESTS=ON`。

```sh
> cmake -G "Visual Studio 14 2015 Win64" -DTHIRDPARTY=ON -DBUILD_JAVA=ON ..
> cmake --build . --target install
> cmake --build . --target install
```

#### 环境变量

你可以从 [官网](http://www.eprosima.com/) 下载最新发布的 *eProsima Fast RTPS* 的可执行文件。

操作文档请参见： [二进制安装](http://eprosima-fast-rtps.readthedocs.io/en/latest/binaries.html#installation-from-binaries)（*eProsima Fast RTPS* 官方文档）

### Fast-RTPS-Gen

*Fast-RTPS-Gen* is the Fast RTPS IDL code generator tool. It should be installed after Fast RTPS and made sure the `fastrtpsgen` application is in your `PATH`. You can check with `which fastrtpsgen`.

*eProsima Fast RTPS* 功能配置完善，需要如下的环境变量配置生效。
```
git clone --recursive https://github.com/eProsima/Fast-RTPS-Gen.git -b v1.0.4 ~/Fast-RTPS-Gen \
    && cd ~/Fast-RTPS-Gen \
    && ./gradlew assemble \
    && sudo ./gradlew install
```

## 源码安装

:::note
Although the binaries are available, we recommend to build and install the code from source, given that the binaries may not come with required components and dependencies in place.
:::

You can always download the latest binary release of *eProsima Fast RTPS* from the [company website](http://www.eprosima.com/).

配置编译：


### Windows 7 32位和64位

如果要使用调试符号进行编译（这也启用了verbose模式）：

#### 环境变量

配置项目后，编译并安装库：

* *eProsima Fast RTPS* 需要以下软件包才能正常工作。
* `FASTRTPSGEN_DIR`: Root folder where *eProsima FastRTPSGen* is installed.
* 添加到 `PATH`：所选 Visual Studio 版本的 **/bin** 文件夹和子文件夹应追加到 PATH 中。

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

#### 环境变量

* `FASTRTPSGEN_DIR`: Root folder where *eProsima FastRTPSGen* is installed, usually set to `/usr/local`, which is the default installation directory. If the user sets a different install directory in the `gradle install` step, it must set it here as well.
