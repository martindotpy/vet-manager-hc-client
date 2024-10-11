import "./App.css";

function App() {
  return <>
  <div className="w-screen h-screen flex justify-center items-center">
    <div className="bg-white h-max w-auto rounded-xl p-5 flex flex-col items-center">
      <img src="public/electron-vite.animate.svg" className="w-36" alt="" />
      <div>
        <p className="text-lg text-black ">Usuario</p>
      <input type="text" className="border-2 border-gray-300 text-black rounded-lg p-2 bg-white" />
      </div>
      
      <div>
      <p className="text-lg text-black ">Contraseña</p>
      <input type="password" className="border-2 border-gray-300 text-black rounded-lg p-2 bg-white" />
      </div>
      <button className="bg-accent hover:bg-secondary hover:text-black transition ease-in-out delay-150 text-white rounded-lg p-2 mt-5 w-full">Iniciar Sesión</button>
    </div>
  </div>
  </>;
}

export default App;
