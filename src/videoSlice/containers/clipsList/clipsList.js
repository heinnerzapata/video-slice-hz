import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import _ from 'lodash';

import Clip from './../../components/clip/clip';
import PlayAll from './../../components/playAll/playAll';
import ModalCreate from './../modalCreate/modalCreate';

import { connect } from "react-redux";
import { setPlayList } from '../../../store/actions/videoSlice';

const defaultClip = {
  "id": 1,
  "name": "Full video",
  "start": 0,
  "end": 0,
  "fixed": true,
  "tags": [
    "full"
  ]
};

const initSlider = {
  name: '',
  sliderValues: [5, 10]
}

class ClipsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      clips: [defaultClip],
      filteredClips: [defaultClip],
      maxId: defaultClip.id,
      openModal: {
        state: false,
        clip: null
      },
      maxRange: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    const vidDuration = nextProps.videoSliceReducer.videoDuration;
    if(this.props.videoSliceReducer.videoDuration !== vidDuration) {
      this.setState({ 
        clips: [{...defaultClip,
        end : vidDuration.toString().split('.')[0] }],
        maxRange : vidDuration.toString().split('.')[0]
      }, () => {
        this.filterClips(this.state.search);
      });
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });

    switch (name) {
      case 'search': {
        this.filterClips(event.target.value);
        break;
      }
    }
  };

  filterClips = (value) => {
    let filteredClips = this.state.clips;
    filteredClips = filteredClips.filter((clip) => {
      let clipName = clip.name.toLowerCase();
      return clipName.indexOf(value.toLowerCase()) !== -1;
    })
    this.setState({
      filteredClips
    });
  }

  handlePlay = id => {
    const clip = this.getClipById(id);
    this.props.dispatch(setPlayList([clip]));
  }

  handleDelete = id => {
    this.deleteClip(id);
  }

  getClipById(id) {
    return _.filter(this.state.clips, item => item.id === id)[0];
  }

  handleEdit = id => {
  const clip = this.getClipById(id);
    this.setState({ defaultValues: { name: clip.name , sliderValues: [ clip.start, clip.end ] } , openModal: { clip } }, () => {
      this.setState( { openModal: { state: true, }});
    });
  }

  handleCloseModal = () => {
    this.setState({ openModal: { state: false, clip: null } });
    this.state.defaultValues = initSlider;
  };

  handleOpenModal = () => {
    this.setState({ openModal: { state: true, clip: null } });
  };

  getCurrentNames = () => {
    return _.map(this.state.clips, item => { return  item.name });
  }

  saveOrUpdateClip(newSlice, isNew) {
    let newClips = [];
    let stateClipsCopy;
    if(isNew) {
     newClips = _.concat(this.state.clips, newSlice);
    }else{
      stateClipsCopy = _.cloneDeep(this.state.clips);
      _.remove(stateClipsCopy, function (clip) {
        return clip.id === newSlice.id;
      });
      newClips = _.concat(stateClipsCopy, newSlice);
    }

    this.setState({ clips: newClips } , () => {
      this.setState({
        maxId: this.getMaxClipsId()
      });
      this.filterClips(this.state.search);
    });
  }

  getMaxClipsId = () => {
    return this.state.clips.reduce((acc, clip) => acc = acc > clip.id ? acc : clip.id, 0);
  }

  handleSave = (newSlice, isNew) => {
    this.saveOrUpdateClip(newSlice, isNew);
  }

  deleteClip(id) {
    let newClips = _.filter(_.cloneDeep(this.state.clips), clip =>  clip.id !== id );
    this.setState({clips: newClips}, () => {
      this.filterClips(this.state.search);
    });
  }

  render() {
    const clipsList = this.state.filteredClips.map((clip, index) => {
      return (
        <Col key={index} xs={12}>
          <Clip data={clip} 
                handlePlay={this.handlePlay}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete} />
        </Col>
      );
    });

    return (
      <section>
        <Grid fluid={true}>
          <Row center="xs">
            <Col xs={12}>
              <TextField
                id="outlined-name"
                label="Search"
                value={this.state.search}
                onChange={this.handleChange('search')}
                margin="normal"
                variant="outlined"
              />
            </Col>
          </Row>
          <Row center="xs" middle="xs">
            <Col xs={12} lg={6}>
              <PlayAll />
            </Col>
            <Col xs={12} lg={6}>
              <Button variant="contained" color="primary" onClick={this.handleOpenModal}>
                New slice
              </Button>
              <ModalCreate openModal={this.state.openModal}
                           handleCloseModal={this.handleCloseModal} 
                           subtitle={'test'}
                           currentNames={this.getCurrentNames()}
                           maxId={ this.state.maxId }
                           handleSave={this.handleSave}
                           maxRange={this.state.maxRange} />
            </Col>
          </Row>
          <Row>
            {clipsList}
          </Row>
        </Grid>
      </section>
    );
  }
}

export default connect(state => state)(ClipsList);