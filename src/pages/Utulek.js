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
      <div className="blackBlock3">
        <img className="introU" src="/pics/Intro2.jpg"></img>

        <img className="introUU" src="/pics/Intro4.jpeg"></img>
        <h1>
            Útulek
        </h1>
        <p>
            Záleží to jen na tobě.
        </p>
      </div>
      <div className="howItWorks2">
        <img className="introG" src="/pics/Intro3.jpg"></img>

        <img className="introGG" src="/pics/Intro5.jpeg"></img>
        <h1 className="heko">
        Jak můžeš pomoct?
        </h1>
        <p className="hedo">
        Projdi si inzeráty níže a vyber si svého nového pejska.
        </p>
      </div>
      <div className="postBlockU">

        <div className="wrapperPost2">
        {listOfPosts.map((value, key) => {
          return (
            <div key={key} className="post2">
              <div className="title2"> {value.title} </div>
              <div
                className="body2"
                //onClick={() => {
                //  navigate(`/post/${value.id}`);
              // }}
              >
                {value.postText}
              </div>
              <div className="footer2">
                <div className="username2">{value.username}</div>
            </div>
            </div>
          )})}
        </div>
      </div>
      <div className="secured2">
            <p>
                Pro více informací nás neváhejte kontaktovat
            </p>
      </div>

    </div>
    
  );
}

export default Home;
