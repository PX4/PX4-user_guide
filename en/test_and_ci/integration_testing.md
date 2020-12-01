# Integration Testing

This is about end to end integration testing. Tests are executed automatically ([Jenkins CI](../test_and_ci/jenkins_ci.md))

## ROS / MAVROS Tests

Prerequisites:

  * [jMAVSim Simulator](../simulation/jmavsim.md)
  * [Gazebo Simulator](../simulation/gazebo.md)
  * [ROS and MAVROS](../simulation/ros_interface.md)

### Execute Tests

To run the MAVROS tests:

```sh
source <catkin_ws>/devel/setup.bash
cd <PX4-Autopilot_clone>
make px4_sitl_default sitl_gazebo
make <test_target>
```
test_target is one of the Makefile targets. The available ones are:
*tests_mission*, *tests_mission_coverage*, *tests_offboard* and *tests_avoidance*.

Test can also be executed directly by running the test scripts, located under `test/`:
```sh
source <catkin_ws>/devel/setup.bash
cd <PX4-Autopilot_clone>
make px4_sitl_default sitl_gazebo
./test/<test_bash_script> <test_launch_file>
```

Example:
```sh
./test/rostest_px4_run.sh mavros_posix_tests_offboard_posctl.test
```

Or with GUI to see what's happening:

```sh
./test/rostest_px4_run.sh mavros_posix_tests_offboard_posctl.test gui:=true headless:=false
```

The .test files launch the corresponding Python tests defined in `integrationtests/python_src/px4_it/mavros/`


### Write a new MAVROS test (Python)

> **Note** Currently in early stages, more streamlined support for testing (helper classes/methods etc.) to come.

####1.) Create a new test script

Test scripts are located in `integrationtests/python_src/px4_it/mavros/`. See other existing scripts for examples. Also please consult the official ROS documentation on how to use [unittest](http://wiki.ros.org/unittest).


Empty test skeleton:

```python
#!/usr/bin/env python
# [... LICENSE ...]

#
# @author Example Author <author@example.com>
#
PKG = 'px4'

import unittest
import rospy
import rosbag

from sensor_msgs.msg import NavSatFix

class MavrosNewTest(unittest.TestCase):
    """
    Test description
    """

    def setUp(self):
        rospy.init_node('test_node', anonymous=True)
        rospy.wait_for_service('mavros/cmd/arming', 30)

        rospy.Subscriber("mavros/global_position/global", NavSatFix, self.global_position_callback)
        self.rate = rospy.Rate(10) # 10hz
        self.has_global_pos = False

    def tearDown(self):
        pass

    #
    # General callback functions used in tests
    #
    def global_position_callback(self, data):
        self.has_global_pos = True

    def test_method(self):
        """Test method description"""

        # FIXME: hack to wait for simulation to be ready
        while not self.has_global_pos:
            self.rate.sleep()

        # TODO: execute test

if __name__ == '__main__':
    import rostest
    rostest.rosrun(PKG, 'mavros_new_test', MavrosNewTest)
```

#### 2.) Run the new test only

```sh
# Start simulation
cd <PX4-Autopilot_clone>
source Tools/setup_gazebo.bash
roslaunch launch/mavros_posix_sitl.launch

# Run test (in a new shell):
cd <PX4-Autopilot_clone>
source Tools/setup_gazebo.bash
rosrun px4 mavros_new_test.py
```

#### 3.) Add new test node to a launch file

In `test/` create a new `<test_name>.test` ROS launch file.
Call the test file using one of the base scripts *rostest_px4_run.sh* or *rostest_avoidance_run.sh*

#### 4.) (Optional) Create a new target in the Makefile
1. Open the Makefile
2. Search the *Testing* section
3. Add a new target name and call the test

Example:
```sh
tests_<new_test_target_name>: rostest
	@"$(SRC_DIR)"/test/rostest_px4_run.sh mavros_posix_tests_<new_test>.test
```

Run the tests as described above.
