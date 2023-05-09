import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import daygrid from "@fullcalendar/daygrid";

import { AppointmentList } from "../types";

type CalendarViewProps = {
  appointments: AppointmentList[];
};

const CalendarView = ({ appointments }: CalendarViewProps) => {
  const [
    enrichedAppointmentsForCalendarView,
    setEnrichedAppointmentsForCalendarView,
  ] = useState<any[]>([]);

  useEffect(() => {
    const tempAppointments = appointments.map((appointment) => ({
      id: appointment.from,
      title: appointment.title,
      start: appointment.from,
      end: appointment.to,
    }));
    setEnrichedAppointmentsForCalendarView([...tempAppointments]);
  }, [appointments]);

  return (
    <div className="p-5">
      <FullCalendar
        eventDidMount={(info) => {
          info.el.setAttribute("title", info.event.title);
        }}
        plugins={[daygrid]}
        initialView="dayGridMonth"
        events={enrichedAppointmentsForCalendarView}
      />
    </div>
  );
};

export default CalendarView;
