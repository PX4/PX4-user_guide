# PX4 飞行模式总览

飞行模式定义了自驾仪如何响应遥控输入，以及它如何在全自主飞行期间管理飞行器运动。

这些模式为用户（飞行员）提供不同类型／级别的自动驾驶辅助，包括从起飞和着陆等常见任务的自动化，到更容易重新获得水平飞行及将飞行器保持在固定路径或位置的机制，等等。

这一主题概述了可用的飞行模式，以及多旋翼飞行器（MC）、固定翼（FW）和 VTOL 默认行为中的（大部分情况下很小）差异。

:::tip
关于特定飞行模式的详细信息，请参考 [飞行 > 飞行模式](../flight_modes/README.md)。
:::

## 飞行模式切换

飞行员可以使用遥控上的开关或地面站来切换飞行模式（见 [飞行模式配置](../config/flight_mode.md)）。

并非所有飞行器都可以使用所有飞行模式，并且某些模式在不同飞行器类型上表现不同。

一些飞行模式仅在飞行前和飞行中某些特定条件下起作用（如 GPS 锁定，空速传感器，某个轴的姿态感测）。 除非满足合适的条件，否则 PX4 不会允许切换到这些模式。

最后, 当多旋翼飞行在[自动模式](#categories)下， RC摇杆的动作会[默认](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) 地将无人机切到 [Position 模式](../flight_modes/position_mc.md) ，(除非是正在处理电池失效保护)。 固定翼会忽视摇杆的动作。

<span id="categories"></span>

## 自主和手动模式

飞行模式一般来说分为 *手动* 或 *自主*。 手动模式是用户通过 RC 控制杆（或操纵杆）控制飞行器运动的模式，然而 *自主*模式完全由自驾仪控制，并且*不需要*飞手／遥控输入。

:::tip
某些手动模式可能具有自驾辅助机制，以便更容易获得或恢复受控飞行。 如当遥控摇杆居中时，大部分飞行模式将使飞行器水平。
:::

手动模式可以进一步分为 “简单” 和 ”特技“ 模式。 在简单模式中，滚转和俯仰摇杆设定飞行器角度，这将会分别导致*水平面上*的左右和前后运动。 这将不仅可以使运动变得可预测，而且因为角度受控，飞行器无法翻转。 在特技模式中，RC 摇杆控制角度旋转的速率（绕相应轴）。 飞行器可以翻转，虽然机动性更强，但更难飞行。

固定翼:

* 手动－简单： [位置](#position_fw), [高度](#altitude_fw), [自稳](#stabilized_fw), [手动](#manual_fw)
* 手动－特技：[特技](#acro_fw)
* 自主: [Hold](#hold_fw), [Return](#return_fw), [Mission](#mission_fw), [Takeoff](#takeoff_fw), [Land](#land_fw), [Offboard](#offboard_fw)

多旋翼:

* 手动－简单： [Position](#position_mc), [Altitude](#altitude_mc), [Manual/Stabilized](#manual_stabilized_mc), [Orbit](#orbit_mc)
* 手动－特技： [半姿态](#rattitude_mc), [特技](#acro_mc)
* 自主：[保持](#hold_mc), [返航](#return_mc), [任务](#mission_mc), [起飞](#takeoff_mc), [降落](#land_mc), [跟随我](#followme_mc), [Offboard](#offboard_mc)

## 键

本文档中使用下列的图标：<span id="key_manual"><a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" /></a></td> 

<td>
  手动模式 需要遥控
</td></tr> 

<tr>
  <td>
    <span id="key_automatic"><a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="自动模式" width="30px" /></a></td> 
    
    <td>
      自动模式. 除非切换模式，否则 RC 控制被默认失能。
    </td></tr> 
    
    <tr>
      <td>
        <span id="key_position_fixed"><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" /></a></td> 
        
        <td>
          需要定位（如 GPS，VIO， 或其它定位系统）。
        </td></tr> 
        
        <tr>
          <td>
            <span id="altitude_only"></span><img src="../../assets/site/altitude_icon.svg" title="需要高度修复（例如气压计、测距仪）" width="30px" />
          </td>
          
          <td>
            需要高度（如来自气压计、测距仪）。
          </td>
        </tr>
        
        <tr>
          <td>
            <span id="key_difficulty"><a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="易于使用" width="30px" />&nbsp;<img src="../../assets/site/difficulty_medium.png" title="中等飞行难度" width="30px" />&nbsp;<img src="../../assets/site/difficulty_hard.png" title="很难飞" width="30px" /></a></td> 
            
            <td>
              飞行模式难度（简单到困难）
            </td></tr> </tbody> </table> 
            
            <p>
              

<span id="mc_flight_modes"></span>

            </p>
            
            <h2>
              多旋翼
            </h2>
            
            <p>
              

<span id="position_mc"></span>

            </p>
            
            <h3>
              位置模式
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="30px" /></a>&nbsp;<a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/position_mc.md">位置模式</a>是一种易于操控的遥控模式，其中横滚和俯仰摇杆控制左右和前后方向（相对于无人机的“前面”）对地速度，油门控制上升-下降的速度。 当摇杆释放/居中时，无人机将主动制动，保持水平，并锁定到 3D 空间中的位置 — 补偿风和其他力。
            </p>
            
            <p>
:::tip
位置模式对于新手是最安全的手动模式。 与 <a href="#altitude_mc">高度</a> 和 <a href="#manual_stabilized_mc">手动/自稳</a> 模式不同，当摇杆居中时，飞行器将会制动，而不是继续运动直到风阻使其减速。
:::
            </p>
            
            <p>
              <img src="../../assets/flight_modes/position_MC.png" alt="MC Position Mode" />
            </p>
            
            <p>
              

<span id="altitude_mc"></span>

            </p>
            
            <h3>
              高度模式
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="30px" /></a>&nbsp;<a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" /></a>&nbsp;<a href="#altitude_only"><img src="../../assets/site/altitude_icon.svg" title="Altitude required (e.g. Baro, Rangefinder)" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/altitude_mc.md">高度模式</a>是一个 <em>相对</em> 容易飞行的 RC 模式，其中滚转和俯仰摇杆控制飞行器在左右和前后方向（相对飞行器的”前面“）的运动，偏航摇杆控制水平面的旋转速率，油门摇杆控制升降的速度。
            </p>
            
            <p>
              当杆被释放/回中时，飞机将恢复水平并保持当前的<em>高度</em>。 如果在水平面上运动，飞机将继持续运动直到任何动量被风阻力消散。 如果刮风，飞机会向风的方向漂移。
            </p>
            
            <p>
:::tip
<em>高度模式</em>是对新手来说最安全的无 GPS 手动模式。 它就像 <a href="#manual_stabilized_mc">手动/自稳</a> 模式，但在释放摇杆时还额外可以稳定飞行器高度。
:::
            </p>
            
            <p>
              <img src="../../assets/flight_modes/altitude_MC.png" alt="MC Altitude Mode" />
            </p>
            
            <p>
              

<span id="manual_stabilized_mc"></span>

            </p>
            
            <h3>
              手动／自稳模式
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_medium.png" title="Medium difficulty to fly" width="30px" /></a>&nbsp;<a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" /></a>&nbsp;
            </p>
            
            <p>
              <a href="../flight_modes/manual_stabilized_mc.md">手动/自稳</a> 模式在 RC 摇杆居中时稳定多旋翼飞行器。 要手动飞无人机，您可以移动摇杆使其偏离居中位置。
            </p>
            
            <p>
:::note
如果为 MC 飞行器设置 <em>手动</em>　或 <em>自稳</em>　模式，则启用此多旋翼模式。
:::
            </p>
            
            <p>
              当在手动控制下，滚转和俯仰摇杆控制飞行器角度（姿态），偏航摇杆控制水平面内的旋转速率，油门摇杆控制高度／速度。
            </p>
            
            <p>
              一旦释放摇杆，它们将会返回中心死区。 一旦滚转和俯仰杆居中，多旋翼飞行器将平稳并停止运动。 假如被合适的平衡，油门被合适的设定，并且没有施加外部力（如风），飞行器将会悬停在适当位置／保持高度。 飞行器将朝着任何风的方向漂移，你必须控制油门以保持高度。
            </p>
            
            <p>
              <img src="../../assets/flight_modes/manual_stabilized_MC.png" alt="MC Manual Flight" />
            </p>
            
            <p>
              

<span id="rattitude_mc"></span>

            </p>
            
            <h3>
              半自稳
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_hard.png" title="Hard to fly" width="30px" /></a>&nbsp;<a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" /></a>&nbsp;
            </p>
            
            <p>
              <a href="../flight_modes/rattitude_mc.md">半自稳模式</a> 允许飞行员在大多数时间使用<a href="#manual_stabilized_mc">手动/自稳</a>飞行，但在需要时仍然可以执行 <a href="#acro_mc">特技模式</a>式的翻转和其它技巧。
            </p>
            
            <p>
              当滚转/俯仰操纵杆在中心区域内移动时，飞机表现为<em>手动/自稳模式</em>，当杆在外圆周移动时，车辆表现为<em> 特技模式</em> （默认情况下，手动/自稳模式占据杆行程的约80％）。 当操纵杆回中时，多旋翼飞行器将会改平（但仍然会在任何风的方向上漂移并且具有任何预先存在的动量）。
            </p>
            
            <!-- Image missing: https://github.com/PX4/px4_user_guide/issues/189 -->
            
            <p>
              

<span id="acro_mc"></span>

            </p>
            
            <h3>
              特技模式
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_hard.png" title="Hard to fly" width="30px" /></a>&nbsp;<a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" /></a>&nbsp;
            </p>
            
            <p>
              <a href="../flight_modes/acro_mc.md">特技模式</a>是用于执行特技动作的 RC 模式，如滚转和环绕。
            </p>
            
            <p>
              滚动、俯仰和偏航杆控制围绕相应轴的旋转角速率，并且油门直接传递到输出混合器。 当操纵杆居中时，飞机将停止旋转，但保持其当前朝向（在其侧面，倒置或任何其他方向）并根据当前动量移动。
            </p>
            
            <p>
              <img src="../../assets/flight_modes/manual_acrobatic_MC.png" alt="MC Manual Acrobatic Flight" />
            </p>
            
            <!-- image above incorrect: https://github.com/PX4/px4_user_guide/issues/182 -->
            
            <p>
              

<span id="orbit_mc"></span>

            </p>
            
            <h3>
              环绕模式
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/orbit.md">环绕模式</a> 控制多旋翼无人机（或者 多旋翼模式下的 VTOL）绕圈飞行，航向始终朝向中心。
            </p>
            
            <p>
              <em>需要</em> GCS来使能这个模式, 设置中心位置和环绕的半径. 默认情况下，飞行器将沿顺时针方向围绕中心位置(1米/秒)缓慢运行。 遥控是可选的，可用于设置环绕高度，半径，速度和方向。
            </p>
            
            <p>
              <img src="../../assets/flight_modes/orbit_MC.png" alt="Orbit Mode - MC" />
            </p>
            
            <p>
              

<span id="hold_mc"></span>

            </p>
            
            <h3>
              保持模式
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/hold.md">保持模式</a>使多旋翼飞行器制动并悬停在其当前位置和高度（保持位置并抵抗风和其它力）。 该模式可用于暂停任务或帮助在紧急情况下重新获得飞行器的控制。 它可以通过预编程的 RC 开关或<em>QGroundControl</em> <strong>Pause</strong> 按钮激活。
            </p>
            
            <p>
              

<span id="return_mc"></span>

            </p>
            
            <h3>
              返航模式
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/return.md">返航模式</a> 使飞行器飞行到安全位置。 该模式可以手动（通过预编程的 RC 开关）或者自动（如<a href="../config/safety.md">故障保护</a>被触发的事件）激活。
            </p>
            
            <p>
              返航取决于参数设置，并且可遵循任务路径和/或任务着陆模式（如果已定义）。 默认情况下，多旋翼会升到一个安全的高度，飞到home点，然后降落。
            </p>
            
            <p>
              

<span id="mission_mc"></span>

            </p>
            
            <h3>
              任务模式
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/mission.md">Mission mode</a> causes the vehicle to execute a predefined autonomous <a href="../flying/missions.md">mission</a> (flight plan) that has been uploaded to the flight controller. The mission is typically created and uploaded with a Ground Control Station (GCS) application.
            </p>
            
            <p>
:::tip
The PX4 GCS is called <a href="https://docs.qgroundcontrol.com/en/">QGroundControl</a>. <em>QGroundControl</em> is the same application we use for <a href="../config/README.md">configuring PX4</a>.
:::
            </p>
            
            <p>
              

<span id="takeoff_mc"></span>

            </p>
            
            <h3>
              起飞模式
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="自动模式" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/takeoff.md">起飞模式</a> 使多旋翼飞行器垂直爬升至起飞高度并悬停。
            </p>
            
            <p>
              

<span id="land_mc"></span>

            </p>
            
            <h3>
              着陆模式
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="自动模式" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/land.md">着陆模式</a> 使多旋翼飞行器降落在模式被启用的位置。
            </p>
            
            <p>
              

<span id="followme_mc"></span>

            </p>
            
            <h3>
              跟随模式
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/follow_me.md">跟随我模式</a>使多旋翼飞行器自动跟踪提供其当前位置设定点的用户。 位置设定点可以来自运行<em>QGroundControl</em> Android 手机/平板或者来自MAVSDK 应用。
            </p>
            
            <p>
              

<span id="offboard_mc"></span>

            </p>
            
            <h3>
              Offboard 模式
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/offboard.md">Offboard 模式</a>使多旋翼飞行器服从 MAVLink 提供的位置，速度或姿态设定值。
            </p>
            
            <p>
:::note
此模式适用于机载计算机和地面站!
:::
            </p>
            
            <p>
              

<span id="fw_flight_modes"></span>

            </p>
            
            <h2>
              固定翼
            </h2>
            
            <p>
              

<span id="position_fw"></span>

            </p>
            
            <h3>
              位置控制模式
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="30px" /></a>&nbsp;<a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/position_fw.md">位置模式</a> 是一种易于飞行的 RC 模式，当摇杆被释放/居中时，飞行器将会保持水平，并在当前方向上以直线地面轨迹飞行-补偿风和其它力。
            </p>
            
            <p>
              油门决定空速（在 50% 油门时，飞机将以预设的巡航速度保持其当前高度）。 俯仰用于爬升或下降。 翻滚、俯仰和偏航是角度控制的（因此不可能实现飞机滚转或环绕）。
            </p>
            
            <p>
:::tip
位置模式对于新手是最安全的固定翼手动模式。
:::
            </p>
            
            <p>
              <img src="../../assets/flight_modes/position_FW.png" alt="FW Position Mode" />
            </p>
            
            <p>
              

<span id="altitude_fw"></span>

            </p>
            
            <h3>
              高度模式
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="30px" /></a>&nbsp;<a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" /></a>&nbsp;<a href="#altitude_only"><img src="../../assets/site/altitude_icon.svg" title="Altitude required (e.g. Barometer, Rangefinder)" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/altitude_fw.md">高度模式</a>使用户更容易控制飞行器高度，特别是达到并保持固定高度。 该模式不会试图抵抗风扰保持航向。
            </p>
            
            <p>
              爬升/下降速率通过俯仰/升降舵杆操纵杆来控制。 操纵杆一旦回中，自动驾驶仪就会锁定当前的高度，并在偏航/滚转和任何空速条件下保持高度。 油门通道输入控制空速。 滚动和俯仰是角度控制的（因此不可能实现飞机滚转或环绕）。
            </p>
            
            <p>
              当所有遥控输入都居中时（无滚动、俯仰、偏航，油门约 50％），飞机将恢复直线水平飞行（受风影响）并保持其当前高度。
            </p>
            
            <p>
:::tip
<em>高度模式 </em>是最安全的非 GPS 引导模式，适合初学者学习如何飞行。 这就像 <a href="#manual_fw">手动</a>模式，但当俯仰摇杆被释放，额外稳定飞行器的高度。
:::
            </p>
            
            <p>
              <img src="../../assets/flight_modes/altitude_FW.png" alt="FW Altitude Mode" />
            </p>
            
            <p>
              

<span id="stabilized_fw"></span>

            </p>
            
            <h3>
              自稳模式
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_medium.png" title="Medium difficulty to fly" width="30px" /></a>&nbsp;<a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" /></a>&nbsp;
            </p>
            
            <p>
              <a href="../flight_modes/stabilized_fw.md">自稳模式</a>在摇杆回中时使车辆进入定直平飞，保持姿态水平并抵抗风（但不包括飞机航向和高度）。
            </p>
            
            <p>
              如果横滚/俯仰摇杆杆不为零，则无人机根据俯仰输入进行爬升/下降并执行协调的转弯。 滚转和俯仰是角度控制的（您不能翻转至倒置或循环）。
            </p>
            
            <p>
:::tip
<em>稳定模式</em>比<a href="#manual_fw">手动模式</a>更容易飞行，因为你不能滚动或翻转飞机，并且通过控制杆回中很容易使飞机保持水平。
:::
            </p>
            
            <p>
              如果油门降至0％（电机停止），飞机将滑行。 为了执行转弯，必须在整个操纵过程中保持命令，因为如果滚动杆被释放，则飞机将停止转动并自行改平（对于俯仰和偏航命令也是如此）。
            </p>
            
            <p>
              <img src="../../assets/flight_modes/manual_stabilized_FW.png" alt="FW Manual Flight" />
            </p>
            
            <p>
              

<span id="acro_fw"></span>

            </p>
            
            <h3>
              特技模式
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_hard.png" title="Hard to fly" width="30px" /></a>&nbsp;<a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" /></a>&nbsp;
            </p>
            
            <p>
              <a href="../flight_modes/acro_fw.md">特技模式</a>是用于执行特技动作的 RC 模式，如连续翻滚，筋斗，失速和其它特技动作。
            </p>
            
            <p>
              滚动、俯仰和偏航杆控制围绕相应轴的旋转角速率，并且油门直接传递到输出混合器。 当操纵杆居中时，飞机将停止旋转，但保持其当前朝向（在其侧面，倒置或任何其他方向）并根据当前动量移动。
            </p>
            
            <p>
              <img src="../../assets/flight_modes/manual_acrobatic_FW.png" alt="FW Manual Acrobatic Flight" />
            </p>
            
            <p>
              

<span id="manual_fw"></span>

            </p>
            
            <h3>
              手动模式
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_hard.png" title="Hard to fly" width="30px" /></a>&nbsp;<a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" /></a>&nbsp;
            </p>
            
            <p>
              <a href="../flight_modes/manual_fw.md">手动模式</a>发送 RC 摇杆输入直接发送到输出混控器，以进行 ”完全“ 手动控制。
            </p>
            
            <p>
:::tip
这是最难飞行的模式，因为什么都不稳定。 与<a href="#acro_fw">特技模式</a>不同，如果 RP 摇杆居中，飞行器将不会自动停止绕轴转动-飞行员实际上必须移动摇杆以向另一个方向施加力。
:::
            </p>
            
            <p>
:::note
这是唯一忽略 FMU（命令通过安全协处理器发送） 的飞行模式。 它提供了一个安全机制，允许在 FMU 固件出现故障时，通过遥控完全控制油门、升降舵、副翼和方向舵。
:::
            </p>
            
            <p>
              

<span id="hold_fw"></span>

            </p>
            
            <h3>
              保持模式
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/hold.md">保持 </a>使固定翼飞行器在当前高度围绕当前位置盘旋。 该模式可用于暂停任务或帮助在紧急情况下重新获得飞行器的控制。 它可以通过预编程的 RC 开关或<em>QGroundControl</em> <strong>Pause</strong> 按钮激活。
            </p>
            
            <p>
              

<span id="return_fw"></span>

            </p>
            
            <h3>
              返航模式
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/return.md">返航模式</a> 使飞行器飞行到安全位置。 该模式可以手动（通过预编程的 RC 开关）或者自动（如<a href="../config/safety.md">故障保护</a>被触发的事件）激活。
            </p>
            
            <p>
              返航取决于参数设置，并且可遵循任务路径和/或任务着陆模式（如果已定义）。 默认情况下，固定翼将升至安全高度，如果有，则使用任务着陆模式， 否则它将飞到家的位置并开始环绕。
            </p>
            
            <p>
              

<span id="mission_fw"></span>

            </p>
            
            <h3>
              任务模式
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/mission.md">任务模式</a>使飞行器执行上传到飞行控制器的预定义自主<a href="../flying/missions.md">任务</a> (飞行规划) 。 通常使用地面站(GCS) 来创建和上传任务。
            </p>
            
            <p>
              :::tip PX4 GCS 叫做<a href="https://docs.qgroundcontrol.com/en/">QGroundControl</a>. 我们同样使用<em>QGroundControl</em>来配置 PX4。
:::
            </p>
            
            <p>
              

<span id="takeoff_fw"></span>

            </p>
            
            <h3>
              起飞模式
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /></a>&nbsp;
            </p>
            
            <p>
              <a href="../flight_modes/takeoff.md#fixed_wing">起飞 </a>模式启动飞行器起飞序列。 具体的起飞行为取决于被配置的起飞模式（弹射/手抛模式或跑道起飞模式）。
            </p>
            
            <p>
              

<span id="land_fw"></span>

            </p>
            
            <h3>
              着陆模式
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /></a>&nbsp;
            </p>
            
            <p>
              <a href="../flight_modes/land.md">着陆模式</a> 使飞行器转弯并降落在该模式启动的位置。 固定机翼着陆逻辑和参数在主题：<a href="../flying/fixed_wing_landing.md">着陆（固定翼）</a>中解释。
            </p>
            
            <p>
              

<span id="offboard_fw"></span>

            </p>
            
            <h3>
              Offboard 模式
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/offboard.md">Offboard 模式</a>使固定翼飞行器服从 MAVLink 提供的位置，速度或姿态设定值。
            </p>
            
            <p>
:::note
此模式适用于机载计算机和地面站!
:::
            </p>
            
            <h2>
              垂直起降（VTOL）
            </h2>
            
            <p>
              VTOL 飞行器可以作为多旋翼飞行器或固定翼飞行器飞行。 多旋翼飞行模式主要用于起飞和着陆，而固定翼模式用于高效运动和/或执行任务。
            </p>
            
            <p>
              通常，VTOL 飞行器的飞行模式，在 MC 模式下飞行时和<a href="#mc_flight_modes">多旋翼 </a>相同 ，在固定翼模式飞行时和 <a href="#fw_flight_modes">固定翼 </a>相同。
            </p>
            
            <p>
              模式之间的切换由飞行员使用 RC 开关启动，或自主模式下在需要时自动启动。
            </p>
            
            <p>
              一些注释：
            </p>
            
            <ul>
              <li>
                VTOL <a href="../flight_modes/return.md">Return mode</a> uses a mission landing by default, if defined.
              </li>
            </ul>
            
            <h2>
              更多信息
            </h2>
            
            <ul>
              <li>
                <a href="../flight_modes/README.md">飞行> 飞行模式 </a> - 所有模式的详细技术说明。
              </li>
              <li>
                <a href="../config/flight_mode.md">基本配置 > 飞行模式 </a> - 如何将 RC 控制开关映射到特定飞行模式。
              </li>
            </ul>