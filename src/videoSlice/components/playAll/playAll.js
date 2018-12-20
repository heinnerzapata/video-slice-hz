import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled';
import IconButton from '@material-ui/core/IconButton';

const styles = {
  playAll: {
    marginTop: 10,
    marginBottom: 10
  },
  playAll__icon: {
    height: 70,
    width: 70,
    fill: '#303f9f',
    '&:hover': {
      fill: '#565f98',
      cursor: 'pointer'
    },
    '&:active': {
      transform: 'scale(0.8)'
    }
  }
};

const PlayAll = (props) => {
  const { 
    classes
  } = props;

  return (
    <IconButton color="primary"
                className={classes.playAll}
                onClick={ () => { props.handlePlayAll() } }>
      <PlayCircleFilled className={classes.playAll__icon}/>
    </IconButton>
  );
}

export default withStyles(styles)(PlayAll);