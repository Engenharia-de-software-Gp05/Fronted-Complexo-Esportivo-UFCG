import { EditingState } from "@devexpress/dx-react-scheduler";
import { useState } from "react";

const AppointmentEditor = ({ setData, setAlert, userId }) => {
  const [addedAppointment, setAddedAppointment] = useState({});
  const [appointmentChanges, setAppointmentChanges] = useState({});
  const [editingAppointment, setEditingAppointment] = useState(undefined);

  const handleAddedAppointmentChange = (added) => {
    if (Object.keys(added).length > 0) {
      const { startDate, endDate } = added;
      endDate.setHours(startDate.getHours() + 2);

      const diffInMinutes = endDate.getMinutes() - startDate.getMinutes();

      if (diffInMinutes >= 30) {
        endDate.setMinutes(endDate.getMinutes() - 30);
      }
      const newAdded = { endDate: endDate, ...added };
      setAddedAppointment(newAdded);
    }
  };

  const checkOverlap = (newAppointment, existingAppointments) => {
    const sameDayAppointments = existingAppointments.filter((appointment) => {
      return (
        appointment.id !== newAppointment.userId &&
        appointment.startDate.getFullYear() ===
          newAppointment.startDate.getFullYear() &&
        appointment.startDate.getMonth() ===
          newAppointment.startDate.getMonth() &&
        appointment.startDate.getDate() ===
          newAppointment.startDate.getDate() &&
        appointment.endDate.getDate() === newAppointment.endDate.getDate()
      );
    });

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
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        const newAppointment = {
          id: startingAddedId,
          userId: userId,
          ...added,
        };
        if (!checkOverlap(newAppointment, data)) {
          data = [...data, newAppointment];
        } else {
          setAlert(true);
        }
      }
      if (changed) {
        const appointmentId = Object.keys(changed)[0];
        const checkChanged = {
          userId: Number(appointmentId),
          ...changed[appointmentId],
        };
        if (!checkOverlap(checkChanged, data)) {
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

  return (
    <EditingState
      onCommitChanges={commitChanges}
      addedAppointment={addedAppointment}
      onAddedAppointmentChange={handleAddedAppointmentChange}
      appointmentChanges={appointmentChanges}
      onAppointmentChangesChange={setAppointmentChanges}
      editingAppointment={editingAppointment}
      onEditingAppointmentChange={setEditingAppointment}
    />
  );
};

export default AppointmentEditor;
