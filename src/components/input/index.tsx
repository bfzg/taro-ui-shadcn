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
        "flex h-10 rounded-md border border-solid border-primary bg-white px-3 py-1 text-base text-gray-900 shadow-sm transition-all duration-200 ease-in-out file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-primary placeholder:text-gray-500 hover:border-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50 md:text-sm",
        className
      )}
      onInput={handleInput}
      onFocus={onFocus}
      onBlur={onBlur}
      {...props}
    />
  );
};
