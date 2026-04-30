import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Modal } from './Modal';
import { ConfirmModal } from './ConfirmModal';

describe('Modal', () => {
  it('renders when open is true', () => {
    render(
      <Modal open title="Test Modal">
        <p>Modal content</p>
      </Modal>
    );
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('does not render content when open is false', () => {
    render(
      <Modal open={false} title="Test Modal">
        <p>Hidden content</p>
      </Modal>
    );
    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
  });

  it('calls onCancel when cancel is triggered', async () => {
    const handleCancel = vi.fn();
    render(
      <Modal open title="Test" onCancel={handleCancel}>
        <p>content</p>
      </Modal>
    );
    const cancelBtn = screen.getByRole('button', { name: /cancel/i });
    await userEvent.click(cancelBtn);
    expect(handleCancel).toHaveBeenCalled();
  });

  it('renders description when provided', () => {
    render(
      <Modal open title="Test" id="test-modal" description="This is a description">
        <p>content</p>
      </Modal>
    );
    expect(screen.getByText('This is a description')).toBeInTheDocument();
  });
});

describe('ConfirmModal', () => {
  it('calls onConfirm when confirm button is clicked', async () => {
    const handleConfirm = vi.fn();
    render(
      <ConfirmModal open title="Confirm?" onConfirm={handleConfirm} onCancel={vi.fn()}>
        <p>Are you sure?</p>
      </ConfirmModal>
    );
    await userEvent.click(screen.getByRole('button', { name: /confirm/i }));
    expect(handleConfirm).toHaveBeenCalledOnce();
  });

  it('shows loading state on confirm button when isConfirming', () => {
    render(
      <ConfirmModal open title="Confirm?" onConfirm={vi.fn()} onCancel={vi.fn()} isConfirming>
        <p>content</p>
      </ConfirmModal>
    );
    expect(screen.getByRole('button', { name: /confirm/i })).toBeDisabled();
  });
});
