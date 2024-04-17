# BeagleBone Blue

<LinkedBadge type="warning" text="Experimental" url="../flight_controller/autopilot_experimental.md"/>

:::warning PX4 не виробляє цей (або будь-який інший) автопілот. Зверніться до [виробника](https://beagleboard.org/blue) щодо підтримки обладнання або питань сумісності.
:::

[BeagleBone Blue](https://beagleboard.org/blue) - це багатофункціональний комп'ютер на базі Linux. Хоча ця компактна і недорога плата оптимізована для робототехніки, вона має всі необхідні датчики і периферійні пристрої, необхідні для керування польотом. У цій темі показано, як налаштувати плату для роботи PX4 з пакетом робототехніки [librobotcontrol](https://github.com/StrawsonDesign/librobotcontrol).

![BeagleBone - labelled diagram](../../assets/hardware/BeagleBone_Blue_balloons.jpg)

## OS Image

_BeagleBone Blue_ образи можна знайти тут:

- [Останній стабільний образ ОС](https://beagleboard.org/latest-images).
- [Тестові образи ОС](https://rcn-ee.net/rootfs/bb.org/testing/) (часто оновлюються).

Інформацію про перепрошивання образів ОС можна знайти на [цій сторінці](https://github.com/beagleboard/beaglebone-blue/wiki/Flashing-firmware). Іншу корисну інформацію можна знайти в [ FAQ](https://github.com/beagleboard/beaglebone-blue/wiki/Frequently-Asked-Questions-(FAQ)).

:::tip
За бажанням ви можете оновитися до realtime kernel, і якщо ви це зробите, перевірте, чи _librobotcontrol_ працює належним чином з realtime kernel.
:::

Останніми образами ОС на момент оновлення цього документа є [bone-debian-10.3-iot-armhf-2020-04-06-4gb.img.xz](https://debian.beagle.cc/images/bone-debian-10.3-iot-armhf-2020-04-06-4gb.img.xz).

## Збірка для крос-компіляторів (рекомендується)

Рекомендований спосіб збірки PX4 для _BeagleBone Blue_ - це компіляція на комп'ютері розробника і завантаження виконуваного бінарного файлу PX4 безпосередньо на BeagleBone Blue.

:::tip
Цей підхід рекомендується використовувати замість [нативної збірки](#native_builds) через швидкість розгортання та простоту використання.
:::

::: info Збірка PX4 потребує [librobotcontrol](http://strawsondesign.com/docs/librobotcontrol/), який автоматично включається до збірки (але його можна встановити і протестувати незалежно, якщо потрібно).
:::

### Налаштування Beaglebone Blue WIFI

Для зручного доступу до плати ви можете підключити її до домашньої мережі через Wi-Fi.

Кроки наступні (виконайте на платі):

```sh
sudo su
connmanctl
connmanctl>scan wifi
connmanctl>services
#(at this point you should see your network SSID appear.)
connmanctl>agent on
connmanctl>connect <SSID>
    Enter Passphrase
connmanctl>quit
```

::: info Формат `<SSID>` вище зазвичай є текстом 'wifi', за яким слідує ряд інших символів. Після введення команди вам буде запропоновано ввести пароль для wifi.
:::

### SSH root-логін на Beaglebone

Root-логін можна увімкнути на платі за допомогою:

```sh
sudo su
echo "PermitRootLogin yes" >>  /etc/ssh/sshd_config && systemctl restart sshd
```

### Налаштування крос-компілятора

1. Спочатку налаштуйте _rsync_ (використовується для передачі файлів з робочого комп'ютера на цільову плату через мережу - WiFi або Ethernet). Для _rsync_ по SSH з аутентифікацією за ключем слід дотримуватися таких кроків (на машині розробника):

   1. Створіть ключ SSH, якщо ви раніше цього не робили:

      ```
      ssh-keygen -t rsa
      ```

      1. ENTER //no passphrase
      1. ENTER
      1. ENTER

   1. Визначте плату BeagleBone Blue як `beaglebone` у файлі **/etc/hosts** та скопіюйте публічний ключ SSH на плату для безпарольного доступу через SSH:

      ```
      ssh-copy-id debian@beaglebone
      ```

   1. Крім того, ви можете використовувати IP-адресу beaglebone безпосередньо:

      ```
      ssh-copy-id debian@<IP>
      ```

   1. На запитання, чи довіряєте ви: yes
   1. Введіть root пароль

1. Налаштування крос-компіляції

   1. Завантаження інструментів

      1. Спочатку встановіть набір інструментів до _/opt/bbblue_toolchain/gcc-arm-linux-gnueabihf_. Ось приклад використання софт-посилання для вибору версії набору інструментів, яку ви хочете використовувати:

         ```sh
         mkdir -p /opt/bbblue_toolchain/gcc-arm-linux-gnueabihf
         chmod -R 777 /opt/bbblue_toolchain
         cd /opt/bbblue_toolchain/gcc-arm-linux-gnueabihf
         ```

         Компілятор ARM Cross для _BeagleBone Blue_ можна знайти на сайті [Linaro Toolchain Binaries](https://www.linaro.org/downloads/#gnu_and_llvm).

:::tip GCC
у наборі інструментів має бути сумісним з ядром у _BeagleBone Blue_. Загальним правилом є вибір набору інструментів, версія якого не вища за версію GCC, що постачається з образом ОС на _BeagleBone Blue_.
:::

         Завантажте та розпакуйте [gcc-linaro-13.0.0-2022.06-x86_64_arm-linux-gnueabihf.tar.xz](https://snapshots.linaro.org/gnu-toolchain/13.0-2022.06-1/arm-linux-gnueabihf/gcc-linaro-13.0.0-2022.06-x86_64_arm-linux-gnueabihf.tar.xz) до папки bbblue_toolchain.

         Різні версії компілятора ARM Cross для _BeagleBone Blue_ можна знайти на сайті [Linaro Toolchain Binaries](http://www.linaro.org/downloads/).

         ```sh
         wget https://snapshots.linaro.org/gnu-toolchain/13.0-2022.06-1/arm-linux-gnueabihf/gcc-linaro-13.0.0-2022.06-x86_64_arm-linux-gnueabihf.tar.xz
         tar -xf gcc-linaro-13.0.0-2022.06-x86_64_arm-linux-gnueabihf.tar.xz
         ```

:::tip
Версія GCC в наборі інструментів має бути сумісною з ядром у _BeagleBone Blue_.
:::

         Загальним правилом є вибір набору інструментів, версія якого не вища за версію GCC, що постачається з образом ОС на _BeagleBone Blue_.

      1. Додайте його до PATH в ~/.profile, як показано нижче

         ```sh
         export PATH=$PATH:/opt/bbblue_toolchain/gcc-arm-linux-gnueabihf/gcc-linaro-13.0.0-2022.06-x86_64_arm-linux-gnueabihf/bin
         ```

         ::: info
Вийдіть і увійдіть, щоб застосувати зміни, або виконайте той самий рядок у вашій поточній оболонці.
:::

      1. Налаштуйте інші залежності, завантаживши вихідний код PX4, а потім виконайте сценарії налаштування:

         ````
         git clone https://github.com/PX4/PX4-Autopilot.git --recursive
         ols
         ```

         You may have to edit the upload target to match with your setup:

         ```sh
         nano PX4-Autopilot/boards/beaglebone/blue/cmake/upload.cmake

         # in row 37 change debian@beaglebone.lan TO root@beaglebone (or root@<IP>)
         ````

         Дивіться інструкції з [Налаштування середовища розробки](../dev_setup/dev_env_linux_ubuntu.md) для отримання додаткової інформації.

### Налаштування крос-компіляції та завантаження

Компіляція та завантаження

```
make beaglebone_blue_default upload
```

::: info
Без завантаження файли зберігаються локально в папці збірки.
:::

Для тестування завантажених файлів виконайте наступні команди на платі _BeagleBone Blue_:

```sh
cd /home/debian/px4
sudo ./bin/px4 -s px4.config
```

::: info Наразі _librobotcontrol_ потребує root-прав доступу.
:::

<a id="native_builds"></a>

## Нативні збірки (необов'язково)

Ви також можете нативно створювати збірки PX4 безпосередньо на BeagleBone Blue.

Після придбання готової бібліотеки,

1. Виберіть каталог встановлення _librobotcontrol_ та встановіть його у змінну середовища `LIBROBOTCONTROL_INSTALL_DIR`, щоб інші непотрібні заголовки не були включені
1. Встановіть **robotcontrol.h** та **rc/\*** в `$LIBROBOTCONTROL_INSTALL_DIR/include`
1. Встановіть попередньо зібрану нативну (ARM) версію librobotcontrol.\* у `$LIBROBOTCONTROL_INSTALL_DIR/lib`

Виконайте наступні команди на BeagleBone Blue (тобто через SSH):

1. Встановіть залежності:

   ```sh
   sudo apt-get update
   sudo apt-get install cmake python3-empy=3.3.4-2
   ```
1. Клонуйте програмне забезпечення PX4 безпосередньо на плату BeagleBone Blue.
1. Продовжуйте встановлення [стандартної збірки системи](../dev_setup/dev_env_linux.md).

## Зміни в конфігурації

Усі зміни можна вносити безпосередньо в файл налаштувань px4.config на beaglebone. Наприклад, ви можете змінити WIFI на wlan.

::: info Якщо ви хочете внести зміни назавжди, вам слід змінити **PX4-Autopilot/posix-configs/bbblue/px4.config** у Build Machine перед збіркою.
:::

## Автозапуск під час завантаження

Ось приклад [/etc/rc.local]:

```sh
#!/bin/sh -e
#
# rc.local
#
# This script is executed at the end of each multiuser runlevel.
# Make sure that the script will "exit 0" on success or any other
# value on error.
#
# In order to enable or disable this script just change the execution
# bits.
#
# By default this script does nothing.

# wait for services to start up
/bin/sleep 25

cd /home/debian/px4

/home/debian/px4/bin/px4 -d -s /home/debian/px4/px4.config > /home/debian/px4/PX4.log &

exit 0
```

Нижче наведено приклад служби _systemd_ [/lib/systemd/system/px4-quad-copter.service]:

```sh
[Unit]
Description=PX4 Quadcopter Service
After=networking.service network-online.target
StartLimitIntervalSec=0
Conflicts=px4-fixed-wing.service

[Service]
WorkingDirectory=/home/debian/px4
User=root
ExecStart=/home/debian/px4/bin/px4 -d -s /home/debian/px4/px4.config

Restart=on-failure
RestartSec=1

[Install]
WantedBy=multi-user.target
```

### Інше

#### Силова серворейка

Коли PX4 починає працювати, він автоматично подає живлення на сервоприводи.

#### Унікальні можливості

BeagleBone Blue має деякі унікальні функції, такі як кілька варіантів інтерфейсів WiFi та джерел живлення. Дивіться коментарі в **/home/debian/px4/px4.config** для використання цих функцій.

#### Перетворювач сигналів SBUS

Сигнал SBUS від приймача (наприклад, FrSky X8R) є інвертованим сигналом. UARTs на BeagleBone Blue можуть працювати лише з неінвертованим сигналом рівня 3,3 В. [У цьому навчальному посібнику](../tutorials/linux_sbus.md) міститься схема інвертора сигналу SBUS.

#### Typical Connections

For a quadcopter with GPS and an SBUS receiver, here are typical connections:

1. Connect the ESC of motor 1, 2, 3 and 4 to channel 1, 2, 3 and 4 of servo outputs on BeagleBone Blue, respectively. If your ESC connector contains a power output pin, remove it and do not connect it to the power output pin of the servo channel on the BeagleBone Blue.

1. Connect the above mentioned converted SBUS signal to the dsm2 port if you have the matching connector for dsm2, otherwise connect it to any other available UART port and change the corresponding port in **/home/debian/px4/px4.config** accordingly.

1. Connect the signals of GPS module to GPS port on the BeagleBone Blue. Note that the signal pins of the GPS port on the BeagleBone Blue are only 3.3V tolerant, so choose your GPS module accordingly.
