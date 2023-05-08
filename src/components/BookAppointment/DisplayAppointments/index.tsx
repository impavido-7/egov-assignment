import { useState } from "react";
import { AppointmentList } from "../types";
import CalendarView from "./CalendarView";
import ListView from "./ListView";

const TAB_MENUS = {
  LIST_VIEW: "listView",
  CALENDAR_VIEW: "calendarView",
} as const;

type DisplayAppointmentsProps = {
  appointments: AppointmentList[];
};
type Keys = keyof typeof TAB_MENUS;
type values = (typeof TAB_MENUS)[Keys];

const DisplayAppointments = ({ appointments }: DisplayAppointmentsProps) => {
  const [menu, setMenu] = useState<values>(TAB_MENUS.LIST_VIEW);

  return (
    <div className="m-5 border shadow-lg">
      <div className="pb-5 cursor-pointer">
        <div
          onClick={() => {
            setMenu(TAB_MENUS.LIST_VIEW);
          }}
          className={
            menu === TAB_MENUS.LIST_VIEW
              ? "tab-menu-class tab-menu-selected"
              : "tab-menu-class"
          }
        >
          List View
        </div>
        <div
          onClick={() => {
            setMenu(TAB_MENUS.CALENDAR_VIEW);
          }}
          className={
            menu === TAB_MENUS.CALENDAR_VIEW
              ? "tab-menu-class tab-menu-selected"
              : "tab-menu-class"
          }
        >
          Calendar View
        </div>
      </div>
      <div className="text-center">
        {menu === TAB_MENUS.LIST_VIEW ? (
          <ListView appointments={appointments} />
        ) : (
          <>
            {appointments.length === 0 ? (
              <div className="mb-5 text-gray-500">
                {" "}
                No appointments scheduled yet{" "}
              </div>
            ) : (
              <CalendarView appointments={appointments} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DisplayAppointments;
