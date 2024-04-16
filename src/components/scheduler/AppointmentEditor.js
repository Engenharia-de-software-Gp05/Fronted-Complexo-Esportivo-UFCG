import { EditingState } from "@devexpress/dx-react-scheduler";

const AppointmentEditor = ({ setData, setAlert }) => {
  const checkOverlap = (newAppointment, existingAppointments) => {
    const appointmentId = Object.keys(newAppointment)[0];
    const sameDayAppointments = existingAppointments.filter((appointment) => {
      return (
        appointment.id !== Number(appointmentId) &&
        appointment.startDate.getFullYear() ===
          newAppointment[appointmentId].startDate.getFullYear() &&
        appointment.startDate.getMonth() ===
          newAppointment[appointmentId].startDate.getMonth() &&
        appointment.startDate.getDate() ===
          newAppointment[appointmentId].startDate.getDate() &&
        appointment.endDate.getDate() ===
          newAppointment[appointmentId].endDate.getDate()
      );
    });

    const alertBool = sameDayAppointments.some(
      (appointment) =>
        appointment.startDate < newAppointment[appointmentId].endDate &&
        appointment.endDate > newAppointment[appointmentId].startDate,
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
        } else {
          setAlert(true);
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
