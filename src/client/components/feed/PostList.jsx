import React, { useEffect, useState, useContext } from 'react';
import { Button, Paper } from '@material-ui/core/';
import Post from './Post';

export default function PostList(props) {
  const [posts, setPosts] = useState([]);
  const { user, setUser } = useContext(AuthContext);

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
      body: JSON.stringify({ id: idPost, idCreator: 4 }),
    })
      .then(response => response.json())
      .then(data => {
        getPosts();
      });
  }

  useEffect(() => {
    console.log('useEffect: ');
    getPosts();
  }, [props.newPostFlag]);

  return (
    <div>
      {
        posts.sort((a, b) => b.id - a.id).map((item, index) => (
          <Post data={item} key={`post-${index}`} onDelete={deletePost} />
        ))
      }
    </div>
  );
}
