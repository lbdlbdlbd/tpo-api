/*import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try{
      const res = await axios.post("/auth/register",{
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    }catch(err){
      setError(true);
    }
  };

  return (
    <div className="register">
        <span className="registerTitle">Registrarse</span>
        <form className="registerForm" onSubmit={handleSubmit}>
            <label>Nombre de usuario</label>
            <input 
              type="text" 
              className="registerInput" 
              placeholder="Nombre"
              onChange={(e) => setUsername(e.target.value)}/>
            <label>Email</label>
            <input 
              type="text" 
              placeholder="user@gmail.com" 
              className="registerInput"
              onChange={(e) => setEmail(e.target.value)}
              />
            <label>Contraseña</label>
            <input 
              type="password" 
              placeholder="Contraseña" 
              className="registerInput"
              onChange={(e) => setPassword(e.target.value)}
              />
            <button className="registerButton" type="submit">
              Registrarse
            </button>
        </form>
        <button className="registerLoginButton">
          <Link className="link" to="/login">
            Ingresar
          </Link>
        </button>
        {error && <span style = {{color: "red", marginTop: "10px"}}>Algo salió mal!</span>}
    </div>
  );
}*/

import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [securityWord, setSecurityWord] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/auth/register", {
        username,
        name,
        surname,
        phone,
        securityWord,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="register">
      <span className="registerTitle">Registrarse</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Escriba su nombre"
          onChange={(e) => setName(e.target.value)}
        />
        <label>Apellido</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Escriba su apellido"
          onChange={(e) => setSurname(e.target.value)}
        />
        <label>Telefono</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Escriba su telefono"
          onChange={(e) => setPhone(e.target.value)}
        />
        <label>Palabra de seguridad</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Escriba su palabra de seguridad"
          onChange={(e) => setSecurityWord(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          className="registerInput"
          placeholder="ejemplo@mail.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Usuario</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Escriba su nombre de usuario"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          className="registerInput"
          placeholder="Escriba su contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">
          Registrarse
        </button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Ingresar
        </Link>
      </button>
      {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
    </div>
  );
}
