// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";  // ✅ BU SATIRI EKLE
import "./index.css";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>  {/* ✅ BUNU EKLE */}
      <App />
    </BrowserRouter>  {/* ✅ BUNU EKLE */}
  </React.StrictMode>
);