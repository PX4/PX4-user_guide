---
canonicalUrl: https://docs.px4.io/main/ja/peripherals/oneshot
---

# OneShot Servos and ESCs (Motor Controllers)

PX4 support OneShot 125 ESCs (only). These are typically faster and more responsive than [PWM ESCs](../peripherals/pwm_escs_and_servo.md) but share the same wiring setup (all you need to do is set some different parameters)

:::note
[DShot](../peripherals/dshot.md) should always be used instead of OneShot where possible, as it is more responsive, more robust, does not required calibration, and may support telemetry. The only reason not to use DShot would be hardware limitations (insufficient DShot pins available or using an ESC that does not support DShot).
:::


## Overview

OneShot is essentially a version of [PWM](../peripherals/pwm_escs_and_servo.md) that can be, in theory, up to 8 times faster.

Both PWM and OneShot communicate using a periodic pulse, where the width of the pulse indicates the desired power level. For PWM the pulse length typically ranges between 1000uS (zero) and 2000uS (full power), while for OneShot 125 the pulse widths are 8 times shorter, ranging from 125us (zero power) to 250us (full power).

The theoretical maximum rate at which pulses can be sent, and hence the responsiveness, depends on the width of the largest pulse. For PWM this rate is close to 500 Hz while for OneShot it approaches 4 kHz. In practice the actual maximum rate for OneShot ESCs is typically between 1 kHz and 2 kHz, depending on the ESC used.


## Setup

### Wiring

Wiring is exactly the same as for [PWM ESCs](../peripherals/pwm_escs_and_servo.md) (and dshot).

### PX4 Configuration

To enable OneShot set the following parameters:
- [DSHOT_CONFIG](../advanced_config/parameter_reference.md#DSHOT_CONFIG): Set to `0` in order to _disable_ DShot (so you can use OneShot)
- [PWM_MAIN_RATE](../advanced_config/parameter_reference.md#PWM_MAIN_RATE)/[PWM_AUX_RATE](../advanced_config/parameter_reference.md#PWM_AUX_RATE): Set to `0` to enable OneShot 125 for all MAIN (IO) and AUX (FMU) ESC outputs, respectively.
- [PWM_MAIN_MIN](../advanced_config/parameter_reference.md#PWM_MAIN_MIN)/[PWM_AUX_MIN](../advanced_config/parameter_reference.md#PWM_AUX_MIN) and [PWM_MAIN_MAX](../advanced_config/parameter_reference.md#PWM_MAIN_MAX)/[PWM_AUX_MAX](../advanced_config/parameter_reference.md#PWM_AUX_MAX): set to the normal PWM range, nominally `1000` to `2000`. These are scaled internally to output appropriate pulse-widths for Oneshot.

Then perform [ESC Calibration](../advanced_config/esc_calibration.md).
