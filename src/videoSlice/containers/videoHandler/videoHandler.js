import React, { Component } from 'react';
import VideoHandlerLayout from './../../components/videoHandlerLayout/videoHandlerLayout';
import Video from './../../containers/video/video';
import { connect } from "react-redux";
import { setVideoDuration } from '../../../store/actions/videoSlice';
import _ from 'lodash';

const videoUrl = 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4';
class VideoHandler extends Component {

  state = {
    fullVideoDuration: 0,
    start: 0,
    end: 0,
    play: false
  }

  componentWillReceiveProps(nextProps) {
    const playList = nextProps.videoSliceReducer.playList;
    if(this.props.videoSliceReducer.playList !== playList) {
      this.executePlayList(playList);
    }
  }

  executePlayList(playList) {
    _.each(playList, (clip) => {
      this.setState({ start: clip.start, end: clip.end }, () => {
         this.setState({ play: true });
      });
    });
  }

  handleLoadedMetadata = (event) => {
    this.video = event.target;
    this.setState({ fullVideoDuration: this.video.duration}, () => {
      this.props.dispatch(setVideoDuration(this.state.fullVideoDuration));
    });
  }

  handleEnded = (event) => {
    this.setState({ play: false });
  }

  handleTimeUpdated = (event) => {
    if(event.target.currentTime >= this.state.end) {
      this.setState({ play: false });
    }
  }

  render() {
    return (
      <VideoHandlerLayout>
        <Video
          src={videoUrl}
          autoplay={false}
          handleLoadedMetadata={this.handleLoadedMetadata}
          start={this.state.start}
          end={this.state.end}
          play={this.state.play}
          handleEnded = {this.handleEnded}
          handleTimeUpdated = {this.handleTimeUpdated}
        />
      </VideoHandlerLayout>
    )
  }
}

export default connect(state => state)(VideoHandler);