# CUAV P8 Telemetry Radio

CUAV P8 Radio is a long range (>60km) and high data rate (375Kbps) remote data transmission module for drones.

It supports multiple modes such as point-to-point, point-to-multipoint, and relay communication.

![CUAV P8 Radio](../../assets/hardware/telemetry/p8.png)

:::tip
 CUAV P8 Radio has completed the factory configuration (baud rate 57600, broadcast mode). It should be plug and play, no need to configure it. If you need to configure it, go to the [configuration guide](https://doc.cuav.net/data-transmission/p8-radio/en/config.html).
:::

## Key Features

- Long range: >60km (depending on the antenna and environment, up to 100 km).
- Supports point-to-point, point-to-multipoint, and repeater modes.
- Up to 2W power (fixed frequency 2W; frequency hopping 1W)
- Up to 345Kbps transfer rate.
- Supports 12v~60V operating voltage.
- Unit can operate either as ground station modem or aircraft modem.
- Independent power supply for more stable operation
- USB Type-C port, integrated USB to UART converter

## Purchase

* [CUAV store](https://store.cuav.net/shop/cuav-p8-radio-uav-telemetry/)
* [CUAV alibaba](https://www.alibaba.com/product-detail/Free-shipping-CUAV-UAV-P8-Radio_1600324379418.html?spm=a2747.manage.0.0.2dca71d2bY4B0M)

## Pinouts

![ P8 pinouts](../../assets/hardware/telemetry/p8-pinouts.png)

| pin | C-RTK GPS 6P  | pin | Pixhawk standard pins 
| --- | ------------- | --- | ----------------------- |
| 1   | 5V+(NC)       | 1   | VCC             |      
| 2   | RX            | 2   | TX              |    
| 3   | TX            | 3   | RX              | 
| 4   | RTS           | 4   | RTS             |
| 5   | CTS           | 5   | CTS             |
| 6   | GND           | 6   | GND             | 

## Wiring

![P8 pinouts](../../assets/hardware/telemetry/p8-connect.png)

- Connect the CUAV P8 Radio to the TELEM1/TELEM2 interface of the flight controller and use a battery or BEC to power the module.

:::tip
CUAV P8 Radio does not support power supply from the flight controller, it needs to be connected to a 12~60v battery or BEC; the required cable is already included in the package.
:::

## More information

[P8 manual](http://manual.cuav.net/data-transmission/p8-radio/p8-user-manual-en.pdf)

[CUAV docs](https://doc.cuav.net/data-transmission/p8-radio/en/)