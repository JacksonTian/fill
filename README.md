fill
====

Fill the missed item

在前端的数据操作中，往往需要规则的数据。但很多情况下只能拿到服务端返回的残缺的数据。这对于服务端来说，非常正常，因为默认值为0的数据，服务端往往不存储。比如我们需要通过折线图来显示24小时的数据变化，很明显以下数据缺少很多默认值。

```
[
  // 时间，数值
  ['0', 2],
  ['1', 3],
  ['3', 2],
  ['4', 1],
  ['6', 3],
  ['8', 1],
  ['10', 3],
  ['12', 1],
  ['13', 1],
  ['15', 3],
  ['16', 2],
  ['17', 1],
  ['19', 3],
  ['20', 2],
  ['23', 1],
]
```
设计fill的目标是为了解决类似情况下数据缺失的问题。

```
var arr = [
  ['星期一', 1],
  ['星期三', 7],
  ['星期四', 5],
  ['星期日', 1],
];
var condition = [
  {key: 0, full: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']}
];

console.log(fill(arr, condition, 1, 0));
// 下面是输出
// [
//   ['星期一', 1],
//   ['星期二', 0],
//   ['星期三', 7],
//   ['星期四', 5],
//   ['星期五', 0],
//   ['星期六', 0],
//   ['星期日', 1],
// ]
```

## Usage
通过标签嵌入进页面即可使用：

```
<script type="text/javascript" src="path/to/fill.js"></script>
```

## License
The MIT License

