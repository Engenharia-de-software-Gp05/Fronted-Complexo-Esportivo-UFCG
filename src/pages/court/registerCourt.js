import React, { useState } from "react";
import {
  Box,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";
import IosShareIcon from "@mui/icons-material/IosShare";
import ThreeButtons from "../../components/threeButtons";
import ButtonRegister from "../../components/buttonRegister";

export default function CadastrarQuadra() {
  const [fullName, setFullName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState("");
  const [reserveDay, setReserveDay] = useState("");

  const handleChangeDescription = (event) => {
    const newtext = event.target.value;
    if (newtext.length <= 500) {
      setDescription(newtext);
    }
  };

  const handleChangePhoto = (event) => {
    const selectedPhoto = event.target.files[0];
    setPhoto(selectedPhoto);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const body = {
        'name': "Quadra de vôlei 1",
        'reservationDuration': 120,
        'minimumIntervalBetweenReservation': 7
      }
      const url = window.REACT_APP_API_URL.concat('/court/create');

      const response = await fetch(url, {
        headers: {  
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        method: 'POST',
        body: JSON.stringify(body)
      });

      if (response.ok) {
        setFullName('');
        setPhoto(null);
        setDescription('');
        setReserveDay(7);
      } else {
        console.error('Falha ao cadastrar quadra:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao cadastrar quadra:', error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // alteração aqui
      }}
    >
      <Container component="section" maxWidth="xs" sx={{ py: 16 }}>
        {" "}
        {/* alteração aqui */}
        <CssBaseline />
        <Box sx={{ marginBottom: "20px", textAlign: "center" }}>
          <Typography variant="h5">Cadastro de Quadras</Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            margin="normal"
            label="Nome"
            placeholder="Quadra de vôlei"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SportsVolleyballIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Foto"
            placeholder="Insira aqui a foto"
            type="file"
            onChange={handleChangePhoto}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IosShareIcon />
                </InputAdornment>
              ),
            }}
          />
          <Typography variant="caption">Período de Agendamento</Typography>
          <Typography>Um usuário pode marcar a cada:</Typography>
          <Box>
            <ThreeButtons />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <ButtonRegister />
          </Box>
        </form>
      </Container>
    </Box>
  );
}
