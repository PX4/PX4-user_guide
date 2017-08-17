# VTOL Airframes

The [PX4 Flight Stack](../concept/flight_stack.md) supports virtually all VTOL configurations:

  * Tailsitters (duo and quadrotors in X and plus configuration)
  * Tiltrotors (Firefly Y6)
  * Standard plane VTOL (plane plus quad)

The VTOL codebase is the same codebase as for all other airframes and just adds additional control logic, in particular for transitions.

> **Note** All these VTOL configurations have been actively test-flown and are ready to use. Ensure to have an airspeed sensor attached to the system as its used by the autopilot when its safe to perform the transition.


## Key Configuration Parameters

These configuration parameters have to be set correctly when creating a new airframe configuration.

  * `VT_FW_PERM_STAB` the system always uses attitude stabilization in hover mode. If this parameter is set to 1, the plane mode also defaults to attitude stabilization. If it is set to 0, it defaults to pure manual flight.
  * `VT_ARSP_TRANS` is the airspeed in m/s at which the plane transitions into forward flight. Setting it too low can cause a stall during the transition.
  * `RC_MAP_TRANS_SW` should be assigned to a RC switch before flight. This allows you to check if the multicopter- and fixed wing mode work properly. (Can also be used to switch manually between those two control modes during flight)

## Tailsitter

The [build log](../frames_vtol/caipiroshka.md) contains further detail.

{% youtube %}https://www.youtube.com/watch?v=acG0aTuf3f8&vq=hd720{% endyoutube %}

## Tiltrotor

The [build log](https://pixhawk.org/platforms/vtol/birdseyeview_firefly) contains all settings and instructions to get one of these up and running.

{% youtube %}https://www.youtube.com/watch?v=Vsgh5XnF44Y&vq=hd720{% endyoutube %}

## Standard Plane VTOL

The [build log](https://pixhawk.org/platforms/vtol/fun_cub_quad_vtol) contains further instructions how to build and reproduce the results below.

{% youtube %}https://www.youtube.com/watch?v=4K8yaa6A0ks&vq=hd720{% endyoutube %}

{% youtube %}https://www.youtube.com/watch?v=7tGXkW6d3sA&vq=hd720{% endyoutube %}

