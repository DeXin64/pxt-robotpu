
const TEST_FOOT_JOINTS = false;
const TEST_LEG_JOINTS = false;


if (TEST_FOOT_JOINTS) {
    input.onButtonPressed(Button.A, function () {
        robotPu.setServoAngle(robotPu.ServoJoint.LeftFoot, 45);  // 左脚45度
        robotPu.setServoAngle(robotPu.ServoJoint.RightFoot, 135); // 右脚135度
    });
}


if (TEST_LEG_JOINTS) {
    input.onButtonPressed(Button.B, function () {
        robotPu.setServoAngle(robotPu.ServoJoint.LeftLeg, 60);   // 左腿60度
        robotPu.setServoAngle(robotPu.ServoJoint.RightLeg, 120); // 右腿120度
    });
}


