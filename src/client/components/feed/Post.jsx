import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, IconButton } from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import AddIcon from '@material-ui/icons/Add';
// import { FavoriteIcon, FavoriteBorderIcon, AddIcon, PersonIcon } from '@material-ui/icons/';
import AuthContext from '../contexts/Auth-context';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});
function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Interested</DialogTitle>
      <List>
        {props.users ? (props.users.map((user, index) => (
          <ListItem button  key={`user-'${index}'`}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`${user.first_name} ${user.last_name}`}/>
          </ListItem>
        ))
        ): ('')}
      </List>
    </Dialog>
  );
}

export default function Post(props) {
  const [open, setOpen] = useState(false);
  const [likedUsers, setLikedUsers] = useState([]);
  const { user, setUser } = useContext(AuthContext);

  const deleteHandler = () => {
    props.onDelete(props.data.id);
  };

  const likeHandler = () => {
    props.onLike(props.data.id);
  };

  const unlikeHandler = () => {
    props.onUnLike(props.data.id);
  };
  // const getAllUserLikes = () => {
  //   props.onGetLikesUser(props.data.id);
  // };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };


  const getLikesUser = () => {
    fetch('/post/likesUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idPost: props.data.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLikedUsers(data);
        console.log('LIKES USER INFO:', data);
      });
  };

  // useEffect(() => {
  //   getLikesUser();
  // }, [open]);

  return (
    <div>
      {props.share ? (
        <Paper elevation={3}>
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
        <Paper elevation={3}>
          <span>
            <Typography variant='h5'>Activity:</Typography>
            <Typography>{props.data.activity_name}</Typography>
          </span>
          <span>
            {props.isLiked ?
              (<IconButton onClick={unlikeHandler} aria-label='favorite'>
                <FavoriteIcon/>
              </IconButton>)
              :
              (<IconButton onClick={likeHandler} aria-label='favorite'>
                <FavoriteBorderIcon/>
              </IconButton>)
              }
            <Button onClick={()=> {getLikesUser();handleClickOpen();}}>{props.data.likes_count}</Button>
          </span>
          <br />
          {user && props.data.id_creator === user.id ? (
            <Button onClick={deleteHandler} variant='contained'>
              Delete
            </Button>
          ) : ('')}
        </Paper>
      )}
      <br />
      <SimpleDialog open={open} onClose={handleClose} users={likedUsers} />
    </div>
  );
}
