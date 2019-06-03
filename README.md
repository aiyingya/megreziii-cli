# megreziii-cli

> my brilliant SAO generator

## 快速开始

### From 终端

Install [megreziii-cli](https://github.com/aiyingya/megreziii-cli.git) first.

此操作下载模板为:https://github.com/aiyingya/cnymc.git

```bash
yarn global add sao
yarn global add megreziii-cli
# or
npm i -g sao
npm i -g megreziii-cli
# creat
megreziii-cli new-project
```

### From npm

Install [SAO](https://github.com/saojs/sao) first. 

此操作下载模板为:megreziii-cli项目中template目录下的项目

```bash
yarn global add sao
# or
npm i -g sao
```

```bash
# creat
sao npm:megreziii-cli@0.0.1 new-project
注意：需要指定版本如：@0.0.1/@latest（貌似sao下载不是最后一个版本）
```

#### 询问列表

| 字段        | 输入方式 | 可选值               | 意义           |
| ----------- | -------- | -------------------- | -------------- |
| name        | input    | 默认为文件夹名       | 项目名称       |
| description | input    | 默认为my xxx project | 项目简介       |
| username    | input    | 默认为gituser        | 用户名（作者） |
| email       | input    | 默认为gitemail       | 用户邮箱       |

### From Local

此操作下载模板为:megreziii-cli项目中template目录下的项目

```bash
注意：只做参考,不建议下载在本地使用
cd//megreziii-cli 目录
# creat
sao ../megreziii-cli new-project
```

### From Git

此操作下载模板为:megreziii-cli项目中template目录下的项目

```bash
# creat
sao xxx/megreziii-cli new-project
```

## License

MIT &copy; [aiyingya](github.com/aiyingya)


