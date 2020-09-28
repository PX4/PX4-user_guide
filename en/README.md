<div style="float:right; padding:10px; margin-right:20px;"><a href="http://px4.io/"><img src="../assets/site/logo_pro_small.png" title="PX4 Logo" width="180px" /></a></div>

# PX4 Autopilot User Guide ({{ $themeConfig.px4_version }})

<!-- [![Releases](https://img.shields.io/badge/release-{{ $themeConfig.px4_version }}-blue.svg)](https://github.com/PX4/Firmware/releases) [![Discuss](https://img.shields.io/badge/discuss-px4-ff69b4.svg)](http://discuss.px4.io/) [![Slack](https://px4-slack.herokuapp.com/badge.svg)](http://slack.px4.io)  -->


PX4 is the *Professional Autopilot*. 
Developed by world-class developers from industry and academia, and supported by an active world wide community, it powers all kinds of vehicles from racing and cargo drones through to ground vehicles and submersibles.

> **Tip** This guide contains everything you need to assemble, configure, and safely fly a PX4-based vehicle.

<span></span>
> **Note** This guide is still a work in progress! It does not yet cover all of PX4.

## How Do I Get Started?

[Getting Started](getting_started/README.md) should be read by all users! 
It provides an overview of PX4, including features provided by the flight stack (flight modes and safety features) and the supported hardware (flight controller, vehicles, airframes, telemetry systems, RC control systems).

Depending on what you want to achieve, the following tips will help you navigate through this guide:

**I already have a drone and I just want to fly:**

If you have a Ready To Fly (RTF) vehicle that supports PX4:

- [Basic Configuration](config/README.md) explains how to update your firmware to the latest version, calibrate the main sensors (compass, gyro/IMU, airspeed etc.), and setup your remote control and safety features.
- [Flying](flying/README.md) teaches flight essentials, including where and how to fly safely, and how to debug arming and flight issues. It also provides detailed information about flight modes.


**I want to build a drone with PX4 from scratch:**

> **Tip** The "supported" vehicles are listed in the [Airframes Reference](airframes/airframe_reference.md). 
  These are vehicles that have tested and tuned configurations that you can download using *QGroundControl*. 

If you want to build a vehicle from scratch:

- Choose a frame - [Airframe Builds](airframes/README.md) lists the supported frames and provides detailed instructions for how to construct a subset of vehicles.
- Choose a flight controller - see [Getting Started > Flight Controllers](getting_started/flight_controller_selection.md) and [Autopilot Hardware](flight_controller/README.md).
- [Assembly](assembly/README.md) explains how to wire up the important peripherals to your autopilot.
- [Basic Configuration](config/README.md) shows how to update your firmware and configure it with settings appropriate for your airframe. 
  This section also explains how to calibrate the main sensors (compass, gyro/IMU, airspeed etc.), and setup your remote control and safety features.

Once you are ready to fly your vehicle, visit the [Flying](flying/README.md) section.


**I am modifying a supported vehicle:**

Modifications of the flight controller and basic sensors are covered above. 
In order to use new sensors, or if you have made changes that significantly affect flight characteristics: 

- [Peripheral Hardware](peripherals/README.md) provides additional information about using external sensors.
- [Basic Configuration](config/README.md) explains how to calibrate the main sensors.
- [Advanced Configuration](advanced_config/README.md) should be used to re/fine-tune the airframe.


**I want to run PX4 on new hardware and extend the platform:**

- [PX4 Developer Guide](http://dev.px4.io/) explains how to modify flight algorithms, add new modes, integrate new hardware, communicate with PX4 from outside the flight controller, and contribute to PX4.


<span id="support"></span>
## Forums and Chat

The core development team and community are active on the following forums and chat channels:

* [PX4 Discuss](http://discuss.px4.io/) (*recommended*)
* [Slack](http://slack.px4.io) (sign up)


## Reporting Bugs & Issues

If you have any problems using PX4 first post them on the [support channels above](#support) (as they may be caused by vehicle configuration).

If directed by the development team, code issues may be raised on [Github here](https://github.com/PX4/Firmware/issues). 
Where possible provide [flight logs](getting_started/flight_reporting.md) and other information requested in the issue template.


## Contributing

Information on how to contribute to code and documentation can be found in the Developer Guide:
- [Code](https://dev.px4.io/master/en/contribute/)
- [Documentation](https://dev.px4.io/master/en/contribute/docs.html)
- [Translation](https://dev.px4.io/master/en/contribute/docs.html)

## License

PX4 code is free to use and modify under the terms of the permissive 
[BSD 3-clause license](https://opensource.org/licenses/BSD-3-Clause). 
This documentation is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). 
For more information see: [PX4 Development Guide > Licences](https://dev.px4.io/master/en/contribute/licenses.html).


### Icons

The following icons used in this library are licensed separately (as shown below):

<img src="../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /> *placeholder* icon made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>.

<img src="../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /> *camera-automatic-mode* icon made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>.


## Governance

The PX4 flight stack is hosted under the governance of the [Dronecode Project](https://www.dronecode.org/).

<a href="https://www.dronecode.org/" style="padding:20px" ><img src="https://mavlink.io/assets/site/logo_dronecode.png" alt="Dronecode Logo" width="110px"/></a>
<a href="https://www.linuxfoundation.org/projects" style="padding:20px;"><img src="https://mavlink.io/assets/site/logo_linux_foundation.png" alt="Linux Foundation Logo" width="80px" /></a>
<div style="padding:10px">&nbsp;</div>
