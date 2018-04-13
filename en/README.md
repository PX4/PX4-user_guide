<div style="float:right; padding:10px; margin-right:20px;"><a href="http://px4.io/"><img src="../assets/site/logo_pro_small.png" title="PX4 Logo" width="180px" /></a></div>
# PX4 Autopilot User Guide

[![Releases](https://img.shields.io/github/release/PX4/Firmware.svg)](https://github.com/PX4/Firmware/releases) [![Discuss](https://img.shields.io/badge/discuss-px4-ff69b4.svg)](http://discuss.px4.io/) [![Slack](https://px4-slack.herokuapp.com/badge.svg)](http://slack.px4.io) 

PX4 is the *Professional Autopilot*. Developed by world-class developers from industry and academia, and supported by an active world wide community, it powers all kinds of vehicles from racing and cargo drones through to ground vehicles and submersibles.

This guide contains everything you need to assemble, configure, and safely fly a PX4-based vehicle, including:

- [Getting Started](getting_started/README.md) - basic concepts for beginners needed to build and fly an unmanned vehicle using PX4.
- [Basic Assembly](assembly/README.md) - how to mount flight controller hardware and wire/connect most important peripherals.
- [Basic Configuration](config/README.md) - how to install PX4 firmware onto the flight controller hardware, select an airframe, configure/calibrate the core sensors that PX4 needs (e.g. compass, GPS, gyro etc.), setup the battery, setup the radio control transmitter and map flight modes to its switches.
- [Airframe Builds](airframes/README.md) - gives examples of how to setup different flight controller hardware on common airframes/vehicles.
- [Flying](flying/README.md) - covers flying basics and explanation of different flight modes, including manual, autopilot-assisted and fully autonomous mission modes.
- [Advanced Features](advanced_features/README.md) - contains topics related to some of the more advanced features of the PX4 autopilot such as RTK GPS and precision landing.
- [Advanced Configuration](advanced_config/README.md) - how to tune parameters of the vehicle that can affect its flight (e.g. PID gains) and topics about less-common sensors and peripherals.
- [Peripheral Hardware](peripherals/README.md) - topics about external sensors and optional peripheral hardware that you can use with the autopilot.
- [Autopilot Hardware](flight_controller/README.md) - describes different autopilot hardware that can be used to run the PX4 flight stack. 
- [Development](development/development.md) - Developers who want to modify flight algorithms, add new modes, integrate new hardware, communicate with PX4 from outside the flight controller, or contribute to PX4 will need to read the PX4 Development Guide, which contains more advanced topics.

> **Note** This guide is still a work in progress! It does not yet cover all of PX4.


## Forums and Chat {#support}

The core development team and community are active on the following forums and chat channels:

* [PX4 Discuss](http://discuss.px4.io/) (*recommended*)
* [Slack](http://slack.px4.io) (sign up)
* [Google+](https://plus.google.com/117509651030855307398)


## Reporting Bugs & Issues

If you have any problems using PX4 first post them on the [support channels above](#support) (as they may be caused by vehicle configuration).

If directed by the development team, issues may be raised on [Github here](https://github.com/PX4/Firmware/issues). 
Where possible provide [flight logs](flying/flight_reporting.md) and other information requested in the issue template.


## License

PX4 code is free to use and modify under the terms of the permissive 
[BSD 3-clause license](https://opensource.org/licenses/BSD-3-Clause). 
This documentation is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). 
For more information see: [PX4 Development Guide > Licences](https://dev.px4.io/en/contribute/licenses.html).



### Icons

The following icons used in this library are licensed separately (as shown below):

<img src="../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /> *placeholder* icon made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>.

<img src="../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /> *camera-automatic-mode* icon made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>.
