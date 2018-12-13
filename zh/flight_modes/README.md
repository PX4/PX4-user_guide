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
      纵转：
    </th>
    
    <th class="col_throttle">
      Throttle
    </th>
    
    <th class="col_sensor">
      位置传感器
    </th>
    
    <th class="col_summary">
      概览
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
        在遥控模式下，回正摇杆会将飞机置于直线和水平飞行，飞机的姿态、高度和直线飞行路径保持抗风（和其他力量）。 
        
        <ul>
          <li>
            回正摇杆使得水平飞行，沿着直线地面轨道在当前方向抗风。
          </li>
          <li>
            外部中心： <ul>
              <li>
                Pitch摇杆控制高度（与 <a href="#altitude_fw">Altitude</a>相同）。
              </li>
              <li>
                Roll摇杆控制滚动角度。 自动驾驶仪将保持 <a href="https://en.wikipedia.org/wiki/Coordinated_flight">配合飞行</a> （与 <a href="#stabilized_fw">稳定模式</0> 相同）。</li> 
                
                <li>
                  油门设置空速（与 <a href="#altitude_fw">姿态</a> 相同）。
                </li>
                
                <li>
                  Roll、pitch和yaw是角度控制的（因此不可能实现飞机滚转或环绕）。
                </li>
                
                <li>
                  Yaw杆操纵会驱动方向舵（指令将被加到自动驾驶仪计算的指令中以维持 <a href="https://en.wikipedia.org/wiki/Coordinated_flight">配合飞行</a>）。 这和 <a href="#stabilized_fw">稳定模式</a> 一样。
                </li></ul></li> </ul> </p> </td> </tr> 
                
                <tr id="altitude_fw">
                  <td>
                    <a href="../flight_modes/altitude_fw.md">姿态</a> 
                    
                    <p>
                      <a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="20px" /></a>
                    </p>
                  </td>
                  
                  <td>
                    <p>
                      S（Roll）
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
                      遥控模式如 <a href="#stabilized_fw">稳定</a> 模式, 但具有 <em>altitude稳定</em> （中心棒将飞机置于直线和水平飞行, 并保持当前高度）。 但是飞行过程并不稳定，可能被风吹飘离。 
                      
                      <ul>
                        <li>
                          回正RPY摇杆(内带): <ul>
                            <li>
                              自动驾驶仪保持与翼一直的高度水平。
                            </li>
                            <li>
                              如果连接了空速传感器，油门控制飞机的空速（如果没有空速传感器，用户就无法控制）。
                            </li>
                          </ul>
                          <li>
                            外部中心： <ul>
                              <li>
                                Pitch摇杆控制高度。
                              </li>
                              <li>
                                油门控制着飞机的空速 （如回正的RPY摇杆）。
                              </li>
                              <li>
                                Yaw杆操纵会驱动方向舵（指令将被加到自动驾驶仪计算的指令中以维持 <a href="https://en.wikipedia.org/wiki/Coordinated_flight">配合飞行</a>）。 这和 <a href="#stabilized_fw">稳定模式</a> 一样。
                              </li>
                            </ul>
                          </li></ul> </p> </td> </tr> 
                          <tr id="stabilized_fw">
                            <td>
                              <a href="../flight_modes/stabilized_fw.md">稳定</a> 
                              
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
                                遥控模式，其中中心RP棒水平飞机的姿态（滚动和俯仰）。 但是飞行过程和姿态并不稳定，可能被风吹飘离。
                              </p>
                              
                              <ul>
                                <li>
                                  Pitch摇杆控制俯仰角度。
                                </li>
                                <li>
                                  Roll摇杆控制滚动角度。 自动驾驶仪将保持 <a href="https://en.wikipedia.org/wiki/Coordinated_flight">协调飞行</a>。
                                </li>
                                <li>
                                  油门摇杆控制油门。
                                </li>
                                <li>
                                  Yaw杆操纵会驱动方向舵（指令将被加到自动驾驶仪计算的指令中以维持 <a href="https://en.wikipedia.org/wiki/Coordinated_flight">配合飞行</a>）。
                                </li>
                              </ul>
                            </td>
                          </tr>
                          
                          <tr id="acro_fw">
                            <td>
                              <a href="../flight_modes/acro_fw.md">特技</a> 
                              
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
                                用于执行杂技动作的遥控模式，例如滚动、翻转、摊位和杂技图形。
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
                                遥控模式，其中摇杆输入直接发送到输出混频器（用于 "完全" 手动控制）。
                              </p>
                              
                              <p>
                                这是覆盖FMU（命令通过安全协处理器发送）的唯一模式。 它提供了一个安全机制，允许在FMU固件出现故障时，通过遥控完全控制油门、电梯、副翼和舵。
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
                              <a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a>
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
                              <a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a>
                            </td>
                            
                            <td>
                              飞机启动了 <a href="../flying/fixed_wing_landing.md">固定翼着陆</a> 序列。
                            </td>
                          </tr>
                          
                          <tr id="hold_fw">
                            <td>
                              <a href="../flight_modes/hold.md">保持</td> 
                              
                              <td colspan="3">
                                自动
                              </td>
                              
                              <td>
                                <a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a>
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
                                  <a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a>
                                </td>
                                
                                <td>
                                  飞机飞行到一个安全的高度，然后返回到它起始位置。
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
                                  <a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a>
                                </td>
                                
                                <td>
                                  飞机执行已上传到飞行控制器的 <a href="../flying/missions.md">预定义的飞行计划</a>。
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
                                    纵转：
                                  </th>
                                  
                                  <th>
                                    Throttle
                                  </th>
                                  
                                  <th>
                                    位置传感器
                                  </th>
                                  
                                  <th class="col_summary">
                                    概览
                                  </th>
                                </tr></tr> 
                                
                                <tr id="position_mc">
                                  <td>
                                    位置 
                                    
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
                                      遥控模式，其中RPT摇杆控制 <em>速度</em> 在相应的方向。 中心摇杆水平飞机, 并保持它的固定位置和高度逆风。 
                                      
                                      <ul>
                                        <li>
                                          回正的RPT摇杆保持X、Y、Z位置稳定抗风和水平的姿态。
                                        </li>
                                        <li>
                                          外部中心： <ul>
                                            <li>
                                              Roll/Pitch摇杆控制相对于飞机”前部“的左右前后方向的速度。
                                            </li>
                                            <li>
                                              油门摇杆控制速度的上升。
                                            </li>
                                            <li>
                                              YAW摇杆控制水平面上方的角度旋转速率。
                                            </li>
                                          </ul>
                                        </li>
                                      </ul></li> </ul>
                                    </p>
                                  </td>
                                </tr>
                                
                                <tr id="altitude_mc">
                                  <td>
                                    <a href="../flight_modes/altitude_mc.md">姿态</a> 
                                    
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
                                      遥控模式如 <a href="#manual_stabilized_mc">手动/稳态</a> 模式, 但具有 <em>姿态稳定</em>（回正摇杆的水平飞机,并将其保持在固定高度）。 水平位置可能会受风的影响（或已经存在的动量）。 
                                      
                                      <ul>
                                        <li>
                                          回正摇杆（内带死区）： <ul>
                                            <li>
                                              RPY摇杆使飞机水平。
                                            </li>
                                            <li>
                                              油门（~50%）抗风保持当前姿态。
                                            </li>
                                          </ul>
                                          <li>
                                            外部中心： <ul>
                                              <li>
                                                Roll/Pitch摇杆控制各自方向的倾斜角，导致左右和前后的移动。
                                              </li>
                                              <li>
                                                油门摇杆以预定的最大速率（和其他轴上的移动速度）控制上升速度。
                                              </li>
                                              <li>
                                                YAW摇杆控制水平面上方的角度旋转速率。
                                              </li>
                                            </ul>
                                          </li></ul> </p> </td> </tr> 
                                          <tr id="manual_stabilized_mc">
                                            <td>
                                              <a href="../flight_modes/manual_stabilized_mc.md">手动/稳定</a> 
                                              
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
                                                遥控模式，回正摇杆保持飞机水平（仅-位置不稳定）。
                                              </p>
                                              
                                              <p>
                                                <ul>
                                                  <li>
                                                    回正RP摇杆使飞机水平。
                                                  </li>
                                                  <li>
                                                    外部中心： <ul>
                                                      <li>
                                                        Roll/Pitch摇杆控制各自方向的倾斜角，导致左右和前后的移动。
                                                      </li>
                                                      <li>
                                                        油门摇杆控制上升速度 （和其他轴的移动速度）。
                                                      </li>
                                                      <li>
                                                        YAW摇杆控制水平面上方的角度旋转速率。
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
                                                        遥控模式允许飞行员在大多数情况下使用 <a href="#manual_stabilized_mc">手动/稳定</a> 飞行，但仍在执行 <a href="#acro_mc">特技模式</a> - 风格的翻转和技巧。 回正摇杆使飞机水平。 
                                                        
                                                        <ul>
                                                          <li>
                                                            在模式阈值（比如 <a href="#manual_stabilized_mc">手动/稳定模式</a>）之内的摇杆。 <ul>
                                                              <li>
                                                                回正RP摇杆使飞机水平。 Roll/Pitch摇杆控制各自方向的倾斜角，导致左右和前后的移动。
                                                              </li>
                                                            </ul>
                                                          </li>
                                                          <li>
                                                            阈值之外的摇杆（比如<a href="#acro_mc">特技模式</a>）： <ul>
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
                                                        用于执行特技动作的遥控模式，例如翻转，滚转和环绕。
                                                      </p>
                                                      
                                                      <p>
                                                        RPY摇杆输入控制围绕各自轴的角度旋转速率。 油门直接传递到输出混频器。 当操纵杆居中时，飞机将停止旋转，但保持其当前朝向（在其侧面，倒置或任何其他方向）并根据当前动量移动。
                                                      </p>
                                                    </td>
                                                  </tr>
                                                  
                                                  <tr id="takeoff_mc">
                                                    <td>
                                                      <a href="../flight_modes/takeoff.md">起飞</a>
                                                    </td>
                                                    
                                                    <td colspan="3">
                                                      自动
                                                    </td>
                                                    
                                                    <td>
                                                      <a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a>
                                                    </td>
                                                    
                                                    <td>
                                                      飞机上升到起飞高度并保持位置。
                                                    </td>
                                                  </tr>
                                                  
                                                  <tr id="land_mc">
                                                    <td>
                                                      <a href="../flight_modes/land.md">降落</a>
                                                    </td>
                                                    
                                                    <td colspan="3">
                                                      自动
                                                    </td>
                                                    
                                                    <td>
                                                      <a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a>
                                                    </td>
                                                    
                                                    <td>
                                                      飞机降落在模式指定的位置。
                                                    </td>
                                                  </tr>
                                                  
                                                  <tr id="hold_mc">
                                                    <td>
                                                      <a href="../flight_modes/hold.md">保持</td> 
                                                      
                                                      <td colspan="3">
                                                        自动
                                                      </td>
                                                      
                                                      <td>
                                                        <a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a>
                                                      </td>
                                                      
                                                      <td>
                                                        飞机在当前GPS位置和高度盘旋。
                                                      </td></tr> 
                                                      
                                                      <tr id="return_mc">
                                                        <td>
                                                          <a href="../flight_modes/return.md">返回</a>
                                                        </td>
                                                        
                                                        <td colspan="3">
                                                          自动
                                                        </td>
                                                        
                                                        <td>
                                                          <a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a>
                                                        </td>
                                                        
                                                        <td>
                                                          飞机飞行到一个安全的高度，然后返回到它起始位置。
                                                        </td>
                                                      </tr>
                                                      
                                                      <tr id="mission_mc">
                                                        <td>
                                                          <a href="../flight_modes/mission.md">任务</a>
                                                        </td>
                                                        
                                                        <td colspan="3">
                                                          自动
                                                        </td>
                                                        
                                                        <td>
                                                          <a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a>
                                                        </td>
                                                        
                                                        <td>
                                                          飞机执行已上传到飞行控制器的 <a href="../flying/missions.md">预定义的飞行计划</a>。
                                                        </td>
                                                      </tr>
                                                      
                                                      <tr id="followme_mc">
                                                        <td>
                                                          <a href="../flight_modes/follow_me.md">跟随</a>
                                                        </td>
                                                        
                                                        <td colspan="3">
                                                          自动
                                                        </td>
                                                        
                                                        <td>
                                                          <a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a>
                                                        </td>
                                                        
                                                        <td>
                                                          飞机自动跟随运行QGC的Android手机/平板电脑的用户。
                                                        </td>
                                                      </tr>
                                                      
                                                      <tr id="offboard_mc">
                                                        <td>
                                                          <a href="../flight_modes/offboard.md">离板</a>
                                                        </td>
                                                        
                                                        <td colspan="3">
                                                          自动
                                                        </td>
                                                        
                                                        <td>
                                                          <a href="#key_position_fixed"><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" /></a>
                                                        </td>
                                                        
                                                        <td>
                                                          飞机服从通过MAVLink提供的位置、速度或姿态设定值（通常来自通过串行电缆或WIFI连接的配套计算机）。
                                                        </td>
                                                      </tr></tbody></table> 
                                                      
                                                      <h2>
                                                        VTOL
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
                                                            Description
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
                                                            <span id="key_position_fixed"></span><img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="20px" />
                                                          </td>
                                                          
                                                          <td>
                                                            测量位置高度的传感器需要例如光流、GPS + 气压计、视膜惯性静电测量。
                                                          </td>
                                                        </tr>
                                                        
                                                        <tr>
                                                          <td>
                                                            <span id="altitude_only"></span><img src="../../assets/site/altitude_icon.svg" title="Altitude fix required (e.g. barometer, rangefinder)" width="20px" />
                                                          </td>
                                                          
                                                          <td>
                                                            测量所需高度的传感器，例如气压计、测距仪。
                                                          </td>
                                                        </tr>
                                                        
                                                        <tr>
                                                          <td>
                                                            <span id="key_difficulty"><a href="#key_difficulty"><img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="20px" />&nbsp;<img src="../../assets/site/difficulty_medium.png" title="Medium difficulty to fly" width="20px" />&nbsp;<img src="../../assets/site/difficulty_hard.png" title="Hard to fly" width="20px" /></a></td> 
                                                            
                                                            <td>
                                                              飞行模式困难（易/困难）。
                                                            </td></tr> </tbody> </table> 
                                                            
                                                            <p>
                                                              缩写
                                                            </p>
                                                            
                                                            <ul>
                                                              <li>
                                                                RPY: Roll, Pitch, Yaw
                                                              </li>
                                                              <li>
                                                                RPT: Roll, Pitch Throttle
                                                              </li>
                                                            </ul>