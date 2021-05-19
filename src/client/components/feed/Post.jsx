import React from 'react';
import { Button, Paper } from '@material-ui/core/';

export default function Post(props) {
  return (
    <div>
      {
        props.share
          ? (
          <Paper>
            <span>
              <h3>Activity:</h3>
              <p>{props.data.activity}</p>
            </span>
            <span>
              <h4>Particpant amount: </h4>
              <p>{props.data.participants}</p>
            </span>
            <span>
              <p>${props.data.price}</p>
            </span>

            <Button>Share</Button>

          </Paper>
          )
          : (
            <Paper>
            <span>
              <h3>Activity:</h3>
              <p>{props.data.activity_name}</p>
            </span>
            <span>
              <h3>Likes:</h3>
              <p>{props.data.likes_count}</p>
            </span>
          </Paper>
          )
      }

    </div>
  );
}
