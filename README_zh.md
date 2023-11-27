# eight-characters 八字

eight-characters 是一个基于 JavaScript 的库，它能够帮助你计算和分析个人的八字，即出生年月日时的天干地支。这是中国传统文化中用于占卜命理的一种方法。此库适用于任何需要在程序中集成八字计算功能的场景。

## 安装

通过 yarn 安装 eight-characters：

```bash
yarn add eight-characters
# 或者使用 npm：
npm install eight-characters
```

## 使用方法

首先，导入 EightCharacters 类：

```js
import { EightCharacters } from "eight-characters";

// 然后，创建一个 EightCharacters 实例，输入出生的年、月、日、时（24小时制）、性别（0为女，1为男）：

const myEightCharacters = new EightCharacters(1990, 1, 1, 12, 1);
接下来，你可以使用 bazi 方法来获取八字信息：

console.log(myEightCharacters.bazi());

```

## API 参考

```js
new EightCharacters(year: number, month: number, day: number, hour: number, gender: number): //构造函数，用于创建包含八字信息的实例。

bazi(): //此方法返回一个包含八字信息的字符串。
```

## 贡献

如果你有任何问题或提议，欢迎提交 issue 或 pull request。

## 许可

此项目采用 [MIT](./LICENSE) 许可证。