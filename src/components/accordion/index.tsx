import React, { useState, createContext, useContext } from 'react';
import { View, Text } from '@tarojs/components';
import { cn } from '../../utils/cn';

interface AccordionContextType {
  type: 'single' | 'multiple';
  value: string | string[];
  onValueChange: (value: string | string[]) => void;
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

export interface AccordionProps {
  type: 'single' | 'multiple';
  value?: string | string[];
  defaultValue?: string | string[];
  className?: string;
  children?: React.ReactNode;
  onValueChange?: (value: string | string[]) => void;
}

export const Accordion: React.FC<AccordionProps> = ({
  type,
  value: controlledValue,
  defaultValue,
  className,
  children,
  onValueChange,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || (type === 'multiple' ? [] : ''));
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleValueChange = (newValue: string | string[]) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <AccordionContext.Provider value={{ type, value, onValueChange: handleValueChange }}>
      <View className={cn('w-full', className)} {...props}>
        {children}
      </View>
    </AccordionContext.Provider>
  );
};

export interface AccordionItemProps {
  value: string;
  className?: string;
  children?: React.ReactNode;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  value,
  className,
  children,
  ...props
}) => {
  return (
    <View className={cn('border-b', className)} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { ...child.props, itemValue: value });
        }
        return child;
      })}
    </View>
  );
};

export interface AccordionTriggerProps {
  itemValue?: string;
  className?: string;
  children?: React.ReactNode;
}

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  itemValue,
  className,
  children,
  ...props
}) => {
  const context = useContext(AccordionContext);
  if (!context || !itemValue) {
    throw new Error('AccordionTrigger must be used within an AccordionItem');
  }

  const { type, value, onValueChange } = context;
  const isOpen = type === 'multiple' 
    ? Array.isArray(value) && value.includes(itemValue)
    : value === itemValue;

  const handleClick = () => {
    if (type === 'multiple') {
      const currentValue = Array.isArray(value) ? value : [];
      const newValue = isOpen
        ? currentValue.filter(v => v !== itemValue)
        : [...currentValue, itemValue];
      onValueChange(newValue);
    } else {
      onValueChange(isOpen ? '' : itemValue);
    }
  };

  return (
    <View className="flex">
      <View
        className={cn(
          'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline',
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <Text>{children}</Text>
        <Text className={cn('h-4 w-4 shrink-0 transition-transform duration-200', isOpen && 'rotate-180')}>
          ▼
        </Text>
      </View>
    </View>
  );
};

export interface AccordionContentProps {
  itemValue?: string;
  className?: string;
  children?: React.ReactNode;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({
  itemValue,
  className,
  children,
  ...props
}) => {
  const context = useContext(AccordionContext);
  if (!context || !itemValue) {
    throw new Error('AccordionContent must be used within an AccordionItem');
  }

  const { type, value } = context;
  const isOpen = type === 'multiple' 
    ? Array.isArray(value) && value.includes(itemValue)
    : value === itemValue;

  if (!isOpen) {
    return null;
  }

  return (
    <View
      className="overflow-hidden text-sm transition-all"
      {...props}
    >
      <View className={cn('pb-4 pt-0', className)}>
        {children}
      </View>
    </View>
  );
};