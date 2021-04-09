# 항공 사고 방지: ADS-B/FLARM

PX4는 [ADS-B](https://en.wikipedia.org/wiki/Automatic_dependent_surveillance_%E2%80%93_broadcast) 또는 [FLARM](https://en.wikipedia.org/wiki/FLARM) 트랜스폰더를 사용하여 [임무](../flight_modes/mission.md)에서 간단한 항공 시고 방지를 지원할 수 있습니다. 잠재적인 충돌이 감지되면 PX4는 [NAV_TRAFF_AVOID](#NAV_TRAFF_AVOID)의 값에 따라 *경고*, 즉시 [착륙](../flight_modes/land.md) 또는 [귀환](../flight_modes/return.md) 할 수 있습니다.

<span id="supported_hardware"></span>
## 지원 하드웨어

PX4 사고방지는 MAVLink [ADSB_VEHICLE](https://mavlink.io/en/messages/common.html#ADSB_VEHICLE) 메시지를 사용하여 트랜스폰더 데이터를 제공하는 ADS-B 또는 FLARM 제품에서 작동합니다.

다음 장치들로 테스트되었습니다:
- [PingRX ADS-B Receiver](https://uavionix.com/product/pingrx/) (uAvionix)
- [FLARM](https://flarm.com/products/powerflarm/uav/)


## 하드웨어 설정

Either device can be connected to any free/unused serial port on the flight controller. Most commonly it they are connected to TELEM2 (if this is not being use for some other purpose).

### PingRX

The PingRX MAVLink port uses a JST ZHR-4 mating connector with pinout as shown below.

| Pin     | Signal   | Volt         |
| ------- | -------- | ------------ |
| 1 (red) | RX (IN)  | +5V tolerant |
| 2 (blk) | TX (OUT) |              |
| 3 (blk) | Power    | +4 to 6V     |
| 4 (blk) | GND      | GND          |

The PingRX comes with connector cable that can be attached directly to the TELEM2 port (DF13-6P) on an [mRo Pixhawk](../flight_controller/mro_pixhawk.md). For other ports or boards, you will need to obtain your own cable.


## FLARM

FLARM has an on-board DF-13 6 Pin connector that has an identical pinout to the [mRo Pixhawk](../flight_controller/mro_pixhawk.md).

| Pin     | Signal   | Volt        |
| ------- | -------- | ----------- |
| 1 (red) | VCC      | +4V to +36V |
| 2 (blk) | TX (OUT) | +3.3V       |
| 3 (blk) | RX (IN)  | +3.3V       |
| 4 (blk) | -        | +3.3V       |
| 5 (blk) | -        | +3.3V       |
| 6 (blk) | GND      | GND         |

:::note
The TX and RX on the flight controller must be connected to the RX and TX on the FLARM, respectively.
:::

## Software Configuration

### Port Configuration

Flarm/PingRX are configured in the same way as any other [MAVLink Peripheral](../peripherals/mavlink_peripherals.md). The only *specific* setup is that the port baud rate must be set to 57600 and the a low-bandwidth profile (`MAV_X_MODE`).

Assuming you have connected the device to the TELEM2 port, [set the parameters](../advanced_config/parameters.md) as shown:

- [MAV_1_CONFIG](../advanced_config/parameter_reference.md#MAV_1_CONFIG) = TELEM 2
- [MAV_1_MODE](../advanced_config/parameter_reference.md#MAV_1_MODE) = Normal
- [MAV_1_RATE](../advanced_config/parameter_reference.md#MAV_1_RATE) = 0 (default sending rate for port).
- [MAV_1_FORWARD](../advanced_config/parameter_reference.md#MAV_1_FORWARD) = Enabled

Then reboot the vehicle.

You will now find a new parameter called [SER_TEL2_BAUD](../advanced_config/parameter_reference.md#SER_TEL2_BAUD), which must be set to 57600.

:::note
Prior to PX4 v1.9 you can set up the port using the deprecated parameter: `SYS_COMPANION`.
:::

### Configure Traffic Avoidance

Configure the action when there is a potential collision using the parameter below:

| Parameter                                                                                                           | Description                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| <span id="NAV_TRAFF_AVOID"></span>[NAV_TRAFF_AVOID](../advanced_config/parameter_reference.md#NAV_TRAFF_AVOID)    | Enable traffic avoidance mode specify avoidance response. 0: Disable, 1: Warn only, 2: Return mode, 3: Land mode. |
| <span id="NAV_TRAFF_A_RADM"></span>[NAV_TRAFF_A_RADM](../advanced_config/parameter_reference.md#NAV_TRAFF_A_RADM) | Set traffic avoidance distance for *manned* aviation                                                              |
| <span id="NAV_TRAFF_A_RADU"></span>[NAV_TRAFF_A_RADU](../advanced_config/parameter_reference.md#NAV_TRAFF_A_RADU) | Set traffic avoidance distance for *unmanned* aviation                                                            |


## Implementation

PX4 listens for valid transponder reports during missions.

If a valid transponder report is received, PX4 first uses the transponder position and heading information to estimate whether the vehicles will share a similar altitude before they pass each other. If they may then PX4 it estimates how the closest distance between the path to the next waypoint and the other vehicles predicted path. If the crossing point is less than the configured distance for altitude and path, the [Traffic Avoidance Failsafe](../config/safety.md#traffic-avoidance-failsafe) action is started, and the vehicle will either warn, land, or return. The detection distance can be configured separately for manned and unmanned aviation.


The code can be found in `Navigator::check_traffic` ([/src/modules/navigator/navigator_main.cpp](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/navigator/navigator_main.cpp)).

PX4 will also forward the transponder data to a GCS if this has been configured for the MAVLink instance (this is recommended). The last 10 Digits of the GUID is displayed as Drone identification.

## Further Information

* [MAVLink Peripherals](../peripherals/mavlink_peripherals.md)
* [Serial Port Configuration](../peripherals/serial_configuration.md)
