# VTOL Weather Vane Feature

## Motivation
The weather vane feature can be used to make a VTOL vehicle automatically turn its nose into the relative wind during hover flight. Due to stability reasons this situation is always favourable. Wind coming from the side can easily pick-up the wind-facing wing and flip the vehicle.

## How does it work?
During hover flight the vehicle needs to overcome the drag excerted on it by the wind in order to hold it's position.
The only way for it to achieve this is by tilting its thrust vector into the relative wind, it literally 'leans' against the wind. Therefore, keeping track of the thrust vector one can estimate the wind direction. A weathervane controller is used to command a yawrate that turns the vehicle nose into the estimated wind direction.

## How to enable it
- Enable weathervane parameter [WV_EN](../advanced_config/parameter_reference.md#WV_EN)

> **Note** This feature can only be enabled for VTOL hybrid vehicles which excludes pure multirotors.

### Behaviour in manual mode
In manual mode the weather vane feature will only take effect in position control mode. Even though the weather vane controller will try to turn the nose of the vehicle into the wind the user can still use the yaw stick to demand a yaw rate. The target yaw rate is therefore the sum of weather vane yaw rate and user commaned yaw rate.

### Behaviour in auto mode
In auto mode the weather vane feature will always be active (given that it has been enabled by parameter).
As a result any yaw angle commanded in a mission will be ignored.
