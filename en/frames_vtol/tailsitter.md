# Tailsitter VTOL

A **Tailsitter VTOL** is a [VTOL](../frames_vtol/README.md) vehicle that takes off and lands on its tail, but flips into the fixed-wing orientation for normal flight.
The tailsitter rotors are permanently fixed in position for forward flight.

![wingtraone](../../assets/airframes/vtol/wingtraone/hero.jpg)

*Wingtra: "WingtraOne" VTOL Duo Tailsitter*



## VTOL Types

PX4 supports the three most important/main VTOL configurations.





In general, as mechanical complexity increases the vehicles are easier to fly, but the cost and weight increase.
Each type has advantages and disadvantages, and there are successful commercial ventures based on all of them.

The complete set of supported configurations can be seen in [Airframes Reference > VTOL](../airframes/airframe_reference.md#vtol).

The VTOL codebase is the same codebase as for all other airframes and just adds additional control logic, in particular for transitions.


## Flying and Flight Modes

A VTOL aircraft can fly as either a multicopter or as fixed-wing vehicle.
Multicopter mode is mainly used for take off and landing while the fixed wing mode is used for efficient travel and/or mission execution.

The flight modes for VTOL vehicles are the same as for [multicopter](../getting_started/flight_modes.md#mc_flight_modes) when flying in MC mode and [fixed-wing](../getting_started/flight_modes.md#fw_flight_modes) when flying in FW mode.

The switch between modes is initiated either by the pilot using an RC switch or automatically by PX4 when needed in missions or other auto modes.


## Videos

This section contains videos that are specific to Tailsitter VTOL (videos that apply to all VTOL types can be found in [VTOL](../frames_vtol/README.md)).

---

[UAV Works VALAQ Patrol Tailsitter](https://www.valaqpatrol.com/tech-data/)

@[youtube](https://youtu.be/pWt6uoqpPIw)


[TBS Caipiroshka](../frames_vtol/vtol_tailsitter_caipiroshka_pixracer.md)

@[youtube](https://www.youtube.com/watch?v=acG0aTuf3f8&vq=hd720)

