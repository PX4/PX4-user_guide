# Автопілот Raspberry Pi 2/3/4 Navio2

<LinkedBadge type="warning" text="Experimental" url="../flight_controller/autopilot_experimental.html"/>

:::warning PX4 не виробляє цей (чи будь-який інший) автопілот. Зверніться до [виробника](https://emlid.com/) щодо підтримки апаратного забезпечення чи питань відповідності вимогам.
:::

Це "швидкий старт" розробника для автопілотів Raspberry Pi 2/3/4 Navio2. Він дозволяє збирати PX4 і переносити на RasPi, або збирати нативно.

![Ra Pi Image](../../assets/hardware/hardware-rpi2.jpg)

## Образ OS

Використовуйте попередньо налаштований образ [Emlid Raspberry Pi OS для Navio 2](https://docs.emlid.com/navio2/configuring-raspberry-pi). Образ за замовчуванням вже містить більшість процедур налаштування, показаних нижче.

:::warning
Переконайтеся, що ви не оновлюєте систему (точніше, ядро). Під час оновлення може бути встановлено нове ядро, у якому відсутня необхідна підтримка HW (ви можете перевірити за допомогою `ls /sys/class/pwm`, каталог не повинен бути порожнім).
:::

## Встановлення доступу

Образ OS Raspberry Pi вже має налаштований SSH. Ім'я користувача "pi" та пароль "raspberry". Для цілей цього посібника ми припускаємо, що ім'я користувача та пароль залишаються цими за замовчуванням.

Щоб налаштувати підключення Pi до локальної мережі Wi-Fi, дотримуйтесь [цього посібника](https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md) або підключіть його за допомогою кабелю Ethernet.

Для підключення до вашого Pi через SSH використовуйте стандартне ім'я користувача (`pi`) та ім'я хоста (`navio`). Крім того (якщо це не спрацювало), ви можете знайти IP-адресу вашого RPi та вказати її.

```sh
ssh pi@navio.local
```

або

```sh
ssh pi@<IP-ADDRESS>
```

## Розширення файлової системи

Розширте файлову систему, щоб використовувати всю SD-карту під час запуску:

```sh
sudo raspi-config --expand-rootfs
```

## Вимикання оверлея Navio RGB

Існуючий оверлей Navio RGB використовує GPIO, що використовуються PX4 для RGB Led. Відредагуйте `/boot/config.txt`, закоментувавши рядок, що вмикає оверлей `navio-rgb`.

```
#dtoverlay=navio-rgb
```

## Тестування передачі файлів

Ми використовуємо SCP для передачі файлів з комп'ютера для розробки на цільову плату через мережу (WiFi або Ethernet).

Щоб перевірити налаштування, спробуйте передати файл з ПК для розробки на Pi через мережу зараз. Переконайтеся, що у Pi є доступ до мережі, і ви можете використовувати SSH для входу.

```sh
echo "Hello" > hello.txt
scp hello.txt pi@navio.local:/home/pi/
rm hello.txt
```

Це повинно скопіювати файл "hello.txt" у домашню директорію вашого Pi. Перевірте, що файл дійсно було скопійовано, і ви можете перейти до наступного кроку.

## Збірка коду

:::info
Бінарні файли PX4 для Navio 2 можна зібрати лише в Ubuntu 18.04.
Ubuntu 20.04 та пізніші версії на даний момент не працюють (на вересень 2023 року). 
:::

Дотримуйтесь наведених нижче інструкцій, щоб зібрати вихідний код на вашому комп'ютері для розробки і перенести скомпільовану програму на Pi. Зверніть увагу, що у попередніх версіях дозволялося збудувати код нативно (на Pi), але ця опція більше не доступна.

### Збірка крос-компілятора

Спочатку встановіть [стандартне середовище розробника PX4](../dev_setup/dev_env_linux_ubuntu.md#raspberry-pi) на ваш комп'ютер з Ubuntu 18.04.

Вкажіть IP-адресу (або ім'я хоста) вашого Pi:

```sh
export AUTOPILOT_HOST=navio.local
```

або

```sh
export AUTOPILOT_HOST=192.168.X.X
```

::: info The value of the environment variable should be set before the build, or `make upload` will fail to find your Pi.
:::

Build the executable file on your development machine:

```sh
cd PX4-Autopilot
make emlid_navio2
```

The "px4" executable file is in the directory **build/emlid_navio2_default/**. Make sure you can connect to your Pi over SSH, see [instructions how to access your Pi](#setting-up-access) following the instructions for armhf under Raspberry Pi.

Then upload it with:

```sh
cd PX4-Autopilot
make emlid_navio2 upload
```

Then, connect over ssh and run it on the Pi (as root):

```sh
cd ~/px4
sudo ./bin/px4 -s px4.config
```

A successful build followed by executing px4 will give you something like this:

```sh

______  __   __    ___
| ___ \ \ \ / /   /   |
| |_/ /  \ V /   / /| |
|  __/   /   \  / /_| |
| |     / /^\ \ \___  |
\_|     \/   \/     |_/

px4 starting.


pxh>
```

## Автозавантаження

To autostart px4, add the following to the file **/etc/rc.local** (adjust it accordingly if you use native build), right before the `exit 0` line:

```sh
cd /home/pi && ./bin/px4 -d -s px4.config > px4.log
```
