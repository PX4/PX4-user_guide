---
canonicalUrl: https://docs.px4.io/main/ko/config/motors
---

# 모터/서보 점검

기체를 설정후에는 모터 할당과 회전 방향, 서보 응답을 확인해야합니다. 이 작업은 * QGroundControl </ 0>의 [차량 설정 > 모터](https://docs.qgroundcontrol.com/en/SetupView/Motors.html) 탭에서 수행할 수 있습니다.</p>

다음 PX4 특정 동작에 유의하십시오.
- 안전 버튼을 쿨러야 모터 테스트를 할 수 있습니다.
- 중지 스위치를 사용하여 모터를 즉시 중지할 수 있습니다.
- 매개 변수 [COM_MOT_TEST_EN](../advanced_config/parameter_reference.md#COM_MOT_TEST_EN)을 사용하여 모터 테스트를 완전히 비활성화 할 수 있습니다.
- IO가 있는 보드에서는 MAIN 핀만 테스트할 수 있습니다.
- 셸에서 추가 옵션이 있는 [motor_test](../modules/modules_command.md#motortest)도 사용할 수 있습니다.

하나 이상의 모터가 구성된 [기체](../airframes/airframe_reference.md)에 따라 정해진 바른 방향으로 회전하야여 합니다. 회전 반향을 변경하는 방법은 아래와 같습니다.
- [DShot](../peripherals/dshot.md)을 지원하는 ESC를 사용하는 경우 [DShot 명령](../peripherals/dshot.md#commands)을 통해 방향을 바꿀 수 있습니다.
- 모터 케이블 3개 중 2개를 바꿉니다 (어떤 케이블이든 상관 없음). :::note 모터가 총알 커넥터를 통해 연결되지 않은 경우 납땜을 다시 하여야 합니다 (이러한 이유로 DShot ESC를 선호합니다).
:::

차량이 올바르게 설정되었는지 확인하려면 추가 검사를 수행하여야 합니다.
1. 프로펠러가 제거된 상태에서 [안정화 모드](../flight_modes/manual_stabilized_mc.md) (멀티콥터) 또는 [수동 모드](../flight_modes/manual_fw.md) (고정익)로 전환하고 기체의 시동을 거십시오.
1. 추진력을 약간 높여서 (차량이 자동으로 시동이 꺼지지 않기 위하여) 모터의 회전 속도가 증가하는 지 확인합니다.
1. 모든 모터가 최소 추진력으로 회전하는지 확인합니다.
1. 기체에 일러론이있는 경우 롤/피치 스틱 입력 명령을 내릴 때 올바른 방향으로 반응하는지 확인하십시오.

