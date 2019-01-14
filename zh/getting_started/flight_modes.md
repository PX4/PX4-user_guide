# PX4 飞行模式概述

> **Warning** 该主题正在建设中。 它尚未完整，尚未经过全面审核。

飞行模式定义了自驾仪如何响应遥控输入，以及在完全自主飞行期间管理飞行器运动。

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
* 手动-特技： [半自稳](#rattitude_mc), [特技](#acro_mc)
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
              一旦释放摇杆，它们将会返回中心死区。 一旦滚转和俯仰摇杆居中，多旋翼飞行器将会水平并停止。 假如被合适的平衡，油门被合适的设定，并且没有施加外部力（如风），飞行器将会悬停在适当位置／保持高度。 The craft will drift in the direction of any wind and you have to control the throttle to hold altitude.
            </p>
            
            <p>
              <img src="../../images/flight_modes/manual_stabilized_MC.png" alt="MC Manual Flight" />
            </p>
            
            <h3 id="rattitude_mc">
              Rattitude
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_hard.png" title="很难飞" width="30px" /></a>&nbsp;<a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" /></a>&nbsp;
            </p>
            
            <p>
              <a href="../flight_modes/rattitude_mc.md">Rattitude mode</a> allows pilots to fly using <a href="#manual_stabilized_mc">Manual/Stabilized</a> flight most of the time, but still perform <a href="#acro_mc">Acro mode</a>-style flips and tricks when desired.
            </p>
            
            <p>
              The vehicle behaves as in <em>Manual/Stabilized mode</em> when the Roll/Pitch stick is moved within the central area and like <em>Acro mode</em> when the stick is moved in the outer circumference (by default Manual/Stabilized mode occupies about 80% of the range). When the sticks are centered the multicopter will level out (but will still drift in the direction of any wind and with any pre-existing momentum).
            </p>
            
            <!-- Image missing: https://github.com/PX4/px4_user_guide/issues/189 -->
            
            <h3 id="acro_mc">
              Acro Mode
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_hard.png" title="很难飞" width="30px" /></a>&nbsp;<a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" /></a>&nbsp;
            </p>
            
            <p>
              <a href="../flight_modes/acro_mc.md">Acro mode</a> is the RC mode for performing acrobatic maneuvers e.g. rolls and loops.
            </p>
            
            <p>
              滚动、俯仰和偏航杆控制围绕相应轴的旋转角速率，并且油门直接传递到输出混合器。 当操纵杆居中时，飞机将停止旋转，但保持其当前朝向（在其侧面，倒置或任何其他方向）并根据当前动量移动。
            </p>
            
            <p>
              <img src="../../images/flight_modes/manual_acrobatic_MC.png" alt="手动特技飞行" />
            </p>
            
            <!-- image above incorrect: https://github.com/PX4/px4_user_guide/issues/182 -->
            
            <h3 id="hold_mc">
              Hold Mode
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="自动模式" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/hold.md">Hold mode</a> causes the multicopter to stop and hover at its current position and altitude (maintaining position against wind and other forces). The mode can be used to pause a mission or to help regain control of a vehicle in an emergency. It can be activated with a pre-programmed RC switch or the <em>QGroundControl</em> <strong>Pause</strong> button.
            </p>
            
            <h3 id="return_mc">
              Return Mode
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="自动模式" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/return.md">Return mode</a> causes the vehicle to return (at a safe height) to its home position and land. The mode may be activated manually (via a pre-programmed RC switch) or automatically (i.e. in the event of a failsafe being triggered).
            </p>
            
            <h3 id="mission_mc">
              Mission Mode
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="自动模式" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/mission.md">Mission mode</a> causes the vehicle to execute a predefined autonomous <a href="../flying/missions.md">mission</a> (flight plan) that has been uploaded to the flight controller. The mission is typically created and uploaded with a Ground Control Station (GCS) application.
            </p>
            
            <blockquote>
              <p>
                <strong>Tip</strong> The PX4 GCS is called <a href="https://docs.qgroundcontrol.com/en/">QGroundControl</a>. <em>QGroundControl</em> is the same application we use for <a href="../config/README.md">configuring PX4</a>.
              </p>
            </blockquote>
            
            <h3 id="takeoff_mc">
              Takeoff Mode
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="自动模式" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/takeoff.md">Takeoff</a> mode causes the multicopter to climb vertically to takeoff altitude and hover in position.
            </p>
            
            <h3 id="land_mc">
              Land Mode
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="自动模式" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/land.md">Land mode</a> causes the multicopter to land at the location at which the mode was engaged.
            </p>
            
            <h3 id="followme_mc">
              Follow Me Mode
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="自动模式" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/follow_me.md">Follow Me mode</a> causes a multicopter to autonomously follow and track a user providing their current position setpoint. Position setpoints might come from an Android phone/tablet running <em>QGroundControl</em> or from a Dronecode SDK app.
            </p>
            
            <h3 id="offboard_mc">
              Offboard模式
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="自动模式" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/offboard.md">Offboard mode</a> causes the multicopter to obey a position, velocity or attitude setpoint provided over MAVLink.
            </p>
            
            <blockquote>
              <p>
                <strong>Note</strong> This mode is intended for companion computers and ground stations!
              </p>
            </blockquote>
            
            <h2 id="fw_flight_modes">
              Fixed-Wing
            </h2>
            
            <h3 id="position_fw">
              位置控制模式
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="易于使用" width="30px" /></a>&nbsp;<a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/position_fw.md">Position mode</a> is an easy-to-fly RC mode in which, when the sticks are released/centered, the vehicle will level and fly a straight line ground track in the current direction — compensating for wind and other forces.
            </p>
            
            <p>
              The throttle determines airspeed (at 50% throttle the aircraft will hold its current altitude with a preset cruise speed). Pitch is used to ascend/descend. 翻滚、俯仰和偏航是角度控制的（因此不可能实现飞机滚转或环绕）。
            </p>
            
            <blockquote>
              <p>
                <strong>Tip</strong> Position mode is the safest fixed-wing manual mode for new fliers.
              </p>
            </blockquote>
            
            <p>
              <img src="../../images/flight_modes/position_FW.png" alt="FW Position Mode" />
            </p>
            
            <h3 id="altitude_fw">
              Altitude Mode
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="易于使用" width="30px" /></a>&nbsp;<a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" /></a>&nbsp;<a href="#altitude_only"><img src="../../assets/site/altitude_icon.svg" title="Altitude required (e.g. Barometer, Rangefinder)" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/altitude_fw.md">Altitude mode</a> makes it easier for users to control vehicle altitude, and in particular to reach and maintain a fixed altitude. 该模式不会试图抵抗风扰保持航向。
            </p>
            
            <p>
              爬升/下沉率通过俯仰/升降舵杆操纵杆来控制。 操纵杆一旦回中，自动驾驶仪就会锁定当前的高度，并在偏航/滚转和任何空速条件下保持高度。 油门通道输入控制空速。 滚动和俯仰是角度控制的（因此不可能实现飞机滚转或环绕）。
            </p>
            
            <p>
              当所有遥控输入都居中时（无滚动、俯仰、偏航，油门约50％），飞机将恢复直线水平飞行（受风影响）并保持其当前高度。
            </p>
            
            <blockquote>
              <p>
                <strong>Tip</strong> <em>Altitude mode</em> is the safest non GPS guided mode appropriate for beginners learning how to fly. It is just like <a href="#manual_fw">Manual</a> mode but additionally stabilizes the vehicle altitude when the pitch stick is released.
              </p>
            </blockquote>
            
            <p>
              <img src="../../images/flight_modes/altitude_FW.png" alt="FW Altitude Mode" />
            </p>
            
            <h3 id="stabilized_fw">
              Stabilized Mode
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_medium.png" title="中等飞行难度" width="30px" /></a>&nbsp;<a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" /></a>&nbsp;
            </p>
            
            <p>
              <a href="../flight_modes/stabilized_fw.md">Stabilized mode</a> mode puts the vehicle into straight and level flight when the RC sticks are centered, maintaining the horizontal posture against wind (but not vehicle heading and altitude).
            </p>
            
            <p>
              The vehicle climb/descends based on pitch input and performs a coordinated turn if the roll/pitch sticks are non-zero. Roll and pitch are angle controlled (you can't roll upside down or loop).
            </p>
            
            <blockquote>
              <p>
                <strong>Tip</strong> <em>Stabilized mode</em> is much easier to fly than <a href="#manual_fw">Manual mode</a> because you can't roll or flip it, and it is easy to level the vehicle by centering the control sticks.
              </p>
            </blockquote>
            
            <p>
              The vehicle will glide if the throttle is lowered to 0% (motor stops). In order to perform a turn the command must beheld throughout the maneuver because if the roll is released the plane will stop turning and level itself (the same is true for pitch and yaw commands).
            </p>
            
            <p>
              <img src="../../images/flight_modes/manual_stabilized_FW.png" alt="FW Manual Flight" />
            </p>
            
            <h3 id="acro_fw">
              Acro Mode
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_hard.png" title="很难飞" width="30px" /></a>&nbsp;<a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" /></a>&nbsp;
            </p>
            
            <p>
              <a href="../flight_modes/acro_fw.md">Acro mode</a> is the RC mode for performing acrobatic maneuvers e.g. rolls, flips, stalls and acrobatic figures.
            </p>
            
            <p>
              滚动、俯仰和偏航杆控制围绕相应轴的旋转角速率，并且油门直接传递到输出混合器。 当操纵杆居中时，飞机将停止旋转，但保持其当前朝向（在其侧面，倒置或任何其他方向）并根据当前动量移动。
            </p>
            
            <p>
              <img src="../../images/flight_modes/manual_acrobatic_FW.png" alt="固定翼手动特技飞行" />
            </p>
            
            <h3 id="manual_fw">
              Manual Mode
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_hard.png" title="很难飞" width="30px" /></a>&nbsp;<a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" /></a>&nbsp;
            </p>
            
            <p>
              <a href="../flight_modes/manual_fw.md">Manual mode</a> sends RC stick input directly to the output mixer for "fully" manual control.
            </p>
            
            <blockquote>
              <p>
                <strong>Tip</strong> This is the hardest mode to fly, because nothing is stabilised. Unlike <a href="#acro_fw">Acro Mode</a> if the RP stick is centered the vehicle will not automatically stop rotating around the axis - the pilot actually has to move the stick to apply force in the other direction.
              </p>
            </blockquote>
            
            <p>
              

<span></span>

            </p>
            
            <blockquote>
              <p>
                <strong>Note</strong> This is the only mode that overrides the FMU (commands are sent via the safety coprocessor). 它提供了一个安全机制，允许在FMU固件出现故障时，通过遥控完全控制油门、电梯、副翼和舵。
              </p>
            </blockquote>
            
            <h3 id="hold_fw">
              Hold Mode
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="自动模式" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/hold.md">Hold</a> causes a fixed-wing vehicle to start circling around the current position at its current altitude. The mode can be used to pause a mission or to help regain control of a vehicle in an emergency. It can be activated with a pre-programmed RC switch or the <em>QGroundControl</em> <strong>Pause</strong> button.
            </p>
            
            <h3 id="return_fw">
              Return Mode
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="自动模式" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/return.md">Return mode</a> causes the vehicle to fly back to its home position (at a safe height) and circle over it. The mode may be activated manually (via a pre-programmed RC switch) or automatically (i.e. in the event of a failsafe being triggered).
            </p>
            
            <h3 id="mission_fw">
              Mission Mode
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="自动模式" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/mission.md">Mission mode</a> causes the vehicle to execute a predefined autonomous <a href="../flying/missions.md">mission</a> (flight plan) that has been uploaded to the flight controller. The mission is typically created and uploaded with a Ground Control Station (GCS) application.
            </p>
            
            <blockquote>
              <p>
                <strong>Tip</strong> The PX4 GCS is called <a href="https://docs.qgroundcontrol.com/en/">QGroundControl</a>. <em>QGroundControl</em> is the same application we use for <a href="../config/README.md">configuring PX4</a>.
              </p>
            </blockquote>
            
            <h3 id="takeoff_fw">
              Takeoff Mode
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="自动模式" width="30px" /></a>&nbsp;
            </p>
            
            <p>
              <a href="../flight_modes/takeoff.md#fixed_wing">Takeoff</a> mode initiates the vehicle takeoff sequence. The specific launch behaviour depends on the configured takeoff mode (catapult/hand-launch mode or runway takeoff mode).
            </p>
            
            <h3 id="land_fw">
              Land Mode
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="自动模式" width="30px" /></a>&nbsp;
            </p>
            
            <p>
              <a href="../flight_modes/land.md">Land mode</a> causes the vehicle to turn and land at the location at which the mode was engaged. Fixed wing landing logic and parameters are explained in the topic: <a href="../flying/fixed_wing_landing.md">Landing (Fixed Wing)</a>.
            </p>
            
            <h2>
              Vertical Take Off and Landing (VTOL)
            </h2>
            
            <p>
              A VTOL aircraft can fly as either a multicopter or as fixed-wing vehicle. The multicopter mode is mainly used for take off and landing while the fixed wing mode is used for efficient travel and/or mission execution.
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