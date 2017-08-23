# VTOL Airframes

PX4 supports virtually all VTOL configurations:

  * Tailsitters (duo and quadrotors in X and plus configuration)
  * Tiltrotors (Firefly Y6)
  * QuadPlane VTOL (standard plane plus quad)

The VTOL codebase is the same codebase as for all other airframes and just adds additional control logic, in particular for transitions.

<!-- 
> **Note** All these VTOL configurations have been actively test-flown and are ready to use. Ensure that there is airspeed sensor attached to the system as it is used by the autopilot when its safe to perform the transition.
-->

This section contains build logs and instructions for assembling and configuring a number of VTOL vehicle frames.


## Key Configuration Parameters

These configuration parameters have to be set correctly when creating a new airframe configuration.

* [VT_FW_PERM_STAB](../advanced_config/parameter_reference.md#VT_FW_PERM_STAB) the system always uses attitude stabilization in hover mode. If this parameter is set to 1, the plane mode also defaults to attitude stabilization. If it is set to 0, it defaults to pure manual flight.
* [VT_ARSP_TRANS](../advanced_config/parameter_reference.md#VT_ARSP_TRANS) is the airspeed in m/s at which the plane transitions into forward flight. Setting it too low can cause a stall during the transition.
* [RC_MAP_TRANS_SW](../advanced_config/parameter_reference.md#RC_MAP_TRANS_SW) should be assigned to a RC switch before flight. This allows you to check if the multicopter- and fixed wing mode work properly. (Can also be used to switch manually between those two control modes during flight)

## Tailsitter

Build Logs:
* [TBS Caipiroshka](../frames_vtol/vtol_tailsitter_caipiroshka_pixracer.md)

{% youtube %}https://www.youtube.com/watch?v=acG0aTuf3f8&vq=hd720{% endyoutube %}

## Tiltrotor

<!-- The [build log](https://pixhawk.org/platforms/vtol/birdseyeview_firefly) contains all settings and instructions to get one of these up and running. -->

Build Logs:
* [FireFly Y6 Tiltrotor](../frames_vtol/vtol_tiltrotor_birdseyeview_firefly_y6_pixfalcon.md)
* [Convergence Tiltrotor](../frames_vtol/vtol_tiltrotor_eflite_convergence_pixfalcon.md)

{% youtube %}https://www.youtube.com/watch?v=Vsgh5XnF44Y&vq=hd720{% endyoutube %}

## QuadPlane VTOL

<!-- The [build log](https://pixhawk.org/platforms/vtol/fun_cub_quad_vtol) contains further instructions how to build and reproduce the results below. -->

Build Logs:
* [Falcon Vertigo QuadPlane](../frames_vtol/vtol_quadplane_falcon_vertigo_hybrid_rtf_dropix.md)
* [FunCub QuadPlane](../frames_vtol/vtol_quadplane_fun_cub_vtol_pixhawk.md)
* [Ranger QuadPlane](../frames_vtol/vtol_quadplane_volantex_ranger_ex_pixhawk.md)


{% youtube %}https://www.youtube.com/watch?v=4K8yaa6A0ks&vq=hd720{% endyoutube %}

{% youtube %}https://www.youtube.com/watch?v=7tGXkW6d3sA&vq=hd720{% endyoutube %}

