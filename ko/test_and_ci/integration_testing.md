---
canonicalUrl: https://docs.px4.io/main/ko/test_and_ci/integration_testing
---

# ROS 통합 테스트

PX4의 ROS 기반 통합 테스트 방법을 설명합니다.

:::note
신규 테스트는 [MAVSDK 통합 테스트](../test_and_ci/integration_testing_mavsdk.md)를 선호합니다. ROS가 *사용* 사례(예: 객체 회피)에는 ROS 기반 통합 테스트 프레임워크를 사용합니다.

모든 PX4 통합 테스트는 [지속적 통합](../test_and_ci/continous_integration.md) 시스템에 의해 자동으로 실행됩니다.
:::

## 전제 조건

* [jMAVSim 시뮬레이터](../simulation/jmavsim.md)
* [Gazebo 시뮬레이터](../simulation/gazebo.md)
* [ROS와 MAVROS](../simulation/ros_interface.md)

## 테스트 실행

MAVROS 테스트를 실행합니다.

```sh
source <catkin_ws>/devel/setup.bash
cd <PX4-Autopilot_clone>
make px4_sitl_default sitl_gazebo
make <test_target>
```

`test_target` is a makefile targets from the set: *tests_mission*, *tests_mission_coverage*, *tests_offboard* and *tests_avoidance*.

`test/` 아래에 있는 테스트 스크립트를 직접 실행할 수도 있습니다.
```sh
source <catkin_ws>/devel/setup.bash
cd <PX4-Autopilot_clone>
make px4_sitl_default sitl_gazebo
./test/<test_bash_script> <test_launch_file>
```

예:
```sh
./test/rostest_px4_run.sh mavros_posix_tests_offboard_posctl.test
```

테스트를 GUI로 실행하여 진행 상황을 쉽게 확인할 수도 있습니다(기본적으로 테스트는 "헤드리스"로 실행됨).

```sh
./test/rostest_px4_run.sh mavros_posix_tests_offboard_posctl.test gui:=true headless:=false
```

**.test** 파일은 `integrationtests/python_src/px4_it/mavros/`에 정의된 해당 Python 테스트를 실행합니다.


## 신규 MAVROS 테스트 작성(Python)

ROS(1)/MAVROS를 사용하여 새로운 파이썬 테스트를 PX4 테스트 스위트에 추가하는 방법을 설명합니다.

기존 테스트를 예제([integrationtests/python_src/px4_it/mavros/](https://github.com/PX4/PX4-Autopilot/tree/master/integrationtests/python_src/px4_it/mavros))를 검토하십시오. 공식 ROS 문서에는 [unittest](http://wiki.ros.org/unittest)(이 테스트 모음의 기반이 됨)를 사용 방법을 설명합니다.

새 테스트를 작성하려면:

1. 아래의 빈 테스트 스켈레톤을 복사하여 새 테스트 스크립트를 작성합니다.
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

1. 새 테스트만 실행합니다.
   - 시뮬레이터를 시작합니다.
        ```sh
        cd <PX4-Autopilot_clone>
        source Tools/setup_gazebo.bash
        roslaunch launch/mavros_posix_sitl.launch
        ```
    - 테스트를 실행합니다(새로운 쉘에서).
        ```
        cd <PX4-Autopilot_clone>
        source Tools/setup_gazebo.bash
        rosrun px4 mavros_new_test.py
        ```

1. 시작 파일에 새 테스트 노드 추가

   - `test/`에서 새 `<test_name>.test` ROS 실행 파일을 만듭니다.
   - 기본 스크립트 *rostest_px4_run.sh* 또는 *rostest_avoidance_run.sh* 중 하나를 사용하여 테스트 파일을 호출합니다.

1. (선택 사항) Makefile에서 새 대상 만들기
   - Makefile을 오픈합니다.
   - *Testing* 섹션을 검색합니다.
   - 새 대상 이름을 추가하고 테스트를 호출합니다.

   예:
    ```sh
    tests_<new_test_target_name>: rostest
        @"$(SRC_DIR)"/test/rostest_px4_run.sh mavros_posix_tests_<new_test>.test
    ```

위에서 설명한 대로 테스트를 실행합니다.
