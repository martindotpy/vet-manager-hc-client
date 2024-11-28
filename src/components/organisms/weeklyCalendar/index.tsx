import { Appointment } from "../../pages/appointment";

interface WeeklyCalendarProps {
  appointments: Appointment[];
  currentWeek: Date;
}
export default function WeeklyCalendar({
  appointments,
  currentWeek,
}: WeeklyCalendarProps) {
  const hours = Array.from({ length: 9 }, (_, i) => i + 8);

  const getWeekDays = () => {
    const days = [];
    const startOfWeek = new Date(currentWeek);
    startOfWeek.setDate(currentWeek.getDate() - currentWeek.getDay());
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const weekDays = getWeekDays();
  const dayNames = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];

  const getAppointmentsForSlot = (date: Date, hour: number) => {
    return appointments.filter((appointment) => {
      const appointHour = appointment.start.getHours();
      return (
        appointment.start.getDate() === date.getDate() &&
        appointment.start.getMonth() === date.getMonth() &&
        appointment.start.getFullYear() === date.getFullYear() &&
        appointHour === hour
      );
    });
  };

  return (
    <div className="overflow-x-auto ">
      <div className="w-auto">
        <div className="grid grid-cols-8 border-b border-gray-200">
          <div className="p-4"></div>
          {weekDays.map((date, index) => (
            <div
              key={date.toISOString()}
              className="p-4 text-center border-l border-gray-200 text-accent font-semibold"
            >
              {dayNames[index]} {date.getDate().toString().padStart(2, "0")}
            </div>
          ))}
        </div>

        {hours.map((hour) => (
          <div key={hour} className="grid grid-cols-8 border-b border-gray-200">
            <div className="p-4 text-right text-sm text-gray-500">
              {`${hour.toString().padStart(2, "0")}:00`}
            </div>
            {weekDays.map((date) => {
              const slotAppointments = getAppointmentsForSlot(date, hour);
              return (
                <div
                  key={`${date.toISOString()}-${hour}`}
                  className="w-auto border-l border-gray-200 p-1 h-20"
                >
                  {slotAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="text-xs p-1 mb-1 bg-blue-100 text-accent rounded"
                    >
                      {appointment.patient}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
