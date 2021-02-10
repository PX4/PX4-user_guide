# 통합 테스트

종단간 통합 시험을 다룹니다. 시험은 자동으로 실행합니다([Jenkins CI](../test_and_ci/jenkins_ci.md))

## ROS / MAVROS 테스트

준비 요건:

  * [jMAVSim 모의 시험 환경](../simulation/jmavsim.md)
  * [가제보 모의 시험 환경](../simulation/gazebo.md)
  * [ROS와 MAVROS](../simulation/ros_interface.md)

### 실행 시험

MAVROS 테스트 기반에서 완전한 시험을 실행하려면:

```sh
cd <PX4-Autopilot_clone>
source integrationtests/setup_gazebo_ros.bash $(pwd)
rostest px4 mavros_posix_tests_iris.launch
```
test_target is one of the Makefile targets. 사용 가능한 항목은 다음과 같습니다. *tests_mission*, *tests_mission_coverage*, *tests_offboard* 및 *tests_avoidance*.

Test can also be executed directly by running the test scripts, located under `test/`:
```sh
rostest px4 mavros_posix_tests_iris.launch gui:=true headless:=false
```

Example:
```sh
./test/rostest_px4_run.sh mavros_posix_tests_offboard_posctl.test
```

`launch/mavros_posix_tests_irisl.launch`의 시험 그룹에 새 항목을 추가하십시오:

```sh
# Start simulation
cd <PX4-Autopilot_clone>
source integrationtests/setup_gazebo_ros.bash $(pwd)
roslaunch px4 mavros_posix_sitl.launch

# Run test (in a new shell):
cd <PX4-Autopilot_clone>
source integrationtests/setup_gazebo_ros.bash $(pwd)
rosrun px4 mavros_new_test.py
```

위에서 보여드린 바와 같이 완전한 시험 모음을 실행하십시오.


### 새 MAVROS 시험 작성 (파이썬)

:::note
Currently in early stages, more streamlined support for testing (helper classes/methods etc.) to come.
:::

#### 1.) 새 시험 스크립트 작성

Test scripts are located in `integrationtests/python_src/px4_it/mavros/`. See other existing scripts for examples. Also please consult the official ROS documentation on how to use [unittest](http://wiki.ros.org/unittest).


Empty test skeleton:

```python
<group ns="$(arg ns)">
        [...] <test test-name="mavros_new_test" pkg="px4" type="mavros_new_test.py" />
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

#### 2.) 새 시험만 실행

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

#### 3.) 파일을 실행할 새 시험 노드 추가

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
