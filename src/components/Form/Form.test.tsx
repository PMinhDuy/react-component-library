import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Form } from './Form';
import { FormField } from './FormField';
import { TextField } from './TextField';

describe('Form', () => {
  it('renders children inside a form element', () => {
    render(<Form aria-label="Test form"><button type="submit">Submit</button></Form>);
    expect(screen.getByRole('form', { name: /test form/i })).toBeInTheDocument();
  });

  it('calls onSubmit when form is submitted', async () => {
    const handleSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
    render(
      <Form onSubmit={handleSubmit} aria-label="Test form">
        <button type="submit">Submit</button>
      </Form>
    );
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(handleSubmit).toHaveBeenCalledOnce();
  });

  it('has noValidate by default', () => {
    render(<Form aria-label="Test form"><span /></Form>);
    expect(screen.getByRole('form')).toHaveAttribute('novalidate');
  });
});

describe('FormField', () => {
  it('renders label with htmlFor correctly', () => {
    render(
      <FormField label="Email" htmlFor="email">
        <input id="email" type="email" />
      </FormField>
    );
    const label = screen.getByText('Email');
    expect(label).toHaveAttribute('for', 'email');
  });

  it('shows error message with role alert', () => {
    render(
      <FormField label="Email" htmlFor="email" error={{ message: 'Email is required' }}>
        <input id="email" />
      </FormField>
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Email is required');
  });

  it('shows hint text when no error', () => {
    render(
      <FormField label="Email" htmlFor="email" hint="Enter your work email">
        <input id="email" />
      </FormField>
    );
    expect(screen.getByText('Enter your work email')).toBeInTheDocument();
  });

  it('hides hint when error is present', () => {
    render(
      <FormField
        label="Email"
        htmlFor="email"
        hint="Enter your work email"
        error={{ message: 'Invalid email' }}
      >
        <input id="email" />
      </FormField>
    );
    expect(screen.queryByText('Enter your work email')).not.toBeInTheDocument();
  });
});

describe('TextField', () => {
  it('renders an input element', () => {
    render(<TextField placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders a textarea when multiline is true', () => {
    render(<TextField multiline placeholder="Enter multiline text" />);
    expect(screen.getByPlaceholderText('Enter multiline text').tagName).toBe('TEXTAREA');
  });

  it('calls onChange when user types', async () => {
    const handleChange = vi.fn();
    render(<TextField onChange={handleChange} />);
    await userEvent.type(screen.getByRole('textbox'), 'hello');
    expect(handleChange).toHaveBeenCalled();
  });
});
