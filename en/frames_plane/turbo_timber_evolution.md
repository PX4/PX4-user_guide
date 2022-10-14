# Turbo Timber Evolution (TTE) Build

The Turbo Timber Evolution is a model sold by Horizon Hobby, originally intended for classic line-of-sight RC model flying. This model is designed to excel at STOL flying and has a number of notable traits that also make it an ideal candidate to be converted into an FPV PX4 platform.

Key airframe features:
* Spacious interior
* Optional leading edge slats
* Fowler flaps
* Rugged landing gear with steering tailwheel
* Exterior lighting pre installed
* Optional floats
* Gentle flying characteristics
* Low drag with internal linkages and minimal proptrusions

The goal of this build was to create a platform which could be used for general PX4 testing and development and would support as wide of an operating envelope as possible with controls that were naturally balanced and representative of a normal "vanilla" airplane. Because classic RC planes are usually designed to be hand flown with no computer augmented flight controls, they tend to be specifically designed to be well trimmed and balanced out of the box. These airplanes also have more attention devoted to making sure they handle well in the air. While it's possible to fly even the most simple foamboard airplane, a lot of nuance in airborne handling can be finessed with a bit more engineering effort. This airplane is a premium example of that, with features like differential ailerons to minimize adverse yaw.

Key Build Features
* Easy overall build with minimal airframe setup
* Easy access to Pixhawk USB and debug connector
* FPV with camera pan mount
* Air data provided by wing slung pitot static pod

# Build

## Parts list:
* [Turbo Timber Evolution PNP (includes motor, servos, esc, etc, all fully installed)](https://www.horizonhobby.com/product/turbo-timber-evolution-1.5m-pnp-includes-floats/EFL105275.html#)
* [Pixhawk 4 Mini](http://www.holybro.com/product/pixhawk4-mini/)
* Holybro power module
* holybro M8 GPS module/compass
* SIK telemetry radio
* MSDO2545 differential pressure module and pitot tube
* Caddx Vista FPV air unit
* ExpressLRS Matek Diversity RX
* Pixhawk 4 Mini mount (3D printed)
* Holybro GPS module mount (3D printed)
* FPV pod (3D printed)
* Misc hardware, including M3 standoffs, washers, bolts
* Hot glue, heatshrink
* XT30 connector
* 4 pin Molex Microfit male/female & crimp pins
* Silicone wiring (14awg for high current, 16awg for low current)
* 3.6Ah 4S LiPo OR 4s2p 18650 LiIon


## Airframe build
The TTE comes out of the box very complete as-is. Servos and linkages have already been installed, and the only real work remaining is finishing work, such as installing the landing gear and horizontal stabilizer. For this portion of the assembly, the manual can simply be followed.

## FPV Pod
The FPV pod was placed on top of the 

## Flight Computer Installation
A custom mount for the PX4 Mini was designed and 3d printed. This mount was carefully designed to use internal features of the stock TTE airframe to be securely attached and well aligned. The mount consists of two parts in a double-decker configuration, bolted together with M3 threaded standoffs. The bottom mount carries the Pixhawk and attaches to the airframe while the top mount carries the GPS and ExpressLRS RX.

First, the Pixhawk 4 Mini was placed in the lower mount. Hot glue was added to ridgedly connect the fcu to the mount. Two zipties provide additional security. The standoff mounts for the upper mount were installed, and the bolts securely tightened. Once the lower mount is installed, these screws are inaccessible, so attention should be paid to making sure they cannot back out. 


## Wiring

### Power
The Holybro power module was wired inline with the ESC. A spare 16awg power lead was also broken out, terminated to an XT30. This spare lead will be used to provide power to the Caddx Vista, but could also be connected to a splitter to power more peripherals. Power for the servo and lighting will be provided by the "BEC" power supply in the ESC. 

The TTE is very flexible when it comes to battery options. I use both a 3.6Ah 4S Turnigy pack as well as a Upgrade Energy 4s2p liion pack. 

### Servos
Servos were wired to the flight computer in order of throttle, aileron, elevator, rudder, and FPV pan. An additional power plug for the lighting system needs to also be installed, but it does not carry a servo signal so it can be put on any spare channel. 

### Config & Debug
Access to the Pixhawk 4 Mini requires removal of the upper mount. While this isn't too difficult, it was a consideration for wanting to streamline debugging in the field. A short right angle USB micro extension was used to allow easy access to the Pixhawk 4 Mini's USB interface. The USB A end of this cable was left dangling in the battery bay. Similarly, a JST PH to std spaced headers adapter was made, and it was also left easily accessible in the battery bay. 

### Peripherals

#### ExpressLRS RX
A custom cable was made to connect the ExpressLRS RX to the Pixhawk 4 Mini. Because the Pixhawk 4 Mini has limited uarts, the RX was connected to RC input which does not have a TX pin. This means that the RX will only send control data to the FCU but telemtry cannot be sent to the RX from the FCU. Heatshrink was used to secure the dupont connector of the cable such that it cannot back out off the headers of the ExpressLRS RX.

#### Caddx Vista
Another custom cable was made to connect the Caddx Vista to the FCU UART and power. A Molex microfit was added close to the Vista so that it could be easily disconnected without needing to gain access to the Pixhawk.

## Build Results & Performance
Overall, this build was a success. The airplane flies very well, and Px4 is easily capable of stabilizing it. The airplane was successfully tuned in flight with autotune. Even though this configuration is much heavier than the airplane would normally be in a pure RC setup, it still maintains it's excellent STOL performance and the rugged gear have no problem handling rough terrain during takeoff and landing. 

### Performance
* Stall speed (no flaps): 14MPH indicated
* Cruise speed: 35-65MPH
* Takeoff roll (with full flaps): < 10ft
* Endurance: ~20 minutes on 5.2Ah 4s2p LiIon, ~12 minutes on 3.6Ah 4S LiPo

### Videos
[Spot Landing](https://www.youtube.com/watch?v=vMFCi3G5s6E)
[A Quick Flight](https://youtu.be/1DUV7QjcXrA)

### Flight Logs

### Parameter File
[Parameters]()


