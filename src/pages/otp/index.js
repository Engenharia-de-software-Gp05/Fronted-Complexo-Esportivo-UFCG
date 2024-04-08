import React from "react";
import OTPInput from "../../components/OTPInput";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";

const OTP = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async(otpValue) => {
    console.log(otpValue);
    try {
      const response = await fetch('http://localhost:8080/auth/confirm/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({"confirmationCode": otpValue})
      });
      
      if (response.status !== 200) {
        throw new Error('Wrong code');
      }else{
        navigate('/email-check');
      }
  
    } catch (error) {
      console.error(error);}
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"80vh"}
      gap={5}
      margin={"25px"}
    >
      <Typography
        h1
        width={"fit-content"}
        lineHeight={1}
        fontWeight={600}
        textAlign={"center"}
        color={theme.palette.primary.on_container}
        whiteSpace={"nowrap"}
        fontSize={{ xs: "3em", sm: "5em", md: "6em" }}
      >
        Insira seu código
      </Typography>
      <Typography
        h2
        color={theme.palette.secondary.main}
        width={{ xs: "380px", md: "680px" }}
        fontSize={{ xs: "1em", sm: "2.2em", md: "2.4em" }}
        textAlign={"center"}
        marginTop={-3}
      >
        Verifique seu email e insira o código de 6 dígitos enviado para você
      </Typography>
      <OTPInput onSubmit={handleSubmit} />
    </Box>
  );
};

export default OTP;
