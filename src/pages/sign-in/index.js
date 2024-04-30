import React from 'react';
import { Button, Container, CssBaseline, TextField, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import "./style.css"
import InputAdornment from '@mui/material/InputAdornment';

export default function SignIn() {
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
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
      if (senha !== confirmarSenha) {
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

      let body = {
        email: email,
        name: nomeCompleto,
        phoneNumber: telefone,
        studentId: matricula,
        password: senha
      };
      
      try {
        const url = window.REACT_APP_API_URL + '/auth/register';
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(body)
        });
      
        if (response.status !== 201) {
          throw new Error('Erro ao cadastrar');
        }else{
          navigate('/otp');
        }
      
        const responseData = await response.json();
        localStorage.setItem('token', responseData.token);

        setError(null);
      } catch (error) {
        setError(error.message);
      }


    }
  };

  return (
    <main>
      <CssBaseline />
      <Container component="section" maxWidth="xs">
        <Box className="container" style={{ marginTop: '120px' }}>
          <Typography component="h1" variant="h4" className="h1">
            Cadastro
          </Typography>
          <Typography component="subtitle1" style={{ marginBottom: 20}}>
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {/* <img src={EmailIcon} alt="Email" /> */}
                  </InputAdornment>
                ),
              }}
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
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius: '20px', padding: '6px 12px'}}
              className='button'
            >
              Criar Conta
            </Button>
          </Box>
        </Box>
      </Container>
    </main>
  );
}
