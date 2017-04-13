# Flight Mode Configuration

Flight modes define how to flight controller interprets user input.

PX4 supports multiple ways of selecting flight modes:

- From the tablet/ground control station
- Via multiple, individual switches on a radio control (multi-channel)
- Via a single channel mapped to a single dial or multiple switches
  (single-channel)

If radio control and tablet are both connected, the tablet can command
flight mode changes, but the radio control will override the change
whenever its own flight mode selection switch changes.

## Multi-Channel Flight Mode Selection

Select the individual channels for each flight mode selector in the
flight mode configuration UI as shown in the [autopilot setup
video](autopilot_configuration.md).

## Single-Channel Flight Mode Selection

The configuration of a FrSky Taranis RC transmitter and the
configuration of PX4 to use it as a single-channel input are shown
below.

{% youtube %}
http://www.youtube.com/watch?v=scqO7vbH2jo
{% endyoutube %}


## Kill Switch

For operators wanting an instantaneous kill switch: The
parameter RC_MAP_KILL_SW can be set to a RC channel (1..max channel).
Once set, that channel stops all motor outputs immediately. Since this
is an advanced feature for power users, no UI support is provided to set
it up.
