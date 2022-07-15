import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";


export default function TopBar() {
    const {user, dispatch} = useContext(Context);
    const PF = "http://localhost:5000/images/";

    const handleLogout = () => {
        dispatch({ type: "LOGOUT"});
    };
  return (
    <div className="top">
        <div className="topLeft"> 
            <i className="topIcon fa-brands fa-facebook-square"></i>
            <i className="topIcon fa-brands fa-twitter-square"></i>
            <i className="topIcon fa-brands fa-instagram-square"></i>
            <i className="topIcon fa-brands fa-youtube-square"></i>
        </div>
        <div className="topCenter">
            <ul className="topList"> 
                <li className="topListItem">
                    <Link className="link" to="/">
                        HOME
                    </Link>
                </li>
                <li className="topListItem">
                    <Link className="link" to="/write">
                        AÑADIR RECETA
                    </Link>
                </li>
                {<li className="topListItem" onClick={handleLogout}>
                    {user && "LOGOUT"}
                </li>}
            </ul>
        </div>
        <div className="topRight">
            {user ? (
                <Link to= "/settings">
                    <img 
                        className="topImg" 
                        src= {PF + user.profilePic}
                        alt="">   
                    </img>  
                </Link>      
            ) : (
                <ul className="topList">
                    <li className="topListItem">
                        <Link className="link" to="/login">
                            INGRESAR
                        </Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to="/register">
                            REGISTRARSE
                        </Link>
                    </li>
                </ul>    
                )
            }
            {/*<i className="topSearchIcon fa-solid fa-magnifying-glass"></i>*/}
        </div>
    </div>
  )
}
