# UAVCAN Introduction

This section contains topics about the serial bus and serial drivers:

> **팁** 이 항목은 새로운 기체 유형을 만들거나 지원되는 프레임을 크게 수정하는 경우에 유용합니다. 일반적으로 [지원되는 기체 프레임](../airframes/airframe_reference.md#copter)를 사용하는 경우 (예: [QGroundControl> Airframe](../config/airframe.md)의 프레임), 기본적인 튜닝 및 설정은 해당 프레임이 허용할 수 있는 범위여야 합니다.

PX4 supports both *Software In the Loop (SITL)* simulation, where the flight stack runs on computer (either the same computer or another computer on the same network) and *Hardware In the Loop (HITL)* simulation using a simulation firmware on a real flight controller board.