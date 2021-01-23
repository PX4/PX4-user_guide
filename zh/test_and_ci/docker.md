# PX4 Docker 容器

Docker 容器被提供用于完整的 [PX4 开发工具链](../setup/dev_env.md#supported-targets)，包括基于 NuttX 和 Linux 的硬件，[Gazebo Simulation](../simulation/gazebo.md) 和 [ROS](../simulation/ros_interface.md)。

本主题说明如何使用 [available docker containers](#px4_containers) 访问本地 Linux 计算机中的构建环境。

为您的 Linux 计算机 [Install Docker](https://docs.docker.com/installation/)，最好使用 Docker 维护的一个软件包存储库来获取最新的稳定版本。 您可以使用 *Enterprise Edition* 或（free）*Community Edition*。
:::

## 系统必备组件

:::note PX4 containers are currently only supported on Linux (if you don't have Linux you can run the container [inside a virtual machine](#virtual_machine)). Do not use `boot2docker` with the default Linux image because it contains no X-Server.
:::

默认安装要求您以 root 用户身份调用 * Docker*（即使用`sudo`）。 如果您希望 [use Docker as a non-root user](https://docs.docker.com/engine/installation/linux/linux-postinstall/#manage-docker-as-a-non-root-user)，您可以选择将用户添加到“docker”组，然后注销或者登陆：

下面列出了可用的本地编辑（来自 [Github](https://github.com/PX4/containers/blob/master/docker/px4-dev/README.md#container-hierarchy)）：

```sh
curl -fsSL get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

可以使用 `latest` 标记访问最新版本：`px4io/px4-dev-ros:latest`（为 *hub.docker.com* 上的每个容器列出可用标记。 例如，*px4-dev-ros* 标签可以在 [here](https://hub.docker.com/r/px4io/px4-dev-ros/tags/)）。 That way, your build folder won't be owned by root after using docker.

```sh
＃创建 docker 组（可能不是必需的）
sudo groupadd docker
＃将您的用户添加到 docker 组。
sudo usermod -aG docker $ USER
＃在使用 docker 之前再次登录/注销！
```

<a id="px4_containers"></a>

## 本地编辑层次结构

The available containers are listed below (from [Github](https://github.com/PX4/containers/blob/master/README.md#container-hierarchy)):

| 容器                              | 描述                             |
| ------------------------------- | ------------------------------ |
| px4-dev-base                    | 所有本地共有的基本设置                    |
| &emsp;px4-dev-nuttx             | NuttX 工具链                      |
| &emsp;px4-dev-simulation        | NuttX 工具链 + 仿真（jMAVSim，Gazebo） |
| &emsp;&emsp;px4-dev-ros         | NuttX 工具链，仿真 + ROS（包括 MAVROS）  |
| &emsp;px4-dev-raspi             | 树莓派工具链                         |
| &emsp;px4-dev-snapdragon        | 高通 Snapdragon Flight 工具链       |
| &emsp;px4-dev-clang             | C 语言工具                         |
| &emsp;&emsp;px4-dev-nuttx-clang | C 语言与 NuttX 工具                 |


使用容器的最简单方法是通过 [docker_run.sh](https://github.com/PX4/Firmware/blob/master/Tools/docker_run.sh) 帮助程序脚本。 此脚本将 PX4 构建命令作为参数（例如 `make tests`）。

:::tip
Typically you should use a recent container, but not necessarily the latest (as this changes too often).
:::

## 使用 Docker 容器

The following instructions show how to build PX4 source code on the host computer using a toolchain running in a docker container. The information assumes that you have already downloaded the PX4 source code to **src/PX4-Autopilot**, as shown:

```sh
mkdir src
cd src
git clone https://github.com/PX4/Firmware.git
cd Firmware
```

### 助手脚本（docker_run.sh）

典型命令的语法如下所示。 这将运行一个支持 X 指令的 Docker 容器（使容器内部的模拟 GUI 可用）。 它将目录 `&lt;host_src&gt;`from your computer to`&lt;container_src&gt;` 容器内，并转发连接 *QGroundControl* 所需的 UDP 端口。

位置：

```sh
sudo ./Tools/docker_run.sh 'make px4_sitl_default'
```
下面的具体示例显示了如何打开 bash shell 并在主机上共享目录 **〜/src/Firmware**。
```
sudo ./Tools/docker_run.sh 'bash'
```

如果一切顺利，你现在应该在一个新的 bash shell 中。 通过运行验证一切是否正常，例如，SITL： The manual approach discussed in the [section below](#manual_start) is more flexible and should be used if you have any problems with the script.
:::

<a id="manual_start"></a>

### 手动调用 Docker

`docker run` 命令只能用于创建新容器。 要重新进入此容器（将保留您的更改），只需执行以下操作： It maps the directory `<host_src>` from your computer to `<container_src>` inside the container and forwards the UDP port needed to connect *QGroundControl*. With the `-–privileged` option it will automatically have access to the devices on your host (e.g. a joystick and GPU). If you connect/disconnect a device you have to restart the container.

```sh
# enable access to xhost from the container
xhost +

# Run docker
docker run -it --privileged \
    --env=LOCAL_USER_ID="$(id -u)" \
    -v &lt;host_src&gt;:&lt;container_src&gt;:rw \
    -v /tmp/.X11-unix:/tmp/.X11-unix:ro \
    -e DISPLAY=:0 \
    -p 14556:14556/udp \
    --name=&lt;local_container_name&gt; &lt;container&gt;:&lt;tag&gt; &lt;build_command&gt;
```
如果需要连接到容器的多个 shell，只需打开一个新 shell 并再次执行最后一个命令。
* `&lt;host_src&gt;`：要映射到容器中的 `&lt;container_src&gt;` 的主计算机目录。 这通常应该是 **Firmware** 目录。
* `&lt;container_src&gt;`：容器内的共享（源）目录的位置。
* `docker run` 命令只能用于创建新容器。 要重新进入此容器（将保留您的更改），只需执行以下操作：
* `&lt;container&gt;：&lt;tag&gt;`：具有版本标签的容器 - 例如：`px4io/px4-dev-ros：2017-10-23`。
* `&lt;build_command&gt;`：要在新容器上调用的命令。 例如 例如. `bash` 用于打开容器中的 bash shell。

The concrete example below shows how to open a bash shell and share the directory **~/src/PX4-Autopilot** on the host computer.
```sh
# enable access to xhost from the container
xhost +

# Run docker and open bash shell
sudo docker run -it --privileged \
--env=LOCAL_USER_ID="$(id -u)" \
-v ~/src/Firmware:/src/firmware/:rw \
-v /tmp/.X11-unix:/tmp/.X11-unix:ro \
-e DISPLAY=:0 \
-p 14556:14556/udp \
--name=mycontainer px4io/px4-dev-ros:2017-10-23 bash
```

If everything went well you should be in a new bash shell now. Verify if everything works by running, for example, SITL:

```sh
cd src/firmware    #This is &lt;container_src&gt;
make px4_sitl_default gazebo
```


### 重新进入容器

运行模拟实例时，例如在 docker 容器内的 SITL 并通过 *QGroundControl* 从主机控制它，必须手动设置通信链接。 *QGroundControl* 的自动连接功能在此处不起作用。

```sh
# start the container
sudo docker start container_name
# open a new bash shell in this container
sudo docker exec -it container_name bash
```

If you need multiple shells connected to the container, just open a new shell and execute that last command again.

### 清理容器

容器根据需要使用默认用户创建文件-通常为“root”。 这可能导致权限错误，其中主机上的用户无法访问容器创建的文件。
```sh
$ sudo docker rm mycontainer
```
If you can't remember the name, then you can list inactive container ids and then delete them, as shown below:
```sh
$ sudo docker ps -a -q
45eeb98f1dd9
$ sudo docker rm 45eeb98f1dd9
```

### QGroundControl

When running a simulation instance e.g. SITL inside the docker container and controlling it via *QGroundControl* from the host, the communication link has to be set up manually. The autoconnect feature of *QGroundControl* does not work here.

在这种情况下，必须安装主机系统的本机图形驱动程序。 下载正确的驱动程序并将其安装在容器中。 对于 Nvidia 驱动程序，应使用以下命令（否则安装程序将从主机中看到已加载的模块并拒绝继续）： The IP address is the one of your docker container, usually 172.17.0.1/16 when using the default network. The IP address of the docker container can be found with the following command (assuming the container name is `mycontainer`):

```sh
<code>&lt;local_container_name&gt;</code>：正在创建的 docker 容器的名称 如果我们需要再次引用容器，以后可以使用它。
```
：正在创建的 docker 容器的名称 如果我们需要再次引用容器，以后可以使用它。
</code>

:::note
Spaces between double curly braces above should be not be present (they are needed to avoid a UI rendering problem in gitbook).
:::

### 故障处理

#### 权限错误

The container creates files as needed with a default user - typically "root". This can lead to permission errors where the user on the host computer is not able to access files created by the container.

The example above uses the line `--env=LOCAL_USER_ID="$(id -u)"` to create a user in the container with the same UID as the user on the host. This ensures that all files created within the container will be accessible on the host.


#### 图形驱动问题

It's possible that running Gazebo will result in a similar error message like the following:

```sh
libGL error: failed to load driver: swrast
```

In that case the native graphics driver for your host system must be installed. Download the right driver and install it inside the container. For Nvidia drivers the following command should be used (otherwise the installer will see the loaded modules from the host and refuse to proceed):

```sh
./NVIDIA-DRIVER.run -a -N --ui=none --no-kernel-module
```

More information on this can be found [here](http://gernotklingler.com/blog/howto-get-hardware-accelerated-opengl-support-docker/).

<a id="virtual_machine"></a>

## 虚拟机支持

如果编译失败，则出现以下错误：

尝试禁用并行构建。

  * OS X 与 VMWare Fusion 和 Ubuntu 14.04（Parallels 上支持 GUI 的 Docker 容器使 X-Server 崩溃）。

**允许从 VM 主机控制 Docker**

编辑 `/etc/defaults/docker` 并添加以下行：

**Compilation problems**

If compilation fails with errors like this:

```sh
这个错误是不可复现的，可能是硬件或操作系统问题。
The bug is not reproducible, so it is likely a hardware or OS problem.
c++: internal compiler error: Killed (program cc1plus)
```

Try disabling parallel builds.

**Allow Docker Control from the VM Host**

Edit `/etc/defaults/docker` and add this line:

```sh
DOCKER_OPTS="${DOCKER_OPTS} -H unix:///var/run/docker.sock -H 0.0.0.0:2375"
```

You can then control docker from your host OS:

```sh
export DOCKER_HOST=tcp://&lt;ip of your VM&gt;:2375
# run some docker command to see if it works, e.g. ps
docker ps
```

