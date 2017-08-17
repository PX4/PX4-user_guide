# VTOL back-transition tuning

> **Note** Some of the following features will be available in PX4 version 1.7 and are currently only available on the experimental development branch.

When a VTOL performs a back-transition (transition from fixed wing mode to multicopter) it needs to slow down before the multicopter can take proper control.
As of PX4 version 1.7, and on the current developer branch, the vehicle will consider the back-transition complete when the horizontal speed has reached multicopter cruise speed ([MPC_XY_CRUISE](../advanced_config/parameter_reference.md#MPC_XY_CRUISE)) or when the back-transition duration ([VT_B_TRANS_DUR](../advanced_config/parameter_reference.md#VT_B_TRANS_DUR)) has passed (which ever comes first).

## back-transition duration
Setting a high back-transition time ([VT_B_TRANS_DUR](../advanced_config/parameter_reference.md#VT_B_TRANS_DUR)) will give the vehicle more time to slow down. During this period the VTOL will shut down its fixed wing motor and slowly ramp up its MC motors while gliding. The higher this time is set the longer the vehicle will glide in an attempt to slow down. The caveat of this behavior is that the vehicle will only control altitude and not position during this period and some drift can occur.

## Setting expected deceleration
When flying missions that make use of a [VTOL_LAND](http://mavlink.org/messages/common#MAV_CMD_NAV_VTOL_LAND) waypoint the autopilot will attempt to calculate the proper distance at which to initiate the back-transition. It does this by looking at the current velocity (comparable to ground speed) and the expected deceleration. To get the vehicle to come out of back-transition very close to its landing point you can tune the expected deceleration ([VT_B_DEC_MSS](../advanced_config/parameter_reference.md#VT_B_DEC_MSS)) parameter. Make sure you have a large enough back-transition duration to allow the vehicle to reach its intended position before this timeout kicks in.

## Applying airbrakes
If your vehicle is equipped with airbrakes and your selected airframe (mixer) is configured to make use of these you can set the airbrake position during back-transition in [VT_B_REV_OUT](../advanced_config/parameter_reference.md#VT_B_REV_OUT). The values scale from 0 to 1, so a value of 0.7 equals 70% output.

## Applying reverse thrust on your fixed wing motor
To get the shortest possible back-transition PX4 supports active breaking by reversing the fixed wing motor direction. To use this feature you will require an ESC that supports motor rotation reversing. Generally there are 2 ways a reverse capable ESC can implement this. 
> **Note** A typical fixed wing propeller is not optimized to spin in reverse, when the throttle during reverse thrust is set too high the propeller can stall.

### Using throttle scaling (3D)
3D ESCs assume 0 thrust at 50% throttle, positive (forward) thrust above 50% and negative thrust (reverse) below 50%. The airframe (mixer) can be configured to implement this so that the throttle stick can be used from 0% to 100% purely for forward thrust and only during back-transition will implement negative (reverse) thrust. To achieve this you must set the [VT_B_TRANS_THR](../advanced_config/parameter_reference.md#VT_B_TRANS_THR) parameter to a negative value between 0 and -1.

### On a control channel
ESCs that use a separate control channel to control the motor direction like the [Hobbywing Platinum series](http://www.hobbywing.com/category.php?id=44&filter_attr=6345.6346) can make use of the airbrakes channel to apply thrust reversal during back-transition. Airframes that have been configured to support this behavior (like the DeltaQuad airframe) can be configured to do so by settings both [VT_B_REV_OUT](../advanced_config/parameter_reference.md#VT_B_REV_OUT) to 1 and the desired throttle level to apply for active breaking in [VT_B_TRANS_THR](../advanced_config/parameter_reference.md#VT_B_TRANS_THR). The values scale from 0 to 1, so a value of 0.7 equals 70% throttle.

## Typical setup
An example of a setup that employs most features listed above would be the following;

- Airframe: Any VTOL supporting reverse thrust (eg. DeltaQuad)
- ESC: A fixed wing ESC that supports motor reversing (eg. Hobbywing Platinum Pro 60A)
- Estimated deceleration value in m/s/s VT_B_DEC_MSS: 2.5
- back-transition duration timeout in seconds VT_B_TRANS_DUR: 10
- Set reverse channel high during back-transition VT_B_REV_OUT: 1.0
- Apply 70% thrust during back-transition VT_B_TRANS_THR: 0.7
