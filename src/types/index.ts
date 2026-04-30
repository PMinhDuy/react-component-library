export type Size = 'small' | 'middle' | 'large';

export type Variant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'link';

export type Status = 'error' | 'warning' | 'success' | 'info';

export interface BaseProps {
  className?: string;
  id?: string;
  'data-testid'?: string;
}

export interface FieldValidation {
  required?: boolean | string;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  validate?: (value: unknown) => string | boolean | Promise<string | boolean>;
}

export interface FieldError {
  message?: string;
  type?: string;
}

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface Column<T = Record<string, unknown>> {
  key: keyof T | string;
  title: string;
  dataIndex?: keyof T | string;
  width?: number | string;
  sortable?: boolean;
  render?: (value: unknown, record: T, index: number) => React.ReactNode;
}
