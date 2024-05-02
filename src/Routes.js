import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import OTP from "./pages/otp";
import RedefinePassword from "./pages/redefine-password";
import NewPassword from "./pages/redefine-password/new-password";
import OkEmailPage from "./pages/email-check";
import ErrorPage from "./pages/wrong-code";
import RedefinePasswordCheck from "./pages/new-password-check";
import RegisterCourt from "./pages/court/registerCourt";
import ListCourts from "./pages/court/listCourts";
import RegisterEmployee from "./pages/employee/registerEmployee";
import ListEmployees from "./pages/employee/listEmployees";
import ListStudents from "./pages/dashboard/students";
import SignIn from "./pages/sign-in";
import LoginPage from "./pages/login";
import PageItem from "./components/pageItem";
import { SchedulerPage } from "./pages/scheduler/index.tsx";
import { jwtDecode } from "jwt-decode";

function AccessDeniedWidget({ returnPath, userRoles }) {
  const navigate = useNavigate();

  function handleGoBack() {
    if (userRoles.length === 0) {
      navigate("/");
    } else {
      navigate(returnPath);
    }
  }

  return (
    <div className="access-denied-widget">
      <p style={{ textAlign: "center", marginBottom: "20px" }}>
        Você não tem autorização para acessar esta página.
      </p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            borderRadius: "5px",
            cursor: "pointer",
            border: "none",
          }}
          onClick={handleGoBack}
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
function Rotas() {
  const [showAccessDenied, setShowAccessDenied] = useState(false);
  const [returnPath, setReturnPath] = useState("");
  const [userRoles, setUserRoles] = useState(["ROLE_USER"]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      const roles = decodedToken.roles;
      setUserRoles(roles);
    } else {
      // "ROLE_ADMIN", "ROLE_USER", "ROLE_PEDING"
      setUserRoles(["ROLE_USER"]);
    }
  }, []);

  function handleAccessDenied(returnPath) {
    setReturnPath(returnPath);
    setShowAccessDenied(true);
  }

  function handleCloseAccessDenied() {
    setShowAccessDenied(false);
  }

  return (
    <Router>
      {showAccessDenied && (
        <AccessDeniedWidget
          onClose={handleCloseAccessDenied}
          returnPath={returnPath}
        />
      )}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/list-students" element={<PageItem Page= {ListStudents} />} />
        <Route path="/scheduler" element={<SchedulerPage />} />
        <Route path="/list-users" element={<PageItem Page={ListStudents} />} />
        <Route path="/redefine-password" element={<RedefinePassword />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/email-check" element={<OkEmailPage />} />
        <Route path="/wrong-code" element={<ErrorPage />} />
        <Route path="/new-password-check" element={<RedefinePasswordCheck />} />
        <Route
          path="/register-court"
          element={<PageItem Page={RegisterCourt} />}
        />
        <Route path="/list-courts" element={<PageItem Page={ListCourts} />} />
        <Route
          path="/register-employee"
          element={<PageItem Page={RegisterEmployee} />}
        />
        <Route
          path="/list-employees"
          element={<PageItem Page={ListEmployees} />}
        />
        <Route path="/sign-in" element={<SignIn />} />

        <Route
          path="/otp"
          element={
            ["ROLE_ADMIN", "ROLE_USER", "ROLE_PEDING"].some((role) =>
              userRoles.includes(role),
            ) ? (
              <PageItem Page={OTP} />
            ) : (
              <AccessDeniedWidget
                userRoles={userRoles}
                onClick={handleAccessDenied}
                returnPath="/"
              />
            )
          }
        />
        <Route
          path="/wrong-code"
          element={
            ["ROLE_ADMIN", "ROLE_USER", "ROLE_PEDING"].some((role) =>
              userRoles.includes(role),
            ) ? (
              <PageItem Page={ErrorPage} />
            ) : (
              <AccessDeniedWidget
                userRoles={userRoles}
                onClick={handleAccessDenied}
                returnPath="/"
              />
            )
          }
        />
        <Route
          path="/email-check"
          element={
            ["ROLE_ADMIN", "ROLE_USER", "ROLE_PEDING"].some((role) =>
              userRoles.includes(role),
            ) ? (
              <PageItem Page={OkEmailPage} />
            ) : (
              <AccessDeniedWidget
                userRoles={userRoles}
                onClick={handleAccessDenied}
                returnPath="/"
              />
            )
          }
        />
        <Route
          path="/redefine-password"
          element={
            ["ROLE_ADMIN", "ROLE_USER", "ROLE_PEDING"].some((role) =>
              userRoles.includes(role),
            ) ? (
              <RedefinePassword />
            ) : (
              <AccessDeniedWidget
                userRoles={userRoles}
                onClick={handleAccessDenied}
                returnPath="/"
              />
            )
          }
        />
        <Route
          path="/new-password"
          element={
            ["ROLE_ADMIN", "ROLE_USER", "ROLE_PEDING"].some((role) =>
              userRoles.includes(role),
            ) ? (
              <PageItem Page={NewPassword} />
            ) : (
              <AccessDeniedWidget
                userRoles={userRoles}
                onClick={handleAccessDenied}
                returnPath="/scheduler"
              />
            )
          }
        />
        <Route
          path="/new-password-check"
          element={
            ["ROLE_ADMIN", "ROLE_USER", "ROLE_PEDING"].some((role) =>
              userRoles.includes(role),
            ) ? (
              <PageItem Page={RedefinePasswordCheck} />
            ) : (
              <AccessDeniedWidget
                userRoles={userRoles}
                onClick={handleAccessDenied}
                returnPath="/scheduler"
              />
            )
          }
        />

        <Route
          path="/scheduler"
          element={
            ["ROLE_ADMIN", "ROLE_USER"].some((role) =>
              userRoles.includes(role),
            ) ? (
              <SchedulerPage />
            ) : (
              <AccessDeniedWidget
                userRoles={userRoles}
                onClick={handleAccessDenied}
                returnPath="/scheduler"
              />
            )
          }
        />
        <Route
          path="/list-courts"
          element={
            ["ROLE_ADMIN", "ROLE_USER"].some((role) =>
              userRoles.includes(role),
            ) ? (
              <PageItem Page={ListCourts} />
            ) : (
              <AccessDeniedWidget
                userRoles={userRoles}
                onClick={handleAccessDenied}
                returnPath="/scheduler"
              />
            )
          }
        />

        <Route
          path="/list-users"
          element={
            ["ROLE_ADMIN"].some((role) => userRoles.includes(role)) ? (
              <PageItem Page={ListStudents} />
            ) : (
              <AccessDeniedWidget
                userRoles={userRoles}
                onClick={handleAccessDenied}
                returnPath="/scheduler"
              />
            )
          }
        />
        <Route
          path="/register-court"
          element={
            ["ROLE_ADMIN"].some((role) => userRoles.includes(role)) ? (
              <PageItem Page={RegisterCourt} />
            ) : (
              <AccessDeniedWidget
                userRoles={userRoles}
                onClick={handleAccessDenied}
                returnPath="/scheduler"
              />
            )
          }
        />
        <Route
          path="/register-employee"
          element={
            ["ROLE_ADMIN"].some((role) => userRoles.includes(role)) ? (
              <PageItem Page={RegisterEmployee} />
            ) : (
              <AccessDeniedWidget
                userRoles={userRoles}
                onClick={handleAccessDenied}
                returnPath="/scheduler"
              />
            )
          }
        />
        <Route
          path="/list-employees"
          element={
            ["ROLE_ADMIN"].some((role) => userRoles.includes(role)) ? (
              <PageItem Page={ListEmployees} />
            ) : (
              <AccessDeniedWidget
                userRoles={userRoles}
                onClick={handleAccessDenied}
                returnPath="/scheduler"
              />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default Rotas;
