---
canonicalUrl: https://docs.px4.io/main/en/config/safety_simulation
---

# Failsafe State Machine Simulation

This page can be used to simulate the actions of the PX4 failsafe state machine under all possible configurations and conditions.

The simulation runs the same code in the browser as is executed on the vehicle, in real-time (the simulation is automatically kept in sync with the latest version of the code).
Note that any delayed action (`COM_FAIL_ACT_T`) will also be delayed in the simulation.

To use it:

1. First configure the parameters on the left.
   The initial values correspond to the PX4 defaults.
2. Set the vehicle type
3. Set the other values in the **State** or any of the flags under **Conditions**
   - The **Intended Mode** corresponds to the commanded mode via RC or GCS (or external script).
     The failsafe state machine can override this in case of a failsafe.
4. Check the action under **Output**
5. Check what happens when changing mode or **Move the RC sticks**
6. Play with different settings and conditions!


The simulation can also be executed locally in order to test a specific version or set of changes:

```sh
make run_failsafe_web_server
```

 <iframe src="failsafe/index.html?no-title=1" frameborder="0" height="1400px" style="text-align: center; margin-left: -230px; margin-right: -230px;" width="1200"></iframe>
