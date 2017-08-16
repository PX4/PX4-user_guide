# VTOL Without an Airspeed Sensor

> **Warning** Warning: the use of an airspeed sensor is advised.
  Support for VTOL's without an airspeed sensor is considered experimental
  and should only be attempted by experienced pilots.

Fixed wings use airspeed sensors to determine the speed at which the
airplane is moving through the air. Depending on wind this could
vary from groundspeed. Every airplane has a minimum airspeed below which
the airplane will stall. In mild weather conditions and with settings
significantly above stall speed a VTOL can operate without the use of an
airspeed sensor. The settings should also be applicable to non-VTOL
fixed wings but this is currently untested.

This guide will outline the parameter settings required to bypass the
airspeed sensor for VTOL planes.

## Preparation

Before attempting to eliminate an airspeed sensor you should first
determine a safe throttle level. Also the duration for a front
transition needs to be known. To do this you can either perform a
reference flight with an airspeed sensor or fly the vehicle manually. In
both cases the reference flight should be performed in very low wind
conditions.

The flight should be performed at a speed that would be sufficient to
fly in high wind conditions and should consist of:

-   A successful front transition
-   A straight and level flight
-   An aggressive turn
-   A quick ascend to a higher altitude

## Examining the log

After the reference flight download the log and use
[flightplot](https://pixhawk.org/dev/flightplot) to examine the log.
Plot the altitude (GPOS.Alt), thrust (ATC1.Thrust), groundspeed
(Expression:sqrt(GPS.VelN\^2 + GPS.VelE\^2)), pitch (ATT.Pitch) and roll
(AT.Roll).

Examine the throttle level (thrust) when the vehicle is level (no or
little pitch and roll), during the ascend (increasing altitude) and when
the vehicle is banking (more roll). The initial value to use as cruise
speed should be the highest thrust applied during a roll or ascend, the
thrust during level flight should be considered the minimum value if you
decide to further tune down your speed.

Also take note of the time it took for a front transition to complete.
This will be used to set the minimum transition time. For safety reasons
you should add +- 30% to this time.

Finally take note of the groundspeed during cruise flight. This can be
used to tune your throttle setting after the first flight without an
airspeed sensor.

## Setting the parameters

To bypass the flight checks you need to set the circuit breaker for the
airspeed sensor (CBRK_AIRSPD_CHK) to 162128.

To tell the flight controller it will fly without an airspeed sensor you
need to set the airspeed mode (FW_ARSP_MODE) to 'declare airspeed
invalid' (2).

Set the cruise throttle (FW_THR_CRUISE) to the percentage as
determined from the log of the reference flight. Note that QGC scales
this from 1..100 and the thrust value from the log is scaled from 0..1.
So a thrust of 0.65 should be entered as 65. For safety reasons it is
recommended to add +- 10% throttle to the determined value for testing a
first flight.

Set the minimum front transition time (VT_TRANS_MIN_TM) to the number
of seconds determined from the reference flight and add +- 30% for
safety.

### Optional recommended parameters

Because the risk of stalling is real, it is recommended to set the
'fixed wing minimum altitude' aka 'QuadChute'  (VT_FW_MIN_ALT). This
will cause the VTOL to transition back to multicopter mode and initiate
the RTL mode below a certain altitude. You could set this to 15 or 20
meters to give the multicopter time to recover from a stall.

The position estimator tested for this mode is EKF2, you can set this by
changing the SYS_MC_EST_GROUP.

## First flight without airspeed sensor

The values apply to a position controlled flight (like loiter or
mission). It is therefor recommended that a mission is configured at a
safe altitude, approximately 10m above the QuadChute threshold. Like for
the reference flight, this flight should be performed in very low wind
conditions. For the first flight the following is recommended;

-   Stay at one altitude
-   Set the waypoints wide enough and in such a fashion that no sharp
    turns are required
-   Keep the mission small enough that it remains in sight should a
    manual override be required.
-   If the airspeed is very high, consider performing a manual back
    transition by switching to Altitude mode.

If the mission finished successfully you should proceed to examine the
log for the following;

-   The groundspeed should be considerably above the groundspeed from
    the reference flight.
-   The altitude should not have been significantly lower than the
    reference flight.
-   The pitch angle should not have consistently been different from the
    reference flight.

If all these conditions have been met you can start to tune down the
cruise throttle in small steps until the groundspeed matches that of the
reference flight.

## QUICK OVERVIEW OF RELEVANT PARAMETERS

-   FW_ARSP_MODE: Declare invalid (2)
-   CBRK_AIRSPD_CHK: 162128
-   SYS_MC_EST_GROUP: EKF2 (2)
-   FW_THR_CRUISE: determined (e.g. 70%)
-   VT_TRANS_MIN_TM: determined (e.g. 10 seconds)
-   VT_FW_MIN_ALT: 15

