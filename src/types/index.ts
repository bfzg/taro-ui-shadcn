import { ReactNode } from 'react';

// 基础组件属性类型
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

// 尺寸类型
export type Size = 'sm' | 'md' | 'lg';

// 变体类型
export type Variant = 'default' | 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';

// 颜色类型
export type Color = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

// 位置类型
export type Position = 'top' | 'bottom' | 'left' | 'right';

// 对齐类型
export type Alignment = 'start' | 'center' | 'end';

// 方向类型
export type Direction = 'horizontal' | 'vertical';

// 事件处理器类型
export interface EventHandlers {
  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onInput?: (value: string) => void;
  onChange?: (value: any) => void;
}

// 表单控件属性
export interface FormControlProps extends BaseComponentProps, EventHandlers {
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  value?: string | number;
  name?: string;
  id?: string;
}

// 加载状态属性
export interface LoadingProps {
  loading?: boolean;
  loadingText?: string;
}

// 图标属性
export interface IconProps {
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

// 响应式属性
export interface ResponsiveProps {
  xs?: any;
  sm?: any;
  md?: any;
  lg?: any;
  xl?: any;
}

// 主题相关类型
export interface ThemeColors {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  background: string;
  foreground: string;
  muted: string;
  border: string;
}

export interface Theme {
  colors: ThemeColors;
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
  fontSize: Record<string, string>;
  fontWeight: Record<string, string>;
  shadows: Record<string, string>;
}

// 组件配置类型
export interface ComponentConfig {
  prefix?: string;
  theme?: Partial<Theme>;
  defaultProps?: Record<string, any>;
}