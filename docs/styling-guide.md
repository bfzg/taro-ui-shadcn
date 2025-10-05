# 样式配置指南

## 🎨 Tailwind CSS 配置

### 1. 安装依赖

在你的 Taro 项目中安装 Tailwind CSS：

```bash
npm install -D tailwindcss postcss autoprefixer
```

### 2. 初始化项目

运行 CLI 初始化命令：

```bash
npx taro-ui-shadcn init
```

这将自动创建：
- `src/styles/globals.css` - 全局样式和 CSS 变量
- `tailwind.config.js` - Tailwind 配置文件（如果不存在）
- `taro-ui-shadcn.json` - 组件库配置文件

### 3. 引入全局样式

在你的应用入口文件（通常是 `src/app.tsx`）中引入全局样式：

```tsx
import './styles/globals.css'

// 你的应用代码
export default function App() {
  return (
    // ...
  )
}
```

### 4. 配置 PostCSS

确保你的 `postcss.config.js` 包含 Tailwind：

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## 🌈 颜色系统

### CSS 变量

我们使用 CSS 变量来定义颜色，支持亮色和暗色主题：

```css
:root {
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  --secondary: 240 4.8% 95.9%;
  --secondary-foreground: 240 5.9% 10%;
  /* ... 更多变量 */
}

.dark {
  --primary: 0 0% 98%;
  --primary-foreground: 240 5.9% 10%;
  /* ... 暗色主题变量 */
}
```

### Tailwind 颜色映射

在 `tailwind.config.js` 中，我们将 CSS 变量映射到 Tailwind 颜色：

```javascript
colors: {
  primary: {
    DEFAULT: "hsl(var(--primary))",
    foreground: "hsl(var(--primary-foreground))",
  },
  // ... 其他颜色
}
```

### 使用颜色

在组件中使用颜色：

```tsx
<View className="bg-primary text-primary-foreground">
  主要按钮
</View>

<View className="bg-secondary text-secondary-foreground">
  次要按钮
</View>
```

## 🌙 暗色主题

### 启用暗色主题

在根元素上添加 `dark` 类：

```tsx
// 在 app.tsx 或根组件中
<View className="dark">
  {/* 你的应用内容 */}
</View>
```

### 动态切换主题

```tsx
import { useState } from 'react'
import { View } from '@tarojs/components'

export default function App() {
  const [isDark, setIsDark] = useState(false)

  return (
    <View className={isDark ? 'dark' : ''}>
      <Button onClick={() => setIsDark(!isDark)}>
        切换主题
      </Button>
      {/* 你的应用内容 */}
    </View>
  )
}
```

## 🎯 组件样式

### 按钮组件示例

```tsx
import { Button } from '@/components/ui/button'

// 不同变体的按钮
<Button variant="default">默认按钮</Button>
<Button variant="secondary">次要按钮</Button>
<Button variant="destructive">危险按钮</Button>
<Button variant="outline">轮廓按钮</Button>
<Button variant="ghost">幽灵按钮</Button>
<Button variant="link">链接按钮</Button>

// 不同尺寸的按钮
<Button size="sm">小按钮</Button>
<Button size="default">默认按钮</Button>
<Button size="lg">大按钮</Button>
```

### 卡片组件示例

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>卡片标题</CardTitle>
  </CardHeader>
  <CardContent>
    卡片内容
  </CardContent>
</Card>
```

## 🔧 自定义样式

### 修改颜色变量

你可以在 `src/styles/globals.css` 中修改颜色变量：

```css
:root {
  /* 自定义主色调 */
  --primary: 220 100% 50%; /* 蓝色 */
  --primary-foreground: 0 0% 100%;
  
  /* 自定义次要色调 */
  --secondary: 120 100% 50%; /* 绿色 */
  --secondary-foreground: 0 0% 0%;
}
```

### 添加新的颜色

1. 在 `globals.css` 中添加 CSS 变量：

```css
:root {
  --success: 120 100% 40%;
  --success-foreground: 0 0% 100%;
}
```

2. 在 `tailwind.config.js` 中映射颜色：

```javascript
colors: {
  // ... 现有颜色
  success: {
    DEFAULT: "hsl(var(--success))",
    foreground: "hsl(var(--success-foreground))",
  },
}
```

3. 在组件中使用：

```tsx
<View className="bg-success text-success-foreground">
  成功消息
</View>
```

## 📱 多端适配

### 小程序适配

在小程序中，某些 CSS 特性可能不支持，建议：

1. 避免使用复杂的 CSS 选择器
2. 使用基础的 Flexbox 布局
3. 测试在不同小程序平台的兼容性

### H5 适配

H5 端支持完整的 CSS 特性，可以使用所有样式功能。

## 🐛 常见问题

### Q: 颜色不生效？

A: 检查以下几点：
1. 确保引入了 `globals.css`
2. 确保 Tailwind CSS 正确配置
3. 检查 CSS 变量是否正确定义

### Q: 暗色主题不工作？

A: 确保在根元素上正确添加了 `dark` 类。

### Q: 自定义颜色不显示？

A: 确保同时在 `globals.css` 和 `tailwind.config.js` 中配置了颜色。