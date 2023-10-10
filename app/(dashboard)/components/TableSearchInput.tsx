"use client";

import { Input } from "antd";
import type { SearchProps } from "antd/es/input";

interface TableSearchInputProps {
  onSearch?: (
    value: string,
    event?:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => void;
  value?: string;
}

const TableSearchInput: React.FC<TableSearchInputProps> = ({
  onSearch,
  value,
}) => {
  const handleSearch: SearchProps["onSearch"] = (value, _e, info) => {
    if (onSearch) {
      onSearch(value, _e);
    }
  };
  return (
    <div className="flex flex-row justify-end">
      <Input.Search
        placeholder="Enter your search keyword"
        onSearch={handleSearch}
        className="w-[500px]"
        defaultValue={value}
      />
    </div>
  );
};

export default TableSearchInput;
