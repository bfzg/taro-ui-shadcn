# 贡献指南

感谢你对 Taro UI Shadcn 的关注！我们欢迎任何形式的贡献，包括但不限于：

- 🐛 报告 Bug
- 💡 提出新功能建议
- 📝 改进文档
- 🔧 提交代码修复
- ✨ 添加新组件

## 开发环境设置

### 前置要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 本地开发

1. **Fork 并克隆仓库**

```bash
git clone https://github.com/your-username/taro-ui-shadcn.git
cd taro-ui-shadcn
```

2. **安装依赖**

```bash
npm install
```

3. **构建项目**

```bash
npm run build
```

4. **链接到全局（用于测试 CLI）**

```bash
npm link
```

5. **测试 CLI 命令**

```bash
taro-ui-shadcn --help
```

## 项目结构

```
taro-ui-shadcn/
├── bin/                    # CLI 入口文件
├── src/                    # 源代码
│   ├── cli/               # CLI 相关代码
│   ├── components/        # 组件源码
│   ├── types/            # TypeScript 类型定义
│   └── utils/            # 工具函数
├── templates/             # 组件模板
├── docs/                 # 文档
├── examples/             # 使用示例
└── package.json
```

## 贡献流程

### 1. 报告 Bug

如果你发现了 Bug，请：

1. 检查 [Issues](https://github.com/your-username/taro-ui-shadcn/issues) 确认问题未被报告
2. 创建新的 Issue，包含：
   - 清晰的标题和描述
   - 重现步骤
   - 期望行为 vs 实际行为
   - 环境信息（Node.js 版本、Taro 版本等）
   - 如果可能，提供最小重现示例

### 2. 提出功能建议

1. 检查现有 Issues 确认功能未被建议
2. 创建新的 Issue，标记为 `enhancement`
3. 详细描述：
   - 功能的用途和价值
   - 期望的 API 设计
   - 可能的实现方案

### 3. 提交代码

#### 分支策略

- `main` - 主分支，包含稳定版本
- `develop` - 开发分支，包含最新功能
- `feature/*` - 功能分支
- `fix/*` - 修复分支

#### 提交流程

1. **创建分支**

```bash
git checkout -b feature/your-feature-name
# 或
git checkout -b fix/your-fix-name
```

2. **进行开发**

- 遵循现有代码风格
- 添加必要的测试
- 更新相关文档

3. **提交代码**

```bash
git add .
git commit -m "feat: add new component"
```

4. **推送分支**

```bash
git push origin feature/your-feature-name
```

5. **创建 Pull Request**

- 提供清晰的标题和描述
- 关联相关 Issues
- 确保 CI 检查通过

## 代码规范

### 命名约定

- **文件名**: 使用 kebab-case (`button.tsx`, `input.md`)
- **组件名**: 使用 PascalCase (`Button`, `Input`)
- **变量名**: 使用 camelCase (`buttonVariants`, `inputProps`)
- **常量**: 使用 UPPER_SNAKE_CASE (`DEFAULT_CONFIG`)

### TypeScript

- 所有组件必须有完整的类型定义
- 使用接口定义 Props
- 导出所有公共类型

```tsx
interface ButtonProps {
  variant?: 'default' | 'secondary' | 'outline'
  size?: 'sm' | 'default' | 'lg'
  disabled?: boolean
  children: React.ReactNode
}

export { Button, type ButtonProps }
```

### 组件开发

#### 组件结构

```tsx
import React from 'react'
import { View } from '@tarojs/components'
import { cn } from '@/utils/cn'
import { cva, type VariantProps } from '@/utils/cva'

// 1. 定义变体
const componentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "default-classes",
        secondary: "secondary-classes",
      },
      size: {
        sm: "small-classes",
        default: "default-classes",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// 2. 定义 Props 接口
interface ComponentProps extends VariantProps<typeof componentVariants> {
  className?: string
  children?: React.ReactNode
}

// 3. 组件实现
const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <View
        className={cn(componentVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </View>
    )
  }
)

Component.displayName = "Component"

export { Component, type ComponentProps }
```

#### 组件要求

1. **可访问性**: 遵循 ARIA 标准
2. **响应式**: 支持不同屏幕尺寸
3. **主题**: 支持深色/浅色主题
4. **多端兼容**: 确保在小程序、H5 等平台正常工作

### 文档

#### 组件文档结构

```markdown
# Component 组件名

简短描述

## 安装

\`\`\`bash
npx taro-ui-shadcn add component
\`\`\`

## 使用方法

基础用法示例

## 示例

各种使用场景的示例

## API

Props 表格

## 注意事项

平台兼容性说明
```

## 添加新组件

### 1. 创建组件

在 `src/components/` 目录下创建新组件：

```bash
mkdir src/components/new-component
touch src/components/new-component/index.tsx
touch src/components/new-component/index.ts
```

### 2. 创建模板

在 `templates/` 目录下创建对应模板：

```bash
mkdir templates/new-component
cp src/components/new-component/* templates/new-component/
```

### 3. 更新 CLI

在 `src/cli/add.ts` 中添加新组件：

```typescript
const AVAILABLE_COMPONENTS = [
  'button',
  'input',
  'card',
  'new-component', // 添加这里
]
```

### 4. 创建文档

```bash
touch docs/components/new-component.md
```

### 5. 更新导出

在 `src/index.ts` 中添加导出：

```typescript
export { NewComponent, type NewComponentProps } from './components/new-component'
```

## 测试

### 手动测试

1. 在测试项目中运行：

```bash
npx taro-ui-shadcn init
npx taro-ui-shadcn add your-component
```

2. 验证生成的代码是否正确
3. 测试组件在不同平台的表现

### 测试清单

- [ ] 组件在 H5 平台正常显示
- [ ] 组件在小程序平台正常显示
- [ ] TypeScript 类型检查通过
- [ ] 样式在不同主题下正常
- [ ] 响应式布局正常
- [ ] 可访问性符合标准

## 发布流程

1. 更新版本号
2. 更新 CHANGELOG.md
3. 创建 Release PR
4. 合并到 main 分支
5. 创建 Git Tag
6. 发布到 npm

## 社区

- [GitHub Issues](https://github.com/your-username/taro-ui-shadcn/issues) - 报告问题和建议
- [GitHub Discussions](https://github.com/your-username/taro-ui-shadcn/discussions) - 社区讨论

## 行为准则

请遵循我们的 [行为准则](./CODE_OF_CONDUCT.md)，营造友好的社区环境。

---

再次感谢你的贡献！🎉