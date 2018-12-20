import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  videoHandlerLayout: {
    height: '70vh',
    width: '100%',
    backgroundColor: '#A4A4A4',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  }
};

const VideoHandlerLayout = (props) => {
  const { classes } = props;
  return (
    <section className={classes.videoHandlerLayout}>
      {props.children}
    </section>
  )
}

export default withStyles(styles)(VideoHandlerLayout);