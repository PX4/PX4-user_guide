# vehicle_status_flags (UORB message)

TODO: rename to failsafe_flags (will be input to failsafe state machine)

[source file](https://github.com/PX4/PX4-Autopilot/blob/main/msg/vehicle_status_flags.msg)

```c
# TODO: rename to failsafe_flags (will be input to failsafe state machine)
#

uint64 timestamp				# time since system start (microseconds)

# Per-mode requirements
uint32 mode_req_angular_velocity
uint32 mode_req_attitude
uint32 mode_req_local_position
uint32 mode_req_local_position_relaxed
uint32 mode_req_global_position
uint32 mode_req_local_alt
uint32 mode_req_mission
uint32 mode_req_offboard_signal
uint32 mode_req_home_position
uint32 mode_req_prevent_arming    # if set, cannot arm while in this mode
uint32 mode_req_other             # other requirements, not covered above (for external modes)


bool calibration_enabled
bool pre_flight_checks_pass		# true if all checks necessary to arm pass
bool auto_mission_available
bool angular_velocity_valid
bool attitude_valid
bool local_altitude_valid
bool local_position_valid		# set to true by the commander app if the quality of the local position estimate is good enough to use for navigation
bool local_position_valid_relaxed	# Local position with reduced accuracy requirements (e.g. flying with optical flow)
bool local_velocity_valid		# set to true by the commander app if the quality of the local horizontal velocity data is good enough to use for navigation
bool global_position_valid		# set to true by the commander app if the quality of the global position estimate is good enough to use for navigation
bool gps_position_valid
bool home_position_valid		# indicates a valid home position (a valid home position is not always a valid launch)

bool offboard_control_signal_lost

bool rc_signal_found_once
bool rc_calibration_in_progress
bool vtol_transition_failure                        # Set to true if vtol transition failed

bool battery_low_remaining_time
bool battery_unhealthy

uint8 battery_warning


```
