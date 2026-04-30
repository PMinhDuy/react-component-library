import React from 'react';
import { Button as AntButton } from 'antd';
import type { ButtonProps as AntButtonProps } from 'antd';
import { cn } from '../../utils';
import type { Size } from '../../types';

export interface ButtonProps extends Omit<AntButtonProps, 'size'> {
  size?: Size;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = 'middle',
      fullWidth = false,
      isLoading,
      loading,
      leftIcon,
      rightIcon,
      children,
      className,
      disabled,
      'aria-label': ariaLabel,
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading || (loading as boolean);

    return (
      <AntButton
        ref={ref}
        size={size}
        loading={isLoading ?? loading}
        disabled={isDisabled}
        aria-label={ariaLabel}
        aria-busy={isLoading ?? (loading as boolean) ?? false}
        aria-disabled={isDisabled}
        className={cn(fullWidth && 'w-full', className)}
        {...rest}
      >
        {leftIcon && (
          <span aria-hidden="true" className="mr-1 inline-flex items-center">
            {leftIcon}
          </span>
        )}
        {children}
        {rightIcon && (
          <span aria-hidden="true" className="ml-1 inline-flex items-center">
            {rightIcon}
          </span>
        )}
      </AntButton>
    );
  }
);

Button.displayName = 'Button';
