import React, { useEffect, useState, useContext } from 'react';
import { Button, Paper } from '@material-ui/core/';
import Post from './Post';
import AuthContext from '../contexts/Auth-context';

export default function PostList(props) {
  const [posts, setPosts] = useState([]);
  const { user, setUser } = useContext(AuthContext);
  const [ likes, setLikes ] = useState(0);
  const [ userLikes, setUserLikes ] = useState([]);

  function getPosts() {
    fetch('post/all')
      .then((response) => response.json())
      .then(data => {
        console.log('data: ', data);
        setPosts(data);
      });
  }

  function deletePost(idPost) {
    fetch('/post/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: idPost, idCreator: user.id }),
    })
      .then(response => response.json())
      .then(data => {
        getPosts();
      });
  }

  function likePost(idPost) {
    fetch('/post/like', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idPost: idPost, idUser: user.id }),
    })
      .then(response => response.json())
      .then(data => {
        setLikes(likes + 1);
      });
  }

  function unlikePost(idPost) {
    fetch('/patch/unlike', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idPost: idPost, idUser: user.id }),
    })
      .then(response => response.json())
      .then(data => {
        setLikes(likes - 1);
      });
  }


  function getAllUser() {
    fetch('post/allUserLikes')
      .then((response) => response.json())
      .then(data => {
        console.log('data: ', data);
        setUserLikes(data);
      });
  }

  useEffect(() => {
    console.log('useEffect: ');
    getPosts();
  }, [props.newPostFlag, likes]);

  return (
    <div>
      {
        posts.sort((a, b) => b.id - a.id).map((item, index) => (
          userLikes.includes(item.id) ? (
            <Post data={item} key={`post-${index}`} onDelete={deletePost} onLike={likePost} />
          ) : (
            <Post data={item} key={`post-${index}`} onDelete={deletePost} isLiked onUnLike={unlikePost}/>
          )
        ))
      }
    </div>
  );
}
