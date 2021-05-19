import React, { useState } from 'react';
import { Button, Paper } from '@material-ui/core/';
import NavBar from './NavBar';

export default function GlobalFeed() {
  // eslint-disable-next-line array-bracket-spacing
  const [ state, setState ] = useState({ activities: [] });
  function getPost() {
    fetch('https://www.boredapi.com/api/activity/')
      .then((response) => response.json())
      // eslint-disable-next-line arrow-parens
      .then(data => {
        // console.log(post);
        const newActivity = (
          <Paper>
            <span>
              <h3>Activity:</h3>
              <p>{data.activity}</p>
            </span>
            <span>
              <h4>Particpant amount: </h4>
              <p>{data.participants}</p>
            </span>
            <span>
              <p>${data.price}</p>
            </span>
          </Paper>
        );
        const newState = {
          activities: [...state.activities, newActivity],
        };
        setState(newState);
      });
  }
  return (
    <div>
      <div>
        <NavBar />
        <Button variant="contained" onClick={getPost}>Create Post!</Button>
        {state.activities}
      </div>
    </div>
  );
}
