---
canonicalUrl: https://docs.px4.io/main/zh/flight_modes/README
---

# 飞行模式

*Flight Modes* define how the autopilot responds to user input and controls vehicle movement. The tables below summarizes flight modes for fixed-wing and copter ([table key is below](#key)). 请注意，这是 "上层" 默认行为，可能因机体参数而异。 链接的主题（侧边栏）提供了有关各个模式的详细信息，包括它们的调整参数。

:::tip
A *beginner friendly* explanation of all flight modes is provided in [Getting Started > Flight Modes](../getting_started/flight_modes.md). :::

<!-- Styles used for tables below -->
<style>
table {
  display: block;
  overflow: scroll;
  width: 100%;
  font-size:1.5rem;
  text-align:center;
}

.markdown-section table {
  display: block;
}

tr td:nth-last-child(1) {
    text-align:left;
}

/*
  .col_summary {
    width:50px;
  }
*/


th {
  font-size:1.0rem;
}


@media (min-width: 1500px){
.page-inner {
  max-width: 1100px;
  }
}

@media (min-width: 1400px) and (max-width: 1500px) {
.page-inner {
  max-width: 1000px;
  }
}

@media (min-width: 1200px) and (max-width: 1400px) {
.page-inner {
  max-width: 800px;
  }
}

</style>

## Fixed-wing

<table>
 <thead>
   <tr>
     <th class="col_modes">模式</th>
     <th class="col_r_p">横滚和俯仰</th>
     <th class="col_yaw">偏航</th>
     <th class="col_throttle">油门</th>
     <th class="col_sensor">位置传感器</th>
     <th class="col_summary">概要</th></tr>
   </tr>
 </thead>
<tbody>

<tr id="position_fw">
 <td><a href="../flight_modes_mc/position.html">Position</a>
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="易于飞行" width="20px" /></a></p>
 </td>
 <td>S<sup>+</sup></td>
 <td>S<sup>+</sup></td>
 <td>S<sup>+</sup></td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位（例如GPS）" width="20px" /></a></td>
 <td><p>在遥控模式下，回中摇杆会使飞机定直平飞，保持飞机的姿态、高度和直线飞行路径并抗风（和其他力）。
   <ul>
       <li>回中摇杆使飞机沿着直线地面轨道在当前方向水平飞行并抗风。</li>
       <li>中心以外：
      <ul>
        <li>俯仰摇杆控制高度（与 <a href="#altitude_fw">高度</a>相同）。</li>
        <li>滚转摇杆控制滚转角度。 自动驾驶仪将保持 <a href="https://en.wikipedia.org/wiki/Coordinated_flight">协调飞行</a> （与 <a href="#stabilized_fw">稳定</0> 相同）。</li>
        <li>油门设置空速（与 <a href="#altitude_fw">高度</a> 相同）。</li> 
        <li>Roll and pitch are angle-controlled (so it is impossible to roll over or loop the vehicle).</li>
        <li>Yaw stick adds an additional yaw rate setpoint (signal will be added to the one calculated by the autopilot to maintain <a href="https://en.wikipedia.org/wiki/Coordinated_flight">coordinated flight</a>). 这和 <a href="#stabilized_fw">稳定模式</a> 一样。</li>
     </ul></li>
   </ul>
  </p>
  </td>
</tr>


<tr id="altitude_fw">
 <td><a href="../flight_modes_mc/altitude.html">Altitude</a>
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="易于飞行" width="20px" /></a></p>
 </td>
 <td><p>S（滚转）</p><p>S<sup>+</sup>(俯仰)</p></td>
 <td>M</td>
 <td>S<sup>+</sup></td>
 <td><a href="#altitude_only"><img src="../../assets/site/altitude_icon.svg" title="需要定高（例如气压计、测距仪）" width="20px" /></a></td>
 <td>
 <p>遥控模式，类似 <a href="#stabilized_fw">稳定</a> 模式, 但具有 <em>高度稳定</em> （杆回中将使飞机定直平飞 并保持当前高度）。 但是飞行航向并不稳定，可能被风吹飘离。
  <ul>
    <li>横滚、俯仰、偏航摇杆回中(在死区内)：
      <ul>
       <li>自动驾驶仪保持高度稳定和机翼水平。</li> 
       <li>如果连接了空速传感器，油门控制飞机的空速（如果没有空速传感器，用户就无法控制油门）。</li>
    </ul>
    <li>中心以外：
      <ul>
       <li>俯仰摇杆控制高度。</li>
       <li>油门杆控制飞机的空速（如回中 横滚、俯仰、偏航摇杆）。</li>
       <li>Yaw stick adds an additional yaw rate setpoint (signal will be added to the one calculated by the autopilot to maintain <a href="https://en.wikipedia.org/wiki/Coordinated_flight">coordinated flight</a>). 这和 <a href="#stabilized_fw">稳定模式</a> 一样。</li>
    </ul>
  </li>
  </ul>
 </p>
 </td>
</tr>


<tr id="stabilized_fw">
 <td><a href="../flight_modes_fw/stabilized.html">Stabilized</a>
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_medium.png" title="中等飞行难度" width="20px" /></a></p>
 </td>
 <td>S</td>
 <td>M</td>
 <td>M</td>
 <td></td>
 <td>
  <p>遥控模式，其中摇杆回中可以改平飞机的姿态（横滚和俯仰）。 但是飞行航向和姿态并不稳定，可能被风吹漂移。</p>
<ul>
   <li>俯仰摇杆控制俯仰角度。</li>
   <li>滚转摇杆控制滚转角度。 自动驾驶仪将保持 <a href="https://en.wikipedia.org/wiki/Coordinated_flight">协调飞行</a>。</li>
   <li>油门摇杆控制油门。</li>
   <li>Yaw stick adds an additional yaw rate setpoint (signal will be added to the one calculated by the autopilot to maintain <a href="https://en.wikipedia.org/wiki/Coordinated_flight">coordinated flight</a>).</li>
</ul>
 </td>
</tr>

<tr id="acro_fw">
 <td><a href="../flight_modes_mc/acro.html">Acro</a>
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_hard.png" title="飞行难度：困难" width="20px" /></a></p>
 </td>
 <td>S<sub>rate</sub></td>
 <td>S<sub>rate</sub></td>
 <td>M</td>
 <td></td>
 <td><p>用于执行杂技动作的遥控模式，例如滚动、翻转、失速和杂技图形。</p>
<p>RPY摇杆输入被转换为角速度命令，通过自动驾驶仪稳定。 Throttle is passed directly to control allocation.</p></td>
</tr>


<tr id="manual_fw">
 <td><a href="../flight_modes_fw/manual.html">Manual</a>
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_hard.png" title="飞行难度：困难" width="20px" /></a></p>
 </td>
 <td>M</td>
 <td>M</td>
 <td>M</td>
 <td></td>
 <td><p>RC mode where stick input is sent directly to control allocation (for "fully" manual control).</p>
   <p>这是覆盖 FMU（命令通过安全协处理器发送）的唯一模式。 它提供了一个安全机制，允许在 FMU 固件出现故障时，通过遥控完全控制油门、升降舵、副翼和方向舵。
   </p>
  </td>
</tr>


<tr id="takeoff_fw">
 <td><a href="../flight_modes_fw/takeoff.html">起飞</a></td>
 <td colspan="3">自动</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位（例如GPS）" width="20px" /></a></td>
 <td>飞机使用 <em>弹射/手持发射模式</em> 或 <em>滑行起飞模式</em> （在当前方向）启动起飞顺序。</td>
</tr>


<tr id="land_fw">
 <td><a href="../flight_modes_fw/land.html">降落</a></td>
 <td class="centred" colspan="3">自动</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位（例如GPS）" width="20px" /></a></td>
 <td>Vehicle initiates the <a href="../flight_modes/mission.html#fw-mission-landing">fixed-wing landing</a> sequence.</td>
</tr>

<tr id="hold_fw">
 <td><a href="../flight_modes_fw/hold.html">保持</a></td>
 <td colspan="3">自动</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位（例如GPS）" width="20px" /></a></td>
 <td>飞机在当前高度并在 GPS 保持的位置绕圈飞行。</td>
</tr>

<tr id="return_fw">
 <td><a href="../flight_modes/return.html">返航</a></td>
 <td colspan="3">自动</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位（例如GPS）" width="20px" /></a></td>
 <td>无人机飞向安全位置的明确路径。 返航取决于参数设置，并且可遵循任务路径和/或任务着陆模式（如果已定义）。</td>
</tr>


<tr id="mission_fw">
 <td><a href="../flight_modes/mission.html">任务</a></td>
 <td colspan="3">自动</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位（例如GPS）" width="20px" /></a></td>
 <td>飞机执行已上传到飞控的 <a href="../flying/missions.html">预定义的任务或飞行计划</a>。 </td>
</tr>

<tr id="offboard_fw">
 <td><a href="../flight_modes/offboard.html">Offboard</a></td>
 <td colspan="3">自动</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位（例如GPS）" width="20px" /></a></td>
 <td>无人机遵守通过 MAVLink 提供的姿态设定点（通常是通过串口或 wifi 连接的机载计算机）。</td>
</tr>
 
</tbody></table>

## 多旋翼

<table>
 <thead>
   <tr>
     <th>模式</th>
     <th>横滚和俯仰</th>
     <th>偏航</th>
     <th>油门</th>
     <th>位置传感器</th>
     <th class="col_summary">概要</th></tr>
   </tr>
 </thead>
<tbody>


<tr id="position_mc">
 <td><a href="../flight_modes_mc/position.html">Position</a>
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="易于飞行" width="20px" /></a></p>
 </td>
 <td>S<sup>+</sup></td>
 <td>S<sub>rate</sub></td>
 <td>S<sup>+</sup></td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位（例如GPS）" width="20px" /></a></td>
 <td><p>在遥控器模式下，横滚，俯仰，油门摇杆控制相应轴/方向的移动。 所有摇杆置中，将使机体水平，并保持固定的高度和位置来抗风。
  <ul>
    <li>RPT摇杆回中可以抗风并保持飞机X、Y、Z位置稳定以及姿态水平。</li>
    <li>中心以外：
      <ul>
       <li>横滚/俯仰摇杆（分别）控制机体的前后左右方向的相对于地面的水平加速度。</li>
       <li>油门摇杆控制上升-下降的速度。</li>
       <li>偏航摇杆控制水平面上方的角度旋转速率。</li>
      </ul>
    </li>
    <li>起飞：
      <ul>
       <li>当机体在地上时，如果油门摇杆抬高至 62.5%（从油门杆最低开始的整个范围），机体将起飞。</li>
      </ul>
    </li>
    </ul>
  </li>
  </ul>
 </p>
</td>
</tr>

<tr id="altitude_mc">
 <td><a href="../flight_modes_mc/altitude.html">Altitude</a>
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="易于飞行" width="20px" /></a></p>
 </td>
 <td>S</td>
 <td>S<sub>rate</sub></td>
 <td>S<sup>+</sup></td>
 <td><a href="#altitude_only"><img src="../../assets/site/altitude_icon.svg" title="需要定高（例如气压计、测距仪）" width="20px" /></a></td>
 <td><p>遥控模式，就像<a href="#manual_stabilized_mc">手动/自稳</a>模式除了具有<em>高度稳定</em>功能（杆回中使飞机水平并保持固定高度）。 水平位置可能会受风的影响（或已经存在的动量）。
  <ul>
    <li>摇杆回中(在死区内)时:
      <ul>
       <li>RPY摇杆使机体水平。</li> 
       <li>油门（~50%）保持当前高度稳定并抗风。</li>
    </ul>
    <li>中心以外：
      <ul>
       <li>滚转/俯仰摇杆控制各自方向的倾斜角，从而产生相应的左右和前后运动。</li>
       <li>油门摇杆以预定的最大速率（和其他轴上的移动速度）控制上升速度。</li> 
       <li>偏航摇杆控制水平面上方的角度旋转速率。</li> 
      </ul>
    </li>
    <li>起飞：
      <ul>
       <li>当机体在地上时，如果油门摇杆抬高至 62.5%（从油门杆最低开始的整个范围），机体将起飞。</li>
      </ul>
    </li>
  </ul>
 </p>
 </td>
</tr>


<tr id="manual_stabilized_mc">
 <td><a href="../flight_modes_mc/manual_stabilized.html">Manual/ Stabilized</a>
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_medium.png" title="中等飞行难度" width="20px" /></a></p>
 </td>
 <td>S</td>
 <td>S<sub>rate</sub></td>
 <td>M</td>
 <td></td>
 <td><p>遥控模式，回正摇杆(仅)保持机体水平（位置不稳定）。</p>
   <p>
   <ul>
    <li>回正RP摇杆使机体水平。</li>
    <li>中心以外：
      <ul>
       <li>滚转/俯仰摇杆控制各自方向的倾斜角，导致左右和前后的移动。</li>
       <li>油门摇杆控制上升/下降速度 （和其他轴的移动速度）。</li>
       <li>偏航摇杆控制水平面上方的角度旋转速率。</li>
      </ul>
    </li>
    </ul>
  </p>
</td>
</tr>

<tr id="acro_mc">
 <td><a href="../flight_modes_mc/acro.html">Acro</a>
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_hard.png" title="飞行难度：困难" width="20px" /></a></p>
 </td>
 <td>S<sub>rate</sub></td>
 <td>S<sub>rate</sub></td>
 <td>M</td>
 <td></td>
 <td><p>用于执行特技动作的遥控模式，例如翻转，横滚和环绕。</p> 
  <p>横滚、俯仰、偏航摇杆输入控制围绕各自轴的角度旋转速率。 Throttle is passed directly to control allocation.  当操纵杆居中时，机体将停止旋转，但保持其当前朝向（在其侧面，倒置或任何其他方向）并根据当前动量移动。</p>
 </td>
</tr>


<tr id="orbit_mc">
 <td><a href="../flight_modes_mc/orbit.html">Orbit</a>
 <p><a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="易于飞行" width="20px" /></a></p>
 </td>
 <td>-</td>
 <td>-</td>
 <td>-</td>
 <td></td>
 <td><p>地面站发起的引导模式，用于绕圈飞行，并且始终朝向圆圈中心。</p> 
  <p>该模式必须由地面站启动，指定中心点，初始半径和高度。 遥控是可选的，可用于设置轨道高度，半径，速度和方向。 高度控制与 <a href="#position_mc">位置模式</a> 相同。</p>
 </td>
</tr>

<tr id="takeoff_mc">
 <td><a href="../flight_modes_mc/takeoff.html">起飞</a></td>
 <td colspan="3">自动</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位（例如GPS）" width="20px" /></a></td>
 <td>机体上升到起飞高度并保持位置。</td>
</tr>

<tr id="land_mc">
 <td><a href="../flight_modes_mc/land.html">降落</a></td>
 <td colspan="3">自动</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位（例如GPS）" width="20px" /></a></td>
 <td>飞机降落在模式指定的位置。</td>
</tr>

<tr id="hold_mc">
 <td><a href="../flight_modes_mc/hold.html">保持</a></td>
 <td colspan="3">自动</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位（例如GPS）" width="20px" /></a></td>
 <td>无人机悬停在当前 GPS 位置和高度。</td>
</tr>

<tr id="return_mc">
 <td><a href="../flight_modes/return.html">返航</a></td>
 <td colspan="3">自动</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位（例如GPS）" width="20px" /></a></td>
 <td>无人机飞向安全位置的明确路径。 返航取决于参数设置，并且可遵循任务路径和/或任务着陆模式（如果已定义）。</td>
</tr>


<tr id="mission_mc">
 <td><a href="../flight_modes/mission.html">任务</a></td>
 <td colspan="3">自动</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位（例如GPS）" width="20px" /></a></td>
 <td>飞机执行已上传到飞控的 <a href="../flying/missions.html">预定义的任务或飞行计划</a>。</td>
</tr>

<tr id="followme_mc">
 <td><a href="../flight_modes_mc/follow_me.html">跟随</a></td>
 <td colspan="3">自动</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位（例如GPS）" width="20px" /></a></td>
 <td>飞机自动跟随运行 QGC 的安卓手机/平板电脑的用户。</td>
</tr>

<tr id="offboard_mc">
 <td><a href="../flight_modes/offboard.html">Offboard</a></td>
 <td colspan="3">自动</td>
 <td><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位（例如GPS）" width="20px" /></a></td>
 <td>无人机遵守通过 MAVLink 提供的位置，速度或姿态设定点（通常是通过串口或 wifi 连接的机载计算机）。</td>
</tr>
 
</tbody></table>

## 垂直起降（VTOL）

VTOL飞机支持固定翼和多旋翼模式，根据当前飞行模式（多旋翼或固定翼）执行这些模式。

VTOL 在两种配置中均支持 [外部](../flight_modes/offboard.md) 模式。


## 关键字

理解该表的关键如下所示：

| 符号                                                                                                                                                                                                                                                                                                                                                        | 参数描述                                                         |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| M                                                                                                                                                                                                                                                                                                                                                         | 通过遥控摇杆手动控制。 RC input is sent directly to control allocation. |
| S                                                                                                                                                                                                                                                                                                                                                         | 自动驾驶仪协助稳定姿态。 遥控输入是必需的。 遥控摇杆的位置映射到机体的对应方向姿态角度。                |
| S<sub>rate</sub>                                                                                                                                                                                                                                                                                                                                          | 自动驾驶辅助稳定姿态变化率。 遥控输入是必需的。 摇杆的位置与飞机在该方向上的角速度相对应。               |
| S<sup>+</sup>                                                                                                                                                                                                                                                                                                                                             | 在自动驾驶仪的辅助帮助下可以保持位置或高度来抗风。 遥控输入是必需的。                          |
| 自动                                                                                                                                                                                                                                                                                                                                                        | 该模式是自动控制的（默认情况下禁用遥控控制，除非更改模式）。                               |
| <a id="key_position_fixed"></a><img src="../../assets/site/position_fixed.svg" title="需要定位（例如GPS）" width="20px" />                                                                                                                                                                                                                             | 测量位置高度所需要的传感器，例如光流、GPS + 气压计、视觉惯性里程计(VIO)。                   |
| <a id="altitude_only"></a><img src="../../assets/site/altitude_icon.svg" title="需要定高（例如气压计、测距仪）" width="20px" />                                                                                                                                                                                                                          | 测量所需高度的传感器，例如气压计、测距仪。                                        |
| <a id="key_difficulty"></a>[<img src="../../assets/site/difficulty_easy.png" title="易于飞行" width="20px" />&nbsp;<img src="../../assets/site/difficulty_medium.png" title="中等飞行难度" width="20px" />&nbsp;<img src="../../assets/site/difficulty_hard.png" title="飞行难度：困难" width="20px" />](#key_difficulty) | 飞行模式难度（简单/中等/困难）。                                            |


缩写：
  * RPY: 横滚、俯仰、偏航
  * RPT：横滚、俯仰、油门
