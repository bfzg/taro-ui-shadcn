import { ReactNode } from 'react';
import { BaseComponentProps, Size, Variant, FormControlProps, IconProps } from './index';

// Button 组件类型
export interface ButtonProps extends BaseComponentProps, IconProps {
  loading?: boolean;
  loadingText?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

// Input 组件类型
export interface InputProps extends FormControlProps {
  type?: 'text' | 'number' | 'password' | 'digit' | 'email' | 'tel' | 'url';
  maxlength?: number;
  minlength?: number;
  readonly?: boolean;
  autoFocus?: boolean;
  clearable?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
}

// Card 组件类型
export interface CardProps extends BaseComponentProps {
  hoverable?: boolean;
  bordered?: boolean;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export interface CardHeaderProps extends BaseComponentProps {}
export interface CardTitleProps extends BaseComponentProps {}
export interface CardDescriptionProps extends BaseComponentProps {}
export interface CardContentProps extends BaseComponentProps {}
export interface CardFooterProps extends BaseComponentProps {}

// Badge 组件类型
export interface BadgeProps extends BaseComponentProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  size?: Size;
  dot?: boolean;
  count?: number;
  showZero?: boolean;
  overflowCount?: number;
}

// Avatar 组件类型
export interface AvatarProps extends BaseComponentProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: Size | number;
  shape?: 'circle' | 'square';
  onError?: () => void;
}

// Loading 组件类型
export interface LoadingProps extends BaseComponentProps {
  size?: Size;
  spinning?: boolean;
  tip?: string;
  delay?: number;
}

// Dialog 组件类型
export interface DialogProps extends BaseComponentProps {
  open?: boolean;
  title?: ReactNode;
  description?: ReactNode;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
}

export interface DialogTriggerProps extends BaseComponentProps {
  asChild?: boolean;
}

export interface DialogContentProps extends BaseComponentProps {
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  onPointerDownOutside?: (event: PointerEvent) => void;
}

export interface DialogHeaderProps extends BaseComponentProps {}
export interface DialogFooterProps extends BaseComponentProps {}
export interface DialogTitleProps extends BaseComponentProps {}
export interface DialogDescriptionProps extends BaseComponentProps {}

// Toast 组件类型
export interface ToastProps extends BaseComponentProps {
  variant?: 'default' | 'destructive';
  duration?: number;
  onOpenChange?: (open: boolean) => void;
}

export interface ToastActionProps extends BaseComponentProps {
  altText: string;
  onClick?: () => void;
}

export interface ToastTitleProps extends BaseComponentProps {}
export interface ToastDescriptionProps extends BaseComponentProps {}

// Select 组件类型
export interface SelectProps extends BaseComponentProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export interface SelectTriggerProps extends BaseComponentProps {}
export interface SelectContentProps extends BaseComponentProps {}
export interface SelectItemProps extends BaseComponentProps {
  value: string;
  disabled?: boolean;
}

export interface SelectLabelProps extends BaseComponentProps {}
export interface SelectSeparatorProps extends BaseComponentProps {}

// Switch 组件类型
export interface SwitchProps extends BaseComponentProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: Size;
}

// Checkbox 组件类型
export interface CheckboxProps extends BaseComponentProps {
  checked?: boolean | 'indeterminate';
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
}

// Radio 组件类型
export interface RadioGroupProps extends BaseComponentProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
}

export interface RadioGroupItemProps extends BaseComponentProps {
  value: string;
  disabled?: boolean;
  id?: string;
}