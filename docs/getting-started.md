# 快速开始

Taro UI Shadcn 是一个基于 Taro 的 UI 组件库，灵感来源于 shadcn/ui。它提供了一套现代化的 UI 组件，支持多端开发，并且可以通过 CLI 工具直接将组件代码复制到你的项目中。

## 特性

- 🚀 **基于 Taro 3.x** - 支持小程序、H5、React Native 等多端开发
- 📦 **按需使用** - 通过 CLI 工具直接复制组件源码到项目中
- 🎨 **现代化设计** - 基于 Tailwind CSS 的设计系统
- 🔧 **TypeScript 支持** - 完整的类型定义
- 🎯 **高度可定制** - 可以根据项目需求自由修改组件

## 安装

### 前置条件

确保你的项目是一个 Taro 项目，并且已经安装了以下依赖：

```json
{
  "dependencies": {
    "@tarojs/components": "^3.6.0",
    "@tarojs/taro": "^3.6.0",
    "react": "^18.0.0"
  }
}
```

### 初始化

在你的 Taro 项目根目录中运行：

```bash
npx taro-ui-shadcn init
```

这个命令会：

1. 创建配置文件 `taro-ui-shadcn.json`
2. 创建组件目录 `src/components/ui`
3. 创建工具函数 `src/utils/cn.ts` 和 `src/utils/cva.ts`
4. 如果选择使用 Tailwind CSS，会创建全局样式文件

### 配置 Tailwind CSS（推荐）

如果你还没有在项目中配置 Tailwind CSS，请按照以下步骤：

1. 安装 Tailwind CSS：

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. 配置 `tailwind.config.js`：

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}
```

3. 在你的主样式文件中引入 `globals.css`：

```tsx
// app.tsx
import './styles/globals.css'
```

## 添加组件

使用 CLI 工具添加你需要的组件：

```bash
# 添加按钮组件
npx taro-ui-shadcn add button

# 添加输入框组件
npx taro-ui-shadcn add input

# 添加卡片组件
npx taro-ui-shadcn add card
```

## 使用组件

添加组件后，你就可以在项目中使用它们了：

```tsx
import React from 'react'
import { View } from '@tarojs/components'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function Index() {
  return (
    <View className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>欢迎使用 Taro UI Shadcn</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="请输入内容" />
          <Button>提交</Button>
        </CardContent>
      </Card>
    </View>
  )
}
```

## 可用组件

目前支持的组件：

- [Button](./components/button.md) - 按钮组件
- [Input](./components/input.md) - 输入框组件
- [Card](./components/card.md) - 卡片组件
- [Badge](./components/badge.md) - 徽章组件
- [Avatar](./components/avatar.md) - 头像组件
- [Loading](./components/loading.md) - 加载组件

## 自定义组件

由于组件源码直接复制到你的项目中，你可以根据需要自由修改：

1. **修改样式** - 直接编辑组件文件中的 Tailwind 类名
2. **添加功能** - 在组件中添加新的 props 和逻辑
3. **调整行为** - 修改组件的默认行为以适应你的需求

## 配置文件

`taro-ui-shadcn.json` 配置文件选项：

```json
{
  "componentsPath": "src/components/ui",  // 组件安装路径
  "typescript": true,                     // 是否使用 TypeScript
  "tailwind": true                        // 是否使用 Tailwind CSS
}
```

## 常见问题

### 1. 样式不生效

确保你已经正确配置了 Tailwind CSS，并且在主应用中引入了全局样式文件。

### 2. 小程序兼容性

某些 CSS 属性在小程序中可能不被支持，你可能需要根据目标平台调整样式。

### 3. 类型错误

确保你的项目已经安装了 TypeScript 相关依赖，并且 `tsconfig.json` 配置正确。

## 下一步

- 查看[组件文档](./components/)了解每个组件的详细用法
- 查看[示例项目](../examples/)了解最佳实践
- 参与[贡献指南](./contributing.md)来帮助改进这个项目