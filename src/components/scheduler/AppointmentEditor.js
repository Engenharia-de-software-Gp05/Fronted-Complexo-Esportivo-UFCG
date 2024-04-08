import { EditingState } from "@devexpress/dx-react-scheduler";

const AppointmentEditor = ({ setData, setAlert }) => {
  const checkOverlap = (newAppointment, existingAppointments) => {
    const sameDayAppointments = existingAppointments.filter(
      (appointment) =>
        appointment.startDate.getFullYear() ===
          newAppointment.startDate.getFullYear() &&
        appointment.startDate.getMonth() ===
          newAppointment.startDate.getMonth() &&
        appointment.startDate.getDate() ===
          newAppointment.startDate.getDate() &&
        appointment.endDate.getDate() === newAppointment.endDate.getDate(),
    );

    const alertBool = sameDayAppointments.some(
      (appointment) =>
        appointment.startDate < newAppointment.endDate &&
        appointment.endDate > newAppointment.startDate,
    );
    setAlert(alertBool);
    return alertBool;
  };

  const commitChanges = ({ added, changed, deleted }) => {
    setData((prevData) => {
      let data = prevData;
      if (added) {
        if (!checkOverlap(added, data)) {
          const startingAddedId =
            data.length > 0 ? data[data.length - 1].id + 1 : 0;
          data = [...data, { id: startingAddedId, ...added }];
        } else {
          setAlert(true);
        }
      }
      if (changed) {
        if (!checkOverlap(changed, data)) {
          data = data.map((appointment) =>
            changed[appointment.id]
              ? { ...appointment, ...changed[appointment.id] }
              : appointment,
          );
        }
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
      }
      return data;
    });
  };

  return <EditingState onCommitChanges={commitChanges} />;
};

export default AppointmentEditor;
