import { TableParams } from "@/interfaces";
import { TablePaginationConfig } from "antd";
import { FilterValue, SortOrder, SorterResult } from "antd/es/table/interface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import queryString from "query-string";
import { useEffect, useState } from "react";

type DataType = "users" | "roles" | "permissions";

interface TableQuery {
  currentPage?: number;
  pageSize?: number;
  filters?: Record<string, FilterValue | null>;
  sortField?: string;
  sortOrder?: string;
  search?: string;
}

const generateUrlBasedOnDataType = (dataType: DataType, query: TableQuery) => {
  switch (dataType) {
    case "users":
      return `/api/get-users?${queryString.stringify(query)}`;
    case "roles":
      return `/api/get-roles?${queryString.stringify(query)}`;
    case "permissions":
      return `/api/get-permissions?${queryString.stringify(query)}`;
    default:
      throw new Error("data type is invalid");
  }
};

const transformQueryToObject = (searchParams: ReadonlyURLSearchParams) => {
  const transformObject: Record<string, string> = {};
  const entries = searchParams.entries();
  for (const [key, value] of entries) {
    transformObject[key] = value;
  }
  return transformObject;
};

const updateSearchParams = (
  router: AppRouterInstance,
  pathname: string,
  query: TableQuery
) => {
  router.push(`${pathname}?${queryString.stringify(query)}`);
};

const useTable = <T>(dataType: DataType) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [data, setData] = useState<T[]>();
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: Number(searchParams.get("currentPage")) || 1,
      pageSize: Number(searchParams.get("pageSize")) || 10,
      pageSizeOptions: ["10", "25", "50", "100"],
      showSizeChanger: true,
    },
    sortField: searchParams.get("sortField") || undefined,
    sortOrder: searchParams.get("sortOrder") || undefined,
    search: searchParams.get("search") || undefined,
  });

  useEffect(() => {
    fetchData();
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams.sortField,
    tableParams.sortOrder,
    tableParams.search,
  ]);

  const fetchData = async () => {
    const query = {
      currentPage: tableParams.pagination?.current,
      pageSize: tableParams.pagination?.pageSize,
      filters: tableParams.filters,
      sortField: tableParams.sortField,
      sortOrder: tableParams.sortOrder,
      search: tableParams.search,
    };
    const url = generateUrlBasedOnDataType(dataType, query);
    const response = await fetch(url, {
      method: "GET",
    });
    const result = await response.json();
    setData(result.data);
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: result.totalItems,
      },
    });
  };

  const checkObjectEmpty = (obj: {}) => {
    return Object.keys(obj).length === 0;
  };

  const handleSearch = (value: string) => {
    const searchValue = value.trim() === "" ? undefined : value.trim();
    setTableParams((prevState) => ({
      ...prevState,
      search: searchValue,
    }));

    const query = transformQueryToObject(searchParams);
    updateSearchParams(router, pathname, {
      ...query,
      search: searchValue,
    });
  };

  const handleTableChange = async (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<T> | SorterResult<T>[]
  ) => {
    const sort = sorter as SorterResult<T>;

    const filterQuery = checkObjectEmpty(filters) ? undefined : filters;
    let sortField = sort?.column?.key as string;
    setTableParams({
      ...tableParams,
      pagination,
      filters: filterQuery,
      sortField,
      sortOrder: sort?.order as string,
    });

    const query = {
      search: tableParams.search,
      currentPage: pagination?.current,
      pageSize: pagination?.pageSize,
      filters: filterQuery,
      sortField: sortField,
      sortOrder: sort?.order as string,
    };
    updateSearchParams(router, pathname, query);

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return {
    handleTableChange,
    handleSearch,
    tableParams,
    data,
    sortDirections: ["ascend", "descend", "ascend"] as SortOrder[],
  };
};

export default useTable;
