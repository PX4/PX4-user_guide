# 비행 컨트롤러 및 센서 정렬

기본적으로 비행 컨트롤러(그리고 외부 나침반 센서)는 윗면이 위를 향하도록, 화살표가 기체 정면을 향하도록 프레임에 장착되어야 합니다. 보드나 외부 나침반 센서가 다른 방향으로 장착된 경우 펌웨어에서 이를 설정해야 합니다.

## 방향 계산

YAW, PITCH 및/또는 ROLL 오프셋은 기본 정방향(각각 Z, Y, X축을 중심으로 시계 방향)에 따라 계산됩니다. This frame is referred to as the *body frame* and the default orientation as `ROTATION_NONE`.

<img src="../../images/fc_orientation_1.png" style="width: 600px;" />

예를 들어, 아래에 표시된 차량은 `=0> 회전_70_RONE `,  회전_YAW_90>에 해당하는 Z축 주위로 회전합니다.</p>

<p><img src="../../images/yaw_rotation.png" alt="Yaw 회전" /></p>

<h2>방향 설정</h2>

<p>방향을 설정하려면</p>

<ol start="1">
<li><em>QGroundControl </em>을 시작하고 차량을 연결합니다.</li>
<li>Select the <strong>Gear</strong> icon (Vehicle Setup) in the top toolbar and then <strong>Sensors</strong> in the sidebar.</li>
<li><strong> 방향 설정 </strong> 버튼을 선택합니다.
<img src="../../images/qgc/setup/sensor_orientation_set_orientations.jpg" style="width: 600px;"/></li>
<li><p><strong> AutoPilot Orientation</strong>을 선택합니다(<a href="#calculating-orientation">위에서 계산함</a>으로서).
 
</p>

<p><img src="../../images/qgc/setup/sensor_orientation_selector_values.jpg" style="width: 200px;"/></p></li>
<li><p>동일한 방법으로 <strong> 외부 나침반 방향 </strong>을 선택합니다(이 옵션은 차량이 외부 나침반인 경우에만 표시됨).</p></li>
<li><strong>OK </strong>을 누릅니다.</li>
</ol>

<h2>미세 조정</h2>

<p>컨트롤러 방향에 작은 미스-정렬을 보상 하 고 비행 보기에서 수평선을 레벨 <a href="../config/level_horizon_calibration.md">수준 수평선 보정</a>을 사용할 수 있습니다.</p>

<h2>Further Information</h2>

<ul>
<li><a href="../advanced_config/advanced_flight_controller_orientation_leveling.md">방향 조정 고급</a> (고급 사용자만)입니다.</li>
<li><a href="https://docs.qgroundcontrol.com/en/SetupView/sensors_px4.html#flight_controller_orientation">QGroundControl User Guide > Sensors</a></li>
</ul>