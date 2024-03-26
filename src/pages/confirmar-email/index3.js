import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function ConfirmacaoCodigo() {
  const [codigo, setCodigo] = useState(Array(6).fill('')); // Estado para armazenar um array com os 6 dígitos do código

  const handleChange = (index) => (e) => {
    const newCodigo = [...codigo];
    newCodigo[index] = e.target.value.slice(0, 1); // Pegar apenas o primeiro caractere
    setCodigo(newCodigo);

    // Auto focus no próximo input
    if (e.target.value && index < 5) {
      document.getElementById(`codigo-${index + 1}`).focus();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode adicionar a lógica para verificar o código
    alert(`Código confirmado: ${codigo.join('')}`);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Insira seu código
        </Typography>
        <Typography component="p" sx={{ margin: '10px 0' }}>
          Verifique seu email e insira o código de 6 dígitos enviado para você
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {codigo.map((num, index) => (
              <TextField
                key={index}
                id={`codigo-${index}`}
                onChange={handleChange(index)}
                inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
                sx={{
                  width: '50px',
                  height: '50px',
                  margin: '0 5px',
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderRadius: '8px' },
                  },
                }}
              />
            ))}
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Confirmar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
