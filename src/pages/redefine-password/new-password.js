import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import "./style.css"

export default function NovaSenha() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = data.get("password")
    const confirm_password = data.get("confirm_password")
    if (confirm_password === password){
        alert("senha valida")
    }else{
        alert("senha invalida")
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
