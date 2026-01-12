

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';


import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // ✅ import

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* ✅ wrap here */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
