# Завантаження прошивки

_QGroundControl_ **desktop** versions can be used to install PX4 firmware onto [Pixhawk-series](../getting_started/flight_controller_selection.md) flight-controller boards.

:::warning
**Перед початком встановлення прошивки** всі USB-підключення до транспортного засобу повинні бути _відключені_ (як прямі, так і через телеметричне радіо). Транспортний засіб _не повинен_ бути приводжений в рух від акумулятора.
:::

## Встановити стабільну PX4

В цілому, ви повинні використовувати останню версію _випущену_ версії PX4, для того, щоб отримати користь від виправлень помилок і отримати найновіші та найліпші функції.

:::tip
Ця версія встановлена за замовчуванням.
:::

Щоб встановити PX4:

1. Запустіть _QGroundControl_ та підключіть транспортний засіб.
1. Виберіть піктограму **"Q" > Налаштування програми > Firmware** (бічна панель), щоб відкрити _Налаштування прошивки_.

   ![Firmware disconnected](../../assets/qgc/setup/firmware/firmware_disconnected.png)

1. Підключіть польотний контролер безпосередньо до вашого комп'ютера через USB.

   ::: info
Connect directly to a powered USB port on your machine (do not connect through a USB hub).
:::

1. Select the **PX4 Pro Stable Release vX.x.x** option to install the latest stable version of PX4 _for your flight controller_ (autodetected).

   ![Install PX4 default](../../assets/qgc/setup/firmware/firmware_connected_default_px4.png)

1. Click the **OK** button to start the update.

   Прошивка потім пройде кілька етапів оновлення (завантаження нової прошивки, видалення старої прошивки тощо). Кожен крок виводиться на екран та загальний прогрес відображається на панелі прогресу.

   ![Firmware upgrade complete](../../assets/qgc/setup/firmware/firmware_upgrade_complete.png)

   Once the firmware has completed loading, the device/vehicle will reboot and reconnect.

:::tip
Якщо _QGroundControl_ встановлює ціль FMUv2 (див. консоль під час встановлення) і у вас є новіша плата, вам може знадобитися [оновити завантажувальник](#bootloader), щоб мати доступ до всієї пам'яті на вашому контролері польоту.
:::

Далі вам потрібно буде вказати [корпус повітряного судна](../config/airframe.md) (а потім сенсори, радіо тощо)

<a id="custom"></a>

## Встановлення PX4 Main, Beta або Custom Firmware

Щоб встановити іншу версію PX4:

1. Connect the vehicle as above, and select **PX4 Pro Stable Release vX.x.x**. ![Install PX4 version](../../assets/qgc/setup/firmware/qgc_choose_firmware.png)
1. Check **Advanced settings** and select the version from the dropdown list:
   - **Standard Version (stable):** The default version (i.e. no need to use advanced settings to install this!)
   - **Beta Testing (beta):** A beta/candidate release. Only available when a new release is being prepared.
   - **Developer Build (master):** The latest build of PX4/PX4-Autopilot _main_ branch.
   - **Custom Firmware file...:** A custom firmware file (e.g. [that you have built locally](../dev_setup/building_px4.md)). If you select this you will have to choose the custom firmware from the file system in the next step.

Оновлення прошивки потім продовжується, як і раніше.

<a id="bootloader"></a>

## Оновлення завантажувача

Апаратне забезпечення Pixhawk зазвичай має відповідну версію завантажувача.

Якщо оновлення може знадобитися - це новіші дошки Pixhawk, які встановлюють прошивку FMUv2. Якщо _QGroundControl_ встановлює ціль FMUv2 (див. консоль під час встановлення), і у вас є новіша плата, вам може знадобитися оновити завантажувальник, щоб мати доступ до всієї пам'яті на вашому контролері польоту.

![FMUv2 update](../../assets/qgc/setup/firmware/bootloader_update.jpg)

Ви можете оновити його, дотримуючись інструкцій у [Оновлення завантажувача >  Оновлення завантажувача FMUv2](../advanced_config/bootloader_update.md#fmuv2-bootloader-update).

## Детальна інформація

- [QGroundControl User Guide > Firmware](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/setup_view/firmware.html).
- [PX4 Setup Video](https://youtu.be/91VGmdSlbo4) (Youtube)
