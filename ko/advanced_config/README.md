# Sensor and Actuator I/O

This section contains topics about PX4 middleware, including PX4 internal communication mechanisms ([uORB](../middleware/uorb.md)), and between PX4 and offboard systems like companion computers and GCS (e.g. [MAVLink](../middleware/mavlink.md), [RTPS](../middleware/micrortps.md)).

> **팁** 이 항목은 새로운 기체 유형을 만들거나 지원되는 프레임을 크게 수정하는 경우에 유용합니다. 일반적으로 [지원되는 기체 프레임](../airframes/airframe_reference.md#copter)를 사용하는 경우 (예: [QGroundControl> Airframe](../config/airframe.md)의 프레임), 기본적인 튜닝 및 설정은 해당 프레임이 허용할 수 있는 범위여야 합니다.

This section contains topics about using ROS for offboard control with PX4.