# Air Traffic Avoidance: ADS-B/FLARM

PX4 can use [ADS-B](https://en.wikipedia.org/wiki/Automatic_dependent_surveillance_%E2%80%93_broadcast) or [FLARM](https://en.wikipedia.org/wiki/FLARM) transponders to support simple air traffic avoidance in [missions](../flight_modes/mission.md).
If a potential collision is detected, PX4 can *warn*, immediately [land](../flight_modes/land.md), or [return](../flight_modes/return.md) (depending on the value of [NAV_TRAFF_AVOID](#NAV_TRAFF_AVOID)).


<a id="supported_hardware"></a>
## Supported Hardware

PX4 traffic avoidance works with ADS-B or FLARM products that supply transponder data using the MAVLink [ADSB_VEHICLE](https://mavlink.io/en/messages/common.html#ADSB_VEHICLE) message.

It has been tested with the following devices:
- [PingRX ADS-B Receiver](https://uavionix.com/product/pingrx-pro/) (uAvionix)
- [FLARM](https://flarm.com/products/uav/atom-uav-flarm-for-drones/) <!-- I think originally https://flarm.com/products/powerflarm/uav/ -->


## Hardware Setup

Either device can be connected to any free/unused serial port on the flight controller.
Most commonly it they are connected to TELEM2 (if this is not being use for some other purpose).

### PingRX

The PingRX MAVLink port uses a JST ZHR-4 mating connector with pinout as shown below.

Pin | Signal | Volt
--- | --- | ---
1 (red) | RX (IN)  | +5V tolerant
2 (blk) | TX (OUT) | 
3 (blk) | Power  | +4 to 6V
4 (blk) | GND    | GND

The PingRX comes with connector cable that can be attached directly to the TELEM2 port (DF13-6P) on an [mRo Pixhawk](../flight_controller/mro_pixhawk.md).
For other ports or boards, you will need to obtain your own cable.


## FLARM

FLARM has an on-board DF-13 6 Pin connector that has an identical pinout to the [mRo Pixhawk](../flight_controller/mro_pixhawk.md).

Pin | Signal | Volt
--- | --- | ---
1 (red) | VCC      | +4V to +36V
2 (blk) | TX (OUT) | +3.3V
3 (blk) | RX (IN)  | +3.3V
4 (blk) | - | +3.3V
5 (blk) | - | +3.3V
6 (blk) | GND      | GND

:::note
The TX and RX on the flight controller must be connected to the RX and TX on the FLARM, respectively.
:::

## Software Configuration

### Port Configuration

Flarm/PingRX are configured in the same way as any other [MAVLink Peripheral](../peripherals/mavlink_peripherals.md). 
The only *specific* setup is that the port baud rate must be set to 57600 and the a low-bandwidth profile (`MAV_X_MODE`).

Assuming you have connected the device to the TELEM2 port, [set the parameters](../advanced_config/parameters.md) as shown:

- [MAV_1_CONFIG](../advanced_config/parameter_reference.md#MAV_1_CONFIG) = TELEM 2
- [MAV_1_MODE](../advanced_config/parameter_reference.md#MAV_1_MODE) = Normal
- [MAV_1_RATE](../advanced_config/parameter_reference.md#MAV_1_RATE) = 0 (default sending rate for port).
- [MAV_1_FORWARD](../advanced_config/parameter_reference.md#MAV_1_FORWARD) = Enabled
  
Then reboot the vehicle. 

You will now find a new parameter called [SER_TEL2_BAUD](../advanced_config/parameter_reference.md#SER_TEL2_BAUD), which must be set to 57600.

### Configure Traffic Avoidance

Configure the action when there is a potential collision using the parameter below:

Parameter | Description
--- | ---
<a id="NAV_TRAFF_AVOID"></a>[NAV_TRAFF_AVOID](../advanced_config/parameter_reference.md#NAV_TRAFF_AVOID)  | Enable traffic avoidance mode specify avoidance response. 0: Disable, 1: Warn only, 2: Return mode, 3: Land mode.
<a id="NAV_TRAFF_A_HOR"></a>[NAV_TRAFF_A_HOR](../advanced_config/parameter_reference.md#NAV_TRAFF_A_HOR)  | Horizonal radius of cylinder around the vehicle that defines its airspace (i.e. the airspace in the ground plane).
<a id="NAV_TRAFF_A_VER"></a>[NAV_TRAFF_A_VER](../advanced_config/parameter_reference.md#NAV_TRAFF_A_VER)  | Vertical height above and below vehicle of the cylinder that defines its airspace (also see [NAV_TRAFF_A_HOR](#NAV_TRAFF_A_HOR)).
<a id="NAV_TRAFF_COLL_T"></a>[NAV_TRAFF_COLL_T](../advanced_config/parameter_reference.md#NAV_TRAFF_COLL_T) | Collision time threshold. Avoidance will trigger if the estimated time until collision drops below this value (the estimated time is based on relative speed of traffic and UAV).

## Implementation

PX4 listens for valid transponder reports during missions.

If a valid transponder report is received, PX4 first uses the traffic transponder information to estimate whether the traffic heading and height indicates there will be an intersection with the airspace of the UAV.
The UAV airspace consists of a surrounding cylinder defined by the radius [NAV_TRAFF_A_HOR](#NAV_TRAFF_A_HOR) and height [NAV_TRAFF_A_VER](#NAV_TRAFF_A_VER), with the UAV at it's center.
The traffic detector then checks if the time until intersection with the UAV airspace is below the [NAV_TRAFF_COLL_T](#NAV_TRAFF_COLL_T) threshold based on the relative speed.
If the both checks are true, the [Traffic Avoidance Failsafe](../config/safety.md#traffic-avoidance-failsafe) action is started, and the vehicle will either warn, land, or return.

The code can be found in `Navigator::check_traffic` ([/src/modules/navigator/navigator_main.cpp](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/navigator/navigator_main.cpp)).

PX4 will also forward the transponder data to a GCS if this has been configured for the MAVLink instance (this is recommended).
The last 10 Digits of the GUID is displayed as Drone identification.

## Triggering Fake Traffic

:::note This part could be used both in SITL and a physical hardware. This feature shall be enabled on hardware just for testing purposes as it triggers failsafe actions mid-flight. :::

There is code snippet nested under [/src/lib/adsb/AdsbConflict.cpp](https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/adsb/AdsbConflict.cpp#L342C1-L342C1) which can be used to trigger fake_traffic such taht it can be used accordingly for your test purpose. The AdsbConflict class contains two methods: fake_traffic and run_fake_traffic. 

fake_traffic Method

The fake_traffic method is responsible for generating a simulated ADS-B traffic message. It takes several parameters to specify the characteristics of the fake traffic, such as callsign, distance, direction, traffic heading, altitude difference, horizontal velocity, vertical velocity, emitter type, ICAO address, UAV latitude and longitude, and UAV altitude. The method modifies the alt_uav parameter by reference.

The method performs the following steps:

- Calculates the latitude and longitude of the traffic based on the UAV's position, distance, and direction.
- Computes the new altitude by adding the altitude difference to the UAV's altitude.
- Populates the transponder_report_s structure with the simulated traffic data, including the timestamp, ICAO address, latitude, longitude, altitude type, altitude, heading, horizontal velocity, vertical velocity, callsign, emitter type, time since last communication, flags, and squawk code.
- If the board supports a Universally Unique Identifier (UUID), the method retrieves the UUID using board_get_px4_guid and copies it to the uas_id field of the structure. Otherwise, it generates a simulated GUID.
- Publishes the simulated traffic message using orb_publish.

run_fake_traffic Method

The run_fake_traffic method is responsible for running a series of simulated ADS-B traffic scenarios. It takes the UAV's latitude, longitude, and altitude as parameters and modifies them by reference.

The method simulates different scenarios by calling the fake_traffic method with different parameters. It creates fake traffic messages with different callsigns, distances, directions, altitude differences, velocities, and emitter types. The method generates and publishes multiple traffic messages to simulate various situations.

The generated scenarios include conflicts and non-conflicts, as well as spamming the traffic buffer. By calling fake_traffic with different parameters, the method simulates a range of traffic situations for testing purposes.




<!-- See also implementation PR: https://github.com/PX4/PX4-Autopilot/pull/21283 -->

## Further Information

- [MAVLink Peripherals](../peripherals/mavlink_peripherals.md)
- [Serial Port Configuration](../peripherals/serial_configuration.md)
