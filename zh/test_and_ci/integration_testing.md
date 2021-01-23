# 集成测试

这是关于端到端集成测试。 测试自动执行（[Jenkins CI](../test_and_ci/jenkins_ci.md)）

## ROS / MAVROS 测试

系统必备组件:

  * [jMAVSim 仿真模拟](../simulation/jmavsim.md)
  * [Gazebo 仿真模拟](../simulation/gazebo.md)
  * [ROS 和 MAVROS](../simulation/ros_interface.md)

### 执行测试

要运行完整的 MAVROS 测试套件：

```sh
cd <Firmware_clone>
source integrationtests/setup_gazebo_ros.bash $(pwd)
rostest px4 mavros_posix_tests_iris.launch
```
test_target is one of the Makefile targets. The available ones are: *tests_mission*, *tests_mission_coverage*, *tests_offboard* and *tests_avoidance*.

Test can also be executed directly by running the test scripts, located under `test/`:
```sh
rostest px4 mavros_posix_tests_iris.launch gui:=true headless:=false
```

Example:
```sh
./test/rostest_px4_run.sh mavros_posix_tests_offboard_posctl.test
```

在 `launch/mavros_posix_tests_irisl.launch` 中添加测试组中的新条目：

```sh
# 开始仿真
cd <Firmware_clone>
source integrationtests/setup_gazebo_ros.bash $(pwd)
roslaunch px4 mavros_posix_sitl.launch

# 运行测试（在新的 shell 中）：
cd <Firmware_clone>
source integrationtests/setup_gazebo_ros.bash $(pwd)
rosrun px4 mavros_new_test.py
```

如上所述运行完整的测试套件。


### 写一个新的 MAVROS 测试（Python）

:::note
Currently in early stages, more streamlined support for testing (helper classes/methods etc.) to come.
:::

#### 1.) 1.）创建一个新的测试脚本

Test scripts are located in `integrationtests/python_src/px4_it/mavros/`. See other existing scripts for examples. Also please consult the official ROS documentation on how to use [unittest](http://wiki.ros.org/unittest).


Empty test skeleton:

```python
#!/usr/bin/env python
# [... <group ns="$(arg ns)">
        [...]
        <test test-name="mavros_new_test" pkg="px4" type="mavros_new_test.py" />
    </group>

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

#### 2.) 2.）仅运行新测试

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

#### 3.) 3.）添加新测试节点以启动文件

In `test/` create a new `<test_name>.test` ROS launch file. Call the test file using one of the base scripts *rostest_px4_run.sh* or *rostest_avoidance_run.sh*

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
