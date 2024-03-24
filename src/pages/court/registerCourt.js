import React, { useState } from 'react';
import { Box, Container, CssBaseline, TextField, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import IosShareIcon from '@mui/icons-material/IosShare';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ThreeButtons from '../../components/threeButtons';
import ButtonRegister from '../../components/buttonRegister';

export default function CadastrarQuadra() {
  const [fullName, setFullName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState('');
  const [reserveDay, setReserveDay] = useState('');

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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      fullName,
      photo,
      description,
      reserveDay
    });
  };

  return (
    <main>
      <Container component="section" maxWidth="xs">
        <CssBaseline />
        <Box className="container" sx={{ marginBottom: '20px' }}>
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
          <TextField
            fullWidth
            margin="normal"
            multiline
            rows={5}
            label="Descrição"
            placeholder="Descreva brevemente a quadra."
            onChange={handleChangeDescription}
            helperText={`${description.length}/500`}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <HighlightOffIcon />
                </InputAdornment>
              ),
            }}
          />
          <Typography variant="caption">Período de Agendamento</Typography>
          <Typography>Um usuário pode marcar a cada:</Typography>
          <Box>
            <ThreeButtons />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <ButtonRegister />
          </Box>
        </form>
      </Container>
    </main>
  );
}
