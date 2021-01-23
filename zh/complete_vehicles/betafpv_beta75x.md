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
- FPV goggles if you want to fly FPV. There are many compatible options, including these ones from [Fatshark](https://www.fatshark.com/product/dominator-hd-v3-fpv-headset-goggles/).
    
    :::note FPV support is completely independent of PX4/flight controller.
:::

## 刷写 Bootloader

*Beta75X*预装的是Betaflight。

在刷 PX4 固件之前，您必须先安装 PX4 的bootloader。 安装引导程序的说明可以在 [Omnibus F4](../flight_controller/omnibus_f4_sd.md#bootloader)主题中找到 (这是 基于*Beta 75X*的飞行控制)。

:::tip
You can always [reinstall Betaflight](../advanced_config/bootloader_update_from_betaflight.md#reinstall_betaflight) later if you want!
:::

## 安装配置

Once the bootloader is installed, you should be able to connect the vehicle to *QGroundControl* via a USB cable.

:::note
At time of writing *Omnibus F4* is supported on the QGroundControl *Daily Build*, and prebuilt firmware is provided for the master branch only (stable releases are not yet available).
:::

To install and configure PX4:

- [首先更新PX4 固件目录](../config/firmware.md)。 
- [选择](../config/airframe.md)飞行器为*Betata Fpv Betavo 75X 2S Brushnon Whoot*。
- 再继续进行一些[基本配置](../config/README.md)，包括传感器校准和电台设置。

## 视频

@[youtube](https://youtu.be/_-O0kv0Qsh4)