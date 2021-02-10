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

`test /` 아래에있는 테스트 스크립트를 실행하여 테스트를 직접 실행할 수도 있습니다.
```sh
소스 <catkin_ws> /devel/setup.bash
cd <PX4-Autopilot_clone>
px4_sitl_default sitl_gazebo 만들기
./test/ <test_bash_script> <test_launch_file>
```

예:
```sh
./test/rostest_px4_run.sh mavros_posix_tests_offboard_posctl.test
```

또는 GUI로 무슨 일이 일어나고 있는지 확인하십시오.

```sh
./test/rostest_px4_run.sh mavros_posix_tests_offboard_posctl.test gui:=true headless:=false
```

.test 파일은 `integrationtests/python_src/px4_it/mavros/`에 정의된 해당 Python 테스트를 시작합니다.


### 새 MAVROS 시험 프로그램 작성(파이썬)

:::note
현재 초기 단계에서 테스트 (도우미 클래스/메서드 등)에 대하여 좀 더 편리한 지원이 제공될 예정입니다.
:::

#### 1.) 새 시험 스크립트 작성

시험 스크립트는 `integrationtests/python_src/px4_it/mavros/`에 있습니다. 다른 예제는 기존 스크립트를 살펴보십시오. [unittest](http://wiki.ros.org/unittest) 활용법은 공식 ROS 문서를 참고하십시오.


빈 시험 양식은 다음과 같습니다:

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

`test/`에서 새 `.test ` ROS 시작 파일을 만듭니다. 기본 스크립트 *rostest_px4_run.sh* 또는 *rostest_avoidance_run.sh * 중 하나를 사용하여 테스트 파일을 호출합니다.

#### 4.) (선택 사항) Makefile에 새 대상 만들기
1. Makefile을 여십시오
2. *테스트* 섹션 검색
3. 새 대상 이름을 추가하고 테스트를 호출합니다.

예:
```sh
tests_<new_test_target_name>: rostest
    @"$(SRC_DIR)"/test/rostest_px4_run.sh mavros_posix_tests_<new_test>.test
```

위에서 설명한대로 테스트를 실행합니다.
