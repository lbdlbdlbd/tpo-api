import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlePost.css";
import {Rating} from 'react-simple-star-rating'

export default function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const PF = "http://localhost:5000/images/";
    const {user} = useContext(Context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);
    const [rates, setRates] = useState([])
    const [rating, setRating] = useState(0)
    var rateP = 0;
    var count = 0;
    var myRate = 0;

    const handleRating = (rating) => (setRating(rating), handleRate(rating))

    useEffect(() => {
        const getPost = async () =>{
            const res = await axios.get("/posts/" + path);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
            setRates(res.data.rates);
        };
        getPost();
    }, [path]);

    const rateCalculation = async({rates})=>{
        rates.map((r)=>(
            rateP += r.rate,
            count ++
            ))
        rateP = rateP/count
        return rateP
    }
    rateCalculation({rates});

    const handleDelete = async () => {
        try {
          await axios.delete(`/posts/${post._id}`, {
            data: { username: user.username },
          });
          window.location.replace("/");
        } catch (err) {}
      };

    const handleUpdate = async () => {
        try {
            await axios.put(`/posts/${post._id}`, {
                username: user.username, 
                title, 
                desc,
            });
            setUpdateMode(false);
        } catch (err) {}
    };

    const handleRate = async (rating) => {
        try {
            await axios.post(`/posts/${post._id}`, {
                username: user.username, 
                rate: rating
            });
        } catch (error) {
            
        }
    }

    const handleMyRate = async ({rates}) => {
        const filtered = rates.filter((r)=>(r.username === user?.username))

        if (filtered!==[] && filtered[0].rate > 0){
            myRate =filtered[0].rate;
        }
        return myRate 
    }
    handleMyRate({rates})

  return (
    <div className="singlePost">
        <div className="singlePostWrapper">
            {post.photo && (
                <img src={PF + post.photo} alt="" className="singlePostImg"></img>
            )}{
                updateMode ? (
                    <input type="text" 
                        value={title} 
                        className="singlePostTitleInput"
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                ) : (    
                <h1 className="singlePostTitle">
                    {title}
                    {post.username === user?.username && ( 
                        <div className="singlePosEdit">
                            <i 
                                className="singlePostIcon fa-solid fa-pen-to-square" 
                                onClick={()=>setUpdateMode(true)}
                            ></i>
                            <i 
                                className="singlePostIcon fa-solid fa-trash-can" 
                                onClick={handleDelete}
                            ></i>
                        </div>
                    )}
                </h1>                
                )}
            
            <div className="singlePostInfo">
                <span className="singlePostAuthor">
                    Autor:
                    <Link to={`/?user=${post.username}`} className="link">
                        <b> {post.username}</b>
                    </Link>
                    </span>
                    <div>
                    <span className="singlePostDate">{count} Calificaciones: </span>
                  <Rating               
                    ratingValue={rateP}
                    size={20}                    
                    readonly={true}
                    className="singlePostDate"
                    onChange={(e)=>setRates(e.target.value)}
                  />
                </div>
            </div>
            {updateMode ? (
                <textarea
                    className="singlePostDescInput"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
            ) : (
                <div>
                    <p className="singlePostDesc">{desc}</p>
                    {myRate > 0 ? (
                        <div className="demo">
                            <label className="singlePostTitle">Mi Calificacion: </label>
                            <Rating
                                ratingValue={myRate}
                                size={50}
                                readonly={true}
                                onChange={(e) => setRates(e.target.value)}
                            />
                        </div>
                    ) : (
                        <div>
                        {post.username !== user?.username && (
                            <div className="demo">
                                <label className="singlePostTitle">Calificar: </label>
                                <Rating
                                    ratingValue={rating}
                                    size={50}
                                    readonly={rating>0}
                                    onClick={handleRating}
                                    
                                />
                            </div>)}
                        </div>
                
                )}

                </div>
            )}
            {updateMode && (
                <button className="singlePostButton" onClick={handleUpdate}>
                    Actualizar
                </button>
            )}
        </div>
    </div>
  );
}

/*
<span className="singlePostDate">{new Date(post.createdAt).toDateString()} </span>
*/

/*
                <div>
                    <p className="singlePostDesc">{desc}</p>
                    {myRate > 0 ? (
                        <div className="demo">
                            <label className="singlePostTitle">Mi Calificacion: </label>
                            <Rating
                                ratingValue={myRate}
                                size={50}
                                readonly={true}
                                onChange={(e) => setRates(e.target.value)}
                            />
                        </div>
                    ) : ({
                        post.username !== user?.username && (
                            <div className="demo">
                                <label className="singlePostTitle">Calificar: </label>
                                <Rating
                                    ratingValue={myRate}
                                    size={50}

                                    onChange={(e) => setRates(e.target.value)}
                                />
                </div>
                )}
                )}

                </div>

                

                <div>
                    <p className="singlePostDesc">{desc}</p>
                    {post.username !== user?.username && (
                        {myRate > 0 ? (
                            <div className="demo">
                                <label className="singlePostTitle">Mi Calificacion: </label>
                                <Rating
                                    ratingValue={myRate}
                                    size={50}
                                    readonly={true}
                                    onChange={(e) => setRates(e.target.value)}
                                />
                            </div>
                        ) : (
                            <div className="demo">
                                <label className="singlePostTitle">Calificar: </label>
                                <Rating
                                    ratingValue={myRate}
                                    size={50}

                                    onChange={(e) => setRates(e.target.value)}
                                />
                            </div>
                            )}
                    )}
                </div>
                    )}
                    {myRate > 0 ? (
                        <div className="demo">
                            <label className="singlePostTitle">Mi Calificacion: </label>
                            <Rating
                                ratingValue={myRate}
                                size={50}
                                readonly={true}
                                onChange={(e) => setRates(e.target.value)}
                            />
                        </div>
                    ) : ({
                        post.username !== user?.username && (
                            <div className="demo">
                                <label className="singlePostTitle">Calificar: </label>
                                <Rating
                                    ratingValue={myRate}
                                    size={50}

                                    onChange={(e) => setRates(e.target.value)}
                                />
                    </div>
*/