import React from "react";
import LoginForm from "../src/components/organisms/loginForm";
import Sidebar from "./components/molecules/sidebar";
import Principal from "./pages/principal";
import { HashRouter, Route } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Route path="/" Component={Principal} />
      <Route path="/login" Component={LoginForm} />
    </HashRouter>
  );
}

export default App;
