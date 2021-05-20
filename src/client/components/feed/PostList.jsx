import React, { useEffect, useState, useContext } from 'react';
import { Button, Paper } from '@material-ui/core/';
import Post from './Post';
import AuthContext from '../contexts/Auth-context';

export default function PostList(props) {
  const [posts, setPosts] = useState([]);
  const { user, setUser } = useContext(AuthContext);
  const [likes, setLikes] = useState(0);
  const [userLikes, setUserLikes] = useState([]);

  function getPosts() {
    fetch('post/all')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
  }

  function deletePost(idPost) {
    fetch('/post/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: idPost, idCreator: user.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        getPosts();
      });
  }

  function likePost(idPost) {
    fetch('/post/like', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idPost: idPost, idUser: user.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLikes(likes + 1);
      });
  }
  function unlikePost(idPost) {
    fetch('/post/unlike', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idPost: idPost, idUser: user.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('unlike post DATA:', data);
        setLikes(likes - 1);
      });
  }

  function getAllUserLikes() {
    const id = user ? user.id : 0;
    fetch('post/allUserLikes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idUser: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        const result = [];
        data.forEach((e) => {
          result.push(e.id_post);
        });
        setUserLikes(result);
      });
  }

  // function getLikesUser(idPost) {
  //   fetch('/post/likesUser', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ idPost: idPost }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log('LIKES USER INFO:', data);
  //     });
  // }

  useEffect(() => {
    console.log('useEffect: ');
    getAllUserLikes();
    getPosts();
  }, [props.newPostFlag, likes]);

  return (
    <div>
      {posts
        .sort((a, b) => b.id - a.id)
        .map((item, index) =>
          (userLikes.includes(item.id) ? (
            <Post
              data={item}
              key={`post-${index}`}
              onDelete={deletePost}
              isLiked
              onUnLike={unlikePost}
              // onGetLikesUser={getLikesUser}
            />
          ) : (
            <Post
              data={item}
              key={`post-${index}`}
              onDelete={deletePost}
              onLike={likePost}
              // onGetLikesUser={getLikesUser}
            />
          ))
        )}
    </div>
  );
}
