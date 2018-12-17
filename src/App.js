import React, { Component } from 'react';
import VideoSlice from './videoSlice/videoSlice';

class App extends Component {
  render() {
    return (
      <div className="App">
        <VideoSlice className="border" />
      </div>
    );
  }
}

export default App;
