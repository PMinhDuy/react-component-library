import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

export function isNil(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

export function formatFieldId(name: string, prefix?: string): string {
  return prefix ? `${prefix}-${name}` : name;
}

export function getAriaDescribedBy(
  fieldId: string,
  hasError: boolean,
  hasHint: boolean
): string | undefined {
  const ids: string[] = [];
  if (hasError) ids.push(`${fieldId}-error`);
  if (hasHint) ids.push(`${fieldId}-hint`);
  return ids.length > 0 ? ids.join(' ') : undefined;
}
