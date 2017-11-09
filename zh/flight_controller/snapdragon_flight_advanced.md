---
translated_page: https://github.com/PX4/Devguide/blob/master/en/flight_controller/snapdragon_flight_advanced.md
translated_sha: 95b39d747851dd01c1fe5d36b24e59ec865e323e
---

# 骁龙飞控——高级篇

## 连接到骁龙

### 通过FTDI

将FTDI线缆连接到骁龙附带的小型调试插头上

在Linux上，使用下面命令打开控制台：

```
screen /dev/ttyUSB0 115200
```

检查`/dev/`或`/dev/serial/by-id`，并将USB0改为相应项。


### 通过ADB (Android Debug Bridge)

通过USB2.0连接骁龙，并使用电源模块供电。
当骁龙运行时，LED将以蓝色慢慢闪烁（呼吸）。

确保使用adb可以找到飞控板：

```
adb devices
```

如果看不到该设备，那么很可能是USB设备的权限问题。 按照下面说明操作来获得shell：

```
adb shell
```

## 升级骁龙

对于此步骤，需要来自Intrynsic的Flight_BSP压缩文件。 使用序列号注册后可以获得。

### 升级/更换Linux镜像

> **Caution** 烧写Linux映像将清除骁龙上的所有内容。 在执行此步骤之前请做好备份！

确保使用adb可以找到飞控板：

```
adb devices
```

然后，重启骁龙进入fastboot引导程序：

```
adb reboot bootloader
```

确保可以使用fastboot找到飞控板：

```
fastboot devices
```

从Intrinsyc下载最新的BSP：

```
unzip Flight_3.1.1_BSP_apq8074-00003.zip
cd BSP/binaries/Flight_BSP_4.0
./fastboot-all.sh
```

分区 `recovery`, `update`以及`factory`操作失败是很正常的。

### 升级ADSP固件

PX4栈的一部分是在ADSP（骁龙8074的DSP端）上运行的。底层操作系统QURT需要单独更新。

> **Caution** 如果在ADSP固件更新过程中出现任何问题，那么骁龙就会变砖！ 请仔细阅读并严格按照以下步骤操作，以防止变砖。

首先，如果你还没有BSP 3.1.1，[升级Linux映像](#linux)！

#### 防止变砖

为防止系统由于ADSP固件发生任何问题而挂起，请在更新之前进行以下更改：

通过`screen`或`adb shell`直接在骁龙上编辑文件：
```sh
vim /usr/local/qr-linux/q6-admin.sh
```

或者在本地加载文件，并使用任意编辑器进行编辑：

本地加载文件：
```sh
adb pull /usr/local/qr-linux/q6-admin.sh
```

编辑：

```sh
gedit q6-admin.sh
```

上传：

```sh
adb push q6-admin.sh /usr/local/qr-linux/q6-admin.sh
adb shell chmod +x /usr/local/qr-linux/q6-admin.sh
```

注释掉导致挂起的while循环：

```
# Wait for adsp.mdt to show up
#while [ ! -s /lib/firmware/adsp.mdt ]; do
#  sleep 0.1
#done
```

以及：

```
# Don't leave until ADSP is up
#while [ "`cat /sys/kernel/debug/msm_subsys/adsp`" != "2" ]; do
#  sleep 0.1
#done
```

#### 上传最新的ADSP 固件文件

从Intrinsyc下载[Flight_3.1.3.1_qcom_flight_controller_hexagon_sdk_add_on.zip](https://support.intrinsyc.com/attachments/download/1571/Flight_3.1.3.1_qcom_flight_controller_hexagon_sdk_add_on.zip)。 

并把它复制到骁龙上：

```
unzip Flight_3.1.1a_qcom_flight_controller_hexagon_sdk_add_on.zip
cd assets/8074-eagle/normal/adsp_proc/obj/qdsp6v5_ReleaseG/LA/system/etc/firmware
adb push . /lib/firmware
```

接下来只需要重新启动，新固件就会自动应用：

```
adb reboot
```


## 串口

### 使用串口

目前，并不是所有的POSIX调用都被QURT支持。 因此，需要自定义的ioctl。

用于设置和使用UART的API在[dspal](https://github.com/PX4/dspal/blob/master/include/dev_fs_lib_serial.h)中有详尽说明。

## Wifi设置

> **Todo** 这些是高级开发人员的注意事项。

连接到Linux shell (参见[控制台说明](../debug/system_console.md#snapdragon-flight-wiring-the-console)).

### AP模式

如果希望骁龙成为WiFi接入点（AP模式），请编辑文件：`/etc/hostapd.conf`并设置：

```
ssid=EnterYourSSID
wpa_passphrase=EnterYourPassphrase
```

接下来配置AP模式：

```
/usr/local/qr-linux/wificonfig.sh -s softap
reboot
```

### Station模式

如果希望骁龙连接到现有的WiFi，请编辑文件：`/etc/wpa_supplicant/wpa_supplicant.conf`并添加网络设置：

```
network={
    ssid="my existing network ssid"
    psk="my existing password"
}
```

接下来配置station模式：

```
/usr/local/qr-linux/wificonfig.sh -s station
reboot
```


## 故障排除

### adb不工作

- 检查[权限](#usb)
- 确保使用的是可用的Micro-USB电缆。
- 尝试USB 2.0端口。
- 尝试计算机的面板和背板端口。

### USB权限

1) 创建新的权限文件

```
sudo -i gedit /etc/udev/rules.d/51-android.rules
```

粘贴以下内容，这能保证大多数设备的ADB访问：

```
SUBSYSTEM=="usb", ATTRS{idVendor}=="0bb4", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0e79", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0502", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0b05", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="413c", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0489", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="091e", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="18d1", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0bb4", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="12d1", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="24e3", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="2116", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0482", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="17ef", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="1004", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="22b8", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0409", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="2080", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0955", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="2257", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="10a9", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="1d4d", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0471", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="04da", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="05c6", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="1f53", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="04e8", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="04dd", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0fce", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0930", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="19d2", MODE="0666", GROUP="plugdev"
```

为文件设置正确的权限：

```
sudo chmod a+r /etc/udev/rules.d/51-android.rules
```

重新启动守护进程：

```
sudo udevadm control --reload-rules
sudo service udev restart
sudo udevadm trigger
```

如果仍然不工作，查看[StackOverflow上的这个回答](http://askubuntu.com/questions/461729/ubuntu-is-not-detecting-my-android-device#answer-644222).


### 飞控板不能启动/不断重启/变砖

如果仍然可以使用串行控制台连接到飞控板，并获得如下提示：

```
root@linaro-developer:~#
```

输入以下命令进入fastboot（bootloader）模式：

```
reboot2fastboot
```

If the serial console is not possible, you can try to connect the Micro USB cable, and enter:
如果串行控制台不可行，可以尝试连接Micro USB电缆，然后输入：

```
adb wait-for-device && adb reboot bootloader
```

然后重新给飞控板上电。 如果幸运的话，adb会自动连接，并使飞控板进入fastboot模式。

要检查它是否处于快速启动模式，请使用：

```
fastboot devices
```

只要进入fastboot模式，就可以尝试[上面的脚本](#linux)来更新Android/Linux映像。

如果你碰巧有一个[P2板](#do-i-with-a-p1-or-p2-board)，你应该能够通过如下操作将骁龙重置为恢复镜像：短接J3标示附近的两个引脚（这两个引脚在角孔和SD卡插槽之间，并靠近板子边缘），并重新给骁龙上电。

如果一切都失败，那么可能需要向intrinsyc求助。

### 设备上没有剩余空间

又是会导致`make eagle_default upload`上传命令失败：

```
failed to copy 'px4' to '/home/linaro/px4': No space left on device
```

如果ramdumps占用太多空间，则可能会发生这种情况。 清理磁盘：

```
rm -rf /var/log/ramdump/*
```

此外，日志也可能占用太多空间。 要删除它们，请执行以下操作：

```
rm -rf /root/log/*
```

### 未定义的PLT符号

#### _FDtest

如果在尝试启动px4程序时看到mini-dm上有如下输出，则表示需要[更新ADSP固件](#adsp)：

```
[08500/03]  05:10.960  HAP:45:undefined PLT symbol _FDtest (689) /libpx4muorb_skel.so  0303  symbol.c
```

#### 其它

如果您更改了源代码，可能添加了函数，并看到`undefined PLT symbol ...`，这意味着链接失败。

- 函数的声明和定义是否一一对应？
- 代码是否实际编译？模块是否列在[cmake config](https://github.com/PX4/Firmware/blob/master/cmake/configs/qurt_eagle_default.cmake)中？
- 添加的文件是否包含在`CMakeLists.txt`中？
- 尝试将其添加到POSIX构建并运行编译。 POSIX链接器将在编译/链接时显示链接错误。

### 启动时显示krait update param XXX failed

```
ERROR [platforms__posix__px4_layer] krait update param 297 failed
ERROR [platforms__posix__px4_layer] krait update param 646 failed

px4 starting.
ERROR [muorb] Initialize Error calling the uorb fastrpc initalize method..
ERROR [muorb] ERROR: FastRpcWrapper Not Initialized
```

如果在启动px4时遇到上述错误，请尝试：
- [升级Linux镜像](#linux)
- 并且[升级ADSP固件](#adsp)，尝试在本地Linux而不是虚拟机上执行此操作。有[相关报告](https://github.com/PX4/Firmware/issues/5303)指出在虚拟机上执行时不成功。
- 接着[重新构建px4](../setup/building_px4.md#building-px4-software)，这一步需要完全删除现存的固件仓库并重新克隆仓库，[就像这样](../setup/building_px4.md#compiling-on-the-console)
- 最后[重新构建并重新运行](../setup/building_px4.md#qurt--snapdragon-based-boards)
- 确保`/usr/local/qr-linux/q6-admin.sh`的执行位被正确设置：`adb shell chmod +x /usr/local/qr-linux/q6-admin.sh`

### ADSP重启

如果mini-dm控制台突然显示了大量的INIT输出，则ADSP端已经崩溃了。其原因不明显，例如它可以是一些分段错误，空指针异常等。

mini-dm控制台输出通常如下所示：
```
[08500/02]  20:32.332  Process Sensor launched with ID=1   0130  main.c
[08500/02]  20:32.337  mmpm_register: MMPM client for USM ADSP core 12  0117  UltrasoundStreamMgr_Mmpm.cpp
[08500/02]  20:32.338  ADSP License DB: License validation function with id 164678 stored.  0280  adsp_license_db.cpp
[08500/02]  20:32.338  AvsCoreSvc: StartSvcHandler Enter  0518  AdspCoreSvc.cpp
[08500/02]  20:32.338  AdspCoreSvc: Started successfully  0534  AdspCoreSvc.cpp
[08500/02]  20:32.342  DSPS INIT  0191  sns_init_dsps.c
[08500/02]  20:32.342  INIT DONE  0224  sns_init_dsps.c
[08500/02]  20:32.342  Sensors Init : waiting(1)  0160  sns_init_dsps.c
[08500/02]  20:32.342  INIT DONE  0224  sns_init_dsps.c
[08500/02]  20:32.342  THRD CREATE: Thread=0x39 Name(Hex)= 53, 4e, 53, 5f, 53, 4d, 47, 52  0186  qurt_elite_thread.cpp
[08500/02]  20:32.343  THRD CREATE: Thread=0x38 Name(Hex)= 53, 4e, 53, 5f, 53, 41, 4d, 0  0186  qurt_elite_thread.cpp
[08500/02]  20:32.343  THRD CREATE: Thread=0x37 Name(Hex)= 53, 4e, 53, 5f, 53, 43, 4d, 0  0186  qurt_elite_thread.cpp
[08500/02]  20:32.343  THRD CREATE: Thread=0x35 Name(Hex)= 53, 4e, 53, 5f, 50, 4d, 0, 0  0186  qurt_elite_thread.cpp
[08500/02]  20:32.343  THRD CREATE: Thread=0x34 Name(Hex)= 53, 4e, 53, 5f, 53, 53, 4d, 0  0186  qurt_elite_thread.cpp
[08500/02]  20:32.343  THRD CREATE: Thread=0x33 Name(Hex)= 53, 4e, 53, 5f, 44, 45, 42, 55  0186  qurt_elite_thread.cpp
[08500/02]  20:32.343  Sensors Init : ///////////init once completed///////////  0169  sns_init_dsps.c
[08500/02]  20:32.342  loading BLSP configuration  0189  blsp_config.c
[08500/02]  20:32.343  Sensors DIAG F3 Trace Buffer Initialized  0260  sns_init_dsps.c
[08500/02]  20:32.345  INIT DONE  0224  sns_init_dsps.c
[00053/03]  20:32.345  Unsupported algorithm service id 0  0953  sns_scm_ext.c
[08500/02]  20:32.346  INIT DONE  0224  sns_init_dsps.c
[08500/02]  20:32.347  INIT DONE  0224  sns_init_dsps.c
[08500/02]  20:32.347  INIT DONE  0224  sns_init_dsps.c
[08500/02]  20:32.546  HAP:159:unable to open the specified file path  0167  file.c
[08500/04]  20:32.546  failed to open /usr/share/data/adsp/blsp.config  0204  blsp_config.c
[08500/04]  20:32.546  QDSP6 Main.c: blsp_config_load() failed  0261  main.c
[08500/02]  20:32.546  Loaded default UART-BAM mapping  0035  blsp_config.c
[08500/02]  20:32.546  UART tty-1: BAM-9  0043  blsp_config.c
[08500/02]  20:32.546  UART tty-2: BAM-6  0043  blsp_config.c
[08500/02]  20:32.546  UART tty-3: BAM-8  0043  blsp_config.c
[08500/02]  20:32.546  UART tty-4: BAM-2  0043  blsp_config.c
[08500/02]  20:32.546  UART tty-5: BAM N/A  0048  blsp_config.c
[08500/02]  20:32.546  UART tty-6: BAM N/A  0048  blsp_config.c
[08500/02]  20:32.547  HAP:111:cannot find /oemconfig.so  0141  load.c
[08500/03]  20:32.547  HAP:4211::error: -1: 0 == dynconfig_init(&conf, "security")   0696  sigverify.c
[08500/02]  20:32.548  HAP:76:cannot find /voiceproc_tx.so  0141  load.c
[08500/02]  20:32.550  HAP:76:cannot find /voiceproc_rx.so  0141  load.c
```

### P1板还是P2板？

骁龙上的丝印读取如下：

```
1DN14-25-
H9550-P1
REV A
QUALCOMM
```

如果有**H9550**，那意味着这是块P2板！

<span id="do-i-with-a-p1-or-p2-board"></span>
**请忽视之后的-P1.**

推测P1板没有工厂分区/镜像，因此无法恢复出厂状态。