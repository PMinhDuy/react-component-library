import React from 'react';
import { cn } from '../../utils';
import type { BaseProps } from '../../types';

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement>, BaseProps {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  noValidate?: boolean;
}

export const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  noValidate = true,
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...rest
}) => {
  return (
    <form
      onSubmit={onSubmit}
      noValidate={noValidate}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={cn('flex flex-col gap-4', className)}
      {...rest}
    >
      {children}
    </form>
  );
};
