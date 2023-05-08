import { AppointmentList } from "../types";
import CalendarView from "./CalendarView";
import ListView from "./ListView";

type DisplayAppointmentsProps = {
  appointments: AppointmentList[];
};

const DisplayAppointments = ({ appointments }: DisplayAppointmentsProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-5 p-5">
      <div className="w-full lg:w-1/2">
        <ListView appointments={appointments} />
      </div>
      <div className="w-full lg:w-1/2">
        <CalendarView appointments={appointments} />
      </div>
    </div>
  );
};

export default DisplayAppointments;
