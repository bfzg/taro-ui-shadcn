import React from 'react';
import { View, Text } from '@tarojs/components';
import { cn } from '../../utils/cn';

export interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  onChange?: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  disabled = false,
  className,
  children,
  onChange,
  ...props
}) => {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <View className="flex items-center space-x-2" {...props}>
      <View
        className={cn(
          'h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          checked && 'bg-primary text-primary-foreground',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        onClick={handleClick}
      >
        {checked && (
          <View className="flex items-center justify-center text-current h-full w-full">
            <Text className="text-xs">✓</Text>
          </View>
        )}
      </View>
      {children && (
        <Text className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {children}
        </Text>
      )}
    </View>
  );
};