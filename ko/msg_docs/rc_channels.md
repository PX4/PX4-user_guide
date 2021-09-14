# rc_channels (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/master/msg/rc_channels.msg)

```c
uint64 timestamp                        # time since system start (microseconds)

uint8 FUNCTION_THROTTLE      = 0
uint8 FUNCTION_ROLL          = 1
uint8 FUNCTION_PITCH         = 2
uint8 FUNCTION_YAW           = 3
uint8 FUNCTION_MODE          = 4
uint8 FUNCTION_RETURN        = 5
uint8 FUNCTION_POSCTL        = 6
uint8 FUNCTION_LOITER        = 7
uint8 FUNCTION_OFFBOARD      = 8
uint8 FUNCTION_ACRO          = 9
uint8 FUNCTION_FLAPS         = 10
uint8 FUNCTION_AUX_1         = 11
uint8 FUNCTION_AUX_2         = 12
uint8 FUNCTION_AUX_3         = 13
uint8 FUNCTION_AUX_4         = 14
uint8 FUNCTION_AUX_5         = 15
uint8 FUNCTION_PARAM_1       = 16
uint8 FUNCTION_PARAM_2       = 17
uint8 FUNCTION_PARAM_3_5     = 18
uint8 FUNCTION_KILLSWITCH    = 19
uint8 FUNCTION_TRANSITION    = 20
uint8 FUNCTION_GEAR          = 21
uint8 FUNCTION_ARMSWITCH     = 22
uint8 FUNCTION_STAB          = 23
uint8 FUNCTION_AUX_6         = 24
uint8 FUNCTION_MAN           = 25
uint8 FUNCTION_FLTBTN_SLOT_1 = 26
uint8 FUNCTION_FLTBTN_SLOT_2 = 27
uint8 FUNCTION_FLTBTN_SLOT_3 = 28
uint8 FUNCTION_FLTBTN_SLOT_4 = 39
uint8 FUNCTION_FLTBTN_SLOT_5 = 30
uint8 FUNCTION_FLTBTN_SLOT_6 = 31

uint8 FUNCTION_FLTBTN_SLOT_COUNT = 6

uint64 timestamp_last_valid                 # Timestamp of last valid RC signal
float32[18] channels                        # Scaled to -1..1 (throttle: 0..1)
uint8 channel_count                     # Number of valid channels
int8[32] function                       # Functions mapping
uint8 rssi                          # Receive signal strength index
bool signal_lost                        # Control signal lost, should be checked together with topic timeout
uint32 frame_drop_count                     # Number of dropped frames

```
