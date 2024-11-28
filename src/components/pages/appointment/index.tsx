import { useState } from "react";
import AppointmentModal from "../../molecules/appointment-modal";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import WeeklyCalendar from "../../organisms/weeklyCalendar";
export interface Appointment {
  id: string;
  patient: string;
  start: Date;
  end: Date;
  description: string;
}
export default function AppointmentPage(){
const [appointments, setAppointments] = useState<Appointment[]>([]);
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedDate, setSelectedDate] = useState<Date>(new Date());
const [currentWeek, setCurrentWeek] = useState<Date>(new Date());

const handleAddAppointment = (appointment: Appointment) => {
  setAppointments([...appointments, appointment]);
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
  <div className="p-6 w-full mx-auto">
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
      <WeeklyCalendar
        appointments={appointments}
        currentWeek={currentWeek}
      />

      <div className="p-4 border-t border-gray-200 flex justify-between items-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-[#2B579A] text-white rounded hover:bg-[#1E3F7D] transition-colors"
        >
          Agregar cita
        </button>
        <div className="flex gap-2">
          <button
            onClick={handlePrevWeek}
            className="p-2 rounded-lg bg-[#2B579A] text-white hover:bg-[#1E3F7D] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNextWeek}
            className="p-2 rounded-lg bg-[#2B579A] text-white hover:bg-[#1E3F7D] transition-colors"
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

