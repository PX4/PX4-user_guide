---
canonicalUrl: https://docs.px4.io/main/zh/tutorials/video_streaming
---

# Video streaming in QGroundControl

:::note
This article is somewhat out of date. Community members are encouraged to retest the instructions on a more recent Ubuntu version, and to import Odroid setup instructions into the wiki.
:::

This topic shows how to stream video from a camera (Logitech C920) attached to a companion computer ([Odroid C1](https://magazine.odroid.com/wp-content/uploads/odroid-c1-user-manual.pdf)) to another computer (over wifi) and display in *QGroundControl*.

The hardware setup is shown in the figure below. It consists of the following parts:
* Odroid C1
* Logitech 摄像头 C920
* WiFi 模块 TP-LINK TL-WN722N

![Setup](../../assets/videostreaming/setup_whole.jpg)

The instructions were tested on Ubuntu 14.04 but a similar approach should work for later Ubuntu versions.

## Install Linux environment in Odroid C1

The Odroid C1 can be powered via the 5V DC jack. If the Odroid is mounted on a drone, it is recommended to solder two pins next to the 5V DC jack by applying the through-hole soldering [method](https://learn.sparkfun.com/tutorials/how-to-solder---through-hole-soldering) as shown in the figure below. The power is delivered by connecting the DC voltage source (5 V) via a jumper cable (red in the image above) with the Odroid C1 and connect the ground of the circuit with a jumper cable (black in the image above) with a ground pin of the Odroid C1 in the example setup. 如果 Odroid 被安装在飞行器上，建议将两个跳线通过插片式的[方法](https://learn.sparkfun.com/tutorials/how-to-solder---through-hole-soldering)焊接在电路上

## Set up alternative power connection

The Odroid C1 can be powered via the 5V DC jack. If the Odroid is mounted on a drone, it is recommended to solder two pins next to the 5V DC jack by applying the through-hole soldering [method](https://learn.sparkfun.com/tutorials/how-to-solder---through-hole-soldering) as shown in the figure below. The power is delivered by connecting the DC voltage source (5 V) via a jumper cable (red in the image above) with the Odroid C1 and connect the ground of the circuit with a jumper cable (black in the image above) with a ground pin of the Odroid C1 in the example setup.

![Power Pins](../../assets/videostreaming/power-pins.jpg)

## Enable WiFi connection for Odroid C1

本节演示如何设置 odroid c1, 使其成为接入点。 To enable WiFi connection for the Odroid C1, follow the steps described in the [Odroid C1 tutorial](http://web.archive.org/web/20180617111122/http://pixhawk.org/peripherals/onboard_computers/odroid_c1) in the section Establishing wifi connection with antenna.


## 配置 WiFi 为接入点

This sections shows how to set up the Odroid C1 such that it is an access point. 如果不同, 请将所有出现的 wlan0 更改为相应的接口 (例如 wlan1)。 To enable to stream the video from the camera via the Odroid C1 to the QGroundControl that runs on a computer it is not required to follow this section. However, it is shown here because setting up the Odroid C1 as an access point allows to use the system in a stand-alone fashion. The TP-LINK TL-WN722N is used as a WiFi module.

In the following steps it is assumed that the Odroid C1 assigns the name wlan0 to your WiFi module. Change all occurrences of wlan0 to the appropriate interface if different (e.g. wlan1).

### 配置机载电脑为接入点

安装必要的软件

Install the necessary software


```bash
sudo apt-get install hostapd udhcpd
```

Configure DHCP. Edit the file `/etc/udhcpd.conf`

```bash
start 192.168.2.100 # This is the range of IPs that the hotspot will give to client devices.
end 192.168.2.200
interface wlan0 # The device uDHCP listens on.
remaining yes
opt dns 8.8.8.8 4.2.2.2 # The DNS servers client devices will use (if routing through the Ethernet link).
opt subnet 255.255.255.0
opt router 192.168.2.1 # The Onboard Computer's IP address on wlan0 which we will set up shortly.
opt lease 864000 # 10 day DHCP lease time in seconds
end 192.168.2.200
interface wlan0 # The device uDHCP listens on.
remaining yes
opt dns 8.8.8.8 4.2.2.2 # The DNS servers client devices will use (if routing through the Ethernet link).
opt subnet 255.255.255.0
opt router 192.168.2.1 # wlan0 上的机载计算机的 IP 地址， 也就是我们稍后会设置的。
opt lease 864000 # 10 天 DHCP 租约时间，以秒为单位
```
编辑如下文件 `/etc/default/udhcpd`，修改其中的一行：

至

```bash
DHCPD_ENABLED="no"
```

to

```bash
#DHCPD_ENABLED="no"
```

禁用原始 (WiFi Client) 自动配置。 Disable the original (WiFi Client) auto configuration. Change the lines (they probably will not be all next to each other or may not even be there at all):

```sh
auto wlan0
iface wlan0 inet static
address 192.168.2.1
netmask 255.255.255.0
network 192.168.2.0
broadcast 192.168.2.255
wireless-power off
```

Disable the original (WiFi Client) auto configuration. Change the lines (they probably will not be all next to each other or may not even be there at all):

```sh
allow-hotplug wlan0
wpa-roam /etc/wpa_supplicant/wpa_supplicant.conf
iface default inet dhcp
```
to:

```sh
#allow-hotplug wlan0
#wpa-roam /etc/wpa_supplicant/wpa_supplicant.conf
#iface default inet dhcp
```

If you have followed the *Odroid C1 tutorial* (originally pixhawk.org) to set up the WiFi connection, you might have created the file `/etc/network/intefaces.d/wlan0`. Please comment out all lines in that file such that those configurations have no effect anymore.

Configure HostAPD: To create a WPA-secured network, edit the file `/etc/hostapd/hostapd.conf` (create it if it does not exist) and add the following lines:


```
auth_algs=1
channel=6            # 要使用的通道
hw_mode=g
ieee80211n=1          # 802.11n 假设你的设备支持它
ignore_broadcast_ssid=0
interface=wlan0
wpa=2
wpa_key_mgmt=WPA-PSK
wpa_pairwise=TKIP
rsn_pairwise=CCMP
# 更改至正确的驱动
driver=nl80211
# 如果需要的话，把下面两项改成别的名字和密码
ssid=OdroidC1
wpa_passphrase=QGroundControl
```

Change `ssid=`, `channel=`, and `wpa_passphrase=` to values of your choice. SSID is the hotspot's name which is broadcast to other devices, channel is what frequency the hotspot will run on, wpa_passphrase is the password for the wireless network. For many more options see the file `/usr/share/doc/hostapd/examples/hostapd.conf.gz`. Look for a channel that is not in use in the area. You can use tools such as *wavemon* for that.

到：

```
#DAEMON_CONF=""
```
to:
```
DAEMON_CONF="/etc/hostapd/hostapd.conf"
```
This is enough to have the Onboard Computer present itself as an Access Point and allow your ground station to connect. If you truly want to make it work as a real Access Point (routing the WiFi traffic to the Onboard Computer’s Ethernet connection), we need to configure the routing and network address translation (NAT). Enable IP forwarding in the kernel: 如果您真的希望将其作为真正的接入点（将WiFi流量路由到板载计算机的以太网连接），我们需要配置路由和网络地址转换（NAT）。

```
sudo update-rc.d hostapd enable
sudo update-rc.d udhcpd enable
```

This is enough to have the Onboard Computer present itself as an Access Point and allow your ground station to connect. If you truly want to make it work as a real Access Point (routing the WiFi traffic to the Onboard Computer’s Ethernet connection), we need to configure the routing and network address translation (NAT). Enable IP forwarding in the kernel:

```sh
sudo sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"
```

要使其永久化，请运行以下命令：

```sh
sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
sudo iptables -A FORWARD -i eth0 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT
sudo iptables -A FORWARD -i wlan0 -o eth0 -j ACCEPT
```

现在，打开 /etc/network/interfaces 并在文件底部添加以下行:

```sh
sudo sh -c "iptables-save > /etc/iptables.ipv4.nat"
```

To install gstreamer packages on the computer and on the Odroid C1 and start the stream, follow the instruction given in the [QGroundControl README](https://github.com/mavlink/qgroundcontrol/blob/master/src/VideoStreaming/README.md).

```sh
up iptables-restore < /etc/iptables.ipv4.nat
```

# Gstreamer 安装

如果您无法使用 uvch264s 插件启动 odroid 上的流, 您也可以尝试使用 v4l2src 插件启动它:

其中 `“xxx.xxx.xxx.xxx”` 是QGC运行的IP地址

```sh
gst-launch-1.0 v4l2src device=/dev/video0 ! video/x-h264,width=1920,height=1080,framerate=24/1 ! h264parse ! rtph264pay ! udpsink host=xxx.xxx.xxx.xxx port=5000 video/x-h264,width=1920,height=1080,framerate=24/1 ! h264parse ! rtph264pay ! udpsink host=xxx.xxx.xxx.xxx port=5000
```
Where `xxx.xxx.xxx.xxx` is the IP address where QGC is running.

:::tip
If you get the system error: `Permission denied`, you might need to prepend `sudo` to the command above.
:::

Alternatively add the current user to the `video` group as shown below (and then logout/login):

  ```sh
  sudo usermod -aG video $USER
  ```

如果您单击视频流, 卫星地图将显示在左下角, 视频将显示在整个背景中。

![QGC displaying video stream](../../assets/videostreaming/qgc-screenshot.png)

If you click on the video stream, the satellite map is shown in the left bottom corner and the video is shown in the whole background.
