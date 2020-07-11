# 属性动画

### Animation

- 在 assets 文件夹下新建 animClip 文件夹 - 新建 AnimationClip 文件
- 选中需要做动画的根组件，添加 Animation 组件 绑定刚刚创建的 Clip 文件
- 在编辑器下方点击动画编辑器，开始动画的显示编辑

### clip 文件的参数

- sample：定义当前动画数据每秒的帧率，默认为 60，这个参数会影响时间轴上每两个整数秒刻度之间的帧数量（也就是两秒之内有多少格）。
- speed：当前动画的播放速度，默认为 1
- duration：当动画播放速度为 1 的时候，动画的持续时间
- real time：动画从开始播放到结束，真正持续的时间
- wrap mode：循环模式

### 时间轴的刻度单位表示方式

- 时间轴上刻度的表示法是 01-05。该数值由两部分组成，冒号前面的是表示当前秒数，冒号后面的表示在当前这一秒里的第几帧。
- 01-05 表示该刻度在时间轴上位于从动画开始经过了 1 秒又 5 帧的时间。

### 程序控制动画显示

- 获取动画的 node

```js
properties: {
    login_bg: cc.Node
},
onLoad() {
    this.login_bg = this.login_bg.getComponent(cc.Animation); // 获取动画
    this.login_bg.node.active = false; // 通过当前Animation 获取node，设置显示隐藏
},
onClickScaleShow() {
    this.login_bg.node.active = true;
    this.login_bg.play("Scale ToShow"); // Scale ToShow 为动画的名字
    // https://docs.cocos.com/creator/api/zh/classes/Animation.html#play
    // https://docs.cocos.com/creator/manual/zh/animation/scripting-animation.html
},
```

### 跨工程使用动画文件

- 只需要把 animClip 文件夹复制到其他的工程文件
- 绑定好对应的 clip，执行 js 脚本

# 序列帧动画

### 系统内置事件

```js
// 使用事件名来注册
this.node.on(
  "touchstart",
  function (event) {
    let pos = event.getLocation(); // 获取的是世界的坐标
    // 世界坐标系，转换为本地坐标系
    pos = this.node.convertToNodeSpaceAR(pos);
    console.log(pos.x, pos.y);
    let start = this.monster.getPosition();
    let rot = this.getAngle(start, pos);
    this.monster.angle = -rot;
  },
  this
);
```

- convertToNodeSpaceAR 将一个局部的转换为世界坐标
- convertToWorldSpaceAR 将世界的转换为局部坐标

```js
// 三角函数的换算
getAngle:function(start,end){
    //两点的x、y值
    var x = end.x - start.x;
    var y = end.y - start.y;
    var hypotenuse = Math.sqrt(x * x + y * y);
    //斜边长度
    var cos = x / hypotenuse;
    var radian = Math.acos(cos);
    //求出弧度
    var angle = 180 /(Math.PI / radian);
    //用弧度算出角度
    if (y < 0) {
        angle =  0-angle;
    }
    else if (y == 0 && x < 0) {
        angle = 180;
    }
    return 90-angle;
},
```

- getClips 获取所有的 Animation

```js
getDirection(start, end) { // 获取前进的方向
    let rot = this.getAngle(start, end)
    if (rot > -45 && rot <= 45) {
        return 0;
    } else if (rot > 45 && rot <= 135) {
        return 3;
    } else if (rot > 135 && rot <= 225) {
        return 1;
    } else {
        return 2;
    }
},
// 下标对应编辑器中得位置是 上下左右
```

### runAction

```js
let pos = event.getLocation(); // 获取的是世界的坐标
pos = this.node.convertToNodeSpaceAR(pos); // 世界坐标系，转换为本地坐标系
// 创建一个移动动作 moveTo 移动到目标位置
let action = cc.moveTo(2, pos);
// 执行动作
this.monster.node.runAction(action);
```

### Action 所有动作类型的基类。 sequence 队列

[https://docs.cocos.com/creator/manual/zh/scripting/action-list.html](https://docs.cocos.com/creator/manual/zh/scripting/action-list.html)

- sequence 顺序执行动作，创建的动作将按顺序依次运行。
- spawn 同步执行动作，同步执行一组动作
- moveTo 移动到目标位置。
- moveBy 移动指定的距离。 相对于
- scaleTo 将节点大小缩放到指定的倍数
- callFunc 执行回调函数
-
