# ATL Mantis EDU

:::warning
The ATL Mantis EDU is currently work in progress. Use with caution.
:::

*ATL Mantis EDU* is the ready-to-fly [Yuneec Mantis G](https://shop.yuneec.com/eu/camera-drones/mantis-g/mantis-g/) vehicle that has been firmware-updated to run "vanilla" PX4 and MAVLink-compatible [camera](https://mavlink.io/en/services/camera.html)/[gimbal](https://mavlink.io/en/services/gimbal_v2.html) firmware.

The updated vehicle is an ideal education platform for developing and testing [MAVSDK](https://mavsdk.mavlink.io/) applications that can run effectively on a ground station (_Mantis-G_ does not have an onboard companion computer). It can also be used for developing and testing PX4 autopilot software, including optical flow.

:::warning
Restoring the original Yuneec vehicle firmware is not possible.
:::

## Purchase

The ATL Mantis EDU version will be released soon. TODO: add purchase link

## Hardware Overview

The Mantis broadly features the following hardware components:
- Autopilot/FMU based on STM32F7.
- Gimbal controller.
- Camera system on a chip with WiFi (forwards MAVLink messages from autopilot and gimbal via Wifi)
- Downward-facing flow module with laser range sensor.

## Update Mantis EDU

The files to update the Mantis can currently be found on [GoogleDrive](https://drive.google.com/drive/u/1/folders/1LXW66IBGc_SgGLmk0ltl3R8IQYYVUvtz).

Files include:
1. **camera.bin**: Camera firmware
2. **gimbal.yuneec**: Gimbal firmware
3. **autopilot-bootloader.px4**: Autopilot firmware to update bootloader (only to be used during first update).
4. **autopilot.px4**: Autopilot firmware
5. **update.lzo**: RC firmware

### Initial complete update

When starting off with a "stock" Yuneec Mantis G, you need to do an initial complete update of all components in the order below! These steps are required in order to unlock the drone and allow flashing custom PX4 builds. Furthermore the new bootloader is more robust and prevents the drone from being bricked should a bad custom PX4 build be flashed.

:::note
During the initial update you need to update the PX4 bootloader! Use **autopilot-bootloader.px4** before **autopilot.px4**.
:::

:::warning
Before being able to flash px4 updates to the Mantis, its camera firmware needs to be updated first. The camera will not update if a autopilot.px4 file is already on the SD card!
:::

#### Update Camera

1. Place camera image **camera.bin** on the SD card.
2. Power up the drone. It will reboot and update automatically.
3. Wait until the WiFi re-appears and re-connect.

If the camera has been updated successfully, the file will be removed from the SD card automatically.

#### Update Gimbal

1. Place the gimbal image **gimbal.yuneec** on the SD card.
2. Power up the drone. The gimbal will be automatically updated.
3. After the update, you might hear a faint beep as the gimbal starts up again.

:::note
The file on the SD card will be renamed to **gimbal.yuneec.updated** if the update was successful. If not, you should find a file **gimbal_update.log** with more details.
:::

#### Update Autopilot Bootloader

:::warning
This is only required once for the initial update.
:::

1. Place the **autopilot-bootloader.px4** file on the SD card.
2. Power up the drone. The autopilot will be automatically updated.
3. After the update, you should hear PX4 starting up, then another double beep, followed by a positive/success beep. This means the bootloader has been updated.

:::note
The file on the SD card will be renamed to **autopilot-bootloader.px4.updated** if the update was successful. If not, you should find a file **autopilot-bootloader_update.log** with more details.
:::

#### Update Autopilot (PX4)

1. Place the **autopilot.px4** file on the SD card.
2. Power up the drone. The autopilot will be automatically updated.
3. After the update, you should hear PX4 starting up by the usual beeps.

:::note
The file on the SD card will be renamed to **autopilot.px4.updated** if the update was successful. If not, you should find a file **autopilot_update.log** with more details.
:::

#### Update Remote Control

1. Place the **update.lzo** file on a USB flashdrive. An SD card in a USB card reader also works. In both cases the flash medium needs to be FAT32 formatted.
2. Plug the USB stick into the USB-A (not USB-C) port of the RC.
3. Power on the RC by long pressing the power button and letting go once the battery LEDs are solid or you hear the three startup beeps.
4. Wait for the blue LED to be solid or blinking. This means the RC has finished booting.
5. Hold the round Home/RTL button (on the left) pressed while pressing the photo button (top right shoulder) quickly 4 times within 2 seconds.
6. Release the Home/RTL button when you hear a beep. The RC will beep while applying the update.
7. Once the beeping stops with a positive tone (after about 90 seconds), the RC reboots automatically.

:::note
Unlike on the Mantis, the **update.lzo** file is not removed or renamed on the USB stick after updating the RC.
:::

## Developing PX4 Firmware

### Build the PX4 Firmware

To build PX4 for the Mantis, use the make command:
```
make atl_mantis-edu
```

### Upload/flash the PX4 Firmware

There are two ways to update the firmware:

#### Upload while connected to the Mantis' WiFi:

The firmware will be uploaded to the SD-card over http using curl:
```
make atl_mantis-edu upload_wifi
```

:::note
Make sure to have an SD card inserted for this.
:::

#### Upload using the SD card

The built firmware can be found in `build/atl_mantis-edu_default/atl_mantis-edu_default.px4`.

To update the vehicle with this firmware: rename the file to **autopilot.px4**, copy it to root of the SD card, and restart the vehicle (as described above).


## Using MAVSDK with the Mantis

By default MAVSDK connects via MAVLink on UDP port 14540. This port is configured for the Mantis, so MAVSDK examples and tests should mostly work out of the box.

TODO: Add more detailed tutorial how to use MAVSDK with the Mantis.

## Connection

You can either connect to the drone using WiFi, or using a USB cable connected to the remote control. The latter part is work in progress.

You can also access the SD card and the internal storage by connecting to the drone using a USB-C cable. Note that the WiFi will be switched off when USB is connected.

### MAVLink Connection

MAVLink traffic is sent via Wifi on 3 different ports:

1. UDP port 14550: to QGC default auto-connect.
2. UDP port 14540: to SDK (MAVSDK, MAVROS) default connection.
3. UDP port 14530: to RC controller.

### HTTP connection

#### Download Photos/Videos from Internal Storage or SD Card

There is an HTTP server running on 192.168.42.1 that you can use to view or download the media files.

#### Upload Files to SD Card

You can upload files to the SD card when connected to the WiFi of the drone.

The command to upload a file is:
```sh
curl -F "image=@$HOME/path/to/file.ext" -H "Expect:" http://192.168.42.1/cgi-bin/upload
```

For bigger (multi-part) upload, use:
```sh
curl -F "image=@$HOME/path/to/big-file.ext" -H "Expect:" -H "File-Size: $(stat -c%s $HOME/path/to/big-file.ext)" http://192.168.42.1/cgi-bin/upload
```

### RTSP Connection

Video is streamed at 1280x720 at 30 Hz over RTSP. QGC should connect automatically, as Mantis broadcasts the stream parameters using the [VIDEO_STREAM_INFORMATION](https://mavlink.io/en/messages/common.html#VIDEO_STREAM_INFORMATION) MAVLink message.

If you want to connect manually, you can do so on `rtsp://192.168.42.1:554/live`.


## Troubleshooting/FAQ

### MAVLink and the camera don't connect even though WiFi is connected

Try resetting the camera by pressing a paperclip into the small hole above the SD card slot for 5 seconds. The camera should reboot and reset some of its internal settings.

### Why does it take over a minute for the WiFi / connection to appear?

The Mantis uses DFS channels on 5 GHz. In order to be allowed to use these channels, the wifi module needs to listen on these frequency bands for some time to make sure they are not occupied by radars, and other official users. Once it is verified that the bands are unoccopied, the WiFi will start.

TODO: check if this is required in the US

### The WiFi does not come up

If the WiFi does not come up after a minute or so, the most common cause is that USB is connected (you can either connect WiFi or USB, but not both at the same time).

### The beeps/sound are not working during flight

The beeps are generated by the motors. Therefore, if the motors are spinning, it's not possible to generate beeps.

### How can I switch between the internal storage and the SD card?

The primary storage can be selected in QGC. Connect to drone via WiFi, start QGC, and go to the camera settings (gear icon next to camera buttons on the right of the screen). There, you should find the option to select the storage.

### Can I upload the PX4 firmware by connecting over USB?

No, this is not possible, unless you have a special cable.

You can however, copy the `build/atl_mantis-edu_default/atl_mantis-edu_default.px4` file on SD card and rename it to `autopilot.px4`. If you then power up the Mantis, it will flash the file automatically.

## What is open-source?

- The PX4 firmware is open-source.
- The camera is proprietary but implementing the [MAVLink camera protocol](https://mavlink.io/en/services/camera.html) and [MAVLink camera definition](https://mavlink.io/en/services/camera_def.html).
- The gimbal is proprietary but implementing the [MAVLink gimbal v2 protocol](https://mavlink.io/en/services/gimbal_v2.html).
- The flow module is proprietary communicating via MAVLink.

## How to get help/technical support?

For hardware issues, please contact TODO: add vendor.

Please get in contact with [Alessandro](https://px4.slack.com/team/UA8EJMGA3) on [PX4 slack](https://slack.px4.io/).

