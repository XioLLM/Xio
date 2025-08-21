// Xio App Entry Point
// Handles root rendering and router setup for the Xio platform.

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "@/App.jsx";
import "@/index.css";

// Environment flag for Xio
const xioIsDev = process.env.NODE_ENV !== "production";

// Use Fragment in dev, StrictMode in prod for Xio
const XioRootWrapper = xioIsDev ? React.Fragment : React.StrictMode;

ReactDOM.createRoot(document.getElementById("root")).render(
  <XioRootWrapper>
    <Router>
      <App />
    </Router>
  </XioRootWrapper>
);
