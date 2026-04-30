import React from 'react';
import { Input } from 'antd';
import type { InputProps } from 'antd';
import { cn } from '../../utils';
import type { BaseProps } from '../../types';

export interface TextFieldProps extends Omit<InputProps, 'size'>, BaseProps {
  multiline?: boolean;
  rows?: number;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ multiline = false, rows = 3, className, ...rest }, ref) => {
    if (multiline) {
      return (
        <Input.TextArea
          rows={rows}
          className={cn('rounded-md', className)}
          {...(rest as React.ComponentProps<typeof Input.TextArea>)}
        />
      );
    }

    return (
      <Input
        ref={ref}
        className={cn('rounded-md', className)}
        {...rest}
      />
    );
  }
);

TextField.displayName = 'TextField';
