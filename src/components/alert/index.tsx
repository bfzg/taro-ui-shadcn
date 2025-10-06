import React from 'react';
import { View, Text } from '@tarojs/components';
import { cn } from '../../utils/cn';
import { cva } from '../../utils/cva';

const alertVariants = cva(
  'relative w-full rounded-lg border p-4',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground border-border',
        destructive: 'border-destructive/50 text-destructive bg-destructive/10',
        warning: 'border-yellow-500/50 text-yellow-700 bg-yellow-50',
        success: 'border-green-500/50 text-green-700 bg-green-50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface AlertProps {
  variant?: 'default' | 'destructive' | 'warning' | 'success';
  className?: string;
  children?: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'default',
  className,
  children,
  ...props
}) => {
  return (
    <View
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {children}
    </View>
  );
};

export interface AlertTitleProps {
  className?: string;
  children?: React.ReactNode;
}

export const AlertTitle: React.FC<AlertTitleProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <Text
      className={cn('mb-1 font-medium leading-none tracking-tight text-base', className)}
      {...props}
    >
      {children}
    </Text>
  );
};

export interface AlertDescriptionProps {
  className?: string;
  children?: React.ReactNode;
}

export const AlertDescription: React.FC<AlertDescriptionProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <View
      className={cn('text-sm leading-relaxed', className)}
      {...props}
    >
      {children}
    </View>
  );
};