"use client";

import { Button } from "antd";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Permission } from "@/interfaces";
import Table, { ColumnsType } from "antd/es/table";
import { formatDateTime } from "@/utils";
import { useTable } from "@/hooks";
import { ButtonConfirmDelete, TableSearchInput } from "../../components";

const PermissionsTable: React.FC = () => {
  const { data, handleTableChange, tableParams, handleSearch } =
    useTable<Permission>("permissions");

  const handleConfirmDelete = async (
    id: string,
    e?: React.MouseEvent<HTMLElement>
  ) => {
    const response = await fetch(`/api/delete-permission/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    console.log(result);
  };

  const columns: ColumnsType<Permission> = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      sorter: true,
      key: "description",
    },
    {
      title: "CreatedAt",
      sorter: true,
      key: "createdAt",
      render: (permission) => <div>{formatDateTime(permission.createdAt)}</div>,
    },
    {
      title: "UpdatedAt",
      sorter: true,
      key: "updatedAt",
      render: (permission) => <div>{formatDateTime(permission.updatedAt)}</div>,
    },
    {
      title: "DeletedAt",
      sorter: true,
      key: "deletedAt",
      render: (permission) => <div>{formatDateTime(permission.deletedAt)}</div>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (permission: Permission) => {
        return (
          <div className="flex flex-row gap-x-2">
            <Button
              type="default"
              className="bg-orange-500 text-white hover:!text-white hover:!border-orange-500"
              shape="circle"
              icon={<AiOutlineEdit />}
            />
            <ButtonConfirmDelete
              dataKey={permission.id}
              onConfirm={handleConfirmDelete}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <TableSearchInput onSearch={handleSearch} value={tableParams.search} />
      <Table
        columns={columns}
        dataSource={data}
        pagination={tableParams.pagination}
        rowKey={(permission) => permission.id}
        onChange={handleTableChange}
        className="mt-6"
      ></Table>
    </>
  );
};

export default PermissionsTable;
