---
canonicalUrl: https://docs.px4.io/main/ko/test_and_ci/integration_testing
---

# 통합 테스트

This topic explains how to run (and extend) PX4's ROS-based integration tests.

:::note
[MAVSDK Integration Testing](../test_and_ci/integration_testing_mavsdk.md) is preferred when writing new tests. Use the ROS-based integration test framework for use cases that *require* ROS (e.g. object avoidance).

All PX4 integraton tests are executed automatically by our [Continuous Integration](../test_and_ci/continous_integration.md) system.
:::

## ROS / MAVROS 테스트

* [jMAVSim 모의 시험 환경](../simulation/jmavsim.md)
* [가제보 모의 시험 환경](../simulation/gazebo.md)
* [ROS와 MAVROS](../simulation/ros_interface.md)

## Execute Tests

To run the MAVROS tests:

```sh
cd <PX4-Autopilot_clone>
source integrationtests/setup_gazebo_ros.bash $(pwd)
rostest px4 mavros_posix_tests_iris.launch
```

`test /` 아래에있는 테스트 스크립트를 실행하여 테스트를 직접 실행할 수도 있습니다.

예:
```sh
소스 <catkin_ws> /devel/setup.bash
cd <PX4-Autopilot_clone>
px4_sitl_default sitl_gazebo 만들기
./test/ <test_bash_script> <test_launch_file>
```

또는 GUI로 무슨 일이 일어나고 있는지 확인하십시오.
```sh
./test/rostest_px4_run.sh mavros_posix_tests_offboard_posctl.test
```

.test 파일은 `integrationtests/python_src/px4_it/mavros/`에 정의된 해당 Python 테스트를 시작합니다.

```sh
./test/rostest_px4_run.sh mavros_posix_tests_offboard_posctl.test gui:=true headless:=false
```

The **.test** files launch the corresponding Python tests defined in `integrationtests/python_src/px4_it/mavros/`


## Write a New MAVROS Test (Python)

This section explains how to write a new python test using ROS(1)/MAVROS, test it, and add it to the PX4 test suite.

We recommend you review the existing tests as examples/inspiration ([integrationtests/python_src/px4_it/mavros/](https://github.com/PX4/PX4-Autopilot/tree/master/integrationtests/python_src/px4_it/mavros)). The official ROS documentation also contains information on how to use [unittest](http://wiki.ros.org/unittest) (on which this test suite is based).

To write a new test:

1. Create a new test script by copying the empty test skeleton below:
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

1. Run the new test only
   - Start the simulator:
        ```sh
        cd <PX4-Autopilot_clone>
        source Tools/setup_gazebo.bash
        roslaunch launch/mavros_posix_sitl.launch
        ```
    - Run test (in a new shell):
        ```
        cd <PX4-Autopilot_clone>
        source Tools/setup_gazebo.bash
        rosrun px4 mavros_new_test.py
        ```

1. Add new test node to a launch file

   - In `test/` create a new `<test_name>.test` ROS launch file.
   - Call the test file using one of the base scripts *rostest_px4_run.sh* or *rostest_avoidance_run.sh*

1. (Optional) Create a new target in the Makefile
   - Open the Makefile
   - Search the *Testing* section
   - Add a new target name and call the test

   For example:
    ```sh
    tests_<new_test_target_name>: rostest
        @"$(SRC_DIR)"/test/rostest_px4_run.sh mavros_posix_tests_<new_test>.test
    ```

예:
