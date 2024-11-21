# Встановлення драйвера на Ubuntu для Intel RealSense R200

Цей навчальний посібник має на меті надати інструкції щодо встановлення драйвера камери Intel RealSense R200 у середовищі Linux, так щоб зібрані зображення можна було доступити через систему робототехніки (ROS).
Голова камери RealSense R200 зображена нижче:

![Intel Realsense Camera front view](../../assets/hardware/sensors/realsense/intel_realsense.png)

Встановлення пакету драйвера виконується на операційній системі Ubuntu, яка працює як гостьова ОС у Virtual Box.
Специфікації хост-комп'ютера, на якому запущено Virtual Box, самого Virtual Box та гостьової системи подано нижче:

- Операційна система хоста: Windows 8
- Процесор: Intel(R) Core(TM) i7-4702MQ CPU @ 2.20GHz
- Віртуальний ящик: Oracle VM. Версія 5.0.14 r105127
- Розширення: Встановлено пакет розширень для VirtualBox (необхідно для підтримки USB3)
- Операційна система гостя: Linux - Ubuntu 14.04.3 LTS

У наведеному порядку, в першій частині показано, як встановити Ubuntu 14.04 як гостьову операційну систему в Virtual Box. У другій частині показано, як встановити ROS Indigo та драйвер камери. Додатково часто вживані вирази мають наступне значення:

- Virtual Box (VB): Програма, яка запускає різні віртуальні машини. У цьому випадку  Oracle VM.
- Віртуальна машина (VM): Операційна система, яка працює в Virtual Box як гостьова система. У цьому випадку Ubuntu.

## Встановлення Ubuntu 14.04.3 LTS в Virtual Box

- Створіть нову віртуальну машину (VM): Linux 64-Bit.
- Download the iso file of Ubuntu 14.04.3 LTS: ([ubuntu-14.04.3-desktop-amd64.iso](https://ubuntu.com/download/desktop)).
- Установка Ubuntu:
  - Під час процедури встановлення залиште непозначеними наступні дві опції:
    - Завантажувати оновлення під час встановлення
    - Встановити це програмне забезпечення третьої сторони
- Після встановлення можливо знадобиться увімкнути VirtualBox для відображення Ubuntu на всьому робочому столі:
  - Start VM Ubuntu and login, Click on **Devices->Insert Guest Additions CD image** in the menu bar of the Virtual Box.
  - Click on **Run** and enter password on the windows that pop up in Ubuntu.
  - Зачекайте, поки завершиться встановлення, а потім перезапустіть систему.
    Тепер систему можна відображати на всьому робочому столі.
  - Якщо в Ubuntu з'явиться вікно, яке запитує про оновлення, відхиліть оновлення на цьому етапі.
- Увімкніть контролер USB 3 в Virtual Box:
  - Вимкнути віртуальну машину
  - Перейдіть до налаштувань віртуальної машини у меню вибору USB і оберіть: "USB 3.0(xHCI)".
    Це можливо лише у випадку, якщо ви встановили пакет розширення для віртуальної машини Virtual Box.
  - Запустіть віртуальну машину знову.

## Встановлення ROS Indigo

- Follow instructions given at [ROS indigo installation guide](http://wiki.ros.org/indigo/Installation/Ubuntu):
  - Встановити версію Desktop-Full.
  - Виконайте кроки, описані в розділах "Ініціалізація rosdep" та "Налаштування середовища".

## Встановлення драйвера камери

- Встановіть Git

  ```sh
  sudo apt-get install git
  ```

- Завантажте та встановіть драйвер:

  - Clone [RealSense_ROS repository](https://github.com/bestmodule/RealSense_ROS):

    ```sh
    git clone https://github.com/bestmodule/RealSense_ROS.git
    ```

- Follow instructions given in [here](https://github.com/bestmodule/RealSense_ROS/tree/master/r200_install).

  - Натисніть кнопку "Enter", коли з'явиться питання про встановлення наступних пакетів:

    ```sh
    Intel Low Power Subsystem support in ACPI mode (MFD_INTEL_LPSS_ACPI) [N/m/y/?] (NEW)
    ```

    ```sh
    Intel Low Power Subsystem support in PCI mode (MFD_INTEL_LPSS_PCI) [N/m/y/?] (NEW)
    ```

    ```sh
    Dell Airplane Mode Switch driver (DELL_RBTN) [N/m/y/?] (NEW)
    ```

  - Повідомлення про помилку, яке може з'явитися в кінці процесу встановлення, не повинно призводити до неполадок драйвера:

    ```sh
    rmmod: ERROR: Module uvcvideo is not currently loaded
    ```

- Після завершення встановлення перезавантажте віртуальну машину.

- Тест драйвера камери:

  - Підключіть камеру Intel RealSense до комп'ютера за допомогою кабелю USB3, який вставлено в роз'єм USB3 на комп'ютері.
  - Click on Devices->USB-> Intel Corp Intel RealSense 3D Camera R200 in the menu bar of the Virtual Box, in order to forward the camera USB connection to the Virtual Machine.
  - Виконайте файл [розпакованої теки]/Bin/DSReadCameraInfo:

    - Якщо з'явиться наступне повідомлення про помилку, відключіть камеру (фізично від'єднайте USB-кабель від комп'ютера). Plug it in again + Click on Devices->USB-> Intel Corp Intel RealSense 3D Camera R200 in the menu bar of the Virtual Box again and execute again the file [unpacked folder]/Bin/DSReadCameraInfo.

      ```sh
      DSAPI call failed at ReadCameraInfo.cpp:134!
      ```

    - Якщо драйвер камери працює і розпізнає камеру Intel RealSense R200, ви повинні побачити конкретну інформацію про камеру Intel RealSense R200.

- Інсталяція та тестування ROS nodelet:
  - Follow the installation instructions in the "Installation" section given [here](https://github.com/bestmodule/RealSense_ROS/blob/master/realsense_dist/2.3/doc/RealSense-ROS-R200-nodelet.md), to install the ROS nodlet.
  - Follow the instructions in the "Running the R200 nodelet" section given [here](https://github.com/bestmodule/RealSense_ROS/blob/master/realsense_dist/2.3/doc/RealSense-ROS-R200-nodelet.md), to test the ROS nodlet together with the Intel RealSense R200 camera head.
    - Якщо все працює правильно, різні потоки даних з камери Intel RealSense R200 публікуються як ROS-теми.
