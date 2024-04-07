import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OTP from "./pages/otp";
import RedefinePassword from "./pages/redefine-password";
import NewPassword from "./pages/redefine-password/new-password";
import OkEmailPage from "./pages/email-check";
import ErrorPage from "./pages/wrong-code";
import RedefinePasswordCheck from "./pages/new-password-check";
import RegisterCourt from "./pages/court/registerCourt";
import ListCourts from "./pages/court/listCourts"
import SchedulerPage from "./pages/scheduler";
import ListStudents from "./pages/dashboard/students";
import RegisterEmployee from "./pages/employee/registerEmployee"
import ListEmployees from "./pages/employee/listEmployees"

function Rotas() {
  return (
    <Router>
      <Routes>
        <Route path="/otp" element={<OTP />} />
        <Route path="/list-students" element={<ListStudents />}> </Route>
        <Route path="/scheduler" element={<SchedulerPage />} />
        <Route path="/redefine-password" element={<RedefinePassword />}/>
        <Route path="/new-password" element={<NewPassword />}> </Route>
        <Route path="/email-check" element={<OkEmailPage />} />
        <Route path="/wrong-code" element={<ErrorPage />} />
        <Route path="/new-password-check" element={<RedefinePasswordCheck />} />
        <Route path="/register-court" element={<RegisterCourt />} />
        <Route path="/list-courts" element={<ListCourts />} />
        <Route path="/register-employee" element={<RegisterEmployee />} />
        <Route path="/list-employees" element={<ListEmployees />} />
      </Routes>
    </Router>
  );
}

export default Rotas;
