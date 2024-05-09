# PilotPi з Raspberry Pi OS

## Швидкий старт для розробника

### Образ OS

Завжди рекомендується найновіший офіційний образ [Raspberry Pi OS Lite](https://downloads.raspberrypi.org/raspios_lite_armhf_latest).

Для встановлення вам потрібно мати працююче SSH-з'єднання з RPi.

### Налаштування доступу (необов'язково)

#### Hostname та mDNS

mDNS допомагає вам під'єднатися до вашого RasPi за допомогою імені хоста замість IP-адреси.

```sh
sudo raspi-config
```

Перейдіть до **Network Options > Hostname**. Встановіть та вийдіть. Ви можете також налаштувати [автентифікацію без пароля](https://www.raspberrypi.org/documentation/remote-access/ssh/passwordless.md).

### Налаштування OS

#### config.txt

```sh
sudo nano /boot/config.txt
```

Замініть на:

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

```sh
sudo raspi-config
```

**Interfacing Options > Serial > login shell = No > hardware = Yes**. Увімкніть UART, але без логіну в shell.

```sh
sudo nano /boot/cmdline.txt
```

Додайте `isolcpus=2` після останнього слова. Весь файл буде:

```sh
console=tty1 root=PARTUUID=xxxxxxxx-xx rootfstype=ext4 elevator=deadline fsck.repair=yes rootwait isolcpus=2
```

Це вказує ядру Linux не планувати жодного процесу на ядрі CPU 2. Ми пізніше вручну запустимо PX4 на цьому ядрі.

Перезавантажте та увійдіть за допомогою SSH на ваш RasPi.

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

Перевірте інтерфейс SPI

```sh
ls /dev/spidev*
```

Має бути `/dev/spidev0.0`.

#### rc.local

У цьому розділі ми налаштуємо скрипт автозапуску в **rc.local**.

```sh
sudo nano /etc/rc.local
```

Додайте нижче наведений вміст до файлу над `exit 0`:

```sh
echo "25" > /sys/class/gpio/export
echo "in" > /sys/class/gpio/gpio25/direction
if [ $(cat /sys/class/gpio/gpio25/value) -eq 1 ] ; then
        echo "Launching PX4"
        cd /home/pi/px4 ; nohup taskset -c 2 ./bin/px4 -d -s pilotpi_mc.config 2 &> 1 > /home/pi/px4/px4.log &
fi
echo "25" > /sys/class/gpio/unexport
```

Збережіть та вийдіть.

::: info
Не забудьте вимкнути перемикач, коли він не потрібен.
:::

#### CSI камера

::: info
Увімкнення камери CSI призведе до зупинки роботи будь-чого на I2C-0.
:::

```sh
sudo raspi-config
```

**Interfacing Options > Camera**

### Збірка коду

Для завантаження _найостаннішої_ версії на свій комп'ютер, введіть у терміналі наступну команду:

```sh
git clone https://github.com/PX4/PX4-Autopilot.git --recursive
```

::: info
Це все, що вам необхідно для збірки найновішого коду.
:::

#### Кросс збірка для операційної системи Raspberry Pi

Встановіть IP-адресу (або ім'я хоста) вашого RPi за допомогою:

```sh
export AUTOPILOT_HOST=192.168.X.X
```

або

```sh
export AUTOPILOT_HOST=pi_hostname.local
```

Зберіть виконуваний файл:

```sh
cd PX4-Autopilot
make scumaker_pilotpi_default
```

Потім завантажте його за допомогою:

```sh
make scumaker_pilotpi_default upload
```

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

Тоді ви повинні скомпілювати за допомогою Docker замість цього.

Перш ніж перейти до наступного кроку, спочатку видаліть наявну збірку:

```sh
rm -rf build/scumaker_pilotpi_default
```

### Альтернативний метод збірки (з використанням Docker)

Наступний метод може надати ті ж набори інструментів, що використовуються в CI.

Якщо ви вперше компілюєте з докером, будь ласка, зверніться до [офіційної документації](../test_and_ci/docker.md#prerequisites).

Виконайте команду в директорії PX4-Autopilot:

```sh
./Tools/docker_run.sh "export AUTOPILOT_HOST=192.168.X.X; export NO_NINJA_BUILD=1; make scumaker_pilotpi_default upload"
```

::: info
mDNS не підтримується з Docker. Вам потрібно вказувати правильну IP-адресу кожного разу під час завантаження.
:::

::: info Якщо ваша IDE не підтримує збірку ninja, опція `NO_NINJA_BUILD=1` допоможе. Ви можете компілювати без завантаження також. Просто видаліть папку `upload`.
:::

Також можливо просто скомпілювати код за допомогою команди:

```sh
./Tools/docker_run.sh "make scumaker_pilotpi_default"
```

### Післяконфігурація

Вам потрібно перевірити ці додаткові елементи, щоб ваш апарат працював належним чином.

#### Конфігурація приводу

Спочатку встановіть параметр [CA_AIRFRAME](../advanced_config/parameter_reference.md#CA_AIRFRAME) для вашого апарату.

Після цього ви зможете призначити виводи, використовуючи звичайний [Actuator Configuration](../config/actuators.md) екран конфігурації (для драйвера виводу RasPi PWM з'явиться вкладка виводу).

#### Зовнішній компас

У скрипті запуску (`*.config`), ви знайдете

```sh
# external GPS & compass
gps start -d /dev/ttySC0 -i uart -p ubx -s
#hmc5883 start -X
#ist8310 start -X
```

Розкоментуйте правильний варіант для вашого випадку. Не впевнені, який компас використовується з вашим модулем GPS? Виконайте наступні команди та перегляньте вивід:

```sh
sudo apt-get update
sudo apt-get install i2c-tools
i2cdetect -y 0
```

Приклад виводу:

```
     0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f
00:          -- -- -- -- -- -- -- -- -- -- -- 0e --
10: -- -- -- -- -- -- -- -- -- -- -- -- -- -- 1e --
20: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
30: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
40: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
50: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
60: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
70: -- -- -- -- -- -- -- --
```

`1e` вказує на те, що компас на основі HMC5883 встановлено на зовнішній шині I2C. Так само, IST8310 має значення `0e`.

::: info Зазвичай у вас є лише один з них. Інші пристрої також будуть відображатися тут, якщо вони підключені до зовнішньої шини I2C. (`/dev/i2c-0`)
:::
