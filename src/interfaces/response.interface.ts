import { Customer } from "./customer.interface";

export interface ResponseInt {
    pageNumber: number
    pageSize: number,
    totalPages: number,
    totalRecords: number,
    data: Customer[],
    succeeded: Boolean,
    errors?: any,
    message?: any
  }