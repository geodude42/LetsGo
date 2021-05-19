import React from 'react';
import { Button, Paper, IconButton } from '@material-ui/core/';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

export default function Post(props) {
  const deleteHandler = () => {
    props.onDelete(props.data.id);
  };
  return (
    <div>
      {props.share ? (
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

          <Button onClick={props.onClick} variant='contained'>
            Share
          </Button>
        </Paper>
      ) : (
        <Paper>
          <span>
            <h3>Activity:</h3>
            <p>{props.data.activity_name}</p>
          </span>
          <span>
            <IconButton aria-label='favorite'>
              <FavoriteBorderIcon />
            </IconButton>
            {props.data.likes_count}
          </span>
          <br />
          <Button onClick={deleteHandler} variant='contained'>
            Delete
          </Button>
        </Paper>
      )}
    </div>
  );
}
