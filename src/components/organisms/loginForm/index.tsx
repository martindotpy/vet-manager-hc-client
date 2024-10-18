import React from 'react';
import Logo from '../../atoms/logo';
import Button from '../../atoms/button';
import Input from '../../atoms/input';

const LoginForm: React.FC = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="bg-white h-max w-auto rounded-xl p-5 flex flex-col items-center">
        <Logo
          logoType='primary'
          title='Vet Manager'
        />
        <div>
          <p className="text-base text-black mb-1">Usuario</p>
          <Input />
        </div>
        <div>
          <p className="text-base text-black mb-1 mt-2">Contraseña</p>
          <Input />
        </div>
        <Button title='Ingresar' />
      </div>
    </div>
  );
};

export default LoginForm;