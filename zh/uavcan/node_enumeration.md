---
canonicalUrl: https://docs.px4.io/main/zh/uavcan/node_enumeration
---

# UAVCAN 列举与配置

Use [QGroundControl](../qgc/README.md) and switch to the Setup view. Select the Power Configuration on the left. Click on the 'start assignment' button. 选择左侧的电源配置。 单击“开始分配”按钮。
:::

第一次发出蜂鸣声后，将第一个电调上的螺旋桨迅速转到正确的转向。 每次列举时，电调都会发出蜂鸣声。 按照 [motor map](../airframes/airframe_reference.md) 所示的顺序对所有电机控制器重复此步骤。

After the first beep, turn the propeller on the first ESC swiftly into the correct turn direction. The ESCs will all beep each time one is enumerated. Repeat this step for all motor controllers in the order as shown on the [motor map](../airframes/airframe_reference.md). ESCs running the Sapog firmware will need to be rebooted after enumeration for the new enumeration ID to be applied. This step has to be performed only once and does not need to be repeated after firmware upgrades.

![QGC - UAVCAN ESC auto-enumeration](../../assets/peripherals/esc_qgc/qgc_uavcan_settings.jpg)
