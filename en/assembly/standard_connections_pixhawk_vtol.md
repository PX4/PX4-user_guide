# Pixhawk VTOL Connections

This topic defines the standard Pixhawk motor/and servo output connections for various types of VTOL vehicle supported by PX4.

> **Caution** It is assumed that your pusher/puller motor uses an ESC with an
  integrated BEC which means power will be supplied to the Pixhawk on
  AUX5. If not, you will need to setup a 5V BEC to connect to one of the
  free Pixhawk ports. Failure to do so will result in nonfunctional servos.
  
For airframe-specific documentation and build instructions see [VTOL Framebuilds](../framebuild_vtol/README.md).


## QuadPlane

The connections for a QuadPlane VTOL are listed below. For airframe specific documentation and build instructions see [VTOL Framebuilds](./framebuild_vtol/README.md).

Output | Connection
--- | ---
MAIN 1   | Quad motor 1
MAIN 2   | Quad motor 2
MAIN 3   | Quad motor 3
MAIN 4   | Quad motor 4
AUX 1    | Left aileron
AUX 2    | Right aileron
AUX 3    | Elevator
AUX 4    | Rudder
AUX 5    | Throttle (motor)


## Tiltrotor

The connections for a Tiltrotor VTOL are listed below. 

Output | Connection
--- | --- 
MAIN 1 | Motor right
MAIN 2 | Motor left
MAIN 3 | Motor back
MAIN 4 | empty
MAIN 5 | Tilt servo right
MAIN 6 | Tilt servo left
MAIN 7 | Elevon right
MAIN 8 | Elevon left

## Tailsitter

Output | Actuator
--- | --- 
MAIN1 | Left motor controller
MAIN2 | Right motor controller
MAIN3 | Empty
MAIN4 | Empty
MAIN5 | Left aileron servo
MAIN6 | Right aileron servo

## Configuration

QuadPlane

* [VTOL Configuration](../config/vtol_quad_configuration.md)
* [VTOL Configuration (without an Airspeed Sensor)](../advanced_config/vtol_without_airspeed_sensor.md)

## Support

If you have any questions regarding your VTOL conversion or
configuration please visit <http://discuss.px4.io/c/vtol>.


 

