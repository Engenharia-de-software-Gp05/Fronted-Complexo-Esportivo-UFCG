import * as React from "react";
import {
  Scheduler,
  MonthView,
  WeekView,
  Appointments,
  ViewSwitcher,
  Toolbar,
  TodayButton,
  AppointmentTooltip,
  ConfirmationDialog,
  AppointmentForm,
  DateNavigator,
  DragDropProvider,
} from "@devexpress/dx-react-scheduler-material-ui";

import { IntegratedEditing, ViewState } from "@devexpress/dx-react-scheduler";
import { Header, Content, CommandButton } from "./AppointmentTooltip";

import appointments from "./Data";
import AppointmentEditor from "./AppointmentEditor";
import { Alert, Snackbar } from "@mui/material";

const currentDate = "2024-03-24";

const StyledTimeTableCell = ({ schedulerHeight, ...props }) => {
  const schedulerHeaderHeight = 100;
  return (
    <MonthView.TimeTableCell
      {...props}
      style={{
        height: `${(schedulerHeight - schedulerHeaderHeight) / 6}px`,
      }}
    />
  );
};

const CustomScheduler = () => {
  const [data, setData] = React.useState(appointments);
  const schedulerRef = React.useRef(null);
  const [schedulerHeight, setSchedulerHeight] = React.useState(null);
  const [alert, setAlert] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert(false);
  };

  React.useEffect(() => {
    function updateSchedulerHeight() {
      if (schedulerRef.current) {
        const height = schedulerRef.current.clientHeight;
        setSchedulerHeight(height);
      }
    }

    updateSchedulerHeight();

    window.addEventListener("resize", updateSchedulerHeight);

    return () => {
      window.removeEventListener("resize", updateSchedulerHeight);
    };
  }, []);

  return (
    <div ref={schedulerRef} style={{ height: "100%" }}>
      <Snackbar
        open={alert}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleClose}
      >
        <Alert severity="error" variant="filled" onClose={handleClose}>
          Não foi possível criar o agendamento!
        </Alert>
      </Snackbar>
      {schedulerHeight && (
        <Scheduler data={data} height={schedulerHeight}>
          <ViewState
            defaultCurrentDate={currentDate}
            defaultCurrentViewName="Week"
          />
          <AppointmentEditor setData={setData} setAlert={setAlert} />
          <IntegratedEditing />
          <WeekView startDayHour={9} endDayHour={19} />
          <MonthView
            timeTableCellComponent={(props) => (
              <StyledTimeTableCell
                {...props}
                schedulerHeight={schedulerHeight}
              />
            )}
          />
          <ConfirmationDialog />
          <Toolbar />
          <DateNavigator />
          <ViewSwitcher />
          <TodayButton />
          <Appointments />
          <AppointmentTooltip
            showOpenButton
            showDeleteButton
            headerComponent={Header}
            contentComponent={Content}
            commandButtonComponent={CommandButton}
          />
          <AppointmentForm />
        </Scheduler>
      )}
    </div>
  );
};

export default CustomScheduler;
