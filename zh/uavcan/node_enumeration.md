# UAVCAN 列举与配置

> **Note** Enable UAVCAN as the default motor output bus by ticking the 'Enable UAVCAN' checkbox as shown below. Alternatively the UAVCAN_ENABLE parameter can be set to '3' in the *QGroundControl* parameter editor. Set it to '2' to enable CAN, but leave motor outputs on PWM. Alternatively the UAVCAN_ENABLE parameter can be set to '3' in the *QGroundControl* parameter editor. Set it to '2' to enable CAN, but leave motor outputs on PWM.

Use [QGroundControl](../qgc/README.md) and switch to the Setup view. Select the Power Configuration on the left. Click on the 'start assignment' button. Select the Power Configuration on the left. Click on the 'start assignment' button.

After the first beep, turn the propeller on the first ESC swiftly into the correct turn direction. The ESCs will all beep each time one is enumerated. Repeat this step for all motor controllers in the order as shown on the [motor map](../airframes/airframe_reference.md). ESCs running the Sapog firmware will need to be rebooted after enumeration for the new enumeration ID to be applied. This step has to be performed only once and does not need to be repeated after firmware upgrades.

![UAVCAN Enumeration Controls (bottom right of image)](../../assets/uavcan/uavcan_qgc_setup.png)
