import { useEffect, useState } from "react";
import moment from "moment";

import { DateTimePicker } from "../../common";
import { AppointmentList } from "../types";
import { dateFormat, dateTimeFormatForUsers } from "../../../modules/constants";

type ListViewProps = {
  appointments: AppointmentList[];
};

const ListView = ({ appointments }: ListViewProps) => {
  const [datePicked, setDatePicked] = useState(moment().format(dateFormat));
  const [filteredAppointments, setFilteredAppointments] =
    useState(appointments);

  useEffect(() => {
    const tempFilteredAppointments = appointments.filter((appointment) => {
      if (
        moment(appointment.from).format(dateFormat) ===
        moment(datePicked).format(dateFormat)
      ) {
        return true;
      }
      return false;
    });
    setFilteredAppointments([...tempFilteredAppointments]);
  }, [appointments, datePicked]);

  return (
    <div>
      <div className="flex gap-2 mb-5 text-gray-500 justify-center items-center">
        <div> Appointments as of: </div>
        <DateTimePicker
          value={datePicked ? new Date(datePicked) : undefined}
          onDateTimeChange={(e) => {
            setDatePicked(moment(e).format());
          }}
          isDatePicker
        />
      </div>
      {filteredAppointments.length === 0 ? (
        <div className="mb-5 text-gray-500">
          {" "}
          No appointments scheduled yet{" "}
        </div>
      ) : (
        <table className="mb-5 border-collapse border inline-block border-slate-400">
          <thead>
            <tr className="bg-gray-100">
              <th className="table-class"> Title </th>
              <th className="table-class"> Start </th>
              <th className="table-class"> End </th>
            </tr>
          </thead>

          <tbody>
            {filteredAppointments.map((appointment, index) => {
              return (
                <tr key={index}>
                  <td className="table-class"> {appointment.title} </td>
                  <td className="table-class">
                    {moment(appointment.from).format(dateTimeFormatForUsers)}
                  </td>
                  <td className="table-class">
                    {moment(appointment.to).format(dateTimeFormatForUsers)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListView;
