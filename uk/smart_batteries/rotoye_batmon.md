# Rotoye Batmon

[Rotoye Batmon](https://rotoye.com/batmon/) - це набір для додавання функціональності розумної батареї до готових літій-іонних та LiPo батарей. Його можна придбати як самостійний пристрій або як частину заводсько зібраної розумної батареї.

:::note
На момент написання цієї інформації ви можете використовувати Batmon, [створивши спеціальну гілку PX4](#build-px4-firmware). Підтримка в кодовій лінії очікує на [затвердження PR](https://github.com/PX4/PX4-Autopilot/pull/16723).
:::


![Rotoye Batmon Board](../../assets/hardware/smart_batteries/rotoye_batmon/smart-battery-rotoye.jpg)

![Pre-assembled Rotoye smart battery](../../assets/hardware/smart_batteries/rotoye_batmon/smart-battery-rotoye-pack.jpg)


## Де купити

[Магазин Rotoye](https://rotoye.com/batmon/): комплекти Batmon, розумні батареї на замовлення та аксесуари


## Проведення/Підключення

Система Rotoye Batmon використовує роз'єм батареї XT-90 з контактами I2C та оптоволоконно-ізоляційну плату для передачі даних.

![Board connections](../../assets/hardware/smart_batteries/rotoye_batmon/smart-battery-rotoye-connection.png)

Більш детальну інформацію можна знайти [тут](https://github.com/rotoye/batmon_reader)


## Налаштування програмного забезпечення

### Створення прошивки PX4

1. Clone or download [Rotoye's fork of PX4:](https://github.com/rotoye/PX4-Autopilot/tree/batmon_4.03)
   ```sh
   git clone https://github.com/rotoye/PX4-Autopilot.git
   cd PX4-Autopilot
   ```
1. Checkout the *batmon_4.03* branch
   ```sh
   git fetch origin batmon_4.03
   git checkout batmon_4.03
   ```
1. [Build and upload the firmware](../dev_setup/building_px4.md) for your target board

### Налаштування параметрів

У *QGroundControl*:
1. Set the following [parameters](../advanced_config/parameters.md):
   - `BATx_SOURCE` to `External`,
   - `SENS_EN_BAT` to `true`,
   - `BAT_SMBUS_MODEL` to `3:Rotoye`
1. Open the [MAVLink Console](https://docs.qgroundcontrol.com/master/en/analyze_view/mavlink_console.html)
1. Start the [batt_smbus driver](../modules/modules_driver.md) in the console. For example, to run two BatMons on the same bus:
   ```sh 
   batt_smbus start -X -b 1 -a 11 # External bus 1, address 0x0b  
   batt_smbus start -X -b 1 -a 12 # External bus 1, address 0x0c
   ```

## Детальна інформація

[Quick Start Guide](https://rotoye.com/batmon-tutorial/) (Rotoye)
