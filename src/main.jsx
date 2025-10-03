import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";                // <-- ŞART: Tailwind'i böyle yüklüyoruz
import App from "./App.jsx";         // veya doğrudan HomePage

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
