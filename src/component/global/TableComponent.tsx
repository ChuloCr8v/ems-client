import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { type Key, useState } from "react";
import { twMerge } from "tailwind-merge";
import type { TablePaginationConfig } from "antd/lib";

type Props<T> = {
  columns: ColumnsType<T>;
  dataSource: T[];
  className?: string;
  loading?: boolean;
  onRow?: (record: T) => void;
  isRowSelection?: boolean;
  onSelectionChange?: (selectedRows: T[]) => void;
  scroll?: string | number | true | undefined;
  paginationConfig?: TablePaginationConfig;
  expandable?: import("antd").TableProps<T>["expandable"];
};

const TableComponent = <T extends { id: Key }>({
  columns,
  dataSource,
  className,
  loading,
  onRow,
  isRowSelection = true,
  onSelectionChange,
  scroll,
  paginationConfig,
  expandable,
}: Props<T>) => {
  const data = dataSource?.map((item: T) => ({ ...item, key: item.id }));

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);

    const selectedRows =
      data?.filter((item) => newSelectedRowKeys.includes(item.key)) || [];

    onSelectionChange?.(selectedRows);
  };

  const rowSelection = isRowSelection
    ? {
        selectedRowKeys,
        onChange: onSelectChange,
      }
    : undefined;

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={paginationConfig || false}
      scroll={data?.length ? { x: scroll ?? 800 } : undefined}
      rowSelection={rowSelection}
      rowClassName={(_record, index) =>
        index % 2 === 0 ? "even-row" : "odd-row"
      }
      onRow={(record) => ({
        onClick: () => onRow?.(record),
      })}
      expandable={expandable}
      size="small"
      className={twMerge(
        "bg-white border border-outline rounded-lg cursor-pointer custom-table",
        className
      )}
    />
  );
};

export default TableComponent;
