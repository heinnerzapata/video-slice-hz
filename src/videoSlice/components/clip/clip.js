import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import Typography from '@material-ui/core/Typography'
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';

const styles = {
  clip: {
    marginTop: 10
  },
  clip__card: {
    minHeight: 30,
    margintop: 5,
    paddingTop:5,
    marginBottom: 5
  },
  clip__icon: {
    height: 40,
    width: 40,
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

const Clip = (props) => {
  const { 
    classes
  } = props;
  return (
    <div className={classes.clip}>
      <Card className={classes.clip__card}>
      <CardContent>
        <Row center="xs" middle="xs">
          <Col xs={6} md={6} lg={1}>
           <IconButton color="primary"
                       className={classes.clip.button}
                       onClick={ () => { props.handlePlay(props.data.id) } }>
            <PlayCircleFilled className={classes.clip__icon}/>
           </IconButton>
          </Col>
          <Col xs={6} md={6} lg={5}>
            <Typography variant="title" color="inherit">
             {props.data.name}
            </Typography>
          </Col>
          <Col xs={6} md={6} lg={3}>
            <Typography variant="subheading" color="inherit">
              00:{props.data.start} / 00:{props.data.end}
            </Typography>
          </Col>
          <Col xs={6} md={6} lg={3}>
            {! props.data.fixed &&
              <Row>
                <Col xs={6}>
                  <IconButton color="primary" className={classes.clip.button}>
                    <Edit className={classes.clip__icon}
                          onClick={ () => { props.handleEdit(props.data.id) } }/>
                  </IconButton>
                </Col>
                <Col xs={6}>
                  <IconButton color="primary" className={classes.clip.button}>
                    <Delete className={classes.clip__icon}
                            onClick={ () => { props.handleDelete(props.data.id) } }/>
                  </IconButton>
                </Col>
              </Row>
            }
          </Col>
        </Row>
      </CardContent>
    </Card>
    </div>
  );
};

export default withStyles(styles)(Clip);