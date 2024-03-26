import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OTP from "./pages/otp";
import RedefinirSenha from "./pages/redefinir-senha";
import NovaSenha from "./pages/redefinir-senha/nova_senha";
import OkEmailPage from "./pages/email-check";
import ErrorPage from "./pages/wrong-code";
import RedefinePasswordCheck from "./pages/new-password-check";
import SchedulerPage from "./pages/scheduler/SchedulerPage";

function Rotas() {
  return (
    <Router>
      <Routes>
        <Route path="/otp" element={<OTP />} />
        <Route path="/redefinir-senha" element={<RedefinirSenha />} />
        <Route path="/nova-senha" element={<NovaSenha />} />
        <Route path="/email-check" element={<OkEmailPage />} />
        <Route path="/wrong-code" element={<ErrorPage />} />
        <Route path="/new-password-check" element={<RedefinePasswordCheck />} />
        <Route path="/agendamentos" element={<SchedulerPage />} />
      </Routes>
    </Router>
  );
}

export default Rotas;
