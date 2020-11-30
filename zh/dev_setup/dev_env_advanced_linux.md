# 高级 Linux 安装用例

## 使用 JTAG 编程调试器

Linux 用户需要为 JTAG 调试器接入 USB 总线开放权限。

> **Note** 对于 Archlinux：使用如下命令将 plugdev 组替换成 uucp


使用 `sudo` 模式运行 `ls`，确保命令成功运行：

```sh
sudo ls
```

然后，暂时授予 `sudo` 权限，运行此命令：

```sh
cat > $HOME/rule.tmp <<_EOF
# All 3D Robotics (includes PX4) devices
SUBSYSTEM=="usb", ATTR{idVendor}=="26AC", GROUP="plugdev"
# FTDI (and Black Magic Probe) Devices
SUBSYSTEM=="usb", ATTR{idVendor}=="0483", GROUP="plugdev"
# Olimex Devices
SUBSYSTEM=="usb",  ATTR{idVendor}=="15ba", GROUP="plugdev"
_EOF
sudo mv $HOME/rule.tmp /etc/udev/rules.d/10-px4.rules
sudo /etc/init.d/udev restart
```

将当前用户添加到组 **plugdev**：

```sh
sudo usermod -a -G plugdev $USER
```
