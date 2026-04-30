import React from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import { cn } from '../../utils';
import type { BaseProps, Column } from '../../types';

export interface DataGridProps<T extends object = Record<string, unknown>>
  extends Omit<TableProps<T>, 'columns'>,
    BaseProps {
  columns: Column<T>[];
  caption?: string;
  striped?: boolean;
}

export function DataGrid<T extends object = Record<string, unknown>>({
  columns,
  dataSource,
  caption,
  striped = false,
  className,
  loading,
  pagination,
  rowKey,
  onChange,
  ...rest
}: DataGridProps<T>): React.ReactElement {
  const antColumns = columns.map((col) => ({
    key: col.key as string,
    title: col.title,
    dataIndex: col.dataIndex as string,
    width: col.width,
    sorter: col.sortable,
    render: col.render as TableProps<T>['columns'] extends Array<infer C>
      ? C extends { render?: infer R }
        ? R
        : never
      : never,
  }));

  return (
    <div role="region" aria-label={caption} className={cn('w-full overflow-auto', className)}>
      {caption && (
        <p className="text-sm font-semibold text-gray-700 mb-2" aria-hidden="true">
          {caption}
        </p>
      )}
      <Table<T>
        columns={antColumns}
        dataSource={dataSource}
        loading={loading}
        pagination={pagination}
        rowKey={rowKey}
        onChange={onChange}
        className={cn(striped && '[&_.ant-table-row:nth-child(even)]:bg-gray-50')}
        {...rest}
      />
    </div>
  );
}
