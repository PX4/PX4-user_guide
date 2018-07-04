# PX4FLOW Smart Camera

PX4FLOW is an optical flow smart camera (it provides the image for setup purposes, but it not designed to capture images like a webcam). It has a native resolution of 752x480 pixels and calculates optical flow on a 4x binned and cropped area at 400 Hz, giving it a very high light sensitivity. 

![PX4Flow v1.0](../../assets/hardware/sensors/px4flow/px4flow_v1.0_top_generated.png)

Unlike many mouse sensors, it also works indoors and in low outdoor light conditions without the need for an illumination LED. It can be freely reprogrammed to do any other basic, efficient low-level computer vision task.

* 168 MHz Cortex M4F CPU (128 + 64 KB RAM)
* 752x480 MT9V034 image sensor, L3GD20 3D Gyro
* 16 mm M12 lens (IR block filter)
* Size 45.5 mm x 35mm
* Power consumption 115mA / 5V

{% youtube %}
https://youtu.be/0Jpq6DU_HVg
{% endyoutube %}


## Where to Buy

Order this module from:

* [Unmanned Tech](http://www.unmannedtechshop.co.uk/px4flow-smart-camera-optical-flow-sensor/) (UK)
* [Holybro](https://shop.holybro.com/px4flow-kit_p1035.html) (Germany & EU)
* [Drotek](https://drotek.com/shop/en/distance/798-optical-flow-kit-px4flow.html)

If out of stock the software-compatible, but not connector-compatible version can be used:

* [PX4FLOW with Molex connectors](http://www.hobbyking.com/hobbyking/store/__66308__HK_Pilot32_Optical_Flow_Kit_With_Sonar.html)

## Specifications

* MT9V034 machine vision CMOS sensor with global shutter
* Optical flow processing at 4x4 binned image at **400 Hz**
* Superior light sensitivity with 24x24 μm super-pixels
* Onboard 16bit gyroscope up to 2000°/s and 780 Hz update rate, default high precision-mode at 500°/s
* Onboard sonar input and mount for [Maxbotix sonar sensors](../sensor/rangefinders.md#maxbotix-i2cxl-maxsonar-ez). (HRLV-EZ4 recommended, [SparkFun Product Link](https://www.sparkfun.com/products/11309))
* USB bootloader
* USB serial up to 921600 baud (including live camera view with [QGroundControl](http://qgroundcontrol.com/))
* USB power option
* **Does fit the MatrixVision Bluefox MV mounting holes (camera center off-centered)**

![PX4Flow Top](../../assets/hardware/sensors/px4flow/px4flow_top.jpg) ![px4flow-bottom](../../assets/hardware/sensors/px4flow/px4flow_bottom.jpg) 


# Pixhawk Setup

> **Note** Applies to all PX4 FMU versions, including all versions of Pixhawk.

- Update the firmware on PX4Flow using *QGroundControl* (in the top left menu, click on CONFIG, then on Firmware Upgrade)
- Connect PX4Flow I2C to the Pixhawk I2C

The module will be detected on boot, flow data should be coming through at 10Hz if the autopilot is connected via **USB**. 
Flow data is transmitted via wireless at a lower rate.

## Orientation

The default orientation (meaning: zero rotation) is defined as Y on flow board pointing towards **front of vehicle** as shown in the following picture.

![PX4Flow align with Pixhawk](../../assets/hardware/sensors/px4flow/px4flowalignwithpixhawk.jpg)


The orientation of PX4Flow can be set using the parameter [SENS_FLOW_ROT](https://docs.px4.io/en/advanced_config/parameter_reference.html#SENS_FLOW_ROT)

> **Warning** This parameter can only be applied to PX4 flight stack and is **not** part of the sensor itself settings


## Wiring

It is highly recommended to use twisted / shielded I2C wires to minimize radiated noise ([I2C spec](http://www.nxp.com/documents/user_manual/UM10204.pdf)). From the spec:

If the bus lines are twisted-pairs, each bus line must be twisted with a VSS return. Alternatively, the SCL line can be twisted with a VSS return, and the SDA line twisted with a VDD return. In the latter case, capacitors must be used to decouple the VDD line to the VSS line at both ends of the twisted pairs.
If the bus lines are shielded (shield connected to VSS), interference is minimized. However, the shielded cable must have low capacitive coupling between the SDA and SCL lines to minimize crosstalk.



## I2C

The 7 Bit **I2C Address** of the Flow Module is user selectable. Using the solder jumpers on the back of the flow board you can add an offset to the baseaddress 0x42. The address range for the 8 possible choices is: 0x42 - 0x49.

Address | Bit 2 | Bit 1 | Bit 0
--- | --- | --- | ---
7 Bit Address 0x42 (default)|  0  |  0  |  0
7 Bit Address 0x43|  0  |  0  |  1
 :  |  :  |  :  |  :
7 Bit Address 0x49 |  1  |  1  |  1

> **Tip** There are different I2C readouts available. For details check the description of the **I2C frame** and the **I2C integral frame**.

The **I2C frame** contains 22 bytes of data in the following order:

Register Address | Register Content
--- | ---
0x00 (0) |  Framecounter lower byte
0x01 (1) |  Framecounter upper byte
0x02 (2) |  latest Flow*10 in x direction lower byte
0x03 (3) |  latest Flow*10 in x direction upper byte
 :  |  :
0x13 (19)|  Sonar Timestamp
0x14 (20)|  Grounddistance lower byte
0x15 (21)|  Grounddistance upper byte

22 Byte Data Packet (send 0x0 to PX4FLOW module and receive back 22 Bytes data, internal address auto increments)

```cpp
typedef struct i2c_frame
{
    uint16_t frame_count;// counts created I2C frames [#frames]
    int16_t pixel_flow_x_sum;// latest x flow measurement in pixels*10 [pixels]
    int16_t pixel_flow_y_sum;// latest y flow measurement in pixels*10 [pixels]
    int16_t flow_comp_m_x;// x velocity*1000 [meters/sec]
    int16_t flow_comp_m_y;// y velocity*1000 [meters/sec]
    int16_t qual;// Optical flow quality / confidence [0: bad, 255: maximum quality]
    int16_t gyro_x_rate; // latest gyro x rate [rad/sec]
    int16_t gyro_y_rate; // latest gyro y rate [rad/sec]
    int16_t gyro_z_rate; // latest gyro z rate [rad/sec]
    uint8_t gyro_range; // gyro range [0 .. 7] equals [50 deg/sec .. 2000 deg/sec] 
    uint8_t sonar_timestamp;// time since last sonar update [milliseconds]
    int16_t ground_distance;// Ground distance in meters*1000 [meters]. Positive value: distance known. Negative value: Unknown distance
} i2c_frame;
```

The **I2C integral frame** contains 25 bytes of data in the following order:

Register Address | Register Content
--- | ---
0x16 (22) |  Framecounter since last I2C readout lower byte
0x17 (23) |  Framecounter since last I2C readout upper byte
0x18 (24) |  Accumulated flow in radians*10000 around x axis since last I2C readout lower byte
0x19 (25) |  Accumulated flow in radians*10000 around x axis since last I2C readout upper byte
 :  |  :
0x22 (34) |  Accumulation timespan in microseconds since last I2C readout byte 0
0x23 (35) |  Accumulation timespan in microseconds since last I2C readout byte 1
0x24 (36) |  Accumulation timespan in microseconds since last I2C readout byte 2
0x25 (37) |  Accumulation timespan in microseconds since last I2C readout byte 3
 :  |  :
0x2A (42)|  Grounddistance in meters*1000 lower byte
0x2B (43)|  Grounddistance in meters*1000 upper byte
0x2C (44)|  Temperature in Degree Celsius*100 lower byte
0x2D (45)|  Temperature in Degree Celsius*100 upper byte
0x2E (46)|  Averaged quality of accumulated flow values


25 Byte Data Packet (send 0x16 (22) to PX4FLOW module and receive back 25 Bytes data, internal address auto increments)

```cpp
typedef struct i2c_integral_frame
{
    uint16_t frame_count_since_last_readout;//number of flow measurements since last I2C readout [#frames]
    int16_t pixel_flow_x_integral;//accumulated flow in radians*10000 around x axis since last I2C readout [rad*10000]
    int16_t pixel_flow_y_integral;//accumulated flow in radians*10000 around y axis since last I2C readout [rad*10000]
    int16_t gyro_x_rate_integral;//accumulated gyro x rates in radians*10000 since last I2C readout [rad*10000] 
    int16_t gyro_y_rate_integral;//accumulated gyro y rates in radians*10000 since last I2C readout [rad*10000] 
    int16_t gyro_z_rate_integral;//accumulated gyro z rates in radians*10000 since last I2C readout [rad*10000] 
    uint32_t integration_timespan;//accumulation timespan in microseconds since last I2C readout [microseconds]
    uint32_t sonar_timestamp;// time since last sonar update [microseconds]
    int16_t ground_distance;// Ground distance in meters*1000 [meters*1000]
    int16_t gyro_temperature;// Temperature * 100 in centi-degrees Celsius [degcelsius*100]
    uint8_t quality;// averaged quality of accumulated flow values [0:bad quality;255: max quality]
} __attribute__((packed)) i2c_integral_frame;
```

## Accuracy

The ortho photo below shows that a flight on the park roads is accurately measured. 
This was done with a PX4FMU on a 7" quad flying at about 1.6 m altitude in manual flight. No GPS, only PX4FLOW integration of position.

![PX4FLOW trajectory](../../assets/hardware/sensors/px4flow/px4flow_trajectory.jpg)


## Downloads

### Manual and Schematics

* [PX4FLOW v1.3 User Manual](https://github.com/PX4/px4_user_guide/raw/master/assets/hardware/sensors/px4flow/px4flow_manual_v1.3.pdf)
* [PX4FLOW v1.3 Schematic and Layout](https://github.com/PX4/px4_user_guide/raw/master/assets/hardware/sensors/px4flow/px4flow_schematic_v1.3.pdf) 
* Documentation in hardware repo: [PX4/Hardware/FLOWv1](https://github.com/PX4/Hardware/tree/master/FLOWv1)

### USB Driver

Linux and MacOS come with the required drivers. Windows drivers can be downloaded from: [px4flow_win_drivers.zip](https://github.com/PX4/px4_user_guide/raw/master/assets/hardware/sensors/px4flow/px4flow_win_drivers.zip)

### Papers

The flow module as been accepted as paper to the International Conference on Robotics and Automation (ICRA 2013) in Karlsruhe, Germany. 

* Dominik Honegger, Lorenz Meier, Petri Tanskanen and Marc Pollefeys.* [An Open Source and Open Hardware Embedded Metric Optical Flow CMOS Camera for Indoor and Outdoor Applications](https://github.com/PX4/px4_user_guide/raw/master/assets/hardware/sensors/px4flow/px4flow_paper.pdf)


### Libraries

The following are third party libraries that can be used to integrate the flow module in your projects.

* [mavros](https://github.com/vooon/mavros): A general MAVLink ROS interface, maintained by Vladimir Ermakov
* [px-ros-pkg]](https://github.com/cvg/px-ros-pkg): A PX4FLOW ROS (Robot Operating System) interface, maintained by Lionel Heng (hengli@inf.ethz.ch).
* [arduino-px4flow-i2c](https://github.com/eschnou/arduino-px4flow-i2c): An Arduino library wrapping the I2C interface, maintained by Laurent Eschenauer (laurent@eschenauer.be).
  
  
## Connectors

- **USART2 (J2)**: Hirose DF13 6 pos ([Digi-Key Link: DF13A-6P-1.25H(20)](http://search.digikey.com/scripts/DkSearch/dksus.dll?WT.z_header=search_go&lang=en&site=us&keywords=DF13A-6P-1.25H%2820%29&x=0&y=0))
  - Mates: Hirose DF13 6 pos housing ([Digi-Key Link: Hirose DF13-6S-1.25C](http://search.digikey.com/us/en/products/DF13-6S-1.25C/H2182-ND/241752))
- **USART3 (J1)**: Hirose DF13 6 pos ([Digi-Key Link: DF13A-6P-1.25H(20)](http://search.digikey.com/scripts/DkSearch/dksus.dll?WT.z_header=search_go&lang=en&site=us&keywords=DF13A-5P-1.25H%2820%29&x=0&y=0))
  -  Mates: Hirose DF13 6 pos housing ([Digi-Key Link: Hirose DF13-6S-1.25C](http://search.digikey.com/us/en/products/DF13-5S-1.25C/H2182-ND/241752))
- **I2C1 (J3)**: Hirose DF13 4 pos ([Digi-Key Link: DF13A-4P-1.25H(20)](http://search.digikey.com/scripts/DkSearch/dksus.dll?WT.z_header=search_go&lang=en&site=us&keywords=DF13A-4P-1.25H%2820%29&x=0&y=0))
  - Mates: Hirose DF13 4 pos housing ([Digi-Key Link: Hirose DF13-4S-1.25C](http://search.digikey.com/us/en/products/DF13-4S-1.25C))
- **USB (J5)**: Micro USB-B
  - Mates: Cell phone data / charger cables, e.g. [Digi-Key Link: ASSMANN AK67421-0.5-R](http://search.digikey.com/us/en/products/AK67421-0.5-R/AE10418-ND/2263977)
- **ARM MINI JTAG (J6**, //not populated per default//**)**: 1.27 mm 10pos header (SHROUDED, for Black Magic Probe: Samtec FTSH-105-01-F-DV-K or (untested) or Harwin M50-3600542 ([Digikey](http://www.digikey.com/product-detail/en/M50-3600542/952-1389-ND/2264370) or [Mouser](http://ch.mouser.com/ProductDetail/Harwin/M50-3600542/?qs=%2fha2pyFadujTt%2fIEz8xdzrYzHAVUnbxh8Ki%252bwWYPNeEa09PYvTkIOQ%3d%3d))
  - JTAG Adapter Option #1: [BlackMagic Probe](http://www.blacksphere.co.nz/main/blackmagic), comes without cables, needs the **Samtec FFSD-05-D-06.00-01-N** cable ([Samtec sample service](http://www.samtec.com/suddenservice/samples/samples.aspx) or [Digi-Key Link: SAM8218-ND](http://www.digikey.com/product-search/en?x=0&y=0&lang=en&site=us&KeyWords=FFSD-05-D-06.00-01-N)) and a Mini-USB cable
  - JTAG Adapter Option #2: [Digi-Key Link: ST-LINK/V2](http://search.digikey.com/us/en/cat/programmers-development-systems/in-circuit-programmers-emulators-and-debuggers/2621880?k=st%20link%20v2) / [ST USER MANUAL](http://www.st.com/internet/com/TECHNICAL_RESOURCES/TECHNICAL_LITERATURE/USER_MANUAL/DM00026748.pdf), needs an ARM Mini JTAG to 20pos adapter: [Digi-Key Link: 726-1193-ND](http://search.digikey.com/us/en/products/MDL-ADA2/726-1193-ND/1986451)
    * JTAG Adapter Option #3: [SparkFun Link: Olimex ARM-TINY](http://www.sparkfun.com/products/8278) or any other OpenOCD-compatible ARM Cortex JTAG adapter, needs an ARM Mini JTAG to 20pos adapter: [Digi-Key Link: 726-1193-ND](http://search.digikey.com/us/en/products/MDL-ADA2/726-1193-ND/1986451)

### Optics

The correct optics are delivered by 3D Robotics already mounted and focused.

* [Lens mount](http://www.lensation.de/de/shop/detail/27-accessories/flypage/418-s-mount-lens-holder-13mm-sh02m13.html?sef=hcfp)
* 16 mm M12 (S-mount) lens (with IR-cut filter)


The focal length influences the maximum measurable velocity. 

```
maximum velocity = +/- 4 pixels / (1second/internalupdaterate)*grounddistance/focal length in pixels
```

The internal update rate is 400 Hz.

pixelsize is 24 micro meters, a 16mm lens has therefore a focal length of 0.016 meter / 24 micro meter per pixel = 666.666 pixels

Max velocities for different focal length lenses and ground distances:


Ground distance | 1m | 3m | 10m
--- | --- | --- | ---
16mm lens | 2.4m/s |  7.2m/s |  24m/s
8mm lens  | 4.8m/s  | 14.4m/s   | 48m/s
6mm lens  |  6.4m/s  |  19.2m/s  |  64m/s
4mm lens  |  9.6m/s  |  28.8m/s  |  96m/s

```
max_vel = 4/(1/400)*grounddistance/(focallength/0.000024)
```


## Configuration: Image Quality and Output 

PX4FLOW is not designed as a camera, but does all processing on-chip. You can configure the image quality and output (the image output is only intended for focusing the lens).

![Video Downlink](../../assets/hardware/sensors/px4flow/qgc_video_downlink_px4flow.jpg)

  - Download [QGroundControl](http://qgroundcontrol.com/#downloads)
  - Unplug your flow sensor
  - In *QGroundControl*, click on **Configuration > Firmware Update**. Hit the big green **Scan** button.
  - Connect the flow sensor. Click on upgrade once its detected (leave the default to “stable”)
  - Maximize the *QGroundControl* window. Click on **Tool Widgets > Video Downlink**
  - Enjoy the live view and **focus the camera by loosening the locking screw and turning the lens at an object at 3m distance**.
  - If you want to get higher res to focus the sensor, go to **Config > Advanced Config** and set the [VIDEO_ONLY](#VIDEO_ONLY) parameter to 1.
  
  
## General Troubleshooting

* Unplug the flow sensor if plugged
* Start *QGroundControl*, select the PX4 startup mode go to **Config > Firmware Upgrade**.
  * Click on SCAN (green button in the center)
  * Connect the flow sensor now
  * Flash the stable firmware
* Click on **Advanced Config** in the left menu to see the parameters
* Display the video stream with QGroundControl (**Tool Widgets > Video Downlink**)
  * Check that there are no stripes on the stream. If you get stripes, set `IMAGE_TEST_PAT` to 1. It should look like the examples above. If you have stripes in the image but no stripes when this mode is enabled, right-click into the image once in both modes and save and send an image of each mode to the manufacturer's support team.
  * Check that you get a clear image (its a tele / zoom lens, so the visible area will be small)
* Set the `VIDEO_ONLY` parameter to 1 to obtain a higher resolution image.
* Check that the image is sharp at the operating distance (the typical flight altitude)

  > **Tip** [Ask for help](../README.md#support) if you have a distorted image with visible dark lines (like the one below):
    ![Distorted video](../../assets/hardware/sensors/px4flow/px4flow_video_distorted.png)

  

# PX4FLOW Developer Guide {#developer_guide}

## Hardware Setup

* PX4FLOW Board v1.3
* HRLV-MaxSonar-EZ (MB1043)
* 16mm Lens
* Micro USB cable


![PX4FLOW Testing](../../assets/hardware/sensors/px4flow/px4flow_testing.jpg)


## Software / Build Source

* PC with *QGroundControl* installed
* PX4FLOW Firmware (Firmware source code on Github: [PX4/Flow](https://github.com/PX4/Flow))

> **Note** PX4 *driver* code can be found here: [PX4/Firmware/src/drivers/px4flow](https://github.com/PX4/Firmware/tree/master/src/drivers/px4flow)

## Build

Install the [PX4 toolchain](https://dev.px4.io/en/setup/dev_env.html) (PX4 Developer Guide). 
Then and clone the sources from https://github.com/PX4/Flow using *git*.

```bash
cd flow
make all
make upload-usb
```

Then connect the flow sensor. It should show these steps on a successful upload:

```bash
Found board 6,0 bootloader rev 3 on /dev/ttyACM1
erase...
program...
verify...
done, rebooting.
```

## Troubleshooting

In case one doesn't see the aforementioned steps, the modem-manager should be removed by:

```bash
sudo apt-get remove modemmanager
```

User also needs to be in the plugdev group:

```bash
sudo usermod -a -G plugdev $USER
```

## Focus Image

Connect PX4FLOW to QGroundcontrol:
 
- Connect PX4FLOW sensor over USB to PC
- Open QGroundcontrol
- Switch to Plot perspective: Perspectives/Plot 
- Connect to PX4FLOW sensor: Communication/Add Link

![PX4 Onboard Parameters](../../assets/hardware/sensors/px4flow/px4flow_onboard_parameters.png)

* Link Type: Serial
* Protocol: MAVLink
* Serial Port: corresponding Port (e.g. /dev/ttyACM* or COMM*)

Now a new Unmanned System should appear and Onboard Parameters are loaded (click on "Get" if not)

Change Parameter `VIDEO_ONLY` to 1 and press Set.

The Widget Video Downlink shows now the Image in full resolution. Focus the lens on 1.5m. Fix the lens position and switch `VIDEO_ONLY` Mode off.


## Data Output

The PX4FLOW module outputs [MAVLink](https://mavlink.io/en/) packets on USB and serial port. Use [QGroundControl](http://qgroundcontrol.com/) to read data from the module. An I2C interface for sensor data reading is offered as well. Third party [libraries](#libraries) are available to connect and integrate PX4FLOW data in your projects.

* USART3: MAVLink at 115200, 8N1 baud: [OPTICAL_FLOW](https://mavlink.io/en/messages/common.html#OPTICAL_FLOW) message, [OPTICAL_FLOW_RAD](https://mavlink.io/en/messages/common.html#OPTICAL_FLOW_RAD), [HEARTBEAT](https://mavlink.io/en/messages/common.html#HEARTBEAT) message
* USB: Baud rate is not relevant (USB ignores it): `OPTICAL_FLOW` message, `OPTICAL_FLOW_RAD`, `HEARTBEAT` message, image.
* I2C1: latest Flow value (i2c_frame) and accumulated Flow (i2c_integral_frame) values since last I2C readout available for readout.


## PX4FLOW Parameters

The following list gives a short explanation of the current available parameters in the PX4FLOW firmware.

> **Caution** Parameters are currently not written to ROM (reset at power loss).

### BFLOW_F_THRD
This parameter is a feature threshold and limits the quality of patterns that are used to calculate the bottom flow. For low values (e.g. 10) almost every pattern is taken, for higher values (e.g. 100) only significant patters are taken.

### BFLOW_V_THRD 
This is a pattern correlation threshold for filtering bad matches. Lower means only strong correlations are accepted.


### Others


Name | Default | Access| Comment
--- | --- | --- | ---
BFLOW_F_THLD    | 30     | RW      | This parameter is a feature threshold and limits the quality of patterns that are used to calculate the bottom flow. For low values (e.g. 10) almost every pattern is taken, for higher values (e.g. 100) only significant patters are taken.
BFLOW_V_THLD    | 5000       | RW      | This is a pattern correlation threshold for filtering bad matches. Lower means only strong correlations are accepted.
BFLOW_HIST_FIL  | 0        | RW      | 1: Flow histogram filter is ON, 0: OFF
BFLOW_GYRO_COM  | 1        | RW      | 1: Gyro compensation is ON, 0: OFF
BFLOW_LP_FIL    | 0        | RW      | 1: Lowpass filter on flow output is ON, 0: OFF
BFLOW_W_NEW     | 0.3      | RW      | Flow lowpass filter gain
DEBUG           | 1        | RW      | 1: Debug messages ON, 0: OFF
GYRO_SENS_DPS   | 250      | RW      | Gyroscope sensitivity: 250, 500, 2000 (dps)
GYRO_COMP_THR   | 0.01     | RW      | Gyro compensation threshold (dps): Gyro data lower than this threshold is not compensated to prevent drift
IMAGE_WIDTH     | 64       | R       | Image width (pixels)
IMAGE_HEIGHT    | 64       | R       | Image height (pixels)
IMAGE_L_LIGHT   | 0        | RW      | 1: Image sensor low light mode ON, 0: OFF
IMAGE_NOISE_C   | 1        | RW      | 1: Image sensor noise correction ON, 0: OFF
IMAGE_TEST_PAT  | 0        | RW      | 1: Gray-shaded test pattern mode ON, 0: OFF
LENS_FOCAL_LEN  | 16       | RW      | Focal length of lens (mm) |
POSITION        | 0        | RW      | 0: Only position 0 is used (Bottom: 0, Front: 1, Top: 2, Back: 3, Right: 4, Left: 5)
SONAR_FILTERED  | 0        | RW      | 1: Kalman filter on sonar output is ON, 0: OFF
SONAR_KAL_L1    | 0.8461   | RW      | Sonar Kalman gain L1
SONAR_KAL_L2    | 6.2034   | RW      | Sonar Kalman gain L2
SYS_ID          | 81       | RW      | [MAVLink](https://mavlink.io/en/) System ID
SYS_COMP_ID     | 50       | RW      | [MAVLink](https://mavlink.io/en/) Component ID
SYS_SENSOR_ID   | 77       | RW      | [MAVLink](https://mavlink.io/en/) Sensor ID
SYS_TYPE        | 0        | RW      | [MAVLink](https://mavlink.io/en/) System Type
SYS_AP_TYPE     | 1        | RW      | [MAVLink](https://mavlink.io/en/) Autopilot Type
SYS_SW_VER      | 13XX     | R       | Software Version
SYS_SEND_STATE  | 1        | RW      | 1: Send [MAVLink](https://mavlink.io/en/) Heartbeat, 0: Not
USART_2_BAUD    | 115200   | R       | Baudrate USART 2
USART_3_BAUD    | 115200   | R       | Baudrate USART 3 (Data Output)
USB_SEND_VIDEO  | 1        | RW      | 1: Send video over USB, 0: Not
USB_SEND_FLOW   | 1        | RW      | 1: Send flow over USB, 0: Not
USB_SEND_GYRO   | 1        | RW      | 1: Send gyro data over USB, 0: Not
USB_SEND_FWD    | 0        | RW      | 1: Send forwarded flow over USB, 0: Not
USB_SEND_DEBUG  | 1        | RW      | 1: Send debug msgs over USB, 0: Not
VIDEO_RATE      | 150      | RW      | Time in milliseconds between images of video transmission
VIDEO_ONLY      | 0        | RW      | 1: High resolution video mode is ON, 0: OFF



## Modes

### VIDEO ONLY Mode {#VIDEO_ONLY}

Set `VIDEO_ONLY` to 1 for high resolution mode. In this mode the camera image is transmitted at a higher resolution to ease the lens focus process. No flow values are calculated in this mode.

###  Low Light Mode
If `IMAGE_L_LIGHT` is set to 1, the sensor operates in low light mode.

> **Note** This mode is under construction, and results are more noisy

###  Test Pattern Mode

If the parameter IMAGE_TEST_PAT is set to 1, the sensor inserts a vertical gray-shaded test pattern in the signal chain. 
* Test Pattern 64x64 (VIDEO ONLY Mode is OFF)
  ![test_pattern_64x64](../../assets/hardware/sensors/px4flow/test_pattern_64x64.png)
* Test Pattern 376x240 (VIDEO ONLY Mode is ON)
  ![test_pattern_376x240](../../assets/hardware/sensors/px4flow/test_pattern_376x240.png)

