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
  const [reserveDay, setReserveDay] = useState("");

  const handleChangePhoto = (event) => {
    const selectedPhoto = event.target.files[0];
    setPhoto(selectedPhoto);
  };

  const handleSelectReserveDay = (day) => {
    setReserveDay(day);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const body = {
        fullName: fullName,
        photo: photo,
        reserveDay: reserveDay,
      };

      const url = window.REACT_APP_API_URL.concat("/register-court");
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
      });

      console.log(body)
      if (response.ok) {
        setFullName('');
        setPhoto(null);
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
        minHeight: "100vh",
      }}
    >
      <Container component="section" maxWidth="xs" sx={{ py: 16 }}>
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
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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
          <ThreeButtons reserveDays={reserveDay} onSelect={handleSelectReserveDay} />
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
