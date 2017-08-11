# Snapdragon Advanced

## Connect to Snapdragon

### Over FTDI

Connect the small debug header shipped with the Snapdragon and the FTDI cable.

On Linux, open a console using:

```
screen /dev/ttyUSB0 115200
```

Change USB0 to whatever it happens to be. Check `/dev/` or `/dev/serial/by-id`.


### Over ADB (Android Debug Bridge)

Connect the Snapdragon over USB2.0 and power it up using the power module.
When the Snapdragon is running the, the LED will be slowly blinking (breathing) in blue.

Make sure the board can be found using adb:

```
adb devices
```

If you cannot see the device, it is most likely a USB device permission issue. Follow the instructions

To get a shell, do:

```
adb shell
```

## Upgrade Snapdragon

For this step the Flight_BSP zip file from Intrynsic is required. It can be obtained after registering using the board serial.

### Upgrading/replacing the Linux image

> **Caution** Flashing the Linux image will erase everything on the Snapdragon. Back up your work before you perform this step!

Make sure the board can be found using adb:

```
adb devices
```

Then, reboot it into the fastboot bootloader:

```
adb reboot bootloader
```

Make sure the board can be found using fastboot:

```
fastboot devices
```

Download the latest BSP from Intrinsyc:

```
unzip Flight_3.1.1_BSP_apq8074-00003.zip
cd BSP/binaries/Flight_BSP_4.0
./fastboot-all.sh
```

It is normal that the partitions `recovery`, `update`, and `factory` will fail.

### Updating the ADSP firmware

Part of the PX4 stack is running on the ADSP (the DSP side of the Snapdragon 8074). The underlying operating system QURT needs to be updated separately.

> **Caution** If anything goes wrong during the ADSP firmware update, your Snapdragon can get bricked! Follow the steps below carefully which should prevent bricking in most cases.

First of all, if you're not already on BSP 3.1.1, [upgrade the Linux image](#upgradingreplacing-the-linux-image)!

#### Prevent bricking

To prevent the system from hanging on boot because of anything wrong with the ADSP firmware, do the following changes before updating:

Edit the file directly on the Snapdragon over `screen` or `adb shell`:
```sh
vim /usr/local/qr-linux/q6-admin.sh
```

Or load the file locally and edit it there with the editor of your choice:

To do this, load the file locally:
```sh
adb pull /usr/local/qr-linux/q6-admin.sh
```

Edit it:

```sh
gedit q6-admin.sh
```

And push it back:

```sh
adb push q6-admin.sh /usr/local/qr-linux/q6-admin.sh
adb shell chmod +x /usr/local/qr-linux/q6-admin.sh
```

Comment out the while loops causing boot to hang:

```
# Wait for adsp.mdt to show up
#while [ ! -s /lib/firmware/adsp.mdt ]; do
#  sleep 0.1
#done
```

and:

```
# Don't leave until ADSP is up
#while [ "`cat /sys/kernel/debug/msm_subsys/adsp`" != "2" ]; do
#  sleep 0.1
#done
```

#### Push the latest ADSP firmware files

Download the file [Flight_3.1.1a_qcom_flight_controller_hexagon_sdk_add_on.zip](http://support.intrinsyc.com/attachments/download/691/Flight_3.1.1a_qcom_flight_controller_hexagon_sdk_add_on.zip) from Intrinsyc.

And copy them on to the Snapdragon:

```
unzip Flight_3.1.1a_qcom_flight_controller_hexagon_sdk_add_on.zip
cd images/8074-eagle/normal/adsp_proc/obj/qdsp6v5_ReleaseG/LA/system/etc/firmware
adb push . /lib/firmware
```

Then do a graceful reboot, so that the firmware gets applied:

```
adb reboot
```


## Serial ports

### Use serial ports

Not all POSIX calls are currently supported on QURT. Therefore, some custom ioctl are needed.

The APIs to set up and use the UART are described in [dspal](https://github.com/PX4/dspal/blob/master/include/dev_fs_lib_serial.h).

## Wifi-settings

> **Todo** These are notes for advanced developers.

Connect to the Linux shell (see [console instructions](../debug/system_console.md#snapdragon-flight-wiring-the-console)).

### Access point mode

If you want the Snapdragon to be a wifi access point (AP mode), edit the file: `/etc/hostapd.conf` and set:

```
ssid=EnterYourSSID
wpa_passphrase=EnterYourPassphrase
```

Then configure AP mode:

```
/usr/local/qr-linux/wificonfig.sh -s softap
reboot
```

### Station mode

If you want the Snapdragon to connect to your existing wifi, edit the file: `/etc/wpa_supplicant/wpa_supplicant.conf` and add your network settings:

```
network={
    ssid="my existing network ssid"
    psk="my existing password"
}
```

Then configure station mode:

```
/usr/local/qr-linux/wificonfig.sh -s station
reboot
```


## Troubleshooting

### adb does not work

- Check [permissions](#usb-permissions)
- Make sure you are using a working Micro-USB cable.
- Try a USB 2.0 port.
- Try front and back ports of your computer.


### USB permissions

1) Create a new permissions file

```
sudo -i gedit /etc/udev/rules.d/51-android.rules
```

paste this content, which enables most known devices for ADB access:

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

Set up the right permissions for the file:

```
sudo chmod a+r /etc/udev/rules.d/51-android.rules
```

Restart the deamon

```
sudo udevadm control --reload-rules
sudo service udev restart
sudo udevadm trigger
```

If it still doesn't work, check [this answer on StackOverflow](http://askubuntu.com/questions/461729/ubuntu-is-not-detecting-my-android-device#answer-644222).


### Board doesn't start / is boot-looping / is bricked

If you can still connect to the board using the serial console and get to a prompt such as:

```
root@linaro-developer:~#
```

You can get into fastboot (bootloader) mode by entering:

```
reboot2fastboot
```

If the serial console is not possible, you can try to connect the Micro USB cable, and enter:

```
adb wait-for-device && adb reboot bootloader
```

Then power cycle the board. If you're lucky, adb manages to connect briefly and can send the board into fastboot.

To check if it's in fastboot mode, use:

```
fastboot devices
```

Once you managed to get into fastboot mode, you can try [above teps](#upgradingreplacing-the-linux-image) to update the Android/Linux image.

If you happen to have a [P2 board](#do-i-have-a-p1-or-p2-board), you should be able to reset the Snapdragon to the recovery image by starting up the Snapdragon while shorting the two pins next to where J3 is written (The two rectangular pins in-between the corner hole and the MicroSD card slot almost at the edge of the board.

If everything fails, you probably need to request help from intrinsyc.


### No space left on device

Sometimes `make eagle_default upload` fails to upload:

```
failed to copy 'px4' to '/home/linaro/px4': No space left on device
```

This can happen if ramdumps fill up the disk. To clean up, do:

```
rm -rf /var/log/ramdump/*
```

Also, the logs might have filled the space. To delete them, do:

```
rm -rf /root/log/*
```

### Undefined PLT symbol

#### _FDtest

If you see the following output on mini-dm when trying to start the px4 program, it means that you need to [update the ADSP firmware](#updating-the-adsp-firmware):

```
[08500/03]  05:10.960  HAP:45:undefined PLT symbol _FDtest (689) /libpx4muorb_skel.so  0303  symbol.c
```

#### Something else

If you have changed the source, presumably added functions and you see `undefined PLT symbol ...` it means that the linking has failed.

- Do the declaration and definition of your function match one to one?
- Is your code actually getting compiled?
Is the module listed in the [cmake config](https://github.com/PX4/Firmware/blob/master/cmake/configs/qurt_eagle_default.cmake)?
- Is the (added) file included in the `CMakeLists.txt`?
- Try adding it to the POSIX build and running the compilation. The POSIX linker will inform you about linking errors at compile/linking time.

### krait update param XXX failed on startup

```
ERROR [platforms__posix__px4_layer] krait update param 297 failed
ERROR [platforms__posix__px4_layer] krait update param 646 failed

px4 starting.
ERROR [muorb] Initialize Error calling the uorb fastrpc initalize method..
ERROR [muorb] ERROR: FastRpcWrapper Not Initialized
```

If you get errors like the above when starting px4, try
- [upgrading the Linux image](#upgradingreplacing-the-linux-image)
- and [updating the ADSP firmware](#updating-the-adsp-firmware). Also try to do this from a native Linux installation instead of a virtual machine. There have been [reports](https://github.com/PX4/Firmware/issues/5303) where it didn't seem to work when done in a virtual machine.
- then [rebuild the px4 software](../setup/building_px4.md#building-px4-software), by first completely deleting your existing Firmware repo and then recloning it [as described here](../setup/building_px4.md#compiling-on-the-console)
- and finally [rebuild and re-run it](../setup/building_px4.md#qurt--snapdragon-based-boards)
- make sure the executable bit of `/usr/local/qr-linux/q6-admin.sh` is set:
  `adb shell chmod +x /usr/local/qr-linux/q6-admin.sh`

### ADSP restarts

If the mini-dm console suddenly shows a whole lot of INIT output, the ADSP side has crashed. The reasons for it are not obvious, e.g. it can be some segmentation fault, null pointer exception, etc..

The mini-dm console output typically looks like this:

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

### Do I have a P1 or P2 board?

The silkscreen on the Snapdragon reads something like:

```
1DN14-25-
H9550-P1
REV A
QUALCOMM
```

If you see **H9550**, it means you have a P2 board!

**Please ignore that it says -P1.**

Presumably P1 boards don't have a factory partition/image and therefore can't be restored to factory state.
