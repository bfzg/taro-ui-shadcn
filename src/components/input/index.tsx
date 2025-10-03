import React from "react";
import { InputProps, Input as TaroInput } from "@tarojs/components";
import { cn } from "../../utils/cn";

export interface CInputProps {
  type?: keyof InputProps.Type;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  maxlength?: number;
  className?: string;
  onInput?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const Input: React.FC<CInputProps> = ({
  type = "text",
  placeholder,
  value,
  disabled = false,
  maxlength,
  className,
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
    <TaroInput
      type={type}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      maxlength={maxlength}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      onInput={handleInput}
      onFocus={onFocus}
      onBlur={onBlur}
      {...props}
    />
  );
};
