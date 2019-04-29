# BetaFPV Beta75X 2S Brushless Whoop

BetaFPV的这款Beta75X 小型四旋翼穿越机, 可以进行室内或室外的FPV飞行或者是肉眼直飞。

![BetaFPV Beta75X](../../assets/hardware/betafpv_beta75x.jpg)

## 购买渠道

*Beta75X*可以从以下的供应商购买，包括：

- [GetFPV](https://www.getfpv.com/beta75x-2s-brushless-whoop-micro-quadcopter-xt30-frsky.html)
- [Amazon](https://www.amazon.com/BETAFPV-Beta75X-Brushless-Quadcopter-Smartaudio/dp/B07H86XSPW)

另外你还需要一些其它的配件：

- 一个遥控器以及接收机 *Beta75X* 可以多个和多种接收机一起购买。 PX4 能够兼容这些版本的接收机, 但请务必选择与您的遥控器 匹配的版本。
- LiPo battery charger (vehicle ships with one battery, but you may want spares).
- FPV goggles if you want to fly FPV. There are many compatible options, including these ones from [Fatshark](https://www.fatshark.com/product/dominator-hd3-core-fpv-goggles/). > **Note** FPV support is completely independent of PX4/flight controller.

## Flashing PX4 Bootloader

The *Beta75X* comes preinstalled with Betaflight.

Before loading PX4 firmware you must first install the PX4 bootloader. Instructions for installing the bootloader can be found in the [Omnibus F4](../flight_controller/omnibus_f4_sd.md#betaflight_configurator) topic (this is the flight controller board on the *Beta75X*).

> **Tip** You can always [reinstall Betaflight](../flight_controller/omnibus_f4_sd.md#reinstall_betaflight) later if you want!

## Installation/Configuration

Once the bootloader is installed, you should be able to connect the vehicle to *QGroundControl* via a USB cable.

> **Note** At time of writing *Omnibus F4* is supported on the QGroundControl *Daily Build*, and prebuilt firmware is provided for the master branch only (stable releases are not yet available).

To install and configure PX4:

- [Load PX4 Firmware](../config/firmware.md). 
- [Set the Airframe](../config/airframe.md) to *BetaFPV Beta75X 2S Brushless Whoop*.
- Continue with [basic configuration](../config/README.md), including sensor calibration and radio setup.

## Video

{% youtube %} https://youtu.be/_-O0kv0Qsh4 {% endyoutube %}