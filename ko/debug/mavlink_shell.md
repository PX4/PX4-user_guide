---
canonicalUrl: https://docs.px4.io/main/ko/debug/mavlink_shell
---

# MAVLink 쉘

MAVLink Shell은 직렬(USB/Telemetry) 또는 Wi-Fi(UDP/TCP)를 통하여 MAVLink에 접근할 수 있는 *NSH 콘솔*입니다(특히 Pixhawk, Pixracer, 등.).

쉘은 명령 및 모듈을 실행하고 출력을 표시합니다. 셸은 시작하지 않는 모듈의 출력을 *직접* 표시할 수 없지만, `dmesg` 명령(`dmesg -f &</ 1>은 작업 대기열에서 실행 중인 다른 모듈 및 작업의 출력을 표시할 수 있습니다.</p>

<p spaces-before="0">:::tip
<a href="#qgroundcontrol">QGroundControl MAVLink 콘솔</a>은 콘솔에 접근하기 가장 편리합니다.
시스템이 제대로 시작되지 않으면, <a href="../debug/system_console.md">시스템 콘솔</a>을 사용하여야 합니다.
:::</p>

<h2 spaces-before="0">쉘 열기</h2>

<a id="qgroundcontrol"></a>

<h3 spaces-before="0">QGroundControl MAVLink 콘솔</h3>

<p spaces-before="0">The easiest way to access shell is to use the <a href="https://docs.qgroundcontrol.com/master/en/analyze_view/mavlink_console.html">QGroundControl MAVLink Console</a> (see <strong x-id="1">Analyze View &#062; Mavlink Console</strong>).</p>

<h3 spaces-before="0">mavlink_shell.py</h3>

<p spaces-before="0"><strong x-id="1">mavlink_shell.py</strong> 스크립트를 사용하여 터미널에서 쉘에 접근할 수 있습니다.</p>

<ol start="1">
<li><em x-id="3">QGroundControl</em>을 종료합니다.</li>
<li><p spaces-before="0">패키지를 설치합니다.
<pre><code class="sh">   pip3 install --user pymavlink pyserial
`</pre></li>
1
터미널(PX4-Autopilot 디렉토리)을 열고, 쉘을 시작합니다.
   ```sh
   # For serial port
   ./Tools/mavlink_shell.py /dev/ttyACM0
   ```
</ol>
    ```sh
   # For Wi-Fi connection
   ./Tools/mavlink_shell.py 0.0.0.0:14550
   ```

사용 가능한 모든 인수에 대한 설명을 보려면, `mavlink_shell.py -h`를 사용하십시오.

## MAVLink 쉘 사용

자세한 내용은 [PX4 콘솔/쉘 > 콘솔/쉘 사용](../debug/consoles.md#using_the_console)을 참고하십시오.
