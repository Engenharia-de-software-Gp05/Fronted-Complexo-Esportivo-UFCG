import { Box, Button, Divider, Grid, Paper, Stack } from "@mui/material";
import SchedulerComponent from "../../components/scheduler/schedulerLayout";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const AgendamentosPage = () => {
  return (
    <Box
      height={"100vh"}
      display={"flex"}
      alignContent={"center"}
      justifyContent={"center"}
      alignItems={"center"}
      padding={"2%"}
    >
      <Grid
        container
        width={"95%"}
        height={"100%"}
        alignContent={"center"}
        justifyContent={"center"}
        spacing={2}
      >
        <Paper component={Grid} container item height={"100%"}>
          <Grid item xs={12} md={2}>
            <Stack display={"flex"} alignItems={"center"}>
              <Button variant="contained">Agendar</Button>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CalendarPicker />
              </LocalizationProvider>
            </Stack>
            <Divider />
          </Grid>
          <Grid item xs={12} md={10} height={"100%"}>
            <SchedulerComponent />
          </Grid>
        </Paper>
      </Grid>
    </Box>
  );
};

export default AgendamentosPage;
