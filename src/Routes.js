import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OTP from "./pages/otp";
import Teste from "./pages/teste";
import RedefinirSenha from "./pages/redefinir-senha"
import NovaSenha from "./pages/redefinir-senha/nova_senha"


function Rotas() {
  return (
    <Router>
      <Routes>
        e
        <Route path="/otp" element={<OTP />} />
        <Route path="/" element={<Teste />} />
        <Route path="/redefinir-senha" element={<RedefinirSenha />}/>
        <Route path="/nova-senha" element={<NovaSenha />}> </Route>
      </Routes>
    </Router>
  );
}

export default Rotas;
