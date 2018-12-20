import React from 'react';
import Cached from '@material-ui/icons/Cached';
import './loading.scss';

const Loading = () => {
  return(
    <div className="loading">
      <Cached className="loading__icon rotating" />
    </div>
  )
};

export default Loading;