# Tilted Motors for Yaw Authority in Multicopter

Multicopters utilize the reaction torque from the rotors to control the yaw. However, for large multicopters with high moment of inertias especially, controlling the yaw solely using the reaction torque becomes more challenging.

The reaction torque also depends on the profile (pitch) of the rotor, which tends to be slimmer in larger rmulticopter vehicles as well.

Failure to have enough yaw authority can result in a vehicle with a crash.

## How to tilt rotors to increase yaw control authority

To tilt the rotors, please do the following, depending on the direction of the rotor's rotation:

* Rotors turning clockwise: Turn the rotor to provide extra counter-clockwise torque on vehicle's body, to aid the reaction torque from the rotor
* Rotors turning counter-clockwise: Turn the rotor to provide extra clockwise torque on vehicle's body, to aid the reaction torque from the rotor

<!-- TODO: Add diagram -->

Note, this is also documented in [ArduPilot](https://ardupilot.org/plane/docs/quadplane-tips.html#increasing-yaw-authority).