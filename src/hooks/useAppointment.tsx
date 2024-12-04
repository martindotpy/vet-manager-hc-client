import { useEffect, useState } from "react";
import { AppointmentAllResponse, AppointmentResponseEntity } from "../types";
import {
  createAppointment,
  createAppointmentDetails,
  deleteAppointment,
  getAllAppointments,
  updateAppointment,
} from "../services/appointmentService";

export function useAppointment() {
  const [appointments, setAppointments] = useState<AppointmentResponseEntity[]>(
    []
  );
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

  useEffect(() => {
    fetchAppointments();
  }, []);

  return {
    appointments,
    isLoading,
    error,
    fetchAppointments,
    handleCreateAppointment,
    handleCreateAppointmentDetails,
    handleUpdateAppointment,
    handleDeleteAppointment,
  };
}
