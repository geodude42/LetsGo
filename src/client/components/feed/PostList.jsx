import React, { useEffect, useState } from 'react';
import { Button, Paper } from '@material-ui/core/';
import Post from './Post';

export default function PostList(props) {
  const [posts, setPosts] = useState([]);

  function getPosts() {
    fetch('post/all')
      .then((response) => response.json())
      .then(data => {
        console.log('data: ', data);
        setPosts(data);
      });
  }

  useEffect(() => {
    console.log('useEffect: ');
    getPosts();
  }, []);

  return (
    <div>
      {
        posts.map((item, index) => (
          <Post data={item} key={`post-${index}`} />
        ))
      }
    </div>
  );
}