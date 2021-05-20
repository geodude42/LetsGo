/* eslint-disable array-bracket-spacing */
import React, { useState, useContext, useEffect } from 'react';
import { Button, Paper } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import NavBar from './NavBar';
import Post from './components/feed/Post';
import PostList from './components/feed/PostList';
import AuthContext from './components/contexts/Auth-context';

const useStyles = makeStyles({
  post: {
    background: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
  },
});

export default function GlobalFeed() {
  const history = useHistory();
  const { user, setUser } = useContext(AuthContext);
  const [ post, setPost ] = useState({});
  const [ createdPosts, setCreatedPosts ] = useState(0);

  const classes = useStyles();

  useEffect(() => {
    console.log("User: ", user);
    if (typeof user !== 'object') history.push('/signin');
  });

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
      body: JSON.stringify({ idCreator: user.id, activityName: post.activity }),
    })
      .then(response => response.json())
      .then(data => {
        setCreatedPosts(createdPosts + 1);
      });
  }

  return (
    <div>
      <div>
        <NavBar />
        <Button variant="contained" onClick={getPost}>Get Ideas for {user ? (user.name) : ('Guest')}!</Button>
        <Post data={post} share onClick={addPost} />
        <br />
        <hr />
        <br />
        <PostList newPostFlag={createdPosts} className={classes.post} />
      </div>
    </div>
  );
}
