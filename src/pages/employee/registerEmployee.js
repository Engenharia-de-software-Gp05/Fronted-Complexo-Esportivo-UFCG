import React, { useState } from "react";
import {
  Box,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import ButtonRegister from "../../components/buttonRegister";

export default function RegisterEmployee() {
  const [fullName, setFullName] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const handleChangeCpf = (event) => {
    let cpf = event.target.value;
    cpf = cpf.replace(/\D/g, "");
    cpf = cpf.substring(0, 11);
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    setCpf(cpf);
  };

  const handleChangePhone = (event) => {
    let phone = event.target.value;
    phone = phone.replace(/\D/g, "");
    phone = phone.substring(0, 11);
    phone = phone.replace(/(\d{2})(\d)/, "($1) $2");
    phone = phone.replace(/(\d{5})(\d)/, "$1 $2");
    phone = phone.replace(/(\d{4})(\d{1,4})$/, "$1-$2");
    setPhone(phone);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError(true);
      return;
    }
    //
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container component="section" maxWidth="xs" sx={{ py: 16 }}>
        <CssBaseline />
        <Box
          sx={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5">Cadastro de Funcionário</Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            margin="normal"
            label="Nome Completo"
            placeholder="Digite o nome do funcionário"
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
            fullWidth
            type="email"
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
            type="fone"
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
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <ButtonRegister />
          </Box>
        </form>
      </Container>
    </Box>
  );
}
