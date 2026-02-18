
import { Staff, Appointment, AppointmentStatus } from '../types';

export const calculateAvailableSlots = (
  staff: Staff,
  date: Date,
  serviceDuration: number,
  existingAppointments: Appointment[],
  bufferTime: number = 15
): string[] => {
  const weekday = date.getDay();
  
  // Rule: Closed Every Monday (Day 1)
  if (weekday === 1) return [];

  const schedule = staff.workingHours.find(h => h.day === weekday);
  if (!schedule || !schedule.isOpen) return [];

  // Parse start time (e.g., "08:30")
  const [startHour, startMin] = schedule.start.split(':').map(Number);
  const [endHour, endMin] = schedule.end.split(':').map(Number);

  const dayStart = new Date(date);
  dayStart.setHours(startHour, startMin, 0, 0);

  const dayEnd = new Date(date);
  dayEnd.setHours(endHour, endMin, 0, 0);

  const availableSlots: string[] = [];
  const slotInterval = 15;

  for (let t = dayStart.getTime(); t + (serviceDuration * 60000) <= dayEnd.getTime(); t += (slotInterval * 60000)) {
    const slotStart = new Date(t);
    const slotEnd = new Date(t + (serviceDuration * 60000));
    
    const isConflict = existingAppointments.some(appt => {
      if (appt.staffId !== staff.id || appt.status === AppointmentStatus.CANCELLED || appt.status === AppointmentStatus.NO_SHOW) return false;
      
      const apptStart = new Date(appt.startTime).getTime();
      const apptEnd = new Date(appt.endTime).getTime();
      
      const slotEndWithBuffer = slotEnd.getTime() + (bufferTime * 60000);
      return (slotStart.getTime() < apptEnd) && (slotEndWithBuffer > apptStart);
    });

    if (!isConflict) {
      availableSlots.push(slotStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    }
  }

  return availableSlots;
};
