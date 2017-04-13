# Pixhawk Standard Plane Connections

This document shows the Pixhawk flight controller connections for a standard plane (a standard plane is a plane with aileron, elevator, rudder and throttle).

Output | Actuator
--- | ---
MAIN 1 | Aileron (assuming a Y cable)
MAIN 2 | Elevator
MAIN 3 | Throttle
MAIN 4 | Rudder

> **Caution** It is assumed that you will supply to the power rail (in order to power the servos for aileron, elevtor, rudder). Typically your throttle motor uses an ESC with an
  integrated BEC so that power is supplied to the Pixhawk from MAIN3. If not, you will need to setup a 5V BEC to connect to one of the free Pixhawk ports.                           

