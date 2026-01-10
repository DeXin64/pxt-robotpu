
/*
 * 测试“设置x舵机角度为x”的积木块
*/
// 测试说明：
// 1. 连接PU机器人到Micro:bit
// 2. 打开测试模式（TEST_FOOT_JOINTS 和 TEST_LEG_JOINTS 设为 true）
// 3. 按下A键，机器人左脚45度，右脚135度。类似是蹦起来的动作
// 4. 按下B键，机器人左腿60度，右腿120度。类似是站起来的动作

// 设置为 true 启用，false 禁用
const TEST_FOOT_JOINTS = false;
const TEST_LEG_JOINTS = false;

// 测试脚部关节角度
if (TEST_FOOT_JOINTS) {
    input.onButtonPressed(Button.A, function () {
        robotPu.setServoAngle(robotPu.ServoJoint.LeftFoot, 45);  // 左脚45度
        robotPu.setServoAngle(robotPu.ServoJoint.RightFoot, 135); // 右脚135度
    });
}

// 测试腿部关节角度
if (TEST_LEG_JOINTS) {
    input.onButtonPressed(Button.B, function () {
        robotPu.setServoAngle(robotPu.ServoJoint.LeftLeg, 60);   // 左腿60度
        robotPu.setServoAngle(robotPu.ServoJoint.RightLeg, 120); // 右腿120度
    });
}


