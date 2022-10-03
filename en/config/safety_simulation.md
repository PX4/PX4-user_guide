# Failsafe State Machine Simulation

This page allows to simulate the PX4 failsafe state machine under all possible configurations and conditions.
It runs the same code in the browser as is executed on the vehicle (the simulation is automatically kept in sync with the latest version of the code).

The simulation runs in real-time, so any delayed action will also be delayed in the simulation.

To use it:
- First, configure the parameters on the left. The initial values correspond to the PX4 defaults.
- The **Intended Mode** corresponds to the commanded mode via RC or GCS (or external script).
  The failsafe state machine can override this in case of a failsafe.
- Set any of the flags under **Conditions**
- Check the action under **Output**
- Check what happens when changing mode or **Move the RC sticks**
- Play with different settings and conditions!


The simulation can also be executed locally:
```sh
make run_failsafe_web_server
```

 <iframe src="failsafe/index.html?no-title=1" frameborder="0" height="1400px" style="text-align: center; margin-left: -230px; margin-right: -230px;" width="1200"></iframe>


