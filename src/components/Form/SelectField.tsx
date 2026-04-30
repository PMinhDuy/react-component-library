import React from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd';
import { cn } from '../../utils';
import type { BaseProps, SelectOption } from '../../types';

export interface SelectFieldProps extends Omit<SelectProps, 'options'>, BaseProps {
  options: SelectOption[];
  placeholder?: string;
}

export const SelectField = React.forwardRef<HTMLDivElement, SelectFieldProps>(
  ({ options, className, placeholder = 'Select an option', ...rest }, ref) => {
    return (
      <Select
        ref={ref}
        placeholder={placeholder}
        className={cn('w-full', className)}
        options={options}
        aria-label={rest['aria-label']}
        {...rest}
      />
    );
  }
);

SelectField.displayName = 'SelectField';
