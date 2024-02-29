# Інструментарій на віртуальних машинах Windows

:::warning
Це середовище розробки [підтримується та утримується спільнотою](../advanced/community_supported_dev_env.md). Воно може працювати або не працювати з поточними версіями PX4.

Дивіться [Встановлення інструментарію](../dev_setup/dev_env.md) для отримання інформації про середовища та інструменти, які підтримуються основною командою розробників.
:::

Розробники на Windows можуть використовувати інструментарій PX4 у віртуальній машині (VM) з гостьовою операційною системою Linux. Після створення віртуальної машини, установка та налаштування PX4 у VM така сама, як і на звичайному комп'ютері з Linux.

Хоч використання віртуальної машини - це простий спосіб налаштувати та протестувати середовище для збірки прошивки, користувачі повинні взяти до уваги:

1. Збірка прошивки буде повільніша, ніж нативна збірка на Linux.
1. У симуляції JMAVSim частота кадрів набагато повільніша, ніж на рідному Linux. В деяких випадках засіб може розбитися через проблеми, пов'язані з недостатніми ресурсами віртуальної машини.
1. Gazebo та ROS встановлюються, але повільні настільки що ними неможливо користуватись.

:::tip
Виділіть якомога більше ресурсів процесора і пам'яті для VM.
:::

Існує кілька способів налаштування VM, яка здатна виконувати PX4 середовище на вашій системі. Цей посібник допоможе вам налаштувати VMWare. В кінці є неповний розділ для VirtualBox (і ми запрошуємо до розширення цього розділу когось з членів спільноти).

## Налаштування VMWare

Ефективність VMWare прийнятна для основного застосування (збірки прошивки) але не для запуску ROS чи Gazebo Classic.

1. Завантажте [VMWare Player Freeware](https://www.vmware.com/products/workstation-player/workstation-player-evaluation.html)
1. Установіть його на вашу Windows систему
1. Завантажте бажану версію [ISO образу Ubuntu Desktop](https://www.ubuntu.com/download/desktop). (див. [сторінку інструкцій для Linux](../dev_setup/dev_env_linux.md) для рекомендованої версії Ubuntu).
1. Відкрийте _VMWare Player_.
1. Увімкніть 3D прискорення в налаштуваннях VM: **VM > Settings > Hardware > Display > Accelerate 3D graphics**

   :::note
Цей параметр необхідний для належного запуску 3D середовищ симуляції на зразок jMAVSim та Gazebo Classic.
Рекомендуємо зробити це перед встановленням Linux у віртуальному середовищі.
:::

1. Перейдіть до створення нової віртуальної машини.
1. У майстрі створення VM оберіть завантажений ISO образ з Ubuntu як носій установки з якого буде автоматично виявлено операційну систему, яку ви хочете використати.
1. Також у майстрі, оберіть ресурси, які ви хочете виділити віртуальній машині під час роботи. Виділіть стільки пам'яті та ядер процесора скільки зможете таким чином щоб вашою основною Windows системою можна було продовжити користуватись.
1. Run your new VM at the end of the wizard and let it install Ubuntu following the setup instructions. Remember all settings are only for within your host operating system usage and hence you can disable any screen saver and local workstation security features which do not increase risk of a network attack.
1. Once the new VM is booted up make sure you install _VMWare tools drivers and tools extension_ inside your guest system. This will enhance performance and usability of your VM usage:

   - Significantly enhanced graphics performance
   - Proper support for hardware device usage like USB port allocation (important for target upload), proper mouse wheel scrolling, sound support
   - Guest display resolution adaption to the window size
   - Clipboard sharing to host system
   - File sharing to host system

1. Continue with [PX4 environment setup for Linux](../dev_setup/dev_env_linux.md)

## VirtualBox 7 Setup

The setup for VirtualBox is similar to VMWare. Community members, we'd welcome a step-by-step guide here!

### USB passthrough for QGroundControl / Firmware Flashing

:::tip
This section has been tested for VirtualBox 7 running Ubuntu 20.04 LTS on a Windows 10 host machine.
:::

One limitation of virtual machines is that you can't automatically connect to a flight controller attached to the host computer USB port in order to [build and upload PX4 firmware from a terminal](../dev_setup/building_px4.md#uploading-firmware-flashing-the-board). You also can't connect to the flight controller from QGroundControl in the virtual machine.

To allow this, you need to configure USB passthrough settings:

1. Ensure that the user has been added to the dialout group in the VM using the terminal command:

   ```sh
   sudo usermod -a -G dialout $USER
   ```

   Then restart Ubuntu in the virtual machine.

1. Enable serial port(s) in VM: **VirtualBox > Settings > Serial Ports 1/2/3/etc...**
1. Enable USB controller in VM: **VirtualBox > Settings > USB**
1. Add USB filters for the bootloader in VM: **VirtualBox > Settings > USB > Add new USB filter**.

   - Open the menu and plug in the USB cable connected to your autopilot. Select the `...Bootloader` device when it appears in the UI.

     :::note
The bootloader device only appears for a few seconds after connecting USB.
If it disappears before you can select it, disconnect and then reconnect USB.
:::

   - Select the `...Autopilot` device when it appears (this happens after the bootloader completes).

1. Select the device in the VM instance's dropdown menu **VirtualBox > Devices > your_device**

If successful, your device will show up with `lsusb` and QGroundControl will connect to the device automatically. You should also be able to build and upload firmware using a command like:

```sh
make px4_fmu-v5_default upload
```

### Telemetry over WiFi for QGroundControl

If using _QGroundControl_ within a virtual machine you should set the VM networking settings to "Bridged Adapter" mode. This gives the guest OS direct access to networking hardware on the host. If you use the Network Address Translation (NAT), which is set by default for VirtualBox 7 running Ubuntu 20.04 LTS, this will block the outbound UDP packets that QGroundControl uses to communicate with the vehicle.
