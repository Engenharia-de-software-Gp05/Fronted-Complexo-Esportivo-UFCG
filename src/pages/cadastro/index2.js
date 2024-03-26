import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import "./style.css"

export default function cadastro() {
  const handleSubmit = (event) => {
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const nomeCompleto = data.get("nomeCompleto");
    const matricula = data.get("matricula");
    const telefone = data.get("telefone");
    const senha = data.get("senha");
    const confirmarSenha = data.get("confirmarSenha");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const estudanteEmailRegex = /@estudante\.ufcg\.edu\.br$/;
    const matriculaRegex = /^\d{9}$/;
    const telefoneRegex = /^\(83\) 9\d{4}-\d{4}$/;

    if (emailRegex.test(email) && estudanteEmailRegex.test(email)) {
      alert('Email válido');
    } else {
      alert('Email inválido');
    }

    if (senha!= confirmarSenha) {
      alert('As senhas não coincidem');
      return;
    }

    if (!matriculaRegex.test(matricula)) {
      alert('A matrícula deve conter exatamente 9 números.');
      return;
    }
  
    if (!telefoneRegex.test(telefone)) {
      alert('O número de celular deve seguir o formato: (83) 9xxxx-xxxx');
      return;
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
            Cadastro
            </Typography>
            <Typography component="subtitle1">
            Preencha os campos para criar sua conta. 
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} className="container">
            <TextField
                margin="normal"
                required
                fullWidth
                id="nomeCompleto"
                label="Nome Completo"
                name="nomeCompleto"
                autoComplete="nomeCompleto"
                autoFocus
                className="textField"
                placeholder="Nome Completo"
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="matricula"
                label="Matrícula"
                name="matricula"
                autoComplete="matricula"
                autoFocus
                className="textField"
                placeholder="123456789"
            />
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
              id="telefone"
              label="Telefone"
              name="telefone"
              autoComplete="telefone"
              className="textField"
              placeholder="(83) 9 1234-1234"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="senha"
              label="Senha"
              type="password"
              id="senha"
              autoComplete="new-password"
              className="textField"
              placeholder="Digite sua senha aqui"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmarSenha"
              label="Confirmar Senha"
              type="password"
              id="confirmarSenha"
              autoComplete="new-password"
              className="textField"
              placeholder="Confirme sua senha"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                className='button'
            >
                Criar
            </Button>
            </Box>
        </Box>
        </Container>
    </main>
  );
}
