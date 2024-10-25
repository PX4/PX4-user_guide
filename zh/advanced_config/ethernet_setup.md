# PX4以太网配置

以太网连接提供了一种快速、可靠和灵活的通信选择，可替代使用USB或其他串行连接。

它可以用于连接地面站、机载计算机和其他MAVLink系统。 特别建议使用它连接到"原生"使用以太网的系统——例如IP数传。

本主题涵盖:

- [PX4 以太网设置](#px4-ethernet-setup)
  - [支持的飞行控制器](#supported-flight-controllers)
  - [设置以太网网络](#setting-up-the-ethernet-network)
    - [PX4以太网网络设置](#px4-ethernet-network-setup)
    - [Ubuntu以太网网络设置](#ubuntu-ethernet-network-setup)
    - [机载计算机以太网网络设置](#companion-computer-ethernet-network-setup)
  - [PX4 MAVLink 串口配置](#px4-mavlink-serial-port-configuration)
  - [QGroundControl 设置示例](#qgroundcontrol-setup-example)
  - [MAVSDK-Python 设置示例](#mavsdk-python-setup-example)
  - [ROS 2设置示例](#ros-2-setup-example)

## 支持的飞行控制器

PX4支持在 [Pixhawk 5X 标准](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-011%20Pixhawk%20Autopilot%20v5X%20Standard.pdf) 飞行控制器（及更高版本）上进行以太网连接，它具有以太网端口。 可能也支持其他板子。

支持的飞行控制器包括:

- [CUAV Pixhawk V6X](../flight_controller/cuav_pixhawk_v6x.md)
- [Holybro Pixhawk 5X](../flight_controller/pixhawk5x.md)
- [Holybro Pixhawk 6X](../flight_controller/pixhawk6x.md)
- [RaccoonLab FMUv6X Autopilot](../flight_controller/raccoonlab_fmu6x.md)

## 设置以太网网络

要通过以太网连接系统，您需要将它们连接到同一个网络，以便每个系统有一个唯一的IP地址并且可以找到其他系统。 可以使用DHCP服务器来分配地址，或者通过手动配置网络上每个系统的地址来完成。

我们不能提供一个确保可以在您的本地网络中工作的“开箱即用配置”。 因此，作为您可能进行的配置示例，我们展示如何在一个IP网络中设置系统，在该网络中使用静态地址范围`10.41.10.Xxx`，其中PX4静态分配的地址为`10.41.10.2`（PX4默认），计算机的地址为`10.41.10.1`。 如果您想要连接一台机载计算机或其他系统到网络上，您可以使用类似的方法来分配一个静态地址。

::: info
关于网络配置并没有什么"特别"之处（也许除了用于修改网络设置的工具之外）；它的工作方式与家庭或商业网络基本相同。
这就是说，了解IP网络如何工作是非常有利的！
:::

### PX4以太网网络设置

<!-- Information about NuttX network manager: https://github.com/PX4/PX4-Autopilot/pull/16330 -->

PX4使用[netman](../modules/modules_system.md#netman)模块来应用和更新网络设置。

默认配置首先从DHCP请求IP地址，如果失败，将退回到默认的静态地址`10.41.10.2`。 您可以显式设置任何静态 IP 地址（包括默认地址）来绕过初始的 DHCP，使连接速度稍快。

::: info
If you want to use the default static IP address for PX4 you can skip forward to the next section.
:::

网络设置在SD卡上的配置文件`/fs/microsd/net.cfg`中定义。 这是一个文本文件，将每个设置定义为新行上的`键-值`对。 配置文件看起来像这样：

```ini
DEVICE=eth0
BOOTPROTO=fallback
IPADDR=10.41.10.2
NETMASK=255.255.255.0
ROUTER=10.41.10.254
DNS=10.41.10.254
```

值为：

- `DEVICE`：接口名称。 默认为`eth0`。
- `BOOTPROTO`: 用于获取PX4 IP地址的协议。 有效值为： `dhcp`, `static`, `fallback` (使用DHCP，但如果失败则在时间后回到静态地址)
- `IPADDR`: 静态 IP 地址（在 BOOTPROTO 为 `static` 或 `fallback` 时使用）
- `NETMASK`: 网络掩码
- `ROUTER`: 默认路由地址。
- `DNS`: DNS服务器的地址。

使用 _QGroundControl_ 设置上述“示例”配置：

1. 将飞行控制器通过USB线连接到计算机。
1. 打开 **QGroundControl > 分析工具 > MAVLink 控制台**
1. 将下面类似的命令输入到 _MAVLink 控制台_ 中（将这些值写入配置文件）：

   ```sh
   echo DEVICE=eth0 > /fs/microsd/net.cfg
   echo BOOTPROTO=fallback >> /fs/microsd/net.cfg
   echo IPADDR=10.41.10.2 >> /fs/microsd/net.cfg
   echo NETMASK=255.255.255.0 >>/fs/microsd/net.cfg
   echo ROUTER=10.41.10.254 >>/fs/microsd/net.cfg
   echo DNS=10.41.10.254 >>/fs/microsd/net.cfg
   ```

1. 一旦设置了网络配置，您可以断开 USB 电缆。
1. 重启飞行控制器以应用设置。

请注意，上述设置为飞行控制器在以太网网络上分配了一个地址。 您还需要[配置以太网端口](#px4-mavlink-serial-port-configuration)以使用MAVLink。

### Ubuntu以太网网络设置

如果您在地面站（或机载计算机）上使用Ubuntu，则可以使用[netplan](https://netplan.io/)来配置网络。

以下我们展示如何在netplan配置文件"`/etc/netplan/01-network-manager-all.yaml`"中编写一个设置，该设置将在与上文中使用的PX4设置相同的网络上运行。 请注意，在 [示例](https://netplan.io/examples/) 和 [netplan](https://netplan.io/) 文档中有更多说明。

设置Ubuntu计算机：

1. 在终端中，创建并打开一个 `netplan` 配置文件： `/etc/netplan/01-network-manager-all.yaml` 下面我们使用 _nano_ 文本编辑器来实现这一点。

   ```
   sudo nano /etc/netplan/01-network-manager-all.yaml
   ```

1. 将以下配置信息复制并粘贴到文件中（注意：缩进很重要！）:

   ```
   network:
     version: 2
     renderer: NetworkManager
     ethernets:
         enp2s0:
             addresses:
                 - 10.41.10.1/24
             nameservers:
                 addresses: [10.41.10.1]
             routes:
                 - to: 10.41.10.1
                   via: 10.41.10.1
   ```

   保存并退出编辑器。

1. 通过在Ubuntu终端中输入以下命令应用_netplan_配置。

   ```
   sudo netplan apply
   ```

### 机载计算机以太网网络设置

机载计算机的设置将取决于它的操作系统。

基于Linux的操作系统可能支持`netplan`，在这种情况下，指令将与上述相同，但请使用唯一的IP地址。

## PX4 MAVLink 串口配置

以太网端口配置设置_串行链接_的属性（这是PX4视为以太网连接的方式）。 这包括被发送的 MAVLink 消息集合、数据传输速率、远程系统可以连接并监听的 UDP 端口等。

::: info
您必须单独配置 PX4 IP 地址和其他网络设置（如前面所示）。
:::

PX4配置串行端口以通过MAVLink连接到地面站，使用下面的参数:

| 参数                                                                               | 值      | 描述                             |
| -------------------------------------------------------------------------------- | ------ | ------------------------------ |
| [MAV_2_CONFIG](../advanced_config/parameter_reference.md#MAV_2_CONFIG)         | 1000   | 配置以太网端口                        |
| [MAV_2_BROADCAST](../advanced_config/parameter_reference.md#MAV_2_BROADCAST)   | 1      | 广播`HEARTBEAT`消息                |
| [MAV_2_MODE](../advanced_config/parameter_reference.md#MAV_2_MODE)             | 0      | 发送“正常”的 MAVLink 消息集合（即地面站消息集合） |
| [MAV_2_RADIO_CTL](../advanced_config/parameter_reference.md#MAV_2_RADIO_CTL)   | 0      | 禁用MAVLink流量控制                  |
| [MAV_2_RATE](../advanced_config/parameter_reference.md#MAV_2_RATE)             | 100000 | 最大发送速率                         |
| [MAV_2_REMOTE_PRT](../advanced_config/parameter_reference.md#MAV_2_REMOTE_PRT) | 14550  | MAVLink远程端口14550（地面站）          |
| [MAV_2_UDP_PRT](../advanced_config/parameter_reference.md#MAV_2_UDP_PRT)       | 14550  | MAVLink网络端口14550（地面站）          |

通常，机载计算机将使用端口`14540`（而不是`14550`），并按照`Onboard`配置文件中指定的传输一系列MAVLink消息。 您可以通过更改 [MAV_2_REMOTE_PRT](../advanced_config/parameter_reference.md#MAV_2_REMOTE_PRT) 和 [MAV_2_UDP_PRT](../advanced_config/parameter_reference.md#MAV_2_UDP_PRT) 为 `14540`，以及 [MAV_2_MODE](../advanced_config/parameter_reference.md#MAV_2_MODE) 为 `2`（Onboard）来配置此设置。 请注意，这仍将使用GCS配置文件正常工作。

有关 MAVLink 串口配置的更多信息，请参考 [MAVLink Peripherals (GCS/OSD/Companion)](../peripherals/mavlink_peripherals.md)

## QGroundControl 设置示例

假设您已经[设置了以太网网络](#setting-up-the-ethernet-network)，以便您的地面站计算机和PX4在同一网络上运行，并且

要将 QGroundControl 通过以太网连接到 PX4 ：

1. [设置以太网网络](#setting-up-the-ethernet-network) 以便您的地面站计算机和 PX4 在同一网络。
1. 使用网线连接地面站计算机和PX4。
1. 启动QGroundControl并[定义通信链路](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/settings_view/settings_view.html)（**应用程序设置>通信链路**）指定PX4中分配的IP地址和端口。

   假设值已按本主题其余部分所述设置，设置将如下所示：

   ![QGC以太网设置的通信链接](../../assets/qgc/settings/comm_link/px4_ethernet_link_config.png)

1. 如果你选择这个链接，QGroundControl 应该会连接。

::: info [PX4 以太网端口配置](#px4-ethernet-network-setup) 应该不需要（默认值适用于地面站）。
:::

## MAVSDK-Python 设置示例

要在一台机载计算机上运行MAVSDK-Python:

1. [设置了以太网网络](#setting-up-the-ethernet-network)，以便您的机载计算机和PX4在同一网络上运行。
1. 修改[PX4以太网端口配置](#px4-ethernet-network-setup)以连接到机载计算机。 您可能要将参数 [MAV_2_REMOTE_PRT](../advanced_config/parameter_reference.md#MAV_2_REMOTE_PRT) 和 [MAV_2_UDP_PRT](../advanced_config/parameter_reference.md#MAV_2_UDP_PRT) 更改为 `14540`，以及 [MAV_2_MODE](../advanced_config/parameter_reference.md#MAV_2_MODE) 更改为 `2`（Onboard）。
1. 按照[MAVSDK-python](https://github.com/mavlink/MAVSDK-Python)中的说明安装和使用MAVSDK。

   例如，您的代码将使用以下方式连接到PX4：

   ```python
   await drone.connect(system_address="udp://10.41.10.2:14540")
   ```

::: info 如果您不修改 PX4 以太网端口配置，MAVSDK 可以连接到端口 `14550` 上的 PX4。 然而，这并不推荐，因为默认配置是针对与地面控制站（而不是机载计算机）通信进行优化的。
:::

## ROS 2设置示例

::: info 先决条件:

- 您使用的自动驾驶仪运行的PX4固件带有[uXRCE-DDS](../middleware/uxrce_dds.md)中间件。 请注意，PX4 v1.14及更高版本默认包含所需的[uxrce_dds_client](../modules/modules_system.md#uxrce-dds-client)模块。
- [ROS 2](../ros2/user_guide.md) 在 机载计算机 上已正确设置。
- 您已按照本页顶部讨论的以太网网络和端口设置进行了设置。
:::

设置 ROS 2：

1. 通过以太网连接您的飞行控制器和机载计算机。
2. [启动 PX4 上的 uXRCE-DDS 客户端](../middleware/uxrce_dds.md#starting-the-client)，可以手动操作，也可以通过自定义系统启动脚本。 请注意，您必须使用机载计算机的IP地址和代理正在侦听的UDP端口（上面的示例配置将机载计算机IP地址设置为`10.41.10.1`，并在下一步中将代理UDP端口设置为`8888`）。
3. [在机载计算机上启动uXRCE-DDS代理](../middleware/uxrce_dds.md#starting-the-agent)。 例如，在终端中输入以下命令以启动代理程序并侦听UDP端口`8888`。

   ```sh
   MicroXRCEAgent udp4 -p 8888
   ```

4. 在新终端中运行一个[监听节点](../ros2/user_guide.md#running-the-example)以确认连接已建立：

   ```sh
   source ~/ws_sensor_combined/install/setup.bash
   ros2 launch px4_ros_com sensor_combined_listener.launch.py
   ```

   如果所有设置都正确，终端应显示如下输出:

   ```sh
   RECEIVED SENSOR COMBINED DATA
   =============================
   ts: 855801598
   gyro_rad[0]: -0.00339938
   gyro_rad[1]: 0.00440091
   gyro_rad[2]: 0.00513893
   gyro_integral_dt: 4997
   accelerometer_timestamp_relative: 0
   accelerometer_m_s2[0]: -0.0324082
   accelerometer_m_s2[1]: 0.0392213
   accelerometer_m_s2[2]: -9.77914
   accelerometer_integral_dt: 4997
   ```

## 另请参阅

- [使Holybro发布的Pixhawk Raspberry Pi CM4基板和PX4通信](https://px4.io/get-the-pixhawk-raspberry-pi-cm4-baseboard-by-holybro-talking-with-px4/)（px4.io博客）：
  - 展示如何通过有线以太网连接 Pixhawk 6X + Raspberry Pi 到 CM4 主板。
  - 博客从这个主题复制了很多材料。
