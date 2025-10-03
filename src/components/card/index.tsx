import React from 'react';
import { View, Text } from '@tarojs/components';
import { cn } from '../../utils/cn';

export interface CardProps {
  className?: string;
  children?: React.ReactNode;
}

export interface CardHeaderProps {
  className?: string;
  children?: React.ReactNode;
}

export interface CardTitleProps {
  className?: string;
  children?: React.ReactNode;
}

export interface CardDescriptionProps {
  className?: string;
  children?: React.ReactNode;
}

export interface CardContentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface CardFooterProps {
  className?: string;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ className, children, ...props }) => (
  <View
    className={cn(
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      className
    )}
    {...props}
  >
    {children}
  </View>
);

export const CardHeader: React.FC<CardHeaderProps> = ({ className, children, ...props }) => (
  <View className={cn('flex flex-col space-y-1.5 p-6', className)} {...props}>
    {children}
  </View>
);

export const CardTitle: React.FC<CardTitleProps> = ({ className, children, ...props }) => (
  <Text
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  >
    {children}
  </Text>
);

export const CardDescription: React.FC<CardDescriptionProps> = ({ className, children, ...props }) => (
  <Text className={cn('text-sm text-muted-foreground', className)} {...props}>
    {children}
  </Text>
);

export const CardContent: React.FC<CardContentProps> = ({ className, children, ...props }) => (
  <View className={cn('p-6 pt-0', className)} {...props}>
    {children}
  </View>
);

export const CardFooter: React.FC<CardFooterProps> = ({ className, children, ...props }) => (
  <View className={cn('flex items-center p-6 pt-0', className)} {...props}>
    {children}
  </View>
);