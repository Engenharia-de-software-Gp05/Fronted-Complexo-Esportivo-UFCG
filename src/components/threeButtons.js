import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const ButtonDay = ({ days, selected, onClick, disabled }) => {
  return (
    <Button
      variant={selected ? "contained" : "outlined"}
      onClick={onClick}
      disabled={disabled}
      sx={{
        borderRadius: "20px",
        width: "95px",
        textTransform: "none",
        backgroundColor: disabled
          ? "#E0E0E0"
          : selected
            ? "854c32"
            : "transparent",
        color: disabled ? "#9E9E9E" : selected ? "#FFF" : "#1976D2",
      }}
    >
      {days} dias
    </Button>
  );
};

export default function ThreeButtons() {
  const [reserveDays, setReserveDays] = useState(7);

  const handleSelectDiasReserva = (days) => {
    setReserveDays(days);
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "space-between", mt: 2, mb: 5 }}
    >
      <ButtonDay
        days={7}
        selected={reserveDays === 7}
        onClick={() => handleSelectDiasReserva(7)}
      />
      <ButtonDay
        days={15}
        selected={false}
        onClick={() => handleSelectDiasReserva(7)}
        disabled={true}
      />
      <ButtonDay
        days={30}
        selected={false}
        onClick={() => handleSelectDiasReserva(7)}
        disabled={true}
      />
    </Box>
  );
}
