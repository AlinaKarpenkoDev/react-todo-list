import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; //
import ThemeProvider from "./context/ThemeContext";
import TodoProvider from "./context/TodoContext";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ThemeProvider>
      <TodoProvider>
        <App />
      </TodoProvider>
    </ThemeProvider>
  </BrowserRouter>
);
