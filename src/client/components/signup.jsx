import React, { useReducer } from 'react';
import { Paper, TextField, Typography } from '@material-ui/core';

export default function Signup(props) {
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { formInput };

    // TODO: Fetch to update DB
    // TODO: Follow up fetch with redirect to global feed or re-signup
  };

  const handleInput = (e) => {
    const field = e.target.name;
    const update = e.target.value;
    setFormInput({ [field]: update });
  };

  return (
    <Paper>
      <Typography variant="h5">
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          defaultValue={formInput.email}
          helperText="e.g. name@gmail.com"
          onChange={handleInput}
        />
      </form>
    </Paper>
  );
};

// export default Signup;
