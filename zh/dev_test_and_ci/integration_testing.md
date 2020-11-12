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

或者使用 GUI 来查看发生的情况：

```sh
rostest px4 mavros_posix_tests_iris.launch gui:=true headless:=false
```

### 写一个新的 MAVROS 测试（Python）

> **Note** 目前处于早期阶段，更加精简的测试支持（辅助类/方法等）即将到来。

#### 1.) 1.）创建一个新的测试脚本

测试脚本位于 `integrationtests/python_src/px4_it/mavros/` 中。 See other existing scripts for examples. 有关示例，请参阅其他现有脚本 另请参阅官方 ROS 文档，了解如何使用 [unittest](http://wiki.ros.org/unittest) 。


空测试骨架：

```python
#!/usr/bin/env python
# [... LICENSE ...]

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

#### 2.) 2.）仅运行新测试

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

#### 3.) 3.）添加新测试节点以启动文件

在 `launch/mavros_posix_tests_irisl.launch` 中添加测试组中的新条目：

```xml
    <group ns="$(arg ns)">
        [...]
        <group ns="$(arg ns)">
        [...]
        <test test-name="mavros_new_test" pkg="px4" type="mavros_new_test.py" />
    </group>
```

如上所述运行完整的测试套件。
