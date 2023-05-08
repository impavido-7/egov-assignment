import moment from "moment";
import { dateTimeFormatForUsers } from "../../../modules/constants";
import { Card } from "../../common";
import { AppointmentList } from "../types";

type ListViewProps = {
  appointments: AppointmentList[];
};

const ListView = ({ appointments }: ListViewProps) => {
  return (
    <Card title="List View">
      {appointments.length === 0 ? (
        <div> No appointments scheduled yet </div>
      ) : (
        <table className="border-collapse border border-slate-400">
          <thead>
            <tr className="bg-gray-100">
              <th className="table-class"> Title </th>
              <th className="table-class"> Start </th>
              <th className="table-class"> End </th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appointment, index) => {
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
    </Card>
  );
};

export default ListView;
