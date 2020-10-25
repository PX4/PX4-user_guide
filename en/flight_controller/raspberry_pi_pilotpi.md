# RPi PilotPi Shield

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
| 4 | nc | +3v3 |
| 5 | nc | +3v3 |
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
#### mDNS
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

Reboot and ssh into your Pi.

Check UART interface:
```shell
ls /dev/tty*
```
There should be `/dev/ttyAMA0`, `/dev/ttySC0` and `/dev/ttySC1`.

Check I2C interface
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
#### CSI camera
> **Enable CSI camera will stop anything works on I2C-0.**

```shell
sudo raspi-config
```
"Interfacing Options" -> "Camera"
### Building the code
Continue with our [standard build system installation](https://dev.px4.io/master/en/setup/dev_env_linux.html).