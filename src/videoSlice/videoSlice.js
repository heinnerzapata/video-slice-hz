import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import ClipsList from './containers/clipsList/clipsList';
import VideoHandler from './containers/videoHandler/videoHandler';

class VideoSlice extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} lg={6}>
            <VideoHandler />
          </Col>
          <Col xs={12} lg={6}>
            <ClipsList />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default VideoSlice;