import {useState } from "react";
import "./home.css";
import Post from "../../components/post/Post";

export default function Search({posts}) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  return (
    <div>
    <input className="input" value={inputValue} onChange={handleInputChange} placeholder="Busque por nombre..." type="text" />
    <div className="posts">
        {posts.filter((p) => 
          p.desc.toLowerCase().includes(inputValue.toLocaleLowerCase()) || 
          p.title.toLowerCase().includes(inputValue.toLocaleLowerCase())).map((p)=>(
          <Post post={p}></Post>
        ))}
    </div>
    </div>
  );
}

