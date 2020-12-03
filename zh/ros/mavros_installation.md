# MAVROS

[ mavros ](http://wiki.ros.org/mavros#mavros.2BAC8-Plugins.sys_status) 功能包提供了 一台能够运行ros的机载电脑、支持MAVLINK协议的飞控和支持MAVLINK的地面站这三者之间的通讯功能。

:::note
*MAVROS* is the "official" supported bridge between ROS and the MAVLink protocol. It is currently being extended to enable [fast-RTPS messaging](../middleware/micrortps.md), including a layer to translate PX4 [uORB messages](../middleware/uorb.md) to common ROS idioms.
:::

While MAVROS can be used to communicate with any MAVLink enabled autopilot this documentation will be in the context of enabling communication between the PX4 flight stack and a ROS enabled companion computer.

## 安装

ROS 代码库有针对 Ubuntu x86、amd64 (x86\_64) 和 armhf (ARMv7) 的二进制安装包。 Kinetic 同样支持 Debian Jessie amd64 和 arm64（ARMv8）。

:::tip
These instructions are a simplified version of the [official installation guide](https://github.com/mavlink/mavros/tree/master/mavros#installation). They cover the *ROS Melodic* release.
:::

### 二进制安装 (Debian/Ubuntu)

The ROS repository has binary packages for Ubuntu x86, amd64 (x86\_64) and armhf (ARMv7). Kinetic also supports Debian Jessie amd64 and arm64 (ARMv8).

本安装方式假设你已经拥有了一个catkin_ws，如果没有您则需要按照以下指令创建一个：

```
sudo apt-get install ros-kinetic-mavros ros-kinetic-mavros-extras
```

Then install [GeographicLib](https://geographiclib.sourceforge.io/) datasets by running the `install_geographiclib_datasets.sh` script:

```
wget https://raw.githubusercontent.com/mavlink/mavros/master/mavros/scripts/install_geographiclib_datasets.sh
./install_geographiclib_datasets.sh   
```

### 源码方式安装

如果这是你第一次使用wstool你需要初始化你的代码文件夹。
```sh
mkdir -p ~/catkin_ws/src
cd ~/catkin_ws
catkin init
wstool init src
```

You will be using the ROS Python tools: *wstool* (for retrieving sources), *rosinstall*, and *catkin_tools* (building) for this installation. While they may have been installed during your installation of ROS you can also install them with:
```sh
sudo apt-get install python-catkin-tools python-rosinstall-generator -y
```

:::tip
While the package can be built using **catkin_make** the preferred method is using **catkin_tools** as it is a more versatile and "friendly" build tool.
:::

If this is your first time using wstool you will need to initialize your source space with:
```sh
$ wstool init ~/catkin_ws/src
```

Now you are ready to do the build
1. 安装Mavlink
   ```
   安装Mavlink 
     # We use the Kinetic reference for all ROS distros as it's not distro-specific and up to date
     rosinstall_generator --rosdistro kinetic mavlink | tee /tmp/mavros.rosinstall
   ```
1. 安装MAVROS最新的版本：
   * 发行版 / 稳定版
     ```
     最新源码 
      sh
      rosinstall_generator --upstream-development mavros | tee -a /tmp/mavros.rosinstall
     ```
   * 最新源码
     ```sh
     发行版 / 稳定版 <code>rosinstall_generator --upstream mavros | tee -a /tmp/mavros.rosinstall</code>
     ```

     </code>
     ```sh
     sh
  # For fetching all the dependencies into your catkin_ws, 
  # just add '--deps' to the above scripts, E.g.:
  #   rosinstall_generator --upstream mavros --deps | tee -a /tmp/mavros.rosinstall
     ```

1. 创建工作区 & 安装依赖
   ```
   wstool merge -t src /tmp/mavros.rosinstall
 wstool update -t src -j4
 rosdep install --from-paths src --ignore-src -y
   ```

1. 安装 [GeographicLib](https://geographiclib.sourceforge.io/) 数据集：
   ```
   ./src/mavros/mavros/scripts/install_geographiclib_datasets.sh
   ```

1. 构建源码
   ```
   catkin build
   ```

1. 确保从工作区中使用 setup. bash 或 setup. zsh。
   ```
   #Needed or rosrun can't find nodes from this workspace.
 source devel/setup.bash
   source devel/setup.bash
   ```

In the case of error, there are addition installation and troubleshooting notes in the [mavros repo](https://github.com/mavlink/mavros/tree/master/mavros#installation).
