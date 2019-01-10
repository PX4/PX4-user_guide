# BetaFPV Beta75X 2S Brushless Whoop

The [BetaFPV Beta75X](https://betafpv.com/products/beta75x-2s-whoop-quadcopter) is a very small quadrotor that can be flown indoors or outdoors, FPV or line-of-sight.

![BetaFPV Beta75X](../../assets/hardware/betafpv_beta75x.jpg)

## Where to Buy
The whoop can be bought from [getfpv](https://www.getfpv.com/beta75x-2s-brushless-whoop-micro-quadcopter-xt30-frsky.html) for example.

In addition you will need an RC transmitter (make sure to select the matching receiver version), FPV goggles if you want to fly FPV, and a LiPo battery charger.

## Flashing PX4
The Beta75X comes preflashed with Betaflight.
It uses an Omnibus F4 board, and thus the [same instructions](omnibus_f4_sd.md#upload) can be used to flash the PX4 bootloader and firmware.

## Connecting QGroundControl
Once the firmware is flashed, you should be able to connect QGC via USB cable.
Go through the initial setup, start with setting the [Airframe](../config/airframe.md) to "BetaFPV Beta75X 2S Brushless Whoop", and continue with sensor calibrations and radio setup.

