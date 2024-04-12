import { Box, Button, ButtonGroup, SvgIcon } from "@mui/material";
import React, { useState } from "react";

const CheckIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M9 16.2l-3.5-3.5L4 14l5 5 9-9-1.4-1.4z" />
  </SvgIcon>
);

export default function ToggleButtons() {
  const [selected, setSelected] = useState("Disponível");

  const handleButtonClick = (value) => {
    setSelected(value === selected ? null : value);
  };

  return (
    <Box>
      <ButtonGroup disableElevation variant="contained" aria-label="Toggle button group">
        <Button
          onClick={() => handleButtonClick("Disponível")}
          variant={selected === "Disponível" ? "contained" : "outlined"}
          startIcon={selected === "Disponível" ? <CheckIcon /> : null}
          sx={{ borderRadius: '20px', textTransform: 'none', width: '50%'  }}
        >
          Disponível
        </Button>
        <Button
          onClick={() => handleButtonClick("Indisponível")}
          variant={selected === "Indisponível" ? "contained" : "outlined"}
          startIcon={selected === "Indisponível" ? <CheckIcon /> : null}
          sx={{ borderRadius: '20px', textTransform: 'none', width: '50%'  }}
        >
          Indisponível
        </Button>
      </ButtonGroup>
    </Box>
  );
}
