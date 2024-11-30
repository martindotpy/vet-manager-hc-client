import {
  AppointementResponseType,
  AppointmentResponseEntity,
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
