# RPi PilotPi Shield

> **Warning** PX4 does not manufacture this (or any) autopilot.
  Contact the [manufacturer](mailto:lhf2613@gmail.com) for hardware support or compliance issues.

<span></span>
> **Warning** PX4 support for this flight controller is [experimental](../flight_controller/autopilot_experimental.md).

The *PilotPi* shield is a fully functional solution to run PX4 autopilot directly on Raspberry Pi.
It is designed to be a low-cost but highly scalability platform with continuous updates from both Linux and PX4 sides. No proprietary driver is required, as all components have upstream support from RPi and PX4 community.
PCB and schematic are open source as well.

![PilotPi with RPi 4B](../../assets/hardware/pilotpi/hardware-pilotpi4b.jpg)

## Quick Summary

* Supported RPi boards:
  * Raspberry Pi 2B/3B/3B+/4B
* Accelerometer / Gyro:
  * ICM42688P
* Magnetometer:
  * IST8310
* Barometer:
  * MS5611
* PWM:
  * PCA9685
* ADC:
  * ADS1115
* Power:
  * 3~6S battery with built-in voltage sensing.
  * Power the Pi through USB cable
* Availability: *preparing for shipping*

## Connectivity

Shield provides:

* 16x PWM outputting channels
* GPS connector
* Telemetry connector
* External I2C bus connector (**Note:** conflicts with CSI camera)
* RC input port (SBUS)
* 3x ADC channels range 0~5V
* 2\*8 2.54mm unused GPIO connector

Direct accessible from RPi:

* 4x USB connector
* CSI connector(**Note:** conflict with external I2C bus)
* etc.

## Recommended Wiring

![PilotPi PowerPart wiring](../../assets/flight_controller/pilotpi/pilotpi_pwr_wiring.png)
![PilotPi SensorPart wiring](../../assets/flight_controller/pilotpi/pilotpi_sens_wiring.png)

## Pinouts

> **Warning** It still uses old GH1.25 connectors. Wiring is compatible with Pixhawk 2.4.8

### Connectors

#### GPS connector

Mapped to `/dev/ttySC0`

| Pin | Signal | Volt |
| -- | -- | -- |
| 1 | VCC | +5V |
| 2 | TX | +3v3 |
| 3 | RX | +3v3 |
| 4 | NC | +3v3 |
| 5 | NC | +3v3 |
| 6 | GND | GND |

#### Telemetry connector

Mapped to `/dev/ttySC1`

| Pin | Signal | Volt |
| -- | -- | -- |
| 1 | VCC | +5V |
| 2 | TX | +3v3 |
| 3 | RX | +3v3 |
| 4 | CTS | +3v3 |
| 5 | RTS | +3v3 |
| 6 | GND | GND |

#### External I2C connector

Mapped to `/dev/i2c-0`

| Pin | Signal | Volt |
| -- | -- | -- |
| 1 | VCC | +5V |
| 2 | SCL | +3v3(pullups) |
| 3 | SDA | +3v3(pullups) |
| 4 | GND | GND |

#### RC & ADC2/3/4

RC mapped to `/dev/ttyAMA0` with signal inverter switch on RX line.

| Pin | Signal | Volt |
| -- | -- | -- |
| 1(red) | RC | +3V3~+5V |
| 2(blk) | VCC | +5V |
| 3(blk) | GND | GND |

- ADC1 is internally connected to voltage divider for battery voltage monitoring.
- ADC2 is left unused.
- ADC3 can be connected to an analog airspeed sensor.
- ADC4 has a jumper cap between ADC and VCC, to monitor system voltage level.

| Pin | Signal | Volt |
| -- | -- | -- |
| 1 | ADCx | 0V~+5V |
| 2 | VCC | +5V |
| 3 | GND | GND |

> ADC3 & 4 have an alternative VCC source. When 'Vref' switch is on, 'VCC' pin is driven by REF5050 with higher accuracy and stability.

#### Unused GPIO available on top of the board

| Shield Pin | BCM | WiringPi | RPi Pin |
| -- | -- | -- | -- |
| 1 | 3V3 | 3v3 | 3V3 |
| 2 | 5V | 5V | 5V |
| 3 | 4 | 7 | 7 |
| 4 | 14 | 15 | 8 |
| 5 | 17 | 0 | 11 |
| 6 | 27 | 2 | 13 |
| 7 | 22 | 3 | 15 |
| 8 | 23 | 4 | 16 |
| 9 | 7 | 11 | 26 |
| 10 | 5 | 21 | 29 |
| 11 | 6 | 22 | 31 |
| 12 | 12 | 26 | 32 |
| 13 | 13 | 23 | 33 |
| 14 | 16 | 27 | 36 |
| 15 | 26 | 25 | 37 |
| 16 | GND | GND | GND |

### Switches

#### RC Inverter

This switch will decide the signal polarity of RX line.

`UART_RX = SW xor RC_INPUT`

* On: suitable with SBUS (signal inverted)
* Off: preserved

#### Vref

ADC 3 & 4 will have VCC driven by:
* Vref output from REF5050 if on
* 5V pin directly from RPi if off

#### Boot Mode

This switch is connected to Pin22(BCM25). System rc script will check its value and decide whether PX4 should start alongside with system booting or not.

* On: start PX4 automatically
* Off: don' t start PX4

## Developer Quick Start

### OS Image

The latest official [Raspberry Pi OS Lite](https://downloads.raspberrypi.org/raspios_lite_armhf_latest) image is always recommended.
Assume you already get a working ssh connection to RPi.

### Setting up Access (Optional)

#### Hostname and mDNS

mDNS helps you connect to your pi with hostname instead of IP address.

```shell
sudo raspi-config
```

Navigate to "Network Options" -> "Hostname". Set and exit.
You may want to setup [passwordless auth](https://www.raspberrypi.org/documentation/remote-access/ssh/passwordless.md) as well. 

### Setting up OS

#### config.txt

```shell
sudo nano /boot/config.txt
```

Replace the file with:

```shell
# enable sc16is752 overlay
dtoverlay=sc16is752-spi1
# enable I2C-1 and set the frequency to 400KHz
dtparam=i2c_arm=on,i2c_arm_baudrate=400000
# enable spidev0.0
dtparam=spi=on
# enable RC input
enable_uart=1
# enable I2C-0
dtparam=i2c_vc=on
# switch Bluetooth to miniuart
dtoverlay=miniuart-bt
```

#### cmdline.txt

```shell
sudo raspi-config
```

"Interfacing Options" -> "Serial" -> login shell = No -> hardware = Yes
Enable UART but without a login shell on it.

```shell
sudo nano /boot/cmdline.txt
```

Append `isolcpus=2` behind the last word.
The whole file would be:

```shell
console=tty1 root=PARTUUID=xxxxxxxx-xx rootfstype=ext4 elevator=deadline fsck.repair=yes rootwait isolcpus=2
```

This one tells Linux kernel do not schedule any process on CPU core 2. We will manually run PX4 onto that core later.

Reboot and ssh onto your Pi.

Check UART interface:

```shell
ls /dev/tty*
```

There should be `/dev/ttyAMA0`, `/dev/ttySC0` and `/dev/ttySC1`.

Check I2C interface:

```shell
ls /dev/i2c*
```

There should be `/dev/i2c-0` and `/dev/i2c-1`

Check SPI interface

```shell
ls /dev/spidev*
```

There should be `/dev/spidev0.0`.

#### rc.local

In this section we will configure the auto-start script in rc.local.

```shell
sudo nano /etc/rc.local
```

Append below context to the file above `exit 0`:

```shell
echo "25" > /sys/class/gpio/export
echo "in" > /sys/class/gpio/gpio25/direction
if [ $(cat /sys/class/gpio/gpio25/value) -eq 1 ] ; then
        echo "Launching PX4"
        cd /home/pi/px4 ; nohup taskset -c 2 ./bin/px4 -d -s pilotpi_mc.config 2 &> 1 > /home/pi/px4/px4.log &
fi
echo "25" > /sys/class/gpio/unexport
```

Save and exit.

> Don' t forget to turn off the switch when it is not needed.

#### CSI camera

> **Warning** Enable CSI camera will stop anything works on I2C-0.

```shell
sudo raspi-config
```

"Interfacing Options" -> "Camera"

### Building the code

To get the *very latest* version onto your computer, enter the following command into a terminal:

```sh
git clone https://github.com/PX4/Firmware.git --recursive
```

> **Note** This is all you need to do just to build the latest code. 

#### Cross build for Raspberry Pi OS

Set the IP (or hostname) of your RPi using:

```sh
export AUTOPILOT_HOST=192.168.X.X
```

or

```sh
export AUTOPILOT_HOST=pi_hostname.local
```

Build the executable file:

```sh
cd Firmware
make scumaker_pilotpi_default
```

Then upload it with:

```sh
cd Firmware
make scumaker_pilotpi_default upload
```

Connect over ssh and run it with:

```sh
cd px4
sudo taskset -c 2 ./bin/px4 -s pilotpi_mc.config
```

Now px4 is started with multi-rotor configuration.

### Alternative build method(using docker)

Sometimes our development environment may contain a newer version of tool chain, which won't generate proper binaries for RPi, and is hard to downgrade. The following method can provide the same tool-sets deployed in CI.

If you are compiling for the first time with docker, please refer to the [offical docs](https://dev.px4.io/master/en/test_and_ci/docker.html#prerequisites).

Execute the command in firmware folder:

```sh
./Tools/docker_run.sh "export AUTOPILOT_HOST=192.168.X.X; export NO_NINJA_BUILD=1; make scumaker_pilotpi_default upload"
```
> **Note** mDNS is not supported within docker. You must specify the correct IP address everytime when uploading.

<span></span>
> If your IDE doesn't support ninja build, `NO_NINJA_BUILD=1` option will help.
> 
> You can compile without uploading too. Just remove `upload` target.

It is also possible to just compile the code with command:

```sh
./Tools/docker_run.sh "make scumaker_pilotpi"
```

### Post-configuration

You need to check these extra items to get your vehicle work properly.

#### Mixer file

Mixer file is defined in `pilotpi_xx.conf`:

```sh
mixer load /dev/pwm_output0 etc/mixers/quad_x.main.mix
```

All available mixers are stored in `etc/mixers`. You can create one by yourself as well.

#### External compass
In the startup script(`*.config`), you will find

```sh
# external GPS & compass
gps start -d /dev/ttySC0 -i uart -p ubx -s
#hmc5883 start -X
#ist8310 start -X
```

Uncomment the correct one for your case.
Not sure which compass comes up with your GPS module? Execute the following commands and see the output:

```sh
sudo apt-get update
sudo apt-get install i2c-tools
i2cdetect -y 0
```

Sample output:

```
     0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f
00:          -- -- -- -- -- -- -- -- -- -- -- 0e -- 
10: -- -- -- -- -- -- -- -- -- -- -- -- -- -- 1e -- 
20: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
30: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
40: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
50: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
60: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
70: -- -- -- -- -- -- -- --
```

`1e` indicates a HMC5883 based compass is mounted on external I2C bus. Similarly, IST8310 has a value of `0e`.

> Generally you only have one of them. Other devices will also be displayed here if they are connected to external I2C bus.(`/dev/i2c-0`)