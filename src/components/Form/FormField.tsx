import React from 'react';
import { cn, getAriaDescribedBy } from '../../utils';
import type { BaseProps, FieldError } from '../../types';

export interface FormFieldProps extends BaseProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  error?: FieldError;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  required,
  hint,
  error,
  children,
  className,
  id,
}) => {
  const fieldId = htmlFor;
  const hasError = Boolean(error?.message);
  const hasHint = Boolean(hint);
  const ariaDescribedBy = getAriaDescribedBy(fieldId, hasError, hasHint);

  return (
    <div
      id={id}
      className={cn('flex flex-col gap-1', className)}
      role="group"
      aria-labelledby={`${fieldId}-label`}
    >
      <label
        id={`${fieldId}-label`}
        htmlFor={fieldId}
        className={cn(
          'text-sm font-medium text-gray-700',
          required && "after:content-['*'] after:ml-0.5 after:text-danger-500"
        )}
      >
        {label}
      </label>

      {React.cloneElement(children as React.ReactElement, {
        id: fieldId,
        'aria-required': required,
        'aria-invalid': hasError,
        'aria-describedby': ariaDescribedBy,
      })}

      {hasHint && !hasError && (
        <p id={`${fieldId}-hint`} className="text-xs text-gray-500">
          {hint}
        </p>
      )}

      {hasError && (
        <p
          id={`${fieldId}-error`}
          role="alert"
          aria-live="polite"
          className="text-xs text-danger-600"
        >
          {error!.message}
        </p>
      )}
    </div>
  );
};
