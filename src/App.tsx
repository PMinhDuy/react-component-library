import React, { useState } from 'react';
import { Button } from './components/Button';
import { Form, FormField, TextField, SelectField } from './components/Form';
import { Modal, ConfirmModal } from './components/Modal';
import { DataGrid } from './components/DataGrid';
import { useDisclosure } from './hooks';

interface User {
  id: number;
  name: string;
  role: string;
}

const users: User[] = [
  { id: 1, name: 'Alice Tan', role: 'Admin' },
  { id: 2, name: 'Bob Lim', role: 'Viewer' },
  { id: 3, name: 'Carol Ng', role: 'Editor' },
];

const roleOptions = [
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer', value: 'viewer' },
];

export default function App() {
  const modal = useDisclosure();
  const confirm = useDisclosure();
  const [name, setName] = useState('');

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-8">React Component Library — Playground</h1>

      <section className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Buttons</h2>
        <div className="flex flex-wrap gap-3">
          <Button type="primary">Primary</Button>
          <Button>Default</Button>
          <Button danger>Danger</Button>
          <Button type="primary" isLoading>Loading</Button>
          <Button disabled>Disabled</Button>
          <Button type="primary" fullWidth>Full Width</Button>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow mb-8 max-w-md">
        <h2 className="text-lg font-semibold mb-4">Form Fields</h2>
        <Form aria-label="Example form">
          <FormField label="Full Name" htmlFor="full-name" required>
            <TextField
              id="full-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </FormField>
          <FormField
            label="Email"
            htmlFor="email"
            hint="We'll never share your email"
            error={undefined}
          >
            <TextField id="email" type="email" placeholder="you@example.com" />
          </FormField>
          <FormField label="Role" htmlFor="role" required>
            <SelectField id="role" options={roleOptions} />
          </FormField>
          <FormField
            label="Notes"
            htmlFor="notes"
            error={{ message: 'Notes cannot be empty' }}
          >
            <TextField id="notes" multiline rows={4} placeholder="Add notes..." />
          </FormField>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form>
      </section>

      <section className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Data Grid</h2>
        <DataGrid<User>
          columns={[
            { key: 'name', title: 'Name', dataIndex: 'name' },
            { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
          ]}
          dataSource={users}
          rowKey="id"
          caption="User List"
          striped
        />
      </section>

      <section className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Modals</h2>
        <div className="flex gap-3">
          <Button type="primary" onClick={modal.open}>Open Modal</Button>
          <Button danger onClick={confirm.open}>Open Confirm</Button>
        </div>
      </section>

      <Modal
        open={modal.isOpen}
        title="Example Modal"
        onCancel={modal.close}
        onOk={modal.close}
        id="example-modal"
        description="This is an accessible modal dialog."
      >
        <p>Modal body content goes here.</p>
      </Modal>

      <ConfirmModal
        open={confirm.isOpen}
        title="Delete record?"
        onConfirm={confirm.close}
        onCancel={confirm.close}
        isDangerous
        confirmText="Delete"
        id="confirm-modal"
      >
        <p>This action cannot be undone.</p>
      </ConfirmModal>
    </main>
  );
}
