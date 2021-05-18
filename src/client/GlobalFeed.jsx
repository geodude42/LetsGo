import React from 'react';
import Button from '@material-ui/core/Button';
import NavBar from './NavBar';

const styles = (theme) => ({
  textField: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 500,
  },
  input: {
    color: 'white',
  },
});

export default function GlobalFeed() {
  function getPost() {
    fetch('https://www.boredapi.com/api/activity/')
      .then(response => response.json())
      .then(data => console.log(data));
  }
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>
        <Button />
      </div>
    </div>
  );
}
