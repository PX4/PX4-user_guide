# DShot ESCs

DShot - це альтернативний протокол ESC, який має кілька переваг над [PWM](../peripherals/pwm_escs_and_servo.md) або [OneShot](../peripherals/oneshot.md):

- Зменшений час затримки.
- Підвищена надійність за допомогою контрольної суми.
- Не потрібна калібрування ESC, оскільки протокол використовує цифрове кодування.
- Зворотний зв'язок телеметрії доступний/підтримується на деяких ESC.
- Може змінювати напрямок обертання двигуна за допомогою команд при потребі (замість фізичного переміщення проводів / перепайки).
- Інші корисні команди підтримуються.

Ця тема показує, як підключити та налаштувати DShot ESC.

## Проведення/Підключення {#wiring}

DShot ESC підключені так само, як [PWM ESCs](pwm_escs_and_servo.md). Єдина відмінність полягає в тому, що їх можна підключити лише до FMU, і зазвичай лише до певного підмножини контактів.

::: інформація
Можливо, вам захочеться перевірити екран конфігурації приводу, щоб побачити, які контакти доступні для DShot на вашому контролері, перш ніж підключати їх!
:::

Контролери Pixhawk з якими є як плата FMU, так і плата IO, зазвичай позначають їх як `AUX` (FMU) та `MAIN` (IO) відповідно. Ці відповідають виходам `PWM AUX` та `PWM MAIN` на вкладці конфігурації приводу. Для цих контролерів підключіть DShot ESC до порту `AUX`.

Контролери, які не мають плати введення-виведення (IO board), зазвичай позначають (один) вихідний порт як `MAIN`, і саме тут ви підключите свій DShot ESC. Якщо контролер без IO має власне програмне забезпечення, призначення приводу буде до відповідних виходів `PWM MAIN`. Однак, якщо для апаратного забезпечення з/без плати введення/виведення використовується та ж прошивка, наприклад, для Pixhawk 4 та Pixhawk 4 Mini, то вкладка призначення приводів в обох випадках однакова: `PWM AUX` (тобто не відповідає мітці порта `MAIN` у випадку "міні").

## Налаштування

:::warning
Видаліть гвинти пропелерів перед зміною параметрів конфігурації ESC!
:::

Увімкніть DShot для необхідних виходів у [Конфігурації приводів](../config/actuators.md).

DShot має різні варіанти швидкості: _DShot150_, _DShot300_, _DShot600_ та _DShot1200_, де число вказує на швидкість у кілобітах/секунду. Ви повинні встановити параметр на найвищу швидкість, підтримувану вашим ESC (згідно з його технічним описом).

Підключіть батарею та озбройте транспортний засіб. РЕГБ повинні ініціалізуватися, а мотори повинні обертатися в правильних напрямках.

- Якщо двигуни не обертаються в правильному напрямку (для [вибраної конструкції повітряного судна](../airframes/airframe_reference.md)), ви можете змінити їх напрямок у користувацькому інтерфейсі, використовуючи опцію **Встановити напрямок обертання** (ця опція з'являється після вибору DShot та призначення двигунів). Ви також можете реверсувати двигуни, відправивши [команду ESC](#commands).

## ESC Commands {#commands}

Команди можна надсилати на ESC через [MAVLink shell](../debug/mavlink_shell.md). Дивіться [тут](../modules/modules_driver.md#dshot) для повного посилання на підтримувані команди.

Найважливіші з них:

- Make a motor connected to to FMU output pin 1 beep (helps with identifying motors)

  ```sh
  dshot beep1 -m 1
  ```

- Retrieve ESC information (requires telemetry, see below):

  ```sh
  nsh> dshot esc_info -m 2
  INFO  [dshot] ESC Type: #TEKKO32_4in1#
  INFO  [dshot] MCU Serial Number: xxxxxx-xxxxxx-xxxxxx-xxxxxx
  INFO  [dshot] Firmware version: 32.60
  INFO  [dshot] Rotation Direction: normal
  INFO  [dshot] 3D Mode: off
  INFO  [dshot] Low voltage Limit: off
  INFO  [dshot] Current Limit: off
  INFO  [dshot] LED 0: unsupported
  INFO  [dshot] LED 1: unsupported
  INFO  [dshot] LED 2: unsupported
  INFO  [dshot] LED 3: unsupported
  ```

- Permanently set the spin direction of a motor connected to FMU output pin 1 (while motors are _not_ spinning):

  - Set spin direction to `reversed`:

    ```sh
    dshot reverse -m 1
    dshot save -m 1
    ```

    Retrieving ESC information will then show:

    ```sh
    Rotation Direction: reversed
    ```

  - Set spin direction to `normal`:

    ```sh
    dshot normal -m 1
    dshot save -m 1
    ```

    Retrieving ESC information will then show:

    ```sh
    Rotation Direction: normal
    ```

  Примітка

  - The commands will have no effect if the motors are spinning, or if the ESC is already set to the corresponding direction.
  - The ESC will revert to its last saved direction (normal or reversed) on reboot if `save` is not called after changing the direction.


:::

## Телеметрія

Деякі ESC можуть надсилати телеметрію до контролера польоту, включаючи:

- температура
- напруга
- струм
- накопичене поточне споживання
- Значення RPM

Ці DShot ESCs матимуть додатковий телеметрійний дріт.

Щоб увімкнути цю функцію (на ESC, які її підтримують):

1. Об'єднайте всі дроти телеметрії з усіх ESC разом, а потім підключіть їх до одного з контактів RX на не використаному порту послідовного зв'язку контролера польоту.
1. Увімкніть телеметрію на цьому послідовному порту за допомогою [DSHOT_TEL_CFG](../advanced_config/parameter_reference.md#DSHOT_TEL_CFG).

Після перезавантаження ви можете перевірити, чи працює телеметрія (переконайтеся, що акумулятор підключений), використовуючи:

```sh
dshot esc_info -m 1
```

:::tip
Можливо, вам доведеться налаштувати [MOT_POLE_COUNT](../advanced_config/parameter_reference.md#MOT_POLE_COUNT), щоб отримати правильні значення обертів на хвилину (RPM).
:::

:::tip
Не всі ESC, які підтримують DSHOT, підтримують `[esc_info]` (наприклад, APD 80F3x), навіть коли підтримується телеметрія та ввімкнено. Отримана помилка:

```sh
ERROR [dshot] No data received. Якщо телеметрія налаштована правильно, спробуйте ще раз.
```

Перевірте документацію виробника для підтвердження/подробиць.
:::
