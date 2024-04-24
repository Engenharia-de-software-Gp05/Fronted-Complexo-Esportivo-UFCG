import React, { useEffect, useState } from "react";
import {
  Drawer,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Collapse,
  Button,
  Box,
  Grid,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CloseOutlined } from "@mui/icons-material";

const locations = ["Location A", "Location B", "Location C"];
const times = [
  "8:00",
  "9:30",
  "11:00",
  "12:30",
  "14:00",
  "15:30",
  "17:00",
  "18:30",
  "20:00",
];

const AppointmentForm = ({ isDrawerOpen, onClose }) => {
  const [location, setLocation] = useState(null);
  const [time, setTime] = useState(null);
  const [dateOpen, setDateOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (!isDrawerOpen) {
      setLocation(null);
      setTime(null);
      setDateOpen(false);
      setTimeOpen(false);
      setSelectedDate(null);
    }
  }, [isDrawerOpen]);

  useEffect(() => {
    setIsFormValid(location && selectedDate && time);
  }, [location, selectedDate, time]);

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
    if (!newValue) {
      setTimeOpen(false);
    }
    setTimeOpen(true);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    setDateOpen(true);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      PaperProps={{ sx: { width: "30%" } }}
      onClose={onClose}
    >
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
        padding
      >
        <Typography variant="h5" color={"primary"} fontWeight={500}>
          Novo Agendamento
        </Typography>
        <IconButton onClick={onClose}>
          <CloseOutlined />
        </IconButton>
      </Box>
      <Divider />
      <Grid container spacing={2} padding={3}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <Typography variant="body1">Local</Typography>
            <Select
              value={location}
              onChange={handleLocationChange}
              displayEmpty
              sx={{ minWidth: "100%" }}
            >
              <MenuItem value={null}>Local</MenuItem>
              {locations.map((loc) => (
                <MenuItem key={loc} value={loc}>
                  {loc}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Collapse in={dateOpen}>
            <Typography variant="body1">Dia</Typography>
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
          </Collapse>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Collapse in={timeOpen}>
            <Typography variant="body1">Horário</Typography>

            <Select
              value={time}
              onChange={handleTimeChange}
              displayEmpty
              style={{ minWidth: 100 }}
            >
              <MenuItem value="">--:--</MenuItem>
              {times.map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </Select>
          </Collapse>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" disabled={!isFormValid}>
            Salvar
          </Button>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default AppointmentForm;
