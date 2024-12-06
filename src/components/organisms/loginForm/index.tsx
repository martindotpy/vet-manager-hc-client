import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import Logo from "../../atoms/logo";
import Button from "../../atoms/button";
import Input from "../../atoms/input";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Por favor, ingresa tu email y contraseña.");
      return;
    }

    try {
      await login(email, password);
      console.log("Datos de autenticación:", { email, password });
      navigate("/");
    } catch (error) {
      console.error("Error en el inicio de sesión", error);
      alert("Credenciales incorrectas, intenta de nuevo");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="bg-white h-max w-auto rounded-xl p-5 flex flex-col items-center">
        <Logo logoType="primary" title="Vet Manager" />
        <div>
          <p className="text-base text-black mb-1">Correo electrónico</p>
          <Input
            id="email-input"
            inputType="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <p className="text-base text-black mb-1 mt-2">Contraseña</p>
          <Input
            id="password-input"
            inputType="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button id="login-button" title="Ingresar" buttonType="primary" onClick={handleLogin} />
      </div>
    </div>
  );
};

export default LoginForm;