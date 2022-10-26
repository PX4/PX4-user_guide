# Big Storm Boat build

[*Big Storm*](https://www.galaxus.ch/de/s5/product/amewi-big-storm-rennboot-rc-boot-13369624) is a COTS (Commercial Off The Shelf) racing RC boat with a rudder, single propeller thruster and a water cooled ESC.

![Big Storm Shop image](../../assets/airframes/boat/bigstorm/bigstorm_shop.jpg)

## Spec

- Max speed : 65 km/h
- Length : 740 mm
- Width : 180 mm
- Weight : 1200 g
- Body : ABS Plastic
- Drive shaft : 4mm flexible shaft
- 2815 Brushless outrunner motor, water-cooled
- 37 gram Steering servo
- 60A Water cooled ESC (upto 4S voltage)
- Recommended battery : 2 x 2S LiPo 7.4V 3000 - 4000mAh 40C

## Modification process

Bulk of the modification needed to run PX4 involves in installing the flight controller and adding the peripherals

The original build was documented here: https://discuss.px4.io/t/rc-speed-boat-with-px4-episode-0-trying-out-the-boat-and-integrating-pixhawk/28407

### Flight controller mounting

A Pixhawk 4 mini can be perfectly mounted on top of the steering servo via a thick double-sided tape.

### Output Connections

PWM Output | Actuator
--- | ---
MAIN2 | Steering servo
MAIN4 | Thruster (ESC input)

### Telemetry


### Center of Gravity

To reduce the possibility of the boat flipping during the turn, it is important to place the center of gravity as far front as possible.

![Big storm picture](../../assets/airframes/boat/bigstorm/bigstorm_internals.jpeg)

## PX4 Configuration

Refer to the [Boat configuration](../frames_boat/README.md#how-to-configure-a-boat) documentation.

## Video

@[youtube](https://www.youtube.com/watch?v=yOdCKbyIh_0)