import {
  AppointementResponseType,
  AppointmentResponseEntity,
  ProductResponseEntity,
  CategoryResponseEntity,
  OwnerResponseEntity,
  PatientResponseEntity,
  BillResponseEntity,
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

// GET /api/v0/client
export type ClientAllResponse = {
  page: number;
  size: number;
  total_pages: number;
  total_elements: number;
  message: string;
  content: OwnerResponseEntity[];
};

//GET /api/v0/client/{id}
export type ClientOneResponse = {
  message: string;
  content: OwnerResponseEntity;
};

//GET /api/v0/patient
export type PatientAllResponse ={
  page: number;
  size: number;
  total_pages: number;
  total_elements: number;
  message: string;
  content: PatientResponseEntity[];
}

//GET /api/v0/patient/{id}
export type PatientOneResponse = {
  message: string;
  content: PatientResponseEntity;
}

//GET /api/v0/bill
export type BillAllResponse = {
  page: number;
  size: number;
  total_pages: number;
  total_elements: number;
  message: string;
  content: BillResponseEntity[];
}

//GET /api/v0/bill/{id}
export type BillOneResponse = {
  message: string;
  content: BillResponseEntity;
};
