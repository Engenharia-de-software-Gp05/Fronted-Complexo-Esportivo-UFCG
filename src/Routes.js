import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OTP from "./pages/otp";
import Teste from "./pages/teste";

function Rotas() {
  return (
    <Router>
      <Routes>
        e
        <Route path="/otp" element={<OTP />} />
        <Route path="/" element={<Teste />} />
      </Routes>
    </Router>
  );
}

export default Rotas;
