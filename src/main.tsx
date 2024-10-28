import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./components/organisms/loginForm/index.tsx";
import Principal from "./pages/principal.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import AuthTemplate from "./components/pages/auth/index.tsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/",
    element: <AuthTemplate />,
    children: [
      {
        path: "principal",
        element: <Principal />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
   
  </React.StrictMode>
);


window.ipcRenderer.on("main-process-message", (_event, message) => {
  console.log(message);
});
