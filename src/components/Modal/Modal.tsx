import React from 'react';
import { Modal as AntModal } from 'antd';
import type { ModalProps as AntModalProps } from 'antd';
import { cn } from '../../utils';
import type { BaseProps, Size } from '../../types';

const SIZE_MAP: Record<Size, number> = {
  small: 400,
  middle: 520,
  large: 760,
};

export interface ModalProps extends Omit<AntModalProps, 'width'>, BaseProps {
  size?: Size;
  description?: string;
}

export const Modal: React.FC<ModalProps> = ({
  size = 'middle',
  title,
  description,
  open,
  onCancel,
  onOk,
  children,
  className,
  footer,
  okText = 'Confirm',
  cancelText = 'Cancel',
  ...rest
}) => {
  const titleId = rest.id ? `${rest.id}-title` : undefined;
  const descId = description && rest.id ? `${rest.id}-desc` : undefined;

  return (
    <AntModal
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      title={
        <span id={titleId} role="heading" aria-level={2}>
          {title}
        </span>
      }
      width={SIZE_MAP[size]}
      okText={okText}
      cancelText={cancelText}
      footer={footer}
      className={cn(className)}
      aria-labelledby={titleId}
      aria-describedby={descId}
      {...rest}
    >
      {description && (
        <p id={descId} className="text-sm text-gray-600 mb-4">
          {description}
        </p>
      )}
      {children}
    </AntModal>
  );
};
