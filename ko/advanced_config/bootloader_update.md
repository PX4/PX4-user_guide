# 부트 로더 업데이트

FMUv2를 기반으로 한 초기 [Pixhawk 시리즈](../flight_controller/pixhawk_series.md#fmu-versions) 비행 컨트롤러에는 1MB의 플래시 메모리 사용을 제한하는 하드웨어 문제([Silicon Errata](../flight_controller/silicon_errata.md#fmuv2--pixhawk-silicon-errata))가 있었습니다. The problem was fixed on newer hardware, so it can now (in theory) install FMUv3 Firmware and access all 2MB available memory.

불행히도 일부 보드는 하드웨어 문제가 있는지 여부를 감지 할 수없는 오래된 부트 로더가있는 공장에서 나옵니다. 결과적으로 메모리 제한 FMUv2 펌웨어를 사용해야합니다.

이 항목에서는 호환 가능한 보드에서 FMUv3 펌웨어를 사용할 수 있도록 부트 로더를 최신 버전으로 업데이트하는 방법에 대해 설명합니다.

### 주요 단계

다음 재시작시 SYS_BL_UPDATE 매개 변수를 설정하여 부트 로더 업데이트를 시작할 수 있습니다.

부트 로더를 업데이트:

1. SD 카드를 삽입하십시오 (문제를 디버깅하려면 부팅 로깅을 활성화하십시오).
2. 펌웨어를 PX4 마스터 버전으로 업데이트하십시오 (펌웨어를 업데이트 할 때 고급 설정을 선택한 다음 드롭 다운 목록에서 개발자 빌드 (마스터)를 선택하십시오). QGroundControl은 하드웨어가 FMUv2를 지원하는지 확인하고 적절한 펌웨어를 설치합니다. 
    
    ![FMUv2 업데이트](../../assets/qgc/setup/firmware/bootloader_update.jpg)
    
    차량이 재부팅 될 때까지 기다리십시오.

3. SYS_BL_UPDATE 매개 변수를 찾아서 활성화하십시오.

4. 재부팅 (보드 연결 해제 / 다시 연결). 부트 로더 업데이트에는 몇 초 밖에 걸리지 않습니다.
5. 그런 다음 펌웨어를 다시 업데이트하십시오. 이번에는 QGroundControl이 하드웨어를 FMUv3으로 자동 감지하고 펌웨어를 적절히 업데이트해야합니다.
    
    ![FMUv3 업데이트](../../assets/qgc/setup/firmware/bootloader_fmu_v3_update.jpg)
    
    > 참고 하드웨어에 Silicon Errata가 있으면 FMUv2로 감지되어 FMUv2가 다시 설치되었음을 알 수 있습니다 (콘솔에 있음). 이 경우 FMUv3 하드웨어를 설치할 수 없습니다.