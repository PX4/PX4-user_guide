# Spedix S250

The Spedix S250 is a complete wide-arm racing quadcopter perfectly
suited for the [Pixracer](../flight_controller/pixracer.md) autopilot.


## Hardware

The hardware required for this build is displayed below.

![Spedix s250 components (unassembled)](../../images/spedix_s250aq_arf_components_unassembled.jpg)

## Mounting and Wiring

Connect GPS and the Wifi module as shown in the [Pixracer instructions](../flight_controller/pixracer.md). 
Connect the four motors in the layout and order as shown below, so the MAIN1 connector should
connect to motor 1, and so on.

![Motor order diagram for quad in X configuration](../../images/motor_order_quad_x.png)

## Airframe Configuration

Select the QAV250 configuration as shown below. This will not only put
PX4 into quadrotor mode, but also load decent default tuning gains.

![QGC - COnfigure airframe as for QAV250](../../images/qgc_qav250_config.png)
