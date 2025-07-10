---
canonicalUrl: https://docs.px4.io/main/zh/uavcan/notes
---

# 各种说明

这是在设置或使用 UAVCAN 时解决问题的一系列提示和技巧。

### 解锁，但电机不旋转

If the PX4 Firmware arms but the motors do not start to rotate, check the parameter **UAVCAN\_ENABLE**. It should be set to 3 in order to use the ESCs connected via UAVCAN as output. Moreover, if the motors do not start spinning before thrust is increased, check **UAVCAN\_ESC\_IDLT** and set it to one. 它应该设置为 3，以便使用通过 UAVCAN 连接的电调作为输出。 此外，如果电机在增加推力之前没有开始旋转，请检查 **UAVCAN\_ESC\_IDLT** 并将其设置为 1。

### 用 Zubax Babel 进行调试

A great tool to debug the transmission on the UAVCAN bus is the [Zubax Babel](https://docs.zubax.com/zubax_babel) in combination with the [GUI tool](http://uavcan.org/GUI_Tool/Overview/). They can also be used independently from Pixhawk hardware in order to test a node or manually control UAVCAN enabled ESCs. 它们还可以独立于 Pixhawk 硬件使用，以测试节点或手动控制启用了 UAVCAN 的电调。


### UAVCAN devices dont get node ID/FW doesn't update

PX4 requires an SD card for UAVCAN node allocation and firmware upgrade (both of which happen during boot). Check that there is a (working) SD card present and reboot.

