import React, { useState } from 'react';
import { Button, Paper } from '@material-ui/core/';
import NavBar from './NavBar';
import Post from './components/feed/Post';
import PostList from './components/feed/PostList';

export default function GlobalFeed() {
  // eslint-disable-next-line array-bracket-spacing
  const [ post, setPost ] = useState({ activities: [] });
  function getPost() {
    fetch('https://www.boredapi.com/api/activity/')
      .then((response) => response.json())
      // eslint-disable-next-line arrow-parens
      .then(data => {
        setPost(data);
      });
  }
  return (
    <div>
      <div>
        <NavBar />
        <Button variant="contained" onClick={getPost}>Create Post!</Button>
        <Post data={post} share />
        <br />
        <hr />
        <br />
        <PostList />
      </div>
    </div>
  );
}
