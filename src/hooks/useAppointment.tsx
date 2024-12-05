import { useEffect, useState } from "react";
import {
  AppointmentAllResponse,
  AppointmentResponseEntity,
  AppointmentTypeAllResponse,
} from "../types";
import {
  createAppointment,
  createAppointmentDetails,
  createAppointmentType,
  deleteAppointment,
  deleteAppointmentDetails,
  deleteAppointmentType,
  generateAppointmentExcel,
  getAllAppointments,
  getAllAppointmentTypes,
  updateAppointment,
  updateAppointmentDetails,
  updateAppointmentType,
} from "../services/appointmentService";

export function useAppointment() {
  const [appointments, setAppointments] = useState<AppointmentResponseEntity[]>(
    []
  );
  const [appointmentTypes, setAppointmentTypes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = async ({ page = 0, size = 10 } = {}) => {
    try {
      setIsLoading(true);
      const response: AppointmentAllResponse = await getAllAppointments({
        page,
        size,
      });
      setAppointments(response.content);
    } catch (err) {
      setError("Error al cargar las citas");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAppointmentTypes = async () => {
    try {
      const response: AppointmentTypeAllResponse =
        await getAllAppointmentTypes();
      setAppointmentTypes(response.content);
    } catch (err) {
      setError("Error al cargar los tipos de citas");
      console.error(err);
    }
  };

  const handleCreateAppointment = async ({
    description,
    start_at,
    patient_id,
  }: {
    description: string;
    start_at: string;
    patient_id: number;
  }) => {
    try {
      await createAppointment({ description, start_at, patient_id });
      await fetchAppointments();
    } catch (err) {
      setError("Error al crear la cita");
      console.error(err);
    }
  };

  const handleCreateAppointmentDetails = async ({
    appointment_id,
    appointment_type_id,
    duration_in_minutes,
    price,
  }: {
    appointment_id: number;
    appointment_type_id: number;
    duration_in_minutes: number;
    price: number;
  }) => {
    try {
      await createAppointmentDetails({
        appointment_id,
        appointment_type_id,
        duration_in_minutes,
        price,
      });
    } catch (err) {
      setError("Error al crear los detalles de la cita");
      console.error(err);
    }
  };

  const handleUpdateAppointmentDetails = async ({
    id,
    appointment_type_id,
    duration_in_minutes,
    price,
  }: {
    id: number;
    appointment_type_id: number;
    duration_in_minutes: number;
    price: number;
  }) => {
    try {
      await updateAppointmentDetails({
        id,
        appointment_type_id,
        duration_in_minutes,
        price,
      });
    } catch (err) {
      setError("Error al actualizar los detalles de la cita");
      console.error(err);
    }
  };
  const handleDeleteAppointmentDetails = async (id: number) => {
    try {
      await deleteAppointmentDetails({ id });
    } catch (err) {
      setError("Error al eliminar los detalles de la cita");
      console.error(err);
    }
  };



  const handleUpdateAppointment = async ({
    id,
    description,
    start_at,
    patient_id,
  }: {
    id: number;
    description: string;
    start_at: string;
    patient_id: number;
  }) => {
    try {
      await updateAppointment({ id, description, start_at, patient_id });
      await fetchAppointments();
    } catch (err) {
      setError("Error al actualizar la cita");
      console.error(err);
    }
  };

  const handleDeleteAppointment = async (id: number) => {
    try {
      await deleteAppointment({ id });
      await fetchAppointments();
    } catch (err) {
      setError("Error al eliminar la cita");
      console.error(err);
    }
  };

  const handleCreateAppointmentType = async ({
    name,
    duration_in_minutes,
    price,
  }: {
    name: string;
    duration_in_minutes: number;
    price: number;
  }) => {
    try {
      await createAppointmentType({ name, duration_in_minutes, price });
      await fetchAppointmentTypes();
    } catch (err) {
      setError("Error al crear el tipo de cita");
      console.error(err);
    }
  };

  const handleUpdateAppointmentType = async ({
    id,
    name,
    duration_in_minutes,
    price,
  }: {
    id: number;
    name: string;
    duration_in_minutes: number;
    price: number;
  }) => {
    try {
      await updateAppointmentType({ id, name, duration_in_minutes, price });
      await fetchAppointmentTypes();
    } catch (err) {
      setError("Error al actualizar el tipo de cita");
      console.error(err);
    }
  };

  const handleDeleteAppointmentType = async (id: number) => {
    try {
      await deleteAppointmentType({ id });
      await fetchAppointmentTypes();
    } catch (err) {
      setError("Error al eliminar el tipo de cita");
      console.error(err);
    }
  };

  const handleAppointmentExcel = async () => {
    try{
      await generateAppointmentExcel();
    } catch (err) {
      setError("Error al generar el excel de citas");
      console.error(err);
    }
  }

  useEffect(() => {
    fetchAppointments();
  }, []);

  return {
    appointments,
    appointmentTypes,
    isLoading,
    error,
    fetchAppointments,
    fetchAppointmentTypes,
    handleCreateAppointment,
    handleCreateAppointmentDetails,
    handleUpdateAppointment,
    handleUpdateAppointmentDetails,
    handleDeleteAppointment,
    handleDeleteAppointmentDetails,
    handleCreateAppointmentType,
    handleUpdateAppointmentType,
    handleDeleteAppointmentType,
    handleAppointmentExcel,
  };
}
