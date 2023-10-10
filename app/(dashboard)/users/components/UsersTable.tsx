"use client";

import { Button, Table } from "antd";
import { AiOutlineEdit } from "react-icons/ai";
import { User } from "@/interfaces";
import type { ColumnsType } from "antd/es/table";
import { useTable } from "@/hooks";
import { ButtonConfirmDelete, TableSearchInput } from "../../components";

const UsersTable: React.FC = () => {
  const { data, handleTableChange, tableParams, handleSearch, sortDirections } =
    useTable<User>("users");

  const handleConfirmDelete = async (
    id: string,
    e?: React.MouseEvent<HTMLElement>
  ) => {
    const response = await fetch(`/api/delete-user/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    console.log(result);
  };

  const columns: ColumnsType<User> = [
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
      key: "email",
    },
    {
      title: "FullName",
      key: "fullName",
      sorter: true,
      render: (user: User) => {
        return (
          <div className="px-4 py-2 text-white font-bold bg-blue-500 w-fit border rounded-full">
            {user.firstName} {user.lastName}
          </div>
        );
      },
    },
    {
      title: "Global ID",
      dataIndex: "globalId",
      key: "globalId",
      sorter: true,
    },
    {
      title: "Office Code",
      dataIndex: "officeCode",
      key: "officeCode",
      sorter: true,
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      sorter: true,
    },
    {
      title: "Actions",
      key: "actions",
      render: (user: User) => {
        return (
          <div className="flex flex-row gap-x-2">
            <Button
              type="default"
              className="bg-orange-500 text-white hover:!text-white hover:!border-orange-500"
              shape="circle"
              icon={<AiOutlineEdit />}
            />
            <ButtonConfirmDelete
              dataKey={user.id}
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
        rowKey={(user) => user.id}
        onChange={handleTableChange}
        className="mt-6"
        sortDirections={sortDirections}
      ></Table>
    </>
  );
};

export default UsersTable;
