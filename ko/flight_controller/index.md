# 비행 컨트롤러(자동 조종 장치) 하드웨어

Flight Controllers (FCs) are the autopilot hardware onto which PX4 firmware is uploaded. This section contains topics about compatible flight controller and baseboard hardware, and how it is mounted and configured.

## Selecting a Flight Controller

Information about how to choose a PX4-compatible flight controller and the available controllers:

- [비행 콘트롤러 선정](../getting_started/flight_controller_selection.md)
- [Pixhawk 표준/지원 자동조종장치](../flight_controller/autopilot_pixhawk_standard.md)
- [제조사지원 자동항법장치](../flight_controller/autopilot_manufacturer_supported.md)
- [시험단계 자동비행장치](../flight_controller/autopilot_experimental.md)
- [Discontinued Autopilots & Complete Vehicles](../flight_controller/autopilot_discontinued.md)
- [Pixhawk Autopilot Bus & Carriers](../flight_controller/pixhawk_autopilot_bus.md)

::: info There may be other [Pixhawk Series](../flight_controller/pixhawk_series.md) compatible flight controllers and variants, including those [documented here on Github](https://github.com/PX4/PX4-Autopilot/#supported-hardware).
:::

## Flight Controller Mounting and Setup

Information about how to mount the flight controller, upload firmware (replacing an incompatible bootloader if needed), and configure its internal sensors and orientation:

- [비행 콘트롤러 선정](../getting_started/flight_controller_selection.md)
- [비행 컨트롤러(FC) 장착 ](../assembly/mount_and_orient_controller.md)
- [Updating Firmware](../config/firmware.md)
- [센서 방향](../config/flight_controller_orientation.md)
- [수평 보정](../config/level_horizon_calibration.md)
- [Advanced Controller Orientation](../advanced_config/advanced_flight_controller_orientation_leveling.md)
- [부트로더 업데이트](../advanced_config/bootloader_update.md)
