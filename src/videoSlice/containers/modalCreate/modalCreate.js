import React, { Component } from 'react';
import Modal from 'react-modal';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Slider } from 'material-ui-slider';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Clear from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';
import _ from 'lodash';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '40vw',
    minHeight: '200px',
    height: '30vh',
    boxShadow: '7px 7px 17px -4px rgba(0,0,0,0.75)'
  }
};

const styles = {
  modalCreate__button: {
    height: 20,
    width: 20,
  },
  modalCreate__button_save: {
    marginTop: 20
  }
};


class ModalCreate extends Component {
  state = {
    name: '',
    sliderValues: [5, 10],
    isEditting: false,
    currentClipId: 0
  }

  changeHandler = (value) => {
    this.setState({ sliderValues: value });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  setNewValues = clip => {
    alert('ok');
  };

  isCurrentNameinList() {
    return _.some(this.props.currentNames, item => { return item.toLowerCase() === this.state.name.toLowerCase() });
  }

  notAvailableName = () => {
    return this.isCurrentNameinList() ||
           this.state.name.trim() === '';
  }

  componentWillReceiveProps (newProps) {
    if(newProps.openModal && newProps.openModal.clip) {
      this.setState({ name: newProps.openModal.clip.name,
                      sliderValues: [ newProps.openModal.clip.start, newProps.openModal.clip.end ],
                      isEditting: true,
                      currentClipId: newProps.openModal.clip.id
                    });
    }
  }

  isCurrentNameSameThanEdit() {
    let result;
    if(this.props.openModal && this.props.openModal.clip) {
      result = this.state.name.toLowerCase() === this.props.openModal.clip.name.toLowerCase() &&
                this.state.name.trim() !== ''; 
    }
    else
    {
      result = false;
    }
    return result;
  }

  afterOpenModal = () => {
    // if(this.props.openModal.clip) {
    //   this.setState({ name: this.props.openModal.clip.name,
    //                   sliderValues: [this.props.openModal.clip.start, this.props.openModal.clip.end] });
    // }
    // if(this.props.openModal.clip) {
    // console.log(this.props.openModal.clip.name);
    // console.log(this.state);
    // }

    console.log('ok');
  }


  saveClip = () => {
    console.log(this.state.currentClipId);
    this.props.handleSave({
      id: (!this.state.isEditting) ? this.props.maxId + 1 : this.state.currentClipId ,
      name: this.state.name,
      start: this.state.sliderValues[0],
      end: this.state.sliderValues[1],
      fixed: false,
      tags: []
    }, !this.state.isEditting);
    this.setState({
      name: '',
      sliderValues: [25, 75]
    });
    this.props.handleCloseModal();
    this.setState({ isEditting: false });
  }

  getTimeValue(value) {
    const addZero = (+value < 10) ? '0' : '';
    return `00:${value}${addZero}`;
  }

  render() {
    const {
      classes
    } = this.props;
    return (
      <Modal
        isOpen={this.props.openModal.state}
        onRequestClose={this.props.handleCloseModal}
        onAfterOpen={this.afterOpenModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}>
        <Grid>
          <Row middle="xs" end="xs">
            <Col xs={1}>
              <IconButton color="primary">
                <Clear className={classes.modalCreate__button}
                  onClick={this.props.handleCloseModal} />
              </IconButton>
            </Col>
          </Row>
          <Row middle="xs">
            <Col xs={6}>
              <Typography variant="title" color="inherit">
                Create new slice
              </Typography>
            </Col>
          </Row>
          <Row middle="xs">
            <Col xs={6}>
              <TextField
                id="name"
                label="Name"
                value={this.state.name}
                onChange={this.handleChange('name')}
                margin="normal"
                variant="outlined"
              />
            </Col>
            <Col xs={6}>
              <Row>
                <Col xs={12}>
                  <Slider defaultValue={10}
                    range={true}
                    min={0}
                    max={this.props.maxRange}
                    defaultValue={this.state.sliderValues}
                    onChange={this.changeHandler}>
                  </Slider>
                </Col>
                <Col xs={12}>
                  <Row around="xs">
                    <Col xs={1}>
                      <Typography variant="subtitle1" color="inherit">
                       { this.getTimeValue(this.state.sliderValues[0]) }
                      </Typography>
                    </Col>
                    <Col xs={1}>
                      <Typography variant="subtitle1" color="inherit">
                      { this.getTimeValue(this.state.sliderValues[1]) }
                      </Typography>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row middle="xs" end="xs">
            <Col xs={12}>
              { ((!this.notAvailableName()) || (this.state.isEditting) ) ?
                <Button variant="contained"
                  color="primary"
                  className={classes.modalCreate__button_save}
                  onClick={this.saveClip}>
                  Save
                </Button>
                :
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  className={classes.modalCreate__button_save}>
                 invalid name or already exist !!
                </Typography>
              }
            </Col>
          </Row>
        </Grid>
      </Modal>
    );
  }
};


export default withStyles(styles)(ModalCreate);