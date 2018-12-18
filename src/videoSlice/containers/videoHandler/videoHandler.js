import React, { Component } from 'react';
import VideoHandlerLayout from './../../components/videoHandlerLayout/videoHandlerLayout';
import Video from './../../containers/video/video';

const videoUrl = 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4';

class VideoHandler extends Component {

  state = {
    fullVideoDuration: 0
  }

  handleLoadedMetadata = (event) => {
    this.video = event.target;
    this.setState({
      fullVideoDuration: this.video.duration
    })
  }

  render() {
    return (
      <VideoHandlerLayout>
        <Video
          src={videoUrl}
          autoplay={true}
          handleLoadedMetadata={this.handleLoadedMetadata}
        />
      </VideoHandlerLayout>
    )
  }
}

export default VideoHandler;