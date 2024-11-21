# Auterion Skynode

[Skynode](https://auterion.com/product/skynode/) is a powerful flight computer that combines a mission computer, flight controller, video streaming, networking, and cellular connection, in a single tightly integrated device.

![Auterion Skynode (Enterprise)](../../assets/companion_computer/auterion_skynode/skynode_small.png)

Вбудоване програмне забезпечення - це Auterion OS, що складається з підприємницької версії PX4, яка працює на контролері польоту, і операційної системи з високорівневим програмним забезпеченням управління, що працює на комп'ютері для виконання завдань.
ОС керується Auterion на виробництві, із клієнтськими програмами, що працюють як "додатки" в безпечному пісочниці в місійному комп'ютері.

Auterion OS і Skynode дозволяють безпроблемну інтеграцію з іншими програмами Auterion та продуктами управління флотом.

Для отримання інформації про Auterion і Skynode, звертайтесь за наступним посиланням:

- [auterion.com](https://auterion.com/)
- [Skynode](https://auterion.com/product/skynode/) (auterion.com)
- Посібник Skynode:
  - [Manufacturer's Guide](https://docs.auterion.com/manufacturers/getting-started/readme)
  - [App Developer's Guide](https://docs.auterion.com/developers/getting-started/readme)

## Skynode з Vanilla PX4

Skynode з поставкою Auterion управляється версією PX4.
If you would like to try a more recent PX4 flight kernel, you can install the upstream "vanilla" PX4 from [PX4/PX4-Autopilot](https://github.com/PX4/PX4-Autopilot).

Загалом, вихідний PX4 буде працювати, з наступними обмеженнями:

- Конфігурація саме для вашого продукту може бути відсутня.
  Ви можете втратити конфігурацію для ESC, акумуляторів, конфігурації датчиків тощо.
- Деякі параметри можуть мати інші значення за замовчуванням у випуску PX4, що постачається з Auterion OS.
- Функції, до яких можна отримати доступ за допомогою індивідуальних налаштувань постачальника, які працюють на комп’ютері-супутнику, можуть бути відсутні в PX4.
- Auterion підтримує Skynode під керуванням власної версії PX4, керованої Auterion.

## Побудова/Завантаження Прошивки

PX4 `px4_fmu-v5x` binaries for Skynode are built from source using the normal [developer environment](../dev_setup/dev_env.md) and [build commands](../dev_setup/building_px4.md), and are uploaded using either `upload_skynode_usb` or `upload_skynode_wifi` upload targets.

`upload_skynode_usb` and `upload_skynode_wifi` connect to Skynode via SSH over a network interface using the default (fixed) IP addresses for [USB](https://docs.auterion.com/manufacturers/avionics/skynode/advanced-configuration/connecting-to-skynode) and [WiFi](https://docs.auterion.com/manufacturers/avionics/skynode/advanced-configuration/configuration), and upload a TAR compressed binary to the mission computer.
Потім місійний комп'ютер розпаковує бінарний файл та встановлює його на контролер польоту.

:::info
SSH and TAR are needed to use these upload targets, but are expected to be present by default on Ubuntu and Ubuntu running on Windows in WSL2.
On macOS you should first install [gnu-tar](https://formulae.brew.sh/formula/gnu-tar).
:::

Під час процесу завантаження вам доведеться ввести пароль для зображення розробника Skynode двічі.

:::: tabs

:::tab "Skynode connected via USB"

```
make px4_fmu-v5x upload_skynode_usb
```

:::

:::tab "Skynode connected via WiFi"

```
make px4_fmu-v5x upload_skynode_wifi
```

:::

::::

## Відновлення прошивки PX4 за промовчанням

Щоб перевстановити оригінальну версію Skynode PX4 при підключенні через USB, виконайте таку команду в репозиторії:

:::: tabs

:::tab "Skynode connected via USB"

```
./Tools/auterion/upload_skynode.sh --revert
```

:::

:::tab "Skynode connected via WiFi"

```
./Tools/auterion/upload_skynode.sh --revert --wifi
```

:::

::::
