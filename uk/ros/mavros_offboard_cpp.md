# MAVROS _Offboard_ control приклад (C++)

Цей посібник показує основи _Offboard_ control з MAVROS, використовуючи Iris квадрокоптер симульований у Gazebo Classic/SITL. У кінці посібника ви повинні побачити таку ж поведінку, як і в нижченаведеному відео, повільний зліт на висоту 2 метри.

:::warning
_Offboard_ керування небезпечне. Якщо ви керуєте реальним транспортним засобом, то обов'язково майте можливість отримати назад ручне керування на випадок, якщо щось піде не так.
:::

:::tip
Цей приклад використовує C++. Дуже схожий приклад для Python може бути знайдений у [ROS/MAVROS Offboard Example (Python)](../ros/mavros_offboard_python.md) (також дивиться приклади в [integrationtests/python_src/px4_it/mavros](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/integrationtests/python_src/px4_it/mavros)).
:::

<video width="100%" autoplay="true" controls="true">
  <source src="../../assets/simulation/gazebo_classic/gazebo_offboard.webm" type="video/webm">
</video>

## Код

Створіть `offb_node.cpp` файл у вашому пакеті ROS (також додавши його в `CMakeList. xt`, щоб його скомпілювати) і вставте всередині нього:

```cpp
/**
 * @file offb_node.cpp
 * @brief Offboard control example node, written with MAVROS version 0.19.x, PX4 Pro Flight
 * Stack and tested in Gazebo Classic SITL
 */

#include <ros/ros.h>
#include <geometry_msgs/PoseStamped.h>
#include <mavros_msgs/CommandBool.h>
#include <mavros_msgs/SetMode.h>
#include <mavros_msgs/State.h>

mavros_msgs::State current_state;
void state_cb(const mavros_msgs::State::ConstPtr& msg){
    current_state = *msg;
}

int main(int argc, char **argv)
{
    ros::init(argc, argv, "offb_node");
    ros::NodeHandle nh;

    ros::Subscriber state_sub = nh.subscribe<mavros_msgs::State>
            ("mavros/state", 10, state_cb);
    ros::Publisher local_pos_pub = nh.advertise<geometry_msgs::PoseStamped>
            ("mavros/setpoint_position/local", 10);
    ros::ServiceClient arming_client = nh.serviceClient<mavros_msgs::CommandBool>
            ("mavros/cmd/arming");
    ros::ServiceClient set_mode_client = nh.serviceClient<mavros_msgs::SetMode>
            ("mavros/set_mode");

    //the setpoint publishing rate MUST be faster than 2Hz
    ros::Rate rate(20.0);

    // wait for FCU connection
    while(ros::ok() && !current_state.connected){
        ros::spinOnce();
        rate.sleep();
    }

    geometry_msgs::PoseStamped pose;
    pose.pose.position.x = 0;
    pose.pose.position.y = 0;
    pose.pose.position.z = 2;

    //send a few setpoints before starting
    for(int i = 100; ros::ok() && i > 0; --i){
        local_pos_pub.publish(pose);
        ros::spinOnce();
        rate.sleep();
    }

    mavros_msgs::SetMode offb_set_mode;
    offb_set_mode.request.custom_mode = "OFFBOARD";

    mavros_msgs::CommandBool arm_cmd;
    arm_cmd.request.value = true;

    ros::Time last_request = ros::Time::now();

    while(ros::ok()){
        if( current_state.mode != "OFFBOARD" &&
            (ros::Time::now() - last_request > ros::Duration(5.0))){
            if( set_mode_client.call(offb_set_mode) &&
                offb_set_mode.response.mode_sent){
                ROS_INFO("Offboard enabled");
            }
            last_request = ros::Time::now();
        } else {
            if( !current_state.armed &&
                (ros::Time::now() - last_request > ros::Duration(5.0))){
                if( arming_client.call(arm_cmd) &&
                    arm_cmd.response.success){
                    ROS_INFO("Vehicle armed");
                }
                last_request = ros::Time::now();
            }
        }

        local_pos_pub.publish(pose);

        ros::spinOnce();
        rate.sleep();
    }

    return 0;
}

```

## Пояснення коду

```cpp
#include <ros/ros.h>
#include <geometry_msgs/PoseStamped.h>
#include <mavros_msgs/CommandBool.h>
#include <mavros_msgs/SetMode.h>
#include <mavros_msgs/State.h>
```

`mavros_msgs` package містить усі довільні повідомлення необхідні для роботи сервісів і тем наданих пакетом MAVROS. Усі сервіси та теми, а також їх відповідні типи повідомлень задокументовані в [mavros wiki](http://wiki.ros.org/mavros).

```cpp
mavros_msgs::State current_state;
void state_cb(const mavros_msgs::State::ConstPtr& msg){
    current_state = *msg;
}
```

Ми створюємо простий виклик, який буде зберігати поточний стан автопілота. Це дозволить нам перевірити підключення, arming та _Offboard_ параметри.

```cpp
ros::Subscriber state_sub = nh.subscribe<mavros_msgs::State>("mavros/state", 10, state_cb);
ros::Publisher local_pos_pub = nh.advertise<geometry_msgs::PoseStamped>("mavros/setpoint_position/local", 10);
ros::ServiceClient arming_client = nh.serviceClient<mavros_msgs::CommandBool>("mavros/cmd/arming");
ros::ServiceClient set_mode_client = nh.serviceClient<mavros_msgs::SetMode>("mavros/set_mode");
```

Ми створюємо екземпляр видавця для публікації командної локальної позиції та відповідних клієнтів для запиту на arming та зміни режиму. Зверніть увагу, що для вашої власної системи, префікс "mavros" може відрізнятися, так як це буде залежати від імені, даного вузлу в файлі запуску.

```cpp
//the setpoint publishing rate MUST be faster than 2Hz
ros::Rate rate(20.0);
```

PX4 має тайм-аут 500 мс між двома _Offboard_ командами. Якщо цей тайм-аут перевищено, командир повернеться до останнього режиму, до того як увійти у _Offboard_ режим. Ось чому швидкість публікації **має** бути вищою за 2 Гц, щоб також врахувати можливі затримки. Це також та сама причина, чому рекомендується перейти в режим _Offboard_ з режиму _Position_, таким чином, якщо транспортний засіб виходить із режиму _Offboard_ він зупиниться на місці й зависне.

```cpp
// wait for FCU connection
while(ros::ok() && !current_state.connected){
    ros::spinOnce();
    rate.sleep();
}
```

Перш ніж щось публікувати, ми чекаємо встановлення зв'язку між MAVROS і автопілотом. Цей цикл має закінчитись, щойно буде отримано повідомлення про hearbeat.

```cpp
geometry_msgs::PoseStamped pose;
pose.pose.position.x = 0;
pose.pose.position.y = 0;
pose.pose.position.z = 2;
```

Попри те, що PX4 Pro Flight Stack працює в координатній площині NED, MAVROS переводить ці координати до ENU стандарту та навпаки. Ось чому ми визначаємо `z` як 2.

```cpp
//send a few setpoints before starting
for(int i = 100; ros::ok() && i > 0; --i){
  local_pos_pub.publish(pose);
  ros::spinOnce();
  rate.sleep();
}
```

Перш ніж увійти в режим _Offboard_, ви повинні вже розпочати потокове передавання заданих значень. В іншому випадку перемикач режиму буде відхилено. Нижче, `100` було обрано у якості довільного значення.

```cpp
mavros_msgs::SetMode offb_set_mode;
offb_set_mode.request.custom_mode = "OFFBOARD";
```

Ми встановили довільний режим на `OFFBOARD`. Список [підтримуваних режимів](http://wiki.ros.org/mavros/CustomModes#PX4_native_flight_stack) доступні для довідки.

```cpp
mavros_msgs::CommandBool arm_cmd;
arm_cmd.request.value = true;

ros::Time last_request = ros::Time::now();

while(ros::ok()){
  if( current_state.mode != "OFFBOARD" &&
    (ros::Time::now() - last_request > ros::Duration(5.0))){
    if( set_mode_client.call(offb_set_mode) && offb_set_mode.response.mode_sent) {
      ROS_INFO("Offboard enabled");
    }
    last_request = ros::Time::now();
  } else {
    if( !current_state.armed && (ros::Time::now() - last_request > ros::Duration(5.0))) {
      if( arming_client.call(arm_cmd) && arm_cmd.response.success) {
        ROS_INFO("Vehicle armed");
      }
      last_request = ros::Time::now();
    }
  }

  local_pos_pub.publish(pose);

  ros::spinOnce();
  rate.sleep();
}
```

Решта коду досить зрозуміла. Ми намагаємося перейти в режим _Offboard_, після чого ставимо квадрокоптер в arm, щоб він міг злетіти. Ми визначаємо паузу виклику сервісів у 5 секунд, щоб не перевантажити автопілот запитами. В тому ж циклі ми продовжуємо надсилати запитану позицію за частотою, яка раніше визначена.

:::tip
Цей код був спрощений до мінімуму для демонстрації.
У великих системах часто корисно створити новий потік, який буде відповідати за періодичну публікацію заданих значень.
:::
