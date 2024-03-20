# Raspberry Pi - встановлення ROS

Це посібник про те, як встановити ROS-indigo на Raspberry Pi 2 який виступає комп'ютером компаньйоном для Pixhawk.

## Вимоги
* Робочий Raspberry Pi з монітором, клавіатурою, або налаштованим SSH з'єднанням
* Цей посібник передбачає, що у вас є Raspbian "JESSIE", встановлений на вашому RPi. Якщо ні: [встановіть його](https://www.raspberrypi.org/downloads/raspbian/) або [оновіть](http://raspberrypi.stackexchange.com/questions/27858/upgrade-to-raspbian-jessie) ваш Raspbian Wheezy до Jessie.

## Встановлення
Слідуйте [цьому посібнику](http://wiki.ros.org/ROSberryPi/Installing%20ROS%20Indigo%20on%20Raspberry%20Pi) для актуальної установки ROS Indigo. Примітка: встановіть варіант "ROS-Comm". Варіант Desktop занадто важкий.

### Помилки при встановленні пакетів
Якщо ви хочете завантажити пакети (наприклад `sudo apt-get ros-indigo-ros-tutorials`), ви можете отримати повідомлення про помилку: "unable to locate package ros-indigo-ros-tutorials".

Якщо так, продовжуйте наступним чином: Перейдіть до свого catkin робочого простору (наприклад, ~/ros_catkin_ws) та змініть ім'я пакетів.

```sh

```

Далі, оновіть своє робоче середовище з wstool.

```sh

```

Next (still in your workspace folder), source and make your files.

```sh

```
