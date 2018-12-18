import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  video_container: {
    width: '100%',
    height: '70%',
    backgroundColor: 'black'
  },
  video_container__item: {
    width: '100%;',
    height: 'auto'
  }
};

class Video extends Component {
  setRef = (element) => {
    this.video = element
  }

  render() {
    const {
      handleLoadedMetadata,
      handleTimeUpdate,
      handleSeeking,
      handleSeeked
    } = this.props;
    const { classes } = this.props;
    return (
      <div className={classes.video_container}>
        <video className={classes.video_container__item}
          id="video"
          controls
          autoPlay={this.props.autoplay}
          ref={this.setRef}
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onSeeking={handleSeeking}
          onSeeked={handleSeeked}>
          <source
            src={this.props.src}
            type="video/mp4" />
          Your browser does not support HTML5 video.
      </video>
      </div>
    );
  }
};

export default withStyles(styles)(Video);