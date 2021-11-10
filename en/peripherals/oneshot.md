# OneShot Servos and ESCs (Motor Controllers)

PX4 support OneShot 125 ESCs.
These are typically faster and more responsive than [PWM ESCs](../peripherals/pwm_escs_and_servo.md) but share the same wiring setup (all you need to do is set some different parameters)

:::note
[DShot](../peripherals/dshot.md) ESCs are even more responsive, and hence recommended.
:::


## Overview

OneShot is essentially a version of [PWM](../peripherals/pwm_escs_and_servo.md) that can be, in theory, up to 8 times faster.
As a result, OneShot ESC are usually much more responsive and easier to tune than PWM ESC.

Both PWM and OneShot communicate using a periodic pulse, where the _length_ of the pulse indicates the desired power level.
For PWM the pulse length typically ranges between 1000uS (zero) and 2000uS (full power), while for OneShot 125 the pulse widths are 8 times shorter, ranging from 125us (zero power) to 250us (full power).

The maximum rate at which pulses can be sent, and hence the responsiveness, depends on the width of the largest pulse.
For PWM the theoretical maximum is close to 500 Hz while for OneShot it approaches 4 kHz.

:::note
The actual frame rate/duty cycle depends on the capabilities of the ESC.
PWM ESC commonly have a rate between 50Hz and 490Hz.
OneShot 125 ESCs are generally higher than this, though not necessarily approaching the theoretical maximum.
:::

There are a number of variants of the OneShot protocol, which support different rates.
PX4 currently supports OneShot 125 only.

## Setup

### Wiring

Wiring is exactly the same as for [PWM ESCs](../peripherals/pwm_escs_and_servo.md).

### PX4 Configuration


To enable OneShot use the following parameters:

- DSHOT_CONFIG...= 0
- PWM_EXTRA_RATE = 0
- PWM_MAIN_RATE = 0


