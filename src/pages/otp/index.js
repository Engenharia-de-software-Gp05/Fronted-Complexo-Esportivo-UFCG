import React from "react";
import OTPInput from "../../components/OTPInput";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

const OTP = () => {
  const theme = useTheme();

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
      <OTPInput />
    </Box>
  );
};

export default OTP;
