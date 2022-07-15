import axios from "axios";
import { useEffect, useState } from "react";
import sidebarimg2 from './sidebarimg2.jpg';
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async () =>
        {
            const res = await axios.get("/categories");
            setCats(res.data);
        };
        getCats();
    },[]);
  return (
    <div className="sidebar">
        <div className="sidebarItem">
            <span className="sidebarTitle"> SOBRE NOSOTROS</span>
            <img className="sidebarImg1" src={sidebarimg2} alt=""></img>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Impedit expedita reiciendis voluptatum atque repellat consequatur obcaecati numquam sunt iusto. 
            </p>
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">CATEGORIAS</span>
            <ul className="sidebarList">
                {cats.map((c) => (
                    <Link to={`/?cat=${c.name}`} className="link">
                    <li className="sidebarListItem">{c.name}</li>
                    </Link>
                ))}
            </ul>
        </div>

        <div className="sidebarItem">
            <span className="sidebarTitle">SEGUINOS</span>
            <div className="sidebarSocial">
                <i className="sidebarIcon fa-brands fa-facebook-square"></i>
                <i className="sidebarIcon fa-brands fa-twitter-square"></i>
                <i className="sidebarIcon fa-brands fa-instagram-square"></i>
                <i className="sidebarIcon fa-brands fa-youtube-square"></i>
            </div>
        </div>
    </div>

    
    
  )
}
