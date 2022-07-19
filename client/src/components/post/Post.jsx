import "./post.css";
import { Link } from "react-router-dom";
import {Rating} from 'react-simple-star-rating'

export default function Post({post}) {
    const PF = "http://localhost:5000/images/"
    var rateP = 0;
    var count = 0;

    const rateC = async()=>{
        post.rates.map((r)=>(
            rateP += r.rate,
            count ++
            ))
        rateP = rateP/count;
        return rateP
    }
    rateC();

  return (
    <div className="post">
        {post.photo && (
            <img 
                className="postImg" 
                src={post.photo} 
                alt=""
            />
        )}
        <div className="postInfo">
            <div className="postCats">
                {post.categories.map((c) => (
                    <span className="postCat">{c.name}</span>
                ))}
            </div>
            <Link to={`/post/${post._id}`} className="link">
            <span className="postTitle">{post.title}</span>
            </Link>
            <hr/>
            <span className="postDate">
                {new Date(post.createdAt).toDateString()}
            </span>
            <Rating                
                    ratingValue={rateP}
                    size={20}                    
                    readonly={true}
                    className="postDate"
                  />
        </div>
        <p className="postDesc">
            {post.desc}
        </p>
    </div>
  );
}
