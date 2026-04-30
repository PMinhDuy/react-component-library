import React from 'react';
import { Modal } from './Modal';
import { Button } from '../Button';
import type { ModalProps } from './Modal';

export interface ConfirmModalProps extends Omit<ModalProps, 'footer' | 'onOk'> {
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  isDangerous?: boolean;
  isConfirming?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDangerous = false,
  isConfirming = false,
  ...rest
}) => {
  return (
    <Modal
      {...rest}
      onCancel={onCancel}
      footer={
        <div className="flex justify-end gap-2">
          <Button onClick={onCancel as React.MouseEventHandler} variant="default">
            {cancelText}
          </Button>
          <Button
            type={isDangerous ? undefined : 'primary'}
            danger={isDangerous}
            isLoading={isConfirming}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      }
    />
  );
};
