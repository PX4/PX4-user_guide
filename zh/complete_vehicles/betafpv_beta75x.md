# BetaFPV Beta75X 2S 穿越机

BetaFPV的这款Beta75X 小型四旋翼穿越机, 可以进行室内或室外的FPV飞行或者是肉眼直飞。

![BetaFPV Beta75X](../../assets/hardware/betafpv_beta75x.jpg)

## 购买渠道

*Beta75X*可以从以下的供应商购买，包括：

- [GetFPV](https://www.getfpv.com/beta75x-2s-brushless-whoop-micro-quadcopter-xt30-frsky.html)
- [Amazon](https://www.amazon.com/BETAFPV-Beta75X-Brushless-Quadcopter-Smartaudio/dp/B07H86XSPW)

另外你还需要一些其它的配件：

- 一个遥控器以及接收机。 *Beta75X* 可以多个和多种接收机一起购买。 PX4 能够兼容这些版本的接收机, 但请务必选择与您的遥控器 匹配的版本。
- 锂电池充电器 (飞机发货时包含一块电池, 但你可能想要额外备用的)。
- 如果你想进行 FPV飞行, 那你则需要一副 FPV眼镜。 除了[Fatshark](https://www.fatshark.com/product/dominator-hd3-core-fpv-goggles/) 以外，还有许多兼容的备选方案。 >**注意** FPV支持是完全独立于PX4或者是其它的飞行控制器的。

## 刷写 Bootloader

*Beta75X*预装的是Betaflight。

在刷 PX4 固件之前，您必须先安装 PX4 的bootloader。 安装引导程序的说明可以在 [Omnibus F4](../flight_controller/omnibus_f4_sd.md#betaflight_configurator)主题中找到 (这是 基于*Beta 75X*的飞行控制)。

> **提示** 如果您愿意的话，您可以在后续重新安装Betaflight！

## 安装配置

一旦安装了bootloader引导程序之后，您就可以通过USB接口连接 *QGroundControl*地面站

> **Note** At time of writing *Omnibus F4* is supported on the QGroundControl *Daily Build*, and prebuilt firmware is provided for the master branch only (stable releases are not yet available).

安装和配置 PX4:

- [加载PX4 固件](../config/firmware.md)。 
- [Set the Airframe](../config/airframe.md) to *BetaFPV Beta75X 2S Brushless Whoop*.
- Continue with [basic configuration](../config/README.md), including sensor calibration and radio setup.

## Video

{% youtube %} https://youtu.be/_-O0kv0Qsh4 {% endyoutube %}