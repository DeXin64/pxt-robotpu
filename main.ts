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
        Kick,
        //% block="walk (remote control)"
        WalkRemote
    }

    export enum MoveDirection {
        //% block="forward"
        Forward,
        //% block="backward"
        Backward,
        //% block="side left"
        SideLeft,
        //% block="side right"
        SideRight
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
    //% leftFoot.defl=0 leftLeg.defl=0 rightFoot.defl=0 rightLeg.defl=0 headOffset.defl=0 headPitch.defl=0
    //% weight=80 blockGap=8
    export function setServoInitialState(leftFoot: number, leftLeg: number, rightFoot: number, rightLeg: number, headOffset: number, headPitch: number): void {
        ensureRobot().setTrim(leftFoot, leftLeg, rightFoot, rightLeg, headOffset, headPitch);
    }

    /**
     * Set walking speed range. Configure the maximum speed of the robot for forward and backward movement.
     */
    //% group="Setup"
    //% block="set walk speed range forward %forward backward %backward"
    //% forward.min=0 forward.max=4 forward.defl=4
    //% backward.min=0 backward.max=3 backward.defl=3
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
 
    }

    /**
     * Set left eye brightness. Adjust the brightness of the left eye light.
     */
    //% group="Actuators"
    //% block="set left eye brightness %brightness"
    //% brightness.min=0 brightness.max=100 brightness.defl=50
    //% weight=63 blockGap=8
    export function setLeftEyeBrightness(brightness: number): void {
 
    }

    /**
     * Set right eye brightness. Adjust the brightness of the right eye light.
     */
    //% group="Actuators"
    //% block="set right eye brightness %brightness"
    //% brightness.min=0 brightness.max=100 brightness.defl=50
    //% weight=62 blockGap=8
    export function setRightEyeBrightness(brightness: number): void {
 
    }

    /**
     * Execute action. Perform the specified preset action. When "Explore" is selected, the robot will walk forward and automatically turn when encountering obstacles; when "Remote Control" is selected, it needs to be used with the "Remote Control" function.
     */
    //% group="Actions"
    //% block="execute action %action"
    //% weight=55 blockGap=8
    export function executeAction(action: Action): void {
 
    }

    /**
     * Set robot move direction. Set the movement direction of the PU robot.
     */
    //% group="Actions"
    //% block="set robot move direction %direction"
    //% weight=54 blockGap=8
    export function setMoveDirection(direction: MoveDirection): void {
 
    }

    /**
     * Set robot walk speed and turn. Set the walking speed and turning direction of the PU robot.
     */
    //% group="Actions"
    //% block="set walk speed %speed turn %turn"
    //% speed.min=-100 speed.max=100 speed.defl=0
    //% turn.defl=TurnDirection.Straight
    //% weight=53 blockGap=8
    export function setWalkSpeed(speed: number, turn: TurnDirection): void {
 
    }

    /**
     * Talk. Make the robot say the specified text.
     */
    //% group="Actions"
    //% block="talk %text"
    //% text.shadow=text
    //% weight=52 blockGap=8
    export function talk(text: string): void {
 
    }

    /**
     * Sing. Make the robot sing the specified song or command.
     */
    //% group="Actions"
    //% block="sing %song"
    //% song.shadow=text
    //% weight=51 blockGap=8
    export function sing(song: string): void {
 
    }

    /**
     * Set servo angle. Directly rotate the specified servo to the target angle.
     */
    //% group="Actuators"
    //% block="set %joint servo to %angle"
    //% angle.min=0 angle.max=180 angle.defl=90
    //% weight=65 blockGap=8
    export function setServoAngle(joint: ServoJoint, angle: number): void {
 
    }

    /**
     * Smooth set servo angle. Smoothly rotate the specified servo to the target angle with the specified step length.
     */
    //% group="Actuators"
    //% block="smooth move %joint servo to %angle with step %step"
    //% angle.min=0 angle.max=180 angle.defl=90
    //% step.min=1 step.max=20 step.defl=2
    //% weight=64 blockGap=8
    export function smoothSetServoAngle(joint: ServoJoint, angle: number, step: number): void {
 
    }
}
