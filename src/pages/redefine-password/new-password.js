import React from 'react';
import { Button, Container, CssBaseline, Typography, Box, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import "./style.css";

export default function NewPassword() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = data.get("password");
    const confirm_password = data.get("confirm_password");

    if (confirm_password === password) {
      navigate("/new-password-check");
    } else {
      alert("senhas não são iguais");
    }
  };

  return (
    <main>
      <Container component="section" maxWidth="xs">
        <CssBaseline />
        <Box className="container">
          <Typography component="h1" variant="h5" className="h1">
            Redefinir senha
          </Typography>
          <Typography component="subtitle1">
            As senhas informadas precisam ser idênticas.
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} className="container">
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Nova senha"
              name="password"
              autoComplete="password"
              autoFocus
              className="textField"
              placeholder="Digite sua senha aqui"
              type='password'
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirm_password"
              label="Nova senha"
              name="confirm_password"
              autoComplete="password"
              autoFocus
              className="textField"
              placeholder="Confirme sua senha aqui"
              type='password'
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
