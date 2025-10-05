# Taro UI Shadcn

一个基于 Taro 的现代化 UI 组件库，灵感来源于 [shadcn/ui](https://ui.shadcn.com/)。

## ✨ 特性

- 🚀 **多端支持** - 基于 Taro 4.x，支持小程序、H5、React Native 等多端开发
- 📦 **按需使用** - 通过 CLI 工具直接将组件源码复制到项目中，无需额外依赖
- 🎨 **现代化设计** - 基于 Tailwind CSS 的设计系统，美观且一致
- 🔧 **TypeScript 支持** - 完整的类型定义，提供更好的开发体验
- 🎯 **高度可定制** - 组件源码在你的项目中，可以根据需求自由修改
- 🔥 **开箱即用** - 预设了常用的组件变体和样式

## 📦 安装

```bash
npx taro-ui-shadcn init
```

## 🚀 快速开始

### 1. 初始化项目

在你的 Taro 项目根目录中运行：

```bash
npx taro-ui-shadcn init
```

将生成的 `/styles/global.css` 引入到你的入口文件中如 app.tsx 中：

```tsx
import './styles/global.css';
```

### 2. 添加组件

```bash
npx taro-ui-shadcn add button
npx taro-ui-shadcn add input
npx taro-ui-shadcn add card
```

### 3. 使用组件

```tsx
import React from "react";
import { View } from "@tarojs/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Index() {
  return (
    <View className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Hello Taro UI Shadcn</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="请输入内容" />
          <Button>提交</Button>
        </CardContent>
      </Card>
    </View>
  );
}
```

## 📚 组件

| 组件                                    | 描述                         | 状态 |
| --------------------------------------- | ---------------------------- | ---- |
| [Button](./docs/components/button.md)   | 按钮组件，支持多种变体和尺寸 | ✅   |
| [Input](./docs/components/input.md)     | 输入框组件                   | ✅   |
| [Card](./docs/components/card.md)       | 卡片组件及其子组件           | ✅   |
| [Badge](./docs/components/badge.md)     | 徽章组件                     | ✅   |
| [Avatar](./docs/components/avatar.md)   | 头像组件                     | ✅   |
| [Loading](./docs/components/loading.md) | 加载组件                     | ✅   |

## 🛠️ CLI 命令

### `init`

初始化 taro-ui-shadcn 配置：

```bash
npx taro-ui-shadcn init
```

选项：

- 选择组件安装路径

### `add`

添加组件到项目：

```bash
npx taro-ui-shadcn add [component]
```

可用组件：

- `button` - 按钮组件
- `input` - 输入框组件
- `card` - 卡片组件
- `badge` - 徽章组件
- `avatar` - 头像组件
- `loading` - 加载组件

## 📖 文档

- [快速开始](./docs/getting-started.md)
- [组件文档](./docs/components/)
- [使用示例](./examples/)

## 目录结构

```
taro-ui-shadcn/
├── bin/cli.js                 # CLI 入口
├── src/
│   ├── components/           # 组件源码
│   ├── cli/                 # CLI 工具
│   ├── types/               # 类型定义
│   ├── utils/               # 工具函数
│   └── index.ts             # 主入口
├── templates/               # 组件模板
├── docs/                    # 文档
├── scripts/                 # 脚本
├── examples/                # 使用示例
└── package.json
```

## 🎨 设计理念

Taro UI Shadcn 遵循以下设计理念：

1. **复制而非安装** - 将组件源码直接复制到你的项目中，而不是作为依赖安装
2. **可定制性优先** - 所有组件都可以根据项目需求进行修改
3. **现代化设计** - 基于 Tailwind CSS 的设计系统
4. **多端一致性** - 确保在不同平台上的一致体验

## 🔧 配置

项目配置文件 `taro-ui-shadcn.json`：

```json
{
  "componentsPath": "src/components/ui",
  "typescript": true,
  "tailwind": true
}
```

## 🤝 贡献

欢迎贡献代码！请查看 [贡献指南](./CONTRIBUTING.md) 了解更多信息。

### 开发

1. 克隆仓库：

```bash
git clone https://github.com/your-username/taro-ui-shadcn.git
cd taro-ui-shadcn
```

2. 安装依赖：

```bash
npm install
```

3. 构建项目：

```bash
npm run build
```

4. 测试 CLI：

```bash
npm link
taro-ui-shadcn --help
```

## 📄 许可证

MIT License - 查看 [LICENSE](./LICENSE) 文件了解更多信息。

## 🙏 致谢

- [shadcn/ui](https://ui.shadcn.com/) - 设计灵感来源
- [Taro](https://taro.aotu.io/) - 多端开发框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [class-variance-authority](https://github.com/joe-bell/cva) - 组件变体管理

## 📞 联系

如果你有任何问题或建议，请通过以下方式联系：

- 提交 [Issue](https://github.com/your-username/taro-ui-shadcn/issues)
- 发起 [Discussion](https://github.com/your-username/taro-ui-shadcn/discussions)

---

⭐ 如果这个项目对你有帮助，请给它一个 star！
