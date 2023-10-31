import { useEffect, useState } from "react";
import api from "./API/axiosConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/login/Register";
import Login from "./components/login/Login";
import AddEmployees from "./components/employees/AddEmployees";
import { ProtectedRoute } from "./components/authentication/ProtectedRoute";
import InputCollectedTips from "./components/calculate/InputCollectedTips";
import TipoutReport from "./components/calculate/TipoutReport";
import CurrentEmployees from "./components/employees/CurrentEmployees";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
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
    </Routes>
  );
}

export default App;
