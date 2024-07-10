# Посилання на Модулі: Оцінка

## AttitudeEstimatorQ
Джерело: [modules/attitude_estimator_q](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/modules/attitude_estimator_q)


### Опис
Оцінювач висоти q.


<a id="AttitudeEstimatorQ_usage"></a>

### Використання
```
AttitudeEstimatorQ <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## airspeed_estimator
Джерело: [modules/airspeed_selector](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/modules/airspeed_selector)


### Опис
Цей модуль надає єдину тему airspeed_validated, яка містить вказану (IAS), калібровану (CAS), справжню повітряну швидкість (TAS) та інформацію, чи є оцінка зараз недійсною і чи ґрунтується на показаннях датчика чи на швидкості на землі мінус швидкість вітру. Підтримуючи введення декількох «сирих» входів швидкості повітря, цей модуль автоматично перемикається на коректний датчик у разі виявлення несправності. Для виявлення несправностей, а також для оцінки масштабного коефіцієнта від IAS до CAS, вона запускає кілька оцінювачів вітру а також публікує їх.


<a id="airspeed_estimator_usage"></a>

### Використання
```
airspeed_estimator <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## ekf2
Джерело: [modules/ekf2](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/modules/ekf2)


### Опис
Оцінювач відношення та позиції за допомогою розширеного фільтра Калмана. Використовується для багатороторних і фіксованих крил.

Документацію можна знайти на сторінці [Огляд ECL/EKF & налаштування](https://docs.px4.io/main/en/advanced_config/tuning_the_ecl_ekf.html).

ekf2 можна запустити у режимі відтворення (`-r`): у цьому режимі він не звертається до системного часу, а лише використовує мітки часу з тем датчиків.


<a id="ekf2_usage"></a>

### Використання
```
ekf2 <command> [arguments...]
 Commands:
   start
     [-r]        Enable replay mode

   stop

   status        print status info
     [-v]        verbose (print all states and full covariance matrix)

   select_instance Request switch to new estimator instance
     <instance>  Specify desired estimator instance
```
## local_position_estimator
Джерело: [modules/local_position_estimator](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/modules/local_position_estimator)


### Опис
Оцінювач відношення та позиції за допомогою розширеного фільтра Калмана.


<a id="local_position_estimator_usage"></a>

### Використання
```
local_position_estimator <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## mc_hover_thrust_estimator
Джерело: [modules/mc_hover_thrust_estimator](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/modules/mc_hover_thrust_estimator)


### Опис


<a id="mc_hover_thrust_estimator_usage"></a>

### Використання
```
mc_hover_thrust_estimator <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
