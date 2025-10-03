import { type ClassValue, clsx } from 'clsx';

/**
 * 合并样式类名的工具函数
 * @param inputs 样式类名
 * @returns 合并后的类名字符串
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}