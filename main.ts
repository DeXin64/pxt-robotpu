// MakeCode blocks wrapper for RobotPu
//% weight=50 color=#e7660b icon="\uf2bd"
//block="Robot PU"
//% groups='["Variables", "Setup", "Sensors", "Actuators", "Actions", "Remote Control"]'
namespace robotPu {
    
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

    //% group="Setup"
    //% block="set servo initial state left foot %leftFoot left leg %leftLeg right foot %rightFoot right leg %rightLeg head offset %headOffset head pitch %headPitch"
    //% subcategory="Setup"
    //% leftFoot.defl=0 leftLeg.defl=0 rightFoot.defl=0 rightLeg.defl=0 headOffset.defl=0 headPitch.defl=0
    //% weight=80 blockGap=8
    export function setServoInitialState(leftFoot: number, leftLeg: number, rightFoot: number, rightLeg: number, headOffset: number, headPitch: number): void {
 
    }

    //% group="Setup"
    //% block="set walk speed range forward %forward backward %backward"
    //% subcategory="Setup"
    //% forward.min=0 forward.max=4 forward.defl=4
    //% backward.min=0 backward.max=3 backward.defl=3
    //% weight=79 blockGap=8
    export function setWalkSpeedRange(forward: number, backward: number): void {
 
    }

    //% group="Sensors"
    //% block="ultrasonic sensor distance in %unit"
    //% subcategory="Sensors"
    //% weight=70 blockGap=8
    export function ultrasonicDistance(unit: DistanceUnit): number {
 
        return 0;
    }

    //% group="Actuators"
    //% block="set ambience light %light to RGB (%r, %g, %b)"
    //% subcategory="Actuators"
    //% r.min=0 r.max=255 r.defl=255
    //% g.min=0 g.max=255 g.defl=255
    //% b.min=0 b.max=255 b.defl=255
    //% weight=65 blockGap=8
    //% inlineInputMode=inline
    export function setAmbienceLight(light: LightSelection, r: number, g: number, b: number): void {
 
    }

    //% group="Actuators"
    //% block="set left eye %leftEye right eye %rightEye"
    //% subcategory="Actuators"
    //% leftEye.defl=EyeState.On rightEye.defl=EyeState.On
    //% weight=64 blockGap=8
    export function setEyesState(leftEye: EyeState, rightEye: EyeState): void {
 
    }

    //% group="Actuators"
    //% block="set left eye brightness %brightness"
    //% subcategory="Actuators"
    //% brightness.min=0 brightness.max=100 brightness.defl=50
    //% weight=63 blockGap=8
    export function setLeftEyeBrightness(brightness: number): void {
 
    }

    //% group="Actuators"
    //% block="set right eye brightness %brightness"
    //% subcategory="Actuators"
    //% brightness.min=0 brightness.max=100 brightness.defl=50
    //% weight=62 blockGap=8
    export function setRightEyeBrightness(brightness: number): void {
 
    }

    //% group="Actions"
    //% block="execute action %action"
    //% subcategory="Actions"
    //% weight=55 blockGap=8
    export function executeAction(action: Action): void {
 
    }

    //% group="Actions"
    //% block="set robot move direction %direction"
    //% subcategory="Actions"
    //% weight=54 blockGap=8
    export function setMoveDirection(direction: MoveDirection): void {
 
    }

    //% group="Actions"
    //% block="set walk speed %speed turn %turn"
    //% subcategory="Actions"
    //% speed.min=-100 speed.max=100 speed.defl=0
    //% turn.defl=TurnDirection.Straight
    //% weight=53 blockGap=8
    export function setWalkSpeed(speed: number, turn: TurnDirection): void {
 
    }

    //% group="Actions"
    //% block="talk %text"
    //% subcategory="Actions"
    //% text.shadow=text
    //% weight=52 blockGap=8
    export function talk(text: string): void {
 
    }

    //% group="Actions"
    //% block="sing %song"
    //% subcategory="Actions"
    //% song.shadow=text
    //% weight=51 blockGap=8
    export function sing(song: string): void {
 
    }

    //% group="Actuators"
    //% block="set %joint servo to %angle"
    //% subcategory="Actuators"
    //% angle.min=0 angle.max=180 angle.defl=90
    //% weight=65 blockGap=8
    export function setServoAngle(joint: ServoJoint, angle: number): void {
 
    }

    //% group="Actuators"
    //% block="smooth move %joint servo to %angle with step %step"
    //% subcategory="Actuators"
    //% angle.min=0 angle.max=180 angle.defl=90
    //% step.min=1 step.max=20 step.defl=2
    //% weight=64 blockGap=8
    export function smoothSetServoAngle(joint: ServoJoint, angle: number, step: number): void {
 
    }
}
