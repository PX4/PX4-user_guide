# Vibration Isolation

이 섹션은 진동 규모의 크기를 판단하는 방법과 진동 특성을 개선하는 방법에 대해 설명합니다.

## 개요

내장된 가속도 센서 또는 자이로스코프 센서가 있는 비행 제어 보드는 진동에 민감합니다. 큰 규모의 진동은 비행 효율과 성능의 감소, 짧은 비행 시간, 기체 내구도 감소 등 다양한 문제을 일으킵니다. 극단적인 경우 진동으로 인해 센서가 오작동하거나 파손될 수 있으며, 이로 인해 자세/위치 추정에 실패하고 기체가 영원히 날아가버릴 수 있습니다.

Well-designed airframes damp/reduce the amplitude of specific structural resonances at the autopilot mounting location. Further isolation may be needed in order to reduce vibration to the level that sensitive components can handle (e.g. some flight controllers must be attached to the airframe using some form of anti-vibration foam/mount - while others are internally isolated).

## Vibration Analysis

[Log Analysis using Flight Review > Vibration](../log/flight_review.md#vibration) explains how to use logs to confirm whether vibration is a probable cause of flight problems.

## Basic Vibration Fixes

A few of simple steps that may reduce vibrations are:

- Make sure everything is firmly attached on the vehicle (landing gear, GPS mast, etc.).
- Use balanced propellers.
- Make sure to use high-quality components for the propellers, motors, ESC and airframe. Each of these components can make a big difference.
- Use a vibration-isolation method to mount the autopilot. Many flight controllers come with *mounting foam* that you can use for this purpose, while others have inbuilt vibration-isolation mechanisms.
- As a *last* measure, adjust the software filters (see [here](../config_mc/racer_setup.md#filters)). It is better to reduce the source of vibrations, rather than filtering them out in software.

## References

Some references that you may find useful are:

- [An Introduction to Shock & Vibration Response Spectra, Tom Irvine](https://info.mide.com/hubfs/eBooks/ebook-tom-irvine-shock-vibration-response-spectra.pdf) (free ebook)
- [Structural Dynamics and Vibration in Practice - An Engineering Handbook, Douglas Thorby](https://books.google.ch/books?id=PwzDuWDc8AgC&printsec=frontcover) (preview).