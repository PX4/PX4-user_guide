# Basic PX4 Flight Modes

During setup you will be asked to assign a Mode Switch on your Remote Control. With it you will be able to switch flight modes during flight and ask the aircraft to act in a different way depending on your needs.

Depending on the amount of assistance the Flight controller commits to you during flight you will have three main flight modes categories that you can use in PX4.

   **• Manual Modes**

   **•	Assisted Modes**

   **•	Autonomous Modes**

You have to remember that the flight modes have a slightly different way of behavior depending on the air-frame. There are differences between Airplane, Multicopter and VTOL modes so we will explain it in brief on this page.

Some modes are GPS guided (dependent) and we will use    symbol to denote them. In order to function properly and be enabled, this GPS dependent mode’s need a GPS lock and they cannot be enabled during flight without GPS Lock. 

**<span style="color:red;"> Attention! </span>** It is highly advisable when you start  your aircraft at the flight field, to wait for GPS Lock prior arming to have a good Home Point Location. Without Home Point GPS Lock it is impossible for the Return to Land to be engaged and the craft will never come back in case of emergency.
You can read in depth about Flight Modes in the Flight Mode Setup page.
 
## Copter Flight Modes

### Manual Modes

Manual modes are with the least assistance from the PX4 autopilot or even without assistance. 

**MANUAL - STABILIZED FLIGHT**

In Stabilized flight your Copter will hover in level flight once the Pitch and Roll sticks are at center position. You will have a full manual angle control over the multicopter. If your craft is perfectly set and balanced it will hold the altitude if Throttle is at 50% in the middle of the scale at calm weather. If there is a wind blowing the craft will drift in the direction of the wind and you have to control the throttle all the time during wind gusts to hold altitude. In order to perform a maneuver, you have to hold your Pitch, Roll and Yaw command, otherwise the craft will level itself the moment you release the control sticks.
 
 
**ACROBATIC**

For multicopter and helicopters it is the 3D flying mode. You can make flips and acrobatics. In acrobatic mode you have fully direct rate control over your aircraft. You have to remember that once you release Pitch and Roll to their center position the craft remains in its current state. You have to give back command in order to level it or change course and direction. In Acrobatic you have full rate control over the Roll, Pitch, Yaw and Throttle.
 
**RATITUDE**

In simple terms it is the Stabilized Acrobatic mode. So when the sticks are in the middle the craft hovers. When you give small movements of the sticks around the center the craft is gentle movement like in stabilize (angle control around the middle). When you push the sticks in their extreme position you have Acrobatic movement ie you can perform flips and other figures.
 

### Assisted Modes

Assisted modes are with more assistance from the PX4 or even without assistance. 

**ALTITUDE: Altitude Control**

Altitude Mode is the safest non GPS guided mode appropriate for beginners learning how to fly. In this mode the altitude is controlled by the PX4 autopilot. At 50% throttle the aircraft will hold its current altitude. If you want to descend just lower the throttle bellow center or if you need to climb push the throttle over the center. The further the throttle stick is from the center position the larger the climb or descent rate you will have. In Altitude Mode you have full angle control over Pitch, Roll and Yaw. Once you center all the sticks you will have a hovering aircraft at the current altitude. If the wind blows the aircraft will drift in the direction of the wind.
 
 
**POSITION: Position Control**

This is the GPS guided mode. You can fly in Position Mode if you need precision in flight, keeping course or hovering at a certain spot in the air, but still maintaining the control of the aircraft with your RC. The altitude is controlled by the PX4 autopilot. At 50% throttle the aircraft will hold its current altitude. If you want to descend just lower the throttle bellow center or if you need to climb push the throttle over the center. The further the throttle stick is from the center position the larger the climb or descent rate you will have. Position Mode is almost like Altitude Mode with full angle control over Pitch, Roll and Yaw. But Once you center all the sticks you will have a hovering aircraft at the current altitude and current GPS position. If the wind blows the aircraft will keep its direction of flight and course and will fight the wind.
 
 
### Autonomous Modes

Autonomous or Auto modes do not require any input from the pilot.
 
**PAUSE: Auto Pause**

You can use Pause in case of emergency or during a mission in order to Hold the aircraft at its current position autonomously, while you get time to access the situation either emergency or mission related. When you activate Pause mode with a pre-programmed switch, the copter or multi-copter will fix itself to its current GPS position and altitude and hover there. During hold you are not able to control the craft with the RC. It is the first line of defense if you loose control over the aircraft and panic.
 
**RETURN: Return to Launch (RTL) / Return to Home**

The copter or multicopter will return in a straight line at the current altitude (if higher than the home position + hovering altitude) or on the hovering altitude (if higher than the current altitude), then lands automatically.
 
**MISSION**

In Mission mode the aircraft will start the execution of a predefined Mission or Flight Plan. The Mission can be edited and uploaded to the aircraft with the software called Ground Control Station. The PX4 GCS is called QGroundControl and it can run on Windows, Linux, Android and iOS. You can download it from qgroundcontrol.com. The Mission upload to the aircraft can be done via USB connection on the ground or by wireless Data Link sometimes called Telemetry. During flight you can edit and change the current mission via this Data Link and monitor the current flight status and telemetry data live.
 
**TAKE OFF**

 
Once Take Off is activated
 
**LAND**
 
 
## Fixed Wing Aircraft Modes

### Manual Modes

Manual modes are with the least assistance from the PX4 or even without assistance. 

**STABILIZED**
In Stabilized flight your plane will maintain a level flight. It will fight against the wind gusts automatically and maintain a horizontal posture. You will have a full manual angle control over the craft. You will be able to glide with your airplane when you lower the Throttle to 0% and the motor stops. In order to perform a turn you have to hold the command throughout the maneuver because if you release the roll the plane will stop turning and level itself. It is the same for the Pitch and Yaw commands as well.
 
 
**ACROBATIC**
In acrobatic you fly like a plane without any stabilization electronics. You can make 360 rolls, flips, stalls and acrobatic figures. You have to remember that once you release Pitch and Roll to their center position the craft remains in its current state. You have to give back command in order to level it or change course and direction. The control is a Rate control over the Roll, Pitch, Yaw and Throttle.
 
 
### Assisted Modes

**ALTITUDE: Altitude Control**
Altitude Mode is the safest non GPS guided mode appropriate for beginners learning how to fly. In this mode the altitude is controlled by the PX4 autopilot. The throttle will determine your airspeed, at 50% throttle the aircraft will hold its current altitude with a preset cruise air speed. You can descend and climb with pitch up and down command. In Altitude Mode you have full angle control over Pitch, Roll and Yaw. Once you center all the sticks you will have a level flying aircraft at the current altitude. If the wind blows the aircraft will drift in the direction of the wind.
 
 
**POSITION: Position Control**
This is the GPS guided mode. You can fly in Position Mode if you need precision in flight, keeping straight line course, and still maintaining the control of the aircraft with your RC. The altitude is controlled by the PX4 autopilot. The throttle will determine your airspeed, at 50% throttle the aircraft will hold its current altitude with a preset cruise speed. You can descend and climb with pitch up and down command. Position Mode is almost like Altitude Mode with full angle control over Pitch, Roll and Yaw. But Once you center all the sticks you will have a level flying aircraft at the current altitude and GPS guided straight line course. If the wind blows the aircraft will keep its direction of flight and course and will fight the wind.
 
 
### Autonomous Modes

Autonomous or Auto modes do not require any input from the pilot.
 
**PAUSE: Auto Pause**

You can use Pause in case of emergency or during a mission in order to Hold the aircraft at its current position autonomously, while you get time to access the situation either emergency or mission related. When you activate Pause mode with a pre-programmed switch the airplane will start circling around at fixed GPS position, holding its current altitude during the circles. During hold you are not able to control the craft with the RC. It is the first line of defense if you loose control over the aircraft.
 
 
**RETURN: Return to Launch (RTL) / Return to Home**

The aircraft returns to the home position and hovers in a circle above the home position at a preset altitude.
 
**MISSION**

In Mission mode the aircraft will start the execution of a predefined Mission or Flight Plan. The Mission can be edited and uploaded to the aircraft with the software called Ground Control Station. The PX4 GCS is called QGroundControl and it can run on Windows, Linux, Android and iOS. You can download it from qgroundcontrol.com. The Mission upload to the aircraft can be done via USB connection on the ground or by wireless Data Link sometimes called Telemetry. During flight you can edit and change the current mission via this Data Link and monitor the current flight status and telemetry data live.
 
**TAKE OFF**

**LAND**
