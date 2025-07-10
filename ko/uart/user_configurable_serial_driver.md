---
canonicalUrl: https://docs.px4.io/main/ko/uart/user_configurable_serial_driver
---

# 설정 가능 직렬 포트 드라이버 구성

이 주제에서는 사용자가 비행체 제어 장치 보드의 설정 직렬 포트를 (매개변수를 설정하여) 동작하게 하는 방법을 설명합니다.

## 전제 조건

드라이버를 이미 설치했고, 다음 명령으로 셸을 시작한 상황을 가정합니다:
```sh
<driver_name> start -d <serial_port> [-b <baudrate> | -b p:<param_name>]
```
여기서,
- `-d`: 직렬 포트 이름.
- `-b`: 드라이버에서 다중 전송율을 지원할 경우 전송율(선택). 전송율 설정을 지원하는 경우 드라이버에서 `-b p:<param_name>`와 같이 전송율과 매개변수 이름으로 전송율을 지정할 수 있어야합니다(이 값은 `px4_get_parameter_value()`에서 해석 가능). > **Tip** 예제는 [GPS 드라이버](https://github.com/PX4/PX4-Autopilot/blob/master/src/drivers/gps/gps.cpp#L1023)를 참고하십시오.
:::


## 설정 가능 드라이버 구성

설정 가능 드라이버를 구성하려면:
1. YAML 모듈 설정 파일을 만드십시오:
   - 드라이버 소스 코드 디렉터리에 새 파일을 **module.yaml**로 만드십시오
   - 필요한 경우 다음 텍스트를 넣고 설정 값을 바꾸십시오:
     ```
     module_name: uLanding Radar
     serial_config:
         - command: ulanding_radar start -d ${SERIAL_DEV} -b p:${BAUD_PARAM}
           port_config_param:
             name: SENS_ULAND_CFG
             group: Sensors
     ```
:::note
모듈 설정 파일에 대한 완전한 내용은 [validation/module_schema.yaml](https://github.com/PX4/PX4-Autopilot/blob/master/validation/module_schema.yaml) 파일에서 찾아볼 수 있습니다. CI의 모든 설정 파일을 검증할 때도 활용합니다.
:::
1. 드라이버 모듈에 **CMakeLists.txt** 파일을 넣고 다음 모듈 설정 내용을 추가하십시오:
   ```
   px4_add_module(
    MODULE drivers__ulanding
    MAIN ulanding_radar
    SRCS
        ulanding.cpp
    MODULE_CONFIG
        module.yaml
    )
   ```

