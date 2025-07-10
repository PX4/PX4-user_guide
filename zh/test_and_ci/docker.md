---
canonicalUrl: https://docs.px4.io/main/zh/test_and_ci/docker
---

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

可以使用 `latest` 标记访问最新版本：`px4io/px4-dev-ros:latest`（为 *hub.docker.com* 上的每个容器列出可用标记。 However, for building the PX4 firmware we suggest to [use docker as a non-root user](https://docs.docker.com/install/linux/linux-postinstall/#manage-docker-as-a-non-root-user). That way, your build folder won't be owned by root after using docker.

```sh
＃创建 docker 组（可能不是必需的）
sudo groupadd docker
＃将您的用户添加到 docker 组。
sudo usermod -aG docker $ USER
＃在使用 docker 之前再次登录/注销！
```


<a id="px4_containers"></a>

## 本地编辑层次结构

The available containers are on [Github here](https://github.com/PX4/PX4-containers/blob/master/README.md#container-hierarchy).

使用容器的最简单方法是通过 [docker_run.sh](https://github.com/PX4/Firmware/blob/master/Tools/docker_run.sh) 帮助程序脚本。 此脚本将 PX4 构建命令作为参数（例如 `make tests`）。 For example, below you can see that the docker container with nuttx build tools (`px4-dev-nuttx-focal`) does not include ROS 2, while the simulation containers do:

- px4io/px4-dev-base-focal
  - px4io/px4-dev-nuttx-focal
  - px4io/px4-dev-simulation-focal
    - px4io/px4-dev-ros-noetic
    - px4io/px4-dev-ros2-foxy


The most recent version can be accessed using the `latest` tag: `px4io/px4-dev-nuttx-bionic:latest` (available tags are listed for each container on *hub.docker.com*. For example, the `px4io/px4-dev-nuttx-bionic` tags can be found [here](https://hub.docker.com/r/px4io/px4-dev-nuttx-bionic/tags?page=1&ordering=last_updated)).

:::tip
Typically you should use a recent container, but not necessarily the `latest` (as this changes too often).
:::

## 使用 Docker 容器

典型命令的语法如下所示。 这将运行一个支持 X 指令的 Docker 容器（使容器内部的模拟 GUI 可用）。

```sh
mkdir src
cd src
git clone https://github.com/PX4/Firmware.git
cd Firmware
```

### 助手脚本（docker_run.sh）

The easiest way to use the containers is via the [docker_run.sh](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/Tools/docker_run.sh) helper script. This script takes a PX4 build command as an argument (e.g. `make tests`). It starts up docker with a recent version (hard coded) of the appropriate container and sensible environment settings.

下面的具体示例显示了如何打开 bash shell 并在主机上共享目录 **〜/src/Firmware**。

```sh
sudo ./Tools/docker_run.sh 'make px4_sitl_default'
```
Or to start a bash session using the NuttX toolchain:
```
sudo ./Tools/docker_run.sh 'bash'
```

`docker run` 命令只能用于创建新容器。 要重新进入此容器（将保留您的更改），只需执行以下操作： The manual approach discussed in the [section below](#manual_start) is more flexible and should be used if you have any problems with the script.
:::

<a id="manual_start"></a>

### 手动调用 Docker

The syntax of a typical command is shown below. This runs a Docker container that has support for X forwarding (makes the simulation GUI available from inside the container). It maps the directory `<host_src>` from your computer to `<container_src>` inside the container and forwards the UDP port needed to connect *QGroundControl*. With the `-–privileged` option it will automatically have access to the devices on your host (e.g. a joystick and GPU). If you connect/disconnect a device you have to restart the container.

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
Where,
* `<host_src>`: The host computer directory to be mapped to `<container_src>` in the container. This should normally be the **PX4-Autopilot** directory.
* `<container_src>`: The location of the shared (source) directory when inside the container.
* `<local_container_name>`: A name for the docker container being created. This can later be used if we need to reference the container again.
* `<container>:<tag>`: The container with version tag to start - e.g.: `px4io/px4-dev-ros:2017-10-23`.
* `<build_command>`: The command to invoke on the new container. E.g. `bash` is used to open a bash shell in the container.

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

运行模拟实例时，例如在 docker 容器内的 SITL 并通过 *QGroundControl* 从主机控制它，必须手动设置通信链接。 *QGroundControl* 的自动连接功能在此处不起作用。

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

If you need multiple shells connected to the container, just open a new shell and execute that last command again.

### 清理容器

Sometimes you may need to clear a container altogether. You can do so using its name:
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

在这种情况下，必须安装主机系统的本机图形驱动程序。 下载正确的驱动程序并将其安装在容器中。

In *QGroundControl*, navigate to [Settings](https://docs.qgroundcontrol.com/en/SettingsView/SettingsView.html) and select Comm Links. Create a new link that uses the UDP protocol. The port depends on the used [configuration](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/ROMFS/px4fmu_common/init.d-posix/rcS) e.g. port 14570 for the SITL config. The IP address is the one of your docker container, usually 172.17.0.1/16 when using the default network. The IP address of the docker container can be found with the following command (assuming the container name is `mycontainer`):

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

如果编译失败，则出现以下错误：


<a id="virtual_machine"></a>

## 虚拟机支持

尝试禁用并行构建。

The following configuration is tested:

  * OS X with VMWare Fusion and Ubuntu 14.04 (Docker container with GUI support on Parallels make the X-Server crash).

**Memory**

Use at least 4GB memory for the virtual machine.

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

