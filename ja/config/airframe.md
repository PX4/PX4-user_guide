---
canonicalUrl: https://docs.px4.io/main/ja/config/airframe
---

# Vehicle (Frame) Selection

After installing firmware you need to select the [vehicle type and specific frame configuration](../airframes/airframe_reference.md) that best matches your vehicle frame. This applies appropriate default parameter values for the selected frame, such as the vehicle type, number of motors, relative motor position, and so on.

:::note
Choose the frame that matches your vehicle brand and model if one exists, and otherwise select the closest "Generic" frame option matching your vehicle.
:::

## Set the Frame

To set the airframe:

1. Start *QGroundControl* and connect the vehicle.
1. Select **"Q" icon > Vehicle Setup > Airframe** (sidebar) to open *Airframe Setup*.
1. Select the broad vehicle group/type that matches your airframe and then use the dropdown within the group to choose the airframe that best matches your vehicle.

   ![Selecting generic hexarotor X frame in QGroundControl](../../assets/qgc/setup/airframe/airframe_px4.jpg)

   The example above shows *Generic Hexarotor X geometry* selected from the *Hexarotor X* group.

1. Click **Apply and Restart**. Click **Apply** in the following prompt to save the settings and restart the vehicle.

   <img src="../../assets/qgc/setup/airframe/airframe_px4_apply_prompt.jpg" width="300px" title="Apply airframe selection prompt" />

## Next Steps

[Actuator Configuration & Testing](../config/actuators.md) shows how to set the precise geometry of the vehicle motors and actuators, and their mapping to flight controller outputs. After mapping actuators to outputs you should perform [ESC Calibration](../advanced_config/esc_calibration.md) if using PWM or OneShot ESCs.

## Further Information

- [QGroundControl User Guide > Airframe](https://docs.qgroundcontrol.com/master/en/SetupView/Airframe.html)
- [PX4 Setup Video - @37s](https://youtu.be/91VGmdSlbo4?t=35s) (Youtube)
