# Jerk-limited modes
This type of setpoints generator is active in position mode when [MPC_POS_MODE](../advanced_config/parameter_reference.md#MPC_POS_MODE) is set to _Smooth position control (Velocity)_ (3) and in auto modes when [MPC_AUTO_MODE](../advanced_config/parameter_reference.md#MPC_AUTO_MODE) is set to _Jerk-limited trajectory (1)_.

## Trajectory generator
The graph below shows a typical jerk-limited porfile with the following constraints:
- jMax: maximum jerk
- a0: initial acceleration 
- aMax: maximum acceleration
- a3: final acceleration (always 0)
- v0: initial velocity
- vRef: desired velocity

The constraints jMax, aMax are configurable by the user via parameters and can be different in manual position control and auto mode.

The resulting velocity profile is often called "S-Curve".

![Jerk-limited trajectory](../../images/jerk_limited_trajectory_1d.png)

## Manual mode
In manual position mode mode, the sticks are mapped to velocity where a full stick deflection corresponds to [MPC_VEL_MANUAL](../advanced_config/parameter_reference.md#MPC_VEL_MANUAL).

### Constraints
XY-plane:
- jMax: [MPC_JERK_MAX](../advanced_config/parameter_reference.md#MPC_JERK_MAX)
- aMax: [MPC_ACC_HOR_MAX](../advanced_config/parameter_reference.md#MPC_ACC_HOR_MAX)

Z-axis:
- jMax: [MPC_JERK_MAX](../advanced_config/parameter_reference.md#MPC_JERK_MAX)
- aMax (upward motion): [MPC_ACC_UP_MAX](../advanced_config/parameter_reference.md#MPC_ACC_UP_MAX)
- aMax (downward motion): [MPC_ACC_DOWN_MAX](../advanced_config/parameter_reference.md#MPC_ACC_DOWN_MAX)

## Auto mode
In auto mode, the desired velocity is [MPC_XY_CRUISE](../advanced_config/parameter_reference.md#MPC_XY_CRUISE) but this value is automatically adjusted depending on the the distance to the next waypoint, the maximum possible velocity in the waypoint and the maximum desired acceleration and jerk.

### Constraints
XY-plane:
- jMax: [MPC_JERK_AUTO](../advanced_config/parameter_reference.md#MPC_JERK_AUTO)
- aMax: [MPC_ACC_HOR](../advanced_config/parameter_reference.md#MPC_ACC_HOR)

Z-axis:
- jMax: [MPC_JERK_AUTO](../advanced_config/parameter_reference.md#MPC_JERK_AUTO)
- aMax (upward motion): [MPC_ACC_UP_MAX](../advanced_config/parameter_reference.md#MPC_ACC_UP_MAX)
- aMax (downward motion): [MPC_ACC_DOWN_MAX](../advanced_config/parameter_reference.md#MPC_ACC_DOWN_MAX)

Distance to velocity gains when close to a waypoint:
- [MPC_XY_TRAJ_P](../advanced_config/parameter_reference.md#MPC_XY_TRAJ_P)
- [MPC_Z_TRAJ_P](../advanced_config/parameter_reference.md#MPC_Z_TRAJ_P)

### Other related parameters
- [MPC_XY_VEL_MAX](../advanced_config/parameter_reference.md#MPC_XY_VEL_MAX)
- [MPC_Z_VEL_MAX_UP](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_UP)
- [MPC_Z_VEL_MAX_DN](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_DN)
- [MPC_TKO_SPEED](../advanced_config/parameter_reference.md#MPC_TKO_SPEED)
- [MPC_LAND_SPEED](../advanced_config/parameter_reference.md#MPC_LAND_SPEED)
- [MPC_LAND_ALT1](../advanced_config/parameter_reference.md#MPC_LAND_ALT1)
- [MPC_LAND_ALT2](../advanced_config/parameter_reference.md#MPC_LAND_ALT2)

