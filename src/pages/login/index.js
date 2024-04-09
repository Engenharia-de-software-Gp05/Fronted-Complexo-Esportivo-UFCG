import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import "./style.css"

export default function LoginPage() {
  const navigate = useNavigate();

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const senha = data.get("senha");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const estudanteEmailRegex = /@estudante\.ufcg\.edu\.br$/;

    if (emailRegex.test(email) && estudanteEmailRegex.test(email)) {
      try {
        const response = await fetch("http://localhost:8080/auth/login/", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:{
            username: email,
            password: senha
          }
        });
      
        if (response.status !== 200) {
          throw new Error('Wrong code');
        } else {
          navigate('/scheduler');
        }
      } catch (error) {
        console.error(error);
      }

    } else {
      alert('Email inválido');
    }
  };

  return (
    <main>
      <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <Box className="container">
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
              type="password"
              autoComplete="senha"
              autoFocus
              placeholder="Digite sua senha aqui"
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                className="button"
              >
                Entrar
              </Button>
              <Button
                component={Link}
                to="/sign-in"
                variant="outlined"
                sx={{ mt:3, mb:2 }}
                className="button"
              >
                Criar Conta
              </Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link to="/redefine-password" style={{ textDecoration: 'none', mt: 2 }}>
                Esqueceu a senha? Recuperar Senha
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </main>
  );
}
