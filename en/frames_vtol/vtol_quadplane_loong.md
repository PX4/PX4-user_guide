# Foxtech Loong 2160 VTOL

The Foxtech Loong is a easy to build ARF quadplane VTOL drone with wingspan of 2160mm.
This build guide shows how to add a flight controller system (using [Auterion Skynode evaluation kit](../companion_computer/auterion_skynode.md), [Pixhawk 6C](../flight_controller/pixhawk6c.md) or [Pixhawk 6C mini](../flight_controller/pixhawk6c_mini.md)) and setup PX4.


## Overview

Specifications:
- Wingspan: 2160mm
- Fuselage: 1200mm
- Takeoff weight: ~ 7kg w/o payload
- Max flight time: ~ 1h 30min
- Cruising speed: ~ 17m/s
- Max payload weight: ~ 1.5kg
- Carry case: 125cm x 34cm x 34cm

Key features:
- Quick and easy to assemble
- Relatively compact to transport
- All actuators are already pre installed and wired up
- Flight time up to 1h 30min depending on weather conditions and takeoff weight
- Spacious fuselage -> room for different payloads as for example a Sony A7R as a mapping payload
- 

## Where to Buy

- [Foxtech FPV (ARF Combo)](https://www.foxtechfpv.com/foxtech-loong-2160-vtol.html)
- [Alibaba](https://www.alibaba.com/product-detail/Loong-2160-Long-Endurance-VTOL-Mapping_1600280686653.html)

## Flight Controller

The following options have been tested:

- [Auterion Skynode evaluation kit](../companion_computer/auterion_skynode.md)
- [Pixhawk 6C](../flight_controller/pixhawk6c.md) with [PM02 V3](../power_module/holybro_pm02.md)

## Additional Accessories

- [Auterion 12S Power Module]()
- [Holybro PM08D Power Module (alternative to Auterion PM)](https://holybro.com/collections/power-modules-pdbs/products/pm08d-digital-power-module-14s-200a)
- [GPS F9P (included in Skynode eval. kit)](../gps_compass/rtk_gps_holybro_h-rtk-f9p.md)
- [GPS M9N (cheaper alternative to F9P)](../gps_compass/rtk_gps_holybro_h-rtk-m8p.md)
- [Airspeed sensor (included in Skynode eval. kit)](https://www.dualrc.com/parts/airspeed-sensor-sdp33) — recommended for improved safety and performance
- [Airspeed sensor (cheaper alternative)](https://holybro.com/products/digital-air-speed-sensor?pr_prod_strat=use_description&pr_rec_id=236dfda00&pr_rec_pid=7150470561981&pr_ref_pid=7150472462525&pr_seq=uniform)
- [Lidar Lightware lw20-c (included in Skynode eval. kit)](../sensor/sfxx_lidar.md) (Optional)
- [Lidar Seeed Studio PSK-CM8JL65-CC5 (cheaper alternative)](https://www.seeedstudio.com/PSK-CM8JL65-CC5-Infrared-Distance-Measuring-Sensor-p-4028.html) (Optional)
- [Radio (RC) System](../getting_started/rc_transmitter_receiver.md) of your preference
- [Groundstation and Radio link](https://holybro.com/collections/rc-radio-transmitter-receiver/products/skydroid-h12?variant=42940989931709)
- [USB-C extension cable](https://www.digitec.ch/en/s1/product/powerguard-usb-c-usb-c-025-m-usb-cables-22529949?dbq=1&gclid=Cj0KCQjw2cWgBhDYARIsALggUhrh-z-7DSU0wKfLBVa8filkXLQaxUpi7pC0ffQyRzLng8Ph01h2R1gaAp0mEALw_wcB&gclsrc=aw.ds)
- [3M VHB tape](https://www.amazon.in/3M-VHB-Tape-4910-Length/dp/B00GTABM3Y)
- [3D-Printed mounts](https://github.com/PX4/PX4-user_guide/raw/main/assets/airframes/vtol/omp_hobby_zmo_fpv/omp_hobby_zmo_3d_prints.zip)
  - 1x Baseplate
  - 1x Stack fixture
  - 1x Fan-Mount
  - 1x Radio-Mount
  - 1x Top-Plate
- [Messing threaded inserts](https://cnckitchen.store/products/gewindeeinsatz-threaded-insert-set-standard-200-stk-pcs)
- [XT30 connectors]()
- [Div. Screws]()

## Tools

- Solering Iron
- Cables
- Tape
- Hotglue
- Cutter
- Hexdriver set

## Hardware Integration

In this documentation the integration of a Auterion Skynode is described. The installation of a Pixhawk can be done similarly.

### Preparations

### Avionics Unit

#### Prepare 3D-Printed Parts

Insert 10x M3 threaded inserts into the baseplate as shown in the picture:

Insert 2x M3 threaded inserts into the stack fixture as shown in the picture below:

Insert 2x M4 threaded inserts into the fan mount and radio mount as shown in the picture below. If you would like to add a 40mm 5V fan to the fan mount, insert 4x M3 inserts.

#### 40A Power Module

Remove the case from the 40A PM that comes with the Skynode evaluation kit. Screw the the PM with 2x M2x6mm to the bottom of the baseplate. Create a cable to extend the connector 

### Sensors

#### Pitot Tube

#### Lidar

#### GPS/Compass

#### Pixhawk 6c/6c mini

#### Skynode

### Antennas and RC Receiver

## Software Setup

### Select Airframe

### Load Parameters File

### Sensor Selection

### Sensor Calibration

### RC-Setup

### Actuator Setup

#### Control Surfaces

#### Motor Direction and Orientation

## First Flight


