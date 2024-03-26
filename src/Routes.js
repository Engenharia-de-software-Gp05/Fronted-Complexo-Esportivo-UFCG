import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OTP from "./pages/otp";
import Cadastro from "./pages/cadastro/index2"
import Login from "./pages/login/index4";



function Rotas() {
  return (
    <Router>
      <Routes>
        <Route path="/otp" element={<OTP />} />
        <Route path="/cadastro" element={<Cadastro />}/>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default Rotas;
