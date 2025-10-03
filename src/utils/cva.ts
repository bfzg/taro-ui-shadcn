import { type ClassValue } from 'clsx';
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
}