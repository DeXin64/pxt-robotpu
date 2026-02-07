//% color=#e7660b icon="\uf2bd"
//block="robot PU" blockId="robotPu"
namespace robotPu {
    let robot: RobotPu;

    function ensureRobot(): RobotPu {
        if (!robot) {
            const sn = "pu-" + control.deviceSerialNumber();
            robot = new RobotPu(sn, "peu");
            robot.calibrate();
            control.inBackground(function () {
                while (true) {
                    robot.updateStates();
                    robot.stateMachine();
                    basic.pause(5);
                }
            });
        }
        return robot;
    }
    
    
    export enum DistanceUnit {
        //% block="cm"
        Centimeters,
        //% block="inch"
        Inches
    }

    export enum LightSelection {
        //% block="1"
        Light1,
        //% block="2"
        Light2,
        //% block="3"
        Light3,
        //% block="4"
        Light4,
        //% block="all"
        All
    }

    export enum EyeState {
        //% block="off"
        Off,
        //% block="on"
        On
    }

    export enum Action {
        //% block="greet"
        Greet,
        //% block="rest"
        Rest,
        //% block="explore"
        Explore,
        //% block="jump"
        Jump,
        //% block="dance"
        Dance,
        //% block="kick"
        Kick
    }

    export enum MoveDirection {
        //% block="forward"
        Forward,
        //% block="backward"
        Backward,
        //% block="side left"
        SideLeft,
        //% block="side right"
        SideRight,
        //% block="left turn"
        LeftTurn,
        //% block="right turn"
        RightTurn
    }

    export enum TurnDirection {
        //% block="left"
        Left,
        //% block="straight"
        Straight,
        //% block="right"
        Right
    }

    export enum ServoJoint {
        //% block="left foot"
        LeftFoot,
        //% block="left leg"
        LeftLeg,
        //% block="right foot"
        RightFoot,
        //% block="right leg"
        RightLeg,
        //% block="head offset"
        HeadOffset,
        //% block="head pitch"
        HeadPitch
    }
    /**
     * Set the initial state of the servo joints.
     */
    //% group="Setup"
    //% block="set servo initial state left foot %leftFoot left leg %leftLeg right foot %rightFoot right leg %rightLeg head offset %headOffset head pitch %headPitch"
    //% leftFoot.defl=90 leftLeg.defl=90 rightFoot.defl=90 rightLeg.defl=90 headOffset.defl=90 headPitch.defl=90
    //% weight=80 blockGap=8
    export function setServoInitialState(leftFoot: number, leftLeg: number, rightFoot: number, rightLeg: number, headOffset: number, headPitch: number): void {
        ensureRobot().setServoTargets(leftFoot, leftLeg, rightFoot, rightLeg, headOffset, headPitch);
    }

    /**
     * Set walking speed range. Configure the maximum speed of the robot for forward and backward movement.
     */
    //% group="Setup"
    //% block="set walk speed range forward %forward backward %backward"
    //% forward.min=0 forward.max=4 forward.defl=2
    //% backward.min=0 backward.max=3 backward.defl=2
    //% weight=79 blockGap=8
    export function setWalkSpeedRange(forward: number, backward: number): void {
        const robot = ensureRobot();
        robot.setFwdMaxSpeed(forward);
        robot.setBwdMaxSpeed(-backward); // 注意：后退速度在内部存储为负值
    }

    /**
     * Get ultrasonic sensor distance. Returns the distance detected by the ultrasonic sensor, units can be selected as centimeters or inches.
     */
    //% group="Sensors"
    //% block="ultrasonic sensor distance in %unit"
    //% weight=70 blockGap=8
    export function ultrasonicDistance(unit: DistanceUnit): number {
        const robot = ensureRobot();
        const distanceCm = robot.sonar.distanceCm();
        
        if (unit === DistanceUnit.Centimeters) {
            return distanceCm;
        } else {
            // 转换为英寸 (1英寸 ≈ 2.54厘米)
            return distanceCm / 2.54;
        }
    }

    /**
     * Set ambience light. Set the selected ambience light to the specified RGB color.
     */
    //% group="Actuators"
    //% block="set ambience light %light to RGB (%r, %g, %b)"
    //% r.min=0 r.max=255 r.defl=255
    //% g.min=0 g.max=255 g.defl=255
    //% b.min=0 b.max=255 b.defl=255
    //% weight=65 blockGap=8
    //% inlineInputMode=inline
    export function setAmbienceLight(light: LightSelection, r: number, g: number, b: number): void {
        const robot = ensureRobot();
        
        // 确保RGB值在0-255范围内
        r = Math.max(0, Math.min(255, r));
        g = Math.max(0, Math.min(255, g));
        b = Math.max(0, Math.min(255, b));
        
        const color = neopixel.rgb(r, g, b);
        
        switch (light) {
            case LightSelection.Light1:
                robot.np.setPixelColor(0, color);
                break;
            case LightSelection.Light2:
                robot.np.setPixelColor(1, color);
                break;
            case LightSelection.Light3:
                robot.np.setPixelColor(2, color);
                break;
            case LightSelection.Light4:
                robot.np.setPixelColor(3, color);
                break;
            case LightSelection.All:
                for (let i = 0; i < 4; i++) {
                    robot.np.setPixelColor(i, color);
                }
                break;
        }
        
        robot.np.show();
    }

    /**
     * Set left/right eye state. Turn the left and right eyes on or off.
     */
    //% group="Actuators"
    //% block="set left eye %leftEye right eye %rightEye"
    //% leftEye.defl=EyeState.On rightEye.defl=EyeState.On
    //% weight=64 blockGap=8
    export function setEyesState(leftEye: EyeState, rightEye: EyeState): void {
        const robot = ensureRobot();
        // 禁用自动闪烁功能，防止状态机干扰手动设置
        robot.wk.setAutoBlinkEnabled(false);
        robot.gst = 6; // 6是手动模式的索引
        robot.lastCmdTS = control.millis(); // 更新命令时间戳
        robot.wk.lastBlinkTS = control.millis(); // 更新闪烁时间戳
       
        const leftValue = leftEye === EyeState.On ? 1023 : 0;
        const rightValue = rightEye === EyeState.On ? 1023 : 0;
        
        robot.wk.leftEyeBright(leftValue);
        robot.wk.rightEyeBright(rightValue);
    }

    /**
     * Set left eye brightness. Adjust the brightness of the left eye light.
     */
    //% group="Actuators"
    //% block="set left eye brightness %brightness"
    //% brightness.min=0 brightness.max=100 brightness.defl=50
    //% weight=63 blockGap=8
    export function setLeftEyeBrightness(brightness: number): void {
        const robot = ensureRobot();
        robot.wk.setAutoBlinkEnabled(false);
        robot.gst = 6; // 6是手动模式的索引
        robot.lastCmdTS = control.millis(); // 更新命令时间戳
        robot.wk.lastBlinkTS = control.millis(); // 更新闪烁时间戳
       
        // 将0-100的亮度范围转换为0-1023的PWM值
        const pwmValue = Math.max(0, Math.min(1023, Math.floor(brightness * 10.23)));
        robot.wk.leftEyeBright(pwmValue);
    }

    /**
     * Set right eye brightness. Adjust the brightness of the right eye light.
     */
    //% group="Actuators"
    //% block="set right eye brightness %brightness"
    //% brightness.min=0 brightness.max=100 brightness.defl=50
    //% weight=62 blockGap=8
    export function setRightEyeBrightness(brightness: number): void {
        const robot = ensureRobot();
        robot.wk.setAutoBlinkEnabled(false);
        robot.gst = 6; // 6是手动模式的索引
        robot.lastCmdTS = control.millis(); // 更新命令时间戳
        robot.wk.lastBlinkTS = control.millis(); // 更新闪烁时间戳
        
        // 将0-100的亮度范围转换为0-1023的PWM值
        const pwmValue = Math.max(0, Math.min(1023, Math.floor(brightness * 10.23)));
        robot.wk.rightEyeBright(pwmValue);
    }

    /**
     * Execute action. Perform the specified preset action. When "Explore" is selected, the robot will walk forward and automatically turn when encountering obstacles; when "Remote Control" is selected, it needs to be used with the "Remote Control" function.
     */
    //% group="Actions"
    //% block="execute action %action"
    //% weight=55 blockGap=8
    export function executeAction(action: Action): void {
        const robot = ensureRobot();
        robot.scheduledInterval = 0; // Set interval to 1 second
        robot.startScheduledExecute(action);
    }

    /**
     * Exit loop - stop timed execution.
     */
    //% group="Actions"
    //% block="stop action"
    //% weight=51 blockGap=8
    export function exitLoop(): void {
        const robot = ensureRobot();
        robot.stopScheduledExecute();
    }

    /**
     * Set robot move direction. Set the movement direction of the PU robot.
     */
    //% group="Actions"
    //% block="set robot move direction %direction"
    //% weight=54 blockGap=8
    export function setMoveDirection(direction: MoveDirection): void {
        const robot = ensureRobot();
        
        // 设置移动方向和速度
        switch (direction) {
            case MoveDirection.Forward:
                robot.walkSpeed = robot.fwdSpeed; // 使用前进最大速度
                robot.walkDirection = 0; // 直行
                break;
            case MoveDirection.Backward:
                robot.walkSpeed = robot.bwdSpeed; // 使用后退最大速度
                robot.walkDirection = 0; // 直行
                break;
            case MoveDirection.SideLeft:
                robot.walkSpeed = 0; // 停止前进/后退
                robot.walkDirection = -1; // 左侧移
                break;
            case MoveDirection.SideRight:
                robot.walkSpeed = 0; // 停止前进/后退
                robot.walkDirection = 1; // 右侧移
                break;
            case MoveDirection.LeftTurn:
                robot.walkSpeed = robot.fwdSpeed * 0.5; // 使用较慢的速度
                robot.walkDirection = -1; // 左转向
                break;
            case MoveDirection.RightTurn:
                robot.walkSpeed = robot.fwdSpeed * 0.5; // 使用较慢的速度
                robot.walkDirection = 1; // 右转向
                break;
        }
        
        // 重置WK状态，确保新的移动命令从正确的初始状态开始执行
        robot.gst = 7;
        // 更新命令时间戳，确保机器人持续执行当前指令直到下一个指令到来
        robot.lastCmdTS = control.millis();
    }

    function doCompletions(run: () => number, completions: number): void {
        let done = 0
        while (done < completions) {
        const rc = run() // 调用传入的函数
        if (rc == 0) done += 1 // 每次返回 0 时增加完成计数
        }
    }

    /**
     * Walk a certain number of steps in a specific direction. Make the PU robot walk the specified number of steps in the given direction using the configured speed.
     */
    //% group="Actions"
    //% block="walk %direction for %steps steps at speed %speed"
    //% steps.min=1 steps.max=100 steps.defl=5
    //% speed.min=1 speed.max=10 speed.defl=5
    //% direction.defl=MoveDirection.Forward
    //% weight=53 blockGap=8
    export function setWalkSpeed(direction: MoveDirection, steps: number, speed: number): void {
        const robot = ensureRobot();
        
        // Map speed from 1-10 to appropriate range
        const normalizedSpeed = Math.max(0.1, Math.min(1, speed / 10));
        
        // 根据方向调用相应的机器人运动方法
        switch (direction) {
            case MoveDirection.Forward:
                // 向前走：使用用户指定的速度，直行
                doCompletions(() => {
                    const currentSpeed = 2 * normalizedSpeed;
                    return robot.walk(currentSpeed, 0);
                }, steps * 2);
                break;
            case MoveDirection.Backward:
                // 向后走：使用用户指定的速度，直行
                doCompletions(() => {
                    const currentSpeed = 2 * normalizedSpeed;
                    return robot.walk(currentSpeed, 0);
                }, steps * 2);
                break;
            case MoveDirection.SideLeft:
                // 向左侧步：负方向，使用用户指定的速度
                doCompletions(() => robot.sideStep(-normalizedSpeed * 0.2), steps * 2);
                break;
            case MoveDirection.SideRight:
                // 向右侧步：正方向，使用用户指定的速度
                doCompletions(() => robot.sideStep(normalizedSpeed * 0.2), steps * 2);
                break;
        }
    }

    /**
     * Talk. Make the robot say the specified text.
     */
    //% group="Actions"
    //% block="talk %text"
    //% text.shadow=text
    //% weight=52 blockGap=8
    export function talk(text: string): void {
        const robot = ensureRobot();
        robot.talk(text);
    }

    /**
     * Sing. Make the robot sing the specified song or command.
     */
    //% group="Actions"
    //% block="sing %song"
    //% song.shadow=text
    //% weight=51 blockGap=8
    export function sing(song: string): void {
        const robot = ensureRobot();
        // 这里可以添加唱歌功能的实现
        // 目前先使用talk方法作为占位
        robot.talk(song);
    }

    /**
     * Set servo angle. Directly rotate the specified servo to the target angle.
     */
    //% group="Actions"
    //% block="set %joint servo to %angle"
    //% angle.min=0 angle.max=180 angle.defl=90
    //% weight=65 blockGap=8
    export function setServoAngle(joint: ServoJoint, angle: number): void {
        const robot = ensureRobot();
        
        // 将关节类型转换为内部索引
        const jointIndex = getServoIndex(joint);
        if (jointIndex >= 0) {
            angle = Math.min(180, Math.max(0, Math.floor(angle)));
            // 切换到手动模式，防止状态机干扰
            robot.gst = 6; // 6是手动模式的索引
            robot.lastCmdTS = control.millis(); // 更新命令时间戳
            robot.pr.servoTarget[jointIndex] = angle; // 更新目标位置
            robot.wk.servo(jointIndex, angle); // 直接设置舵机角度
        }
    }

    /**
     * Smooth set servo angle. Smoothly rotate the specified servo to the target angle with the specified step length.
     */
    //% group="Actions"
    //% block="smooth move %joint servo to %angle with step %step"
    //% angle.min=0 angle.max=180 angle.defl=90
    //% step.min=1 step.max=20 step.defl=2
    //% weight=64 blockGap=8
    export function smoothSetServoAngle(joint: ServoJoint, angle: number, step: number): void {
        const robot = ensureRobot();
        
        // 将关节类型转换为内部索引
        const jointIndex = getServoIndex(joint);
        // 切换到手动模式，防止状态机干扰
        robot.gst = 6; // 6是手动模式的索引
        robot.lastCmdTS = control.millis(); // 更新命令时间戳
        
        // 使用控制循环持续调用servoStep直到到达目标角度
        control.inBackground(function () {
            while (true) {
                robot.wk.servoStep(angle, step, jointIndex, robot.pr);
                // 检查是否已经到达目标角度
                if (Math.abs(angle - robot.pr.servoTarget[jointIndex]) <= step) {
                    break;
                }
                // 短暂延迟，控制更新频率
                control.waitMicros(50000); // 50ms
            }
        });
    }

    /**
     * Helper function to convert ServoJoint enum to internal index
     */
    function getServoIndex(joint: ServoJoint): number {
        switch (joint) {
            case ServoJoint.LeftFoot:
                return 0;
            case ServoJoint.LeftLeg:
                return 1;
            case ServoJoint.RightFoot:
                return 2;
            case ServoJoint.RightLeg:
                return 3;
            case ServoJoint.HeadOffset:
                return 4;
            case ServoJoint.HeadPitch:
                return 5;
            default:
                return -1;
        }
    }

    // ========== 控制器端积木块 ==========

    let controllerRadioGroup: number = 160;

    /**
     * Set controller radio group. Set the radio channel for the controller (0-255).
     */
    //% group="Remote Control"
    //% block="set controller radio group %group"
    //% group.min=0 group.max=255 group.defl=160
    //% weight=40 blockGap=8
    export function setControllerRadioGroup(group: number): void {
        controllerRadioGroup = Math.max(0, Math.min(255, Math.floor(group)));
        radio.setGroup(controllerRadioGroup);
        basic.showNumber(controllerRadioGroup);
    }

    /**
     * Send turn value. Send the turn control value to the robot (-1 to 1).
     */
    //% group="Remote Control"
    //% block="send turn value %value"
    //% value.min=-1 value.max=1 value.defl=0
    //% weight=39 blockGap=8
    export function sendTurnValue(value: number): void {
        radio.sendValue("#puturn", value);
    }

    /**
     * Send speed value. Send the speed control value to the robot (-1 to 1).
     */
    //% group="Remote Control"
    //% block="send speed value %value"
    //% value.min=-1 value.max=1 value.defl=0
    //% weight=38 blockGap=8
    export function sendSpeedValue(value: number): void {
        radio.sendValue("#puspeed", value);
    }

    /**
     * Send pitch value. Send the controller's pitch angle to the robot.
     */
    //% group="Remote Control"
    //% block="send pitch value %value"
    //% value.min=-90 value.max=90 value.defl=0
    //% weight=37 blockGap=8
    export function sendPitchValue(value: number): void {
        radio.sendValue("#pupitch", value);
    }

    /**
     * Send roll value. Send the controller's roll angle to the robot.
     */
    //% group="Remote Control"
    //% block="send roll value %value"
    //% value.min=-90 value.max=90 value.defl=0
    //% weight=36 blockGap=8
    export function sendRollValue(value: number): void {
        radio.sendValue("#puroll", value);
    }

    /**
     * Send button command. Send a button command to the robot (0-4).
     */
    //% group="Remote Control"
    //% block="send button command %button"
    //% button.min=0 button.max=4 button.defl=0
    //% weight=35 blockGap=8
    export function sendButtonCommand(button: number): void {
        radio.sendValue("#puB", button);
    }

    /**
     * Send text message. Send a text message to the robot.
     */
    //% group="Remote Control"
    //% block="send text message %text"
    //% text.shadow=text
    //% weight=34 blockGap=8
    export function sendTextMessage(text: string): void {
        radio.sendString("#put" + text);
    }

    // ========== 机器人端积木块 ==========

    let remoteControlEnabled: boolean = false;
    let currentTurnValue: number = 0;
    let currentSpeedValue: number = 0;
    let currentButtonValue: number = 0;
    let currentTextMessage: string = "";
    let onTurnValueHandler: (value: number) => void = null;
    let onSpeedValueHandler: (value: number) => void = null;
    let onButtonCommandHandler: (button: number) => void = null;
    let onTextMessageHandler: (text: string) => void = null;

    /**
     * Set robot radio group. Set the radio channel for the robot (0-255).
     */
    //% group="Remote Control"
    //% block="set robot radio group %group"
    //% group.min=0 group.max=255 group.defl=160
    //% weight=30 blockGap=8
    export function setRobotRadioGroup(group: number): void {
        const robot = ensureRobot();
        robot.setGroupId(group);
    }

    /**
     * Enable remote control. Enable the robot to receive remote control commands.
     */
    //% group="Remote Control"
    //% block="enable remote control"
    //% weight=29 blockGap=8
    export function enableRemoteControl(): void {
        const robot = ensureRobot();
        remoteControlEnabled = true;
        robot.gst = 5;
        
        radio.onReceivedValue(function (name: string, value: number) {
            if (!remoteControlEnabled) return;
            
            if (name == "#puturn") {
                currentTurnValue = value;
                if (onTurnValueHandler) {
                    onTurnValueHandler(value);
                }
            } else if (name == "#puspeed") {
                currentSpeedValue = value;
                if (onSpeedValueHandler) {
                    onSpeedValueHandler(value);
                }
            } else if (name == "#puB") {
                currentButtonValue = value;
                if (onButtonCommandHandler) {
                    onButtonCommandHandler(value);
                }
            } else if (name == "#pupitch") {
                robot.pitch(value);
            } else if (name == "#puroll") {
                robot.roll(value);
            }
        });
        
        radio.onReceivedString(function (receivedString: string) {
            if (!remoteControlEnabled) return;
            
            if (receivedString.substr(0, 4) == "#put") {
                currentTextMessage = receivedString.substr(4);
                if (onTextMessageHandler) {
                    onTextMessageHandler(currentTextMessage);
                }
            }
        });
    }

    /**
     * Disable remote control. Disable the robot from receiving remote control commands.
     */
    //% group="Remote Control"
    //% block="disable remote control"
    //% weight=28 blockGap=8
    export function disableRemoteControl(): void {
        const robot = ensureRobot();
        remoteControlEnabled = false;
        robot.gst = 0;
    }

    /**
     * On turn value received. Run code when a turn value is received from the controller.
     */
    //% group="Remote Control"
    //% block="on turn value received"
    //% weight=27 blockGap=8
    export function onTurnValueReceived(handler: (value: number) => void): void {
        onTurnValueHandler = handler;
    }

    /**
     * On speed value received. Run code when a speed value is received from the controller.
     */
    //% group="Remote Control"
    //% block="on speed value received"
    //% weight=26 blockGap=8
    export function onSpeedValueReceived(handler: (value: number) => void): void {
        onSpeedValueHandler = handler;
    }

    /**
     * On button command received. Run code when a button command is received from the controller.
     */
    //% group="Remote Control"
    //% block="on button command received"
    //% weight=25 blockGap=8
    export function onButtonCommandReceived(handler: (button: number) => void): void {
        onButtonCommandHandler = handler;
    }

    /**
     * On text message received. Run code when a text message is received from the controller.
     */
    //% group="Remote Control"
    //% block="on text message received"
    //% weight=24 blockGap=8
    export function onTextMessageReceived(handler: (text: string) => void): void {
        onTextMessageHandler = handler;
    }

    /**
     * Get current turn value. Get the most recently received turn value from the controller.
     */
    //% group="Remote Control"
    //% block="current turn value"
    //% weight=23 blockGap=8
    export function getCurrentTurnValue(): number {
        return currentTurnValue;
    }

    /**
     * Get current speed value. Get the most recently received speed value from the controller.
     */
    //% group="Remote Control"
    //% block="current speed value"
    //% weight=22 blockGap=8
    export function getCurrentSpeedValue(): number {
        return currentSpeedValue;
    }

    /**
     * Get current button value. Get the most recently received button value from the controller.
     */
    //% group="Remote Control"
    //% block="current button value"
    //% weight=21 blockGap=8
    export function getCurrentButtonValue(): number {
        return currentButtonValue;
    }
}
