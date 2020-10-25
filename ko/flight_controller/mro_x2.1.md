# mRo-X2.1 자동 조종 장치

> **Warning** PX4 does not manufacture this (or any) autopilot. Contact the [manufacturer](https://store.mrobotics.io/) for hardware support or compliance issues. mRo-X2.1 자동 조종 장치는  Pixhawk <sup> & reg; </ 2> -project <strong> FMUv2 </ 3> 오픈 하드웨어 디자인을 기반으로합니다. It runs PX4 on the <a href="http://nuttx.org">NuttX</a> OS.</p> 

<p>
  <img src="../../assets/flight_controller/mro/mro_x2.1.jpg" alt="mRo X2.1" />
</p>

<blockquote>
  <p>
    <strong>Note</strong> This flight controller is <a href="../flight_controller/autopilot_manufacturer_supported.md">manufacturer supported</a>.
  </p>
</blockquote>

<h2>
  Quick Summary
</h2>

<ul>
  <li>
    Main System-on-Chip: <a href="http://www.st.com/web/en/catalog/mmc/FM141/SC1169/SS1577/LN1789">STM32F427</a> <ul>
      <li>
        CPU : STM32F427VIT6 ARM <sup> & reg; </ 0> 마이크로 컨트롤러 - 개정 3</li> 
        
        <li>
          IO: STM32F100C8T6 ARM <sup> & reg; </ 0> 마이크로 컨트롤러</li> </ul></li> 
          
          <li>
            Sensors: <ul>
              <li>
                Invensense <sup> & reg; </ 0> MPU9250 9DOF</li> 
                
                <li>
                  Invensense ICM-20602 6DOF
                </li>
                
                <li>
                  MEAS MS5611 barometer
                </li></ul></li> 
                
                <li>
                  Dimensions/Weight <ul>
                    <li>
                      크기: 36mm x 50mm (수직, 수평 또는 머리글이없는 상태에서 주문 가능)
                    </li>
                    <li>
                      Mounting Points: 30.5mm x 30.5mm 3.2mm diameter
                    </li>
                    <li>
                      Weight: 10.9g
                    </li>
                  </ul>
                </li></ul> 
                
                <p>
                  아래 다이어그램은 Pixhawk 1과 나란히 비교 한 것입니다. Mro는 거의 동일한 하드웨어 및 연결성을 특징으로하지만 공간이 훨씬 적습니다. 주요 차이점은 업데이트 된 센서 및 Rev 3 FMU입니다.
                </p>
                
                <p>
                  <img src="../../assets/flight_controller/mro/px1_x21.jpg" alt="Mro Pixhawk 1 대 X2.1 비교" />
                </p>
                
                <h2>
                  Connectivity
                </h2>
                
                <ul>
                  <li>
                    2.54mm headers:
                  </li>
                  <li>
                    GPS (UART4) with I2C
                  </li>
                  <li>
                    CAN Bus
                  </li>
                  <li>
                    RC input
                  </li>
                  <li>
                    PPM input
                  </li>
                  <li>
                    Spektrum input
                  </li>
                  <li>
                    RSSI input
                  </li>
                  <li>
                    sBus input
                  </li>
                  <li>
                    sBus output
                  </li>
                  <li>
                    Power input
                  </li>
                  <li>
                    Buzzer output
                  </li>
                  <li>
                    LED output
                  </li>
                  <li>
                    8 x Servo outputs
                  </li>
                  <li>
                    6 x Aux outputs
                  </li>
                  <li>
                    오프 보드 microUSB 커넥터
                  </li>
                  <li>
                    강제 종료 핀 출력 <em> (현재 펌웨어에서 지원되지 않음) </ 0></li> 
                    
                    <li>
                      AirSpeed 센서
                    </li>
                    
                    <li>
                      USART2 (Telem 1)
                    </li>
                    
                    <li>
                      USART3 (Telem 2)
                    </li>
                    
                    <li>
                      UART7 (Console)
                    </li>
                    
                    <li>
                      UART8 (OSD)
                    </li></ul> 
                    
                    <h2>
                      PX4 부트 로더 문제
                    </h2>
                    
                    <p>
                      기본적으로 mRo X2.1은 PX4보다는 ArduPilot <sup> & reg; </ 0>에 대해 사전 구성 될 수 있습니다. 이 보드가 X2.1 대신 FMUv2로 인식 될 때 펌웨어 업데이트 중에 볼 수 있습니다.</p> 
                      
                      <p>
                        이 경우 <a href="https://github.com/PX4/px4_user_guide/raw/master/assets/hardware/BL_Update_X21.zip"> BL_Update_X21.zip </ 0>을 사용하여 BootLoader를 업데이트해야합니다 이 캘리브레이션을 수행하지 않으면 나침반 방향이 잘못되어 보조 IMU는 감지되지 않습니다.</p> 
                        
                        <p>
                          업데이트 단계는 다음과 같습니다.
                        </p>
                        
                        <ol start="1">
                          <li>
                            <a href="https://github.com/PX4/px4_user_guide/raw/master/assets/hardware/BL_Update_X21.zip"> BL_Update_X21.zip </ 0>을 다운로드하고 추출하십시오.</li> 
                            
                            <li>
                              <em> BL_Update_X21 </ 0> 폴더를 찾으십시오. 여기에는 <strong> rc.txt </ 0> 파일이 들어있는 <strong> bin </ 0> 파일과 <strong> / etc </ 0>이라는 하위 폴더가 있습니다</li> 
                              
                              <li>
                                이 파일을 마이크로 SD 카드의 루트 디렉토리에 복사 한 다음 mRO x2.1에 삽입하십시오.
                              </li>
                              
                              <li>
                                Mro x2.1의 전원을 켜십시오. 부팅 할 때까지 기다렸다가 한 번 재부팅하십시오.
                              </li></ol> 
                              
                              <h2>
                                Availability
                              </h2>
                              
                              <p>
                                이 제품은 <a href="https://store.mrobotics.io/mRo-X2-1-Rev-2-p/mro-x2.1rv2-mr.htm"> mRobotics <sup> & reg; </ 1> 상점 </ 0>에서 주문할 수 있습니다.</p> 
                                
                                <h2>
                                  Wiring Guide
                                </h2>
                                
                                <p>
                                  <img src="../../assets/flight_controller/mro/mro_x21_wiring.png" alt="mRo_X2.1_Wiring" />
                                </p>
                                
                                <h2>
                                  Building Firmware
                                </h2>
                                
                                <blockquote>
                                  <p>
                                    <strong>Tip</strong> Most users will not need to build this firmware! It is pre-built and automatically installed by <em>QGroundControl</em> when appropriate hardware is connected.
                                  </p>
                                </blockquote>
                                
                                <p>
                                  To <a href="https://dev.px4.io/master/en/setup/building_px4.html">build PX4</a> for this target:
                                </p>
                                
                                <pre><code>make mro_x21_default
</code></pre>
                                
                                <h2>
                                  Schematics
                                </h2>
                                
                                <p>
                                  The board is documented on the mRo hardware repo: <a href="https://github.com/mRoboticsIO/Hardware/blob/master/X2.1/Docs/x21_V2_schematic.pdf">x21_V2_schematic.pdf</a>.
                                </p>
                                
                                <h2>
                                  Serial Port Mapping
                                </h2>
                                
                                <table>
                                  <tr>
                                    <th>
                                      UART
                                    </th>
                                    
                                    <th>
                                      Device
                                    </th>
                                    
                                    <th>
                                      Port
                                    </th>
                                  </tr>
                                  
                                  <tr>
                                    <td>
                                      USART1
                                    </td>
                                    
                                    <td>
                                      /dev/ttyS0
                                    </td>
                                    
                                    <td>
                                      IO debug
                                    </td>
                                  </tr>
                                  
                                  <tr>
                                    <td>
                                      USART2
                                    </td>
                                    
                                    <td>
                                      /dev/ttyS1
                                    </td>
                                    
                                    <td>
                                      SERIAL1
                                    </td>
                                  </tr>
                                  
                                  <tr>
                                    <td>
                                      USART3
                                    </td>
                                    
                                    <td>
                                      /dev/ttyS2
                                    </td>
                                    
                                    <td>
                                      TELEM2
                                    </td>
                                  </tr>
                                  
                                  <tr>
                                    <td>
                                      UART4
                                    </td>
                                    
                                    <td>
                                      /dev/ttyS3
                                    </td>
                                    
                                    <td>
                                      GPS/I2C
                                    </td>
                                  </tr>
                                  
                                  <tr>
                                    <td>
                                      USART6
                                    </td>
                                    
                                    <td>
                                      /dev/ttyS4
                                    </td>
                                    
                                    <td>
                                      PX4IO
                                    </td>
                                  </tr>
                                  
                                  <tr>
                                    <td>
                                      UART7
                                    </td>
                                    
                                    <td>
                                      /dev/ttyS5
                                    </td>
                                    
                                    <td>
                                      SERIAL5 CONSOLE
                                    </td>
                                  </tr>
                                  
                                  <tr>
                                    <td>
                                      UART8
                                    </td>
                                    
                                    <td>
                                      /dev/ttyS6
                                    </td>
                                    
                                    <td>
                                      SERIAL4
                                    </td>
                                  </tr>
                                </table>