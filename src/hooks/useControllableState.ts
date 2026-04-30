import { useState, useCallback, useRef } from 'react';

interface UseControllableStateOptions<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
}

export function useControllableState<T>({
  value: controlledValue,
  defaultValue,
  onChange,
}: UseControllableStateOptions<T>): [T | undefined, (value: T) => void] {
  const isControlled = controlledValue !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState<T | undefined>(defaultValue);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) setUncontrolledValue(next);
      onChangeRef.current?.(next);
    },
    [isControlled]
  );

  return [isControlled ? controlledValue : uncontrolledValue, setValue];
}
