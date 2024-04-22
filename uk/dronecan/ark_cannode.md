# ARK CANnode

[ARK CANnode](https://arkelectron.com/product/ark-cannode/) - це опенсорсний [DroneCAN](../dronecan/index.md) вузол, який включає 6 ступенів свободи IMU. Його основна мета - дозволити використання датчиків, що не є CAN (I2C, SPI, UART) на шині CAN. Також він має виходи PWM для розширення вихідних сигналів транспортного засобу за кількістю та фізичною відстанню.

![ARK CANnode](../../assets/hardware/can_nodes/ark_cannode.jpg)

## Де купити

Замовте цей модуль з:

- [Ark Electronics](https://arkelectron.com/product/ark-cannode/) (США)

## Характеристики обладнання

- [Open Source Schematic and BOM](https://github.com/ARK-Electronics/ARK_CANNODE)
- Датчики
  - Bosch BMI088 6-Axis IMU or Invensense ICM-42688-P 6-Axis IMU
- STM32F412CGU6 MCU
  - 1MB Flash
- Два роз'єми стандарту CAN для Pixhawk
  - 4-контактний JST-GH
- Pixhawk Standard I2C Connector
  - 4-контактний JST-GH
- Стандартний коннектор UART/I2C для Pixhawk (Основний порт GPS)
  - 6-контактний JST-GH
- Pixhawk Standard SPI Connector
  - 7-контактний JST-GH
- Коннектор PWM
  - 10-контактний JST-SH
  - 8 PWM виводів
  - Відповідно до схеми підключення штирьових роз'ємів Pixhawk 4 PWM
- Pixhawk Standard Debug Connector
  - 6-контактний JST-GH
- Малий форм-фактор
  - 3см x 3см x 1.3см
- LED індикатори
- USA Built
- Вимоги до живлення
  - 5В
  - Сила струму залежить від підключених пристроїв

## Налаштування обладнання

### Підключення

ARK CANnode підключений до шини CAN за допомогою стандартного кабелю JST GH з чотирма контактами Pixhawk. Для отримання додаткової інформації, зверніться до інструкцій з [проводки CAN](../can/index.md#wiring).

## Налаштування прошивки

ARK CANnode працює з [Прошивкою PX4 DroneCAN](px4_cannode_fw.md). Таким чином, він підтримує оновлення прошивки через шину CAN та [dynamic node allocation](index.md#node-id-allocation).

ARK CANnode boards ship with recent firmware pre-installed, but if you want to build and flash the latest firmware yourself see [PX4 DroneCAN Firmware > Building the Firmware](px4_cannode_fw.md#building-the-firmware).

- Firmware target: `ark_cannode_default`
- Bootloader target: `ark_cannode_canbootloader`

## Flight Controller Configuration

### Enable DroneCAN

In order to use the ARK CANnode board, connect it to the Pixhawk CAN bus and enable the DroneCAN driver by setting parameter [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE) to `2` for dynamic node allocation (or `3` if using [DroneCAN ESCs](../dronecan/escs.md)).

The steps are:

- In _QGroundControl_ set the parameter [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE) to `2` or `3` and reboot (see [Finding/Updating Parameters](../advanced_config/parameters.md)).
- Connect ARK CANnode CAN to the Pixhawk CAN.

Once enabled, the module will be detected on boot.

DroneCAN configuration in PX4 is explained in more detail in [DroneCAN > Enabling DroneCAN](../dronecan/index.md#enabling-dronecan).

### Enable Sensors

You will need to enable the subscriber appropriate for each of the sensors that are connected to the ARK CANnode.

This is done using the the parameters named like `UAVCAN_SUB_*` in the parameter reference (such as [UAVCAN_SUB_ASPD](../advanced_config/parameter_reference.md#UAVCAN_SUB_ASPD), [UAVCAN_SUB_BARO](../advanced_config/parameter_reference.md#UAVCAN_SUB_BARO) etc.).

## Ark CANNode Configuration

On the ARK CANnode, you may need to configure the following parameters:

| Параметр                                                                                        | Опис                          |
| ----------------------------------------------------------------------------------------------- | ----------------------------- |
| <a id="CANNODE_TERM"></a>[CANNODE_TERM](../advanced_config/parameter_reference.md#CANNODE_TERM) | CAN built-in bus termination. |

## LED Meanings

You will see both red and blue LEDs on the ARK CANnode when it is being flashed, and a solid blue LED if it is running properly.

If you see a solid red LED there is an error and you should check the following:

- Make sure the flight controller has an SD card installed.
- Make sure the ARK CANnode has `ark_cannode_canbootloader` installed prior to flashing `ark_cannode_default`.
- Remove binaries from the root and ufw directories of the SD card and try to build and flash again.
