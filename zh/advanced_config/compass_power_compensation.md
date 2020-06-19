# 磁航向电源补偿

指南针（磁力计）应该安装在尽可能远离通过大电流的线缆的位置，因为它们诱发的磁场会干扰指南针的读数。

本文解释了如何在不能改变磁航向计安装位置的情况下如何补偿诱发磁场带来的影响。

> **Tip**使磁航向计远离动力电缆是最简单和最有效的避免诱发磁场干扰的方法，因为磁场强度是按与电缆的距离的二次方衰减的。

<span></span>
> **Note** 下述过程基于多旋翼无人机演示，但同样适用于其他类型的载具。

## 电源补偿的适用条件 {#when}

只有当下述的全部条件都满足时才建议采用电源补偿：
1. 磁航向计无法远离动力线缆。
1. 磁航向计读数与油门杆位与/或电池电流有强相关性。![Corrupted mag](../../assets/advanced_config/corrupted_mag.png)

1. 无人机的线缆都是固定的或不会移动的（当通电的线缆能够移动会导致计算出的补偿参数失效）。

## 如何补偿磁航向计 {#how}

1. 确保无人机运行在支持电源补偿的固件版本上（当前的Master版，或v1.11.0之后的版本）。
1. 执行标准的[指南针校准](../config/compass.md#compass-calibration)流程。
1. 将参数[SDLOG_MODE](../advanced_config/parameter_reference.md#SDLOG_MODE) 设为2，使系统一启动就开始记录日志。
1. 将参数[SDLOG_PROFILE](../advanced_config/parameter_reference.md#SDLOG_PROFILE) 复选框的*高采样率 (high rate)* (bit 2)选中，以获得更多的数据采样点。
1. 固定好无人机使其无法移动，然后装好螺旋桨（这样电机可以获得与实际飞行中同样大的电流）。 本例中用带子固定了无人机。

   ![strap](../../assets/advanced_config/strap.png)
1. 给无人机上电，并切换到[特技 (ACRO) 飞行模式](../flight_modes/acro_mc.md) （此模式下无人机不会试图去补偿带子对运动造成的影响）。
   - 解锁无人机，然后缓缓将油门推到最大。
   - 慢慢将油门降到0
   - 给无人机加锁 > **Note** 谨慎地进行测试，并密切注意振动情况。
1. Retrieve the ulog and use the python script [mag_compensation.py](https://github.com/PX4/Firmware/blob/master/src/lib/mag_compensation/python/mag_compensation.py) to identify the compensation parameters.
   ```cmd
   python mag_compensation.py ~/path/to/log/logfile.ulg
   ```

   > **Note** If your log does not contain battery current measurements, you will need to comment out the respective lines in the python script, such that it does the calculation for thrust only.
1. The script will return the parameter identification for thrust as well as for current and print them to the console. The figures that pop up from the script show the "goodness of fit" for each compass instance, and how the data would look if compensated with the suggested values. If a current measurement is available, using the current-compensation usually yields the better results. Here is an example of a log, where the current fit is good, but the thrust parameters are unusable as the relationship is not linear. ![line fit](../../assets/advanced_config/line_fit.png)

1. Once the parameters are identified, the power compensation must be enabled by setting [CAL_MAG_COMP_TYP](../advanced_config/parameter_reference.md#CAL_MAG_COMP_TYP) to 1 (when using thrust parameters) or 2 (when using current parameters). Additionally, the compensation parameters for each axis of each compass must be set.

   ![comp params](../../assets/advanced_config/comp_params.png)
