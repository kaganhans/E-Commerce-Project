// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";                 // ← redux store
import ScrollToTop from "./components/ScrollToTop";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ScrollToTop />      {/* Router içinde, App'ten önce */}
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
