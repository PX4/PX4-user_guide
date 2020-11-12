# 混控器和执行器

<!-- there is a useful doc here that we should still mine to further improve this topic: https://docs.google.com/document/d/1xCEQh48uDWyo7TjqedW6gYxBxMtNyuYZ2Xkt2MBb2-w -->

PX4 的系统构架可确保不需要在核心控制器中对不同的机身布局进行任何特殊的处理。

混合意味着接收力的指令（比如： `向右转`），然后将这些指令转换成实际的执行器指令来控制电机或者舵机。 对于一个每片副翼都有一个舵机的飞机而言这就意味着控制这两个舵机一个向上偏转，一个向下偏转。 这也适用于多旋翼：向前俯仰需要改变所有电机的转速。

将混控逻辑与实际的姿态控制器分离开来大大提高了程序的可复用性。

## 控制通道

特定的控制器发送一个特定的归一化的力或力矩指令（缩放至 -1..+1 ）给混控器，混控器则相应地去设置每个单独的执行器。 控制量输出驱动程序（比如：UART, UAVCAN 或者 PWM）则将混控器的输出所放为执行器实际运行时的原生单位， 例如输出一个值为 1300 的 PWM 指令。

![Mixer Control Pipeline](../../assets/concepts/mermaid_mixer_control_pipeline.png)
<!--- Mermaid Live Version:
https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggTFI7XG4gIGF0dF9jdHJsW0F0dGl0dWRlIENvbnRyb2xsZXJdIC0tPiBhY3RfZ3JvdXAwW0FjdHVhdG9yIENvbnRyb2wgR3JvdXAgMF1cbiAgZ2ltYmFsX2N0cmxbR2ltYmFsIENvbnRyb2xsZXJdIC0tPiBhY3RfZ3JvdXAyW0FjdHVhdG9yIENvbnRyb2wgR3JvdXAgMl1cbiAgYWN0X2dyb3VwMCAtLT4gb3V0cHV0X2dyb3VwNVtBY3R1YXRvciA1XVxuICBhY3RfZ3JvdXAwIC0tPiBvdXRwdXRfZ3JvdXA2W0FjdHVhdG9yIDZdXG4gIGFjdF9ncm91cDJbQWN0dWF0b3IgQ29udHJvbCBHcm91cCAyXSAtLT4gb3V0cHV0X2dyb3VwMFtBY3R1YXRvciA1XVxuXHRcdCIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In19
graph LR;
  att_ctrl[Attitude Controller] dash-dash> act_group0[Actuator Control Group 0]
  gimbal_ctrl[Gimbal Controller] dash-dash> act_group2[Actuator Control Group 2]
  act_group0 dash-dash> output_group5[Actuator 5]
  act_group0 dash-dash> output_group6[Actuator 6]
  act_group2[Actuator Control Group 2] dash-dash> output_group0[Actuator 5]
--->

## 控制组

PX4 系统中使用控制组（输入）和输出组。 从概念上讲这两个东西非常简单： 一个控制组可以是核心飞行控制器的 `姿态`，也可以是载荷的 `云台` 。 一个输出组则是一个物理上的总线，例如 飞控上最开始的 8 个 PWM 舵机输出口。 每一个组都有 8 个单位化（-1..+1）的指令端口，这些端口可以通过混控器进行映射和缩放。 混控器定义了这 8 个控制信号如何连接至 8 个输出口。

对于一个简单的飞机来说 control 0（滚转）直接与 output 0（副翼）相连接。 对于多旋翼而言事情要稍有不同：control 0（滚转）与全部四个电机相连接，并会被整合至油门指令中。

### 控制组 #0 (Flight Control)

* 0：roll (-1..1)
* 1：pitch (-1..1)
* 2：yaw (-1..1)
* 3：throttle （正常范围为 0..1，变距螺旋桨和反推动力情况下范围为 -1..1）
* 4：flaps (-1..1)
* 5：spoilers (-1..1)
* 6：airbrakes (-1..1)
* 7：landing gear (-1..1)

### 控制组 #1 (Flight Control VTOL/Alternate)

* 0: roll ALT (-1..1)
* 1: pitch ALT (-1..1)
* 2: yaw ALT (-1..1)
* 3：throttle ALT （正常范围为 0..1，变距螺旋桨和反推动力情况下范围为 -1..1）
* 4：保留 / aux0
* 5：reserved / aux1
* 6：保留 / aux2
* 7：保留 / aux3

### 控制组 #2 （Gimbal）

* 0：gimbal roll
* 1：gimbal pitch
* 2: gimbal yaw
* 3: gimbal shutter
* 4：保留
* 5：保留
* 6：保留
* 7：保留 (降落伞, -1..1)

### 控制组 #3 (Manual Passthrough)

* 0: RC roll
* 1: RC pitch
* 2: RC yaw
* 3: RC throttle
* 4: RC mode switch
* 5: RC aux1
* 6: RC aux2
* 7: RC aux3

> **Note** This group is only used to define mapping of RC inputs to specific outputs during *normal operation* (see [quad_x.main.mix](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/mixers/quad_x.main.mix#L7) for an example of AUX2 being scaled in a mixer). In the event of manual IO failsafe override (if the PX4FMU stops communicating with the PX4IO board) only the mapping/mixing defined by control group 0 inputs for roll, pitch, yaw and throttle are used (other mappings are ignored).

<a id="control_group_6"></a>

### 控制组 #6 (First Payload)

* 0: function 0 (默认：降落伞)
* 1: function 1
* 2: function 2
* 3: function 3
* 4: function 4
* 5: function 5
* 6: function 6
* 7: function 7

## 虚拟控制组

> **Caution** *Virtual Control Group*s are only relevant to developers creating VTOL code. They should not be used in mixers, and are provided only for "completeness".

虚拟控制组并不作为混控器的输入量使用，它们将作为元通道（meta-channels）将固定翼控制器和多旋翼控制器的输出传递给 VOTL 调节器模块（VTOL governor module）。

### 控制组 #4 (Flight Control MC VIRTUAL)

* 0: roll ALT (-1..1)
* 1: pitch ALT (-1..1)
* 2: yaw ALT (-1..1)
* 3: throttle ALT （正常范围为 0..1，变距螺旋桨和反推动力情况下范围为 -1..1）
* 4：保留 / aux0
* 5：保留 / aux1
* 6：保留 / aux2
* 7：保留 / aux3

### 控制组 #5 (Flight Control FW VIRTUAL)

* 0: roll ALT (-1..1)
* 1: pitch ALT (-1..1)
* 2: yaw ALT (-1..1)
* 3: throttle ALT （正常范围为 0..1，变距螺旋桨和反推动力情况下范围为 -1..1）
* 4：保留 / aux0
* 5：保留 / aux1
* 6：保留 / aux2
* 7：保留 / aux3

## 映射

由于同时存在多个控制组（比如说飞行控制、载荷等）和多个输出组（最开始 8 个 PWM 端口， UAVCAN 等），一个控制组可以向多个输出组发送指令。

The mixer file does not explicitly define the actual *output group* (physical bus) where the outputs are applied. Instead, the purpose of the mixer (e.g. to control MAIN or AUX outputs) is inferred from the mixer [filename](#mixer_file_names), and mapped to the appropriate physical bus in the system [startup scripts](../concept/system_startup.md) (and in particular in [rc.interface](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/init.d/rc.interface)).

> **Note** This approach is needed because the physical bus used for MAIN outputs is not always the same; it depends on whether or not the flight controller has an IO Board (see [PX4 Reference Flight Controller Design > Main/IO Function Breakdown](../hardware/reference_design.md#mainio-function-breakdown)) or uses UAVCAN for motor control. The startup scripts load the mixer files into the appropriate device driver for the board, using the abstraction of a "device". The main mixer is loaded into device `/dev/uavcan/esc` (uavcan) if UAVCAN is enabled, and otherwise `/dev/pwm_output0` (this device is mapped to the IO driver on controllers with an I/O board, and the FMU driver on boards that don't). The aux mixer file is loaded into device `/dev/pwm_output1`, which maps to the FMU driver on Pixhawk controllers that have an I/O board.

Since there are multiple control groups (like flight controls, payload, etc.) and multiple output groups (busses), one control group can send commands to multiple output groups.

![Mixer Input/Output Mapping](../../assets/concepts/mermaid_mixer_inputs_outputs.png)
<!--- Mermaid Live Version:
https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggVEQ7XG4gIGFjdHVhdG9yX2dyb3VwXzAtLT5vdXRwdXRfZ3JvdXBfNVxuICBhY3R1YXRvcl9ncm91cF8wLS0-b3V0cHV0X2dyb3VwXzZcbiAgYWN0dWF0b3JfZ3JvdXBfMS0tPm91dHB1dF9ncm91cF8wIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0
graph TD;
  actuator_group_0 dashdash>output_group_5
  actuator_group_0dashdash>output_group_6
  actuator_group_1dashdash>output_group_0
--->

> **Note** In practice, the startup scripts only load mixers into a single device (output group). This is a configuration rather than technical limitation; you could load the main mixer into multiple drivers and have, for example, the same signal on both UAVCAN and the main pins.


## PX4 混控器定义

Mixers are defined in plain-text files using the [syntax](#mixer_syntax) below.

**ROMFS/px4fmu_common/mixers** 文件夹下的文件定义了在预定义的机架中可以使用的所有混控器。 这些文件可以作为建立自定义混控器的基础，或者用于一般的测试目的。

<a id="mixer_file_names"></a>

### 混控器描述文件命名

例如：每一个简单的或者空的混控器都会根据它在混控器描述文件中的出现顺序依次分配给输出 1 至 x 。

<a id="loading_mixer"></a>

### 语法

The default set of mixer files (in PX4 firmware) are defined in [px4fmu_common/init.d/airframes/](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/init.d/airframes/). These can be overridden by mixer files with the same name in the SD card directory **/etc/mixers/** (SD card mixer files are loaded by preference).

PX4 loads mixer files named **XXXX._main_.mix** onto the MAIN outputs and **YYYY._aux_.mix** onto the AUX outputs, where the prefixes depend on the airframe and airframe configuration. Commonly the MAIN and AUX outputs correspond to MAIN and AUX PWM outputs, but these may be loaded into a UAVCAN (or other) bus when that is enabled.

The MAIN mixer filename (prefix `XXXX`) is set in the airframe configuration using `set MIXER XXXX` (e.g. [airframes/10015_tbs_discovery](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/init.d/airframes/10015_tbs_discovery) calls `set MIXER quad_w` to load the main mixer file **quad_w._main_.mix**).

空的混控器使用如下形式定义：
- 4x - X 构型的四旋翼
- Multicopter and Fixed-Wing airframes load [pass.aux.mix](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/mixers/pass.aux.mix) by default (i.e if not set using `MIXER_AUX`).

   > **Tip** `pass.aux.mix` is the *RC passthrough mixer*, which passes the values of 4 user-defined RC channels (set using the [RC_MAP_AUXx/RC_MAP_FLAPS](../advanced/parameter_reference.md#RC_MAP_AUX1) parameters) to the first four outputs on the AUX output.
- VTOL frames load the AUX file specified using `MIXER_AUX` if set, or the value specified by `MIXER` if not.
- 6+ - + 构型的六旋翼

> **Note** Mixer file loading is implemented in [ROMFS/px4fmu_common/init.d/rc.interface](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/init.d/rc.interface).

<a id="loading_custom_mixer"></a>

### Loading a Custom Mixer

PX4 loads appropriately named mixer files from the SD card directory **/etc/mixers/**, by preference, and then the version in Firmware.

一个简单的混控器的定义的开头如下：

Most commonly you will override/replace the **AUX** mixer file for your current airframe (which may be the RC passthrough mixer - [pass.aux.mix](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/mixers/pass.aux.mix)). See above for more information on [mixer loading](#loading_mixer).

> **Tip** You can also *manually* load a mixer at runtime using the [mixer load](../middleware/modules_command.md#mixer) command  (thereby avoiding the need for a reboot). For example, to load a mixer **/etc/mixers/test_mixer.mix** onto the MAIN PWM outputs, you could enter the following command in a [console](../debug/consoles.md): `
    mixer load /dev/pwm_output0 /fs/microsd/etc/mixers/test_mixer.mix`

<a id="mixer_syntax"></a>

### Syntax

Mixer files are text files that define one or more mixer definitions: mappings between one or more inputs and one or more outputs.

定义文件将持续进行 `&lt;control count&gt;` 次定义，并以如下形式完成对各个控制输入量机器相应的缩放因子的描述：
- [Multirotor mixer](#multirotor_mixer) - Defines outputs for 4, 6, or 8 rotor vehicles with + or X geometry.
- [Helicopter mixer](#helicopter_mixer) - Defines outputs for helicopter swash-plate servos and main motor ESCs (the tail-rotor is a separate [summing mixer](#summing_mixer).)
- 一个简单的混控器会将零个或者多个控制输入组合成一个执行器输出。 控制输入首先会被缩放，然后混合函数在进行输出缩放时会对结果进行求和。
- [Null mixer](#null_mixer) - Generates a single actuator output that has zero output (when not in failsafe mode).

> **Tip** Use *multirotor* and *helicopter mixers* for the respective types, the *summing mixer* for servos and actuator controls, and the *null mixer* for creating outputs that must be zero during normal use (e.g. a parachute has 0 normally, but might have a particular value during failsafe). A [VTOL Mixer](#vtol_mixer) combines the other mixer types.

The number of outputs generated by each mixer depends on the mixer type and configuration. For example, the multirotor mixer generates 4, 6, or 8 outputs depending on the geometry, while a summing mixer or null mixer generate just one output.

You can specify more than one mixer in each file. The output order (allocation of mixers to actuators) is specific to the device reading the mixer definition; for a PWM device the output order matches the order of declaration. For example, if you define a multi-rotor mixer for a quad geometry, followed by a null mixer, followed by two summing mixers then this would allocate the first 4 outputs to the quad, an "empty" output, and the next two outputs.

混控器定义以如下形式的行作为开头：
```
<tag>: <mixer arguments>
```

[这里](../airframes/adding_a_new_frame.md#mixer-file) 是一个典型混控器的示例文件。
- `R`: [Multirotor mixer](#multirotor_mixer)
- `H`: [Helicopter mixer](#helicopter_mixer)
- `M`: [Summing mixer](#summing_mixer)
- `Z`: [Null mixer](#null_mixer)

多旋翼的混控器将四组控制输入（俯仰、滚转、偏航和推力）整合到一组用于驱动电机转速控制器的执行器输出指令中。

> **Note** `S:` l行必须处于 `O:` 的下面。

<a id="summing_mixer"></a>

#### 空的混控器（Null）

该混控器使用如下形式的行进行定义：

一个空的混控器不需要任何控制输入，并始终生成一个值为零的执行器输出。 Inputs are scaled, and the mixing function sums the result before applying an output scaler.

混控器的定义的开头如下：

```
M: <control count>
O: <-ve scale> <+ve scale> <offset> <lower limit> <upper limit>
```

如果 `&lt;control count&gt;` 为零，那么计算的结果也为零，混控器将输出 `&lt;offset&gt;` 这一固定值，该值的取值范围受 `&lt;lower limit&gt;` 和 `&lt;upper limit&gt;` 的限制。

上面的第二行还使用在之前讨论中提到的缩放参数对输出缩放器进行了定义。 同时，结果的计算是以浮点计算的形式进行的，在混控器定义文件中的值都将缩小 10000 倍，比如：实际中 -0.5 的偏移量（offset）在定义文件中保存为 -5000 。

当有一个执行器出现饱和后，所有执行器的值都将被重新缩放以使得饱和执行器的输出被限制在 1.0 。

```
S: <group> <index> <-ve scale> <+ve scale> <offset> <lower limit> <upper limit>
```

> **Note** The `S:` lines must be below the `O:` line.

`&lt;group&gt;` 参数指定了缩放器从哪个控制组中读取数据，而 `&lt;index&gt;` 参数则是定义了该控制组的偏移值。   
这些参数的设定值会随着读取混控器定义文件的设备的不同而发生改变。

当将混控器用于混合飞机的控制量时，编号为 0 的混控器组为飞机的姿态控制组，该控制组内编号 0 - 3 的选项通常分别便是滚转、俯仰、偏航和推力。

剩下的字段则是使用上文提及的缩放参数对控制量的缩放器进行了设定。 同时，结果的计算是以浮点计算的形式进行的，在混控器定义文件中的值都将缩小 10000 倍，比如：实际中 -0.5 的偏移量（offset）在定义文件中保存为 -5000 。

An example of a typical mixer file is explained [here](../airframes/adding_a_new_frame.md#mixer-file).

<a id="null_mixer"></a>

#### 一个简单的混控器

后面的各行则是对每个倾斜盘舵机（ 3 个或者 4 个）进行设定，文本行的形式如下：

Typically a null mixer is used as a placeholder in a collection of mixers in order to achieve a specific pattern of actuator outputs. It may also be used to control the value of an output used for a failsafe device (the output is 0 in normal use; during failsafe the mixer is ignored and a failsafe value is used instead).

The null mixer definition has the form:
```
Z:
```

<a id="multirotor_mixer"></a>

#### 针对多旋翼的混控器

尾桨的控制可以通过额外添加一个 [简单的混控器](#simple-mixer) 来实现：

The mixer definition is a single line of the form:
```
R: <geometry> <roll scale> <pitch scale> <yaw scale> <idlespeed>
```

The supported geometries include:

* 6x - X 构型的六旋翼
* 4+ - + 构型的四旋翼
* 8x - X 构型的八旋翼
* 8+ - + 构型的八旋翼
* 8x - octocopter in X configuration
* 8+ - octocopter in + configuration

滚转、俯仰和偏航的缩放因子大小都分别表示滚转、俯仰和边行控制相对于推力控制的比例。 同时，结果的计算是以浮点计算的形式进行的，在混控器定义文件中的值都将缩小 10000 倍，比如：实际中 0.5 的偏移量（offset）在定义文件中保存为 5000 。

滚转、俯仰和偏航输入量的范围应在 -1.0 到 1.0 之间，推力输入应该在 0.0 到 1.0 之间。 每一个执行器的输出量应在 -1.0 到 1.0 之间。

怠速（Idlespeed）的设定值应在 0.0 到 1.0 之间。 在这里怠速的值表示的是相对电机最大转速的百分比，当所有控制输入均为 0 的时候电机应在该转速下运行。

In the case where an actuator saturates, all actuator values are rescaled so that the saturating actuator is limited to 1.0.

<a id="helicopter_mixer"></a>

#### 针对直升机的混控器

直升机的混控器将三组控制输入（滚转、俯仰和推力）整合到四个输出中（倾斜盘舵机和主电机 ESC 设定）。 直升机混控器的第一个输出量是主电机的油门设定。 随后才是倾斜盘舵机的指令。 尾桨的控制可以通过额外添加一个简单的混控器来实现。

推力控制输入同时用于设定直升机的主电机和倾斜盘的总距。 在运行时它会使用一条油门曲线和一条总距曲线，这两条曲线都由 5 个控制点组成。

> **Note** 油门曲线及总距曲线将 “推力” 摇杆输入位置映射到一个油门值和总距值（单独地）。 这就使得我们可以针对不同类型的飞行对飞机的飞行特性进行调整。 如何调整这些映射曲线可以参考 [这篇指南](https://www.rchelicopterfun.com/rc-helicopter-radios.html) （搜索 *Programmable Throttle Curves* 和 *Programmable Pitch Curves*）。

The mixer definition begins with:

```
H: <number of swash-plate servos, either 3 or 4>
T: <throttle setting at thrust: 0%> <25%> <50%> <75%> <100%>
P: <collective pitch at thrust: 0%> <25%> <50%> <75%> <100%>
```
`T：` 定义了油门曲线的控制点。 `P：` 定义了总距曲线的控制点。 两条去年都包含了 5 个控制点，每个点的取值都在 0 - 10000 这个范围内。 对于简单的线性特性而言，这五个点的取值应该为 `0 2500 5000 7500 10000` 。

This is followed by lines for each of the swash-plate servos (either 3 or 4) in the following form:
```
S: &lt;angle&gt; &lt;arm length&gt; &lt;scale&gt; &lt;offset&gt; &lt;lower limit&gt; &lt;upper limit&gt;
```

`&lt;angle&gt;` 是角度制， 0 ° 表示的倾斜盘的朝向与机鼻的方向相同。 从飞机上方往下看，倾斜盘顺时针旋转为正。 `&lt;arm length&gt;` 表示的是归一化的长度，文件中若值为 10000 则实际表示 1。 如果所有的舵机摇臂的长度都一致，那么这个值应该设置为 10000 。 更长的摇臂意味着舵机的偏转量更少，而较短的摇臂则意味着更多的舵机偏转量。

舵机的输出按照比例 `&lt;scale&gt; / 10000` 进行缩放。 完成缩放后会应用 `&lt;offset&gt;` ，该参数的取值介于 -10000 和 10000 之间。 `&lt;lower limit&gt;` 和 `&lt;upper limit&gt;` 应分别设置为 -10000 和 +10000 以使得舵机可以实现全行程。

The tail rotor can be controller by adding a [summing mixer](#summing_mixer):
```
M: 1
S: 0 2  10000  10000      0 -10000  10000
```
完成上述工作后，直升机的尾桨设定直接映射到了飞机的偏航指令上。 该设置同时适用于舵机控制的尾桨和使用专用电机控制的尾桨。

以 [Blade 130 直升机混控器](https://github.com/PX4/Firmware/blob/master/ROMFS/px4fmu_common/mixers/blade130.main.mix) 为例。
```
H: 3
T:      0   3000   6000   8000  10000
P:    500   1500   2500   3500   4500
# Swash plate servos:
S:      0  10000  10000      0  -8000   8000
S:    140  13054  10000      0  -8000   8000
S:    220  13054  10000      0  -8000   8000

# Tail servo:
M: 1
S: 0 2  10000  10000      0 -10000  10000
```
- The throttle-curve starts with a slightly steeper slope to reach 6000 (0.6) at 50% thrust.
- It continues with a less steep slope to reach 10000 (1.0) at 100% thrust.
- The pitch-curve is linear, but does not use the entire range.
- At 0% throttle, the collective pitch setting is already at 500 (0.05).
- At maximum throttle, the collective pitch is only 4500 (0.45).
- Using higher values for this type of helicopter would stall the blades.
- The swash-plate servos for this helicopter are located at angles of 0, 140 and 220 degrees.
- The servo arm-lenghts are not equal.
- The second and third servo have a longer arm, by a ratio of 1.3054 compared to the first servo.
- The servos are limited at -8000 and 8000 because they are mechanically constrained.

<a id="vtol_mixer"></a>

#### VTOL Mixer

VTOL systems use a [multirotor mixer](#multirotor_mixer) for the multirotor outputs, and [summing mixers](#summing_mixer) for the fixed-wing actuators (and the tilting servos in case of a tiltrotor VTOL).

The mixer system for a VTOL vehicle can be either combined into a single mixer, where all the actuators are connected to either the IO or the FMU port, or split into separate mixer files for IO and for AUX. If separated, we recommend that all the multicopter motors are on one port, and all the servos and the fixed-wing motor on the other.

> **Note** The FMU output can only be used for multirotor motors starting from PX4 v1.11. To use the FMU output set [VT_MC_ON_FMU=1](../advanced/parameter_reference.md#VT_MC_ON_FMU) (otherwise they are not switched off when in fixed-wing flight mode).
