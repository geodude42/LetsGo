import React from 'react';
import Button from '@material-ui/core/Button';
import NavBar from './NavBar';

export default function GlobalFeed() {
  function getPost() {
    fetch('https://www.boredapi.com/api/activity/')
      .then(response => response.json())
      .then(data => console.log(data));
  }
  return (
    <div>
      <div>
        <NavBar />
        <Button variant="contained" onClick={getPost}>Create Post!</Button>
      </div>
    </div>
  );
}
