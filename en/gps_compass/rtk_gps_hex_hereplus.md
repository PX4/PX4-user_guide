# HEX/ProfiCNC Here+ RTK GPS

The [Here+ RTK GPS receiver](http://www.proficnc.com/content/12-here) is a small, light and energy efficient [RTK GPS module](../gps_compass/rtk_gps.md), based on the u-blox M8P. Using RTK, PX4 can get its position with centimetre-level accuracy, which is much more accurate than can be provided by a normal GPS.

<img src="../../assets/hardware/gps/rtk_here_plus.jpg" />

## Purchase

* [ProfiCNC](http://www.proficnc.com/gps/77-gps-module.html)
* [Hex](http://www.hex.aero/shop/all/here-rtk-gnss-set/)
* [Other resellers](http://www.proficnc.com/stores)

## Configuration

RTK setup and use on PX4 via *QGroundControl* is largely plug and play (see [RTK GPS](../advanced_features/rtk-gps.md) for more information).

## Wiring and Connections

The Here+ GPS comes with an 8 pin connector that can be inserted directly into the [Pixhawk 2](http://www.hex.aero/wp-content/uploads/2016/07/DRS_Pixhawk-2-17th-march-2016.pdf) GPS UART port.

The Pixhawk 3 Pro and Pixracer have a 6 pin GPS port connector. For these controllers you can modify the GPS cable (as shown below) to remove pin 6 and 7. 

<img src="../../assets/hardware/gps/rtk_here_plug_gps_to_6pin_connector.jpg" width="500px" /> 

Pin 6 and 7 are for the safety button - these can be attached as well if needed.

### Pinout

The Here+ GPS pinout is provided below. This can be used to help modify the connector for other autopilot boards.

| pin | Here+ GPS     | pin | Pixhawk 3 Pro GPS |
| --- | ------------- | --- | ----------------- |
| 1   | VCC_5V        | 1   | VCC               |
| 2   | GPS_RX        | 2   | GPS_TX            |
| 3   | GPS_TX        | 3   | GPS_RX            |
| 4   | SCL           | 4   | SCL               |
| 5   | SDA           | 5   | SDA               |
| 6   | BUTTON        | -   | -                 |
| 7   | BUTTON_LED    | -   | -                 |
| 8   | GND           | 6   | GND               |
