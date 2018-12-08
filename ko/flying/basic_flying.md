# Flying 101

이 항목에서는 수동 또는 자동 조종 보조 비행 모드 (자율 비행의 경우 :  Missions </ 1> 참조)에서  RC 송신기 </ 0>를 사용하여 차량을 비행하는 기본 사항에 대해 설명합니다</p> 

> ** 참고 </ 0> 처음 비행하기 전에  첫 비행 지침 </ 1>을 읽어야합니다.</p> </blockquote> 
> 
> ## 비행 제어 / 명령
> 
> 이륙과 착륙을 포함한 모든 비행은 롤, 요, 피치 및 스로틀의 4 가지 기본 명령을 사용하여 제어됩니다.
> 
> ![RC 기본 명령](../../images/rc_basic_commands.png)
> 
> 항공기를 제어하려면 기본 롤, 피치, 요 및 스로틀 명령이 3D 공간에서의 이동에 미치는 영향을 이해해야합니다 이것은 당신이 비행기와 같이 앞으로 비행하는 항공기를 제어하는지 아니면 다중기처럼 "공중 선회 항공기"를 제어하는지에 따라 다릅니다.
> 
> ### Hover Aircraft
> 
> 호버 항공기 (헬리콥터 모드, 호버 모드의 헬리콥터)는 다음과 같이 이동 명령에 응답합니다
> 
> ![기본 동작 Multicopter](../../images/basic_movements_multicopter.png)
> 
> * 피치 => 앞으로 / 뒤로.
> * 롤 => 왼쪽 / 오른쪽.
> * Yaw => 프레임 중앙을 중심으로 좌우로 회전.
> * Throttle => 변경된 고도 / 속도.
> 
> ### Forward-flying Aircraft
> 
> 전방 비행 항공기 (항공기, 전방 비행 중 VTOL)는 다음과 같이 이동 명령에 응답합니다
> 
> ![기본 움직임 전달](../../images/basic_movements_forward.png)
> 
> * 피치 => 위 / 아래.
> * 롤 => 왼쪽 / 오른쪽 및 차례.
> * Yaw => 왼쪽 / 오른쪽 꼬리 회전과 방향 전환.
> * 스로틀 => 전진 속도를 변경했습니다
> 
> > ** 참고 </ 0> 비행기의 가장 좋은 방향은 '코디네이트 된 턴'이라고하며, 롤과 작은 요를 동시에 사용하여 수행됩니다. 이 기동에는 경험이 필요합니다!</p> </blockquote> 
> > 
> > ## 보조 비행
> > 
> > 차량이 어떻게 제어되는지에 대한 이해가 있더라도, 완전 수동 모드에서의 비행은 상당히 용인 할 수 있습니다 새로운 사용자는 비행 모드를 사용하도록  송신기를 구성해야합니다 </ 0> 자동 조종 장치는 이상한 사용자 입력 또는 환경 요인을 자동으로 보완합니다.</p> 
> > 
> > 새 사용자에게 다음 세 가지 모드를 적극 권장합니다.
> > 
> > * Stabilized - 뒤집기가 힘든 차량, 그리고 스틱이 풀린 상태에서 수평을 유지합니다 (그러나 위치를 잡을 수는 없습니다).
> > * 고도 - 상승 및 하강이 최대 속도로 제어됩니다.
> > * 위치 - 스틱이 풀리면 차량이 멈 춥니 다 (바람 드리프트에 반대하는 위치를 유지)
> > 
> > > ** 팁 </ 0> * QGroundControl </ 1> 메인 비행 화면의 하단에있는 버튼을 통해 자동 모드에 액세스 할 수도 있습니다.</p> </blockquote> 
> > > 
> > > ## 이착륙
> > > 
> > > 가장 쉬운 방법은 자동  이륙 모드 </ 0>를 사용하는 것입니다 (차량 모터를 연결하기 전에 차량을 다룰 필요가 있다는 것을 기억하십시오). 자동으로 다시 착륙하려면  Land </ 0> 또는  Return </ 1> 모드를 사용할 수 있습니다.</p> 
> > > 
> > > > **Tip** The automatic takeoff/landing modes are highly recommended, in particular for Fixed Wing vehicles.
> > > 
> > > For multicopter (and VTOL in multicopter mode) pilots can:
> > > 
> > > *  위치 모드 </ 0>를 활성화하고 차량을 준비한 다음 수동으로 스로틀 스틱을 62.5 % 위로 올리면 수동으로 벗어납니다. 이 값을 초과하면 모든 컨트롤러가 활성화되고 차량이 호버링에 필요한 스로틀 수준 ( MPC_THR_HOVER </ 0>)으로 이동합니다</li> 
> > >     
> > >     * Land manually by pressing the throttle stick down until the vehicle lands and disarms (or set [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) > 0 to disarm automatically on landing).</ul> 
> > >     
> > >     > **Note** If you see the vehicle "twitch" during landing (turn down the motors, and then immediately turn them back up) this is probably caused by a poor [Land Detector Configuration](../advanced_config/land_detector.md) (specifically, a poorly set [MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER)).