# 飞行模式

*飞行模式*定义自动驾驶仪如何响应用户输入并控制飞机移动。 下表总结了固定机翼和直升机的飞行模式([table键在下面](#key))。 请注意, 这是 "高级" 默认行为, 可能因飞机参数而异。 链接的主题(侧边栏)提供了有关各个模式的更详细信息, 包括它们的调优参数。

> **Tip**[开始>航班管理](../getting_started/flight_modes.md)中对所有飞行模式的*初学者友好*解释。

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

 

## 固定翼

<table>
  <tr>
    <th class="col_modes">
      模式
    </th>
    
    <th class="col_r_p">
      横滚和俯仰
    </th>
    
    <th class="col_yaw">
      纵转:
    </th>
    
    <th class="col_throttle">
      Throttle
    </th>
    
    <th class="col_sensor">
      位置传感器
    </th>
    
    <th class="col_summary">
      Summary
    </th>
  </tr></tr> 
  
  <tr id="position_fw">
    <td>
      <a href="../flight_modes/position_fw.md">位置</a> 
      
      <p>
        <a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="20px" /></a>
      </p>
    </td>
    
    <td>
      S<sup>+</sup>
    </td>
    
    <td>
      S<sup>+</sup>
    </td>
    
    <td>
      S<sup>+</sup>
    </td>
    
    <td>
      <a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a>
    </td>
    
    <td>
      <p>
        在远程遥控模式下,回正摇杆会将飞机置于直线和水平飞行,飞机的姿态、高度和直线飞行路径保持抗风(和其他力量)。 
        
        <ul>
          <li>
            回正遥控三个运动方向的摇杆使得水平飞行, 沿着直线地面轨道在当前方向对任何风。
          </li>
          <li>
            外部中心: <ul>
              <li>
                Pitch摇杆控制高度(与<a href="#altitude_fw">Altitude</a>相同)。
              </li>
              <li>
                Roll摇杆控制滚动角度。 自动驾驶仪将保持<a href="https://en.wikipedia.org/wiki/Coordinated_flight">配合飞行</a>(与<a href="#stabilized_fw">Stabilized</0>相同)。</li> 
                
                <li>
                  Throttle设置空速(与<a href="#altitude_fw">Altitude</a>相同)。
                </li>
                
                <li>
                  Roll、pitch和yaw是角度控制的（因此不可能实现飞机滚转或环绕）。
                </li>
                
                <li>
                  Yaw杆操纵会驱动方向舵(指令将被加到自动驾驶仪计算的指令中以维持<a href="https://en.wikipedia.org/wiki/Coordinated_flight">配合飞行</a>)。 这和<a href="#stabilized_fw">稳定模式</a>一样。
                </li></ul></li> </ul> </p> </td> </tr> 
                
                <tr id="altitude_fw">
                  <td>
                    <a href="../flight_modes/altitude_fw.md">Altitude</a> 
                    
                    <p>
                      <a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="20px" /></a>
                    </p>
                  </td>
                  
                  <td>
                    <p>
                      S (roll)
                    </p>
                    
                    <p>
                      S<sup>+</sup>(pitch)
                    </p>
                  </td>
                  
                  <td>
                    M
                  </td>
                  
                  <td>
                    S<sup>+</sup>
                  </td>
                  
                  <td>
                    <a href="#altitude_only"><img src="../../assets/site/altitude_icon.svg" title="Altitude required (e.g. Baro, Rangefinder)" width="20px" /></a>
                  </td>
                  
                  <td>
                    <p>
                      遥控模式如<a href="#stabilized_fw">Stabilized</a>模式, 但具有<em>altitude稳定</em>(中心棒将飞机置于直线和水平飞行, 并保持当前高度)。 但是飞行过程并不稳定，可能被风吹飘离。 
                      
                      <ul>
                        <li>
                          回正RPY摇杆(内带): <ul>
                            <li>
                              自动驾驶仪保持与翼一直的高度水平。
                            </li>
                            <li>
                              如果连接了空速传感器, Throttle摇杆控制飞机的空速(如果没有空速传感器, 用户就无法控制)。
                            </li>
                          </ul>
                          <li>
                            外部中心: <ul>
                              <li>
                                Pitch摇杆控制高度。
                              </li>
                              <li>
                                Throttle摇杆控制着飞机的空速 (如回正的RPY摇杆)。
                              </li>
                              <li>
                                Yaw杆操纵会驱动方向舵(指令将被加到自动驾驶仪计算的指令中以维持<a href="https://en.wikipedia.org/wiki/Coordinated_flight">配合飞行</a>)。 这和<a href="#stabilized_fw">稳定模式</a>一样。
                              </li>
                            </ul>
                          </li></ul> </p> </td> </tr> 
                          <tr id="stabilized_fw">
                            <td>
                              <a href="../flight_modes/stabilized_fw.md">Stabilized</a> 
                              
                              <p>
                                <a href="#key_difficulty"><img src="../../assets/site/difficulty_medium.png" title="Medium difficulty to fly" width="20px" /></a>
                              </p>
                            </td>
                            
                            <td>
                              S
                            </td>
                            
                            <td>
                              M
                            </td>
                            
                            <td>
                              M
                            </td>
                            
                            <td>
                            </td>
                            
                            <td>
                              <p>
                                RC mode where centered RP sticks levels vehicle attitude (roll and pitch). The vehicle course and altitude are not maintained, and can drift due to wind.
                              </p>
                              
                              <ul>
                                <li>
                                  Pitch stick controls pitch angle.
                                </li>
                                <li>
                                  Roll摇杆控制滚动角度。 Autopilot will maintain <a href="https://en.wikipedia.org/wiki/Coordinated_flight">coordinated flight</a>.
                                </li>
                                <li>
                                  Throttle stick controls throttle.
                                </li>
                                <li>
                                  Yaw杆操纵会驱动方向舵(指令将被加到自动驾驶仪计算的指令中以维持<a href="https://en.wikipedia.org/wiki/Coordinated_flight">配合飞行</a>)。
                                </li>
                              </ul>
                            </td>
                          </tr>
                          
                          <tr id="acro_fw">
                            <td>
                              <a href="../flight_modes/acro_fw.md">Acro</a> 
                              
                              <p>
                                <a href="#key_difficulty"><img src="../../assets/site/difficulty_hard.png" title="Hard to fly" width="20px" /></a>
                              </p>
                            </td>
                            
                            <td>
                              S<sub>rate</sub>
                            </td>
                            
                            <td>
                              S<sub>rate</sub>
                            </td>
                            
                            <td>
                              M
                            </td>
                            
                            <td>
                            </td>
                            
                            <td>
                              <p>
                                RC mode for performing acrobatic maneuvers e.g. rolls, flips, stalls and acrobatic figures.
                              </p>
                              
                              <p>
                                RPY stick inputs are translated to angular rate commands that are stabilized by autopilot. Throttle is passed directly to the output mixer.
                              </p>
                            </td>
                          </tr>
                          
                          <tr id="manual_fw">
                            <td>
                              <a href="../flight_modes/manual_fw.md">Manual</a> 
                              
                              <p>
                                <a href="#key_difficulty"><img src="../../assets/site/difficulty_hard.png" title="Hard to fly" width="20px" /></a>
                              </p>
                            </td>
                            
                            <td>
                              M
                            </td>
                            
                            <td>
                              M
                            </td>
                            
                            <td>
                              M
                            </td>
                            
                            <td>
                            </td>
                            
                            <td>
                              <p>
                                RC mode where stick input is sent directly to the output mixer (for "fully" manual control).
                              </p>
                              
                              <p>
                                This is the only mode that overrides the FMU (commands are sent via the safety coprocessor). It provides a safety mechanism that allows full control of throttle, elevator, ailerons and rudder via RC in the event of an FMU firmware malfunction.
                              </p>
                            </td>
                          </tr>
                          
                          <tr id="takeoff_fw">
                            <td>
                              <a href="../flight_modes/takeoff.md">Takeoff</a>
                            </td>
                            
                            <td colspan="3">
                              Auto
                            </td>
                            
                            <td>
                              <a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a>
                            </td>
                            
                            <td>
                              Vehicle initiates the takeoff sequence using either <em>catapult/hand-launch mode</em> or <em>runway takeoff mode</em> (in the current direction).
                            </td>
                          </tr>
                          
                          <tr id="land_fw">
                            <td>
                              <a href="../flight_modes/land.md">Land</a>
                            </td>
                            
                            <td class="centred" colspan="3">
                              Auto
                            </td>
                            
                            <td>
                              <a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a>
                            </td>
                            
                            <td>
                              Vehicle initiates the <a href="../flying/fixed_wing_landing.md">fixed-wing landing</a> sequence.
                            </td>
                          </tr>
                          
                          <tr id="hold_fw">
                            <td>
                              <a href="../flight_modes/hold.md">Hold</td> 
                              
                              <td colspan="3">
                                Auto
                              </td>
                              
                              <td>
                                <a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a>
                              </td>
                              
                              <td>
                                Vehicle circles around the GPS hold position at the current altitude.
                              </td></tr> 
                              
                              <tr id="return_fw">
                                <td>
                                  <a href="../flight_modes/return.md">Return</a>
                                </td>
                                
                                <td colspan="3">
                                  Auto
                                </td>
                                
                                <td>
                                  <a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a>
                                </td>
                                
                                <td>
                                  Vehicle ascends to a safe height and then returns to its home position and circles.
                                </td>
                              </tr>
                              
                              <tr id="mission_fw">
                                <td>
                                  <a href="../flight_modes/mission.md">Mission</a>
                                </td>
                                
                                <td colspan="3">
                                  Auto
                                </td>
                                
                                <td>
                                  <a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a>
                                </td>
                                
                                <td>
                                  Vehicle executes a <a href="../flying/missions.md">predefined mission/flight plan</a> that has been uploaded to the flight controller.
                                </td>
                              </tr></tbody></table> 
                              
                              <h2>
                                Multicopter
                              </h2>
                              
                              <table>
                                <tr>
                                  <th>
                                    模式
                                  </th>
                                  
                                  <th>
                                    横滚和俯仰
                                  </th>
                                  
                                  <th>
                                    纵转:
                                  </th>
                                  
                                  <th>
                                    Throttle
                                  </th>
                                  
                                  <th>
                                    位置传感器
                                  </th>
                                  
                                  <th class="col_summary">
                                    Summary
                                  </th>
                                </tr></tr> 
                                
                                <tr id="position_mc">
                                  <td>
                                    <a href="../flight_modes/position_mc.md">Position</a> 
                                    
                                    <p>
                                      <a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="20px" /></a>
                                    </p>
                                  </td>
                                  
                                  <td>
                                    S<sup>+</sup>
                                  </td>
                                  
                                  <td>
                                    S<sub>rate</sub>
                                  </td>
                                  
                                  <td>
                                    S<sup>+</sup>
                                  </td>
                                  
                                  <td>
                                    <a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a>
                                  </td>
                                  
                                  <td>
                                    <p>
                                      RC mode where RPT sticks control <em>speed</em> in corresponding directions. Centered sticks level vehicle and hold it to fixed position and altitude against wind. 
                                      
                                      <ul>
                                        <li>
                                          Centered RPT sticks hold x, y, z position steady against any wind and levels attitude.
                                        </li>
                                        <li>
                                          外部中心: <ul>
                                            <li>
                                              Roll/Pitch sticks control speed over ground in left-right and forward-back directions (respectively) relative to the "front" of the vehicle.
                                            </li>
                                            <li>
                                              Throttle stick controls speed of ascent-descent.
                                            </li>
                                            <li>
                                              Yaw stick controls rate of angular rotation above the horizontal plane.
                                            </li>
                                          </ul>
                                        </li>
                                      </ul></li> </ul>
                                    </p>
                                  </td>
                                </tr>
                                
                                <tr id="altitude_mc">
                                  <td>
                                    <a href="../flight_modes/altitude_mc.md">Altitude</a> 
                                    
                                    <p>
                                      <a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="20px" /></a>
                                    </p>
                                  </td>
                                  
                                  <td>
                                    S
                                  </td>
                                  
                                  <td>
                                    S<sub>rate</sub>
                                  </td>
                                  
                                  <td>
                                    S<sup>+</sup>
                                  </td>
                                  
                                  <td>
                                    <a href="#altitude_only"><img src="../../assets/site/altitude_icon.svg" title="Altitude required (e.g. Baro, Rangefinder)" width="20px" /></a>
                                  </td>
                                  
                                  <td>
                                    <p>
                                      RC mode like <a href="#manual_stabilized_mc">Manual/Stabilized</a> mode but with <em>altitude stabilization</em> (centered sticks level vehicle and hold it to fixed altitude). The horizontal position of the vehicle can move due to wind (or pre-existing momentum). 
                                      
                                      <ul>
                                        <li>
                                          Centered sticks (inside deadband): <ul>
                                            <li>
                                              RPY sticks levels vehicle.
                                            </li>
                                            <li>
                                              Throttle (~50%) holds current altitude steady against wind.
                                            </li>
                                          </ul>
                                          <li>
                                            外部中心: <ul>
                                              <li>
                                                Roll/Pitch sticks control tilt angle in respective orientations, resulting in corresponding left-right and forward-back movement.
                                              </li>
                                              <li>
                                                Throttle stick controls up/down speed with a predetermined maximum rate (and movement speed in other axes).
                                              </li>
                                              <li>
                                                Yaw stick controls rate of angular rotation above the horizontal plane.
                                              </li>
                                            </ul>
                                          </li></ul> </p> </td> </tr> 
                                          <tr id="manual_stabilized_mc">
                                            <td>
                                              <a href="../flight_modes/manual_stabilized_mc.md">Manual/ Stabilized</a> 
                                              
                                              <p>
                                                <a href="#key_difficulty"><img src="../../assets/site/difficulty_medium.png" title="Medium difficulty to fly" width="20px" /></a>
                                              </p>
                                            </td>
                                            
                                            <td>
                                              S
                                            </td>
                                            
                                            <td>
                                              S<sub>rate</sub>
                                            </td>
                                            
                                            <td>
                                              M
                                            </td>
                                            
                                            <td>
                                            </td>
                                            
                                            <td>
                                              <p>
                                                RC mode where centered sticks level vehicle (only - position is not stabilized).
                                              </p>
                                              
                                              <p>
                                                <ul>
                                                  <li>
                                                    Centered RP sticks level vehicle.
                                                  </li>
                                                  <li>
                                                    外部中心: <ul>
                                                      <li>
                                                        Roll/Pitch sticks control tilt angle in those orientations, resulting in corresponding left-right and forward-back movement.
                                                      </li>
                                                      <li>
                                                        Throttle stick controls up/down speed (and movement speed in other axes).
                                                      </li>
                                                      <li>
                                                        Yaw stick controls rate of angular rotation above the horizontal plane.
                                                      </li>
                                                    </ul>
                                                  </li>
                                                </ul>
                                                
                                                <p>
                                                  </td> </tr> 
                                                  
                                                  <tr id="rattitude_mc">
                                                    <td>
                                                      <a href="../flight_modes/rattitude_mc.md">Rattitude</a> 
                                                      
                                                      <p>
                                                        <a href="#key_difficulty"><img src="../../assets/site/difficulty_hard.png" title="Hard to fly" width="20px" /></a>
                                                      </p>
                                                    </td>
                                                    
                                                    <td>
                                                      S or S<sub>rate</sub>
                                                    </td>
                                                    
                                                    <td>
                                                      S<sub>rate</sub>
                                                    </td>
                                                    
                                                    <td>
                                                      M
                                                    </td>
                                                    
                                                    <td>
                                                    </td>
                                                    
                                                    <td>
                                                      <p>
                                                        RC mode that allows pilots to fly using <a href="#manual_stabilized_mc">Manual/Stabilized</a> flight most of the time, but still perform <a href="#acro_mc">Acro mode</a>-style flips and tricks when desired. Centered sticks level vehicle. 
                                                        
                                                        <ul>
                                                          <li>
                                                            Sticks within mode's threshold (like <a href="#manual_stabilized_mc">Manual/Stabilized mode</a>). <ul>
                                                              <li>
                                                                Centered RP sticks level vehicle. Roll/Pitch sticks control tilt angle in those orientations, resulting in corresponding left-right and forward-back movement.
                                                              </li>
                                                            </ul>
                                                          </li>
                                                          <li>
                                                            Sticks outside threshold (like <a href="#acro_mc">Acro mode</a>): <ul>
                                                              <li>
                                                                RPY stick inputs control the rate of angular rotation around the respective axes.
                                                              </li>
                                                            </ul>
                                                          </li>
                                                        </ul>
                                                      </p>
                                                    </td>
                                                  </tr>
                                                  
                                                  <tr id="acro_mc">
                                                    <td>
                                                      <a href="../flight_modes/acro_mc.md">Acro</a> 
                                                      
                                                      <p>
                                                        <a href="#key_difficulty"><img src="../../assets/site/difficulty_hard.png" title="Hard to fly" width="20px" /></a>
                                                      </p>
                                                    </td>
                                                    
                                                    <td>
                                                      S<sub>rate</sub>
                                                    </td>
                                                    
                                                    <td>
                                                      S<sub>rate</sub>
                                                    </td>
                                                    
                                                    <td>
                                                      M
                                                    </td>
                                                    
                                                    <td>
                                                    </td>
                                                    
                                                    <td>
                                                      <p>
                                                        RC mode for performing acrobatic maneuvers e.g. flips, rolls and loops.
                                                      </p>
                                                      
                                                      <p>
                                                        RC RPY stick inputs control the rate of angular rotation around the respective axes. Throttle is passed directly to the output mixer. When sticks are centered the vehicle will stop rotating, but remain in its current orientation (e.g. possibly inverted) and moving according to its current momentum.
                                                      </p>
                                                    </td>
                                                  </tr>
                                                  
                                                  <tr id="takeoff_mc">
                                                    <td>
                                                      <a href="../flight_modes/takeoff.md">Takeoff</a>
                                                    </td>
                                                    
                                                    <td colspan="3">
                                                      Auto
                                                    </td>
                                                    
                                                    <td>
                                                      <a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a>
                                                    </td>
                                                    
                                                    <td>
                                                      Vehicle ascends to takeoff altitude and holds position.
                                                    </td>
                                                  </tr>
                                                  
                                                  <tr id="land_mc">
                                                    <td>
                                                      <a href="../flight_modes/land.md">Land</a>
                                                    </td>
                                                    
                                                    <td colspan="3">
                                                      Auto
                                                    </td>
                                                    
                                                    <td>
                                                      <a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a>
                                                    </td>
                                                    
                                                    <td>
                                                      Vehicle lands at the position where the mode was engaged.
                                                    </td>
                                                  </tr>
                                                  
                                                  <tr id="hold_mc">
                                                    <td>
                                                      <a href="../flight_modes/hold.md">Hold</td> 
                                                      
                                                      <td colspan="3">
                                                        Auto
                                                      </td>
                                                      
                                                      <td>
                                                        <a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a>
                                                      </td>
                                                      
                                                      <td>
                                                        Vehicle hovers at the current GPS position and altitude.
                                                      </td></tr> 
                                                      
                                                      <tr id="return_mc">
                                                        <td>
                                                          <a href="../flight_modes/return.md">Return</a>
                                                        </td>
                                                        
                                                        <td colspan="3">
                                                          Auto
                                                        </td>
                                                        
                                                        <td>
                                                          <a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a>
                                                        </td>
                                                        
                                                        <td>
                                                          Vehicle ascends to a safe height and then returns to its home position and lands.
                                                        </td>
                                                      </tr>
                                                      
                                                      <tr id="mission_mc">
                                                        <td>
                                                          <a href="../flight_modes/mission.md">Mission</a>
                                                        </td>
                                                        
                                                        <td colspan="3">
                                                          Auto
                                                        </td>
                                                        
                                                        <td>
                                                          <a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a>
                                                        </td>
                                                        
                                                        <td>
                                                          Vehicle executes a <a href="../flying/missions.md">predefined mission/flight plan</a> that has been uploaded to the flight controller.
                                                        </td>
                                                      </tr>
                                                      
                                                      <tr id="followme_mc">
                                                        <td>
                                                          <a href="../flight_modes/follow_me.md">Follow Me</a>
                                                        </td>
                                                        
                                                        <td colspan="3">
                                                          Auto
                                                        </td>
                                                        
                                                        <td>
                                                          <a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a>
                                                        </td>
                                                        
                                                        <td>
                                                          Vehicle autonomously follows a user using an Android phone/tablet running QGC.
                                                        </td>
                                                      </tr>
                                                      
                                                      <tr id="offboard_mc">
                                                        <td>
                                                          <a href="../flight_modes/offboard.md">Offboard</a>
                                                        </td>
                                                        
                                                        <td colspan="3">
                                                          Auto
                                                        </td>
                                                        
                                                        <td>
                                                          <a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a>
                                                        </td>
                                                        
                                                        <td>
                                                          Vehicle obeys a position, velocity or attitude setpoint provided over MAVLink (often from a companion computer connected via serial cable or wifi).
                                                        </td>
                                                      </tr></tbody></table> 
                                                      
                                                      <h2>
                                                        VTOL
                                                      </h2>
                                                      
                                                      <p>
                                                        VTOL vehicles support both fixed-wing and multicopter flight modes, executing them based on the current vehicle mode (MC or FW).
                                                      </p>
                                                      
                                                      <p>
                                                        VTOL supports <a href="../flight_modes/offboard.md">Offboard</a> mode in either configuration.
                                                      </p>
                                                      
                                                      <h2>
                                                        Key
                                                      </h2>
                                                      
                                                      <p>
                                                        Key for understanding the table is as follows:
                                                      </p>
                                                      
                                                      <table>
                                                        <tr>
                                                          <th>
                                                            Symbol
                                                          </th>
                                                          
                                                          <th>
                                                            Description
                                                          </th>
                                                        </tr>
                                                        
                                                        <tr>
                                                          <td>
                                                            M
                                                          </td>
                                                          
                                                          <td>
                                                            Manual control via RC sticks. RC input is sent directly to the output mixer.
                                                          </td>
                                                        </tr>
                                                        
                                                        <tr>
                                                          <td>
                                                            S
                                                          </td>
                                                          
                                                          <td>
                                                            Assistance from autopilot to stabilize the attitude. RC input is required. Position of RC stick maps to the orientation of vehicle.
                                                          </td>
                                                        </tr>
                                                        
                                                        <tr>
                                                          <td>
                                                            S<sub>rate</sub>
                                                          </td>
                                                          
                                                          <td>
                                                            Assistance from autopilot to stabilize the attitude rate. RC input is required. Position of RC stick maps to the rate of rotation of vehicle in that orientation.
                                                          </td>
                                                        </tr>
                                                        
                                                        <tr>
                                                          <td>
                                                            S<sup>+</sup>
                                                          </td>
                                                          
                                                          <td>
                                                            Assistance from autopilot to hold position or altitude against wind. RC input is required.
                                                          </td>
                                                        </tr>
                                                        
                                                        <tr>
                                                          <td>
                                                            Auto
                                                          </td>
                                                          
                                                          <td>
                                                            This mode is automatic (RC control is disabled by default except to change modes).
                                                          </td>
                                                        </tr>
                                                        
                                                        <tr>
                                                          <td>
                                                            <span id="key_position_fixed"></span><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" />
                                                          </td>
                                                          
                                                          <td>
                                                            Sensor(s) that measures position/height needed e.g. optical flow, GPS+barometer, visual-inertial odometry.
                                                          </td>
                                                        </tr>
                                                        
                                                        <tr>
                                                          <td>
                                                            <span id="altitude_only"></span><img src="../../assets/site/altitude_icon.svg" title="Altitude fix required (e.g. barometer, rangefinder)" width="20px" />
                                                          </td>
                                                          
                                                          <td>
                                                            Sensor(s) that measures height/altitude needed e.g. barometer, rangefinder.
                                                          </td>
                                                        </tr>
                                                        
                                                        <tr>
                                                          <td>
                                                            <span id="key_difficulty"><a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="20px" />&nbsp;<img src="../../assets/site/difficulty_medium.png" title="Medium difficulty to fly" width="20px" />&nbsp;<img src="../../assets/site/difficulty_hard.png" title="Hard to fly" width="20px" /></a></td> 
                                                            
                                                            <td>
                                                              Flight mode difficulty (easy/medium/hard).
                                                            </td></tr> </tbody> </table> 
                                                            
                                                            <p>
                                                              Abbreviations:
                                                            </p>
                                                            
                                                            <ul>
                                                              <li>
                                                                RPY: Roll, Pitch, Yaw
                                                              </li>
                                                              <li>
                                                                RPT: Roll, Pitch Throttle
                                                              </li>
                                                            </ul>