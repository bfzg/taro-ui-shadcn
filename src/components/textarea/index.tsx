import React from 'react';
import { Textarea as TaroTextarea } from '@tarojs/components';
import { cn } from '../../utils/cn';

export interface TextareaProps {
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  maxlength?: number;
  className?: string;
  autoHeight?: boolean;
  onInput?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const Textarea: React.FC<TextareaProps> = ({
  placeholder,
  value,
  disabled = false,
  maxlength,
  className,
  autoHeight = false,
  onInput,
  onFocus,
  onBlur,
  ...props
}) => {
  const handleInput = (e: any) => {
    if (onInput) {
      onInput(e.detail.value);
    }
  };

  return (
    <TaroTextarea
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      maxlength={maxlength}
      autoHeight={autoHeight}
      className={cn(
        'flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background',
        'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      onInput={handleInput}
      onFocus={onFocus}
      onBlur={onBlur}
      {...props}
    />
  );
};