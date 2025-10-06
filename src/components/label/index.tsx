import React from 'react';
import { Text } from '@tarojs/components';
import { cn } from '../../utils/cn';
import { cva } from '../../utils/cva';

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);

export interface LabelProps {
  className?: string;
  children?: React.ReactNode;
  htmlFor?: string;
}

export const Label: React.FC<LabelProps> = ({
  className,
  children,
  htmlFor,
  ...props
}) => {
  return (
    <Text
      className={cn(labelVariants(), className)}
      {...props}
    >
      {children}
    </Text>
  );
};