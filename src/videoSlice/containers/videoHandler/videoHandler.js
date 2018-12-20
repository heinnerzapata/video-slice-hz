import React, { Component } from 'react';
import VideoHandlerLayout from './../../components/videoHandlerLayout/videoHandlerLayout';
import Video from './../../containers/video/video';
import { connect } from "react-redux";
import { setVideoDuration } from '../../../store/actions/videoSlice';
import _ from 'lodash';
import Loading from './../../components/loading/loading';
import { setPlayList } from '../../../store/actions/videoSlice';

const videoUrl = 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4';
class VideoHandler extends Component {

  state = {
    fullVideoDuration: 0,
    start: 0,
    end: 0,
    play: false,
    playListCount: 0,
    currentExecution: 0,
    playList: [],
    loading: false
  }

  componentWillReceiveProps(nextProps) {
    const playList = nextProps.videoSliceReducer.playList;
    if (this.props.videoSliceReducer.playList !== playList) {
      this.executePlayList(playList);
    }
  }

  executePlayList(playList) {
    if (_.isEmpty(playList)) { return; };

    this.setState({ playListCount: playList.length, currentExecution: 0, playList }, () => {
      this.executeClip();
    });
  }

  executeClip() {
    if (this.state.currentExecution < this.state.playListCount) {
      const clip = this.state.playList[this.state.currentExecution];
      let time;

      if (this.state.currentExecution === 0) {
        time = 0;
      } else {
        time = 3000;
      }

      this.setState({ loading: true }, () => {
        setTimeout(() => {
          this.setState({ start: clip.start, end: clip.end }, () => {
            this.setState({ play: true });
          });
          this.setState({ loading: false });
        }, time);
      });
    }
    else {
      this.props.dispatch(setPlayList([]));
    }
  }

  handleLoadedMetadata = (event) => {
    this.video = event.target;
    this.setState({ fullVideoDuration: this.video.duration }, () => {
      this.props.dispatch(setVideoDuration(this.state.fullVideoDuration));
    });
  }

  handleEnded = (event) => {
    this.stopPlay();
  }

  handleTimeUpdated = (event) => {
    if (event.target.currentTime >= this.state.end) {
      this.stopPlay();
    }
  }

  stopPlay = () => {
    this.setState({ play: false, currentExecution: this.state.currentExecution + 1 }, () => {
      this.executeClip();
    });
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
          handleEnded={this.handleEnded}
          handleTimeUpdated={this.handleTimeUpdated}
        />
        {this.state.loading &&
          <Loading />
        }
      </VideoHandlerLayout>
    )
  }
}

export default connect(state => state)(VideoHandler);