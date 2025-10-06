import React, { useState, createContext, useContext } from 'react';
import { View } from '@tarojs/components';
import { cn } from '../../utils/cn';

interface CollapsibleContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CollapsibleContext = createContext<CollapsibleContextType | undefined>(undefined);

export interface CollapsibleProps {
  open?: boolean;
  defaultOpen?: boolean;
  className?: string;
  children?: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}

export const Collapsible: React.FC<CollapsibleProps> = ({
  open: controlledOpen,
  defaultOpen = false,
  className,
  children,
  onOpenChange,
  ...props
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  return (
    <CollapsibleContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
      <View className={cn('w-full', className)} {...props}>
        {children}
      </View>
    </CollapsibleContext.Provider>
  );
};

export interface CollapsibleTriggerProps {
  className?: string;
  children?: React.ReactNode;
}

export const CollapsibleTrigger: React.FC<CollapsibleTriggerProps> = ({
  className,
  children,
  ...props
}) => {
  const context = useContext(CollapsibleContext);
  if (!context) {
    throw new Error('CollapsibleTrigger must be used within a Collapsible component');
  }

  const { open, onOpenChange } = context;

  const handleClick = () => {
    onOpenChange(!open);
  };

  return (
    <View
      className={cn('cursor-pointer', className)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </View>
  );
};

export interface CollapsibleContentProps {
  className?: string;
  children?: React.ReactNode;
}

export const CollapsibleContent: React.FC<CollapsibleContentProps> = ({
  className,
  children,
  ...props
}) => {
  const context = useContext(CollapsibleContext);
  if (!context) {
    throw new Error('CollapsibleContent must be used within a Collapsible component');
  }

  const { open } = context;

  if (!open) {
    return null;
  }

  return (
    <View
      className={cn('overflow-hidden transition-all', className)}
      {...props}
    >
      {children}
    </View>
  );
};