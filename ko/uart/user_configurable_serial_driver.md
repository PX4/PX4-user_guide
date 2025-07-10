---
canonicalUrl: https://docs.px4.io/main/ko/uart/user_configurable_serial_driver
---

# 사용자 설정 가능 직렬 포트 드라이버 제작

비행 콘트롤러에서 설정 가능 직렬 포트에서 실행되도록 사용자가 (매개변수를 통하여) 구성할 수 있도록 직렬 드라이버를 설정하는 방법을 설명합니다.

## 전제 조건

제공되는 드라이버를 사용하여, 쉘에서 다음 명령어로 시작합니다.
```sh
<driver_name> start -d <serial_port> [-b <baudrate> | -b p:<param_name>]
```
여기서,
- `-d`: 직렬 포트 이름
- `-b`: 드라이버가 다중 전송 속도를 지원하는 경우 전송 속도(선택 사항). 지원되는 경우 드라이버는 `-bp:<param_name>` 형식(`px4_get_parameter_value()으로 구문 분석할 수 있음)의 매개변수 이름과 기본 전송 속도를 지정할 수 있어야 합니다. `). :::tip 샘플은 [GPS 드라이버](https://github.com/PX4/PX4-Autopilot/blob/master/src/drivers/gps/gps.cpp#L1023)를 참조하십시오.
:::


## 설정 가능 드라이버 제작

드라이버를 설정 가능하게 하려면:
1. YAML 모듈 구성 파일을 만듭니다.
   - 드라이버의 소스 디렉토리에 **module.yaml** 파일을 추가합니다.
   - 다음 텍스트를 삽입하고 필요에 따라 조정합니다.
     ```
     module_name: uLanding Radar
     serial_config:
         - command: ulanding_radar start -d ${SERIAL_DEV} -b p:${BAUD_PARAM}
           port_config_param:
             name: SENS_ULAND_CFG
             group: Sensors
     ```
:::note
모듈 구성 파일의 전체 매뉴얼은 [validation/module_schema.yaml](https://github.com/PX4/PX4-Autopilot/blob/master/validation/module_schema.yaml) 파일을 참고하십시오. 이 파일은 CI의 모든 설정 파일을 검증에도 사용됩니다.
:::
1. 드라이버 모듈의 **CMakeLists.txt** 파일에 모듈 구성을 추가합니다.
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

