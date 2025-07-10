---
canonicalUrl: https://docs.px4.io/main/ru/flight_modes/acro_fw
---

# Acro Mode (Fixed Wing)

[<img src="../../assets/site/difficulty_hard.png" title="Hard to fly" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;

*Acro mode* is the RC mode for performing acrobatic maneuvers e.g. rolls, flips, stalls and acrobatic figures.

The roll, pitch and yaw sticks control the rate of angular rotation around the respective axes and throttle is passed directly to the output mixer. When sticks are centered the vehicle will stop rotating, but remain in its current orientation (on its side, inverted, or whatever) and moving according to its current momentum.

![FW Manual Acrobatic Flight](../../assets/flight_modes/manual_acrobatic_FW.png)

## Technical Description

RC mode for performing acrobatic maneuvers e.g. rolls, flips, stalls and acrobatic figures.

RPY stick inputs are translated to angular rate commands that are stabilized by autopilot. Throttle is passed directly to the output mixer.


## Parameters

| Parameter                                                                                                  | Description                                                                                                                                              |
| ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="FW_ACRO_X_MAX"></span>[FW_ACRO_X_MAX](../advanced_config/parameter_reference.md#FW_ACRO_X_MAX) | Acro body x max rate (the body x rate the controller is trying to achieve if the user applies full roll stick input in acro mode). Default: 90 degrees.  |
| <span id="FW_ACRO_Y_MAX"></span>[FW_ACRO_Y_MAX](../advanced_config/parameter_reference.md#FW_ACRO_Y_MAX) | Acro body y max rate (the body y rate the controller is trying to achieve if the user applies full pitch stick input in acro mode). Default: 90 degrees. |
| <span id="FW_ACRO_Z_MAX"></span>[FW_ACRO_Z_MAX](../advanced_config/parameter_reference.md#FW_ACRO_Z_MAX) | Acro body z max rate (the body z rate the controller is trying to achieve if the user applies full yaw stick input in acro mode). Default: 45 degrees.   |
