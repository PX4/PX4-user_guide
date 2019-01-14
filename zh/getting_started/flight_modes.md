# PX4 飞行模式概述

> **Warning** 该主题正在建设中。 它尚未完整，尚未经过全面审核。

飞行模式定义了自驾仪如何响应遥控输入，以及它如何在全自主飞行期间管理飞行器运动。

这些模式为用户（飞行员）提供不同类型／级别的自动驾驶辅助，包括从起飞和着陆等常见任务的自动化，到更容易重新获得水平飞行及将飞行器保持在固定路径或位置的机制，等等。

这一主题概述了可用的飞行模式，以及多旋翼飞行器（MC）、固定翼（FW）和 VTOL 默认行为中的（大部分情况下很小）差异。

> **Tip**关于特定飞行模式的详细信息，请参考 [飞行 > 飞行模式](../flight_modes/README.md)。

## 飞行模式切换

飞行员可以使用遥控上的开关或地面站来切换飞行模式（见 [飞行模式配置](../config/flight_mode.md)）。

并非所有飞行器都可以使用所有飞行模式，并且某些模式在不同飞行器类型上表现不同。

一些飞行模式仅在飞行前和飞行中某些特定条件下起作用（如 GPS 锁定，空速传感器，某个轴的姿态感测）。 除非满足合适的条件，否则 PX4 不会允许切换到这些模式。

## 自主和手动模式 {#categories}

飞行模式可以是 *手动的* 或 *自主的*。 手动模式是用户通过 RC 控制杆（或操纵杆）控制飞行器运动的模式，然而 *自主*模式完全由自驾仪控制，并且不需要驾驶员／遥控输入。

> **Tip**某些手动模式可能具有自驾辅助机制，以便更容易获得或恢复受控飞行。 如当 RC 摇杆居中时，大部分飞行模式将使飞行器水平。

手动模式可以进一步分为 “简单” 和 ”特技“ 模式。 在简单模式中，滚转和俯仰摇杆设定飞行器角度，这将会分别导致*水平面上*的左右和前后运动。 这将不仅可以使运动变得可预测，而且因为角度受控，飞行器无法翻转。 在特技模式中，RC 摇杆控制角度旋转的速率（绕相应轴）。 飞行器可以翻转，虽然机动性更强，但更难飞行。

固定翼:

* 手动－简单： [位置](#position_fw), [高度](#altitude_fw), [自稳](#stabilized_fw), [手动](#manual_fw)
* 手动－特技：[特技](#acro_fw)
* 自主：[保持](#hold_fw), [返航](#return_fw), [任务](#mission_fw), [起飞](#takeoff_fw), [降落](#land_fw)

多旋翼:

* 手动-简单： [位置](#position_mc), [高度](#altitude_mc), [手动/自稳](#manual_stabilized_mc)
* 手动-特技： [半自动](#rattitude_mc), [特技](#acro_mc)
* 自主：[保持](#hold_mc), [返航](#return_mc), [任务](#mission_mc), [起飞](#takeoff_mc), [降落](#land_mc), [跟随我](#followme_mc), [板外](#offboard_mc)

## 键

本文档中使用下列的图标在<span id="key_manual"><a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" /></a></td> 

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
            
            <h2 id="mc_flight_modes">
              多旋翼
            </h2>
            
            <h3 id="position_mc">
              位置控制模式
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="易于使用" width="30px" /></a>&nbsp;<a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/position_mc.md">位置模式</a> 是一种容易飞行的 RC 模式，其中滚转和俯仰摇杆在左右和前后方向控制相对地面的速度。 当摇杆被释放／居中时，车辆将主动制动，保持水平，并锁定到 3D 空间的某个位置-消除风和其它力的影响。
            </p>
            
            <blockquote>
              <p>
                <strong>Tip</strong>位置模式是新飞手最安全的手动模式。 与 <a href="#altitude_mc">高度</a> 和 <a href="#manual_stabilized_mc">手动/自稳</a> 模式不同，当摇杆居中时，飞行器将会制动，而不是继续运动直到风阻使其减速。
              </p>
            </blockquote>
            
            <p>
              <img src="../../images/flight_modes/position_MC.png" alt="MC Position Mode" />
            </p>
            
            <h3 id="altitude_mc">
              高度模式
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="易于使用" width="30px" /></a>&nbsp;<a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" /></a>&nbsp;<a href="#altitude_only"><img src="../../assets/site/altitude_icon.svg" title="所需高度（例如巴罗、测距仪）" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/altitude_mc.md">高度模式</a>是一个 <em>相对</em> 容易飞行的 RC 模式，其中滚转和俯仰摇杆控制飞行器在左右和前后方向（相对飞行器的”前面“）的运动，偏航摇杆控制水平面的旋转速率，油门摇杆控制升降的速度。
            </p>
            
            <p>
              当杆被释放/回中时，飞机将恢复水平并保持当前的<em>高度</em>。 如果在水平面上运动，飞机将继持续运动直到任何动量被风阻力消散。 如果刮风，飞机会向风的方向漂移。
            </p>
            
            <blockquote>
              <p>
                <strong>Tip</strong><em>高度模式</em> 是新飞手在没有 GPS 的手动模式中最安全的模式。 它就像 <a href="#manual_stabilized_mc">手动/自稳</a> 模式，但在释放摇杆时还额外可以稳定飞行器高度。
              </p>
            </blockquote>
            
            <p>
              <img src="../../images/flight_modes/altitude_MC.png" alt="MC Altitude Mode" />
            </p>
            
            <h3 id="manual_stabilized_mc">
              手动／自稳模式
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_medium.png" title="中等飞行难度" width="30px" /></a>&nbsp;<a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" /></a>&nbsp;
            </p>
            
            <p>
              <a href="../flight_modes/manual_stabilized_mc.md">手动/自稳</a> 模式在 RC 摇杆居中时稳定多旋翼飞行器。 要手动移动／飞行飞行器，您可以拨动摇杆离开中心。
            </p>
            
            <blockquote>
              <p>
                <strong>Note</strong>如果为 MC 飞行器设置 <em>手动</em>　或 <em>自稳</em>　模式，则启用此多旋翼模式。
              </p>
            </blockquote>
            
            <p>
              当在手动控制下，滚转和俯仰摇杆控制飞行器角度（姿态），偏航摇杆控制水平面内的旋转速率，油门摇杆控制高度／速度。
            </p>
            
            <p>
              一旦释放摇杆，它们将会返回中心死区。 一旦滚转和俯仰摇杆居中，多旋翼飞行器将会水平并停止。 假如被合适的平衡，油门被合适的设定，并且没有施加外部力（如风），飞行器将会悬停在适当位置／保持高度。 飞行器将会朝着风的方向飘移，并且必须控制油门以保持高度。
            </p>
            
            <p>
              <img src="../../images/flight_modes/manual_stabilized_MC.png" alt="MC Manual Flight" />
            </p>
            
            <h3 id="rattitude_mc">
              半自稳
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_hard.png" title="很难飞" width="30px" /></a>&nbsp;<a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" /></a>&nbsp;
            </p>
            
            <p>
              <a href="../flight_modes/rattitude_mc.md">半自稳模式</a> 允许飞行员在大多数时间使用<a href="#manual_stabilized_mc">手动/自稳</a>飞行，但在需要时仍然可以执行 <a href="#acro_mc">特技模式</a>式的翻转和其它技巧。
            </p>
            
            <p>
              当滚转／俯仰摇杆在中心区域移动时，飞行器表现为 <em>手动/自稳 模式</em>；当摇杆在外围区域移动时，飞行器表现为特技模式（默认情况下，手动／自稳模式占据摇杆范围的 80%）。 当摇杆居中时，多旋翼飞行器将会水平（但是仍然在会在风和预先存在的动量方向上漂移）。
            </p>
            
            <!-- Image missing: https://github.com/PX4/px4_user_guide/issues/189 -->
            
            <h3 id="acro_mc">
              特技模式
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_hard.png" title="很难飞" width="30px" /></a>&nbsp;<a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" /></a>&nbsp;
            </p>
            
            <p>
              <a href="../flight_modes/acro_mc.md">特技模式</a>是用于执行特技动作的 RC 模式，如滚转和环绕。
            </p>
            
            <p>
              滚转、俯仰和偏航杆控制绕相应轴的旋转角速率，并且油门直接传递到输出混控器。 当操纵杆居中时，飞机将停止旋转，但保持其当前朝向（在其侧面，倒置或任何其他方向）并根据当前动量移动。
            </p>
            
            <p>
              <img src="../../images/flight_modes/manual_acrobatic_MC.png" alt="手动特技飞行" />
            </p>
            
            <!-- image above incorrect: https://github.com/PX4/px4_user_guide/issues/182 -->
            
            <h3 id="hold_mc">
              保持模式
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="自动模式" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/hold.md">保持模式</a>使多旋翼飞行器制动并悬停在其当前位置和高度（保持位置并抵抗风和其它力）。 该模式可用于暂停任务或帮助在紧急情况下重新获得飞行器的控制。 它可以使用预编程的 RC 开关或 QGroundControl 的 Pause 暂停按钮来激活。
            </p>
            
            <h3 id="return_mc">
              返航模式
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="自动模式" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/return.md">返航模式</a> 使飞行器（在安全高度）返回其原始位置并着陆。 该模式可手动（通过预编程的 RC 开关）或自动（如在 failsafe 被触发的事件中）激活。
            </p>
            
            <h3 id="mission_mc">
              任务模式
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="自动模式" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/mission.md">任务模式</a>使飞行器执行上传到飞行控制器的预定义自主<a href="../flying/missions.md">任务</a> (飞行规划) 。 通常使用地面站(GCS) 来创建和上传任务。
            </p>
            
            <blockquote>
              <p>
                <strong>Tip</strong> PX4 GCS 称为 <a href="https://docs.qgroundcontrol.com/en/">QGroundControl</a>。 <em>QGroundControl</em>是我们用来 <a href="../config/README.md">配置 PX4</a>的相同的应用程序。
              </p>
            </blockquote>
            
            <h3 id="takeoff_mc">
              起飞模式
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="自动模式" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/takeoff.md">起飞</a> 模式使多旋翼飞行器垂直爬升至起飞高度并悬停在适当位置。
            </p>
            
            <h3 id="land_mc">
              着陆模式
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="自动模式" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/land.md">着陆模式</a> 使多旋翼飞行器降落在模式被启用的位置。
            </p>
            
            <h3 id="followme_mc">
              跟随我模式
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="自动模式" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/follow_me.md">跟随我模式</a>使多旋翼飞行器自动跟踪提供其当前位置设定点的用户。 位置设定点可以来自运行<em>QGroundControl</em> Android 手机/平板或者来自Dronecode SDK 应用。
            </p>
            
            <h3 id="offboard_mc">
              Offboard模式
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="自动模式" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/offboard.md">Offboard 模式</a>使多旋翼飞行器服从 MAVLink 提供的位置，速度或姿态设定值。
            </p>
            
            <blockquote>
              <p>
                <strong>Note</strong> 此模式适用于机载计算机和地面站。
              </p>
            </blockquote>
            
            <h2 id="fw_flight_modes">
              固定翼
            </h2>
            
            <h3 id="position_fw">
              位置模式
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="易于使用" width="30px" /></a>&nbsp;<a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/position_fw.md">位置模式</a> 是一种易于飞行的 RC 模式，当摇杆被释放/居中时，飞行器将会保持水平，并在当前方向上以直线地面轨迹飞行-补偿风和其它力。
            </p>
            
            <p>
              油门决定空速（在 50% 油门时，飞机将以预设的巡航速度保持其当前高度）。 俯仰被用来升降。 翻滚、俯仰和偏航是角度控制的（因此不可能实现飞机滚转或环绕）。
            </p>
            
            <blockquote>
              <p>
                <strong>Tip</strong>位置模式是新飞手最安全的固定翼手动模式。
              </p>
            </blockquote>
            
            <p>
              <img src="../../images/flight_modes/position_FW.png" alt="FW Position Mode" />
            </p>
            
            <h3 id="altitude_fw">
              高度模式
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="易于使用" width="30px" /></a>&nbsp;<a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" /></a>&nbsp;<a href="#altitude_only"><img src="../../assets/site/altitude_icon.svg" title="Altitude required (e.g. Barometer, Rangefinder)" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/altitude_fw.md">高度模式</a>使用户更容易控制飞行器高度，特别是达到并保持固定高度。 该模式不会试图抵抗风扰保持航向。
            </p>
            
            <p>
              爬升/下降速率通过俯仰/升降舵杆操纵杆来控制。 操纵杆一旦回中，自动驾驶仪就会锁定当前的高度，并在偏航/滚转和任何空速条件下保持高度。 油门通道输入控制空速。 滚动和俯仰是角度控制的（因此不可能实现飞机滚转或环绕）。
            </p>
            
            <p>
              当所有遥控输入都居中时（无滚动、俯仰、偏航，油门约50％），飞机将恢复直线水平飞行（受风影响）并保持其当前高度。
            </p>
            
            <blockquote>
              <p>
                <strong>Tip</strong> <em>高度模式</em> 是最安全的非 GPS 引导模式，适合初学者学习如何飞行。 这就像 <a href="#manual_fw">手动</a>模式，但当俯仰摇杆被释放，额外稳定飞行器的高度。
              </p>
            </blockquote>
            
            <p>
              <img src="../../images/flight_modes/altitude_FW.png" alt="FW Altitude Mode" />
            </p>
            
            <h3 id="stabilized_fw">
              自稳模式
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_medium.png" title="中等飞行难度" width="30px" /></a>&nbsp;<a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" /></a>&nbsp;
            </p>
            
            <p>
              当 RC 摇杆居中时，<a href="../flight_modes/stabilized_fw.md">自稳模式</a>使飞行器进入直线和水平飞行，抵抗风来保持水平姿态（但不包括飞行器航向和高度）。
            </p>
            
            <p>
              飞行器基于俯仰输入进行爬升/下降并在滚转/俯仰摇杆非零时，进行协调转弯。 滚转和俯仰是角度控制的（您不能翻转至倒置或循环）。
            </p>
            
            <blockquote>
              <p>
                <strong>Tip</strong> <em>自稳模式 </em>比 <a href="#manual_fw">手动模式 </a>更容易飞行，因为您不能翻转它，并且很容易通过居中摇杆来使飞行器水平。
              </p>
            </blockquote>
            
            <p>
              如果油门低于 0% （电机停转），飞行器将会滑翔。 为了执行转弯，必须在整个操纵过程中保持命令，因为如果滚转摇杆被释放，飞机将会停止转弯并自行调平（对于俯仰和偏航命令也是如此）。
            </p>
            
            <p>
              <img src="../../images/flight_modes/manual_stabilized_FW.png" alt="FW Manual Flight" />
            </p>
            
            <h3 id="acro_fw">
              特技模式
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_hard.png" title="很难飞" width="30px" /></a>&nbsp;<a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" /></a>&nbsp;
            </p>
            
            <p>
              <a href="../flight_modes/acro_fw.md">特技模式</a>是用于执行特技动作的 RC 模式，如连续翻滚，筋斗，失速和其它特技动作。
            </p>
            
            <p>
              滚转、俯仰和偏航杆控制围绕相应轴的旋转角速率，并且油门直接传递到输出混控器。 当操纵杆居中时，飞机将停止旋转，但保持其当前朝向（在其侧面，倒置或任何其他方向）并根据当前动量移动。
            </p>
            
            <p>
              <img src="../../images/flight_modes/manual_acrobatic_FW.png" alt="固定翼手动特技飞行" />
            </p>
            
            <h3 id="manual_fw">
              手动模式
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_hard.png" title="很难飞" width="30px" /></a>&nbsp;<a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" /></a>&nbsp;
            </p>
            
            <p>
              <a href="../flight_modes/manual_fw.md">手动模式</a>发送 RC 摇杆输入直接发送到输出混控器，以进行 ”完全“ 手动控制。
            </p>
            
            <blockquote>
              <p>
                <strong>Tip</strong>这是最难飞行的模式，因为没有什么是稳定的。 与<a href="#acro_fw">特技模式</a>不同，如果 RP 摇杆居中，飞行器将不会自动停止绕轴转动-飞行员实际上必须移动摇杆以向另一个方向施加力。
              </p>
            </blockquote>
            
            <p>
              

<span></span>

            </p>
            
            <blockquote>
              <p>
                <strong>Note</strong> 这是唯一忽略 FMU 的模式（即命令通过安全协处理器发送）。 它提供了一个安全机制，允许在 FMU 固件出现故障时，通过遥控完全控制油门、升降舵、副翼和方向舵。
              </p>
            </blockquote>
            
            <h3 id="hold_fw">
              保持模式
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="自动模式" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/hold.md">保持 </a>使固定翼飞行器在当前高度围绕当前位置盘旋。 该模式可用于暂停任务或帮助在紧急情况下重新获得对飞行器的控制。 它可以通过预编程的 RC 开关或<em>QGroundControl</em> <strong>Pause</strong> 按钮激活。
            </p>
            
            <h3 id="return_fw">
              返航模式
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="自动模式" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/return.md">返航模式</a>使飞行器（在安全高度）飞回其原始位置并在其上方环绕。 该模式可以手动（通过预编程的 RC 开关）或者自动（如故障保护被触发的事件）激活。
            </p>
            
            <h3 id="mission_fw">
              任务模式
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="自动模式" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/mission.md">任务模式</a> 使飞行器执行已经上传到飞行控制器的预定义自主<a href="../flying/missions.md">任务 </a>（飞行规划）。 通常使用地面站 (GCS) 来创建和上传任务。
            </p>
            
            <blockquote>
              <p>
                <strong>Tip</strong> PX4 GCS 称为 <a href="https://docs.qgroundcontrol.com/en/">QGroundControl</a>。 我们同样使用<em>QGroundControl</em>来配置 PX4。
              </p>
            </blockquote>
            
            <h3 id="takeoff_fw">
              起飞模式
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="自动模式" width="30px" /></a>&nbsp;
            </p>
            
            <p>
              <a href="../flight_modes/takeoff.md#fixed_wing">起飞 </a>模式启动飞行器起飞序列。 具体的起飞行为取决于被配置的起飞模式（弹射/手抛模式或跑道起飞模式）。
            </p>
            
            <h3 id="land_fw">
              着陆模式
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="自动模式" width="30px" /></a>&nbsp;
            </p>
            
            <p>
              <a href="../flight_modes/land.md">着陆模式</a> 使飞行器转弯并降落在该模式启动的位置。 这个主题解释了固定翼着陆逻辑和参数： <a href="../flying/fixed_wing_landing.md">着陆 (固定翼)</a>。
            </p>
            
            <h2>
              垂直起降（VTOL）
            </h2>
            
            <p>
              VTOL 飞行器可以作为多旋翼飞行器或固定翼飞行器飞行。 多旋翼飞行模式主要用于起飞和着陆，而固定翼模式用于高效运动和/或执行任务。
            </p>
            
            <p>
              Generally the flight modes for VTOL vehicles are the same as for <a href="#mc_flight_modes">multicopter</a> when flying in MC mode and <a href="#fw_flight_modes">fixed-wing</a> when flying in FW mode.
            </p>
            
            <p>
              The switch between modes is initiated either by the pilot using an RC switch or automatically by PX4 when needed in the Auto modes.
            </p>
            
            <h2>
              更多信息
            </h2>
            
            <ul>
              <li>
                <a href="../flight_modes/README.md">Flying > Flight Modes</a> - Detailed technical explanation of all modes
              </li>
              <li>
                <a href="../config/flight_mode.md">Basic Configuration > Flight Modes</a> - How to map RC control switches to specific flight modes
              </li>
            </ul>