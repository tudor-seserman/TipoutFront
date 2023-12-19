import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/login/Register";
import Login from "./components/login/Login";
import AddEmployees from "./components/employees/AddEmployees";
import { ProtectedRoute } from "./components/authentication/ProtectedRoute";
import TipoutReport from "./components/calculate/TipoutReport";
import CurrentEmployees from "./components/employees/CurrentEmployees";
import Settings from "./components/settings/Settings";
import InputCollectedTips from "./components/calculate/InputCollectedTips";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="*" element={<Navigate to="/" replace />}></Route>
      <Route
        path="/employees/*"
        element={
          <ProtectedRoute>
            <Routes>
              <Route path="/add" element={<AddEmployees />} />
              <Route path="/current" element={<CurrentEmployees />} />
            </Routes>
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/calculate/*"
        element={
          <ProtectedRoute>
            <Routes>
              <Route path="/" element={<InputCollectedTips />} />
              <Route path="/report" element={<TipoutReport />} />
            </Routes>
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/settings/*"
        element={
          <ProtectedRoute>
            <Routes>
              <Route path="/" element={<Settings />} />
            </Routes>
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
}

export default App;
