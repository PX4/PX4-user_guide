# Tests Flights

Test flights are important for quality assurance. 
The Dronecode test team can help review (test flight) your pull requests and provide feedback and logs.

{% if book.px4_version != 'master' %}
> **Tip** Test flight process and fleet information may change over time. 
  Current information [can be found in the head revision/master docs](https://dev.px4.io/master/en/test_and_ci/test_flights.html)!
{% else %} <!-- START: details below displayed only in master -->

## How to Request Test Flights

* Add a complete and thorough description of your changes in the pull request
* Tag the test team in a comment using **@PX4/testflight** 
* Wait for feedback from the test team
* The test team will [add your PR/issue to their queue](https://github.com/PX4/PX4-Autopilot/projects/18)

## Response Times

* Multi-Copter: up to 48 hours (typically within 24 hours)
* VTOL, Fixed Wing: up to 4 days (typically 2 days)

## Test Cards

The tests performed for each platform are linked below: 

* [MC_01 - Manual modes](../test_cards/mc_01_manual_modes.md)
* [MC_02 - Full Autonomous](../test_cards/mc_02_full_autonomous.md)
* [MC_03 - Auto Manual Mix](../test_cards/mc_03_auto_manual_mix.md)
* [MC_04 - Failsafe Testing](../test_cards/mc_04_failsafe_testing.md)
* [MC_05 - Indoor Flight (Manual Modes)](../test_cards/mc_05_indoor_flight_manual_modes.md)


<a id="fleet"></a>
## Test Vehicles/Autopilots

Multicopter

Frame | Flight Controller | UUID
--- | --- | ---
[DJI F450](https://www.getfpv.com/dji-flamewheel-f450-basic-kit.html) | [Pixhawk Mini](https://docs.px4.io/master/en/flight_controller/pixhawk_mini.html) | 002400283335510A33373538 (f450-v3)
[DJI F450](https://www.getfpv.com/dji-flamewheel-f450-basic-kit.html) | [Pixhawk 1](https://docs.px4.io/master/en/flight_controller/pixhawk.html) | 000100000000363533353336510900500021 (f450-v3)
[DJI F450](https://www.getfpv.com/dji-flamewheel-f450-basic-kit.html) | [Cube](https://docs.px4.io/master/en/flight_controller/pixhawk-2.html) (Pixhawk 2.1) | 00010000000033343537313751050040001c (F450 Pixhawk v2 cube)
[DJI F450](https://www.getfpv.com/dji-flamewheel-f450-basic-kit.html) | [Pixracer](https://docs.px4.io/master/en/flight_controller/pixracer.html) | 00010000000037373430333551170037002a (F450-Pixracer)
[DJI F450](https://www.getfpv.com/dji-flamewheel-f450-basic-kit.html) | [Pixhawk 3 Pro](https://docs.px4.io/master/en/flight_controller/pixhawk3_pro.html) | 000100000000303236353136510500180036 (Pixhawk pro)
[DJI F450](https://www.getfpv.com/dji-flamewheel-f450-basic-kit.html) | [Pixhack V3](https://docs.px4.io/master/en/flight_controller/pixhack_v3.html) | 003200293036511638363834 (f450-v5-m)
[DJI F450](https://www.getfpv.com/dji-flamewheel-f450-basic-kit.html) | [Pixhawk 4](https://docs.px4.io/master/en/flight_controller/pixhawk4.html) | 000200000000383339333038510700320016 (F450-v5)
[DJI F450](https://www.getfpv.com/dji-flamewheel-f450-basic-kit.html) | [Pixhawk 4 Mini](https://docs.px4.io/master/en/flight_controller/pixhawk4_mini.html) | 0002000000003432333830385115003a0033 (F450-v5-m)
[DJI F450](https://www.getfpv.com/dji-flamewheel-f450-basic-kit.html) [UAVCAN](https://zubax.com/technologies/uavcan) | [Pixhawk 4](https://docs.px4.io/master/en/flight_controller/pixhawk4.html) | 000200000000323634353237511800200021 (F450-Pixhawk4)
Holybro [QAV250](https://docs.px4.io/master/en/frames_multicopter/holybro_qav250_pixhawk4_mini.html) | [Pixhawk 4 Mini](https://docs.px4.io/master/en/flight_controller/pixhawk4_mini.html) |000200000000343233383038511500420032 (f450-v5-m)
NXP Semiconductor [KIT-HGDRONEK66](https://www.nxp.com/applications/solutions/industrial/unmanned-aerial-vehicles-uavs/uavs-drones-and-rovers/rddrone-fmuk66-px4-robotic-drone-fmu-reference-design:RDDRONE-FMUK66) ("[Hovergames](https://www.hovergames.com/)")| [RDDRONE-FMUK66](https://www.nxp.com/products/processors-and-microcontrollers/arm-based-processors-and-mcus/kinetis-cortex-m-mcus/k-seriesperformancem4/k6x-ethernet/rddrone-fmuk66-px4-robotic-drone-fmu-reference-design:RDDRONE-FMUK66?tid=vanRDDRONE-FMUK66) | 00030016ffffffffffff4e45362050130029

Fixed Wing

Frame | Flight Controller | UUID
--- | --- | ---
[Phantom Wing](https://hobbyking.com/en_us/phantom-fpv-flying-wing-epo-airplane-1550mm-v2-kit.html) | [Pixhawk 1](https://docs.px4.io/master/en/flight_controller/pixhawk.html) | 0001000000003035333330365104003c0020 (f450-v2)


VTOL

Frame | Flight Controller | UUID
--- | --- | ---
[Convergence VTOL](https://www.horizonhobby.com/convergence-vtol-bnf-basic-efl11050) | [Pixhawk 4 Mini](https://docs.px4.io/master/en/flight_controller/pixhawk4_mini.html) | 000200000000343233383038511500350039 (vtol-v5-m)
[Delta Quad Pro](https://px4.io/portfolio/deltaquad-vtol/) | [Dropix](https://docs.px4.io/master/en/flight_controller/dropix.html) | 0001000000003437393931375114004c0042 (delta-v2)

{% endif %} <!-- END: details above displayed only in master -->
