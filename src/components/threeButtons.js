import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const ButtonDay = ({ days, selected, onClick }) => {
  return (
    <Button
      variant={selected ? 'contained' : 'outlined'}
      onClick={onClick}
      sx={{ borderRadius: '20px', width: '110px', textTransform: 'none' }}
    >
      {days} dias
    </Button>
  );
};

export default function ThreeButtons() {
  const [reserveDays, setReserveDays] = useState(null);

  const handleSelectDiasReserva = (days) => {
    setReserveDays(days);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, mb: 5 }}>
      <ButtonDay days={7} selected={reserveDays === 7} onClick={() => handleSelectDiasReserva(7)} />
      <ButtonDay days={15} selected={reserveDays === 15} onClick={() => handleSelectDiasReserva(15)} />
      <ButtonDay days={30} selected={reserveDays === 30} onClick={() => handleSelectDiasReserva(30)} />
    </Box>
  );
}
