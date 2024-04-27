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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('photo', photo);
      formData.append('description', description);
      formData.append('reserveDay', reserveDay);

      const response = await fetch('/rota-para-salvar-quadra', {
        method: 'POST',
        body: formData,
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
    <Container component="section" maxWidth="xs">
      <CssBaseline />
      <Box sx={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
        <Typography variant='h5'>Cadastro de Quadras</Typography>
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
  );
}
