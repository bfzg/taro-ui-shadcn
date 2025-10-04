import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';

export async function init() {
  console.log(chalk.blue('🚀 初始化 Taro UI Shadcn...'));

  try {
    // 检查是否在Taro项目中
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      console.log(chalk.red('❌ 未找到 package.json 文件，请确保在项目根目录中运行此命令'));
      return;
    }

    const packageJson = await fs.readJson(packageJsonPath);
    const isTaroProject = packageJson.dependencies?.['@tarojs/taro'] || 
                         packageJson.devDependencies?.['@tarojs/taro'];

    if (!isTaroProject) {
      console.log(chalk.yellow('⚠️  警告：未检测到 Taro 依赖，请确保这是一个 Taro 项目'));
    }

    // 询问用户配置
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'componentsPath',
        message: '组件安装路径:',
        default: 'src/components/ui',
      },
    ]);

    // 创建配置文件 - 默认使用 TypeScript 和 Tailwind CSS
    const config = {
      componentsPath: answers.componentsPath,
      typescript: true,
      tailwind: true,
    };

    await fs.writeJson(path.join(process.cwd(), 'taro-ui-shadcn.json'), config, { spaces: 2 });

    // 创建组件目录
    const componentsDir = path.join(process.cwd(), answers.componentsPath);
    await fs.ensureDir(componentsDir);

    // 创建工具函数目录和文件
    const utilsDir = path.join(process.cwd(), 'src/utils');
    await fs.ensureDir(utilsDir);

    // 复制工具函数
    const cnUtilContent = `import { type ClassValue, clsx } from 'clsx';

/**
 * 合并样式类名的工具函数
 * @param inputs 样式类名
 * @returns 合并后的类名字符串
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}`;

    const cvaUtilContent = `import { type ClassValue } from 'clsx';
import { cn } from './cn';

type ConfigVariants<T = {}> = {
  [Variant in keyof T]: {
    [Key in keyof T[Variant]]: ClassValue;
  };
};

type ConfigSchema = Record<string, Record<string, ClassValue>>;

type Props<T> = T extends ConfigSchema
  ? {
      [Variant in keyof T]?: keyof T[Variant] | null;
    }
  : {};

/**
 * 创建组件变体的工具函数
 * @param base 基础样式类名
 * @param config 变体配置
 * @returns 变体函数
 */
export function cva<T extends ConfigSchema>(
  base: ClassValue,
  config?: {
    variants?: ConfigVariants<T>;
    defaultVariants?: Props<T>;
  }
) {
  return (props?: Props<T> & { className?: ClassValue }) => {
    if (!config?.variants) {
      return cn(base, props?.className);
    }

    const { variants, defaultVariants } = config;
    const getVariantClassNames = Object.keys(variants).map((variant: keyof T) => {
      const variantProp = props?.[variant as keyof Props<T>];
      const defaultVariantProp = defaultVariants?.[variant as keyof Props<T>];

      if (variantProp === null) return null;

      const variantKey = (variantProp || defaultVariantProp) as keyof T[typeof variant];

      return variants[variant][variantKey];
    });

    return cn(base, getVariantClassNames, props?.className);
  };
}`;

    // 总是使用 TypeScript
    await fs.writeFile(path.join(utilsDir, 'cn.ts'), cnUtilContent);
    await fs.writeFile(path.join(utilsDir, 'cva.ts'), cvaUtilContent);

    // 总是创建 Tailwind CSS 基础样式文件
      const stylesDir = path.join(process.cwd(), 'src/styles');
      await fs.ensureDir(stylesDir);

      const globalCssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}`;

      await fs.writeFile(path.join(stylesDir, 'globals.css'), globalCssContent);

    console.log(chalk.green('✅ 初始化完成！'));
    console.log(chalk.blue('📁 组件将安装到:'), answers.componentsPath);
    console.log(chalk.blue('🔧 配置文件已创建:'), 'taro-ui-shadcn.json');
    console.log(chalk.blue('🎨 全局样式文件已创建:'), 'src/styles/globals.css');
    console.log(chalk.yellow('💡 请确保在你的应用中引入 globals.css 文件'));

    console.log(chalk.blue('\n🚀 现在你可以添加组件了:'));
    console.log(chalk.gray('  npx taro-ui-shadcn add button'));
    console.log(chalk.gray('  npx taro-ui-shadcn add input'));
    console.log(chalk.gray('  npx taro-ui-shadcn add card'));

  } catch (error) {
    console.error(chalk.red('❌ 初始化失败:'), error);
  }
}