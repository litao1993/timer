# timer

> 精确计时工具

计时是业务中常见的需求，由于 javaScript 单线程特性，定时器的执行时机是不能保证的。我们采用对照本地时间的方法，实现了精确计时。

## 特性

- typescript 支持
- 精确计时，没有延迟
- 毫秒级计时
- 开始，暂停，继续，复位
- 倒计时和正计时
- 无终点计时

## 使用

- 安装

```
npm install timer-precise
```

- 使用

```
import Timer form 'timer-precise';

const timer = new Timer({
  duration: 60000,
  interval: 500,
  callback(time) {
    console.log(time);
  }
});

timer.start()

```

- 参数 Object

  | key      | 类型     | 说明                                             | 默认值     | 必填 |
  | :------- | :------- | :----------------------------------------------- | :--------- | :--- |
  | duration | number   | 计时时长，如果为 0，则计时不会停止，直到手动停止 | 0 (毫秒)   | 否   |
  | interval | number   | 计时频率                                         | 1000(毫秒) | 否   |
  | callback | function | 计时回调，每 interval 毫秒调用一次               | ()=>{}     | 否   |

- callback 参数 Object

  | key      | 类型   | 说明                                                   |
  | :------- | :----- | :----------------------------------------------------- |
  | before   | object | 已经过去的时间，例如 {d: 0, h: 2, m: 0, s: 1, ms: 300} |
  | after    | object | 剩余时间，例如{d: 1, h: 0, m: 2, s: 1, ms: 0}          |
  | msBefore | number | 已经过去的时间（毫秒数）                               |
  | msAfter  | number | 剩余时间（毫秒数）                                     |

- 实例方法

  | 方法  | 说明                                 |
  | :---- | :----------------------------------- |
  | start | 开始（继续）                         |
  | stop  | 暂停                                 |
  | reset | 复位（销毁），应用卸载时应调用此方法 |
