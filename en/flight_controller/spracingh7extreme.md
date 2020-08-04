# SP Racing H7 EXTREME (PX4 Edition)

The SP Racing H7 EXTREME is a feature packed FC/PDB with DUAL ICM20602 gyros, H7 400Mhz CPU*, high-precision BMP388 barometer, SD Card socket, current sensor, 8 easily accessible motor outputs, OSD, Microphone, Audio output, and more.

It can be used easily for small to large quads but also for planes, octocoptors and more advanced frames.  It's best used with separate ESCs as it features a built-in power distribution board (PDB), but wiring up a 4in1 ESC is easy too.

There is also a 12 pin stacking connector which provides 4 more motor outputs, SPI and a UART connectivity. 

![SPRacingH7EXTREME PCB Top](../../assets/flight_controller/spracingh7extreme/spracingh7extreme-top.jpg)

![SPRacingH7EXTREME PCB Bottom](../../assets/flight_controller/spracingh7extreme/spracingh7extreme-bottom.jpg)


## Key Features

* Main System-on-Chip: [STM32H750VBT6 rev.y/v](https://www.st.com/en/microcontrollers-microprocessors/stm32h750vb.html)
  * CPU: 400/480Mhz ARM Cortex M7 with single-precision FPU. (480Mhz with Rev V CPUs)
  * RAM: 1MB
* 16MB External Flash 4-bit QuadSPI in Memory Mapped mode for code *and* config.
* Dual Gyros (1xSPI each, with separate interrupt signals, 32khz capable, fsync capable)
* High-precision BMP388 Baro (I2C + interrupt)
* On-screen display OSD (dedicated SPI, character based, MAX7456)
* Microphone
* Audio output from CPU DAC.
* Audio mixer for microphone/DAC outputs.
* SD Card (4-bit SDIO not 1-bit SPI)
* Integrated PDB.
* 110A Current Sensor
* 2-6S BEC
* TVS Protection Diode
* Dedicated 500ma VREG for Gyros, with gyro noise filter capacitors.
* Second 500ma VREG for CPU, Baro, Microphone, etc.
* IR transponder (iLAP compatible)
* Buzzer circuitry
* RSSI (Analog/PWM)
* 12 motor outputs (4 by motor pads, 4 in the middle, and 4 on stacking connector).
* 1x SPI breakout onto stacking connector
* 6 Serial Ports (5x TX & RX, 1x TX-only bi-directional for telemetry)
* Status Led
* LED strip support (with well-placed connection pads).
* Boot Button (Side press)
* Bind/User Button (Side press)
* Receiver ports (all usual protocols, no inverter needed)
* CAM OSD control and Video IN on CAM socket.
* Video OUT + Audio OUT on VTX socket.
* USB with OTG capability (ID and VBUS connected to CPU)
* SWD debugging port.
* Bootable from SD Card or External flash.
* Flashable from SD Card.
* Solder-from-top design.
* PCB Cutouts for battery wires.
* No Compass, use an external GPS with a magnometer/compass sensor connected to the GPS IO port.
* Also runs Betaflight 4.x+, Cleanflight 4.x+.
* Designed by Dominic Clifton, the guy that created Cleanflight


## Where to Buy

The SPRacing H7 Extreme PX4 Editioin is available from the [Seriously Pro shop](https://shop.seriouslypro.com/sp-racing-h7-extreme).

MAKE SURE TO SELECT THE PX4 EDITION WHEN PURCHASING!

## Manual, Pinouts and Connection Diagrams

The manual and connection diagrams can be downloaded from the [SP Racing H7 Extreme website](http://seriouslypro.com/spracingh7extreme)

## Credits

This design was created by [Dominic Clifton](https://github.com/hydra)
Initial PX4 support by [Igor-Misic](https://github.com/Igor-Misic)
