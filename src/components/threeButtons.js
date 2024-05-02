import React, { useEffect, useState } from "react";
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

export default function ThreeButtons({ reserveDays }) {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "space-between", mt: 2, mb: 5 }}
    >
      <ButtonDay days={7} selected={reserveDays === 7} />
      <ButtonDay days={15} selected={reserveDays === 15} />
      <ButtonDay days={30} selected={reserveDays === 30} />
    </Box>
  );
}
