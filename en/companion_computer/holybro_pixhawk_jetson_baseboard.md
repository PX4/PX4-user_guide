# Holybro Pixhawk Jetson Baseboard

The [Holybro Pixhawk Jetson Baseboard](https://holybro.com/products/pixhawk-jetson-baseboard) integrates a Pixhawk flight controller and a NVIDIA Orin-series computer into a single package, significantly easing both hardware and software setup for using PX4 with a companion computer.

![Jetson Carrier with Pixhawk](../../assets/companion_computer/holybro_pixhawk_jetson_baseboard/hero_image.png)

The board comes with either the [Jetson Orin NX (16GB RAM)](https://holybro.com/products/nvidia-jetson-orin-nx-16g) or [Jetson Orin Nano (4GB RAM)](https://holybro.com/products/nvidia-jetson-orin-nx-16g?variant=44391410598077).
It can be used with any Pixhawk Autopilot Bus (PAB) specification-compliant Pixhawk flight controller, such as the Pixhawk 6 or Pixhawk 6X.

This guide walks through the process of setting up the board and connecting to PX4, including:

- Hardware setup
- Flashing the Jetson board
- Initial setup
- PX4 Firmware build and flash on Jetson
- ROS 2 Installation and Ethernet setup
- Pixhawk setup for enabling uXRCE-DDS connection to Jetson
- Testing uXRCE-DDS connection

## Purchase

- [Holybro Pixhawk Jetson Baseboard](https://holybro.com/products/pixhawk-jetson-baseboard)

There are options to select Pixhawk Autopilot and Jetson computer variants.
All boards come with WiFi module, camera, power module, separate UBEC, power distribution board (PDB).

## Specifications

This information comes from the [Holybro Pixhawk-Jetson Baseboard Documentation](https://docs.holybro.com/autopilot/pixhawk-baseboards/pixhawk-jetson-baseboard).

:::: tabs

::: tab Dimensions

[Dimensions and weight](https://docs.holybro.com/autopilot/pixhawk-baseboards/pixhawk-jetson-baseboard/dimension-and-weight) (Holybro)

- Dimensions

  - 126 x 80 x 45mm (with Jetson Orin NX + Heatsink/Fan & FC Module)
  - 126 x 80 x 22.9mm (without Jetson and FC Module)

- Weight
  - 190g (with Jetson, Heatsink, Flight Controller, M.2 SSD, M.2 Wi-Fi Module)

:::

::: tab Jetson connectors

- 2x Gigabit Ethernet Port

  - Connected to both Jetson & Autopilot via Ethernet switch (RTL8367S)
  - Ethernet Switch powered by the same circuit as the Pixhawk
  - 8-pin JST-GH
  - RJ45

- 2x MIPI CSI Camera Inputs

  - 4 Lanes each
  - 22-Pin Raspberry Pi Cam FFC

- 2x USB 3.0 Host Port

  - USB A
  - 5A Current Limit

- 2x USB 2.0 Host Port

  - 5-Pin JST-GH
  - 0A Current Limit

- USB 2.0 for Programming/Debugging

  - USB-C

- 2 Key M 2242 for NVMe SSD

  - PCIEx4

- 2 Key E 2230 for WiFi/BT

  - PCIEx2
  - USB
  - UART
  - I2S

- Mini HDMI Out

- 4x GPIO

  - 6-pin JST-GH

- CAN Port

  - Connected to Autopilot's CAN2 (4 Pin JST-GH)

- SPI Port

  - 7-Pin JST-GH

- I2C Port

  - 4-Pin JST-GH

- I2S Port

  - 7-Pin JST-GH

- 2x UART Port

  - 1 for debug
  - 1 connected to Autopilot's telem2

- Fan Power Port

- IIM42652 IMU

:::

::: tab Autopilot connectors

- Pixhawk Autopilot Bus Interface

  - 100 Pin Hirose DF40
  - 50 Pin Hirose DF40

- Redundant Digital Power Module Inputs

  - I2C Power Monitor Support
  - 2x 6-Pin Molex CLIK-Mate

- Power Path Selector

- Overvoltage Protection

- Voltage Ratings

  - Max input voltage: 6V
  - USB Power Input: 4.75~5.25V

- Full GPS Plus Safety Switch Port

  - 10-Pin JST-GH

- Secondary (GPS2) Port

  - 6-Pin JST-GH

- 2x CAN Ports

  - 4-Pin JST-GH

- 3x Telemetry Ports with Flow Control

  - 2x 6-Pin JST-GH
  - 1 is connected to Jetson's `UART1` Port

- 16 PWM Outputs

  - 2x 10-Pin JST-GH

- UART4 & I2C Port

  - 6-Pin JST-GH

- 2x Gigabit Ethernet Port

  - Connected to both Jetson & Autopilot via Ethernet switch (RTL8367S)
  - 8-Pin JST-GH
  - RJ45

- AD & IO

  - 8-Pin JST-GH

- USB 2.0

  - USB-C
  - 4-Pin JST-GH

- DSM Input

  - 3-Pin JST-ZH 1.5mm Pitch

- RC In

  - PPM/SBUS
  - 5-Pin JST-GH

- SPI Port

  - External Sensor Bus (SPI5)
  - 11-Pin JST-GH

- 2x Debug Port

  - 1 for FMU
  - 1 for IO
  - 10-Pin JST-SH

:::

::: tab Power (baseboard)

The Jetson power connection on Holybro's board uses XT30 plug and has separate input power circuitry from the Pixhawk autopilot.

- 8V/3A Minimum (Depends on Usage and Peripherals)
- Voltage Rating: 7-21V (3S-4S)
- Jetson Baseboard onboard BEC is rated for 7-21V (3S-4S).
  Note that the external UBEC-12A can be used for applications above 4S

During development using the following wired power supply is recommended:

- [Power Adapter for Jetson Orin](https://holybro.com/products/power_adapter_for_jetson_orin)

The complete power supply block diagram is shown below:

![Jetson Carrier Power Diagram](../../assets/companion_computer/holybro_pixhawk_jetson_baseboard/peripherals_block_diagram_1.png)

:::

::: tab Power (UBEC-12A)

The separate Holybro UBEC 12A (3-14S) BEC can be used for higher power applications (4S).
This can provide more power than the internal baseboard BEC, and provides redundancy and easier replacement in case of BEC failure.

Power ratings:

- Input voltage: 3~14S (XT30)
- Output voltage: 6.0V/7.2V/8.0V/9.2V (recommend 7.2V if supplying power to Jetson Board)
- Output Current
- Continuous: 12A
- Burst: 24A

Dimensions

- Size: 48x33.6x16.3 mm
- Weight: 47.8g

:::

::::

## Pinouts

![Jetson Pinouts](../../assets/companion_computer/holybro_pixhawk_jetson_baseboard/jetson_pinout.png)

::: details Power ports

### Power 1 (Main), Power 2 Ports

(2.00mm Pitch CLIK-Mate)

| Pin       | Signal              | Voltage |
| :-------- | :------------------ | :------ |
| 1 (red)   | VDD5V_BRICK1/2(in)  | +5V     |
| 2 (black) | VDD5V_BRICK1/2 (in) | +5V     |
| 3 (black) | SCL1/2              | +3.3V   |
| 4 (black) | SDA1/2              | +3.3V   |
| 5 (black) | GND                 | GND     |
| 6 (black) | GND                 | GND     |

:::

::: details Pixhawk ports

### Tel1, Tel3 Ports

| Pin       | Signal      | Voltage |
| :-------- | :---------- | :------ |
| 1 (red)   | VCC (out)   | +5V     |
| 2 (black) | TX7/2(out)  | +3.3V   |
| 3 (black) | RX7/2(in)   | +3.3V   |
| 4 (black) | CTS7/2(in)  | +3.3V   |
| 5 (black) | RTS7/2(out) | +3.3V   |
| 6 (black) | GND         | GND     |

### CAN1, CAN2 Ports

| Pin       | Signal    | Voltage |
| :-------- | :-------- | :------ |
| 1 (red)   | VCC (out) | +5V     |
| 2 (black) | CANH1/2   | +3.3V   |
| 3 (black) | CANL1/2   | +3.3V   |
| 4 (black) | GND       | GND     |

### GPS1 Port

| Pin        | Signal            | Voltage |
| :--------- | :---------------- | :------ |
| 1 (red)    | VCC (out)         | +5V     |
| 2 (black)  | TX1(out)          | +3.3V   |
| 3 (black)  | RX1(in)           | +3.3V   |
| 4 (black)  | SCL1              | +3.3V   |
| 5 (black)  | SDA1              | +3.3V   |
| 6 (black)  | SAFETY_SWITCH     | +3.3V   |
| 7 (black)  | SAFETY_SWITCH_LED | +3.3V   |
| 8 (black)  | VDD_3V3           | +3.3V   |
| 9 (black)  | BUZZER-           | 0\~5V   |
| 10 (black) | GND               | GND     |

### GPS2 Port

| Pin       | Signal    | Voltage |
| :-------- | :-------- | :------ |
| 1 (red)   | VCC (out) | +5V     |
| 2 (black) | TX8(out)  | +3.3V   |
| 3 (black) | RX8(in)   | +3.3V   |
| 4 (black) | SCL2      | +3.3V   |
| 5 (black) | SDA2      | +3.3V   |
| 6 (black) | GND       | GND     |

### UART4 & I2C Port

(shown as UART\&I2C on some boards)

| Pin       | Signal    | Voltage |
| :-------- | :-------- | :------ |
| 1 (red)   | VCC (out) | +5V     |
| 2 (black) | TX4(out)  | +3.3V   |
| 3 (black) | RX4(in)   | +3.3V   |
| 4 (black) | SCL3      | +3.3V   |
| 5 (black) | SDA3      | +3.3V   |
| 6 (black) | NFC_GPIO  | +3.3V   |
| 7 (black) | GND       | GND     |

### SPI Port

| Pin        | Signal      | Voltage |
| :--------- | :---------- | :------ |
| 1 (red)    | VCC (out)   | +5V     |
| 2 (black)  | SPI6_SCK    | +3.3V   |
| 3 (black)  | SPI6_MISO   | +3.3V   |
| 4 (black)  | SPI6_MOSI   | +3.3V   |
| 5 (black)  | SPI6_CS1    | +3.3V   |
| 6 (black)  | SPI6_CS2    | +3.3V   |
| 7 (black)  | SPIX_SYNC   | +3.3V   |
| 8 (black)  | SPI6_DRDY1  | +3.3V   |
| 9 (black)  | SPI6_DRDY2  | +3.3V   |
| 10 (black) | SPI6_nRESET | +3.3V   |
| 11 (black) | GND         | GND     |

### FMU USB Port

| Pin       | Signal    | Voltage |
| :-------- | :-------- | :------ |
| 1 (red)   | VBUS (in) | +5V     |
| 2 (black) | DM        | +3.3V   |
| 3 (black) | DP        | +3.3V   |
| 4 (black) | GND       | GND     |

### I2C Port

| Pin       | Signal | Voltage |
| :-------- | :----- | :------ |
| 1 (red)   | VCC    | +5V     |
| 2 (black) | SCL3   | +3.3V   |
| 3 (black) | SDA3   | +3.3V   |
| 4 (black) | GND    | GND     |

### ETH-P1 Port

| Pin       | Signal | Voltage |
| :-------- | :----- | :------ |
| 1 (red)   | TX_D1+ | -       |
| 2 (black) | TX_D1- | -       |
| 3 (black) | RX_D2+ | -       |
| 4 (black) | RX_D2- | -       |
| 5 (black) | Bi_D3+ | -       |
| 6 (black) | Bi_D3- | -       |
| 7 (black) | Bi_D4+ | -       |
| 8 (black) | Bi_D4- | -       |

### IO Debug Port

(JST-SH 1mm Pitch)

| Pin        | Signal          | Voltage |
| :--------- | :-------------- | :------ |
| 1 (red)    | IO_VDD_3V3(out) | +3.3V   |
| 2 (black)  | IO_USART1_TX    | +3.3V   |
| 3 (black)  | NC              | -       |
| 4 (black)  | IO_SWD_IO       | +3.3V   |
| 5 (black)  | IO_SWD_CK       | +3.3V   |
| 6 (black)  | IO_SWO          | +3.3V   |
| 7 (black)  | IO_SPARE_GPIO1  | +3.3V   |
| 8 (black)  | IO_SPARE_GPIO2  | +3.3V   |
| 9 (black)  | IO_nRST         | +3.3V   |
| 1 0(black) | GND             | GND     |

### FMU Debug port

(JST-SH 1mm Pitch)

| Pin        | Signal             | Voltage |
| :--------- | :----------------- | :------ |
| 1 (red)    | FMU_VDD_3V3(out)   | +3.3V   |
| 2 (black)  | FMU_USART3_TX      | +3.3V   |
| 3 (black)  | FMU_USART3_RX      | +3.3V   |
| 4 (black)  | FMU_SWD_IO         | +3.3V   |
| 5 (black)  | FMU_SWD_CK         | +3.3V   |
| 6 (black)  | SPI6_SCK_EXTERNAL1 | +3.3V   |
| 7 (black)  | NFC_GPIO           | +3.3V   |
| 8 (black)  | PH11               | +3.3V   |
| 9 (black)  | FMU_nRST           | +3.3V   |
| 10 (black) | GND                | GND     |

### AD\&IO port

| Pin       | Signal         | Voltage |
| :-------- | :------------- | :------ |
| 1 (red)   | VCC (out)      | +5V     |
| 2 (black) | FMU_CAP1       | +3.3V   |
| 3 (black) | FMU_BOOTLOADER | +3.3V   |
| 4 (black) | FMU_RST_REQ    | +3.3V   |
| 5 (black) | NARMED         | +3.3V   |
| 6 (black) | ADC1_3V3       | +3.3V   |
| 7 (black) | ADC1_6V6       | +6.6V   |
| 8 (black) | GND            | GND     |

### DSM RC Port

(JST-ZH 1.5mm Pitch)

| Pin        | Signal           | Voltage |
| :--------- | :--------------- | :------ |
| 1 (yellow) | VDD_3V3_SPEKTRUM | +3.3V   |
| 2 (black)  | GND              | GND     |
| 3 (grey)   | DSM/Spektrum in  | +3.3V   |

### RC IN Port

| Pin       | Signal            | Voltage |
| :-------- | :---------------- | :------ |
| 1 (red)   | VDD_5V \_RC (out) | +5V     |
| 2 (black) | SBUS/PPM in       | +3.3V   |
| 3 (black) | RSSI_IN           | +3.3V   |
| 4 (black) | NC                | -       |
| 5 (black) | GND               | GND     |

### SBUS Out Port

| Pin       | Signal   | Voltage |
| :-------- | :------- | :------ |
| 1 (red)   | NC       | -       |
| 2 (black) | SBUS_OUT | +3.3V   |
| 3 (black) | GND      | GND     |

### FMU PWM OUT (AUX OUT)

| Pin        | Signal    | Voltage |
| :--------- | :-------- | :------ |
| 1 (red)    | VDD_SERVO | 0\~16V  |
| 2 (black)  | FMU_CH1   | +3.3V   |
| 3 (black)  | FMU_CH2   | +3.3V   |
| 4 (black)  | FMU_CH3   | +3.3V   |
| 5 (black)  | FMU_CH4   | +3.3V   |
| 6 (black)  | FMU_CH5   | +3.3V   |
| 7 (black)  | FMU_CH6   | +3.3V   |
| 8 (black)  | FMU_CH7   | +3.3V   |
| 9 (black)  | FMU_CH8   | +3.3V   |
| 10 (black) | GND       | GND     |

### IO PWM OUT (MAIN OUT)

| Pin        | Signal    | Voltage |
| :--------- | :-------- | :------ |
| 1 (red)    | VDD_SERVO | 0\~16V  |
| 2 (black)  | IO_CH1    | +3.3V   |
| 3 (black)  | IO_CH2    | +3.3V   |
| 4 (black)  | IO_CH3    | +3.3V   |
| 5 (black)  | IO_CH4    | +3.3V   |
| 6 (black)  | IO_CH5    | +3.3V   |
| 7 (black)  | IO_CH6    | +3.3V   |
| 8 (black)  | IO_CH7    | +3.3V   |
| 9 (black)  | IO_CH8    | +3.3V   |
| 10 (black) | GND       | GND     |

:::

::: details Jetson Orin ports

### Orin USB2.0 Port

| Pin       | Signal         | Voltage |
| :-------- | :------------- | :------ |
| 1 (red)   | USB_VBUS (out) | +5V     |
| 2 (black) | DM             | +3.3V   |
| 3 (black) | DP             | +3.3V   |
| 4 (black) | GND            | GND     |
| 5 (black) | Shield         | GND     |

### Orin Debug

(JST-SH 1mm Pitch)

| Pin       | Signal         | Voltage |
| :-------- | :------------- | :------ |
| 1 (red)   | VCC (out)      | +5V     |
| 2 (black) | Orin_UART2_TXD | +3.3V   |
| 3 (black) | Orin_UART2_RXD | +3.3V   |
| 4 (black) | NC             | -       |
| 5 (black) | NC             | -       |
| 6 (black) | GND            | GND     |

### Orin I2C Port

| Pin       | Signal        | Voltage |
| :-------- | :------------ | :------ |
| 1 (red)   | VCC (out)     | +5V     |
| 2 (black) | Orin_I2C1_SCL | +3.3V   |
| 3 (black) | Orin_I2C1_SDA | +3.3V   |
| 4 (black) | GND           | GND     |

### Orin GPIO Port

| Pin       | Signal       | Voltage |
| :-------- | :----------- | :------ |
| 1 (red)   | VCC          | +5V     |
| 2 (black) | Orin_GPIO_07 | +3.3V   |
| 3 (black) | Orin_GPIO_11 | +3.3V   |
| 4 (black) | Orin_GPIO_12 | +3.3V   |
| 5 (black) | Orin_GPIO_13 | +3.3V   |
| 6 (black) | GND          | GND     |

### Orin Camera0 Port

Camera Serial Interface (CSI)

| Pin | Signal            | Voltage |
| :-- | :---------------- | :------ |
| 1   | GND               | GND     |
| 2   | Orin_CSI1_D0_N    | +3.3V   |
| 3   | Orin_CSI1_D0_P    | +3.3V   |
| 4   | GND               | GND     |
| 5   | Orin_CSI1_D1_N    | +3.3V   |
| 6   | Orin_CSI1_D1_P    | +3.3V   |
| 7   | GND               | GND     |
| 8   | Orin_CSI1_CLK_N   | +3.3V   |
| 9   | Orin_CSI1_CLK_P   | +3.3V   |
| 10  | GND               | GND     |
| 11  | Orin_CSI0_D0_N    | +3.3V   |
| 12  | Orin_CSI0_D0_P    | +3.3V   |
| 13  | GND               | GND     |
| 14  | Orin_CSI0_D1_N    | +3.3V   |
| 15  | Orin_CSI0_D1_P    | +3.3V   |
| 16  | GND               | GND     |
| 17  | Orin_CAM0_PWDN    | +3.3V   |
| 18  | Orin_CAM0_MCLK    | +3.3V   |
| 19  | GND               | GND     |
| 20  | Orin_CAM0_I2C_SCL | +3.3V   |
| 21  | Orin_CAM0_I2C_SDA | +3.3V   |
| 22  | VDD               | +3.3V   |

### Orin Camera1 Port

Camera Serial Interface (CSI)

| Pin | Signal            | Voltage |
| :-- | :---------------- | :------ |
| 1   | GND               | GND     |
| 2   | Orin_CSI2_D0_N    | +3.3V   |
| 3   | Orin_CSI2_D0_P    | +3.3V   |
| 4   | GND               | GND     |
| 5   | Orin_CSI2_D1_N    | +3.3V   |
| 6   | Orin_CSI2_D1_P    | +3.3V   |
| 7   | GND               | GND     |
| 8   | Orin_CSI2_CLK_N   | +3.3V   |
| 9   | Orin_CSI2_CLK_P   | +3.3V   |
| 10  | GND               | GND     |
| 11  | Orin_CSI3_D0_N    | +3.3V   |
| 12  | Orin_CSI3_D0_P    | +3.3V   |
| 13  | GND               | GND     |
| 14  | Orin_CSI3_D1_N    | +3.3V   |
| 15  | Orin_CSI3_D1_P    | +3.3V   |
| 16  | GND               | GND     |
| 17  | Orin_CAM1_PWDN    | +3.3V   |
| 18  | Orin_CAM1_MCLK    | +3.3V   |
| 19  | GND               | GND     |
| 20  | Orin_CAM1_I2C_SCL | +3.3V   |
| 21  | Orin_CAM1_I2C_SDA | +3.3V   |
| 22  | VDD               | +3.3V   |

### Orin SPI Port

| Pin       | Signal         | Voltage |
| :-------- | :------------- | :------ |
| 1 (red)   | VCC            | +5V     |
| 2 (black) | Orin_SPI0_SCK  | +3.3V   |
| 3 (black) | Orin_SPI0_MISO | +3.3V   |
| 4 (black) | Orin_SPI0_MOSI | +3.3V   |
| 5 (black) | Orin_SPI0_CS0  | +3.3V   |
| 6 (black) | Orin_SPI0_CS1  | +3.3V   |
| 7 (black) | GND            | GND     |

### Orin I2S Port

| Pin       | Signal          | Voltage |
| :-------- | :-------------- | :------ |
| 1 (red)   | VCC             | +5V     |
| 2 (black) | Orin_I2S0_SDOUT | +3.3V   |
| 3 (black) | Orin_I2S0_SDIN  | +3.3V   |
| 4 (black) | Orin_I2S0_LRCK  | +3.3V   |
| 5 (black) | Orin_I2S0_SCLK  | +3.3V   |
| 6 (black) | Orin_GPIO_09    | +3.3V   |
| 7 (black) | GND             | GND     |

:::

## Hardware Setup

The baseboard exposes both Pixhawk and Orin ports, as shown above in the [pinouts](#pinouts).
The Pixhawk ports comply with the Pixhawk connector standard (for ports covered by the standard), which means that the board can be connected to the usual peripherals, such as GPS, following either the generic assembly instructions for [multicopters](../assembly/assembly_mc.md), [fixed-wing](../assembly/assembly_fw.md) and [VTOL](../assembly/assembly_vtol.md) vehicles, or the corresponding Pixhawk guide for your flight controller (e.g. [Pixhawk 6X Quick Start](../assembly/quick_start_pixhawk6x.md)).

The main differences are likely to be power setup (see below), and the setup of additional peripherals connected to the Jetson.

### Peripherals

The diagram below provides additional guidance as to the ports where peripherals should be connected.

![Jetson Carrier Peripherals Diagram](../../assets/companion_computer/holybro_pixhawk_jetson_baseboard/peripherals_block_diagram_2.png)

### Power Wiring

The Pixhawk and Jetson parts of the board must be powered separately though their respective power ports.
The power module that comes with the kit supports 2S-12S battery inputs and provides a regulated supply for the Pixhawk part.
Its other output is generally connected to the (supplied) power distribution board, and from there powers motors, servos, and so on, along with the Jetson (either _directly_ or via the UBEC).

The Jetson part can be powered with a 7V-21V input, which corresponds to a 3S or 4S battery.
If using a higher voltage battery than the Jetson allows you can either use the UBEC to provide a lower regulated supply, or power the Jetson with a separate battery.

Some of the more common wiring configurations are shown below.

#### 3S/4S Battery

This configuration demonstrating how to power both the Pixhawk and Jetson parts using a 3S/4S battery (output below 21V).

![Power wiring - using one 3s or 4s battery](../../assets/companion_computer/holybro_pixhawk_jetson_baseboard/power1_one_battery_3s_4s.png)

#### 5S battery and greater (with UBEC)

This configuration shows how you can use the external UBEC (supplied) to provide an appropriate voltage for the Jetson when using a high-voltage battery (>21V).
Depending on your power needs, you might also use this (or another UBEC) for providing appropriate supply for control surfaces and other servo-driven hardware.

![Power wiring - Large battery and UBEC](../../assets/companion_computer/holybro_pixhawk_jetson_baseboard/power2_one_big_battery_external_ubec.png)

#### Two batteries (no Ubec)

This configuration shows how you can use a separate battery to supply an appropriate voltage to the Jetson instead of regulating the supply from a large battery as shown in above.

![Power wiring - two batteries no Ubec](../../assets/companion_computer/holybro_pixhawk_jetson_baseboard/power3_two_battery_no_ubec.png)

#### Using the Power Adapter

When developing and testing the vehicle on the bench, we recommend you power the Jetson using an external power supply, as shown.
The Pixhawk part still needs to be powered, which is shown here with a battery.

![Power wiring - Battery and power adapter](../../assets/companion_computer/holybro_pixhawk_jetson_baseboard/power4_battery_and_power_adapter.png)

## Jetson Setup Overview/Preconditions

The remaining setup guide covers installing Jetson Linux on the Jetson (a variant of Ubuntu), PX4 on the Pixhawk, and getting them to communicate via ROS 2.

You will need the following additional hardware:

- External display.
  If your display doesn't have a mini HDMI connector you will also need a [Mini HDMI to HDMI converter](https://a.co/d/6N815N9) if your external display has HDMI input
- Ethernet cable
- Mouse and keyboard (the baseboard has 4 USB ports exposed from Jetson, to of which are USB 3.0)

## Flashing the Jetson Board

::: info
This Jetson setup is tested with Nvidia Jetpack 6.0 (Ubuntu 22.04 base) and ROS 2 Humble, which are the versions currently supported by PX4-Autopilot community.
The host computer is also running Ubuntu 22.04.
:::

The Jetson companion computer can be flashed from a development computer using the [Nvidia SDK Manager](https://docs.nvidia.com/sdk-manager/download-run-sdkm/index.html#download-sdk-manager) when the board is in recovery mode.
There are many ways to put Jetson boards into recovery mode, but on this board the best way is to use the small sliding switch provided for this purpose.
You also need to connect the development computer to the baseboard using the specific USB-C port shown in the image below.

![USB port and bootloader switch](../../assets/companion_computer/holybro_pixhawk_jetson_baseboard/flashing_usb.png)

::: tip
The USB port is only for flashing the Jetson, and cannot be used as debug interface.
:::

Download [Nvidia SDK Manager](https://docs.nvidia.com/sdk-manager/download-run-sdkm/index.html#download-sdk-manager) using either the online or offline installer (you need to have an Nvidia account to install and use the SDKManager).

After starting SDKManager you should see a screen similar to the one below (if the board is connected to host computer in recovery mode):

![SDK Manager init page](../../assets/companion_computer/holybro_pixhawk_jetson_baseboard/nvidia_sdkmanager_1.png)

The next page allows you to choose the components to be installed.
Select the _Jetson Linux_ target components as shown (there is no point selecting other components because after flashing the board will disconnect).

![SDK Manager installation components page](../../assets/companion_computer/holybro_pixhawk_jetson_baseboard/nvidia_sdkmanager_2.png)

Next confirm your selected device:

- Choose `Pre-config` for the OEM Configuration (this will skip Ubuntu first time setup screens after reboot).
- Choose your preferred username and password (and write them down).
  These will be used as your login credentials to Jetpack.
- Choose `NVMe` as the storage device because the board has separate SSD for storage.

![SDK Manager installation storage and OEM config page](../../assets/companion_computer/holybro_pixhawk_jetson_baseboard/nvidia_sdkmanager_3.png)

Press **Flash** to start installing the image.
It will take several minutes for the installation to complete.

::: warning
The fan will be running while the installation is going on, so you may make sure it not blocked.
Jetson will boot into initial login after flashing.
:::

## Jetson Network Setup

After flashing the Jetson it will reboot to the login screen (skipping recovery mode).

The diagram below shows how you can connect your Jetson carrier board for the first time to setup the network connection.
This step is needed so that in future we can connect to the Jetson via SSH instead of using an external monitor (if we want).

Connect the external monitor to the board's (Jetson) HDMI port and the Jetson to power via the XT-30 input.
Separately connect the Pixhawk power supply using either the USB-C (on the side of the FC) or the `Power1`/`Power2` ports next to the Jetson.

::: tip
Pixhawk also has to be powered because the internal Ethernet switch on the board is not powered by XT30 connector.
:::

![First time network setup connection diagram and power](../../assets/companion_computer/holybro_pixhawk_jetson_baseboard/network_diagram.png)

Connect the keyboard and mouse via spare USB ports.
The external monitor should display the login screen.
Enter the username and password you set when using the SDKManager to flash the Jetson.

Next open a terminal in order to get the IP address of the Jetson.
This can be used later to connect via SSH.
Enter the following command.

```sh
ip addr show
```

The output should look similar to this, indicating (in this case) an IP address of `192.168.1.190`

```sh

```

::: tip If the command doesn't work ...
The WiFi card with the board is either the Intel 8265NGW AC Dual Band or Realtek RTL8B22CE.
The Intel module may not work out of the box, in which case you should open a terminal and run the following command to install its driver.

```sh
sudo apt-get install -y backport-iwlwifi-dkms
```

Then repeat the process try to get the IP address again.

:::

Now that we have an IP address, open a terminal in your _development computer_.
We can log into the Jetson using the IP address, as shown:

```sh
ssh holybro@192.168.1.190 #(Your defined IP might be different)
```

If that works, you can remove your external monitor: you shouldn't need it again!

## Initial Development Setup on Jetson

After logging into Jetson we can start with installing some dependencies:

```sh
sudo apt update
sudo apt install build-essential cmake git genromfs kconfig-frontends libncurses5-dev flex bison libssl-dev
```

::: info

In case you would like to develop PX4 Code on Jetson instead of the host computer you could follow the steps below:

```sh
git clone https://github.com/PX4/PX4-Autopilot.git --recursive
```

In case you need a small portion of commits history and a single branch with no tags since you are on a SoC you could do:

```sh
git clone https://github.com/PX4/PX4-Autopilot.git --recursive --depth 1 --single-branch --no-tags
```

Necessary stuff (I need nuttx for building):

```sh
bash ./PX4-Autopilot/Tools/setup/ubuntu.sh --no-sim-tools
```

In case of path warnings do this once:

```sh
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc && source ~/.bashrc
```

If You received an error like this one midway running ubuntu.sh:

```sh
E: Unable to locate package g++-multilib
E: Couldn't find any package by regex 'g++-multilib'
```

Do:

```sh
sudo apt install gcc-arm-none-eabi gdb-arm-none-eabi -y
```

And run `ubuntu.sh` again.

We need to give permission to the serial ports next:

```sh
sudo usermod -a -G dialout $USER
sudo apt-get remove modemmanager -y
```

Sanity check if we can build PX4 Firmware (I have Pixhawk 6x here on my carrier board):

```sh
make px4_fmu-v6x_default
```

If passed the build you can connect the USB-C on pixhawk side to the Jetson USB and upload the firmware:

```sh
make px4_fmu-v6x_default upload
```

This photo shows how you can connect Pixhawk to Jetson board directly with the cable already comes in the box:

![How to connect Jetson to Pixhawk directly](../../assets/companion_computer/holybro_pixhawk_jetson_baseboard/upload_px4_connection.png)

This means you can checkout and flash any PX4 version you want through the SSH connection to Jetson.
:::

## ROS 2 Installation and Setup

You could follow the instructions [here](../ros2/user_guide.md#install-ros-2).
Since later we may need to use additional ROS 2 packages for further development it is better to install full version, so this is the only line different from PX4 guide on ROS 2 installation.

```sh
sudo apt install -y ros-humble-desktop-full -y
```

## Setup Micro XRCE-DDS Agent on Jetson

You could follow the guides [here](../ros2/user_guide.md#setup-micro-xrce-dds-agent-client)

## Ethernet Setup using Netplan

1 - Modify the Netplan configuration file to set up a static IP for the Jetson.
You can usually find the Netplan configuration file in the `/etc/netplan/` directory.
It's typically named something like `01-netcfg.yaml`, but the name can vary.

Open the file in your preferred text editor:

```sh
sudo nano /etc/netplan/01-netcfg.yaml
```

2 - Modify the file to configure the Ethernet interface:

```
   network:
   version: 2
   renderer: networkd
   ethernets:
      eth0:
         dhcp4: no
         addresses:
         - 192.168.0.2/24
```

3- Apply the Netplan configuration:

Save the file and apply the changes using the following command:

```sh
sudo netplan apply
```

Pixhawk ethernet address is set to 192.168.0.3.
See [PX4 Ethernet setup](../advanced_config/ethernet_setup.md) and
[PX4 CM4 Blog post](https://px4.io/get-the-pixhawk-raspberry-pi-cm4-baseboard-by-holybro-talking-with-px4/).

::: warning
There is an internal network switch between Pixhawk and Jetson integrated in Holybro Jetson carrier board so
you do not need to connect any external cables.
:::

We ping pixhawk now inside Jetson terminal:

```sh
ping 192.168.0.3
```

If this is successful as the output below it means you
can run your XRCE-DDS agent on Jetson and have your ros nodes talk to PX4 uxrce-dds middleware.

![Pixhawk and Jetson successful ping](../../assets/companion_computer/holybro_pixhawk_jetson_baseboard/pixhawk_ping.png)

## Connection Sanity Check between Pixhawk and Jetson

Let us make stuff ready to communicate with Pixhawk.
I will use [MAVSDK Python](https://github.com/mavlink/MAVSDK-Python) as it is the easiest way for now:

```sh
 pip3 install mavsdk
```

We can run a [telemetry example](https://github.com/mavlink/MAVSDK-Python/tree/main/examples) here for a sanity check assuming you have cloned MAVSDK-Python repo in your Jetson root directory.
Over Serial we need to change [this line](https://github.com/mavlink/MAVSDK-Python/blob/707c48c01866cfddc0082217dba9f7fe27d59b27/examples/telemetry.py#L10) to:

```sh
await drone.connect(system_address="serial:///dev/ttyTHS*:921600")
```

:::info
Jetson and Pixhawk are internally connected from Pixhawk `TELEM2` to Jetson THS\* (i.e. THS1 or THS0).
Always you could see the available serial instances by:

```sh
ls /dev/ttyTHS*
```

:::

or over the Ethernet with the current setup:

```sh
await drone.connect(system_address="udp://:14550")
```

then we can run this inside Jetson terminal:

```sh
python ~/MAVSDK-Python/examples/telemetry.py
```

The output below is expected in either cases (no battery connected and disarmed vehicle):

![Sanity check Pixhawk and Jetson connection](../../assets/companion_computer/holybro_pixhawk_jetson_baseboard/connection_check.png)

## Running XRCE-DDS Agent and Tests

::: info
It is highly recommended to use [VSCode over SSH](https://code.visualstudio.com/learn/develop-cloud/ssh-lab-machines) to have faster development and applying changes.
:::

With the help from [PX4 ROS 2 user guide](../ros2/user_guide.md#building-the-workspace) we could have a basebone to test communication between the agent (Jetson) and client (Pixhawk) using XRCE-DDS:

```sh
mkdir -p ~/ws_sensor_combined/src/
cd ~/ws_sensor_combined/src/
git clone https://github.com/PX4/px4_msgs.git
git clone https://github.com/PX4/px4_ros_com.git
cd ..
source /opt/ros/humble/setup.bash
colcon build
```

1- Setting the connection based on internal serial

```sh
param set MAV_1_CONFIG = 0 (Disabling current TELEM2 MAVLINK instance)
param set UXRCE_DDS_CFG  102 (TELEM2)
param set UXRCE_DDS_DOM_ID  0 (If you would like to change this you need to change your host domain ID as well. Check ROS2 Humble Domain ID)
param set UXRCE_DDS_PTCFG 0
param set UXRCE_DDS_SYNCC 0 (But if you are sure about your companion UTC time being synced and updated you could consider making this equal to 1 so that PX4 time is updated with your XRCE-DDS Agent time or if there are no external sources like hardware RTC or GPS device)
param set UXRCE_DDS_SYNCT 1
```

::: info
This might not be a recommended way to establish agent-client connection as it will occupy the only serial connection between pixhawk and Jetson.
The reasons are:

1 - Serial connection has higher latency

2 - Reboots or system changes may cause failures to ethernet switch

3 - You could use the serial connection for lower level applications
:::

A Pixhawk reboot is needed after all these so that the changes are applied.
After the reboot please check the client status by running the following the following inside MAVLINK shell:

```sh
uxrce_dds_client status
```

A healthy output should show:

![uXRCE-DDS Client serial status](../../assets/companion_computer/holybro_pixhawk_jetson_baseboard/uxrce_dds_serial_agent_running.png)

Also another way to check if the client has started running at the boot is to get `dmesg` output from MAVLINK shell.
The below output as a part of `dmesg` log mentions the baudrate and the instance (`/dev/tty/S4` is equal to `TELEM2` for Holybro Pixhawk 6X and 6X Pro) the client is running on.

```sh
Starting UXRCE-DDS Client on /dev/ttyS4
INFO  [uxrce_dds_client] init serial /dev/ttyS4 @ 921600 baud
```

:::info
In case the client was not running you could run it manually:

```sh
uxrce_dds_client start -t serial -d /dev/ttyS4 -b 921600
```

:::

After setting up the params and making sure the client is running we can start the agent on serial as below inside Jetson terminal:

```sh
sudo MicroXRCEAgent serial --dev /dev/ttyTHS1 -b 921600
```

2 - Setting the XRCE-DDS client connection to use Ethernet.
Besides, we are choosing UXRCE_DDS_PRT to define a default udp port PX4 runs the client on Ethernet.

```sh
param set UXRCE_DDS_CFG 1000 (Ethernet)
param set UXRCE_DDS_PRT 8888
```

Then we can run MicroXRCEAgent over Ethernet by:

```sh
MicroXRCEAgent udp4 -p 8888
```

An output similar to the one below means that the connection is established and XRCE-DDs agent is running:

![uXRCE-DDS Agent Health check](../../assets/companion_computer/holybro_pixhawk_jetson_baseboard/xrce_dds_healthy_connection.png)

::: info
We do not need to run any client here as on all PX4 boards the client runs at the boot by default
:::

## Running a node to get sensor data using XRCE-DDS agent

By getting help from [ROS2 Example](../ros2/user_guide.md#running-the-example) :

```sh
source ws_sensor_combined/install/setup.bash #(ifyou have not passed this permanently to .bashrc)
```

Then we run the example node:

```sh
ros2 launch px4_ros_com sensor_combined_listener.launch.py
```

You should see high frequency sensor messages as the output:

![Sensor node single output](../../assets/companion_computer/holybro_pixhawk_jetson_baseboard/ros_sensor_output.png)

In case you want to run the agent each time booting Jetson you can make a daemon service to run the agent:

Make a new service file:

```sh
sudo nano /etc/systemd/system/microxrceagent.service
```

Paste the following inside:

```plain
[Unit]
Description=Micro XRCE Agent Service After=network.target
[Service]
14
Holybro carrier board
ExecStart=/usr/local/bin/MicroXRCEAgent udp4 -p 8888 Restart=always
User=root
Group=root
ExecStartPre=/bin/sleep 10
[Install]
WantedBy=multi-user.target
```

Save the file and run the following inside terminal

```sh
sudo systemctl daemon-reload
sudo systemctl enable microxrceagent.service
```

Then you can reboot your Jetson board and check if the agent is running in the background:

```sh
sudo systemctl status microxrceagent.service
```

If the service is running, a similar output is expected:

![XRCE DDS Agent Daemon service](../../assets/companion_computer/holybro_pixhawk_jetson_baseboard/xrce_dds_agent_service.png)

You can just do your ROS2 nodes running and the development.
Every boot the agent is running in the back.

## See Also

- [Jetson carrier board Holybro Docs](https://docs.holybro.com/autopilot/pixhawk-baseboards/pixhawk-jetson-baseboard)
- [PX4 Middleware docs](../middleware/uxrce_dds.md#starting-the-client)
- [PX4 ROS 2 user guide](../ros2/user_guide.md)
