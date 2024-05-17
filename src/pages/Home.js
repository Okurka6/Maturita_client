import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { AuthContext } from "../helpers/AuthContext";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  //const [likedPosts, setLikedPosts] = useState([]);
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .get("https://maturita-api-c2cbef7c0075.herokuapp.com/posts", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListOfPosts(response.data.listOfPosts);
          //setLikedPosts(
            //response.data.likedPosts.map((like) => {
              //return like.PostId;
           // })
         // );
        });
    }
  }, []);

  const likeAPost = (postId) => {
    axios
      .post(
        "https://maturita-api-c2cbef7c0075.herokuapp.com/likes",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );

//        if (likedPosts.includes(postId)) {
 //         setLikedPosts(
 //           likedPosts.filter((id) => {
//              return id != postId;
 //           })
 //         );
 //       } else {
 //         setLikedPosts([...likedPosts, postId]);
 //       }
      });
  };

  return (

    
    <div className="wrapper">
      <div className="blackBlock2">
        <h1>
        Vyzkoušej
CO můžeš mít!
        </h1>
        <img className="introP" src="/pics/intro.svg"></img>
      </div>
      <div className="howItWorks">
        <h1>
          Jak to funguje?
        </h1>
        <img className="settingP" src="/pics/setting.svg"></img>
        <div className="text1">
          <p>Přihlásíš se</p>
          <p>Vyplníš textová pole v editoru</p>
          <p>Zveřejníš</p>
          <p>Vidíš příspěvek na své stránce</p>
        </div>
      </div>
      <div className="postBlock">
        <h1>
          Tady můžeš vidět své příspěvky
        </h1>
        
        

        <div className="wrapperPost">
        {listOfPosts.map((value, key) => {
          return (
            <div key={key} className="post">
              <div className="title"> {value.title} </div>
              <div
                className="body"
                //onClick={() => {
                //  navigate(`/post/${value.id}`);
              // }}
              >
                {value.postText}
              </div>
              <div className="footer">
                <div className="username">{value.username}</div>
              
              </div>
            </div>
            
          )
          
        })}
        </div>
      </div>
      <div className="secured">
        <h1>
          Kontakt: prokon816@wigym.cz
        </h1>
      </div>
    </div>
    
  );
}

export default Home;
