import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
//import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Search from "../../components/search/Search";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation();


  useEffect(() => {
    const fechPosts = async () => {
      const res = await axios.get("/posts" +search);
      setPosts(res.data);
    };
    fechPosts();
  }, [search]);

  return (
    <>
      <Header></Header>
      <div className="home">
        <Search posts = {posts}></Search>
        <Sidebar></Sidebar>
      </div>
    </>
  );
}



  
