import React, { useContext } from 'react';
import { Button, Paper, IconButton, Typography } from '@material-ui/core/';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AuthContext from '../contexts/Auth-context';

export default function Post(props) {
  const { user, setUser } = useContext(AuthContext);

  const deleteHandler = () => {
    props.onDelete(props.data.id);
  };

  const likeHandler = () => {
    props.onLike(props.data.id);
  }
  return (
    <div>
      {props.share ? (
        <Paper>
          <span>
            <Typography variant='h5'>Activity:</Typography>
            <Typography>{props.data.activity}</Typography>
          </span>
          <span>
            <Typography variant='h6'>Particpant amount: </Typography>
            <Typography>{props.data.participants}</Typography>
          </span>
          <span>
            <Typography>${props.data.price}</Typography>
          </span>

          <Button onClick={props.onClick} variant='contained'>
            Share
          </Button>
        </Paper>
      ) : (
        <Paper>
          <span>
            <Typography variant='h5'>Activity:</Typography>
            <Typography>{props.data.activity_name}</Typography>
          </span>
          <span>
            {props.isLiked ?
              (<IconButton onClick={likeHandler} aria-label='favorite'>
                <FavoriteIcon/>
              </IconButton>)
              :
              (<IconButton onClick={likeHandler} aria-label='favorite'>
                <FavoriteBorderIcon/>
              </IconButton>)
              }

            {props.data.likes_count}
          </span>
          <br />
          {user && props.data.id_creator === user.id ? (
            <Button onClick={deleteHandler} variant='contained'>
              Delete
            </Button>
          ) : ('')}
        </Paper>
      )}
    </div>
  );
}
