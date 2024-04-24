import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Grow,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Scheduler = ({ selectItem }) => {
  const [isButtonsAvailable, setIsButtonAvailable] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
    if (!newValue) {
      setIsButtonAvailable(false);
    }
    setIsButtonAvailable(true);
  };

  const renderTimeButtons = () => {
    return Array.from(
      { length: Math.ceil((20 * 60 - 8 * 60 + 1) / 90) },
      (_, index) => {
        const hour = 8 * 60 + index * 90;
        const paddedHour = Math.floor(hour / 60)
          .toString()
          .padStart(2, "0");
        const paddedMinute = (hour % 60).toString().padStart(2, "0");

        return (
          <Grid item key={index}>
            <Grow
              in={isButtonsAvailable}
              unmountOnExit
              style={{ transformOrigin: "0 0 0" }}
              {...(isButtonsAvailable ? { timeout: 1000 } : {})}
            >
              <Button variant="outlined" xs={6} sm={3} md={2}>
                {`${paddedHour}:${paddedMinute}`}
              </Button>
            </Grow>
          </Grid>
        );
      },
    );
  };

  return (
    <Card>
      <CardMedia
        component={"img"}
        image={"https://via.placeholder.com/554x396"}
      />
      <CardContent>
        <Grid container spacing={2} justifyContent={"center"}>
          <Grid item xs={12}>
            <Typography variant="h6">
              {selectItem ? selectItem.courtName : "Title"}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
            </Typography>
          </Grid>
          <Grid item alignItems={"center"}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                renderInput={(inputProps) => (
                  <TextField {...inputProps} variant="outlined" />
                )}
                value={selectedDate}
                onChange={handleDateChange}
                views={["day"]}
                inputFormat="DD/MM/YYYY"
                disablePast
                maxDate={
                  new Date(
                    new Date().getFullYear(),
                    new Date().getMonth() + 1,
                    0,
                  )
                }
              />
            </LocalizationProvider>
          </Grid>
          <Grid item>
            <Grid container justifyContent="center" spacing={3}>
              {renderTimeButtons()}
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button variant="contained">Agendar</Button>
      </CardActions>
    </Card>
  );
};

export default Scheduler;
