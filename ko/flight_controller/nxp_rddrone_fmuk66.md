# NXP RDDRONE-FMUK66 FMU

:::warning PX4에서는 이 제품을 제조하지 않습니다. 하드웨어 지원과 호환 문제는 [제조사](https://www.nxp.com/)에 문의하십시오.
:::

RDDRONE-FMUK66 FMU는 2  자동차 이더넷 100BASET1 및 보안 요소 A71CH (RevC) 또는 SE050 (RevD)을 추가하여 Pixhawk FMUv4 사양을 준수하는 NXP Semiconductor 구성 요소를 사용하는 참조 설계입니다. NXP는 이 설계를 복제, 변경 또는 재활용 할 수 있도록 회로도, 거버, BOM 및 소스 파일을 제공합니다.

[HoverGames](https://www.hovergames.com/)와 함께 사용하기 위한 공식 FMU입니다.

![RDDRONE-FMUK66 FMU Hero Image1](../../assets/flight_controller/nxp_rddrone_fmuk66/HoverGamesDrone_14042019_XL_020.jpg)

![RDDRONE-FMUK66 FMU Hero Image2](../../assets/flight_controller/nxp_rddrone_fmuk66/HoverGamesDrone_14042019_XL_021.jpg)

NXP FMU와 포함된 주변 장치는 FCC/CE/RoHs/REACH 지침을 준수합니다.

:::note
이 비행 컨트롤러는 [제조업체에서 지원](../flight_controller/autopilot_manufacturer_supported.md)합니다.
:::


## 요약

- **Main FMU Processor:**
  - Kinetis K66 MK66FN2MOVLQ18 microcontroller running at 180MHz Cortex-M4F MCU, 2MB Flash, 256KB SRAM, Dual USBs (FS + HS), Ethernet, 144-LQFP.
- **On-board sensors:**
  - Accel/Gyro: BMI088/ICM42688 (RevD)...
  - Accel/Magnetometer: FXOS8700CQ
  - Gyro: FXAS21002CQ
  - Magnetometer: BMM150
  - Barometer: ML3115A2
  - Barometer: BMP280
- **GPS:**
  - u-blox Neo-M8N GPS/GLONASS receiver; integrated magnetometer IST8310


This FMU is provided only as a kit, and includes [Segger Jlink EDU mini debugger](https://www.segger.com/products/debug-probes/j-link/models/j-link-edu-mini/), DCD-LZ debugger adapter, USB-TTL-3V3 console cable, HolyBro GPS module, battery power module, SDCard and case, screws and stickers. Telemetry radios ([HGD-TELEM433](https://www.nxp.com/part/HGD-TELEM433) and [HGD-TELEM915](https://www.nxp.com/part/HGD-TELEM915)) must be purchased separately to match ISM band frequencies used in your country.

![RDDRONE-FMUK66 FMU Kit](../../assets/flight_controller/nxp_rddrone_fmuk66/rddrone_fmu66_kit_img_contents.jpg)

A "Lite" version RDDRONE-FMUK66L is also available which does not include the power module, GPS, Jlink or USB-TTL-3V3 console cable or SDCard.[Scroll down to see FMUK66L in the buy section of the FMUK66 buy page](https://www.nxp.com/design/designs/px4-robotic-drone-fmu-rddrone-fmuk66:RDDRONE-FMUK66#buy)

Additional information can be found in the [Technical Data Sheet](https://www.nxp.com/design/designs/px4-robotic-drone-fmu-rddrone-fmuk66:RDDRONE-FMUK66). <!-- www.nxp.com/rddrone-fmuk66 -->


## Purchase

**RDDRONE-FMUK66** reference design kit may be purchased direct from NXP or from any of NXP's authorised worldwide network of [electronics distributors](https://www.nxp.com/support/sample-and-buy/distributor-network:DISTRIBUTORS).

- [Purchase Link](https://www.nxp.com/design/designs/px4-robotic-drone-fmu-rddrone-fmuk66:RDDRONE-FMUK66#buy) (www.nxp.com)
- Telemetry radios are purchased separately depending on frequency band:
  - [HGD-TELEM433](https://www.nxp.com/part/HGD-TELEM433)
  - [HGD-TELEM915](https://www.nxp.com/part/HGD-TELEM915)

:::note
*RDDRONE-FMUK66* FMU is also included in the complete HoverGames drone kit: [KIT-HGDRONEK66](https://www.nxp.com/applications/solutions/industrial/aerospace-and-mobile-robotics/uavs-drones-and-rovers/nxp-hovergames-drone-kit-including-rddrone-fmuk66-and-peripherals:KIT-HGDRONEK66#buy)
:::

<!--
## Connectors

[Connector Diagram]

## Pinouts

[Pinouts listing or link]

## Dimensions

[Dimensions]

-->

## Assembly/Setup

https://nxp.gitbook.io/hovergames

## Building Firmware

:::tip
Most users will not need to build this firmware! It is pre-built and automatically installed by *QGroundControl* when appropriate hardware is connected.
:::

To [build PX4](../dev_setup/building_px4.md) for this target:
```
make nxp_fmuk66-v3_default
```


## Debug Port

The [PX4 System Console](../debug/system_console.md) and the [SWD interface](../debug/swd_debug.md) run on the [DCD-LZ FMU Debug](https://nxp.gitbook.io/hovergames/rddrone-fmuk66/connectors/debug-interface-dcd-lz) port.

NXP's DCD-LZ is a 7 pin JST-GH connector and adds the nRST/MCU_RESET pin to the [Pixhawk 6-Pin standard debug port](https://pixhawk.org/pixhawk-connector-standard/#dronecode_debug).

The DCD-LZ breakout adapter permits the use of a standard 10 pin JTAG/SWD interface (i.e. using the Segger Jlink) and a standard 5 pin FTDI USB-TTL-3V3 type cable.

<!--

## Peripherals

* [List of anything people should use with this hardware]

-->

## Supported Platforms / Airframes

Any multicopter / airplane / rover or boat that can be controlled with normal RC servos or Futaba S-Bus servos. The complete set of supported configurations can be seen in the [Airframes Reference](../airframes/airframe_reference.md).

![HoverGames Drone Kit](../../assets/flight_controller/nxp_rddrone_fmuk66/HoverGamesDrone_14042019_XL_001.jpg)

:::tip
The NXP [HoverGames Drone Kit](https://www.nxp.com/kit-hgdronek66) (shown above) is a complete drone development kit that includes everything needed to build a quadcopter. You only need to supply the 3S/4S LiPo battery.
:::

## Further info

- [HoverGames online documentation](https://nxp.gitbook.io/hovergames) PX4 user and programming guide, specific assembly, construction, debugging, programming instructions.

- 3DModels supporting HoverGames and RDDRONE-FMUK66 can be found on *Thingiverse* at these search links: [fmuk66](https://www.thingiverse.com/search?q=fmuk66&type=things&sort=relevant), [hovergames](https://www.thingiverse.com/search?q=hovergames&type=things&sort=relevant).

!\[HoverGamesDronelogo\](../../assets/flight_controller/nxp_rddrone_fmuk66/The HoverGames_Colored-small.png)

