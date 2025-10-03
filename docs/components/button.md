# Button 按钮

用于触发操作的按钮组件。

## 安装

```bash
npx taro-ui-shadcn add button
```

## 使用方法

```tsx
import { Button } from '@/components/ui/button'

export default function Example() {
  return <Button>点击我</Button>
}
```

## 示例

### 基础用法

```tsx
<Button>默认按钮</Button>
```

### 不同变体

```tsx
<Button variant="default">默认按钮</Button>
<Button variant="secondary">次要按钮</Button>
<Button variant="destructive">危险按钮</Button>
<Button variant="outline">轮廓按钮</Button>
<Button variant="ghost">幽灵按钮</Button>
<Button variant="link">链接按钮</Button>
```

### 不同尺寸

```tsx
<Button size="sm">小按钮</Button>
<Button size="default">默认按钮</Button>
<Button size="lg">大按钮</Button>
<Button size="icon">图标按钮</Button>
```

### 禁用状态

```tsx
<Button disabled>禁用按钮</Button>
```

### 加载状态

```tsx
<Button loading>加载中...</Button>
```

### 点击事件

```tsx
<Button onClick={() => console.log('按钮被点击')}>
  点击我
</Button>
```

## API

### ButtonProps

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| variant | `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link'` | `'default'` | 按钮变体 |
| size | `'default' \| 'sm' \| 'lg' \| 'icon'` | `'default'` | 按钮尺寸 |
| disabled | `boolean` | `false` | 是否禁用 |
| loading | `boolean` | `false` | 是否显示加载状态 |
| className | `string` | - | 自定义样式类名 |
| onClick | `() => void` | - | 点击事件处理器 |
| children | `React.ReactNode` | - | 按钮内容 |

## 样式定制

Button 组件使用 `cva` (class-variance-authority) 来管理样式变体。你可以通过修改 `buttonVariants` 来自定义样式：

```tsx
const buttonVariants = cva(
  // 基础样式
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        // 添加更多变体...
      },
      size: {
        default: "h-10 py-2 px-4",
        // 添加更多尺寸...
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

## 注意事项

1. 在小程序环境中，某些 CSS 属性可能不被支持，请根据实际情况调整样式
2. 加载状态下按钮会自动禁用点击事件
3. 建议在使用前先测试在目标平台上的表现