# mRo Pixhawk 비행 컨트롤러 (Pixhawk 1)

* mRo Pixhawk <sup> & reg; </ 1> </ 0>은 원본 <a href="../flight_controller/pixhawk.md"> Pixhawk 1 </ 2>의 하드웨어 호환 버전입니다. It runs PX4 on the <a href="http://nuttx.org">NuttX</a> OS.</p> 

<blockquote>
  <p>
    컨트롤러는 3DR의 드롭 인 대체품으로 사용될 수 있습니다.
  </p>
</blockquote>

<p>
  

<span></span>

</p>

<blockquote>
  <p>
    가장 큰 차이점은 <a href="https://pixhawk.org/"> Pixhawk 프로젝트 </>> <strong> FMUv3 </ 0> 오픈 하드웨어 디자인을 기반으로한다는 점입니다. 원래의 Pixhawk 1 ~ 1MB의 플래시.</p> </blockquote> 
    
    <p>
      <img src="../../assets/flight_controller/mro/mro_pixhawk.jpg" alt="mRo Pixhawk 이미지" />
    </p>
    
    <p>
      PX4와 함께 사용하기위한 어셈블리 / 설정 지침은 다음과 같습니다 : <a href="../assembly/quick_start_pixhawk.md"> Pixhawk Wiring Quickstart </ 0></p> 
      
      <h2>
        Key Features
      </h2>
      
      <ul>
        <li>
          마이크로 프로세서: <ul>
            <li>
              FPU가있는 32 비트 STM32F427 코어 텍스 <sup> & reg; </ 0> M4 코어</li> 
              
              <li>
                168 MHz / 256 KB RAM / 2 MB 플래시
              </li>
              
              <li>
                32 비트 STM32F103 failsafe 코 프로세서
              </li></ul></li> 
              
              <li>
                Sensors: <ul>
                  <li>
                    ST Micro L3GD20 3-axis 16-bit gyroscope
                  </li>
                  <li>
                    ST Micro LSM303D 3-axis 14-bit accelerometer / magnetometer
                  </li>
                  <li>
                    Invensense<sup>&reg;</sup> MPU 6000 3-axis accelerometer/gyroscope
                  </li>
                  <li>
                    MEAS MS5611 barometer
                  </li>
                </ul>
              </li>
              
              <li>
                인터페이스: <ul>
                  <li>
                    5x UART (serial ports), one high-power capable, 2x with HW flow control
                  </li>
                  <li>
                    2x CAN
                  </li>
                  <li>
                    Spektrum DSM / DSM2 / DSM-X® Satellite compatible input up to DX8 (DX9 and above not supported)
                  </li>
                  <li>
                    Futaba<sup>&reg;</sup> S.BUS compatible input and output
                  </li>
                  <li>
                    PPM sum signal
                  </li>
                  <li>
                    RSSI (PWM or voltage) input
                  </li>
                  <li>
                    I2C
                  </li>
                  <li>
                    SPI
                  </li>
                  <li>
                    3.3 and 6.6V ADC inputs
                  </li>
                  <li>
                    External microUSB port
                  </li>
                </ul>
              </li>
              
              <li>
                <p>
                  전원 시스템 :
                </p>
                <ul>
                  <li>
                    자동 페일 오버 기능이있는 이상적인 다이오드 컨트롤러
                  </li>
                  <li>
                    서보 레일 고전력 (7V) 및 고전류 준비
                  </li>
                  <li>
                    모든 주변 장치 출력 과전류 보호, 모든 입력 ESD 보호
                  </li>
                </ul>
              </li>
              
              <li>
                <p>
                  무게와 크기 :
                </p>
                <ul>
                  <li>
                    무게 : 38g (1.31oz)
                  </li>
                  <li>
                    너비 : 50mm (1.96 ")
                  </li>
                  <li>
                    두께 : 15.5mm (.613 ")
                  </li>
                  <li>
                    길이 : 81.5mm (3.21")
                  </li>
                </ul>
              </li></ul> 
              
              <h2>
                Availability
              </h2>
              
              <ul>
                <li>
                  <a href="https://store.mrobotics.io/Genuine-PixHawk-1-Barebones-p/mro-pixhawk1-bb-mr.htm"> 베어 본 (Bare Bones) </ 0> - 보드 만 (3DR Pixhawk 대체품으로 유용합니다)</li> 
                  
                  <li>
                    <a href="https://store.mrobotics.io/Genuine-PixHawk-Flight-Controller-p/mro-pixhawk1-minkit-mr.htm"> mRo Pixhawk 2.4.6 필수 키트! </ 0> - 원격 측정을 제외한 모든 것</li> 
                    
                    <li>
                      <a href="https://store.mrobotics.io/product-p/mro-pixhawk1-fullkit-mr.htm"> mRo Pixhawk 2.4.6 쿨 키트! (한정판) </ 0> - 텔레 메 트리 라디오를 포함하여 필요한 모든 것</li> </ul> 
                      
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
                      
                      <pre><code>make px4fmu-v3_default
</code></pre>
                      
                      <h2>
                        Debug Ports
                      </h2>
                      
                      <p>
                        See <a href="../flight_controller/pixhawk.md#debug-ports">3DR Pixhawk 1 > Debug Ports</a>
                      </p>
                      
                      <h2>
                        Pinouts
                      </h2>
                      
                      <p>
                        See <a href="../flight_controller/pixhawk.md#pinouts">3DR Pixhawk 1 > Pinouts</a>
                      </p>
                      
                      <h2>
                        Schematics
                      </h2>
                      
                      <p>
                        The board is based on the <a href="https://pixhawk.org/">Pixhawk-project</a> <strong>FMUv3</strong> open hardware design.
                      </p>
                      
                      <ul>
                        <li>
                          <a href="https://github.com/PX4/Hardware/raw/master/FMUv3_REV_D/Schematic%20Print/Schematic%20Prints.PDF"> FMUv3 schematic </ 0> - 회로도 및 레이아웃</li> </ul> 
                          
                          <blockquote>
                            <p>
                              <strong>Note</strong> As a CC-BY-SA 3.0 licensed Open Hardware design, all schematics and design files are <a href="https://github.com/PX4/Hardware">available</a>.
                            </p>
                          </blockquote>