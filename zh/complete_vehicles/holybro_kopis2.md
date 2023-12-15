# Holybro Kopis 2

The [Holybro Kopis 2](https://holybro.com/products/kopis2-hdv-free-shipping) is a ready-to-fly race quad for flying FPV or line-of-sight.

![Kopis 2](../../assets/hardware/holybro_kopis2.jpg)

## 购买渠道

The _Kopis 2_ can be bought from a number of vendors, including:

- [Holybro](https://holybro.com/products/kopis2-hdv-free-shipping) <!-- item code 30069, 30070 -->
- [GetFPV](https://www.getfpv.com/holybro-kopis-2-fpv-racing-drone-pnp.html)

另外你还需要一些其它的配件：

- 一个遥控器以及接收机。 The _Kopis 2_ can ship with an FrSky receiver or no receiver at all.
- LiPo battery and charger.
- FPV goggles if you want to fly FPV. There are many compatible options, including these ones from [Fatshark](https://www.fatshark.com/product-page/dominator-v3). You can also use DJI FPV goggles if you have the HDV version of the Kopis 2.

  :::note
FPV support is completely independent of PX4/flight controller.
:::

## 刷写 Bootloader

The _Kopis 2_ comes preinstalled with Betaflight.

在刷 PX4 固件之前，您必须先安装 PX4 的bootloader。 Instructions for installing the bootloader can be found in the [Kakute F7](../flight_controller/kakutef7.md#bootloader) topic (this is the flight controller board on the _Kopis 2_).

:::tip
You can always [reinstall Betaflight](../advanced_config/bootloader_update_from_betaflight.md#reinstall-betaflight) later if you want!
:::

## 安装配置

Once the bootloader is installed, you should be able to connect the vehicle to _QGroundControl_ via a USB cable.

:::note
At time of writing _Kopis 2_ is supported on the QGroundControl _Daily Build_, and prebuilt firmware is provided for the master branch only (stable releases are not yet available).
:::

To install and configure PX4:

- [首先更新PX4 固件目录](../config/firmware.md)。
- [Set the Airframe](../config/airframe.md) to _Holybro Kopis 2_.
- 再继续进行一些[基本配置](../config/README.md)，包括传感器校准和电台设置。
