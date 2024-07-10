# Посібник з портування NuttX

Для портування PX4 на NuttX на новий апаратний пристрій, цей апаратний пристрій повинен бути підтриманий NuttX. Проект NuttX зберігає відмінний [посібник з портативності](https://cwiki.apache.org/confluence/display/NUTTX/Porting+Guide) для портування NuttX на нову обчислювальну платформу.

Наступний посібник передбачає, що ви використовуєте вже підтримувану апаратну мету або вже портували NuttX (включаючи [базовий рівень PX4](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/platforms/nuttx/src/px4)).

Налаштувальні файли для всіх плат, включаючи лінкерні сценарії та інші необхідні налаштування, розташовані під [/boards](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/boards/) у каталозі, що відповідає постачальнику та платі (тобто **boards/_VENDOR_/_MODEL_/**).

Наступний приклад використовує FMUv5, оскільки це остання [посилання конфігурації](../hardware/reference_design.md) для контролерів польоту на основі NuttX:

- Виконайте `make px4_fmu-v5_default` з каталогу **PX4-Autopilot**, щоб збудувати конфігурацію FMUv5
- Основні файлы конфігурації FMUv5 розташовані за адресою: [/boards/px4/fmu-v5](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/boards/px4/fmu-v5).
  - Шапка конкретної плати (конфігурація контактів NuttX та годинника): [/boards/px4/fmu-v5/nuttx-config/include/board.h](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/boards/px4/fmu-v5/nuttx-config/include/board.h).
  - Специфічний заголовок дошки (конфігурація PX4): [/boards/px4/fmu-v5/src/board_config.h](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/boards/px4/fmu-v5/src/board_config.h).
  - Конфігурація операційної системи NuttX (створена за допомогою NuttX menuconfig): [/boards/px4/fmu-v5/nuttx-config/nsh/defconfig](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/boards/px4/fmu-v5/nuttx-config/nsh/defconfig).
  - Налаштування збірки: [дошка/px4/fmu-v5/default.px4board](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/boards/px4/fmu-v5/default.px4board).

## Налаштування меню NuttX Menuconfig

Щоб змінити конфігурацію операційної системи NuttX, ви можете використовувати [menuconfig](https://bitbucket.org/patacongo/nuttx/src/master/) за допомогою ярликів PX4:

```sh
make px4_fmu-v5_default menuconfig
make px4_fmu-v5_default qconfig
```

Для свіжих встановлень PX4 на Ubuntu з використанням [ubuntu.sh](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/Tools/setup/ubuntu.sh) <!-- NEED px4_version --> вам також потрібно буде встановити інструменти _kconfig_ з [інструментів NuttX](https://bitbucket.org/nuttx/tools/src/master/).

:::info Наступні кроки не потрібні у разі використання [контейнера docker px4-dev-nuttx](https://hub.docker.com/r/px4io/px4-dev-nuttx/) або встановлення на macOS за нашими звичайними інструкціями (оскільки вони включають`kconfig-mconf`).
:::

Виконайте наступні команди з будь-якого каталогу:

```sh
git clone https://bitbucket.org/nuttx/tools.git
cd tools/kconfig-frontends
sudo apt install gperf
./configure --enable-mconf --disable-nconf --disable-gconf --enable-qconf --prefix=/usr
make
sudo make install
```

`--префікс=/usr` визначає конкретне місце встановлення (яке повинно бути у змінній середовища `PATH`). Параметри `--enable-mconf` та `--enable-qconf` увімкнуть опції `menuconfig` та `qconfig` відповідно.

Для запуску `qconfig` може знадобитися встановити додаткові залежності Qt.

### Завантажувач

Спочатку вам знадобиться завантажувач, який залежить від цільового обладнання:

- STM32H7: завантажувач базується на NuttX та включений в прошивку PX4. Дивіться [тут](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/boards/holybro/durandal-v1/nuttx-config/bootloader) як приклад.
- Для всіх інших цілей використовується https://github.com/PX4/Bootloader. Дивіться [тут](https://github.com/PX4/Bootloader/pull/155/files) для прикладу того, як додати нову ціль. Потім перейдіть за посиланням [інструкції з компіляції та прошивки](../software_update/stm32_bootloader.md).

### Кроки портування прошивки

1. Переконайтеся, що у вас працює [середовище розробки](../dev_setup/dev_env.md) та ви встановили інструмент конфігурації 'menuconfig` NuttX (див. вище).
1. Завантажте вихідний код і переконайтеся, що ви можете зібрати існуючу ціль:

   ```sh
   git clone --recursive https://github.com/PX4/PX4-Autopilot.git
   cd PX4-Autopilot
   make px4_fmu-v5
   ```

1. Знаходьте існуючу ціль, яка використовує той самий (або тісно пов'язаний) тип ЦП, і скопіюйте її. Наприклад для STM32F7:

   ```sh
   mkdir boards/manufacturer
   cp -r boards/px4/fmu-v5 boards/manufacturer/my-target-v1
   ```

   Змініть **виробника** на назву виробника та **my-target-v1** на назву вашої плати.

Далі вам потрібно пройти через усі файли у **boards/manufacturer/my-target-v1** та оновити їх відповідно до вашої плати.

1. **прошивка.prototype**: оновлення ідентифікатора та назви плати
1. **default.px4board**: оновіть **VENDOR** та **MODEL**, щоб відповідали іменам каталогів (**my-target-v1**). Налаштування послідовних портів.
1. Налаштуйте NuttX (**defconfig**) через `make manufacturer_my-target-v1 menuconfig`: налаштуйте ЦП та мікросхему, налаштуйте периферійні пристрої (UART's, SPI, I2C, ADC).
1. **nuttx-config/include/board.h**: Налаштуйте контакти NuttX. Для всіх зовнішніх пристроїв з кількома варіантами контактів, NuttX повинен знати контакт. Вони визначені у файлі шапки конкретного чіпу, наприклад [stm32f74xx75xx_pinmap.h](https://github.com/PX4/NuttX/blob/px4_firmware_nuttx-8.2/arch/arm/src/stm32f7/hardware/stm32f74xx75xx_pinmap.h).
1. **src**: пройдіться по всім файлам у каталозі **src** та внесіть необхідні зміни, зокрема у файлі **board_config.h**.
1. **init/rc.board_sensors**: запускає сенсори, які підключені до плати.
