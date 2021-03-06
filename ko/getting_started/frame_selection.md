# 기체 선택

PX4는 항공, 지상 및 수상 수중 차량을 지원합니다. PX4와 호환되는 차량( "프레임")의 전체 목록은 [기체 정의서](../airframes/airframe_reference.md)에서 확인할 수 있습니다.

필요한 용도에 따라 적절한 프레임을 선택하십시오.

- **멀티 콥터**는 일반적으로 저속 단거리 비행용으로 정밀한 호버링 및 수직 이착륙이 가능합니다. PX4에는 간편 비행 모드를 제공합며, 가장 인기있는 비행체입니다.
- **고정익</ 0>은 장거리 고속 비행용으로 항공 감시 등에 적합합니다. 그러나, 멀티콥터보다 이착륙이 어렵고 호버링이나 저속 비행(예 : 수직 구조물을 조사)에는 적합하지 않습니다.</li> 
    
    - **VTOL** (수직 이착륙기)은 틸트로터, 테일 시터, 쿼드 플레인 등 다양한 유형으로 제공됩니다. 멀티콥터의 수직 이착륙 호버링의 장점과 고정익의 전방 비행 효율성의 장점을 가지고 있습니다. 멀티 콥터와 고정익 항공기보다 더 비싸고 제작과 조정이 더 어려울 수 있습니다.
    - **비행선/풍선**은 일반적으로 비행 속도와 방향을 제한적으로 (또는 전혀 제어하지 않는) 비용으로 높은 고도의 장기 비행을 위한 공기보다 가벼운 기체입니다.
    - **로버**는 자동차와 같은 지상 차량입니다. 제어가 용이하고, 사용하기 편리합니다.
    - **보트**는 수상 차량입니다.
    - **잠수정**은 수중 차량입니다.</ul> 
    
    :::note PX4의 초기 기체 설정은 *QGroundControl*을 사용합니다. : [기체 설정](../config/airframe.md)
    
    ![프레임 선택 ](../../assets/qgc/setup/airframe/airframe_px4.jpg)
:::