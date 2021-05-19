import React, { useState } from 'react';
import { Button, Paper } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from './NavBar';

const useStyles = makeStyles({
  post: {
    background: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
  },
});

export default function GlobalFeed() {
  // eslint-disable-next-line array-bracket-spacing
  const [ state, setState ] = useState({ activities: [] });
  const classes = useStyles();

  function getPost() {
    fetch('https://www.boredapi.com/api/activity/')
      .then((response) => response.json())
      // eslint-disable-next-line arrow-parens
      .then(data => {
        // console.log(post);
        const newActivity = (
          <Paper className={classes.post}>
            <span>
              <h3>Activity:</h3>
              <p>{data.activity}</p>
            </span>
            <span>
              <h4>Particpant amount: </h4>
              <p>{data.participants}</p>
            </span>
            <span>
              <h4>Price: </h4>
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
