# Taro UI Shadcn 开发环境设置指南

## 🚀 快速开始

### 方法一：使用独立测试项目（推荐）

1. **创建测试项目**
```bash
# 创建新的 Taro 项目
npx @tarojs/cli init taro-ui-test --template react-ts

# 进入项目
cd taro-ui-test

# 安装依赖
npm install

# 安装 Tailwind CSS
npm install -D tailwindcss postcss autoprefixer @types/react @types/react-dom
npx tailwindcss init -p
```

2. **配置 Tailwind CSS**
```javascript
// tailwind.config.js
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
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
    },
  },
  plugins: [],
}
```

3. **本地开发链接**
```bash
# 在 UI 库项目中
cd /path/to/taro-ui-shadcn
npm run build
npm link

# 在测试项目中
cd /path/to/taro-ui-test
npm link taro-ui-shadcn

# 使用 CLI 添加组件
npx taro-ui-shadcn init
npx taro-ui-shadcn add button input card
```

4. **开发流程**
```bash
# 终端1：监听 UI 库变化
cd /path/to/taro-ui-shadcn
npm run dev

# 终端2：运行测试项目
cd /path/to/taro-ui-test
npm run dev:weapp  # 微信小程序
# 或
npm run dev:h5     # H5
```