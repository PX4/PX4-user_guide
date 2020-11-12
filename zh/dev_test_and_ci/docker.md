# PX4 Docker 容器

Docker 容器被提供用于完整的 [PX4 开发工具链](../setup/dev_env.md#supported-targets)，包括基于 NuttX 和 Linux 的硬件，[Gazebo Simulation](../simulation/gazebo.md) 和 [ROS](../simulation/ros_interface.md)。

本主题说明如何使用 [available docker containers](#px4_containers) 访问本地 Linux 计算机中的构建环境。

> **Note** Dockerfiles 和 README 可以在 [Github here](https://github.com/PX4/containers/tree/master/docker/px4-dev)。 它们是在 [Docker Hub](https://hub.docker.com/u/px4io/) 上自动构建的。


## 系统必备组件

> **Note** PX4 容器目前仅在 Linux 上受支持（如果您没有 Linux，则可以在虚拟机内运行容器 [inside a virtual machine](#virtual_machine)）。 不要将 `boot2docker` 与默认的 Linux 映像一起使用，因为它不包含 X-Server。

为您的 Linux 计算机 [Install Docker](https://docs.docker.com/installation/)，最好使用 Docker 维护的一个软件包存储库来获取最新的稳定版本。 您可以使用 *Enterprise Edition* 或（free）*Community Edition*。

对于在 *Ubuntu* 上本地安装非生产设置，安装 Docker 的最快捷最简单的方法是使用 [convenience script](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/#install-using-the-convenience-script)，如下所示（在同一页上找到替代安装方法）：

```sh
curl -fsSL get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

默认安装要求您以 root 用户身份调用 * Docker*（即使用`sudo`）。 如果您希望 [use Docker as a non-root user](https://docs.docker.com/engine/installation/linux/linux-postinstall/#manage-docker-as-a-non-root-user)，您可以选择将用户添加到“docker”组，然后注销或者登陆： That way, your build folder won't be owned by root after using docker.

```sh
＃创建 docker 组（可能不是必需的）
sudo groupadd docker
＃将您的用户添加到 docker 组。
sudo usermod -aG docker $ USER
＃在使用 docker 之前再次登录/注销！
```

<a id="px4_containers"></a>

## Container Hierarchy

下面列出了可用的本地编辑（来自 [Github](https://github.com/PX4/containers/blob/master/docker/px4-dev/README.md#container-hierarchy)）：

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


可以使用 `latest` 标记访问最新版本：`px4io/px4-dev-ros:latest`（为 *hub.docker.com* 上的每个容器列出可用标记。 例如，*px4-dev-ros* 标签可以在 [here](https://hub.docker.com/r/px4io/px4-dev-ros/tags/)）。

> **Tip** 通常，您应该使用最近的模式，但不一定是最新的模式（因为这经常更改）。


## 使用 Docker 容器

以下说明显示如何使用在 docker 容器中运行的工具链在主机上构建 PX4 源代码。 该信息假定您已将 PX4 源代码下载到 **src/Firmware**，如下所示：

```sh
mkdir src
cd src
git clone https://github.com/PX4/Firmware.git
cd Firmware
```

### 助手脚本（docker_run.sh）

使用容器的最简单方法是通过 [docker_run.sh](https://github.com/PX4/Firmware/blob/master/Tools/docker_run.sh) 帮助程序脚本。 此脚本将 PX4 构建命令作为参数（例如 `make tests`）。 它使用适当容器和合理环境设置的最新版本（硬编码）启动 docker。

例如，要构建 SITL，您将调用（从 **/Firmware** 目录中）：

```sh
sudo ./Tools/docker_run.sh 'make px4_sitl_default'
```
或者使用 NuttX 工具链启动 bash 会话：
```
sudo ./Tools/docker_run.sh 'bash'
```

> **Tip** 脚本很简单，因为您不需要了解 *Docker* 或者考虑使用哪个容器。 但它不是特别准确！ 下面讨论的 [section below](#manual_start) 方法更灵活，如果您对脚本有任何问题，应该使用它。

<a id="manual_start"></a>

### 手动调用 Docker

典型命令的语法如下所示。 这将运行一个支持 X 指令的 Docker 容器（使容器内部的模拟 GUI 可用）。 它将目录 `&lt;host_src&gt;`from your computer to`&lt;container_src&gt;` 容器内，并转发连接 *QGroundControl* 所需的 UDP 端口。 使用 `-–privileged` 选项，它将自动访问主机上的设备（例如操纵杆和 GPU）。 如果连接/断开设备，则必须重新启动容器。

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
位置：
* `&lt;host_src&gt;`：要映射到容器中的 `&lt;container_src&gt;` 的主计算机目录。 这通常应该是 **Firmware** 目录。
* `&lt;container_src&gt;`：容器内的共享（源）目录的位置。
* `docker run` 命令只能用于创建新容器。 要重新进入此容器（将保留您的更改），只需执行以下操作：
* `&lt;container&gt;：&lt;tag&gt;`：具有版本标签的容器 - 例如：`px4io/px4-dev-ros：2017-10-23`。
* `&lt;build_command&gt;`：要在新容器上调用的命令。 E.g. 例如. `bash` 用于打开容器中的 bash shell。

下面的具体示例显示了如何打开 bash shell 并在主机上共享目录 **〜/src/Firmware**。
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

如果一切顺利，你现在应该在一个新的 bash shell 中。 通过运行验证一切是否正常，例如，SITL：

```sh
cd src/firmware    #This is &lt;container_src&gt;
make px4_sitl_default gazebo
```


### 重新进入容器

The `docker run` command can only be used to create a new container. To get back into this container (which will retain your changes) simply do:

```sh
# start the container
sudo docker start container_name
# open a new bash shell in this container
sudo docker exec -it container_name bash
```

如果需要连接到容器的多个 shell，只需打开一个新 shell 并再次执行最后一个命令。

### 清理容器

有时您可能需要完全清除容器。 您可以使用其名称来执行此操作：
```sh
$ sudo docker rm mycontainer
```
如果您忘记了名称，则可以列出非活动容器 Id，然后将其删除，如下所示：
```sh
$ sudo docker ps -a -q
45eeb98f1dd9
$ sudo docker rm 45eeb98f1dd9
```

### QGroundControl

运行模拟实例时，例如在 docker 容器内的 SITL 并通过 *QGroundControl* 从主机控制它，必须手动设置通信链接。 *QGroundControl* 的自动连接功能在此处不起作用。

在 *QGroundControl* 中，导航至 [Settings](https://docs.qgroundcontrol.com/en/SettingsView/SettingsView.html) 并选择“通信链接”。 创建使用 UDP 协议的新链接。 端口取决于使用的 [configuration](https://github.com/PX4/Firmware/tree/master/posix-configs/SITL)，例如 端口 14557 用于 SITL iris 配置。 IP 地址是您的 docker 容器之一，使用默认网络时通常为 172.17.0.1/16。 The IP address of the docker container can be found with the following command (assuming the container name is `mycontainer`):

```sh
<code>&lt;local_container_name&gt;</code>：正在创建的 docker 容器的名称 如果我们需要再次引用容器，以后可以使用它。
```
：正在创建的 docker 容器的名称 如果我们需要再次引用容器，以后可以使用它。
</code>
> **Note** Spaces between double curly braces above should be not be present (they are needed to avoid a UI rendering problem in gitbook).


### 故障处理

#### 权限错误

容器根据需要使用默认用户创建文件-通常为“root”。 这可能导致权限错误，其中主机上的用户无法访问容器创建的文件。

上面的示例使用行 `-env=LOCAL_USER_ID=“$（id-u）”` 在容器中创建具有与主机上的用户相同的 UID 的用户。 这可确保在主机上可以访问容器中创建的所有文件。


#### 图形驱动问题

运行 Gazebo 可能会导致类似以下错误消息：

```sh
libGL error: failed to load driver: swrast
```

在这种情况下，必须安装主机系统的本机图形驱动程序。 下载正确的驱动程序并将其安装在容器中。 对于 Nvidia 驱动程序，应使用以下命令（否则安装程序将从主机中看到已加载的模块并拒绝继续）：

```sh
./NVIDIA-DRIVER.run -a -N --ui=none --no-kernel-module
```

有关此内容的更多信息，请参见 [here](http://gernotklingler.com/blog/howto-get-hardware-accelerated-opengl-support-docker/)。

<a id="virtual_machine"></a>

## 虚拟机支持

任何最新的 Linux 发行版应该可行。

测试以下配置：

  * OS X 与 VMWare Fusion 和 Ubuntu 14.04（Parallels 上支持 GUI 的 Docker 容器使 X-Server 崩溃）。

**内存**

为虚拟机使用至少 4GB 内存。

**编译方案**

如果编译失败，则出现以下错误：

```sh
The bug is not reproducible, so it is likely a hardware or OS problem.
The bug is not reproducible, so it is likely a hardware or OS problem.
c++: internal compiler error: Killed (program cc1plus)
```

尝试禁用并行构建。

**允许从 VM 主机控制 Docker**

编辑 `/etc/defaults/docker` 并添加以下行：

```sh
DOCKER_OPTS="${DOCKER_OPTS} -H unix:///var/run/docker.sock -H 0.0.0.0:2375"
```

然后，您可以从主机操作系统控制 docker：

```sh
export DOCKER_HOST=tcp://&lt;ip of your VM&gt;:2375
# run some docker command to see if it works, e.g. ps
docker ps
```

