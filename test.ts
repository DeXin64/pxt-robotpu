robotPu.setWalkSpeedRange(2, 2)
robotPu.setAmbienceLight(robotPu.LightSelection.All, 0, 0, 0)
robotPu.setEyesState(robotPu.EyeState.On, robotPu.EyeState.On)

input.onButtonPressed(Button.A, function () {
    robotPu.setServoAngle(robotPu.ServoJoint.LeftFoot, 45)
    robotPu.setServoAngle(robotPu.ServoJoint.RightFoot, 135)
})

input.onButtonPressed(Button.B, function () {
    robotPu.executeAction(robotPu.Action.Greet)
    basic.pause(500)
    robotPu.exitLoop()
})

input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    robotPu.setWalkSpeed(robotPu.MoveDirection.Forward, 2, 5)
    robotPu.setMoveDirection(robotPu.MoveDirection.LeftTurn)
})

let distance = robotPu.ultrasonicDistance(robotPu.DistanceUnit.Centimeters)
let roll = robotPu.bodyRoll()
let pitch = robotPu.bodyPitch()
let tempo = robotPu.musicTempo()
let front = robotPu.frontDistanceArray()
let _smoke = distance + roll + pitch + tempo + front.length
