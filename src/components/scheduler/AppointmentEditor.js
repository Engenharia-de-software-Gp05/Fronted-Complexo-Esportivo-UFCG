import { EditingState } from "@devexpress/dx-react-scheduler";

const AppointmentEditor = ({ datas, setData }) => {
  const commitChanges = ({ added, changed, deleted }) => {
    setData((prevData) => {
      let data = prevData;
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment,
        );
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
