import React from 'react';
import { View } from '@tarojs/components';
import { cn } from '../../utils/cn';

export interface RadioGroupProps {
  value?: string;
  className?: string;
  children?: React.ReactNode;
  onChange?: (value: string) => void;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  className,
  children,
  onChange,
  ...props
}) => {
  return (
    <View className={cn('grid gap-2', className)} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...child.props,
            checked: child.props.value === value,
            onChange: () => onChange?.(child.props.value),
          });
        }
        return child;
      })}
    </View>
  );
};

export interface RadioGroupItemProps {
  value: string;
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  onChange?: () => void;
}

export const RadioGroupItem: React.FC<RadioGroupItemProps> = ({
  value,
  checked = false,
  disabled = false,
  className,
  children,
  onChange,
  ...props
}) => {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange();
    }
  };

  return (
    <View className="flex items-center space-x-2" {...props}>
      <View
        className={cn(
          'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        onClick={handleClick}
      >
        {checked && (
          <View className="flex items-center justify-center h-full w-full">
            <View className="h-2.5 w-2.5 rounded-full bg-current" />
          </View>
        )}
      </View>
      {children}
    </View>
  );
};