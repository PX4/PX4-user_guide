# ARK Electronics ARKV6X

:::warning
PX4 does not manufacture this (or any) autopilot.
Contact the [manufacturer](https://arkelectron.com/contact-us/) for hardware support or compliance issues.
:::

The USA-built ARKV6X flight controller is based on the [FMUV6X and Pixhawk Autopilot Bus open source standards](https://github.com/pixhawk/Pixhawk-Standards).

With triple synced IMUs, data averaging, voting, and filtering is possible.
The Pixhawk Autopilot Bus (PAB) form factor enables the ARKV6X to be used on any PAB carrier board.
ARK Electronics also offers a compatible [PAB](../flight_controller/arkpab.md).

![ARKV6X Main Photo](../../assets/flight_controller/arkv6x/ark_v6x_front.jpg)

:::note
This flight controller is [manufacturer supported](../flight_controller/autopilot_manufacturer_supported.md).
:::

### Sensors

- [Dual Invensense ICM-42688-P IMUs](https://invensense.tdk.com/products/motion-tracking/6-axis/icm-42688-p/)
- [Invensense IIM-42652 Industrial IMU](https://invensense.tdk.com/products/smartindustrial/iim-42652/)
- [Bosch BMP390 Barometer](https://www.bosch-sensortec.com/products/environmental-sensors/pressure-sensors/pressure-sensors-bmp390.html)
- [Bosch BMM150 Magnetometer](https://www.bosch-sensortec.com/products/motion-sensors/magnetometers-bmm150/)

### Microprocessor

- [STM32H743IIK6 MCU](https://www.st.com/en/microcontrollers-microprocessors/stm32h743ii.html)
  - 480MHz
  - 2MB Flash
  - 1MB Flash

### Other Features

- FRAM
- [Pixhawk Autopilot Bus (PAB) Form Factor](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-010%20Pixhawk%20Autopilot%20Bus%20Standard.pdf)
- LED Indicators
- MicroSD Slot
- USA Built
- Designed with a 1W heater. Keeps sensors warm even in extreme conditions

### Power Requirments

- 5V
  - 500mA
  - (300ma for main system)
  - (200ma for heater)

### Additional Information

- Weight | 5.0 g
- Dimensions | 3.6 x 2.9 x 0.5 cm

### Pinout

For pinout of the ARKV6X see the [DS-10 Pixhawk Autopilot Bus Standard](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-010%20Pixhawk%20Autopilot%20Bus%20Standard.pdf)

### Building Firmware

```
make ark_fmu-v6x_default
```

### Where To Buy

Order From [Ark Electronics](https://arkelectron.com/product/arkv6x/)

![ARK Logo](../../assets/flight_controller/arkv6x/ark_logo.png)
