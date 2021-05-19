import React, { useState } from 'react';
import { Button, Paper } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  post: {
    background: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
  },
});

export default function Post(props) {
  const classes = useStyles();

  console.log('props.data.activity_name: ', props.data.activity_name);

  return (
    <div>
      {props.data.share ? (
        <Paper className={classes.post} key={props.data.key}>
          <span>
            <h3>Activity:</h3>
            <p>{props.data.activity}</p>
          </span>
          <span>
            <h4>Particpant amount: </h4>
            <p>{props.data.participants}</p>
          </span>
          <span>
            <h4>Price: </h4>
            <p>${props.data.price}</p>
          </span>
          <Button onClick={props.onClick}>Share</Button>
        </Paper>
      ) : (
        <Paper className={classes.post} key={props.data.key}>
             <span>
            <h3>Activity:</h3>
            <p>{props.data.activity_name}</p>
          </span>

        </Paper>

      )}
    </div>
  );
}
