# MAVROS приклад _Зовнішнього_ керування (Python)

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

1. Відкрийте термінал і перейдіть до `~/catkin_ws/src` директорії

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

Even though PX4 operates in the aerospace NED coordinate frame, MAVROS translates these coordinates to the standard ENU frame and vice-versa. Ось чому ми визначаємо `z` як 2:

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

Решта коду є значною мірою поясненням. We attempt to switch to _Offboard_ mode, after which we arm the quad to allow it to fly. We space out the service calls by 5 seconds so to not flood the autopilot with the requests. In the same loop, we continue sending the requested pose at the rate previously defined.

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

Як бачите, `mavros_posix_sitl.launch` включено. This file is responsible for launching MAVROS, the PX4 SITL, the Gazebo Classic Environment and for spawning a vehicle in a given world (for further information see the file [here](https://github.com/PX4/PX4-Autopilot/blob/main/launch/mavros_posix_sitl.launch)).

:::tip
The `mavros_posix_sitl.launch` file takes several arguments that can be set according to your preferences such as the vehicle to spawn or the Gazebo Classic world (refer to [here](https://github.com/PX4/PX4-Autopilot/blob/main/launch/mavros_posix_sitl.launch)) for a complete list).

You can override the default value of these arguments defined in `mavros_posix_sitl.launch` by declaring them inside the _include_ tags. As an example, if you wanted to spawn the vehicle in the `warehouse.world`, you would write the following:

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

Тепер ви повинні побачити ініціацію прошивки PX4 і виконання застосунку в Gazebo Classic. After the _OFFBOARD_ mode is set and the vehicle is armed, the behavior shown in the [video](#offb_video) should be observed.

:::warning
It is possible that when running the script an error appears saying:

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

After this step, every time you open a new terminal window you should not have to worry about this error anymore. If it appears again, a simple `source .bashrc` should fix it. This solution was obtained from this [issue](https://github.com/mzahana/px4_fast_planner/issues/4) thread, where you can get more information about the problem.
:::
