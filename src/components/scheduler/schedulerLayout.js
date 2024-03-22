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
} from "@devexpress/dx-react-scheduler-material-ui";

import { ViewState } from "@devexpress/dx-react-scheduler";
import { Header, Content, CommandButton } from "./AppointmentTooltip";

import appointments from "./Data";

const currentDate = "2024-03-01";
const schedulerHeaderHeight = 100; // static value

const SchedulerComponent = () => {
  const [data, setData] = React.useState(appointments);
  const schedulerRef = React.useRef(null);
  const [schedulerHeight, setSchedulerHeight] = React.useState(null);

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

  const TimeTableCell = (props) => {
    return (
      <MonthView.TimeTableCell
        {...props}
        style={{
          height: `${(schedulerHeight - schedulerHeaderHeight) / 6}px`,
        }}
      />
    );
  };

  return (
    <div ref={schedulerRef} style={{ height: "100%" }}>
      {schedulerHeight && (
        <Scheduler data={data} height={schedulerHeight}>
          <ViewState
            defaultCurrentDate={currentDate}
            defaultCurrentViewName="Month"
          />
          <WeekView startDayHour={9} endDayHour={19} />
          <MonthView timeTableCellComponent={TimeTableCell} />
          <Toolbar />
          <ViewSwitcher />
          <TodayButton />
          <Appointments />
          <AppointmentTooltip
            headerComponent={Header}
            contentComponent={Content}
            commandButtonComponent={CommandButton}
          />
        </Scheduler>
      )}
    </div>
  );
};

export default SchedulerComponent;
