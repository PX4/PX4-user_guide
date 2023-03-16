# Raspberry Pi Companion with Pixhawk

This topic describes how to setup a Raspberry Pi ("RPi") companion companion running ROS2 on Linux Ubuntu OS, connecting to a [Pixhawk](../flight_controller/autopilot_pixhawk_standard.html) flight controller using a serial connection between the Pixhawk `TELEM2` port and the RPi's TX/RX pins.

These instructions should be readily extensible to other RPi and flight controller configurations.

:::note
Other common ways to connect RaPi and Pixhawk are:

- Ethernet.
  Pixhawk controllers based on FMUv5x, 6x and later may have an inbuilt Ethernet port.
  See [PX4 Ethernet > Supported Controllers](../advanced_config/ethernet_setup.md#supported-flight-controllers).
- Serial connection to the RPI USB port.
  This is simple and reliable, but requires an additional FTDI Chip USB-to-serial adapter board.
  This option is covered in [Pixhawk Companion > Serial Port Setup](../companion_computer/pixhawk_companion.md#serial-port-setup).
:::

<!-- 
## Serial Connection


The first step is the identification of the `TELEM 2` and the `USB` ports in the Pixhawk.
The image illustrates the ports in the Pixhawk-6C Model.

<img src="../../assets/companion_computer/pixhawk_rpi/pixhawk_6c.png" width="402" height="452" />
-->

## Wiring

### Serial connection

First wire up the serial connection between the RPi and PX4 that is to be used for offboard control.

This setup connects the Pixhawk `TELEM2` port, which is generally recommended for offboard control.
It is initially configured in PX4 to use with MAVLink, which we will change later when setting up ROS 2.

Connect the Pixhawk `TELEM2` `TX`/`RX`/`GND` pins to the complementary `RXD`/`TXD`/`Ground` pins on the RPi GPIO board:

PX4 TELEM2 Pin | RPi GPIO Pin
--- | ---
UART5_TX (2) | RXD (GPIO 15 - pin 10)
UART5_RX (3) | TXD (GPIO 14 - pin 8)
GND (6)         | Ground (pin 6)

The diagram shows Pixhawk `TELEM2` port pins on the left and RPi GPIO board pins on the right.
The pins on the `TELEM2` port are normally numbered right-to-left as shown

`TELEM2` | RPi GPIO
--- | ---
![Pin numbering showing left-most pin is pin 1](../../assets/companion_computer/pixhawk_rpi/pins_numbers.png) | ![](../../assets/companion_computer/pixhawk_rpi/rpi_gpio.png)

:::note
Almost all recent Pixhawk boards, such as the Pixhawk-6C, use the same connectors and pin numbers for correpsponding ports, as defined in the Pixhawk Connector Standard.
You can check the specific board documentation to confirm the pin layout.

The standard `TELEM2` pin assignments are shown below.

Pins | Signal | Voltage
--- | --- | ---
1 (Red)   | VCC             | +5V
2 (Black) | UART5_TX (out)  |  +3.3V
3 (Black) | UART5_RX (in)   | +3.3V
4 (Black) | UART5_CTS (in)  | +3.3V
5 (Black) | UART5_RTS (out) | +3.3V
6 (Black) | GND             | GND
:::

### TELEM1/Telemetry Radio

The Pixhawk `TELEM1` port is preconfigured for connecting to a GCS via MAVLink over a telemetry radio.

You can plug an [appropriate radio](../telemetry/README.md) into the Pixhawk `TELEM1` port and in most cases it should just work.
Generally the other radio needs to be connected to the ground station USB port.
If you have any issues, check the radio documentation.

### Power Supply

Pixhawk boards usually require a reliable 5V DC supply, which is commonly supplied from LiPO batteries via a [Power Module and/or Power Distribution board](../en/power_module/README.md) to a port labeled `POWER` (or similar).

The instructions for your flight controller will normally explain the recommended setup.
For example:
- [Holybro Pixhawk 6C > Voltage Ratings](../flight_controller/pixhawk6c.md#voltage-ratings)
- [Holybro Pixhawk 6C Wiring Quick Start > Power](../en/assembly/quick_start_pixhawk6c.md#power)

Pixhawk controllers can supply power to a _small_ number of low-power peripherals, such as GPS modules and low-range telemetry radios.
The RPi companion computer, servos, high power radios, and other peripherals require a separate power supply, which is usually from a battery elimination circuit (BEC) wired to the same or another battery. 
Some power modules have a separate BEC included.

:::warning
Overloading your Pixhawk is a good way to destroy it.
:::

:::note
During PX4 setup and configuration the USB connection with your ground station laptop is suffient to power the Pixhawk board, and your companion computer might be powered from a desktop charger.
::: 

## PX4 Setup

### Installing PX4

These instructions rely on PX4 code to support ROS2 that isn't yet in a release build (arrives in PX4 v1.14).
You will therefore need to install a build off the current PX4-Autopilot `main` branch.

Connect the Pixhawk to your laptop/desktop via the `USB` port and use QGroundControl to update the firmware to the "Master" version as described in [Firmware > Installing PX4 Master, Beta or Custom Firmware](../config/firmware.md#installing-px4-master-beta-or-custom-firmware).

:::note
You can alternatively [setup a development environment](../dev_setup/dev_env.md), [build](../dev_setup/building_px4.md#building-for-nuttx) and [upload](../dev_setup/building_px4.md#uploading-firmware-flashing-the-board) the firmware manually.
:::

<!-- Keeping this line as record - this is only unexpected dependency:
```
sudo apt -y install stlink-tools
```
-->
<!-- Keeping this because we might need it for updating linux instructions
On Linux, the default name of a USB connection is `/dev/ttyACM0`:

```
sudo chmod a+rw /dev/ttyACM0
cd /PX4-Autopilot
make px4_fmu-v6c_default upload
```
-->



## Ubuntu Setup on RPi

The following steps are required to have the Ubuntu 22.04 installed on the RPi.
In the next section, the ROS 2 is going to be installed, so it is important the choice for the correct version of Ubuntu.

Prepare the Ubuntu 22.04's boot SD card following the official tutorial available in the Ubuntu website:

https://ubuntu.com/tutorials/how-to-install-ubuntu-desktop-on-raspberry-pi-4#1-overview

Next, connect the SD card in the RPi. Connect the mouse, keyboard, monitor and connect the RPi on 5v Power Supply (external source/charger).

Turn on the RPi to boot on SD card and install Ubuntu. In the sequence, install raspi-config in the RPi's terminal:

```
sudo apt update
sudo apt upgrade
sudo apt-get install raspi-config 
```

Open the raspi-config:

```
sudo raspi-config
```

Go to the **Interface Option** and then click at **Serial Port**. Select **No** to disable serial login shell and select **Yes** to enable serial interface. Click **finish** and restart the RPi.

In the sequence, in the RPi's terminal:

```
sudo nano /boot/firmware/config.txt
```

Include the following, after the last line:

```
enable_uart=1
dtoverlay=disable-bt
```

Then, **ctrl+x**, **ctrl+y**, **Enter** and restart the RPi.

To check if the serial port is available, in the RPi's terminal, confirm the list of serial devices by typing:

```
cd /
ls /dev/ttyAMA0
```

On RPi, the default name of a RX/TX connection is `/dev/ttyAMA0`.
The same serial port is also available as `/dev/serial0`.

Next, install the mavproxy in the RPi's terminal:

```
sudo apt install python3-pip
sudo pip3 install mavproxy
sudo apt remove modemmanager
```

## MAVlink Communication

Connect the Pixhawk with the laptop via `USB` cable and change the following parameters in QGroundControl:

```
MAV_0_CONFIG = TELEM2
XRCE_DDS_0_CFG = Disabled
SER_TEL1_BAUD = 57600
```

<!-- Lets do the wiring setup first - moving this up to its own section.

Next, connect the Pixhawk `TELEM2` pins TX/RX/Ground on RPi correspondent pins.
We are going to leave the `TELEM1` port for a setup with a Radio Controller.

The connections listed below must be done:

1. `TELEM2` TX -> RPi RXD (GPIO 15 - pin 10)
2. `TELEM2` RX -> RPi TXD (GPIO 14 - pin 8)
3. `TELEM2` GND -> RPi Ground (pin 6)

It is important to identify the correct pins in the hardware.
The image illustrates the `TELEM2` pins in the Pixhawk-6C Model.


`TELEM2` Port

Pins | Signal | Voltage
--- | --- | ---
1 (Red)   | VCC             | +5V
2 (Black) | UART5_TX (out)  |  +3.3V
3 (Black) | UART5_RX (in)   | +3.3V
4 (Black) | UART5_CTS (in)  | +3.3V
5 (Black) | UART5_RTS (out) | +3.3V
6 (Black) | GND             | GND

The pins are numbered right-to-left as shown (on all ports):

![Pin numbering showing left-most pin is pin 1](../../assets/companion_computer/pixhawk_rpi/pins_numbers.png)

The following image illustrates the correspondent pins at the RPi GPIO.

<img src="../../assets/companion_computer/pixhawk_rpi/rpi_gpio.png" width="845" height="457" /> 

To supply the Pixhawk with 5 Volts is possible to follow with the connection of `POWER1` port with a LiPO battery, via Power Module (PM02, for example). Another option, for this setup moment, is to supply the 5 Volts via the connection of the Pixhawk's `USB` with a smartphone charger, for example, or by keeping it in the laptop `USB`. 

Also, for this setup moment, the RPi is charged with 5 Volts via Power Supply (external source/charger). 

Ps.: For an onboard setup, in the drone, it is not recommended to connect the `TELEM2` VCC to supply the RPi in the 5V power (pin 4). You can use your own power supply board to power the RPi baseboard. 

--> 

Next, run the mavproxy connection at `/dev/ttyAMA0`. In the RPi's terminal:

```
sudo mavproxy.py --master=/dev/serial0 --baudrate 57600
```

At this moment, you are going to see in the RPi's terminal the MAVlink communication established with the Pixhawk, via RX/TX pins. 
The MAVlink communication is also possible via USB connection, by changing the command to:

```
sudo chmod a+rw /dev/ttyACM0
sudo mavproxy.py --master=/dev/ttyACM0 --baudrate 57600
```

The steps above are important to double check that the hardware communication is done. In the sequence, we are going to move to the XRCE_DDS communication.

## ROS Setup on RPi

To install ROS 2 Humble you can follow the official tutorial, available in the website:

https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debians.html

Next, install the git in the RPi's terminal:

```
sudo apt install git
```

Next, install the XRCE_DDS standalone:

```
git clone https://github.com/eProsima/Micro-XRCE-DDS-Agent.git
cd Micro-XRCE-DDS-Agent
mkdir build
cd build
cmake ..
make
sudo make install
sudo ldconfig /usr/local/lib/
```

## XRCE-DDS Communication

If you want to use `TELEM1`, you have to stop MAVLink and then activate the microdds_client. You can do that changing the parameters:

1. To disable MAVLink on `TELEM1`,

```
MAV_0_CONFIG = 0
```
2. To start microdds_client on `TELEM1`,

```
XRCE_DDS_0_CFG = TELEM1
```

3. Use SER_TEL1_BAUD to set the baudrate.

If you want to use `TELEM2` (ttyS3 of Pixhawk):

```
XRCE_DDS_0_CFG = TELEM2
SER_TEL2_BAUD = 921600
```

PS.: At this moment, the Pixhawk must be connected with the laptop, via `USB`, so the QGroundControl can be used to change the parameters described above.

To check the status of the microdds_client, run in the QGroundControl's MavlinkConsole: 

```
microdds_client status
```

If it is not running yet, start the client in the MavlinkConsole: 

```
microdds_client start -t serial -d /dev/ttyS3 -b 921600
```

In the command above we have used the `/dev/ttyS3` to establish the XRCE_DDS communication, since it is related to `TELEM2`, according to the table:

UART | Device | Port
--- | --- | ---
USART1 | /dev/ttyS0 | GPS
USART2 | /dev/ttyS1 | TELEM3
USART3 | /dev/ttyS2 | Debug Console
UART4 | /dev/ttyS3 | UART4 & I2C
UART5 | /dev/ttyS4 | TELEM2
USART6 | /dev/ttyS5 | PX4IO/RC
UART7 | /dev/ttyS6 | TELEM1
UART8 | /dev/ttyS7 | GPS2


To start the agent, run the following command in the RPi's terminal:

```
sudo MicroXRCEAgent serial --dev /dev/serial0 -b 921600
```

To see the ROS 2 topics available, run in a new RPi's terminal:

```
source /opt/ros/humble/setup.bash
ros2 topic list
```

To communicate simultaneously via both XRCE-DDS and MAVLink, we can keep the `TELEM2` connected via RX/TX and also connect Pixhawk `USB` at the RPi. 

Before disconnect the `USB` from laptop, remember to set the parameters:

```
MAV_0_CONFIG = TELEM1
SER_TEL1_BAUD = 57600
XRCE_DDS_0_CFG = TELEM2
SER_TEL2_BAUD = 921600
```

The `TELEM2` is going to keep the XRCE_DDS communication with the microdds_client, as above, and the `USB` is going to keep the MAVLink communication. Remember to open a new RPi's terminal and run:

```
sudo chmod a+rw /dev/ttyACM0
sudo mavproxy.py --master=/dev/ttyACM0 --baudrate 57600
```
This is a particular setup when we are looking for both offboard control, via XRCE_DDS with the RPi, and simultaneously to keep monitoring the drone via MAVLink with QGroundControl.
Since the Pixhawk is connected with the RPi, a remote control via QGroundControl (in a ground station laptop) can be done using SSH and the mavros package, running in a new terminal:

```
ssh -C -Y user@raspberrypi_IP
sudo chmod a+rw /dev/ttyACM0 
roslaunch mavros px4.launch fcu_url:=/dev/ttyACM0 gcs_url:=udp://@laptop_IP
```

PS.: It is not possible to configure XRCE_DDS_0_CFG = USB (/dev/ttyACM0 port). So, the Pixhawk XRCE_DDS communication would not work on laptop via USB.
