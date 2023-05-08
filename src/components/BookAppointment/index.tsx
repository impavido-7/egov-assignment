import { useCallback, useMemo, useState } from "react";
import moment from "moment";

import { Button, Card, DateTimePicker, Input, Modal } from "../common";

import DisplayAppointments from "./DisplayAppointments";

import {
  checkIfDateRangeSelectedIsConflicted,
  getSortedAppointmentsAndDurationGap,
} from "./utils";

import {
  dateTimeFormatForUsers,
  dateTimeLocalFormat,
} from "../../modules/constants";

import { AppointmentList } from "./types";

const iniitalList = [
  {
    title: "Appointment 1",
    from: moment().add(1, "hour").valueOf(),
    to: moment().add(1, "hour").add(30, "minutes").valueOf(),
  },
  {
    title: "Appoitnment 2",
    from: moment().add(1, "hour").add(30, "minutes").valueOf(),
    to: moment().add(2, "hour").valueOf(),
  },
  {
    title: "Appointment 3",
    from: moment().add(2, "hour").add(15, "minutes").valueOf(),
    to: moment().add(2, "hour").add(45, "minutes").valueOf(),
  },
  {
    title: "Appointment 4",
    from: moment().add(4, "hour").valueOf(),
    to: moment().add(5, "hour").valueOf(),
  },
];

const sortedInitialList = getSortedAppointmentsAndDurationGap(iniitalList);

const BookAppointment = () => {
  const componentData = useMemo(() => {
    return {
      initialSelectedAppointment: {
        title: "",
        to: 0,
        from: 0,
      } as AppointmentList,
      durationMap: sortedInitialList.durationGap as number[],
      timeRangeSuggestion: {
        start: "",
        end: "",
      },
    };
  }, []);

  // State to store the user provided values
  const [currentAppointment, setCurrentAppointment] = useState(
    componentData.initialSelectedAppointment
  );

  // State to store the list of appointments
  const [appointments, setAppointments] = useState<AppointmentList[]>(
    sortedInitialList.sortedAppointments
  );

  // To show/hide the modal
  const [showModal, setShowModal] = useState(false);

  // To set the values of the state as provided by the user
  const setValues = useCallback((key: string, value: string | number) => {
    setCurrentAppointment((prevValue) => ({
      ...prevValue,
      [key]: value,
    }));
  }, []);

  // This will add the new appointment to the appointments list
  const updateAppointments = useCallback(
    (updatedAppointments: AppointmentList[]) => {
      const sortedAppointmentsAndDurationGap =
        getSortedAppointmentsAndDurationGap(updatedAppointments);
      setAppointments([...sortedAppointmentsAndDurationGap.sortedAppointments]);
      componentData.durationMap = sortedAppointmentsAndDurationGap.durationGap;
      setCurrentAppointment({ ...componentData.initialSelectedAppointment });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const bookAppointment = () => {
    if (
      !currentAppointment.from ||
      !currentAppointment.title ||
      !currentAppointment.to
    ) {
      return;
    }

    const isAppointmentOverlapping = checkIfDateRangeSelectedIsConflicted(
      currentAppointment,
      appointments
    );

    if (isAppointmentOverlapping) {
      const currDifference = currentAppointment.to - currentAppointment.from;

      const firstAppointment = appointments.findIndex(
        (a) => a.from >= new Date().getTime()
      );

      let availableSlot = -1;
      for (
        let i = firstAppointment;
        i < componentData.durationMap.length;
        i += 1
      ) {
        if (componentData.durationMap[i] >= currDifference) {
          availableSlot = i;
          break;
        }
      }

      let suggestionTimeForStart;
      if (availableSlot > -1) {
        // A slot is available within the specified date range
        suggestionTimeForStart = appointments[availableSlot].to;
      } else {
        // The slots available are not within the date range
        suggestionTimeForStart = appointments[appointments.length - 1].to;
      }
      componentData.timeRangeSuggestion = {
        start: moment(suggestionTimeForStart).format(dateTimeFormatForUsers),
        end: moment(suggestionTimeForStart + currDifference).format(
          dateTimeFormatForUsers
        ),
      };
      setShowModal(true);
    } else {
      // As the data isn't conflicting we will add the appointment
      const tempAppointments = [...appointments];
      tempAppointments.push(currentAppointment);
      updateAppointments(tempAppointments);
    }
  };

  const proccedWithSuggestedTime = () => {
    const tempAppointments = [...appointments];
    tempAppointments.push({
      title: currentAppointment.title,
      from: new Date(componentData.timeRangeSuggestion.start).getTime(),
      to: new Date(componentData.timeRangeSuggestion.end).getTime(),
    });
    updateAppointments(tempAppointments);
  };

  return (
    <>
      <div className="w-full m-auto p-5">
        <Card title="Book a new appointment">
          <div className="flex flex-col gap-5">
            <Input
              label="Title"
              placeholder="Title"
              value={currentAppointment.title}
              onChange={(e) => {
                setValues("title", e);
              }}
            />

            <DateTimePicker
              label="Start Date & Time"
              value={
                currentAppointment.from
                  ? new Date(currentAppointment.from)
                  : undefined
              }
              onDateTimeChange={(e) => {
                if (new Date().getTime() > new Date(e).getTime()) {
                  setValues("from", new Date().getTime());
                } else {
                  setValues("from", new Date(e).getTime());
                }
              }}
              min={moment().format(dateTimeLocalFormat)}
            />

            <DateTimePicker
              label="End Date & Time"
              value={
                currentAppointment.to
                  ? new Date(currentAppointment.to)
                  : undefined
              }
              onDateTimeChange={(e) => {
                if (
                  new Date(currentAppointment.from).getTime() >
                  new Date(e).getTime()
                ) {
                  setValues("to", new Date(currentAppointment.from).getTime());
                } else {
                  setValues("to", new Date(e).getTime());
                }
              }}
              min={
                currentAppointment.from
                  ? moment(currentAppointment.from).format(dateTimeLocalFormat)
                  : undefined
              }
            />

            <Button onClick={bookAppointment}>Book Appointment</Button>
          </div>
        </Card>
      </div>

      <Modal
        title="Appointment Overlapper"
        visible={showModal}
        onClose={() => setShowModal(false)}
        onProceed={proccedWithSuggestedTime}
      >
        <>
          <div>
            The time you selected for the appointment had been overlapped with
            the other appointments. Would you like to set the meeting at{" "}
            <span className="font-bold">
              {" "}
              {componentData.timeRangeSuggestion.start}{" "}
            </span>{" "}
            to{" "}
            <span className="font-bold">
              {" "}
              {componentData.timeRangeSuggestion.end}{" "}
            </span>
          </div>
        </>
      </Modal>

      <DisplayAppointments appointments={appointments} />
    </>
  );
};

export default BookAppointment;
