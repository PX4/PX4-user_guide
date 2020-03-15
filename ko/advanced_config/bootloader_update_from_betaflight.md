# Betaflight 시스템에 부트로더 플래싱 하기

이 페이지 문서는 이미 Betaflight 로 미리 플래쉬 되어 있는 보드(예.[OmnibusF4 SD](../flight_controller/omnibus_f4_sd.md) or [Kakute F7](../flight_controller/kakutef7.md))에 PX4 부트로더를 플래쉬하는지에 관한 것 입니다.

부트로더를 플래슁하는 2가지 선택지가 있습니다: *Betaflight Configurator* 를 이용하는 것(쉬움) 과, 소스로 부터 빌드하는 방법이 있습니다.

### Betaflight Configurator를 이용하여 부트로더 갱신하기 {#betaflight_configurator}

*Betaflight Configurator*를 이용하여 PX4 부트로더 설치하기:

1. 미리 빌드된 부트로더 바이너리(플래쉬 하고자 하는 보드에 따라 다름) 를 다운 받아야 합니다.
2. 플랫폼에 맞게 [Betaflight Configurator](https://github.com/betaflight/betaflight-configurator/releases) 를 다운로드 합니다. > **Tip** 만약 *Chrome* 웹브라우저를 사용한다면, 간단한 크로스-플랫폼 대안은 configurator로 [여기서 확장](https://chrome.google.com/webstore/detail/betaflight-configurator/kdaghagfopacdngbohiknlhcocjccjao)을 설치하는 것 입니다. 
3. PC와 보드를 연결하고 Configurator를 실행합니다.
4. **Load Firmware [Local]** 버튼을 누릅니다. ![Betaflight Configurator - Local Firmware](../../assets/flight_controller/omnibus_f4_sd/betaflight_configurator.jpg)
5. 파일 시스템으로 부터 부트로더 바이너리를 선택하고 보드를 플래쉬 합니다.

이제 보드에 PX4 펌웨어를 설치 할 수 있습니다.

### Source를 이용하여 부트로더 갱신하기

#### 부트로더 소스 다운로드

다운로드 하고 [Bootloader](https://github.com/PX4/Bootloader) 빌드하기:

    git clone --recursive  https://github.com/PX4/Bootloader.git
    cd Bootloader
    make <target> # For example: omnibusf4sd_bl or kakutef7_bl
    

#### 부트로더 플래쉬하기

이제 당신은 [dfu-util](http://dfu-util.sourceforge.net/) 또는 윈도우용 그래픽컬 [dfuse](https://www.st.com/en/development-tools/stsw-stm32080.html) 툴을 이용하여 PX4 부트로더를 플래쉬 할 수 있습니다.

아래 방법으로 플래슁을 시도하는데 주저하지 않아도 됩니다.

> **Note** STM32 MCU는 벽돌이 되지 않습니다. DFU 는 플래싱 작업에 의해 덮어 씌워지지 않고 플래싱이 실패하더라도 새 펌웨어를 설치하도록 항상 허용할 것 입니다..

##### DFU 모드로 진입

보드가 DFU 모드로 진입하기 위해 두 가지 과정이 모두 요구 됩니다. DFU 모드로 진입하기 위해 USB 케이블로 컴퓨터와 연결 할때 까지 부트 버튼을 누르고 있습니다. 보드에 전원이 공급되면 버튼을 떼어 내도 욉니다.

##### dfu-util

    dfu-util -a 0 --dfuse-address 0x08000000 -D  build/<target>/<target>.bin
    

비행 컨트롤러를 재부팅 하고 부트 버튼을 누르지 않은 채로 부팅 되도록 합니다.

##### dfuse

이 링크의 dfuse 메뉴얼을 참고합니다: https://www.st.com/resource/en/user_manual/cd00155676.pdf

**<target>.bin** 파일을 플래쉬 합니다.

## Betaflight 재설치 하기 {#reinstall_betaflight}

*Betaflight*로 다시 돌아가는 방법:

- PX4 파라미터를 백업합니다, 예를 들어 이 파라미터 들을 [추출](https://dev.px4.io/master/en/advanced/parameters_and_configurations.html#exporting-and-loading-parameters)하여 SD 카드로 옮깁니다.
- **bootloader** 버튼을 누른 채 USB 케이블을 연결합니다.
- 그리고 *Betaflight-configurator*를 이용하여 원래대로 *Betaflight*를 플래시 합니다.