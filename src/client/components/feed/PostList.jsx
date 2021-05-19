import React, { useState, useEffect } from 'react';
import { Button, Paper } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  post: {
    background: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
  },
});

export default function Post(props) {
  const classes = useStyles();
  const [postList, setPostList] = useState([]);
  const [html, setHtml] = useState('');

  useEffect(() => {
    fetch('/post/all')
      .then((response) => response.json())
      // eslint-disable-next-line arrow-parens
      .then((data) => {
        console.log('Fetch all: ', data);

        // const list = [];
        // data.forEach((item, index) => {
        //   list.push(<Post data={item} share={false} key={index} />);
        // });
        setPostList(data);
        // setHtml(list);
        // setHtml(list);
      });
  }, []);

  const list = [];

  postList.forEach((item, index) => {
    list.push(<Post data={item} share={false} key={index} />);
  });

  return (
    <div>
      hello!!!
      {list}
    </div>
  );
}
