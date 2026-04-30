import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DataGrid } from './DataGrid';

interface User {
  id: number;
  name: string;
  email: string;
}

const columns = [
  { key: 'name', title: 'Name', dataIndex: 'name' },
  { key: 'email', title: 'Email', dataIndex: 'email' },
];

const dataSource: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

describe('DataGrid', () => {
  it('renders column headers', () => {
    render(
      <DataGrid<User>
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
      />
    );
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders row data', () => {
    render(
      <DataGrid<User>
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
      />
    );
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('bob@example.com')).toBeInTheDocument();
  });

  it('renders caption', () => {
    render(
      <DataGrid<User>
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        caption="User List"
      />
    );
    expect(screen.getByText('User List')).toBeInTheDocument();
  });

  it('renders with aria region when caption provided', () => {
    render(
      <DataGrid<User>
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        caption="User List"
      />
    );
    expect(screen.getByRole('region', { name: 'User List' })).toBeInTheDocument();
  });

  it('renders empty state when no data', () => {
    render(
      <DataGrid<User>
        columns={columns}
        dataSource={[]}
        rowKey="id"
      />
    );
    expect(screen.getByText(/no data/i)).toBeInTheDocument();
  });
});
