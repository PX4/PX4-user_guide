<div style="float:right; padding:10px; margin-right:20px;"><a href="http://px4.io/"><img src="../assets/site/logo_pro_small.png" title="PX4 Logo" width="180px" /></a></div>
# PX4 Autopilot User Guide

[![Releases](https://img.shields.io/github/release/PX4/Firmware.svg)](https://github.com/PX4/Firmware/releases) [![Discuss](https://img.shields.io/badge/discuss-px4-ff69b4.svg)](http://discuss.px4.io/) [![Slack](https://px4-slack.herokuapp.com/badge.svg)](http://slack.px4.io) 

PX4 is the *Professional Autopilot*. Developed by world-class developers from industry and academia, and supported by an active world wide community, it powers all kinds of vehicles from racing and cargo drones through to ground vehicles and submersibles.

> **Tip** This guide contains everything you need to assemble, configure, and safely fly a PX4-based vehicle.

<span></span>
> **Note** This guide is still a work in progress! It does not yet cover all of PX4.

## How Do I Get Started?

The following tips will help you navigate through this guide:

**I already have a vehicle and I just want to fly:**

- If you've never used a PX4 controlled system then you should check out our [Getting Started](getting_started/README.md) section.
- You'll need to do [basic configuration](config/README.md) which includes updating firmware on your autopilot and calibrating your compass and IMU etc.
- The [Flying](flying/README.md) section teaches flying basics and provides more detailed information about flight modes and safety checklists.

**I want to build a (PX4 supported) airframe from scratch:**

- Again, you'll need to see the [Getting Started](getting_started/README.md) to learn about different flight controller hardwares, vehicles and airframes PX4 supports. You can find further information about your specific airframe and your flight controller in the [Airframe Builds](airframes/README.md) and [Autopilot Hardware](flight_controller/README.md) sections respectively.
- Next, you can proceed onto [wiring](assembly/README.md) important peripherals to your autopilot and [setup](config/README.md) your vehicle and its sensors with a ground control station.
- Once you are ready to fly your vehicle, visit our [Flying](flying/README.md) section to learn about different flight modes and safety configurations.

**I am creating a new airframe and want to add extra peripherals:**

- If you haven't already selected your flight controller, [Autopilot Hardware](flight_controller/README.md) section may help you make the right choice for your airframe.
- You may want to checkout some tips and examples of how to build your airframe in [Airframe Builds](airframes/README.md) section.
- The [Peripheral Hardware](peripherals/README.md) section can help you learn about and choose external sensors.
- After [wiring](assembly/README.md) all the peripherals, you will need to do a combination of [basic](config/README.md) and [advanced](advanced_config/README.md) configuration for your new airframe.

**I want to run PX4 on new hardware and extend the platform:**

- [PX4 Developer Guide](http://dev.px4.io/) explains how to modify flight algorithms, add new modes, integrate new hardware, communicate with PX4 from outside the flight controller, and contribute to PX4.


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
