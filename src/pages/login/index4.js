import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import "./style.css"
import { Link } from 'react-router-dom';



export default function LoginPage() {
  const handleSubmit = (event) => {
    const data = new FormData(event.currentTarget);
    const email = data.new("email");
    const senha = data.new("senha");
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
        <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <Box 
          className = "container"
        >
          {/*logo ou uma imagem */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            LOGO AQUI
          </Typography>
          <Typography component="h1" variant="h5" className="h1">
            Agende com tranquilidade o seu horário!
          </Typography>
          <Typography component= "subtitle1">
            Todas as quadras da UFCG disponíveis para agendamento fácil pelo site, acesse ou crie sua conta!
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} className="container">
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              placeholder="name@email.com"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="senha"
              label="Senha"
              name="senha"
              autoComplete="senha"
              autoFocus
              placeholder="Digite sua senha aqui"
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                className = "button"
              >
                Entrar
              </Button>
              <Button
                component={Link}
                to="/cadastro"
                variant="outlined"
                sx={{ mt:3, mb:2 }}
                className = "button"
              >
                Criar Conta
              </Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link to="/redefinir-senha" style={{ textDecoration: 'none', mt: 2 }}>
                Esqueceu a senha? Recuperar Senha
              </Link>
              </Box>
              </Box>
        </Box>
        </Container>
    </main>
  );
}
