# Robot PU API Documentation

## 1. 命名空间说明

```typescript
// MakeCode blocks wrapper for RobotPu
//% weight=50 color=#e7660b icon="\uf2bd"
//block="Robot PU"
//% groups='["Variables", "Setup", "Sensors", "Actuators", "Actions", "Remote Control"]'
namespace robotPu {
    // ...
}
```

Robot PU命名空间提供了控制Robot PU机器人的所有API函数，包括动作控制、传感器读取、执行器控制和远程控制等功能。

## 2. 枚举类型

### 2.1 Mode（行为模式）

| 枚举值 | 描述 |
|--------|------|
| `Mode.Rest` | 休息模式 |
| `Mode.Explore` | 探索模式 |
| `Mode.Jump` | 跳跃模式 |
| `Mode.Dance` | 跳舞模式 |
| `Mode.Kick` | 踢球模式 |
| `Mode.Walk` | 行走模式（远程控制） |

### 2.2 ServoJoint（伺服关节）

| 枚举值 | 描述 |
|--------|------|
| `ServoJoint.LeftFoot` | 左脚关节 |
| `ServoJoint.LeftLeg` | 左腿关节 |
| `ServoJoint.RightFoot` | 右脚关节 |
| `ServoJoint.RightLeg` | 右腿关节 |
| `ServoJoint.HeadYaw` | 头部偏航关节 |
| `ServoJoint.HeadPitch` | 头部俯仰关节 |

## 3. API函数

### 3.1 Actions（动作）

#### greet()
- **功能**：Robot PU自我介绍
- **参数**：无
- **返回值**：无
- **代码示例**：
  ```typescript
  robotPu.greet();
  ```

#### setMode(mode: Mode)
- **功能**：设置当前机器人行为模式（状态机）
- **参数**：
  - `mode`：机器人行为模式（见Mode枚举）
- **返回值**：无
- **代码示例**：
  ```typescript
  robotPu.setMode(robotPu.Mode.Explore);
  ```

#### leftEyeBright(brightness: number)
- **功能**：设置左眼亮度
- **参数**：
  - `brightness`：亮度值（0-1，默认0.05）
- **返回值**：无
- **代码示例**：
  ```typescript
  robotPu.leftEyeBright(0.5);
  ```

#### rightEyeBright(brightness: number)
- **功能**：设置右眼亮度
- **参数**：
  - `brightness`：亮度值（0-1，默认0.05）
- **返回值**：无
- **代码示例**：
  ```typescript
  robotPu.rightEyeBright(0.5);
  ```

#### walk(speed: number, turn: number): number
- **功能**：以指定速度和转向偏差行走
- **参数**：
  - `speed`：行走速度（-5到5，默认2，正数表示前进）
  - `turn`：转向偏差（-1到1，默认0，负数表示左转，正数表示右转）
- **返回值**：数字类型结果
- **代码示例**：
  ```typescript
  let result = robotPu.walk(3, 0.5);
  ```

#### walkDo(speed: number, turn: number)
- **功能**：以指定速度和转向偏差行走（无返回值版本）
- **参数**：
  - `speed`：行走速度（-5到5，默认2）
  - `turn`：转向偏差（-1到1，默认0）
- **返回值**：无
- **代码示例**：
  ```typescript
  robotPu.walkDo(3, 0.5);
  ```

#### explore(): number
- **功能**：使用声纳自主探索
- **参数**：无
- **返回值**：数字类型结果
- **代码示例**：
  ```typescript
  let result = robotPu.explore();
  ```

#### exploreDo()
- **功能**：使用声纳探索环境（无返回值版本）
- **参数**：无
- **返回值**：无
- **代码示例**：
  ```typescript
  robotPu.exploreDo();
  ```

#### sideStep(direction: number): number
- **功能**：侧步移动
- **参数**：
  - `direction`：方向（-1表示向左，1表示向右，默认-1）
- **返回值**：数字类型结果
- **代码示例**：
  ```typescript
  let result = robotPu.sideStep(1);
  ```

#### sideStepDo(direction: number)
- **功能**：侧步移动（无返回值版本）
- **参数**：
  - `direction`：方向（-1到1，默认-1）
- **返回值**：无
- **代码示例**：
  ```typescript
  robotPu.sideStepDo(1);
  ```

#### dance(): number
- **功能**：随着音乐跳舞
- **参数**：无
- **返回值**：数字类型结果
- **代码示例**：
  ```typescript
  let result = robotPu.dance();
  ```

#### danceDo()
- **功能**：随着音乐跳舞（无返回值版本）
- **参数**：无
- **返回值**：无
- **代码示例**：
  ```typescript
  robotPu.danceDo();
  ```

#### kick(): number
- **功能**：快速向前踢球
- **参数**：无
- **返回值**：数字类型结果
- **代码示例**：
  ```typescript
  let result = robotPu.kick();
  ```

#### kickDo()
- **功能**：踢球动作（无返回值版本）
- **参数**：无
- **返回值**：无
- **代码示例**：
  ```typescript
  robotPu.kickDo();
  ```

#### jump(): number
- **功能**：跳跃动作
- **参数**：无
- **返回值**：数字类型结果
- **代码示例**：
  ```typescript
  let result = robotPu.jump();
  ```

#### jumpDo()
- **功能**：跳跃动作（无返回值版本）
- **参数**：无
- **返回值**：无
- **代码示例**：
  ```typescript
  robotPu.jumpDo();
  ```

#### rest(): number
- **功能**：进入平衡闲置状态
- **参数**：无
- **返回值**：数字类型结果
- **代码示例**：
  ```typescript
  let result = robotPu.rest();
  ```

#### restDo()
- **功能**：进入平衡闲置/休息状态（无返回值版本）
- **参数**：无
- **返回值**：无
- **代码示例**：
  ```typescript
  robotPu.restDo();
  ```

#### stand(): number
- **功能**：站立动作
- **参数**：无
- **返回值**：数字类型结果
- **代码示例**：
  ```typescript
  let result = robotPu.stand();
  ```

#### standDo()
- **功能**：站立动作（无返回值版本）
- **参数**：无
- **返回值**：无
- **代码示例**：
  ```typescript
  robotPu.standDo();
  ```

#### talk(text: string)
- **功能**：使用Billy语音合成器说话
- **参数**：
  - `text`：要说出的文本
- **返回值**：无
- **代码示例**：
  ```typescript
  robotPu.talk("Hello, I am Robot PU!");
  ```

#### sing(s: string)
- **功能**：使用Billy语音合成器唱出发音或音乐字符串
- **参数**：
  - `s`：要唱出的发音或音乐字符串
- **返回值**：无
- **代码示例**：
  ```typescript
  robotPu.sing("C D E F G A B C");
  ```

### 3.2 Actuators（执行器）

#### servo(joint: ServoJoint, angle: number)
- **功能**：设置Robot PU伺服关节角度（0-180度）
- **参数**：
  - `joint`：伺服关节（见ServoJoint枚举）
  - `angle`：目标角度（0-180度，默认90度）
- **返回值**：无
- **代码示例**：
  ```typescript
  robotPu.servo(robotPu.ServoJoint.HeadYaw, 120);
  ```

#### servoStep(joint: ServoJoint, target: number, stepSize: number)
- **功能**：使用渐进式步进将Robot PU伺服关节移向目标角度
- **参数**：
  - `joint`：伺服关节（见ServoJoint枚举）
  - `target`：目标角度（0-180度，默认90度）
  - `stepSize`：步长（1-20，默认2）
- **返回值**：无
- **代码示例**：
  ```typescript
  robotPu.servoStep(robotPu.ServoJoint.LeftLeg, 100, 3);
  ```

### 3.3 Sensors（传感器）

#### sonarDistanceCm(): number
- **功能**：获取声纳距离（厘米）
- **参数**：无
- **返回值**：距离值（厘米）
- **代码示例**：
  ```typescript
  let distance = robotPu.sonarDistanceCm();
  ```

### 3.4 Setup（设置）

#### setServoTrim(leftFoot: number, leftLeg: number, rightFoot: number, rightLeg: number, headYaw: number, headPitch: number)
- **功能**：设置伺服关节微调偏移量
- **参数**：
  - `leftFoot`：左脚微调值（默认0）
  - `leftLeg`：左腿微调值（默认0）
  - `rightFoot`：右脚微调值（默认0）
  - `rightLeg`：右腿微调值（默认0）
  - `headYaw`：头部偏航微调值（默认0）
  - `headPitch`：头部俯仰微调值（默认0）
- **返回值**：无
- **代码示例**：
  ```typescript
  robotPu.setServoTrim(0, 1, 0, -1, 0, 0);
  ```

#### calibrate()
- **功能**：运行校准程序
- **参数**：无
- **返回值**：无
- **代码示例**：
  ```typescript
  robotPu.calibrate();
  ```

#### setWalkSpeedRange(min: number, max: number)
- **功能**：设置行走速度范围：最小值映射到向后最大速度，最大值映射到向前最大速度
- **参数**：
  - `min`：最小速度（默认-3）
  - `max`：最大速度（默认4）
- **返回值**：无
- **代码示例**：
  ```typescript
  robotPu.setWalkSpeedRange(-4, 5);
  ```

### 3.5 Remote Control（远程控制）

#### runStringCommand(s: string)
- **功能**：执行字符串命令
- **参数**：
  - `s`：要执行的命令字符串
- **返回值**：无
- **代码示例**：
  ```typescript
  robotPu.runStringCommand("forward");
  ```

#### runKeyValueCommand(key: string, v: number)
- **功能**：执行键值命令
- **参数**：
  - `key`：命令键
  - `v`：命令值
- **返回值**：无
- **代码示例**：
  ```typescript
  robotPu.runKeyValueCommand("speed", 3);
  ```

### 3.6 Variables（变量）

#### channel(): number
- **功能**：获取当前无线电信道（0..255）
- **参数**：无
- **返回值**：当前信道值
- **代码示例**：
  ```typescript
  let currentChannel = robotPu.channel();
  ```

#### setChannel(channel: number)
- **功能**：将信道设置为特定值（0..255）。setGroupId的别名。
- **参数**：
  - `channel`：目标信道值（0-255，默认166）
- **返回值**：无
- **代码示例**：
  ```typescript
  robotPu.setChannel(100);
  ```

#### changeChannel(delta: number)
- **功能**：通过增量更改信道（可以为负数）。调整无线组的别名。
- **参数**：
  - `delta`：信道增量值（默认1）
- **返回值**：无
- **代码示例**：
  ```typescript
  robotPu.changeChannel(2);
  ```

## 4. 内部函数

### ensureRobot(): RobotPu
- **功能**：确保Robot Pu实例已初始化
- **参数**：无
- **返回值**：RobotPu实例
- **描述**：
  - 如果Robot Pu实例不存在，则创建一个新实例并进行校准
  - 在后台启动一个任务，用于更新状态和执行行为逻辑
  - 使用5ms的暂停来维持200Hz的响应速度，确保机器人运动流畅

## 5. 使用示例

### 5.1 基本控制示例

```typescript
// 初始化机器人
robotPu.calibrate();

// 设置机器人模式为探索
robotPu.setMode(robotPu.Mode.Explore);

// 控制机器人行走
robotPu.walkDo(2, 0);
basic.pause(2000);

// 停止并休息
robotPu.restDo();
```

### 5.2 传感器使用示例

```typescript
// 获取声纳距离并根据距离做出反应
let distance = robotPu.sonarDistanceCm();
if (distance < 10) {
    robotPu.setMode(robotPu.Mode.Rest);
    robotPu.talk("I found an obstacle!");
} else {
    robotPu.walkDo(1, 0);
}
```

### 5.3 伺服电机控制示例

```typescript
// 控制机器人头部左右转动
for (let i = 0; i < 3; i++) {
    robotPu.servoStep(robotPu.ServoJoint.HeadYaw, 120, 5);
    basic.pause(1000);
    robotPu.servoStep(robotPu.ServoJoint.HeadYaw, 60, 5);
    basic.pause(1000);
}
// 回到中心位置
robotPu.servo(robotPu.ServoJoint.HeadYaw, 90);
```

## 6. API分组说明

| 分组 | 功能描述 | 包含函数 |
|------|----------|----------|
| Variables | 变量管理 | channel, setChannel, changeChannel |
| Setup | 机器人设置 | setServoTrim, calibrate, setWalkSpeedRange |
| Sensors | 传感器读取 | sonarDistanceCm |
| Actuators | 执行器控制 | servo, servoStep |
| Actions | 机器人动作 | greet, setMode, leftEyeBright, rightEyeBright, walk, walkDo, explore, exploreDo, sideStep, sideStepDo, dance, danceDo, kick, kickDo, jump, jumpDo, rest, restDo, stand, standDo, talk, sing |
| Remote Control | 远程控制 | runStringCommand, runKeyValueCommand |

## 7. 注意事项

1. 所有API函数都会自动调用`ensureRobot()`来确保机器人实例已初始化
2. 机器人在后台以200Hz的频率更新状态和执行行为逻辑
3. 使用`setMode()`设置的模式会保持较长时间（200000ms超时）
4. 伺服电机角度范围为0-180度，超出范围的值会被自动限制
5. 行走速度范围为-5到5，转向偏差范围为-1到1
6. 无线电信道范围为0-255

## 8. 版本信息

- 文档生成日期：2026-01-09
- 基于代码文件：main.ts（第1-386行）
- 适用平台：MakeCode

---

**文档结束**
