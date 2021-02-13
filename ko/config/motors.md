# 모터/서보 점검

기체를 설정후에는 모터 할당과 회전 방향, 서보 응답을 확인해야합니다. 이 작업은 * QGroundControl </ 0>의 [차량 설정 > 모터](https://docs.qgroundcontrol.com/en/SetupView/Motors.html) 탭에서 수행할 수 있습니다.</p>

다음 PX4 특정 동작에 유의하십시오.
- 안전 버튼을 쿨러야 모터 테스트를 할 수 있습니다.
- 중지 스위치를 사용하여 모터를 즉시 중지할 수 있습니다.
- 매개 변수 [COM_MOT_TEST_EN](../advanced_config/parameter_reference.md#COM_MOT_TEST_EN)을 사용하여 모터 테스트를 완전히 비활성화 할 수 있습니다.
- IO가 있는 보드에서는 MAIN 핀만 테스트할 수 있습니다.
- 셸에서 추가 옵션이 있는 [motor_test](../modules/modules_command.md#motortest)도 사용할 수 있습니다.

If one or more of the motors do not turn in the correct direction according to the configured [airframe](../airframes/airframe_reference.md), they must be reversed. There are several options:
- If using ESCs that support [DShot](../peripherals/dshot.md) you can reverse the direction via [DShot commands](../peripherals/dshot.md#commands).
- Swap 2 of the 3 motor cables (it does not matter which ones). :::note If motors are not connected via bullet-connectors, re-soldering is required (this is a reason, among others, to prefer DShot ESCs).
:::

The following additional checks should be performed to validate that the vehicle is setup correctly:
1. With propellers still removed, switch to [Stabilised mode](../flight_modes/manual_stabilized_mc.md) (Multicopter) or [Manual mode](../flight_modes/manual_fw.md) (Fixed Wing) and arm the vehicle.
1. Increase the throttle a little (so the vehicle does not automatically disarm) and check that the motors respond to throttle changes.
1. Check that all motors spin at minimum throttle.
1. If the vehicle has ailerons, check if they are responding in the right directions when giving roll/pitch stick input commands.

