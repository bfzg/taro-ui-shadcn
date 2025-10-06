import React from 'react';
import { View } from '@tarojs/components';
import { cn } from '../../utils/cn';

export interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  ...props
}) => {
  return (
    <View
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
};