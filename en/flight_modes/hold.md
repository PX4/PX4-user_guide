# HOLD Flight Mode

The HOLD flight mode causes the vehicle to stop and maintain its current GPS position and altitude (MC vehicles will hover at the GPS position, while FW vehicles will circle around it).

> **Tip** This mode can be used to help you regain control of a vehicle in an emergency or to pause a mission. It is usually activated with a pre-programmed switch. 

The specific behaviour for each vehicle type is described below.

> **Note** 
> * This mode requires GPS.
> * This mode is automatic (RC control disabled except to change mode).
 

## Multi-Copter (MC)

A multicopter hovers at the current position and altitude. If below the specified minimal altitude, the multirotor will first ascend to minimal altitude.

<!-- what is the specified minimal altitude - ie what param -->

## Fixed Wing (FW)

The aircraft circles around the GPS hold position at the current altitude.

<!-- Does aircraft have a minimal flight height? -->
<!-- Text here originally said "The aircraft loiters around the current position at the current altitude (or possibly slightly above the current altitude" 
Why slightly higher?-->

## VTOL

A VTOL follows the HOLD behavior and parameters of [Fixed Wing](#fixed-wing-fw) when in FW mode, and of [Multicopter](#multi-copter-mc) when in MC mode.


<!-- this maps to AUTO_LOITER in dev -->

