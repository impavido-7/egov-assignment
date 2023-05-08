import moment from "moment";

import { dateFormat, timeFormat } from "../../modules/constants";
import { AppointmentList } from "./types";

export const checkIfDateRangeSelectedIsConflicted = (
  currentAppointment: AppointmentList,
  appointmentsList: AppointmentList[]
): boolean => {
  const selectedStartDate = currentAppointment.from;
  const selectedEndDate = currentAppointment.to;

  for (let i = 0; i < appointmentsList.length; i += 1) {
    const appointmentStartDate = appointmentsList[i].from;
    const appointmentEndDate = appointmentsList[i].to;

    if (
      (selectedStartDate >= appointmentStartDate &&
        selectedStartDate < appointmentEndDate) ||
      (selectedEndDate > appointmentStartDate &&
        selectedEndDate <= appointmentEndDate) ||
      (appointmentStartDate >= selectedStartDate &&
        appointmentStartDate < selectedEndDate) ||
      (appointmentEndDate > selectedStartDate &&
        appointmentEndDate <= selectedEndDate)
    ) {
      return true;
    }
  }
  return false;
};

const getDurationGapBetweenAppointments = (
  appointmentsList: AppointmentList[]
): number[] => {
  const durationGapArray: number[] = [];
  for (let i = 0; i < appointmentsList.length - 1; i += 1) {
    const nextAppointmentStartDate = appointmentsList[i + 1].from;
    const currentAppointmentEndDate = appointmentsList[i].to;
    durationGapArray.push(nextAppointmentStartDate - currentAppointmentEndDate);
  }
  durationGapArray.push(-1);
  return durationGapArray;
};

const sortAppointmentsByStartDate = (
  appointmentsList: AppointmentList[]
): AppointmentList[] => {
  return appointmentsList.sort((a, b) => {
    return a.from - b.from;
  });
};

export const getSortedAppointmentsAndDurationGap = (
  appointmentsList: AppointmentList[]
) => {
  const sortedAppointments = sortAppointmentsByStartDate(appointmentsList);
  return {
    sortedAppointments,
    durationGap: getDurationGapBetweenAppointments(sortedAppointments),
  };
};

export const groupBy = (key: string) => (array: any[]) =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

export const getAppointmentDataForCalendarView = (
  appointments: AppointmentList[]
) => {
  const enrichedAppointments = appointments.map((appointment) => ({
    ...appointment,
    startDate: moment(appointment.from).format(dateFormat),
  }));

  const groupedBy = groupBy("startDate")(enrichedAppointments);

  const dateMap = {};
  let maxLength = -1;
  Object.keys(groupedBy).forEach((appointment) => {
    maxLength = Math.max(maxLength, groupedBy[appointment].length);
    Object.assign(dateMap, {
      [appointment]: { title: appointment, count: -1 },
    });
  });

  type dateMapProp = {
    title: string;
    count: number;
  };

  const data = new Array(maxLength).fill(null);

  Object.keys(groupedBy).forEach((appointmentDate) => {
    groupedBy[appointmentDate].forEach((iappointment: AppointmentList) => {
      const obj = dateMap[
        appointmentDate as keyof typeof dateMap
      ] as dateMapProp;
      if (obj) {
        obj.count += 1;
        data[obj.count] = {
          ...data[obj.count],
          [appointmentDate]: `${moment(iappointment.from).format(timeFormat)} - 
            ${moment(iappointment.to).format(timeFormat)}`,
        };
      }
    });
  });

  return {
    keys: Object.keys(groupedBy),
    data,
  };
};
