import { SET_VIDEO_DURATION } from '../types/videoSlice.type';
import { SET_PLAY_LIST } from '../types/videoSlice.type';

export const setVideoDuration = (videoDuration) => {
  return dispatch => {
    dispatch({
       type: SET_VIDEO_DURATION,
       payload: {
        videoDuration
       }
    })
  }
}

export const setPlayList = (playList) => {
  return dispatch => {
    dispatch({
       type: SET_PLAY_LIST,
       payload: {
        playList
       }
    })
  }
}