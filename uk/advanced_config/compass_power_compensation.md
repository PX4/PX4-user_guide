# Compass Power Compensation

Компаси (магнітометри) повинні бути встановлені якнайдалі від кабелів, які переносять великі струми, оскільки вони створюють магнітні поля, які можуть вплинути на показання компасу.

Ця тема пояснює, як компенсувати виниклі магнітні поля у випадках, коли переміщення компасу нереалістичне.

:::tip
Moving the compass away from power-carrying cables is the easiest and most effective way to fix this issue, because the strength of the magnetic fields decreases quadratically with the distance from the cable.
:::

:::info
The process is demonstrated for a multicopter, but is equally valid for other vehicle types.
:::

<a id="when"></a>

## Коли застосовна компенсація потужності?

Виконання компенсації потужності рекомендується лише у випадку, якщо виконуються всі наступні умови:

1. Компас не може бути віддалений від кабелів, які переносять потужність.

2. Існує сильна кореляція між показаннями компасу та встановленим значенням тяги та/або поточним зарядом батареї.

   ![Corrupted mag](../../assets/advanced_config/corrupted_mag.png)

3. Кабелі дрона всі закріплені на місці / не рухаються (розраховані параметри компенсації будуть недійсними, якщо кабелі, які переносять струм, можуть рухатися).

<a id="how"></a>

## Як компенсувати компас

1. Переконайтеся, що ваш дрон працює на версії прошивки, що підтримує компенсацію потужності (поточний майстер або версії від v.1.11.0).

2. Perform the [standard compass calibration](../config/compass.md#compass-calibration).

3. Set the parameter [SDLOG_MODE](../advanced_config/parameter_reference.md#SDLOG_MODE) to 2 to enable logging of data from boot.

4. Set the parameter [SDLOG_PROFILE](../advanced_config/parameter_reference.md#SDLOG_PROFILE) checkbox for _Sensor comparison_ (bit 6) to get more data points.

5. Закріпіть дрон таким чином, щоб він не міг рухатися, та прикріпіть пропелери (щоб двигуни могли витягувати такий самий струм, як у повітрі).
   У цьому прикладі транспортний засіб закріплюється за допомогою ременів.

   ![strap](../../assets/advanced_config/strap.png)

6. Power the vehicle and switch into [ACRO flight mode](../flight_modes_mc/acro.md) (using this mode ensures the vehicle won't attempt to compensate for movement resulting from the straps).

   - Збройте транспортний засіб і повільно підніміть оберти двигунів до максимуму.
   - Повільно знизьте швидкість обертання двигунів до нуля.
   - Звільнити автомобіль

   ::: info
   Perform the test carefully and closely monitor the vibrations.

:::

7. Retrieve the ulog and use the python script [mag_compensation.py](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/sensors/vehicle_magnetometer/mag_compensation/python/mag_compensation.py) to identify the compensation parameters.

   ```sh
   python mag_compensation.py ~/path/to/log/logfile.ulg <type> [--instance <number>]
   ```

   де:

   - `<type>`: `current` or `thrust` (power signal used for compensation)
   - `--instance <number>` (optional): The number is `0` (default) or `1`, the instance of the current or thrust signal to use.

   ::: info
   If your log does not contain battery current measurements, you will need to comment out the respective lines in the Python script, such that it does the calculation for thrust only.

:::

8. Скрипт поверне ідентифікацію параметрів для тяги, а також для поточного і виведе їх у консоль.
   Цифри, які з'являються зі скрипту, показують "якість підгонки" для кожного екземпляру компасу, а також те, як виглядатиме дані після компенсації за запропонованими значеннями.
   Якщо є вимірювання струму, використання компенсації поточного звичайно дає кращі результати.
   Ось приклад журналу, де відповідність струму добра, але параметри тяги непридатні, оскільки відношення не є лінійним.

   ![line fit](../../assets/advanced_config/line_fit.png)

9. Once the parameters are identified, the power compensation must be enabled by setting [CAL_MAG_COMP_TYP](../advanced_config/parameter_reference.md#CAL_MAG_COMP_TYP) to 1 (when using thrust parameters) or 2 (when using current parameters).
   Додатково, параметри компенсації для кожної вісі кожного компасу повинні бути встановлені.

   ![comp params](../../assets/advanced_config/comp_params.png)
