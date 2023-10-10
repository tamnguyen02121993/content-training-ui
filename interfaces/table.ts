import { TablePaginationConfig } from "antd";
import { FilterValue } from "antd/es/table/interface";

export interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
  search?: string;
}

export interface TableResult<T> {
  data: T[];
  currentPage: number;
  hasNext: boolean;
  hasPrev: boolean;
  pageSize: number;
  totalPages: number;
  totalItems: number;
}
