import React , { Component } from 'react';
import { Grid, Row , Col } from 'react-flexbox-grid';
import ClipsList from './containers/clipsList/clipsList';
import Typography from '@material-ui/core/Typography'

class VideoSlice extends Component {
  render() {
    return(
      <Grid>
        <Row>
          <Col xs={12} lg={6}>
            <Typography variant="title" color="inherit">
                React & Material-UI Sample Application
            </Typography>
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