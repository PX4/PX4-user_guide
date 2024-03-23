# Встановлення драйвера на Ubuntu для Intel RealSense R200

Цей навчальний посібник має на меті надати інструкції щодо встановлення драйвера камери Intel RealSense R200 у середовищі Linux, так щоб зібрані зображення можна було доступити через систему робототехніки (ROS). Головка камери RealSense R200 зображена нижче:

![Intel Realsense Camera front view](../../assets/hardware/sensors/realsense/intel_realsense.png)

Встановлення пакету драйвера виконується на операційній системі Ubuntu, яка працює як гостьова ОС у Virtual Box. Специфікації хост-комп'ютера, на якому запущено Virtual Box, самого Virtual Box та гостьової системи подано нижче:

- Host Operation System: Windows 8
- Processor: Intel(R) Core(TM) i7-4702MQ CPU @ 2.20GHz
- Virtual Box: Oracle VM. Version 5.0.14 r105127
- Extensions: Extension package for Virtual Box installed (Needed for USB3 support)
- Guest Operation System: Linux - Ubuntu 14.04.3 LTS

У наведеному порядку, в першій частині показано, як встановити Ubuntu 14.04 як гостьову операційну систему в Virtual Box. In a second part is shown how to install ROS Indigo and the camera driver. Додатково часто вживані вирази мають наступне значення:

- Virtual Box (VB): Program that runs different Virtual Machines. In this case the Oracle VM.
- Віртуальна машина (VM): Операційна система, яка працює в Virtual Box як гостьова система. У цьому випадку Ubuntu.

## Встановлення Ubuntu 14.04.3 LTS в Virtual Box

- Create a new Virtual Machine (VM): Linux 64-Bit.
- Download the iso file of Ubuntu 14.04.3 LTS: ([ubuntu-14.04.3-desktop-amd64.iso](https://ubuntu.com/download/desktop)).
- Installation of Ubuntu:
  - During the installation procedure leave the following two options unchecked:
    - Download updates while installing
    - Install this third party software
- After the installation you might need to enable the Virtual Box to display Ubuntu on the whole desktop:
  - Start VM Ubuntu and login, Click on **Devices->Insert Guest Additions CD image** in the menu bar of the Virtual Box.
  - Click on **Run** and enter password on the windows that pop up in Ubuntu.
  - Wait until the installation is completed and then restart. Now, it should be possible to display the VM on the whole desktop.
  - If a window pops up in Ubuntu that asks whether to update, reject to update at this point.
- Enable USB 3 Controller in Virtual Box:
  - Shut down Virtual Machine.
  - Go to the settings of the Virtual Machine to the menu selection USB and choose: "USB 3.0(xHCI)". This is only possible if you have installed the extension package for the Virtual Box.
  - Start the Virtual Machine again.

## Installing ROS Indigo

- Follow instructions given at [ROS indigo installation guide](http://wiki.ros.org/indigo/Installation/Ubuntu):
  - Install Desktop-Full version.
  - Execute steps described in the sections "Initialize rosdep" and "Environment setup".

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

- Дотримуйтеся інструкцій, наведених [тут](https://github.com/bestmodule/RealSense_ROS/tree/master/r200_install).

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
  - Натисніть на Пристрої->USB-> Intel Corp Intel RealSense 3D Camera R200 у меню панелі Virtual Box, щоб переслати підключення USB камери в віртуальну машину.
  - Виконайте файл [розпакованої теки]/Bin/DSReadCameraInfo:

    - Якщо з'явиться наступне повідомлення про помилку, відключіть камеру (фізично від'єднайте USB-кабель від комп'ютера). Підключіть його знову + Натисніть на Пристрої->USB-> Intel Corp Intel RealSense 3D Camera R200 у меню панелі Virtual Box знову і виконайте знову файл [розпакованої теки]/Bin/DSReadCameraInfo.

      ```sh
      DSAPI call failed at ReadCameraInfo.cpp:134!
      ```

    - Якщо драйвер камери працює і розпізнає камеру Intel RealSense R200, ви повинні побачити конкретну інформацію про камеру Intel RealSense R200.

- Інсталяція та тестування ROS nodelet:
  - Дотримуйтеся інструкцій з розділу "Установка", наведеного [тут](https://github.com/bestmodule/RealSense_ROS/blob/master/realsense_dist/2.3/doc/RealSense-ROS-R200-nodelet.md), щоб встановити ROS nodelet.
  - Дотримуйтеся інструкцій в розділі "Запуск R200 nodelet", наведеному [тут](https://github.com/bestmodule/RealSense_ROS/blob/master/realsense_dist/2.3/doc/RealSense-ROS-R200-nodelet.md), щоб протестувати ROS nodelet разом із камерою Intel RealSense R200.
    - Якщо все працює правильно, різні потоки даних з камери Intel RealSense R200 публікуються як ROS-теми.
