"use client";

import { Button, Popconfirm } from "antd";
import { AiOutlineDelete } from "react-icons/ai";

interface ButtonConfirmDeleteProps {
  onConfirm?: (id: string, e?: React.MouseEvent<HTMLElement>) => void;
  onCancel?: (id: string, e?: React.MouseEvent<HTMLElement>) => void;
  dataKey: string;
}

const ButtonConfirmDelete: React.FC<ButtonConfirmDeleteProps> = ({
  onConfirm,
  onCancel,
  dataKey,
}) => {
  const handleConfirm = (id: string, e?: React.MouseEvent<HTMLElement>) => {
    if (onConfirm) {
      onConfirm(id, e);
    }
  };
  const handleCancel = (id: string, e?: React.MouseEvent<HTMLElement>) => {
    if (onCancel) {
      onCancel(id, e);
    }
  };
  return (
    <Popconfirm
      title="Delete the item"
      description="Are you sure to delete this item?"
      onConfirm={(e) => handleConfirm(dataKey, e)}
      onCancel={(e) => handleCancel(dataKey, e)}
      okText="Yes"
      okButtonProps={{
        className: "bg-blue-500 hover:bg-blue-400 transition-all",
      }}
      cancelText="No"
    >
      <Button
        type="default"
        className="bg-red-500 text-white hover:!text-white hover:!border-red-500"
        shape="circle"
        icon={<AiOutlineDelete />}
      />
    </Popconfirm>
  );
};

export default ButtonConfirmDelete;
