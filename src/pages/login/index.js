import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { Link, useNavigate } from 'react-router-dom';
import "./style.css"

export default function LoginPage() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const senha = data.get("senha");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      navigate('/scheduler');
    } else {
      alert('Email inválido');
    }
  };

  return (
    <main>
      <Container component="section" maxWidth="xs">
        <CssBaseline/>
        
          <Typography variant="h6">
            LOGO AQUI
          </Typography>
          <Typography variant="h5">
            Agende com tranquilidade o seu horário!
          </Typography>
          <Typography variant="subtitle1">
            Todas as quadras da UFCG disponíveis para agendamento fácil pelo site, acesse ou crie sua conta!
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              className='textField'
              placeholder='name@email.com'
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="senha"
              label="Senha"
              name="senha"
              type="password"
              autoComplete="current-password"
              className='textField'
              placeholder='Digite sua senha aqui'
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                )
              }}
            />
            <Typography component="p" sx={{ width: '100%', textAlign: 'left', mt: 1, fontSize: '0.875rem' }}>
              Esqueceu a senha? <Link to="/redefine-password" style={{ textDecoration: 'none' }}>Recuperar Senha</Link>
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ borderRadius: '20px', padding: '6px 12px', width: '48%', marginRight: '2%' }}
              >
                Entrar
              </Button>
              <Button
                component={Link}
                to="/sign-in"
                variant="outlined"
                sx={{ borderRadius: '20px', padding: '6px 12px', width: '48%' }}
              >
                Criar Conta
              </Button>
            </Box>
          </Box>
      </Container>
    </main>
  );
}
