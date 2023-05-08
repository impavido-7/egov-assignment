import { useEffect, useMemo, useState } from "react";

import { AppointmentList } from "../types";
import { getAppointmentDataForCalendarView } from "../utils";

type CalendarViewProps = {
  appointments: AppointmentList[];
};

const CalendarView = ({ appointments }: CalendarViewProps) => {
  const [
    enrichedAppointmentsForCalendarView,
    setEnrichedAppointmentsForCalendarView,
  ] = useState<any[]>([]);
  const componentData = useMemo(() => ({ keys: [] as string[] }), []);

  useEffect(() => {
    const data = getAppointmentDataForCalendarView(appointments);
    componentData.keys = data.keys;
    setEnrichedAppointmentsForCalendarView([...data.data]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointments]);

  return (
    <table className="mb-5 border-collapse border inline-block border-slate-400">
      <thead>
        <tr className="bg-gray-100">
          {componentData.keys.map((date, index) => {
            return (
              <th className="table-class" key={index}>
                {date}
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {enrichedAppointmentsForCalendarView.map((appointment, index) => {
          return (
            <tr key={index}>
              {componentData.keys.map((date, subindex) => {
                return (
                  <td className="table-class" key={`${index} - ${subindex}`}>
                    {appointment[date]}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CalendarView;
