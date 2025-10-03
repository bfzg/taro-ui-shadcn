# Input 输入框

用于用户输入的表单控件。

## 安装

```bash
npx taro-ui-shadcn add input
```

## 使用方法

```tsx
import { Input } from '@/components/ui/input'

export default function Example() {
  return <Input placeholder="请输入内容" />
}
```

## 示例

### 基础用法

```tsx
<Input placeholder="请输入内容" />
```

### 不同类型

```tsx
<Input type="text" placeholder="文本输入" />
<Input type="number" placeholder="数字输入" />
<Input type="password" placeholder="密码输入" />
```

### 禁用状态

```tsx
<Input disabled placeholder="禁用状态" />
```

### 最大长度限制

```tsx
<Input maxlength={10} placeholder="最多输入10个字符" />
```

### 受控组件

```tsx
import { useState } from 'react'

function ControlledInput() {
  const [value, setValue] = useState('')

  return (
    <Input
      value={value}
      placeholder="受控输入框"
      onInput={(e) => setValue(e.detail.value)}
    />
  )
}
```

### 事件处理

```tsx
<Input
  placeholder="输入框"
  onInput={(e) => console.log('输入:', e.detail.value)}
  onFocus={() => console.log('获得焦点')}
  onBlur={() => console.log('失去焦点')}
/>
```

## API

### InputProps

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| type | `'text' \| 'number' \| 'password' \| 'digit'` | `'text'` | 输入框类型 |
| placeholder | `string` | - | 占位符文本 |
| value | `string` | - | 输入框的值 |
| disabled | `boolean` | `false` | 是否禁用 |
| maxlength | `number` | - | 最大输入长度 |
| className | `string` | - | 自定义样式类名 |
| onInput | `(e: any) => void` | - | 输入事件处理器 |
| onFocus | `() => void` | - | 获得焦点事件处理器 |
| onBlur | `() => void` | - | 失去焦点事件处理器 |

## 样式定制

Input 组件的默认样式：

```tsx
const inputStyles = cn(
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
  "file:border-0 file:bg-transparent file:text-sm file:font-medium",
  "placeholder:text-muted-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  "disabled:cursor-not-allowed disabled:opacity-50",
  className
)
```

你可以通过 `className` 属性来覆盖或扩展默认样式。

## 表单集成

Input 组件可以很好地与表单库集成：

```tsx
import { useForm } from 'react-hook-form'

function FormExample() {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register('username')}
        placeholder="用户名"
      />
      <Input
        {...register('password')}
        type="password"
        placeholder="密码"
      />
      <Button type="submit">提交</Button>
    </form>
  )
}
```

## 注意事项

1. 在小程序环境中，某些输入类型可能不被支持
2. `onInput` 事件的参数结构可能因平台而异
3. 建议在使用前先测试在目标平台上的表现
4. 对于复杂的表单验证，建议使用专门的表单库