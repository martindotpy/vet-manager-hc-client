import { Close } from "@mui/icons-material";
import { useState } from "react";
import { Appointment } from "../../pages/appointment";

interface Patient {
  id: number;
  name: string;
}

interface AppointmentModalProps {
  onClose: () => void;
  onSave: (appointment: Appointment) => void;
  initialDate: Date;
  patients: Patient[]; 
}

export default function AppointmentModal({
  onClose,
  onSave,
  initialDate,
  patients,
}: AppointmentModalProps) {
  const [appointment, setAppointment] = useState<Omit<Appointment, "id">>({
    patient: "", 
    start: initialDate,
    end: new Date(initialDate.getTime() + 45 * 60000),
    description: "",
  });

  const formatDateForInput = (date: Date) => {
    return date.toISOString().slice(0, 16);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...appointment,
      id: Date.now().toString(),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1A1A19] rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-accent">Nueva cita</h2>
          <button onClick={onClose} className="text-secondary hover:text-accent">
            <Close className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-secondary mb-1">Paciente</label>
            <select
              name="patient"
              value={appointment.patient}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#2A2A29] text-white"
              required
            >
              <option value="">Seleccione un paciente</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-secondary mb-1">Inicio</label>
            <input
              type="datetime-local"
              name="start"
              value={formatDateForInput(appointment.start)}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#2A2A29] text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-secondary mb-1">Fin</label>
            <input
              type="datetime-local"
              name="end"
              value={formatDateForInput(appointment.end)}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#2A2A29] text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-secondary mb-1">Descripción</label>
            <textarea
              name="description"
              value={appointment.description}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#2A2A29] text-white"
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-accent text-white px-4 py-2 rounded">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
