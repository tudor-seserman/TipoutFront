import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import { AuthProvider } from "./hooks/useAuth.tsx";
import { BrowserRouter } from "react-router-dom";
import Banner from "./components/Banner.tsx";
import BaseStyle from "./components/styles/BaseStyle.tsx";
import { EmployerContextProvider } from "./hooks/useEmployerInfo.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <EmployerContextProvider>
          <Banner />
          <BaseStyle>
            <App />
          </BaseStyle>
        </EmployerContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
