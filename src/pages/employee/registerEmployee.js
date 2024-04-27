import React, { useState } from 'react';
import { Box, Container, CssBaseline, TextField, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import BadgeIcon from '@mui/icons-material/Badge';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import LockIcon from '@mui/icons-material/Lock';
import ButtonRegister from '../../components/buttonRegister';

export default function RegisterEmployee() {
  const [fullName, setFullName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  
  const handleChangeCpf = (event) => {
    let cpf= event.target.value;
    cpf = cpf.replace(/\D/g, '');
    cpf = cpf.substring(0, 11); 
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    setCpf(cpf);
  }

  const handleChangePhone = (event) => {
    let phone = event.target.value;
    phone = phone.replace(/\D/g, '');
    phone = phone.substring(0, 11);
    phone = phone.replace(/(\d{2})(\d)/, '($1) $2');
    phone = phone.replace(/(\d{5})(\d)/, '$1 $2');
    phone = phone.replace(/(\d{4})(\d{1,4})$/, '$1-$2');
    setPhone(phone)
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError(true);
      return;
    }
    
    try {
      const response = await fetch('/rota', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          cpf,
          phone,
          email,
          password
        })
    });

    if(response.ok) {
      setFullName('');
      setCpf('');
      setPhone('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setPasswordError(false);
      //
    } else {
      console.error('Error when registering employee: ', response.statusText);
    }
    } catch (error) {
      console.error('Error when registering employee: ', error);
    }
  }
  
  return (
    <Container component="section" maxWidth="xs">
      <CssBaseline />
      <Box sx={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
        <Typography variant='h5'>Cadastro de Funcionário</Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth
          margin="normal"
          label="Nome Completo"
          placeholder="Digite seu nome"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          required
          onChange={handleChangeCpf}
          value={cpf}
          fullWidth
          margin="normal"
          label="CPF"
          placeholder="123.456.789-00"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DescriptionIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          required
          fullWidth
          type='email'
          margin="normal"
          label="Email"
          placeholder="Digite o seu email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlineIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          type='fone'
          onChange={handleChangePhone}
          value={phone}
          required
          fullWidth
          margin="normal"
          label="Telefone"
          placeholder="(83) 9 9999-9999"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIphoneIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          type='password'
          required
          fullWidth
          margin="normal"
          label="Senha"
          placeholder="Digite sua senha aqui"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          type='password'
          required
          fullWidth
          margin="normal"
          label="Confirmar senha"
          placeholder="Confirme sua senha"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setPasswordError(false);
          }}
          error={passwordError}
          helperText={passwordError ? "As senhas não coincidem" : ""}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <ButtonRegister />
        </Box>
      </form>
    </Container>
  );
}
