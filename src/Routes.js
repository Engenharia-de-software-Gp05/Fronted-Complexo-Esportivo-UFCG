import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OTP from "./pages/otp";
import RedefinirSenha from "./pages/redefinir-senha"
import NovaSenha from "./pages/redefinir-senha/nova_senha"
import Cadastro from "./pages/cadastro/index2"
import ConfirmacaoCodigo from "./pages/confirmar-email/index3"; // Certifique-se de que o caminho do import está correto
import Login from "./pages/login/index4";



function Rotas() {
  return (
    <Router>
      <Routes>
        <Route path="/otp" element={<OTP />} />
        <Route path="/redefinir-senha" element={<RedefinirSenha />}/>
        <Route path="/cadastro" element={<Cadastro />}/>
        <Route path="/nova-senha" element={<NovaSenha />}> </Route>
        <Route path="/confirmar-email" element={<ConfirmacaoCodigo />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default Rotas;
