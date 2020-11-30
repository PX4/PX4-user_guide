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

또는 GUI에서 어떤 일어나는지 보려면:

```sh
rostest px4 mavros_posix_tests_iris.launch gui:=true headless:=false
```

### 새 MAVROS 시험 작성 (파이썬)

> **Note** 가장 최신의 스테이지에서는, 시험 절차를 간소화(헬퍼 클래스/메서드 등)한 지원을 앞으로  지원할 예정입니다.

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
source integrationtests/setup_gazebo_ros.bash $(pwd)
roslaunch px4 mavros_posix_sitl.launch

# Run test (in a new shell):
cd <PX4-Autopilot_clone>
source integrationtests/setup_gazebo_ros.bash $(pwd)
rosrun px4 mavros_new_test.py
```

#### 3.) 파일을 실행할 새 시험 노드 추가

`launch/mavros_posix_tests_irisl.launch`의 시험 그룹에 새 항목을 추가하십시오:

```xml
    <group ns="$(arg ns)">
        [...]
        <test test-name="mavros_new_test" pkg="px4" type="mavros_new_test.py" />
    </group>
```

Run the comlpete test suite as described above.
