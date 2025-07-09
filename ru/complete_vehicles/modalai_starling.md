---
canonicalUrl: https://docs.px4.io/main/ru/complete_vehicles/modalai_starling
---

# VOXL 2 Starling PX4 Development Drone

The [Starling](https://modalai.com/starling) is a SLAM development drone supercharged by [VOXL 2](../flight_controller/modalai_voxl_2.md) and PX4 with SWAP-optimized sensors and payloads optimized for indoor and outdoor autonomous navigation. Powered by Blue UAS Framework autopilot, VOXL 2, the Starling weighs only 275g and boasts an impressive 30 minutes of autonomous indoor flight time.

![Overview](../../assets/hardware/complete_vehicles/modalai_starling/starling_front_hero.jpg)

The VOXL 2 Starling is a PX4 development drone that houses a [VOXL 2](../flight_controller/modalai_voxl_2.md) companion computer and PX4 flight controller, image sensors, GPS, and connectivity modem and is ready-to-fly out-of-the-box. The Starling features ModalAI’s [open SDK](https://docs.modalai.com/voxl-developer-bootcamp/) that has pre-configured autonomy models for computer vision assisted flight. This development drone is meant to help you get to market faster and accelerate your application development and prototyping.

This guide explains the minimal additional setup required to get the UAV ready to fly. It also covers a hardware overview, first flight, setting up WiFi, and more.

:::note
For complete and regularly updated documentation, please visit <https://docs.modalai.com/starling-v2>.  
:::

:::note
If you are new to VOXL, be sure to familiarize yourself with the core features of VOXL hardware and software by reviewing the [VOXL Bootcamp](https://docs.modalai.com/voxl-developer-bootcamp/)
:::

## Where to Buy

[modalai.com/starling](https://modalai.com/starling)

## Hardware Overview

![Hardware Overview](../../assets/hardware/complete_vehicles/modalai_starling/mrb_d0005_4_v2_c6_m22__callouts_a.jpg)

| Callout | Description                           | MPN              |
| ------- | ------------------------------------- | ---------------- |
| A       | VOXL 2                                | MDK-M0054-1      |
| B       | VOXL 4-in-1 ESC                       | MDK-M0117-1      |
| C       | Barometer Shield Cap                  | M10000533        |
| D       | ToF Image Sensor (PMD)                | MDK-M0040        |
| E       | Tracking Image Sensor (OV7251)        | M0014            |
| F       | Hires Image Sensor (IMX214)           | M0025-2          |
| G       | AC600 WiFi Dongle                     | AWUS036EACS      |
| H       | GNSS GPS Module & Compass             | M10-5883         |
| I       | 915MHz ELRS Receiver                  | BetaFPV Nano RX  |
| J       | USB C Connector on VOXL 2 (not shown) |                  |
| K       | VOXL Power Module                     | MCCA-M0041-5-B-T |
| L       | 4726FM Propellor                      | M10000302        |
| M       | Motor 1504                            |                  |
| N       | XT30 Power Connector                  |                  |

## Datasheet

### Specifications

| Component       | Specification                                                     |
| --------------- | ----------------------------------------------------------------- |
| Autopilot       | VOXL2                                                             |
| Take-off Weight | 275g (172g without battery)                                       |
| Diagonal Size   | 211mm                                                             |
| Flight Time     | >30 minutes                                                       |
| Motors          | 1504                                                              |
| Propellers      | 120mm                                                             |
| Frame           | 3mm Carbon Fiber                                                  |
| ESC             | ModalAI VOXL 4-in-1 ESC V2                                        |
| GPS             | UBlox M10                                                         |
| RC Receiver     | 915mhz ELRS                                                       |
| Power Module    | ModalAI Power Module v3 - 5V/6A                                   |
| Battery         | Sony VTC6 3000mah 2S, or any 2S 18650 battery with XT30 connector |
| Height          | 83mm                                                              |
| Width           | 187mm (Props folded)                                              |
| Length          | 142mm (Props folded)                                              |

### Hardware Wiring Diagram

![Hardware Overview](../../assets/hardware/complete_vehicles/modalai_starling/d0005_compute_wiring_d.jpg)

## Tutorial Videos

- [VOXL 2 Starling Hardware Overview](https://youtu.be/M9OiMpbEYOg)
- [VOXL 2 Starling First Flight Tutorial](https://youtu.be/Cpbbye3Z6co)
- [VOXL 2 Starling ELRS Set Up](https://youtu.be/7OwGS-kcFVg)
