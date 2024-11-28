import { Close } from "@mui/icons-material"
import { Appointment } from "../../pages/appointment"
import { useState } from "react"

interface AppointmentModalProps {
    onClose: () => void
    onSave: (appointment: Appointment) => void
    initialDate: Date
  }
  
  export default function AppointmentModal({ onClose, onSave, initialDate }: AppointmentModalProps) {
    const [appointment, setAppointment] = useState<Omit<Appointment, 'id'>>({
      patient: '',
      start: initialDate,
      end: new Date(initialDate.getTime() + 45 * 60000), 
      description: ''
    })
  
    const formatDateForInput = (date: Date) => {
      return date.toISOString().slice(0, 16)
    }
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      onSave({
        ...appointment,
        id: Date.now().toString()
      })
    }
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[#1A1A19] rounded-lg w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-accent">Nueva cita</h2>
            <button onClick={onClose} className="text-secondary hover:text-accent">
              <Close className="w-5 h-5" />
            </button>
          </div>
  
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Paciente
              </label>
              <input
                type="text"
                value={appointment.patient}
                onChange={(e) => setAppointment({ ...appointment, patient: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Hora inicio
              </label>
              <input
                type="datetime-local"
                value={formatDateForInput(appointment.start)}
                onChange={(e) => setAppointment({ 
                  ...appointment, 
                  start: new Date(e.target.value),
                  end: new Date(new Date(e.target.value).getTime() + 45 * 60000)
                })}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Hora fin
              </label>
              <input
                type="datetime-local"
                value={formatDateForInput(appointment.end)}
                onChange={(e) => setAppointment({ ...appointment, end: new Date(e.target.value) })}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Descripción
              </label>
              <textarea
                value={appointment.description}
                onChange={(e) => setAppointment({ ...appointment, description: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
              />
            </div>
  
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-accent transition-colors hover:text-white"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }