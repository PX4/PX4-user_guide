# LED meanings

[Pixhawk flight controllers](../flight_controller/pixhawk_series.md) have an RGB LED to indicate the current status of the FMU.

![LED meanings](../../images/led_meanings.gif)

> **Note:** **GPS unit vs GPS Lock** 
Please note that Pixhawk’s RGB LED will only turn green and allow you to execute guided mission only if you have a GPS unit and Pixhawk is able to validate the global position from the GPS unit. If you have a GPS unit plugged in but the RGB LED continues to be blue, verify that Pixhawk is reading your GPS properly, and that your GPS is sending a proper GPS position.
    

* **[Solid Blue] Armed, No GPS Lock:** Indicates Pixhawk has been armed and has no position lock from a GPS unit.
When Pixhawk is armed, it will unlock control of the motors, allowing you to fly your drone.
As always, exercise caution when arming, as large propellers can be dangerous at high revolutions.
Pixhawk cannot perform guided missions in this mode.

* **[Pulsing Blue] Disarmed, No GPS Lock:** Similar to above, but your Pixhawk is disarmed.
This means you will not be able to control motors, but all other subsystems are working.

* **[Solid Green] Armed, GPS Lock:** Indicates Pixhawk has been armed and has a valid position lock from a GPS unit.
When Pixhawk is armed, it will unlock control of the motors, allowing you to fly your drone.
As always, exercise caution when arming, as large propellers can be dangerous at high revolutions.
In this mode, Pixhawk can perform guided missions.

* **[Pulsing Green] Disarmed, GPS Lock:** Similar to above, but your Pixhawk is disarmed.
This means you will not be able to control motors, but all other subsystems including GPS position lock are working.

* **[Solid Purple] Failsafe Mode:** This mode will activate whenever Pixhawk encounters an issue during flight,
such as losing manual control, a critically low battery, or an internal error.
During failsafe mode, Pixhawk will attempt to return to its takeoff location, or may simply descend where it currently is.

* **[Solid Amber] Low Battery Warning:** Indicates your Pixhawk's battery is running dangerously low.
After a certain point, Pixhawk will go into failsafe mode. However, this mode should signal caution that it's time to end
this flight.

* **[Blinking Red] Error / Setup Required:** Indicates that your Pixhawk needs to be configured or calibrated before flying.
Attach your Pixhawk to a Ground Control Station to verify what the problem is.
If you have completed the setup process and Pixhawk still appears as red and flashing, there may be another error.

