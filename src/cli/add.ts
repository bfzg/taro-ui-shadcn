import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

interface Config {
  componentsPath: string;
  typescript: boolean;
  tailwind: boolean;
}

const AVAILABLE_COMPONENTS = [
  'button',
  'input',
  'card',
  'badge',
  'avatar',
  'loading',
];

export async function add(component: string, options: { path?: string } = {}) {
  console.log(chalk.blue(`📦 添加组件: ${component}`));

  try {
    // 检查组件是否可用
    if (!AVAILABLE_COMPONENTS.includes(component)) {
      console.log(chalk.red(`❌ 组件 "${component}" 不可用`));
      console.log(chalk.blue('可用组件:'), AVAILABLE_COMPONENTS.join(', '));
      return;
    }

    // 读取配置文件
    const configPath = path.join(process.cwd(), 'taro-ui-shadcn.json');
    let config: Config;

    if (fs.existsSync(configPath)) {
      config = await fs.readJson(configPath);
    } else {
      console.log(chalk.yellow('⚠️  未找到配置文件，使用默认配置'));
      config = {
        componentsPath: 'src/components/ui',
        typescript: true,
        tailwind: true,
      };
    }

    // 使用命令行参数覆盖配置
    const targetPath = options.path || config.componentsPath;
    const componentDir = path.join(process.cwd(), targetPath, component);

    // 确保目录存在
    await fs.ensureDir(componentDir);

    // 获取组件模板
    const template = getComponentTemplate(component, config.typescript);
    
    if (!template) {
      console.log(chalk.red(`❌ 未找到组件 "${component}" 的模板`));
      return;
    }

    // 写入组件文件
    const fileExtension = config.typescript ? '.tsx' : '.jsx';
    const componentFile = path.join(componentDir, `index${fileExtension}`);
    const exportFile = path.join(componentDir, 'index.ts');

    await fs.writeFile(componentFile, template.component);
    
    // 只有当export内容不为空时才创建index.ts文件
    if (template.export.trim()) {
      await fs.writeFile(exportFile, template.export);
    }

    console.log(chalk.green(`✅ 组件 "${component}" 已添加到 ${targetPath}/${component}`));
    console.log(chalk.blue('📁 文件:'));
    console.log(chalk.gray(`  ${targetPath}/${component}/index${fileExtension}`));
    if (template.export.trim()) {
      console.log(chalk.gray(`  ${targetPath}/${component}/index.ts`));
    }

    console.log(chalk.blue('\n🚀 使用方法:'));
    console.log(chalk.gray(`  import { ${capitalize(component)} } from '@/components/ui/${component}';`));

  } catch (error) {
    console.error(chalk.red('❌ 添加组件失败:'), error);
  }
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getComponentTemplate(component: string, typescript: boolean) {
  const templates = {
    button: {
      component: `import React from 'react';
import { View } from '@tarojs/components';
import { cn } from '../../utils/cn';
import { cva } from '../../utils/cva';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

${typescript ? `
export interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
` : `
export const Button = ({
`}
  variant = 'default',
  size = 'default',
  className,
  disabled = false,
  loading = false,
  children,
  onClick,
  ...props
${typescript ? '}) => {' : '}) => {'}
  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  return (
    <View
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={handleClick}
      {...props}
    >
      {loading && (
        <View className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </View>
  );
};`,
      export: ``
    },

    input: {
      component: `import React from 'react';
import { Input as TaroInput } from '@tarojs/components';
import { cn } from '../../utils/cn';

${typescript ? `
export interface InputProps {
  type?: 'text' | 'number' | 'password' | 'digit';
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  maxlength?: number;
  className?: string;
  onInput?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const Input: React.FC<InputProps> = ({
` : `
export const Input = ({
`}
  type = 'text',
  placeholder,
  value,
  disabled = false,
  maxlength,
  className,
  onInput,
  onFocus,
  onBlur,
  ...props
${typescript ? '}) => {' : '}) => {'}
  const handleInput = (e) => {
    if (onInput) {
      onInput(e.detail.value);
    }
  };

  return (
    <TaroInput
      type={type}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      maxlength={maxlength}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      onInput={handleInput}
      onFocus={onFocus}
      onBlur={onBlur}
      {...props}
    />
  );
};`,
      export: ``
    },

    card: {
      component: `import React from 'react';
import { View, Text } from '@tarojs/components';
import { cn } from '../../utils/cn';

${typescript ? `
export interface CardProps {
  className?: string;
  children?: React.ReactNode;
}

export interface CardHeaderProps {
  className?: string;
  children?: React.ReactNode;
}

export interface CardTitleProps {
  className?: string;
  children?: React.ReactNode;
}

export interface CardDescriptionProps {
  className?: string;
  children?: React.ReactNode;
}

export interface CardContentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface CardFooterProps {
  className?: string;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ className, children, ...props }) => (
` : `
export const Card = ({ className, children, ...props }) => (
`}
  <View
    className={cn(
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      className
    )}
    {...props}
  >
    {children}
  </View>
);

${typescript ? `export const CardHeader: React.FC<CardHeaderProps> = ({ className, children, ...props }) => (` : `export const CardHeader = ({ className, children, ...props }) => (`}
  <View className={cn('flex flex-col space-y-1.5 p-6', className)} {...props}>
    {children}
  </View>
);

${typescript ? `export const CardTitle: React.FC<CardTitleProps> = ({ className, children, ...props }) => (` : `export const CardTitle = ({ className, children, ...props }) => (`}
  <Text
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  >
    {children}
  </Text>
);

${typescript ? `export const CardDescription: React.FC<CardDescriptionProps> = ({ className, children, ...props }) => (` : `export const CardDescription = ({ className, children, ...props }) => (`}
  <Text className={cn('text-sm text-muted-foreground', className)} {...props}>
    {children}
  </Text>
);

${typescript ? `export const CardContent: React.FC<CardContentProps> = ({ className, children, ...props }) => (` : `export const CardContent = ({ className, children, ...props }) => (`}
  <View className={cn('p-6 pt-0', className)} {...props}>
    {children}
  </View>
);

${typescript ? `export const CardFooter: React.FC<CardFooterProps> = ({ className, children, ...props }) => (` : `export const CardFooter = ({ className, children, ...props }) => (`}
  <View className={cn('flex items-center p-6 pt-0', className)} {...props}>
    {children}
  </View>
);`,
      export: `export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './index';

${typescript ? `export type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
} from './index';` : ''}`
    },

    badge: {
      component: `import React from 'react';
import { View } from '@tarojs/components';
import { cn } from '../../utils/cn';
import { cva } from '../../utils/cva';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

${typescript ? `
export interface BadgeProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
  children?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
` : `
export const Badge = ({
`}
  variant = 'default',
  className,
  children,
  ...props
${typescript ? '}) => {' : '}) => {'}
  return (
    <View className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </View>
  );
};`,
      export: ``
    },

    avatar: {
      component: `import React from 'react';
import { View, Image, Text } from '@tarojs/components';
import { cn } from '../../utils/cn';

${typescript ? `
export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
` : ''}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
};

${typescript ? `export const Avatar: React.FC<AvatarProps> = ({` : `export const Avatar = ({`}
  src,
  alt,
  fallback,
  size = 'md',
  className,
  ...props
${typescript ? '}) => {' : '}) => {'}
  const [imageError, setImageError] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <View
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {src && !imageError ? (
        <Image
          className="aspect-square h-full w-full"
          src={src}
          alt={alt}
          onError={handleImageError}
        />
      ) : (
        <View className="flex h-full w-full items-center justify-center rounded-full bg-muted">
          <Text className="font-medium text-muted-foreground">
            {fallback || alt?.charAt(0)?.toUpperCase() || '?'}
          </Text>
        </View>
      )}
    </View>
  );
};`,
      export: ``
    },

    loading: {
      component: `import React from 'react';
import { View } from '@tarojs/components';
import { cn } from '../../utils/cn';

${typescript ? `
export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
` : ''}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
};

${typescript ? `export const Loading: React.FC<LoadingProps> = ({` : `export const Loading = ({`}
  size = 'md',
  className,
  ...props
${typescript ? '}) => {' : '}) => {'}
  return (
    <View
      className={cn(
        'animate-spin rounded-full border-2 border-current border-t-transparent',
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
};`,
      export: ``
    },
  };

  return templates[component] || null;
}