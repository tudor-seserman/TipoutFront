import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Register from "./components/login/Register";
import Login from "./components/login/Login";
import AddEmployees from "./components/employees/AddEmployees";
import { ProtectedRoute } from "./components/routeAuthentication/ProtectedRoute";
import TipoutReport from "./components/calculate/TipoutReport";
import CurrentEmployees from "./components/employees/CurrentEmployees";
import Settings from "./components/settings/Settings";
import InputCollectedTips from "./components/calculate/InputCollectedTips";
import { OpenRoute } from "./components/routeAuthentication/OpenRoute";
import TipReports from "./components/reports/TipReports";

function App() {
  return (
    <Routes>
      <Route path="/" element={<OpenRoute><Home /></OpenRoute>}></Route>
      <Route path="/login" element={<OpenRoute><Login /></OpenRoute>}></Route>
      <Route path="/register" element={<OpenRoute><Register /></OpenRoute>}></Route>
      <Route path="*" element={<OpenRoute><Navigate to="/" replace /></OpenRoute>}></Route>
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
        path="/tipReports/*"
        element={
          <ProtectedRoute>
            <Routes>
              <Route path="/" element={<TipReports />} />
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
