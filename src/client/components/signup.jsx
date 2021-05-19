import React, { useReducer } from 'react';
import {
  Paper, TextField, Typography, Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
  },
  container: {
    '& > *': {
      margin: '1vw',
    },
  },
  btn: {
    justifySelf: 'flex-end',
    margin: '2vh 0 0 38vh',
  },

});

// Start of component

const Signup = (props) => {
  // Set up form state management
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
  );

  const classes = useStyles();

  const handleSubmit = (e) => {
    console.log('submit hit');
    e.preventDefault();
    const data = { formInput };
    console.log(data);

    // TODO: Fetch to update DB
    // TODO: Follow up fetch with redirect to global feed or re-signup
  };

  const handleInput = (e) => {
    const field = e.target.name;
    const update = e.target.value;
    setFormInput({ [field]: update });
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <div>
        <div>
          <Typography variant="h5" className={classes.signUp}>
            Sign Up
          </Typography>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={classes.container}>
            <TextField
              className={classes.text}
              label="Email"
              name="email"
              margin="normal"
              defaultValue={formInput.email}
              helperText="e.g. name@gmail.com"
              onChange={handleInput}
            />
            <TextField
              className={classes.text}
              margin="normal"
              label="Password"
              name="password"
              defaultValue={formInput.password}
              onChange={handleInput}
            />

          </div>

          <div className={classes.container}>
            <TextField
              className={classes.text}
              label="First Name"
              name="firstName"
              defaultValue={formInput.firstName}
              helperText="John"
              onChange={handleInput}
            />
            <TextField
              className={classes.text}
              label="Last Name"
              name="lastName"
              defaultValue={formInput.lastName}
              helperText="Doe"
              onChange={handleInput}
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
      </div>
    </Paper>
  );
};

export default Signup;
