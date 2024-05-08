# PilotPi with Ubuntu Server

::::warning
Ubuntu Server на RPi 4B споживає багато струму і генерує багато тепла.
Розробляйте дизайн для кращого відведення тепла та високого енергоспоживання при використанні цього обладнання.
:::

## Швидкий старт для розробника

### OS Image

Підтримуються і armhf і arm64.

#### armhf

- [Ubuntu Server 18.04.5 для RPi2](https://cdimage.ubuntu.com/releases/18.04.5/release/ubuntu-18.04.5-preinstalled-server-armhf+raspi2.img.xz)
- [Ubuntu Server 18.04.5 для RPi3](https://cdimage.ubuntu.com/releases/18.04.5/release/ubuntu-18.04.5-preinstalled-server-armhf+raspi3.img.xz)
- [Ubuntu Server 18.04.5 для RPi4](https://cdimage.ubuntu.com/releases/18.04.5/release/ubuntu-18.04.5-preinstalled-server-armhf+raspi4.img.xz)
- [Ubuntu Server 20.04.1 для RPi 2/3/4](https://cdimage.ubuntu.com/releases/20.04.1/release/ubuntu-20.04.2-preinstalled-server-arm64+raspi.img.xz)

#### arm64

- [Ubuntu Server 18.04.5 для RPi3](https://cdimage.ubuntu.com/releases/18.04.5/release/ubuntu-18.04.5-preinstalled-server-arm64+raspi3.img.xz)
- [Ubuntu Server 18.04.5 для RPi4](https://cdimage.ubuntu.com/releases/18.04.5/release/ubuntu-18.04.5-preinstalled-server-arm64+raspi4.img.xz)
- [Ubuntu Server 20.04.1 для RPi 3/4](https://cdimage.ubuntu.com/releases/20.04.1/release/ubuntu-20.04.2-preinstalled-server-arm64+raspi.img.xz)

#### Найновіша ОС

Будь ласка, звертайтеся до офіційної сторінки [cdimage](https://cdimage.ubuntu.com/releases/) для отримання будь-яких нових оновлень.

### Перший запуск

Під час налаштування Wi-Fi для RaPi вперше ми рекомендуємо використовувати провідне підключення Ethernet між домашнім маршрутизатором та RPi, а також монітор та клавіатуру.

#### Перед завантаженням

Встановіть SD-карту на ваш комп'ютер та змініть налаштування мережі. Будь ласка, дотримуйтесь офіційної інструкції [тут](https://ubuntu.com/tutorials/how-to-install-ubuntu-on-your-raspberry-pi#3-wifi-or-ethernet).

Тепер під'єднайте SD-карту до вашого Pi та завантажтеся вперше. Переконайтеся, що у вас є доступ до RPi через командний рядок - або через з'єднання SSH по кабелю Ethernet, або безпосередній доступ за допомогою клавіатури та монітора.

#### WiFi регіон

Спочатку встановіть необхідний пакет:

```sh
sudo apt-get install crda
```

Відредагуйте файл `/etc/default/crda`, щоб встановити правильний WiFi регіон. [Reference List](https://www.arubanetworks.com/techdocs/InstantWenger_Mobile/Advanced/Content/Instant%20User%20Guide%20-%20volumes/Country_Codes_List.htm)

```sh
sudo nano /etc/default/crda
```

Потім ваш Pi зможе приєднатися до вашої мережі WiFi після перезавантаження.

#### Hostname та mDNS

Давайте спочатку налаштуємо ім'я хоста.

```sh
sudo nano /etc/hostname
```

Змініть значення hostname на те, що вам подобається. Потім встановіть пакет, необхідний для mDNS:

```sh
sudo apt-get update
sudo apt-get install avahi-daemon
```

Виконайте перезавантаження.

```sh
sudo reboot
```

Відновіть доступність через підключення WiFi після вищезазначеної операції.

```sh
ssh ubuntu@pi_hostname.local
```

#### Автентифікація без пароля (необов'язково)

Ви також можете налаштувати [безпарольну автентифікацію](https://www.raspberrypi.org/documentation/remote-access/ssh/passwordless.md).

### Налаштування ОС

#### config.txt

Відповідний файл в Ubuntu - `/boot/firmware/usercfg.txt`.

```sh
sudo nano /boot/firmware/usercfg.txt
```

Замініть контент файлу на:

```sh
# enable sc16is752 overlay
dtoverlay=sc16is752-spi1
# enable I2C-1 and set the frequency to 400KHz
dtparam=i2c_arm=on,i2c_arm_baudrate=400000
# enable spidev0.0
dtparam=spi=on
# enable RC input
enable_uart=1
# enable I2C-0
dtparam=i2c_vc=on
# switch Bluetooth to miniuart
dtoverlay=miniuart-bt
```

#### cmdline.txt

В Ubuntu Server 20.04:

```sh
sudo nano /boot/firmware/cmdline.txt
```

Для Ubuntu Server 18.04 або ранішої версії, слід змінити `nobtcmd.txt` та `btcmd.txt`.

```sh
sudo nano /boot/firmware/nobtcmd.txt
```

Знайдіть `console=/dev/ttyAMA0,115200` та видаліть цю частину, щоб вимкнути командний рядок логіну на послідовному інтерфейсі.

Додайте `isolcpus=2` після останнього слова. Весь файл буде виглядати так:

```sh
net.ifnames=0 dwc_otg.lpm_enable=0 console=tty1 root=LABEL=writable rootfstype=ext4 elevator=deadline rootwait fixrtc isolcpus=2
```

Вищезазначений рядок вказує ядру Linux не планувати жодного процесу на ядрі CPU 2. Ми пізніше вручну запустимо PX4 на цьому ядрі.

Перезавантажте та увійдіть за допомогою SSH на ваш Pi.

Перевірте інтерфейс UART:

```sh
ls /dev/tty*
```

Має бути `/dev/ttyAMA0`, `/dev/ttySC0` та `/dev/ttySC1`.

Перевірте інтерфейс I2C:

```sh
ls /dev/i2c*
```

Повинно бути `/dev/i2c-0` та `/dev/i2c-1`

Перевірте інтерфейс SPI:

```sh
ls /dev/spidev*
```

Має бути `/dev/spidev0.0`.

#### rc.local

У цьому розділі ми налаштуємо скрипт автозапуску в **rc.local**. Зверніть увагу, що нам потрібно створити цей файл, оскільки він відсутній у свіжій операційній системі Ubuntu.

```sh
sudo nano /etc/rc.local
```

Додати вміст нижче до файлу:

```sh
#!/bin/sh

echo "25" > /sys/class/gpio/export
echo "in" > /sys/class/gpio/gpio25/direction
if [ $(cat /sys/class/gpio/gpio25/value) -eq 1 ] ; then
        echo "Launching PX4"
        cd /home/ubuntu/px4 ; nohup taskset -c 2 ./bin/px4 -d -s pilotpi_mc.config 2 &> 1 > /home/ubuntu/px4/px4.log &
fi
echo "25" > /sys/class/gpio/unexport

exit 0
```

Збережіть та вийдіть. Потім встановіть правильні права:

```sh
sudo chmod +x /etc/rc.local
```

::: info
Не забудьте вимкнути перемикач, коли він не потрібен!
:::

#### CSI камера

:::warning
Увімкнення камери CSI призведе до зупинки роботи будь-чого на I2C-0.
:::

```sh
sudo nano /boot/firmware/usercfg.txt
```

Додайте наступний рядок в кінці файлу:

```sh
start_x=1
```

### Збірка коду

Для завантаження _найостаннішої_ версії на свій комп'ютер, введіть у терміналі наступну команду:

```sh
git clone https://github.com/PX4/PX4-Autopilot.git --recursive
```

::: info
Це все, що вам необхідно для збірки найновішого коду.
:::

#### Встановити точку призначення завантаження RPi

Встановіть IP-адресу (або ім'я хоста) вашого RPi за допомогою:

```sh
export AUTOPILOT_HOST=192.168.X.X
```

або

```sh
export AUTOPILOT_HOST=pi_hostname.local
```

Додатково, нам потрібно встановити ім'я користувача:

```sh
export AUTOPILOT_USER=ubuntu
```

#### Збірка для архітектури armhf

Зберіть виконуваний файл:

```sh
cd Firmware
make scumaker_pilotpi_default
```

Потім завантажте його за допомогою:

```sh
make scumaker_pilotpi_default upload
```

#### Альтернативний метод збірки для armhf (з використанням Docker)

Якщо ви вперше компілюєте з докером, будь ласка, зверніться до [офіційної документації](../test_and_ci/docker.md#prerequisites).

Виконайте команду в директорії firmware:

```sh
./Tools/docker_run.sh "export AUTOPILOT_HOST=192.168.X.X; export AUTOPILOT_USER=ubuntu; export NO_NINJA_BUILD=1; make scumaker_pilotpi_default upload"
```

::: info
mDNS не підтримується з Docker. Ви повинні вказати правильну IP-адресу кожного разу при завантаженні.
:::

::: info Якщо ваша IDE не підтримує збірку ninja, опція `NO_NINJA_BUILD=1` допоможе. Ви можете компілювати без завантаження також. Просто видаліть `upload`.
:::

Також можливо просто скомпілювати код за допомогою команди:

```sh
./Tools/docker_run.sh "make scumaker_pilotpi_default"
```

#### Збірка для архітектури arm64

::: info Цей крок потребує встановлення утиліти `aarch64-linux-gnu`.
:::

Зберіть виконуваний файл:

```sh
cd PX4-Autopilot
make scumaker_pilotpi_arm64
```

Потім завантажте його за допомогою:

```sh
make scumaker_pilotpi_arm64 upload
```

#### Альтернативний метод збірки для arm64 (з використанням Docker)

Якщо ви вперше компілюєте з докером, будь ласка, зверніться до [офіційної документації](../test_and_ci/docker.md#prerequisites).

Виконайте команду в директорії `PX4-Autopilot`:

```sh
./Tools/docker_run.sh "export AUTOPILOT_HOST=192.168.X.X; export AUTOPILOT_USER=ubuntu; export NO_NINJA_BUILD=1; make scumaker_pilotpi_arm64 upload"
```

::: info
mDNS не підтримується з Docker. Ви повинні вказати правильну IP-адресу кожного разу при завантаженні.
:::

::: info Якщо ваша IDE не підтримує збірку ninja, опція `NO_NINJA_BUILD=1` допоможе. Ви можете компілювати без завантаження - просто видаліть `upload`.
:::

Також можливо просто скомпілювати код за допомогою команди:

```sh
./Tools/docker_run.sh "make scumaker_pilotpi_arm64"
```

#### Ручний запуск PX4

Під'єднайтесь через ssh та запустіть за допомогою:

```sh
cd px4
sudo taskset -c 2 ./bin/px4 -s pilotpi_mc.config
```

Тепер PX4 запустився з конфігурацією мультиротора.

Якщо ви стикалися з аналогічною проблемою під час виконання `bin/px4` на вашому Pi, як показано нижче:

```
bin/px4: /lib/xxxx/xxxx: version `GLIBC_2.29' not found (required by bin/px4)
```

Тоді ви повинні скомпілювати з Docker.

Перш ніж перейти до наступного кроку, спочатку видаліть наявну збірку:

```sh
rm -rf build/scumaker_pilotpi_*
```

Потім поверніться до відповідного розділу вище.

### Post налаштування

Будь ласка, зверніться до інструкцій [тут](raspberry_pi_pilotpi_rpios.md)
