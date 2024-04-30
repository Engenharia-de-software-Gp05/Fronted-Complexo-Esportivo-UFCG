import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import OTP from "./pages/otp";
import RedefinePassword from "./pages/redefine-password";
import NewPassword from "./pages/redefine-password/new-password";
import OkEmailPage from "./pages/email-check";
import ErrorPage from "./pages/wrong-code";
import RedefinePasswordCheck from "./pages/new-password-check";
import RegisterCourt from "./pages/court/registerCourt";
import ListCourts from "./pages/court/listCourts";
import SchedulerPage from "./pages/scheduler";
import RegisterEmployee from "./pages/employee/registerEmployee";
import ListEmployees from "./pages/employee/listEmployees";
import ListStudents from "./pages/dashboard/students";
import SignIn from "./pages/sign-in";
import LoginPage from "./pages/login";
import PageItem from "./components/pageItem";

function AccessDeniedWidget({ returnPath }) {
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(returnPath);
  }

  return (
    <div className="access-denied-widget">
      <p>Você não tem autorização para acessar esta página.</p>
      <button onClick={handleGoBack}>Voltar</button>
    </div>
  );
}

async function getUserRoles() {
  try {
    const response = await fetch(window.REACT_APP_API_URL + '/user/me/roles', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    });
    const data = await response.json();
    console.log(data);
    return data.roles;
  } catch (error) {
    throw new Error('Erro na busca das permissões do usuário.');
  }
}

function Rotas() {
  const [showAccessDenied, setShowAccessDenied] = useState(false);
  const [returnPath, setReturnPath] = useState("");
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    const storedRoles = localStorage.getItem("userRoles");
    if (storedRoles) {
      setUserRoles(JSON.parse(storedRoles));
    } else {
      fetchUserRoles();
    }
  }, []);

  async function fetchUserRoles() {
    try {
      const roles = await getUserRoles();
      setUserRoles(roles);
      localStorage.setItem("userRoles", JSON.stringify(roles));
    } catch (error) {
      console.error(error);
    }
  }

  function handleAccessDenied(returnPath) {
    setReturnPath(returnPath);
    setShowAccessDenied(true);
  }

  function handleCloseAccessDenied() {
    setShowAccessDenied(false);
  }

  return (
    <Router>
      {showAccessDenied && <AccessDeniedWidget onClose={handleCloseAccessDenied} returnPath={returnPath} />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/wrong-code" element={<ErrorPage />} />
        <Route path="/email-check" element={<OkEmailPage />} />
        <Route path="/redefine-password" element={<RedefinePassword />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/new-password-check" element={<RedefinePasswordCheck />} />

        <Route
          path="/scheduler"
          element={["ROLE_ADMIN", "ROLE_USER"].every(role => userRoles.includes(role))? <PageItem Page={SchedulerPage} /> : <AccessDeniedWidget onClick={handleAccessDenied} returnPath="/scheduler" />}
        />
        <Route
          path="/list-courts"
          element={["ROLE_ADMIN", "ROLE_USER"].every(role => userRoles.includes(role))? <PageItem Page={ListCourts} /> : <AccessDeniedWidget onClick={handleAccessDenied} returnPath="/schedulers" />}
        />

        <Route
          path="/list-users"
          element={["ROLE_ADMIN"].every(role => userRoles.includes(role))? <PageItem Page={ListStudents} /> : <AccessDeniedWidget onClick={handleAccessDenied} returnPath="/scheduler" />}
        />
        <Route
          path="/register-court"
          element={["ROLE_ADMIN"].every(role => userRoles.includes(role))? <PageItem Page={RegisterCourt} /> : <AccessDeniedWidget onClick={handleAccessDenied} returnPath="/scheduler" />}
        />
        <Route
          path="/register-employee"
          element={["ROLE_ADMIN"].every(role => userRoles.includes(role))? <PageItem Page={RegisterEmployee} /> : <AccessDeniedWidget onClick={handleAccessDenied} returnPath="/scheduler" />}
        />
        <Route
          path="/list-employees"
          element={["ROLE_ADMIN"].every(role => userRoles.includes(role))? <PageItem Page={ListEmployees} /> : <AccessDeniedWidget onClick={handleAccessDenied} returnPath="/scheduler" />}
        />
      </Routes>
    </Router>
  );
}

export default Rotas;