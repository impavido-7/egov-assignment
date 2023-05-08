import { useEffect, useState } from "react";
import moment from "moment";

import { dateFormat, dateTimeLocalFormat } from "../../../modules/constants";
import { Card, DateTimePicker } from "../../common";
import { AppointmentList } from "../types";

type CalendarViewProps = {
  appointments: AppointmentList[];
};

const CalendarView = ({ appointments }: CalendarViewProps) => {
  const [datePicked, setDatePicked] = useState(
    moment().format(dateTimeLocalFormat)
  );
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
    <Card title="Calendar View">
      <DateTimePicker
        label="Calendar"
        value={datePicked ? new Date(datePicked) : undefined}
        onDateTimeChange={(e) => {
          setDatePicked(moment(e).format(dateFormat));
        }}
        isDatePicker
      />
      <div className="text-gray-500 pt-5">
        {filteredAppointments.length === 0 ? (
          <div> No appointments scheduled yet </div>
        ) : (
          <div>
            {filteredAppointments.map((appointment, index) => {
              return (
                <div key={index}>
                  <span> {appointment.title} </span>
                  {" - "}
                  <span> {moment(appointment.from).format("hh:mm a")} </span>
                  {" to "}
                  <span> {moment(appointment.to).format("hh:mm a")} </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Card>
  );
};

export default CalendarView;
