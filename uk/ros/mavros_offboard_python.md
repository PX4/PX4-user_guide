# MAVROS _Offboard_ control приклад (Python)

Цей посібник показує основи _OFFBOARD_ контроль за MAVROS Python, використовуючи Iris quadcopter, імітований в [Gazebo Classic](../sim_gazebo_classic/README.md). Він надає покрокові інструкції, що демонструють як почати розробку програм для керування засобом та виконання коду в симуляції.

У кінці посібника ви повинні побачити таку ж поведінку, як і в нижченаведеному відео, повільний зліт на висоту 2 метри.

:::warning
_OFFBOARD_ керування небезпечно. Якщо ви керуєте реальним транспортним засобом, то обов'язково майте можливість отримати назад ручне керування на випадок, якщо щось піде не так.
:::

:::tip
Цей приклад використовує Python. Інші приклади на Python можна знайти тут: [integrationtests/python_src/px4_it/mavros](https://github.com/PX4/PX4-Autopilot/tree/main/integrationtests/python_src/px4_it/mavros).
:::

<a id="offb_video"></a>

<video width="100%" autoplay="true" controls="true">
 <source src="../../assets/simulation/gazebo_classic/gazebo_offboard.webm" type="video/webm">
</video>

## Створення пакету ROS

1. Відкрийте термінал і перейдіть до директорії `~/catkin_ws/src`

   ```sh
   roscd  # Should cd into ~/catkin_ws/devel
   cd ..
   cd src
   ```

2. В `~/catkin_ws/src` директорії створіть новий пакет з назвою `offboard_py` (у цьому випадку) з `rospy` залежностями:

   ```sh
   catkin_create_pkg offboard_py rospy
   ```

3. Створіть новий пакет у директорії `~/catkin_ws/`:

   ```sh
   cd .. # Assuming previous directory to be ~/catkin_ws/src
   catkin build
   source devel/setup.bash
   ```

4. Тепер ви можете мати можливість перейти до пакета, використовуючи:

   ```sh
   
   ```

5. Щоб зберегти свої Python файли, створіть нову папку з назвою `/scripts` у пакеті:

   ```sh
   mkdir scripts
   cd scripts
   ```

## Код

Після створення пакету ROS та директорії скриптів, ви готові до запуску вашого Python скрипту. Всередині папки зі скриптами створить `offb_node.py` файл і надайте йому права на виконування:

```sh
touch offb_node.py
chmod +x offb_node.py
```

Після цього відкрийте `offb_node.py` та вставте наступний код:

```py
"""
 * File: offb_node.py
 * Stack and tested in Gazebo Classic 9 SITL
"""

#! /usr/bin/env python

import rospy
from geometry_msgs.msg import PoseStamped
from mavros_msgs.msg import State
from mavros_msgs.srv import CommandBool, CommandBoolRequest, SetMode, SetModeRequest

current_state = State()

def state_cb(msg):
    global current_state
    current_state = msg


if __name__ == "__main__":
    rospy.init_node("offb_node_py")

    state_sub = rospy.Subscriber("mavros/state", State, callback = state_cb)

    local_pos_pub = rospy.Publisher("mavros/setpoint_position/local", PoseStamped, queue_size=10)

    rospy.wait_for_service("/mavros/cmd/arming")
    arming_client = rospy.ServiceProxy("mavros/cmd/arming", CommandBool)

    rospy.wait_for_service("/mavros/set_mode")
    set_mode_client = rospy.ServiceProxy("mavros/set_mode", SetMode)


    # Setpoint publishing MUST be faster than 2Hz
    rate = rospy.Rate(20)

    # Wait for Flight Controller connection
    while(not rospy.is_shutdown() and not current_state.connected):
        rate.sleep()

    pose = PoseStamped()

    pose.pose.position.x = 0
    pose.pose.position.y = 0
    pose.pose.position.z = 2

    # Send a few setpoints before starting
    for i in range(100):
        if(rospy.is_shutdown()):
            break

        local_pos_pub.publish(pose)
        rate.sleep()

    offb_set_mode = SetModeRequest()
    offb_set_mode.custom_mode = 'OFFBOARD'

    arm_cmd = CommandBoolRequest()
    arm_cmd.value = True

    last_req = rospy.Time.now()

    while(not rospy.is_shutdown()):
        if(current_state.mode != "OFFBOARD" and (rospy.Time.now() - last_req) > rospy.Duration(5.0)):
            if(set_mode_client.call(offb_set_mode).mode_sent == True):
                rospy.loginfo("OFFBOARD enabled")

            last_req = rospy.Time.now()
        else:
            if(not current_state.armed and (rospy.Time.now() - last_req) > rospy.Duration(5.0)):
                if(arming_client.call(arm_cmd).success == True):
                    rospy.loginfo("Vehicle armed")

                last_req = rospy.Time.now()

        local_pos_pub.publish(pose)

        rate.sleep()

```

## Пояснення коду

Пакет `mavros_msgs` містить всі власні повідомлення, необхідні для роботи сервісів і тем, які надаються пакунком MAVROS. Усі сервіси та теми, а також їх відповідні типи повідомлень задокументовані в [mavros wiki](http://wiki.ros.org/mavros).

```py
import rospy
from geometry_msgs.msg import PoseStamped
from mavros_msgs.msg import State
from mavros_msgs.srv import CommandBool, CommandBoolRequest, SetMode, SetModeRequest
```

Ми створюємо простий виклик, який буде зберігати поточний стан автопілота. Це дозволить нам перевірити підключення, arming та _OFFBOARD_ параметри.:

```py
current_state = State()

def state_cb(msg):
    global current_state
    current_state = msg
```

Ми створюємо екземпляр видавця для публікації командної локальної позиції та відповідних клієнтів для запиту на arming та зміни режиму. Зверніть увагу, що для вашої власної системи, префікс "mavros" може відрізнятися, так як це буде залежати від імені, даного вузлу в файлі запуску.

```py
state_sub = rospy.Subscriber("mavros/state", State, callback = state_cb)

local_pos_pub = rospy.Publisher("mavros/setpoint_position/local", PoseStamped, queue_size=10)

rospy.wait_for_service("/mavros/cmd/arming")
arming_client = rospy.ServiceProxy("mavros/cmd/arming", CommandBool)

rospy.wait_for_service("/mavros/set_mode")
set_mode_client = rospy.ServiceProxy("mavros/set_mode", SetMode)
```

PX4 має тайм-аут 500 мс між двома _OFFBOARD_ командами. Якщо цей тайм-аут перевищено, командир повернеться до останнього режиму, до того як увійти у _OFFBOARD_ режим. Ось чому швидкість публікації **має** бути вищою за 2 Гц, щоб також врахувати можливі затримки. Це також та сама причина, чому **рекомендовано переходити в режим _OFFBOARD_ з режиму _Position_**, таким чином, якщо транспортний засіб виходить з _OFFBOARD_ він зупиниться на місці та зависне.

Тут ми відповідно встановлюємо швидкість публікації:

```py
# Setpoint publishing MUST be faster than 2Hz
rate = rospy.Rate(20)
```

Перш ніж щось публікувати, ми чекаємо встановлення зв'язку між MAVROS і автопілотом. Цей цикл має закінчитись, щойно буде отримано повідомлення про hearbeat.

```py
# Wait for Flight Controller connection
while(not rospy.is_shutdown() and not current_state.connected):
    rate.sleep()
```

Попри те, що PX4 працює в координатній площині NED, MAVROS переводить ці координати до ENU стандарту та навпаки. Ось чому ми визначаємо `z` як 2:

```py
pose = PoseStamped()

pose.pose.position.x = 0
pose.pose.position.y = 0
pose.pose.position.z = 2
```

Перш ніж увійти в режим _OFFBOARD_, ви повинні вже розпочати потокове передавання заданих значень. В іншому випадку перемикач режиму буде відхилено. Нижче, `100` було обрано у якості довільного значення.

```py
# Send a few setpoints before starting
for i in range(100):
    if(rospy.is_shutdown()):
        break

    local_pos_pub.publish(pose)
    rate.sleep()
```

Ми готуємо запит на повідомлення, для встановлення довільного режиму на `OFFBOARD`. Список [підтримуваних режимів](http://wiki.ros.org/mavros/CustomModes#PX4_native_flight_stack) доступні для довідки.

```py
offb_set_mode = SetModeRequest()
offb_set_mode.custom_mode = 'OFFBOARD'
```

Решта коду є значною мірою поясненням. Ми намагаємося перейти в режим _Offboard_, після чого ставимо квадрокоптер в arm, щоб він міг злетіти. Ми визначаємо паузу виклику сервісів у 5 секунд, щоб не перевантажити автопілот запитами. В тому ж циклі ми продовжуємо надсилати запитану позицію за частотою, яка раніше визначена.

```py
arm_cmd = CommandBoolRequest()
arm_cmd.value = True

last_req = rospy.Time.now()

while(not rospy.is_shutdown()):
    if(current_state.mode != "OFFBOARD" and (rospy.Time.now() - last_req) > rospy.Duration(5.0)):
        if(set_mode_client.call(offb_set_mode).mode_sent == True):
            rospy.loginfo("OFFBOARD enabled")

        last_req = rospy.Time.now()
    else:
        if(not current_state.armed and (rospy.Time.now() - last_req) > rospy.Duration(5.0)):
            if(arming_client.call(arm_cmd).success == True):
                rospy.loginfo("Vehicle armed")

            last_req = rospy.Time.now()

    local_pos_pub.publish(pose)

    rate.sleep()
```

:::tip
Цей код був спрощений до мінімуму для демонстрації.
У великих системах часто корисно створити новий потік, який буде відповідати за періодичну публікацію заданих значень.
:::

## Створення ROS launch файлу

У вашому `offboard_py` пакеті, створіть іншу директорію у `~/catkin_ws/src/offboard_py/src` з назвою `launch`. Саме тут будуть зберігатися файли запуску пакету. Після цього створіть ваш перший файл запуску, у цьому випадку ми назвемо його `start_offb.launch`.

```sh
roscd offboard_py
mkdir launch
cd launch
touch start_offb.launch
```

Для `start_offb.launch` скопіюйте наступний код:

```xml
<?xml version="1.0"?>
<launch>
    <!-- Include the MAVROS node with SITL and Gazebo -->
    <include file="$(find px4)/launch/mavros_posix_sitl.launch">
    </include>

    <!-- Our node to control the drone -->
    <node pkg="offboard_py" type="offb_node.py" name="offb_node_py" required="true" output="screen" />
</launch>
```

Як бачите, `mavros_posix_sitl.launch` включено. Цей файл відповідає за запуск MAVROS, PX4 SITL, Gazebo Classic Environment і за створення транспортного засобу в певному світі (для отримання додаткової інформації дивіться файл [тут](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/launch/mavros_posix_sitl.launch)).

:::tip
The `mavros_posix_sitl.launch` приймає кілька аргументів, які можна встановити відповідно до ваших уподобань, як-от транспортний засіб для створення чи класичний світ Gazebo (повний список див. [тут](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/launch/mavros_posix_sitl.launch)).

Ви можете перевизначити значення за замовчуванням цих аргументів, визначених в `mavros_posix_sitl.launch` оголосивши їх у _include_ тегах. Як приклад, якщо ви хочете створити транспортний засіб у `warehouse.world`, ви повинні написати наступне:

```xml
<!-- Include the MAVROS node with SITL and Gazebo -->
<include file="$(find px4)/launch/mavros_posix_sitl.launch">
    <arg name="world" default="$(find mavlink_sitl_gazebo)/worlds/warehouse.world"/>
</include>
```

:::

## Запуск скрипту

Якщо все зроблено правильно, ви повинні тепер мати можливість запустити і протестувати свій скрипт.

В терміналі запустить:

```sh
roslaunch offboard_py start_offb.launch
```

Тепер ви повинні побачити ініціацію прошивки PX4 і виконання застосунку в Gazebo Classic. Після встановлення режиму _OFFBOARD_ та постановки транспортного засобу під arming, слід дотримуватися поведінки, показаної у [відео](#offb_video).

:::warning
Цілком можливо, що при запуску скрипта з'явиться помилка:

> Resource not found: px4 ROS path [0] = ... ...

Це означає, що PX4 SITL не включено в path. Щоб вирішити цю проблему, додайте ці рядки в кінці `.bashrc` файлу:

```sh
source ~/PX4-Autopilot/Tools/simulation/gazebo/setup_gazebo.bash ~/PX4-Autopilot ~/PX4-Autopilot/build/px4_sitl_default
export ROS_PACKAGE_PATH=$ROS_PACKAGE_PATH:~/PX4-Autopilot
export ROS_PACKAGE_PATH=$ROS_PACKAGE_PATH:~/PX4-Autopilot/Tools/simulation/gazebo-classic/sitl_gazebo-classic
export GAZEBO_PLUGIN_PATH=$GAZEBO_PLUGIN_PATH:/usr/lib/x86_64-linux-gnu/gazebo-9/plugins
```

Тепер у терміналі, перейдіть до домашнього каталогу і виконайте наступну команду, щоб застосувати зміни вище до поточного терміналу:

```sh
source .bashrc
```

Після цього кроку, кожного разу, коли ви відкриваєте нове вікно терміналу, вас не повинна турбувати ця помилка. Якщо вона з'явиться знову, просте `source .bashrc` має виправити це. Це рішення було отримано з цього обговорення [issue](https://github.com/mzahana/px4_fast_planner/issues/4), де ви можете отримати більше інформації про проблему.
:::
