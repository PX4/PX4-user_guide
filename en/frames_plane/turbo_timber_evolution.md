# Turbo Timber Evolution (TTE) Build

The Turbo Timber Evolution is a model sold by Horizon hobby, originally intended for classic line of sight RC model flying. This model is designed to excel at STOL flying and has a number of notable traits that also make it an ideal candidate to be converted in a FPV PX4 platform.

Key airframe features:
* Spacious interior
* Optional leading edge slats
* Fowler flaps
* Rugged landing gear with steering tailwheel
* Exterior lighting pre installed
* Optional floats
* Gentle flying characteristics
* Low drag with internal linkages and minimal proptrusions

The goal of this build was to create a platform which could be used for general PX4 testing/development and would support as wide of an operating envelope as possible with controls that were naturally balanced and representative of a normal "vanilla" airplane. Because classic RC planes are usually designed to be hand flown with no computer augmented flight controls, they tend to be specificaly designed to be well trimmed and balanced out of the box. These airplanes also have more attention devoted to making sure they handle well in the air. While it's possible to fly even the most simplisitc foamboard airplane, a lot of nuance in airborne handling can be finessed with a bit more engineering effort. This airplane is a premium example of that with features like differential ailerons to minimize adverse yaw. 

# Build

## Parts list:
* [Turbo Timber Evolution PNP (includes motor, servos, esc, etc, all fully installed)]()
* Pixhawk 4 Mini
* Holybro power module
* holybro M8 GPS module/compass
* SIK telemetry radio
* MSDO2545 differential pressure module and pitot tube
* Caddx Vista FPV air unit
* ExpressLRS Matek Diversity RX
* Pixhawk 4 Mini mount (3D printed)
* Holybro GPS module mount (3D printed)
* Misc hardware, including M3 standoffs, washers, bolts
* Hot glue

## Airframe build
The TTE comes out of the box very complete as is. Servos/linkages have alrady been installed and the only real work remaining is finishing work, such as installing the landing gear and horizontal stabilizer. For this portion of assembly, the manual can simply be followed.

## Flight Computer Installation
A custom mount for the PX4 Mini was designed and 3d printed. This mount was carefully designed to use internal features of the stock TTE to be securely attached and well aligned to the airframe. The mount consists of two parts in a double decker configuration bolted together with M3 threaded standoffs. The bottom mount carries the Pixhawk and attaches to the airframe while the top mount carries the GPS and ExpressLRS RX.

First, the Pixhawk 4 Mini was placed in the lower mount. Hot glue was added to ridgedly connect the fcu to the mount. Two zipties provide additional security. The standoff mounts for the upper mount were installed, and the bolts securely tightened. Once the lower mount is installed, these screws are inaccessable, so attention should be paid to making sure they cannot back out. 

## Wiring

### Servos
Servos were wired to the flight computer in order of throttle, aileron, elevator, rudder, and FPV pan. An additional power plug for the lighting system needs to also be installed, but it does not carry a servo signal so it can be put on any spare channel. 

### 