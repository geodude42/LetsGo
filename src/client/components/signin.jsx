import React, { useReducer, useContext } from 'react';
import {
  Paper, TextField, Typography, Button,
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AuthContext from './contexts/Auth-context';

// Styling for the page
const useStyles = makeStyles({
  paper: {
    display: 'flex',
    maxWidth: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    margin: 'auto',
    flexWrap: 'wrap',
    backgroundImage: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
  },
  container: {
    '& > *': {
      margin: '1vw',
    },
  },
  bigBoy: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: '1vw',
    },
  },
  btn: {
    justifySelf: 'flex-end',
    margin: '1vw',
    // margin: '2vh 0 0 38vh',
  },
  signUp: {
    margin: '1vw',
  },

});

// Start of component

const Signin = (props) => {
  const history = useHistory();
  const { user, setUser } = useContext(AuthContext);
  // Set up form state management
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: {
        value: '',
        error: false,
        helperText: 'e.g. name@gmail.com',
      },
      password: {
        value: '',
        error: false,
        helperText: '',
      },
    },
  );

  const classes = useStyles();

  const handleSubmit = (e) => {
    console.log('submit hit');
    e.preventDefault();
    const data = { ...formInput };
    console.log(data);

    // TODO: Verify incoming data

    // TODO: Fetch to update DB
    fetch('/user/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.email.value,
        password: data.password.value,
      }),
    }).then((data) => data.json())
      .then((data) => {
        console.log('SIGNIN ', data);
        setUser({ name: data[0].first_name, email: data[0].email, id: data[0].id });

        history.push({
          pathname: `/`,
        });
      }).catch((err) => {
        console.log(err);
      });
    // TODO: Follow up fetch with redirect to global feed or re-signup
  };

  const handleInput = (e) => {
    const field = e.target.name;
    const update = e.target.value;
    const curr = { ...formInput };
    curr[field].value = update;
    setFormInput(curr);
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <div className={classes.bigBoy}>
        <div>
          <Typography variant="h5" className={classes.signUp}>
            Sign In
          </Typography>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={classes.container}>
            <TextField
              className={classes.text}
              label="Email"
              name="email"
              margin="normal"
              defaultValue={formInput.email.value}
              helperText={formInput.email.helperText}
              onChange={handleInput}
              required
              error={formInput.email.error}
            />
            <TextField
              className={classes.text}
              margin="normal"
              label="Password"
              name="password"
              type="password"
              defaultValue={formInput.password.value}
              helperText={formInput.password.helperText}
              error={formInput.password.error}
              onChange={handleInput}
              required
            />
          </div>
          <Button
            variant="contained"
            className={classes.btn}
            color="secondary"
            onClick={handleSubmit}
          >
            Click Me
          </Button>
        </form>
        <div>
          <Link to="/signup">
            <Typography variant="caption">
              No account? Sign up instead
            </Typography>
          </Link>

        </div>
      </div>
    </Paper>
  );
};

export default Signin;
