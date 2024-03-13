import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import "./style.css"

export default function recuperarSenha() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email")
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const estudanteEmailRegex = /@estudante\.ufcg\.edu\.br$/;

    if (emailRegex.test(email) && estudanteEmailRegex.test(email)) {
      alert('Email válido');
    } else {
      alert('Email inválido');
    }
  };

  return (
    <main>
        <Container component="section" maxWidth="xs">
        <CssBaseline />
        <Box
            className="container"
        >
            <Typography component="h1" variant="h5" className="h1">
            Redefinir senha
            </Typography>
            <Typography component="subtitle1">
            Coloque um email associado a conta e enviaremos um código para redefinir a senha. 
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} className="container">
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="email"
                name="email"
                autoComplete="email"
                autoFocus
                className="textField"
                placeholder="exemplo@estudante.ufcg.edu.br"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                className='button'
            >
                continuar
            </Button>
            </Box>
        </Box>
        </Container>
    </main>
  );
}
