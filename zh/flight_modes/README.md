---
canonicalUrl: https://docs.px4.io/main/zh/flight_modes/README
---

# 飞行模式

*飞行模式* 定义自动驾驶仪如何响应用户输入并控制飞机移动。 下表总结了固定机翼和直升机的飞行模式（[table键在下面](#key)）。 请注意，这是 "高级" 默认行为，可能因飞机参数而异。 链接的主题（侧边栏）提供了有关各个模式的更详细信息，包括它们的调优参数。

> **Tip** [开始 > 航班管理](../getting_started/flight_modes.md) 中对所有飞行模式的 *初学者友好* 解释。

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
      偏航：
    </th>
    
    <th class="col_throttle">
      油门
    </th>
    
    <th class="col_sensor">
      位置传感器
    </th>
    
    <th class="col_summary">
      概要
    </th>
  </tr></tr> 
  
  <tr id="position_fw">
    <td>
      <a href="../flight_modes/position_fw.md">位置</a> 
      
      <p>
        <a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="易于使用" width="20px" /></a>
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
      <a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="20px" /></a>
    </td>
    
    <td>
      <p>
        在遥控模式下，回中摇杆会使飞机定直平飞，保持飞机的姿态、高度和直线飞行路径并抗风（和其他力）。 
        
        <ul>
          <li>
            回中摇杆使飞机沿着直线地面轨道在当前方向水平飞行并抗风。
          </li>
          <li>
            中心以外： <ul>
              <li>
                俯仰摇杆控制高度（与 <a href="#altitude_fw">高度</a>相同）。
              </li>
              <li>
                滚转摇杆控制滚转角度。 自动驾驶仪将保持 <a href="https://en.wikipedia.org/wiki/Coordinated_flight">协调飞行</a> （与 <a href="#stabilized_fw">稳定</0> 相同）。</li> 
                
                <li>
                  油门设置空速（与 <a href="#altitude_fw">高度</a> 相同）。
                </li>
                
                <li>
                  滚转、俯仰和偏航是角度控制的（因此不可能实现飞机滚转或环绕）。
                </li>
                
                <li>
                  偏航摇杆操纵会驱动方向舵（指令将被加到自动驾驶仪计算的指令中以维持 <a href="https://en.wikipedia.org/wiki/Coordinated_flight">协调飞行</a>）。 这和 <a href="#stabilized_fw">稳定模式</a> 一样。
                </li></ul></li> </ul> </p> </td> </tr> 
                
                <tr id="altitude_fw">
                  <td>
                    <a href="../flight_modes/altitude_fw.md">高度</a> 
                    
                    <p>
                      <a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="易于使用" width="20px" /></a>
                    </p>
                  </td>
                  
                  <td>
                    <p>
                      S（滚转）
                    </p>
                    
                    <p>
                      S<sup>+</sup>(俯仰)
                    </p>
                  </td>
                  
                  <td>
                    M
                  </td>
                  
                  <td>
                    S<sup>+</sup>
                  </td>
                  
                  <td>
                    <a href="#altitude_only"><img src="../../assets/site/altitude_icon.svg" title="所需高度（例如巴罗、测距仪）" width="20px" /></a>
                  </td>
                  
                  <td>
                    <p>
                      遥控模式，类似 <a href="#stabilized_fw">稳定</a> 模式, 但具有 <em>高度稳定</em> （杆回中将使飞机定直平飞 并保持当前高度）。 但是飞行航向并不稳定，可能被风吹飘离。 
                      
                      <ul>
                        <li>
                          回中RPY摇杆(在死区内): <ul>
                            <li>
                              自动驾驶仪保持高度稳定和机翼水平。
                            </li>
                            <li>
                              如果连接了空速传感器，油门控制飞机的空速（如果没有空速传感器，用户就无法控制油门）。
                            </li>
                          </ul>
                          <li>
                            中心以外： <ul>
                              <li>
                                俯仰摇杆控制高度。
                              </li>
                              <li>
                                Throttle stick controls the airspeed of the aircraft (as for centered RPY sticks).
                              </li>
                              <li>
                                偏航摇杆操纵会驱动方向舵（指令将被加到自动驾驶仪计算的指令中以维持 <a href="https://en.wikipedia.org/wiki/Coordinated_flight">协调飞行</a>）。 这和 <a href="#stabilized_fw">稳定模式</a> 一样。
                              </li>
                            </ul>
                          </li></ul> </p> </td> </tr> 
                          <tr id="stabilized_fw">
                            <td>
                              <a href="../flight_modes/stabilized_fw.md">稳定</a> 
                              
                              <p>
                                <a href="#key_difficulty"><img src="../../assets/site/difficulty_medium.png" title="中等飞行难度" width="20px" /></a>
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
                                遥控模式，其中杆回中可以改平飞机的姿态（滚动和俯仰）。 但是飞行航向和姿态并不稳定，可能被风吹飘离。
                              </p>
                              
                              <ul>
                                <li>
                                  俯仰摇杆控制俯仰角度。
                                </li>
                                <li>
                                  滚转摇杆控制滚转角。 自动驾驶仪将保持 <a href="https://en.wikipedia.org/wiki/Coordinated_flight">协调飞行</a>。
                                </li>
                                <li>
                                  油门摇杆控制油门。
                                </li>
                                <li>
                                  偏航摇杆操纵会驱动方向舵（指令将被加到自动驾驶仪计算的指令中以维持 <a href="https://en.wikipedia.org/wiki/Coordinated_flight">协调飞行</a>）。
                                </li>
                              </ul>
                            </td>
                          </tr>
                          
                          <tr id="acro_fw">
                            <td>
                              <a href="../flight_modes/acro_fw.md">特技</a> 
                              
                              <p>
                                <a href="#key_difficulty"><img src="../../assets/site/difficulty_hard.png" title="很难飞" width="20px" /></a>
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
                                用于执行杂技动作的遥控模式，例如滚动、翻转、失速和杂技图形。
                              </p>
                              
                              <p>
                                RPY摇杆输入被转换为角速度命令，通过自动驾驶仪稳定。 油门直接传递到输出混频器。
                              </p>
                            </td>
                          </tr>
                          
                          <tr id="manual_fw">
                            <td>
                              <a href="../flight_modes/manual_fw.md">手动</a> 
                              
                              <p>
                                <a href="#key_difficulty"><img src="../../assets/site/difficulty_hard.png" title="很难飞" width="20px" /></a>
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
                                遥控模式，其中摇杆输入直接发送到输出混频器（用于 "完全" 手动控制）。
                              </p>
                              
                              <p>
                                这是覆盖FMU（命令通过安全协处理器发送）的唯一模式。 它提供了一个安全机制，允许在FMU固件出现故障时，通过遥控完全控制油门、升降舵、副翼和方向舵。
                              </p>
                            </td>
                          </tr>
                          
                          <tr id="takeoff_fw">
                            <td>
                              <a href="../flight_modes/takeoff.md">起飞</a>
                            </td>
                            
                            <td colspan="3">
                              自动
                            </td>
                            
                            <td>
                              <a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="20px" /></a>
                            </td>
                            
                            <td>
                              飞机使用 <em>弹射/手持发射模式</em> 或 <em>滑行起飞模式</em> （在当前方向）启动起飞顺序。
                            </td>
                          </tr>
                          
                          <tr id="land_fw">
                            <td>
                              <a href="../flight_modes/land.md">降落</a>
                            </td>
                            
                            <td class="centred" colspan="3">
                              自动
                            </td>
                            
                            <td>
                              <a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="20px" /></a>
                            </td>
                            
                            <td>
                              飞机启动了 <a href="../flying/fixed_wing_landing.md">固定翼着陆</a> 程序。
                            </td>
                          </tr>
                          
                          <tr id="hold_fw">
                            <td>
                              <a href="../flight_modes/hold.md">保持</td> 
                              
                              <td colspan="3">
                                自动
                              </td>
                              
                              <td>
                                <a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="20px" /></a>
                              </td>
                              
                              <td>
                                飞机在当前高度绕GPS位置旋转。
                              </td></tr> 
                              
                              <tr id="return_fw">
                                <td>
                                  <a href="../flight_modes/return.md">返回</a>
                                </td>
                                
                                <td colspan="3">
                                  自动
                                </td>
                                
                                <td>
                                  <a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="20px" /></a>
                                </td>
                                
                                <td>
                                  Vehicle flies a clear path to a safe location. The return behaviour depends on parameter settings, and may follow a mission path and/or mission landing pattern (if defined).
                                </td>
                              </tr>
                              
                              <tr id="mission_fw">
                                <td>
                                  <a href="../flight_modes/mission.md">任务</a>
                                </td>
                                
                                <td colspan="3">
                                  自动
                                </td>
                                
                                <td>
                                  <a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="20px" /></a>
                                </td>
                                
                                <td>
                                  飞机执行已上传到飞行控制器的 <a href="../flying/missions.md">预定义的飞行计划</a>。
                                </td>
                              </tr>
                              
                              <tr id="offboard_fw">
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
                                  Vehicle obeys attitude setpoints provided over MAVLink (often from a companion computer connected via serial cable or wifi).
                                </td>
                              </tr></tbody></table> 
                              
                              <h2>
                                多旋翼
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
                                    偏航
                                  </th>
                                  
                                  <th>
                                    油门
                                  </th>
                                  
                                  <th>
                                    位置传感器
                                  </th>
                                  
                                  <th class="col_summary">
                                    概要
                                  </th>
                                </tr></tr> 
                                
                                <tr id="position_mc">
                                  <td>
                                    位置 
                                    
                                    <p>
                                      <a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="易于使用" width="20px" /></a>
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
                                    <a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="20px" /></a>
                                  </td>
                                  
                                  <td>
                                    <p>
                                      遥控模式，其中RPT摇杆在相应的方向控制 <em>速度</em> 。 回中摇杆可以改平飞机, 保持它在固定位置和高度并抗风。 
                                      
                                      <ul>
                                        <li>
                                          回正的RPT摇杆可以抗风并保持飞机X、Y、Z位置稳定以及姿态水平。
                                        </li>
                                        <li>
                                          中心以外： <ul>
                                            <li>
                                              滚转/俯仰摇杆控制相对于飞机”前部“的左右前后方向的速度。
                                            </li>
                                            <li>
                                              油门摇杆控制上升-下降的速度。
                                            </li>
                                            <li>
                                              偏航摇杆控制水平面上方的角度旋转速率。
                                            </li>
                                          </ul>
                                        </li>
                                        <li>
                                          Takeoff: <ul>
                                            <li>
                                              When landed, the vehicle will take off if the throttle stick is raised above 62.5% percent (of the full range from bottom).
                                            </li>
                                          </ul>
                                        </li>
                                      </ul></li> </ul>
                                    </p>
                                  </td>
                                </tr>
                                
                                <tr id="altitude_mc">
                                  <td>
                                    <a href="../flight_modes/altitude_mc.md">高度</a> 
                                    
                                    <p>
                                      <a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="易于使用" width="20px" /></a>
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
                                    <a href="#altitude_only"><img src="../../assets/site/altitude_icon.svg" title="所需高度（例如巴罗、测距仪）" width="20px" /></a>
                                  </td>
                                  
                                  <td>
                                    <p>
                                      遥控模式，就像<a href="#manual_stabilized_mc">手动/稳定</a>模式但是具有<em>高度稳定</em>功能（杆回中使飞机水平并保持固定高度） 水平位置可能会受风的影响（或已经存在的动量）。 
                                      
                                      <ul>
                                        <li>
                                          回中摇杆(在死区内): <ul>
                                            <li>
                                              RPY摇杆使飞机水平。
                                            </li>
                                            <li>
                                              油门（~50%）抗风保持当前姿态。
                                            </li>
                                          </ul>
                                          <li>
                                            中心以外： <ul>
                                              <li>
                                                滚转/俯仰摇杆控制各自方向的倾斜角，导致左右和前后的移动。
                                              </li>
                                              <li>
                                                油门摇杆以预定的最大速率（和其他轴上的移动速度）控制上升速度。
                                              </li>
                                              <li>
                                                偏航摇杆控制水平面上方的角度旋转速率。
                                              </li>
                                            </ul>
                                          </li>
                                          <li>
                                            Takeoff: <ul>
                                              <li>
                                                When landed, the vehicle will take off if the throttle stick is raised above 62.5% percent (of the full range from bottom).
                                              </li>
                                            </ul>
                                          </li></ul> </p> </td> </tr> 
                                          <tr id="manual_stabilized_mc">
                                            <td>
                                              <a href="../flight_modes/manual_stabilized_mc.md">手动/稳定</a> 
                                              
                                              <p>
                                                <a href="#key_difficulty"><img src="../../assets/site/difficulty_medium.png" title="中等飞行难度" width="20px" /></a>
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
                                                遥控模式，回正摇杆保持飞机水平（仅-位置不稳定）。
                                              </p>
                                              
                                              <p>
                                                <ul>
                                                  <li>
                                                    回正RP摇杆使飞机水平。
                                                  </li>
                                                  <li>
                                                    中心以外： <ul>
                                                      <li>
                                                        滚转/俯仰摇杆控制各自方向的倾斜角，导致左右和前后的移动。
                                                      </li>
                                                      <li>
                                                        油门摇杆控制上升/下降速度 （和其他轴的移动速度）。
                                                      </li>
                                                      <li>
                                                        偏航摇杆控制水平面上方的角度旋转速率。
                                                      </li>
                                                    </ul>
                                                  </li>
                                                </ul>
                                                
                                                <p>
                                                  </td> </tr> 
                                                  
                                                  <tr id="rattitude_mc">
                                                    <td>
                                                      <a href="../flight_modes/rattitude_mc.md">半自稳</a> 
                                                      
                                                      <p>
                                                        <a href="#key_difficulty"><img src="../../assets/site/difficulty_hard.png" title="很难飞" width="20px" /></a>
                                                      </p>
                                                    </td>
                                                    
                                                    <td>
                                                      S 或 S<sub>rate</sub>
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
                                                        遥控模式，允许飞行员在大多数情况下使用 <a href="#manual_stabilized_mc">手动/稳定</a> 飞行，但仍在执行 <a href="#acro_mc">特技模式</a> - 风格的翻转和技巧。 回正摇杆使飞机水平。 
                                                        
                                                        <ul>
                                                          <li>
                                                            摇杆在模式阈值（比如 <a href="#manual_stabilized_mc">手动/稳定模式</a>）之内。 <ul>
                                                              <li>
                                                                回正RP摇杆使飞机水平。 滚转/俯仰摇杆控制各自方向的倾斜角，导致左右和前后的移动。
                                                              </li>
                                                            </ul>
                                                          </li>
                                                          <li>
                                                            摇杆位于阈值之外（比如<a href="#acro_mc">特技模式</a>）： <ul>
                                                              <li>
                                                                RPY摇杆输入控制围绕各自轴的角度旋转速率。
                                                              </li>
                                                            </ul>
                                                          </li>
                                                        </ul>
                                                      </p>
                                                    </td>
                                                  </tr>
                                                  
                                                  <tr id="acro_mc">
                                                    <td>
                                                      <a href="../flight_modes/acro_mc.md">特技</a> 
                                                      
                                                      <p>
                                                        <a href="#key_difficulty"><img src="../../assets/site/difficulty_hard.png" title="很难飞" width="20px" /></a>
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
                                                        用于执行特技动作的遥控模式，例如翻转，滚转和环绕。
                                                      </p>
                                                      
                                                      <p>
                                                        遥控 RPY摇杆输入控制围绕各自轴的角度旋转速率。 油门直接传递到输出混频器。 当操纵杆居中时，飞机将停止旋转，但保持其当前朝向（在其侧面，倒置或任何其他方向）并根据当前动量移动。
                                                      </p>
                                                    </td>
                                                  </tr>
                                                  
                                                  <tr id="orbit_mc">
                                                    <td>
                                                      <a href="../flight_modes/orbit.md">Orbit</a> 
                                                      
                                                      <p>
                                                        <a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="20px" /></a>
                                                      </p>
                                                    </td>
                                                    
                                                    <td>
                                                      -
                                                    </td>
                                                    
                                                    <td>
                                                      -
                                                    </td>
                                                    
                                                    <td>
                                                      -
                                                    </td>
                                                    
                                                    <td>
                                                    </td>
                                                    
                                                    <td>
                                                      <p>
                                                        GCS-initiated guided mode for flying a circle, always facing the center.
                                                      </p>
                                                      
                                                      <p>
                                                        Mode must be started from GCS, specifying center point and initial radius and altitude. RC control is optional, and can be used to set the orbit altitude, radius, speed, and direction. Altitude control is the same as for <a href="#position_mc">Position Mode</a>.
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
                                                          Vehicle flies a clear path to a safe location. The return behaviour depends on parameter settings, and may follow a mission path and/or mission landing pattern (if defined).
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
                                                          Vehicle obeys a position, velocity or attitude setpoints provided over MAVLink (often from a companion computer connected via serial cable or wifi).
                                                        </td>
                                                      </tr></tbody></table> 
                                                      
                                                      <h2>
                                                        垂直起降（VTOL）
                                                      </h2>
                                                      
                                                      <p>
                                                        VTOL飞机支持固定翼和多路飞行模式，根据当前飞机模式（MC或FW）执行这些模式。
                                                      </p>
                                                      
                                                      <p>
                                                        VTOL支持任一配置中的 <a href="../flight_modes/offboard.md">Offboard</a> 模式。
                                                      </p>
                                                      
                                                      <h2>
                                                        关键字
                                                      </h2>
                                                      
                                                      <p>
                                                        理解该表的关键如下所示：
                                                      </p>
                                                      
                                                      <table>
                                                        <tr>
                                                          <th>
                                                            符号
                                                          </th>
                                                          
                                                          <th>
                                                            参数描述
                                                          </th>
                                                        </tr>
                                                        
                                                        <tr>
                                                          <td>
                                                            M
                                                          </td>
                                                          
                                                          <td>
                                                            通过遥控摇杆手动控制。 遥控输入直接发送到输出混频器。
                                                          </td>
                                                        </tr>
                                                        
                                                        <tr>
                                                          <td>
                                                            S
                                                          </td>
                                                          
                                                          <td>
                                                            辅助自动驾驶仪以稳定的态度。 遥控输入是必需的。 遥控摇杆的位置映射到飞机的方向。
                                                          </td>
                                                        </tr>
                                                        
                                                        <tr>
                                                          <td>
                                                            S<sub>rate</sub>
                                                          </td>
                                                          
                                                          <td>
                                                            在自动驾驶仪的帮助下可以稳定姿态率。 遥控输入是必需的。 摇杆的位置与飞机在该方向上的旋转速度相对应。
                                                          </td>
                                                        </tr>
                                                        
                                                        <tr>
                                                          <td>
                                                            S<sup>+</sup>
                                                          </td>
                                                          
                                                          <td>
                                                            在自动驾驶仪的帮助下可以保持位置或高度逆风。 遥控输入是必需的。
                                                          </td>
                                                        </tr>
                                                        
                                                        <tr>
                                                          <td>
                                                            自动
                                                          </td>
                                                          
                                                          <td>
                                                            该模式为自动（除非更改模式，否则遥控模式默认关闭）。
                                                          </td>
                                                        </tr>
                                                        
                                                        <tr>
                                                          <td>
                                                            <span id="key_position_fixed"></span><img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="20px" />
                                                          </td>
                                                          
                                                          <td>
                                                            测量位置高度的传感器需要例如光流、GPS + 气压计、视膜惯性静电测量。
                                                          </td>
                                                        </tr>
                                                        
                                                        <tr>
                                                          <td>
                                                            <span id="altitude_only"></span><img src="../../assets/site/altitude_icon.svg" title="需要高度修复（例如气压计、测距仪）" width="20px" />
                                                          </td>
                                                          
                                                          <td>
                                                            测量所需高度的传感器，例如气压计、测距仪。
                                                          </td>
                                                        </tr>
                                                        
                                                        <tr>
                                                          <td>
                                                            <span id="key_difficulty"><a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="易于使用" width="20px" />&nbsp;<img src="../../assets/site/difficulty_medium.png" title="中等飞行难度" width="20px" />&nbsp;<img src="../../assets/site/difficulty_hard.png" title="很难飞" width="20px" /></a></td> 
                                                            
                                                            <td>
                                                              飞行模式困难（易/困难）。
                                                            </td></tr> </tbody> </table> 
                                                            
                                                            <p>
                                                              缩写
                                                            </p>
                                                            
                                                            <ul>
                                                              <li>
                                                                RPY: 翻滚、俯仰、偏航
                                                              </li>
                                                              <li>
                                                                RPT：翻滚、俯仰、油门
                                                              </li>
                                                            </ul>