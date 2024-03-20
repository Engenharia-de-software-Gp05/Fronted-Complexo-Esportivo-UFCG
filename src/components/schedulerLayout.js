import * as React from "react";
import {
  Scheduler,
  MonthView,
  WeekView,
  Appointments,
  ViewSwitcher,
  Toolbar,
  DateNavigator,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";

import { ViewState } from "@devexpress/dx-react-scheduler";

const currentDate = "2024-03-01";
const appointments = [
  {
    title: "Website Re-Design Plan",
    startDate: new Date(2024, 2, 23, 9, 30),
    endDate: new Date(2024, 2, 23, 11, 30),
  },
  {
    title: "Book Flights to San Fran for Sales Trip",
    startDate: new Date(2024, 2, 23, 12, 0),
    endDate: new Date(2024, 2, 23, 13, 0),
  },
  {
    title: "Install New Router in Dev Room",
    startDate: new Date(2024, 2, 23, 14, 30),
    endDate: new Date(2024, 2, 23, 15, 30),
  },
  {
    title: "Approve Personal Computer Upgrade Plan",
    startDate: new Date(2024, 2, 24, 10, 0),
    endDate: new Date(2024, 2, 24, 11, 0),
  },
  {
    title: "Final Budget Review",
    startDate: new Date(2024, 2, 24, 12, 0),
    endDate: new Date(2024, 2, 24, 13, 35),
  },
  {
    title: "New Brochures",
    startDate: new Date(2024, 2, 24, 14, 30),
    endDate: new Date(2024, 2, 24, 15, 45),
  },
  {
    title: "Install New Database",
    startDate: new Date(2024, 2, 25, 9, 45),
    endDate: new Date(2024, 2, 25, 11, 15),
  },
  {
    title: "Approve New Online Marketing Strategy",
    startDate: new Date(2024, 2, 25, 12, 0),
    endDate: new Date(2024, 2, 25, 14, 0),
  },
  {
    title: "Upgrade Personal Computers",
    startDate: new Date(2024, 2, 25, 15, 15),
    endDate: new Date(2024, 2, 25, 16, 30),
  },
  {
    title: "Customer Workshop",
    startDate: new Date(2024, 2, 26, 11, 0),
    endDate: new Date(2024, 2, 26, 12, 0),
  },
  {
    title: "Prepare 2015 Marketing Plan",
    startDate: new Date(2024, 2, 26, 11, 0),
    endDate: new Date(2024, 2, 26, 13, 30),
  },
  {
    title: "Brochure Design Review",
    startDate: new Date(2024, 2, 26, 14, 0),
    endDate: new Date(2024, 2, 26, 15, 30),
  },
  {
    title: "Create Icons for Website",
    startDate: new Date(2024, 2, 27, 10, 0),
    endDate: new Date(2024, 2, 27, 11, 30),
  },
  {
    title: "Upgrade Server Hardware",
    startDate: new Date(2024, 2, 27, 14, 30),
    endDate: new Date(2024, 2, 27, 16, 0),
  },
  {
    title: "Submit New Website Design",
    startDate: new Date(2024, 2, 27, 16, 30),
    endDate: new Date(2024, 2, 27, 18, 0),
  },
  {
    title: "Launch New Website",
    startDate: new Date(2024, 2, 26, 12, 20),
    endDate: new Date(2024, 2, 26, 14, 0),
  },
  {
    title: "Website Re-Design Plan",
    startDate: new Date(2024, 2, 16, 9, 30),
    endDate: new Date(2024, 2, 16, 15, 30),
  },
  {
    title: "Book Flights to San Fran for Sales Trip",
    startDate: new Date(2024, 2, 16, 12, 0),
    endDate: new Date(2024, 2, 16, 13, 0),
  },
  {
    title: "Install New Database",
    startDate: new Date(2024, 2, 17, 15, 45),
    endDate: new Date(2024, 2, 18, 12, 15),
  },
  {
    title: "Approve New Online Marketing Strategy",
    startDate: new Date(2024, 2, 18, 12, 35),
    endDate: new Date(2024, 2, 18, 14, 15),
  },
  {
    title: "Upgrade Personal Computers",
    startDate: new Date(2024, 2, 19, 15, 15),
    endDate: new Date(2024, 2, 20, 20, 30),
  },
  {
    title: "Prepare 2015 Marketing Plan",
    startDate: new Date(2024, 2, 20, 20, 0),
    endDate: new Date(2024, 2, 20, 13, 30),
  },
  {
    title: "Brochure Design Review",
    startDate: new Date(2024, 2, 20, 14, 10),
    endDate: new Date(2024, 2, 20, 15, 30),
  },
  {
    title: "Vacation",
    startDate: new Date(2024, 5, 22),
    endDate: new Date(2024, 2, 1),
  },
  {
    title: "Vacation",
    startDate: new Date(2024, 2, 28),
    endDate: new Date(2024, 7, 7),
  },
];

const schedulerHeaderHeight = 100; // static value
// const schedulerHeight = 900; // value can be calculated aftrer first render

const SchedulerComponent = () => {
  const schedulerRef = React.useRef(null);
  const [schedulerHeight, setSchedulerHeight] = React.useState(null);

  React.useEffect(() => {
    function updateSchedulerHeight() {
      if (schedulerRef.current) {
        const height = schedulerRef.current.clientHeight;
        console.log("Altura do Scheduler: ", height);
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
        <Scheduler data={appointments} height={schedulerHeight}>
          <ViewState
            defaultCurrentDate={currentDate}
            defaultCurrentViewName="Month"
          />
          <WeekView startDayHour={9} endDayHour={19} />
          <MonthView timeTableCellComponent={TimeTableCell} />
          <Toolbar />
          <ViewSwitcher />
          <DateNavigator />
          <TodayButton />
          <Appointments />
        </Scheduler>
      )}
    </div>
  );
};

export default SchedulerComponent;
