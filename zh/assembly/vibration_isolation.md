# 震动隔绝

本主题展示了如何确定振动水平是否过高，并列出了一些改善振动特征的简单步骤。

## 综述

飞控板载的加速度计和陀螺仪对振动很敏感。 High vibration levels can cause a range of problems, including reduced flight efficiency/performance, shorter flight times and increased vehicle wear-and-tear. In extreme cases vibration may lead to sensor clipping/failures, possibly resulting in estimation failures and fly-aways.

Well-designed airframes damp/reduce the amplitude of specific structural resonances at the autopilot mounting location. Further isolation may be needed in order to reduce vibration to the level that sensitive components can handle (e.g. some flight controllers must be attached to the airframe using some form of anti-vibration foam/mount - while others are internally isolated).

## Vibration Analysis

[Log Analysis using Flight Review > Vibration](../log/flight_review.md#vibration) explains how to use logs to confirm whether vibration is a probable cause of flight problems.

## Basic Vibration Fixes

A few of simple steps that may reduce vibrations are:

- Make sure everything is firmly attached on the vehicle (landing gear, GPS mast, etc.).
- 使用平衡螺旋桨。
- 确保使用高质量的螺旋桨、发动机、ESC 和机身。 这些组成部分中的每一个都有很大的不同。
- 使用隔振方法安装自动驾驶仪。 Many flight controllers come with *mounting foam* that you can use for this purpose, while others have inbuilt vibration-isolation mechanisms.
- *最后* 一个措施，调整软件过滤器 (见[ 这里](../config_mc/racer_setup.md#filters))。 最好是减少振动源，而不是在软件中过滤。

## References

Some references that you may find useful are:

- [An Introduction to Shock & Vibration Response Spectra, Tom Irvine](http://www.vibrationdata.com/tutorials2/srs_intr.pdf) (free paper)
- [Structural Dynamics and Vibration in Practice - An Engineering Handbook, Douglas Thorby](https://books.google.ch/books?id=PwzDuWDc8AgC&printsec=frontcover) (preview).