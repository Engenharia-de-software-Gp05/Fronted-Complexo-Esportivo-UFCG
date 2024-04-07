import React from "react";
import { Box, Typography } from "@mui/material";

const ErrorPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Typography variant="h1" color="black">
        Algo deu errado
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Código informado está errado.
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Tente novamente!
      </Typography>
    </Box>
  );
};

const OkEmailPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Typography variant="h1" color="black">
        Tudo certo!
      </Typography>
      <Typography variant="body1" color="textSecondary">
        E-mail confirmado com sucesso.
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Se divirta!
      </Typography>
    </Box>
  );
};

const RedefinePasswordCheck = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Typography variant="h1" color="black">
        Tudo certo!
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Redefinição de senha feita com sucesso.
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Se divirta!
      </Typography>
    </Box>
  );
};

export default ErrorPage;
