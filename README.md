# micro:bit PU Robot

![](pu.png)

This extension provides the non-speech control surface for the PU Robot on micro:bit.
It focuses on movement, sensors, lights, remote control, and text messaging.

Speech features have been removed from this repository so the core extension no longer carries a speech dependency.
If you want speech blocks later, publish them as a separate optional extension.

The PU Robot kit is available from the
[Elecfreaks store](https://shop.elecfreaks.com/products/elecfreaks-micro-bit-pu-robot-kit?utm_source=copyToPasteBoard&utm_medium=product-links&utm_content=web).

## Example

```javascript
input.onButtonPressed(Button.A, function () {
    robotPu.executeAction(robotPu.Action.Greet)
})

input.onButtonPressed(Button.B, function () {
    robotPu.setWalkSpeed(robotPu.MoveDirection.Forward, 4, 6)
})
```

## Core API

- Motion: `executeAction`, `setMoveDirection`, `setWalkSpeed`, `exitLoop`
- Sensors: `ultrasonicDistance`, `bodyRoll`, `bodyPitch`, `musicTempo`, `frontDistanceArray`
- Actuators: `setAmbienceLight`, `setEyesState`, `setLeftEyeBrightness`, `setRightEyeBrightness`
- Servo control: `setServoTrim`, `setServoAngle`, `smoothSetServoAngle`
- Remote control: `setControllerRadioGroup`, `readJoystickValue`, `initControllerButtons`, `getControllerButtonPressed`, `sendControlValue`
- Receiver helpers: `enableRemoteControlWithGroup`, `disableRemoteControl`, `onControlValueReceived`, `getControlValue`, `sendTextMessage`

## Test File

`test.ts` contains a minimal hardware smoke test for servo movement.

## Supported targets

- for PXT/microbit

## License

MIT
