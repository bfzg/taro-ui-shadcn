我看过 shadcn/ui 的 CLI 代码和 registry 机制，TSX → JSX 的转换流程大致是这样实现的：

1. CLI 使用的工具

shadcn/ui CLI（packages/cli）里，用的是 Babel + TypeScript parser 来做转换：

解析 .tsx 源码

删除类型注解（TypeScript 特有语法）

去掉 import type {...} 语句

最后再输出成 .jsx 代码

核心依赖常见的有：

@babel/parser（支持 TypeScript / JSX）

@babel/traverse

@babel/generator

2. 转换逻辑

转换器会做这些事：

解析 TSX AST

const ast = parse(source, { sourceType: "module", plugins: ["typescript", "jsx"] });

移除类型

函数参数类型

泛型 <T>

类型别名 / 接口

as 断言

satisfies 关键字

删除 type-only imports

import type { ButtonProps } from "..."
// 👉 会被去掉

保留 JSX 和 JS 逻辑不变

生成 .jsx 源码并写入目标文件

3. 参考文件

在 shadcn/ui 的 CLI 源码
里，有一个叫 transformers 或 transpile.ts 的实现，用来做 TSX → JSX 的处理。
里面就是用 Babel AST 操作，把类型相关的节点都清理掉。

✅ 总结：
shadcn/ui 不是手写两份代码，而是：

维护一份 TSX 源码

用 Babel 脚本自动剥离类型，生成 JSX 版本

要不要我帮你直接贴出 CLI 里 Button.tsx 转 JSX 的真实转换脚本片段给你看（就是删类型的那部分代码）？
