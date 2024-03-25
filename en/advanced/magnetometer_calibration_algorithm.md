# Magnetometer calibration algorithms

This document details the algorithm behind the magnetometer calibration inside PX4.

## Overview

Magnetometer calibration can be broken down into 3 segments:

1. Power consumption offset calibration
2. Offset calibration
   1. Hard iron calibration
3. Soft iron calibration

And at the end, the calibration is applied in following steps:

1. We start with the raw sensor data: [SensorMag](../msg_docs/SensorMag.md)
2. Power compensation offset gets added, with scaling via the power taken from either `throttle` output or from battery current (in kilo-Ampere)
3. Offset gets subtracted
4. Scaling matrix gets applied
5. Sensor orientation rotation matrix gets applied

Therefore it has the following components:

1. `power_compensation[3]`: Offset that occurs from power consumption in XYZ sensor frame, as documented in [Compass power compensation](../advanced_config/compass_power_compensation.md).
2. `offset[3]`: Offset value (that sensor will output in environment with no magnetic field) in sensor frame, in same unit as [SensorMag](../msg_docs/SensorMag.md), `Gauss`.
3. `scale[3 x 3]`: Scaling & rotating matrix to incorporate soft iron calibration effect & internal sensor scaling
4. `rotation[3 x 3]`: Final rotation matrix to transform magnetometer data from sensor frame to body frame, set via setting the rotation enum as in [Flight Controller Orientation](../config/flight_controller_orientation.md).


## Orthogonal offset calibration



### Hard iron calibration

:::note
This only runs when the vehicle is **disarmed**.
:::

The `MagBiasEstimator` module constantly estimates the bias (hard iron) in the magnetometer reading.

Based on the angular velocity data & magnetometer data, the [MagnetometerBiasEstimate](../msg_docs/MagnetometerBiasEstimate.md) message gets published and bias in XYZ axis direction 

The paper explaining the theory in detail can be found here: http://www.roboticsproceedings.org/rss09/p50.pdf.

## Soft iron calibration

This corresponds to `CAL_MAG${i}_XODIAG` for example, which defines the off-axis diagonal scale of the 

## Final sensor rotation