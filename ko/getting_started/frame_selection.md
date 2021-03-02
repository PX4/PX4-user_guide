# 기체 선택

PX4는 항공, 지상 및 수중 차량을 지원합니다. PX4와 호환되는 차량( "프레임")의 전체 목록은 [기체 정의서](../airframes/airframe_reference.md)에서 확인할 수 있습니다.

필요한 용도에 따라 적절한 프레임을 선택하십시오.

- **멀티 콥터**는 일반적으로 저속 단거리 비행용으로 정밀한 호버링 및 수직 이착륙이 가능합니다. PX4 has modes that make them easy to fly, and they are the most popular type of flying vehicle.
- **Fixed wing** airplanes offer longer and faster flight, and hence better coverage for ground surveys etc. However they are harder to fly and land than multicopters, and aren't suitable if you need to hover or fly very slowly (e.g. when surveying vertical structures).
- **VTOL** (Vertical Takeoff and Landing) aircraft come in a number of types: tiltrotors, tailsitters, quadplanes etc. They offer the best of both worlds: take off in vertical mode like a multicopter and then transition in forward flight like an airplane. They are often more expensive than either multicopters and fixed wing aircraft, and harder to build and tune.
- **Airships/Balloons** are lighter-than-air vehicles that typically offer high altitude long duration flight, often at the cost of having limited (or no) control over speed and direction of flight.
- **Rovers** are car-like ground vehicles. They are simple to control and often fun to use.
- **Boats** are water-surface vehicles.
- **Submersibles** are underwater vehicles.

:::note
The airframe settings used by PX4 are configured in *QGroundControl* during initital setup: [Airframe setup](../config/airframe.md).

![Frame Selection](../../assets/qgc/setup/airframe/airframe_px4.jpg)
:::