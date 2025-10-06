import React, { useState } from 'react';
import { View, Text, Picker } from '@tarojs/components';
import { cn } from '../../utils/cn';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  options: SelectOption[];
  onChange?: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({
  value,
  placeholder = '请选择',
  disabled = false,
  className,
  options,
  onChange,
  ...props
}) => {
  const [selectedIndex, setSelectedIndex] = useState(() => {
    const index = options.findIndex(option => option.value === value);
    return index >= 0 ? index : 0;
  });

  const handleChange = (e: any) => {
    const index = e.detail.value;
    setSelectedIndex(index);
    if (onChange && options[index]) {
      onChange(options[index].value);
    }
  };

  const selectedOption = options[selectedIndex];
  const displayValue = selectedOption ? selectedOption.label : placeholder;

  return (
    <Picker
      mode="selector"
      range={options.map(option => option.label)}
      value={selectedIndex}
      disabled={disabled}
      onChange={handleChange}
      className={cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm',
        'ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        !selectedOption && 'text-muted-foreground',
        className
      )}
      {...props}
    >
      <View className="flex items-center justify-between w-full">
        <Text className={cn(!selectedOption && 'text-muted-foreground')}>
          {displayValue}
        </Text>
        <Text className="text-xs opacity-50">▼</Text>
      </View>
    </Picker>
  );
};