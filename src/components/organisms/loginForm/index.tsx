import React from 'react';
import Logo from '../../atoms/logo';
import Button from '../../atoms/button';
import Input from '../../atoms/input';
import { Link } from 'react-router-dom';

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
          <Input inputType='text' />
        </div>
        <div>
          <p className="text-base text-black mb-1 mt-2">Contraseña</p>
          <Input inputType='password'/>
        </div>
        <Link to='/principal'> 
        <Button title='Ingresar' buttonType='primary' />
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;