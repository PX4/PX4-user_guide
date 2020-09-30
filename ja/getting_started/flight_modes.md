# PX4のフライトモードについて

フライトモードは，オートパイロットがリモートからの信号についてどのように反応するかや，完全自律飛行中にどのように機体を制御するかを決定します。

フライトモードはユーザー(パイロット) に離陸や着陸といった共通タスクの自動化から，水平保持機能や，経路保持，位置保持など，様々な方法・レベルでの操縦アシストを行います。

本トピックでは，利用可能なフライトモードについての概要と，それぞれのモードの(多くの場合，微妙な違いではありますが)，マルチコプター(MC) ・固定翼機(FW) ，VTOL機での挙動の違いについて説明します。

> **Tip** それぞれのモードの詳細については [飛行 > フライトモード](../flight_modes/README.md)を参照してください。

## モードの切替

パイロットはリモートコントローラのスイッチまたは，地上局ソフト( [Flight Mode Configuration](../config/flight_mode.md)を参照してください) を用いて，モードを切り替えることが可能です。

機体のタイプによっては，利用不可能なモードがあります。また，いくつかのモードは機体のタイプによって動作が異なることがあります。

いくつかのモードは飛行前/飛行中に特定の条件(例：GPSの受信，大気速度センサー，機体姿勢の推定等) を満たすことで利用可能です。 これらの場合，PX4は特定の条件が満たされるまで，該当するモードへの遷移を禁止します。

最後に, マルチコプターを飛行させている場合(バッテリーのフェイルセーフ状態でない限り)，[自律モード](#categories) ではRC送信機のスティックを動かすと，[標準設定](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) では[Position モード](../flight_modes/position_mc.md) へ移行します。 固定翼機の場合，スティックの動作は無視されます。

## 自律モードと手動モード {#categories}

フライトモードは，大きく分けて*手動モード* と *自律モード*に分類されます。 手動モードでは，ユーザはRC送信機のスティック(またはジョイスティック) を用いて，機体の挙動を操縦します。一方，*自律モード*ではオートパイロットによって機体は完全に制御され，パイロットや送信機からの操縦を*必要としません*。

> **Tip** いくつかの手動モードでは，オートパイロットが機体の操縦がしやすくなるよう，アシストを行います。 実際，ほとんどのモードでは，RC送信機が中立の場合，機体を水平に保つよう制御が行われます。

手動モードはさらに "簡単" なモードと "アクロバティック" なモードに分類できます。 簡単なモードでは，RC送信機のロール・ピッチスティックの信号は，それぞれ *水平面における* 機体の左右・前後の運動に直結する機体姿勢角の指令として扱われます。 これらは機体の運動の予測を楽にするだけでなく，角度が制御されるため，機体のフリップを不可能にします。 一方アクロバティックなモードでは，RC送信機の信号はそれぞれの軸に対する角速度指令として扱われます。 そのため，機体はフリップが可能になるなど運動性があがる反面，飛行させることが困難になります。

固定翼機:

* 手動-簡単: [Position](#position_fw), [Altitude](#altitude_fw), [Stabilized](#stabilized_fw), [Manual](#manual_fw)
* 手動-アクロバティック: [Acro](#acro_fw)
* 自律: [Hold](#hold_fw), [Return](#return_fw), [Mission](#mission_fw), [Takeoff](#takeoff_fw), [Land](#land_fw), [Offboard](#offboard_fw)

マルチコプター:

* 手動-簡単: [Position](#position_mc), [Altitude](#altitude_mc), [Manual/Stabilized](#manual_stabilized_mc), [Orbit](#orbit_mc)
* 手動-アクロバティック: [Rattitude](#rattitude_mc), [Acro](#acro_mc)
* 自律: [Hold](#hold_mc), [Return](#return_mc), [Mission](#mission_mc), [Takeoff](#takeoff_mc), [Land](#land_mc), [Follow Me](#followme_mc), [Offboard](#offboard_mc)

## 記号

本ドキュメントでは，以下のアイコンが用いられます。<span id="key_manual"><a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" /></a></td> 

<td>
  手動モード. リモートコントロールが必要です。
</td></tr> 

<tr>
  <td>
    <span id="key_automatic"><a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /></a></td> 
    
    <td>
      自律モード. モードの切替を除いて，RC送信機からの信号は無効化されます。
    </td></tr> 
    
    <tr>
      <td>
        <span id="key_position_fixed"><a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /></a></td> 
        
        <td>
          Position fix required (e.g. GPS, VIO, or some other positioning system).
        </td></tr> 
        
        <tr>
          <td>
            <span id="altitude_only"></span><img src="../../assets/site/altitude_icon.svg" title="Altitude fix required (e.g. barometer, rangefinder)" width="30px" />
          </td>
          
          <td>
            Altitude required (e.g. from barometer, rangefinder).
          </td>
        </tr>
        
        <tr>
          <td>
            <span id="key_difficulty"><a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="30px" />&nbsp;<img src="../../assets/site/difficulty_medium.png" title="Medium difficulty to fly" width="30px" />&nbsp;<img src="../../assets/site/difficulty_hard.png" title="Hard to fly" width="30px" /></a></td> 
            
            <td>
              Flight mode difficulty (Easy to Hard)
            </td></tr> </tbody> </table> 
            
            <h2 id="mc_flight_modes">
              Multicopter
            </h2>
            
            <h3 id="position_mc">
              Position Mode
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="30px" /></a>&nbsp;<a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/position_mc.md">Position mode</a> is an easy-to-fly RC mode in which roll and pitch sticks control speed over ground in the left-right and forward-back directions (relative to the "front" of the vehicle), and throttle controls speed of ascent-descent. When the sticks are released/centered the vehicle will actively brake, level, and be locked to a position in 3D space — compensating for wind and other forces.
            </p>
            
            <blockquote>
              <p>
                <strong>Tip</strong> Position mode is the safest manual mode for new fliers. Unlike <a href="#altitude_mc">Altitude</a> and <a href="#manual_stabilized_mc">Manual/Stabilized</a> modes the vehicle will stop when the sticks are centered rather than continuing until slowed by wind resistance.
              </p>
            </blockquote>
            
            <p>
              <img src="../../assets/flight_modes/position_MC.png" alt="MC Position Mode" />
            </p>
            
            <h3 id="altitude_mc">
              Altitude Mode
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="30px" /></a>&nbsp;<a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" /></a>&nbsp;<a href="#altitude_only"><img src="../../assets/site/altitude_icon.svg" title="Altitude required (e.g. Baro, Rangefinder)" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/altitude_mc.md">Altitude mode</a> is a <em>relatively</em> easy-to-fly RC mode in which roll and pitch sticks control vehicle movement in the left-right and forward-back directions (relative to the "front" of the vehicle), yaw stick controls rate of rotation over the horizontal plane, and throttle controls speed of ascent-descent.
            </p>
            
            <p>
              When the sticks are released/centered the vehicle will level and maintain the current <em>altitude</em>. If moving in the horizontal plane the vehicle will continue until any momentum is dissipated by wind resistance. If the wind blows the aircraft will drift in the direction of the wind.
            </p>
            
            <blockquote>
              <p>
                <strong>Tip</strong> <em>Attitude mode</em> is the safest non-GPS manual mode for new fliers. It is just like <a href="#manual_stabilized_mc">Manual/Stabilized</a> mode but additionally stabilizes the vehicle altitude when the sticks are released.
              </p>
            </blockquote>
            
            <p>
              <img src="../../assets/flight_modes/altitude_MC.png" alt="MC Altitude Mode" />
            </p>
            
            <h3 id="manual_stabilized_mc">
              Manual/Stabilized Mode
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_medium.png" title="Medium difficulty to fly" width="30px" /></a>&nbsp;<a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" /></a>&nbsp;
            </p>
            
            <p>
              The <a href="../flight_modes/manual_stabilized_mc.md">Manual/Stabilized</a> mode stabilizes the multicopter when the RC control sticks are centered. To manually move/fly the vehicle you move the sticks outside of the center.
            </p>
            
            <blockquote>
              <p>
                <strong>Note</strong> This multicopter mode is enabled if you set either <em>Manual</em> or <em>Stabilized</em> modes for an MC vehicle.
              </p>
            </blockquote>
            
            <p>
              When under manual control the roll and pitch sticks control the angle of the vehicle (attitude), the yaw stick controls the rate of rotation above the horizontal plane, and the throttle controls altitude/speed.
            </p>
            
            <p>
              As soon as you release the control sticks they will return to the center deadzone. The multicopter will level out and stop once the roll and pitch sticks are centered. The vehicle will then hover in place/maintain altitude - provided it is properly balanced, throttle is set appropriately, and no external forces are applied (e.g. wind). The craft will drift in the direction of any wind and you have to control the throttle to hold altitude.
            </p>
            
            <p>
              <img src="../../assets/flight_modes/manual_stabilized_MC.png" alt="MC Manual Flight" />
            </p>
            
            <h3 id="rattitude_mc">
              Rattitude
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_hard.png" title="Hard to fly" width="30px" /></a>&nbsp;<a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" /></a>&nbsp;
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
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_hard.png" title="Hard to fly" width="30px" /></a>&nbsp;<a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" /></a>&nbsp;
            </p>
            
            <p>
              <a href="../flight_modes/acro_mc.md">Acro mode</a> is the RC mode for performing acrobatic maneuvers e.g. rolls and loops.
            </p>
            
            <p>
              The roll, pitch and yaw sticks control the rate of angular rotation around the respective axes and throttle is passed directly to the output mixer. When sticks are centered the vehicle will stop rotating, but remain in its current orientation (on its side, inverted, or whatever) and moving according to its current momentum.
            </p>
            
            <p>
              <img src="../../assets/flight_modes/manual_acrobatic_MC.png" alt="MC Manual Acrobatic Flight" />
            </p>
            
            <!-- image above incorrect: https://github.com/PX4/px4_user_guide/issues/182 -->
            
            <h3 id="orbit_mc">
              Orbit Mode
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /></a>
            </p>
            
            <p>
              The <a href="../flight_modes/orbit.md">Orbit mode</a> allows you to command a multicopter (or VTOL in multicopter mode) to fly in a circle, yawing so that it always faces towards the center.
            </p>
            
            <p>
              A GCS is <em>required</em> to enable the mode, and to set the center position and initial radius of the orbit. By default the vehicle will then perform a slow ongoing orbit around the center position (1m/s) in a clockwise direction. RC control is optional, and can be used to change the orbit altitude, radius, speed, and direction.
            </p>
            
            <p>
              <img src="../../assets/flight_modes/orbit_MC.png" alt="Orbit Mode - MC" />
            </p>
            
            <h3 id="hold_mc">
              Hold Mode
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/hold.md">Hold mode</a> causes the multicopter to stop and hover at its current position and altitude (maintaining position against wind and other forces). The mode can be used to pause a mission or to help regain control of a vehicle in an emergency. It can be activated with a pre-programmed RC switch or the <em>QGroundControl</em> <strong>Pause</strong> button.
            </p>
            
            <h3 id="return_mc">
              Return Mode
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/return.md">Return mode</a> causes the vehicle to fly a clear path to a safe location. The mode may be activated manually (via a pre-programmed RC switch) or automatically (i.e. in the event of a <a href="../config/safety.md">failsafe</a> being triggered).
            </p>
            
            <p>
              The return behaviour depends on parameter settings, and may follow a mission path and/or mission landing pattern (if defined). By default a mulitcopter will simply ascend to a safe height, fly to its home position, and then land.
            </p>
            
            <h3 id="mission_mc">
              Mission Mode
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /></a>
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
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/takeoff.md">Takeoff</a> mode causes the multicopter to climb vertically to takeoff altitude and hover in position.
            </p>
            
            <h3 id="land_mc">
              Land Mode
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/land.md">Land mode</a> causes the multicopter to land at the location at which the mode was engaged.
            </p>
            
            <h3 id="followme_mc">
              Follow Me Mode
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/follow_me.md">Follow Me mode</a> causes a multicopter to autonomously follow and track a user providing their current position setpoint. Position setpoints might come from an Android phone/tablet running <em>QGroundControl</em> or from a MAVSDK app.
            </p>
            
            <h3 id="offboard_mc">
              Offboard Mode
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /></a>
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
              Position Mode
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="30px" /></a>&nbsp;<a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/position_fw.md">Position mode</a> is an easy-to-fly RC mode in which, when the sticks are released/centered, the vehicle will level and fly a straight line ground track in the current direction — compensating for wind and other forces.
            </p>
            
            <p>
              The throttle determines airspeed (at 50% throttle the aircraft will hold its current altitude with a preset cruise speed). Pitch is used to ascend/descend. Roll, pitch and yaw are all angle-controlled (so it is impossible to roll over or loop the vehicle).
            </p>
            
            <blockquote>
              <p>
                <strong>Tip</strong> Position mode is the safest fixed-wing manual mode for new fliers.
              </p>
            </blockquote>
            
            <p>
              <img src="../../assets/flight_modes/position_FW.png" alt="FW Position Mode" />
            </p>
            
            <h3 id="altitude_fw">
              Altitude Mode
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="30px" /></a>&nbsp;<a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" /></a>&nbsp;<a href="#altitude_only"><img src="../../assets/site/altitude_icon.svg" title="Altitude required (e.g. Barometer, Rangefinder)" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/altitude_fw.md">Altitude mode</a> makes it easier for users to control vehicle altitude, and in particular to reach and maintain a fixed altitude. The mode will not attempt to hold the vehicle course against wind.
            </p>
            
            <p>
              The climb/descent rate is controlled via the pitch/elevator stick. Once centered the autopilot latches onto the current altitude and will maintain it during yaw/roll, and at any airspeed. The throttle input controls airspeed. Roll and pitch are angle-controlled (so it is impossible to roll over or loop the vehicle).
            </p>
            
            <p>
              When all remote control inputs are centered (no roll, pitch, yaw, and ~50% throttle) the aircraft will return to straight, level flight (subject to wind) and keep its current altitude.
            </p>
            
            <blockquote>
              <p>
                <strong>Tip</strong> <em>Altitude mode</em> is the safest non GPS guided mode appropriate for beginners learning how to fly. It is just like <a href="#manual_fw">Manual</a> mode but additionally stabilizes the vehicle altitude when the pitch stick is released.
              </p>
            </blockquote>
            
            <p>
              <img src="../../assets/flight_modes/altitude_FW.png" alt="FW Altitude Mode" />
            </p>
            
            <h3 id="stabilized_fw">
              Stabilized Mode
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_medium.png" title="Medium difficulty to fly" width="30px" /></a>&nbsp;<a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" /></a>&nbsp;
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
              <img src="../../assets/flight_modes/manual_stabilized_FW.png" alt="FW Manual Flight" />
            </p>
            
            <h3 id="acro_fw">
              Acro Mode
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_hard.png" title="Hard to fly" width="30px" /></a>&nbsp;<a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" /></a>&nbsp;
            </p>
            
            <p>
              <a href="../flight_modes/acro_fw.md">Acro mode</a> is the RC mode for performing acrobatic maneuvers e.g. rolls, flips, stalls and acrobatic figures.
            </p>
            
            <p>
              The roll, pitch and yaw sticks control the rate of angular rotation around the respective axes and throttle is passed directly to the output mixer. When sticks are centered the vehicle will stop rotating, but remain in its current orientation (on its side, inverted, or whatever) and moving according to its current momentum.
            </p>
            
            <p>
              <img src="../../assets/flight_modes/manual_acrobatic_FW.png" alt="FW Manual Acrobatic Flight" />
            </p>
            
            <h3 id="manual_fw">
              Manual Mode
            </h3>
            
            <p>
              <a href="#key_difficulty"><img src="../../assets/site/difficulty_hard.png" title="Hard to fly" width="30px" /></a>&nbsp;<a href="#key_manual"><img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" /></a>&nbsp;
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
                <strong>Note</strong> This is the only mode that overrides the FMU (commands are sent via the safety coprocessor). It provides a safety mechanism that allows full control of throttle, elevator, ailerons and rudder via RC in the event of an FMU firmware malfunction.
              </p>
            </blockquote>
            
            <h3 id="hold_fw">
              Hold Mode
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/hold.md">Hold</a> causes a fixed-wing vehicle to start circling around the current position at its current altitude. The mode can be used to pause a mission or to help regain control of a vehicle in an emergency. It can be activated with a pre-programmed RC switch or the <em>QGroundControl</em> <strong>Pause</strong> button.
            </p>
            
            <h3 id="return_fw">
              Return Mode
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/return.md">Return mode</a> causes the vehicle to fly a clear path to a safe location. The mode may be activated manually (via a pre-programmed RC switch) or automatically (i.e. in the event of a <a href="../config/safety.md">failsafe</a> being triggered).
            </p>
            
            <p>
              The return behaviour depends on parameter settings, and may follow a mission path and/or mission landing pattern (if defined). By default a fixed wing vehicle will ascend to a safe height and use a mission landing pattern if one exists, otherwise it will fly to the home position and circle.
            </p>
            
            <h3 id="mission_fw">
              Mission Mode
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /></a>
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
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /></a>&nbsp;
            </p>
            
            <p>
              <a href="../flight_modes/takeoff.md#fixed_wing">Takeoff</a> mode initiates the vehicle takeoff sequence. The specific launch behaviour depends on the configured takeoff mode (catapult/hand-launch mode or runway takeoff mode).
            </p>
            
            <h3 id="land_fw">
              Land Mode
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /></a>&nbsp;
            </p>
            
            <p>
              <a href="../flight_modes/land.md">Land mode</a> causes the vehicle to turn and land at the location at which the mode was engaged. Fixed wing landing logic and parameters are explained in the topic: <a href="../flying/fixed_wing_landing.md">Landing (Fixed Wing)</a>.
            </p>
            
            <h3 id="offboard_fw">
              Offboard Mode
            </h3>
            
            <p>
              <a href="#key_automatic"><img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /></a>&nbsp;<a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /></a>
            </p>
            
            <p>
              <a href="../flight_modes/offboard.md">Offboard mode</a> causes the fixed wing vehicle to obey attitude setpoints provided over MAVLink.
            </p>
            
            <blockquote>
              <p>
                <strong>Note</strong> This mode is intended for companion computers and ground stations!
              </p>
            </blockquote>
            
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
            
            <p>
              A few notes:
            </p>
            
            <ul>
              <li>
                VTOL <a href="../flight_modes/return.md">Return mode</a> uses a mission landing by default, if defined.
              </li>
            </ul>
            
            <h2>
              Further Information
            </h2>
            
            <ul>
              <li>
                <a href="../flight_modes/README.md">Flying > Flight Modes</a> - Detailed technical explanation of all modes
              </li>
              <li>
                <a href="../config/flight_mode.md">Basic Configuration > Flight Modes</a> - How to map RC control switches to specific flight modes
              </li>
            </ul>