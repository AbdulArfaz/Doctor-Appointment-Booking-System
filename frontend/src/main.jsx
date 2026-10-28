import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

// Patient context
import AppContextProvider from "./context/AppContext.jsx";

// Admin and Doctor contexts
import AdminContextProvider from "./context/AdminContext.jsx";
import DoctorContextProvider from "./context/DoctorContext.jsx";

// Staff utility context
import AdminAppContextProvider from "./context/AdminAppContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <AdminAppContextProvider>
          <AdminContextProvider>
            <DoctorContextProvider>
              <App />
            </DoctorContextProvider>
          </AdminContextProvider>
        </AdminAppContextProvider>
      </AppContextProvider>
    </BrowserRouter>
  </StrictMode>
);