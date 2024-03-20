import React from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import SchedulerComponent from "../../components/schedulerLayout";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const AgendamentosPage = () => {
  return (
    <Box
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Drawer>Teste</Drawer>
      <Paper sx={{ height: "95%", margin: "1.5%" }}>
        <Grid container width={"100%"} height={"100%"}>
          <Grid item xs={10} md={3} padding={"2%"}>
            <Stack display={"flex"} alignItems={"center"} spacing={4}>
              <Button variant="contained">Agendar</Button>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar />
              </LocalizationProvider>
            </Stack>
            <Divider />
          </Grid>
          <Grid item md={9} height={"100%"}>
            <SchedulerComponent />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default AgendamentosPage;
