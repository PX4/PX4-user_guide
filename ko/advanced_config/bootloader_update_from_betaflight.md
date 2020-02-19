# Betaflight 시스템에 부트로더 플래싱 하기

이 페이지 문서는 이미 Betaflight 로 미리 플래쉬 되어 있는 보드(예.[OmnibusF4 SD](../flight_controller/omnibus_f4_sd.md) or [Kakute F7](../flight_controller/kakutef7.md))에 PX4 부트로더를 플래쉬하는지에 관한 것 입니다.

부트로더를 플래슁하는 2가지 선택지가 있습니다: *Betaflight Configurator* 를 이용하는 것(쉬움) 과, 소스로 부터 빌드하는 방법이 있습니다.

### Betaflight Configurator를 이용하여 부트로더 갱신하기 {#betaflight_configurator}

*Betaflight Configurator*를 이용하여 PX4 부트로더 설치하기:

1. You should have downloaded already the pre-built bootloader binary (this depends on the board you want to flash).
2. Download the [Betaflight Configurator](https://github.com/betaflight/betaflight-configurator/releases) for your platform. > **Tip** If using the *Chrome* web browser, a simple cross-platform alternative is to install the configurator as an [extension from here](https://chrome.google.com/webstore/detail/betaflight-configurator/kdaghagfopacdngbohiknlhcocjccjao). 
3. Connect the board to your PC and start the Configurator.
4. Press the **Load Firmware [Local]** button ![Betaflight Configurator - Local Firmware](../../assets/flight_controller/omnibus_f4_sd/betaflight_configurator.jpg)
5. Select the bootloader binary from the file system and then flash the board.

You should now be able to install PX4 firmware on the board.

### Source를 이용하여 부트로더 갱신하기

#### Download Bootloader Source

Download and build the [Bootloader](https://github.com/PX4/Bootloader) via:

    git clone --recursive  https://github.com/PX4/Bootloader.git
    cd Bootloader
    make <target> # For example: omnibusf4sd_bl or kakutef7_bl
    

#### Flash Bootloader

You can flash the PX4 bootloader using the [dfu-util](http://dfu-util.sourceforge.net/) or the graphical [dfuse](https://www.st.com/en/development-tools/stsw-stm32080.html) tool on windows.

Don't be afraid to try flashing using any of the methods below.

> **Note** The STM32 MCU cannot be bricked. DFU cannot be overwritten by flashing and will always allow you to install a new firmware, even if flashing fails.

##### DFU 모드로 진입

Both methods require the board to be in DFU mode. To enter DFU mode, hold the boot button down while connecting the USB cable to your computer. The button can be released after the board is powered up.

##### dfu-util

    dfu-util -a 0 --dfuse-address 0x08000000 -D  build/<target>/<target>.bin
    

Reboot the flight controller and it let it boot without holding the boot button.

##### dfuse

이 링크의 dfuse 메뉴얼을 참고합니다: https://www.st.com/resource/en/user_manual/cd00155676.pdf

**<target>.bin** 파일을 플래쉬 합니다.

## Betaflight 재설치 하기 {#reinstall_betaflight}

*Betaflight*로 다시 돌아가는 방법:

- PX4 파라미터를 백업합니다, 예를 들어 이 파라미터 들을 [추출](https://dev.px4.io/master/en/advanced/parameters_and_configurations.html#exporting-and-loading-parameters)하여 SD 카드로 옮깁니다.
- Keep the **bootloader** button pressed while attaching the USB cable
- Then flash *Betaflight* as usual with the *Betaflight-configurator*