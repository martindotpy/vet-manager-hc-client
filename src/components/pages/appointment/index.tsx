import { useEffect, useState } from "react";
import AppointmentModal from "../../molecules/appointment-modal";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import WeeklyCalendar from "../../organisms/weeklyCalendar";
import { useAppointment } from "../../../hooks/useAppointment";
export interface Appointment {
  id: string;
  patient: string;
  start: Date;
  end: Date;
  description: string;
}
export default function AppointmentPage() {
  const { appointments, fetchAppointments, isLoading, error } = useAppointment();
  const [transformedAppointments, setTransformedAppointments] = useState<Appointment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date());


  useEffect(() => {
    const formattedAppointments = appointments.map((appt) => ({
      id: appt.id.toString(),
      patient: appt.patient.name,
      start: new Date(appt.start_at),
      end: new Date(new Date(appt.start_at).getTime() + appt.details[0]?.duration_in_minutes * 60000),
      description: appt.description,
    }));
    setTransformedAppointments(formattedAppointments);
  }, [appointments]);

  const handleAddAppointment = (appointment: Appointment) => {
    setTransformedAppointments([...transformedAppointments, appointment]);
    setIsModalOpen(false);
  };

  const handlePrevWeek = () => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() - 7);
    setCurrentWeek(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + 7);
    setCurrentWeek(newDate);
  };

  return (
    <div id="appointments-page" className="p-6 w-full mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Citas</h1>
        <h2 className="text-lg text-white">
          {currentWeek.toLocaleDateString("es-ES", {
            month: "long",
            year: "numeric",
          })}
        </h2>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-y-auto">
        {isLoading ? (
          <div className="text-center p-4">Cargando citas...</div>
        ) : error ? (
          <div className="text-center p-4 text-black">{error}</div>
        ) : (
          <WeeklyCalendar appointments={transformedAppointments} currentWeek={currentWeek} />
        )}

        <div className="p-4 border-t border-gray-200 flex justify-between items-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-accent transition-colors"
          >
            Agregar cita
          </button>
          <div className="flex gap-2">
            <button
              onClick={handlePrevWeek}
              className="p-2 rounded-lg bg-primary text-white hover:bg-accent transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextWeek}
              className="p-2 rounded-lg bg-primary text-white hover:bg-accent transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <AppointmentModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddAppointment}
          initialDate={selectedDate}
        />
      )}
    </div>
  );
}