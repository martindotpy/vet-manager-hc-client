import {
  AppointementResponseType,
  AppointmentResponseEntity,
  ProductResponseEntity,
  CategoryResponseEntity,
} from "./apiResponseEntities";

// GET /api/v0/appointment
export type AppointmentAllResponse = {
  page: number;
  size: number;
  total_pages: number;
  message: string;
  content: AppointmentResponseEntity[];
};

// GET /api/v0/appointment/{id}
export type AppointmentOneResponse = {
  message: string;
  content: AppointmentResponseEntity;
};

// GET /api/v0/appointment/type
export type AppointmentTypeAllResponse = {
  message: string;
  content: AppointementResponseType[];
};

// GET /api/v0/product
export type ProductListResponse = {
  page: number;
  size: number;
  total_pages: number;
  total_elements: number;
  message: string;
  content: ProductResponseEntity[];
};

// GET /api/v0/product/{id}
export type SingleProductResponse = {
  message: string;
  content: ProductResponseEntity;
};

// GET /api/v0/category
export type CategoryListResponse = {
  message: string;
  content: CategoryResponseEntity[];
};