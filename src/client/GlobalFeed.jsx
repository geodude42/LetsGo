import React, { useState } from 'react';
import { Button, Paper } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from './NavBar';
import Post from './components/feed/Post';
import PostList from './components/feed/PostList';

const useStyles = makeStyles({
  post: {
    background: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
  },
});

export default function GlobalFeed() {
  // eslint-disable-next-line array-bracket-spacing
  const [ post, setPost ] = useState({});
  const classes = useStyles();

  function getPost() {
    fetch('https://www.boredapi.com/api/activity/')
      .then((response) => response.json())
      // eslint-disable-next-line arrow-parens
      .then(data => {
        setPost(data);
      });
  }

  function addPost() {
    fetch('/post/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({idCreator: 4, activityName: post.activity}),
    })
      .then(response => response.json())
      .then(data => {
        console.log('kjsdfhkajsd');
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
