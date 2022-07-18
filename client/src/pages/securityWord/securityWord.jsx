import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./securityWord.css";

export default function SecurityWord() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch , isFetching} = useContext(Context); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type: "LOGIN_START"});
    try{
      const res = await axios.post("/auth/securityWord", {
        username: userRef.current.value,
        securityWord: passwordRef.current.value,
      });
      dispatch({type: "LOGIN_SUCCESS", payload: res.data});
    }catch(err){
      dispatch({type: "LOGIN_FAILURE"});
    }
  };

  return (
    <div className="login">
        <span className="loginTitle">Olvido de Contraseña</span>
        <form className="loginForm" onSubmit={handleSubmit}>
            <label>Usuario</label>
            <input 
              type="text" 
              placeholder="Ingrese su usuario" 
              className="loginInput"
              ref = {userRef}
              />
            <label>Palabra de seguridad</label>
            <input 
              type="password" 
              name="password"
              className="loginInput"
              placeholder="••••••" 
              ref = {passwordRef}
              />
            <button className="loginButton" type="submit" disabled={isFetching}>
              Restaurar
            </button>
        </form>
    </div>
  );
}
