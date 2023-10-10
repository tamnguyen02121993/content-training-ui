"use client";

import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table/interface";
import { AiOutlineEdit } from "react-icons/ai";
import { Role } from "@/interfaces";
import { formatDateTime } from "@/utils";
import { useTable } from "@/hooks";
import { ButtonConfirmDelete, TableSearchInput } from "../../components";

const RolesTable: React.FC = () => {
  const { data, handleTableChange, tableParams, handleSearch } =
    useTable<Role>("roles");

  const handleConfirmDelete = async (
    id: string,
    e?: React.MouseEvent<HTMLElement>
  ) => {
    const response = await fetch(`/api/delete-role/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    console.log(result);
  };

  const columns: ColumnsType<Role> = [
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
      key: "createdAt",
      sorter: true,
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
      render: (role: Role) => {
        return (
          <div className="flex flex-row gap-x-2">
            <Button
              type="default"
              className="bg-orange-500 text-white hover:!text-white hover:!border-orange-500"
              shape="circle"
              icon={<AiOutlineEdit />}
            />
            <ButtonConfirmDelete
              dataKey={role.id}
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
        rowKey={(role) => role.id}
        onChange={handleTableChange}
        className="mt-6"
      ></Table>
    </>
  );
};
export default RolesTable;
