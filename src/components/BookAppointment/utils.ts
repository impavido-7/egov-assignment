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
